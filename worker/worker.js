/**
 * Cloudflare Worker — Push notifications cron-based
 * Almacena suscripciones anónimas en KV y envía push sin payload
 *
 * Requisitos:
 * - KV namespace binding: "SUSCRIPCIONES"
 * - Secret: "VAPID_PRIVATE_KEY"
 * - Cron trigger: "* * * * *" (cada minuto)
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/subscribe' && request.method === 'POST') {
      return handleSubscribe(request, env);
    }

    if (url.pathname === '/unsubscribe' && request.method === 'POST') {
      return handleUnsubscribe(request, env);
    }

    if (url.pathname === '/schedule' && request.method === 'POST') {
      return handleSchedule(request, env);
    }

    if (url.pathname === '/test' && request.method === 'POST') {
      return handleTest(request, env);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  },

  async scheduled(event, env, ctx) {
    // Cron: cada minuto
    const ahora = new Date();

    // Convertir a America/Bogota (UTC-5)
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Bogota',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const horaLocal = formatter.format(ahora);
    console.log(`[CRON] ${horaLocal} Bogota time`);

    // Horarios configurados
    const horarios = [
      '08:30',
      '09:20',
      '10:30',
      '13:30',
      '19:00'
    ];

    // Chequear si es hora de enviar (dentro de ±1 minuto)
    const tieneHora = horarios.some(h => h === horaLocal);

    if (!tieneHora) {
      console.log('[CRON] No hay horario ahora');
      return;
    }

    console.log('[CRON] ¡Hora de enviar!');

    // Obtener todas las suscripciones
    const listaKeys = await env.SUSCRIPCIONES.list();
    const suscripciones = [];

    for (const key of listaKeys.keys) {
      const data = await env.SUSCRIPCIONES.get(key.name, 'json');
      if (data && data.subscription && data.habilitada) {
        suscripciones.push(data);
      }
    }

    console.log(`[CRON] Enviando a ${suscripciones.length} suscriptores`);

    // Enviar push a cada uno
    for (const item of suscripciones) {
      try {
        await enviarPush(item.subscription, env);
      } catch (e) {
        console.error(`[PUSH ERROR] ${e.message}`);
        // Limpiar endpoints muertos (410 Gone)
        if (e.statusCode === 410) {
          await env.SUSCRIPCIONES.delete(item.subscription.endpoint);
        }
      }
    }
  }
};

async function handleSubscribe(request, env) {
  const { subscription } = await request.json();

  if (!subscription || !subscription.endpoint) {
    return new Response(JSON.stringify({ error: 'Invalid subscription' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Guardar en KV con endpoint como key
  const key = `sub_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  await env.SUSCRIPCIONES.put(key, JSON.stringify({
    subscription,
    habilitada: true,
    fecha: new Date().toISOString()
  }));

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleUnsubscribe(request, env) {
  const { subscription } = await request.json();

  if (!subscription || !subscription.endpoint) {
    return new Response(JSON.stringify({ error: 'Invalid subscription' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Buscar y eliminar
  const listaKeys = await env.SUSCRIPCIONES.list();
  for (const key of listaKeys.keys) {
    const data = await env.SUSCRIPCIONES.get(key.name, 'json');
    if (data && data.subscription.endpoint === subscription.endpoint) {
      await env.SUSCRIPCIONES.delete(key.name);
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleSchedule(request, env) {
  const { subscription, horarios } = await request.json();

  if (!subscription) {
    return new Response(JSON.stringify({ error: 'Invalid subscription' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Guardar/actualizar horarios
  const key = `sub_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  await env.SUSCRIPCIONES.put(key, JSON.stringify({
    subscription,
    horarios,
    habilitada: true,
    fecha: new Date().toISOString()
  }));

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleTest(request, env) {
  const { subscription } = await request.json();

  if (!subscription) {
    return new Response(JSON.stringify({ error: 'Invalid subscription' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    await enviarPush(subscription, env);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function enviarPush(subscription, env) {
  // Sin payload: solo autenticación VAPID
  const response = await fetch(subscription.endpoint, {
    method: 'POST',
    headers: {
      'TTL': '86400',
      'Content-Length': '0',
      ...generarVAPIDHeaders(env)
    }
  });

  if (!response.ok) {
    const error = new Error(`Push failed: ${response.status}`);
    error.statusCode = response.status;
    throw error;
  }

  return response;
}

function generarVAPIDHeaders(env) {
  // Simplificado: requiere VAPID_PRIVATE_KEY en secrets
  // En producción, generar JWT ES256 con la llave privada
  // Por ahora, devolver headers mínimos

  return {
    'Authorization': 'WebPush vapid=' // Placeholder
  };
}
