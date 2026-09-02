export const BATCH_COOKING = {
  domingo_noche: {
    titulo: 'Batch Cooking — cubre Lunes, Martes, Miercoles',
    dia: 'domingo_noche',
    tiempo_min: 50,
    orden_sugerido: `ORDEN SUGERIDO PARA 50 MINUTOS:
1. MIN 0: ENCIENDE LA ARROCERA con 550g de arroz (durará ~20 min, no necesita supervisión)
2. MIN 2-10 (mientras arroz cocina): Corta 195g pollo + Corta 110g res + Abre tofu + Pica cebolla + Ralla jengibre
3. MIN 11: Inicia cocción del pollo (8-10 min)
4. MIN 20: Arroz listo. Pollo sigue en sartén. Divide en dos partes.
5. MIN 21: Completa marinado de res y guarda. Verifica pollo.
6. MIN 30: Completa. Guarda todo en contenedores separados.`,
    tareas: [
      {
        texto: 'ARROZ (550g crudo → ~1.375 kg cocido):\nAbre la bolsa de arroz y vierte 550g en un bol (usa gramera). Enjuaga bajo chorro de agua fría durante 30-45 segundos, moviendo con mano hasta que el agua salga clara. Vierte el arroz mojado en la arrocera. Agrega agua: proporción 1:1.2 (550g arroz + 660ml agua) — mide en la marca de la arrocera. Cierra la tapa, enciende el botón de COCCIÓN. Listo cuando: no sale vapor de la tapa y ésta se levanta fácil sin resistencia (aprox 20 min).\n\n- QUÉ: Arroz cocido\n- DÓNDE: Contenedor hermético de vidrio\n- CÓMO: Tapa cerrada, refrigerado\n- TEMPERATURA: Refrigerador\n- CUÁNTOS DÍAS: 3 días\n- CUÁNDO SE USA: Lunes almuerzo, Martes almuerzo, Miércoles almuerzo\n- CÓMO SE USA: Sirve frío directamente del contenedor, o calienta en microondas 2 min si lo prefieres caliente',
        timer_segundos: null
      },
      {
        texto: 'POLLO (para lunes y miércoles):\n\nPASO 1 - COCCIÓN CONJUNTA:\nCocina 195g crudo de pechuga de pollo en un solo sartén con 10g de ghee, a fuego medio-alto durante 8-10 minutos, moviendo cada 1-2 min, hasta que NINGÚN cubo se vea rosado por dentro.\n\nPASO 2 - DIVISIÓN EN DOS PARTES (después de cocido, ANTES de guardar):\n[a] Deja enfriar el pollo cocido 5 minutos sobre una tabla de cortar.\n[b] Separa físicamente:\n    - 135g cocido → déjalo en CUBOS de 2cm (para Teriyaki) → guarda en Contenedor A\n    - 60g cocido → desmenúzalo con dos tenedores (para Soboro) → guarda en Contenedor B\n\nPASO 3 - ALMACENAMIENTO CONTENEDOR A (para lunes):\n- QUÉ: Pollo cocido en cubos (135g)\n- DÓNDE: Contenedor hermético de vidrio separado\n- CÓMO: Tapa cerrada, refrigerado\n- TEMPERATURA: Refrigerador\n- CUÁNTOS DÍAS: 3 días\n- CUÁNDO SE USA: Lunes almuerzo, Chicken Teriyaki\n- CÓMO SE USA: Saca del refrigerador, vierte directamente en la salsa de teriyaki según receta del plato\n\nPASO 4 - ALMACENAMIENTO CONTENEDOR B (para miércoles):\n- QUÉ: Pollo cocido desmenuzado (60g)\n- DÓNDE: Contenedor hermético de vidrio separado (distinto del A)\n- CÓMO: Tapa cerrada, refrigerado. ETIQUETA ESTE CONTENEDOR "MIÉRCOLES" y el otro "LUNES" para no confundirte.\n- TEMPERATURA: Refrigerador\n- CUÁNTOS DÍAS: 3 días\n- CUÁNDO SE USA: Miércoles almuerzo, Egg Soboro Don\n- CÓMO SE USA: Saca del refrigerador, vierte directamente en el bowl con arroz, huevo y espinaca según receta del Soboro\n\nIMPORTANTE: Ambos contenedores se cocinan juntos el domingo, pero se almacenan en recipientes SEPARADOS e IDENTIFICADOS. No mezcles. No guardes 195g en un solo contenedor — el domingo son DOS porciones destinadas a DIFERENTES días.',
        timer_segundos: 540
      },
      {
        texto: 'Res marinada (para martes):\n\nPASO 1 - CORTE Y MARINADA:\nSaca 110g de res del fridge (usa gramera) — preferible carne magra (entraña, bife angosto). Corta EN TIRAS FINAS perpendicular a la fibra (si la fibra va de izq-der, cortas de arriba-abajo). Prepara marinada en un bol: 7.5ml soya + 2.5ml mirin + 2.5g jengibre rallado. Vierte las tiras en la marinada, remueve bien hasta que todas estén cubiertas.\n\nPASO 2 - ALMACENAMIENTO INMEDIATO:\n- QUÉ: Res marinada (110g total, tiras finas)\n- DÓNDE: Bolsa hermética de plástico O contenedor de vidrio con tapa\n- CÓMO: Bolsa cerrada OR contenedor cerrado hermético. La res debe estar cubierta completamente por el líquido de marinada (soya+mirin+jengibre).\n- TEMPERATURA: Refrigerador (no congelador)\n- CUÁNTOS DÍAS: Máximo 3 días. Esta tanda solo dura hasta el martes.\n- CUÁNDO SE USA: Martes almuerzo, para el Gyudon (una sola comida, 110g completos)\n- CÓMO SE USA:\n   [a] El martes por la mañana, saca del refrigerador 10 minutos antes de cocinar para que llegue a temperatura ambiente.\n   [b] Vierte TODO el contenido (res + marinada) en un sartén a fuego medio-alto.\n   [c] Cocina el Gyudon según receta paso a paso.\n   [d] Sírvelo completo sobre el arroz. NO guardes res sobrante — la cantidad está calculada para una sola porción.',
        timer_segundos: null
      },
      {
        texto: 'TOFU MORI-NU SILKEN (paquete 310g → recipiente vidrio):\nAbre el paquete de Mori-Nu Silken Extra Firm. Busca un recipiente de vidrio LIMPIO (no plástico — retiene olor). Vierte TODO el contenido del paquete en el recipiente (el tofu líquido + sólido). Tapa con tapa de vidrio o film plástico. Refrigera inmediatamente.\n\n- QUÉ: Tofu Mori-Nu Silken (paquete 310g completo, con agua)\n- DÓNDE: Recipiente hermético de vidrio\n- CÓMO: Tapa cerrada hermética. El tofu debe estar cubierto completamente en su agua.\n- TEMPERATURA: Refrigerador\n- CUÁNTOS DÍAS: 3 días después de abierto\n- CUÁNDO SE USA: Lunes cena, Martes cena, Miércoles cena (en sopas miso y platos chukka)\n- CÓMO SE USA: Saca del refrigerador, vierte en el plato según receta. Si tiene agua excesiva, cuela suavemente antes de servir.',
        timer_segundos: null
      },
      {
        texto: 'CEBOLLA LARGA (150g picada para condimentar):\nSepara 150g de cebolla larga (la parte blanca y verde claro) — usa gramera o a ojo (~1 atado mediano). Corta en rodajas finas (2-3mm) con cuchillo de chef.\n\n- QUÉ: Cebolla larga picada (150g, rodajas finas)\n- DÓNDE: Contenedor hermético de vidrio o plástico\n- CÓMO: Tapa cerrada. Las rodajas pueden soltar un poco de agua — es normal.\n- TEMPERATURA: Refrigerador\n- CUÁNTOS DÍAS: 3 días\n- CUÁNDO SE USA: Lunes almuerzo (Teriyaki), Martes almuerzo (Gyudon), Miércoles almuerzo (Soboro)\n- CÓMO SE USA: Saca del refrigerador, agrega como guarnición fresca sobre cada plato justo antes de servir\n\nJENGIBRE FRESCO RALLADO (30g para marinadas y condimento):\nPela 30g de jengibre fresco (con cuchara raspa bien) — usa gramera. Ralla con rallador fino hasta que vea fibras cortas (no polvo).\n\n- QUÉ: Jengibre fresco rallado (30g, fibras cortas)\n- DÓNDE: Contenedor hermético separado de vidrio o plástico\n- CÓMO: Tapa cerrada. IMPORTANTE: el jengibre huele intenso y puede manchar/oler todo — aísla bien en contenedor separado.\n- TEMPERATURA: Refrigerador\n- CUÁNTOS DÍAS: 3 días\n- CUÁNDO SE USA: Marinadas de Gyudon (martes), como condimento fresco en sopas (lunes-miércoles cena)\n- CÓMO SE USA: Saca del refrigerador, agrega a la marinada o al plato según receta. Si está muy seco, puedes humedecerlo ligeramente.',
        timer_segundos: null
      }
    ],
    almacenamiento: [
      '✓ Arroz cocido: Contenedor hermético vidrio, tapa cerrada, refrigerador, 3 días. Sirve frío o calienta 2 min en microondas.',
      '✓ Pollo lunes (135g cubos): Contenedor hermético vidrio A, etiquetado "LUNES", tapa cerrada, refrigerador, 3 días.',
      '✓ Pollo miércoles (60g desmenuzado): Contenedor hermético vidrio B, etiquetado "MIÉRCOLES", tapa cerrada, refrigerador, 3 días.',
      '✓ Res marinada (110g tiras): Bolsa hermética plástico O contenedor vidrio, tapa cerrada, refrigerador MÁXIMO 3 días. Cocina fresca martes. NO guardes sobrantes.',
      '✓ Tofu Mori-Nu (310g): Recipiente vidrio, tapa cerrada, refrigerador, 3 días abierto. Úsalo en 3 cenas.',
      '✓ Cebolla larga (150g): Contenedor hermético vidrio separado, tapa cerrada, refrigerador, 3 días. Agrega fresca al servir.',
      '✓ Jengibre rallado (30g): Contenedor hermético separado (aislado — huele intenso), tapa cerrada, refrigerador, 3 días.'
    ]
  },

  miercoles_noche: {
    titulo: 'Batch Cooking — cubre Jueves, Viernes',
    dia: 'miercoles_noche',
    tiempo_min: 35,
    orden_sugerido: `ORDEN SUGERIDO PARA 35 MINUTOS:
1. MIN 0: ENCIENDE LA ARROCERA con 420g de arroz (durará ~15 min, no necesita supervisión)
2. MIN 2-8 (mientras arroz cocina): Corta 135g pollo + Prepara 110g res marinada + Abre tofu nuevo
3. MIN 9: Inicia cocción del pollo (8-10 min)
4. MIN 15: Arroz listo. Pollo sigue en sartén.
5. MIN 20: Completa. Pollo cocido. Res marinada y refrigerada. Tofu nuevo en vidrio.
6. MIN 25: Todo guardado.`,
    tareas: [
      {
        texto: 'ARROZ PARA JUEVES-VIERNES (420g crudo → ~1.050 kg cocido):\n• Abre la bolsa de arroz y vierte 420g en un bol (usa gramera)\n• Enjuaga bajo chorro de agua fría durante 30-45 segundos, moviendo con mano hasta que el agua salga clara\n• Vierte en la arrocera\n• Agrega agua: proporción 1:1.2 (420g arroz + 504ml agua) — mide con cuidado\n• Cierra tapa, enciende COCCIÓN\n• Listo cuando: no sale vapor y tapa se levanta fácil (aprox 15 min)',
        timer_segundos: null
      },
      {
        texto: 'POLLO PARA JUEVES-VIERNES (135g pechuga cruda → cubos cocidos):\n• Saca 135g de pechuga del fridge (usa gramera — es la mitad del domingo)\n• Corta en cubos de 2 cm de lado usando tabla y cuchillo\n• Calienta sartén a fuego medio-alto 30 seg\n• Agrega 5g de ghee (la mitad del domingo), espera 10 seg hasta brille\n• Vierte cubos. NO MUEVAS primeros 2 min\n• Remueve cada 1-2 minutos durante 8-10 minutos\n• Listo cuando: NINGÚN cubo rosa adentro. Corta uno para verificar. Color dorado claro afuera.',
        timer_segundos: 540
      },
      {
        texto: 'RES PARA JUEVES-VIERNES (110g marinada fresca):\n• Saca 110g de res del fridge (usa gramera — es la mitad del domingo)\n• Corta EN TIRAS FINAS perpendicular a la fibra (arriba-abajo si fibra va izq-der)\n• Prepara marinada en un bol: 7.5ml soya + 2.5ml mirin + 2.5g jengibre rallado\n• Vierte tiras en marinada, remueve bien\n• Tapa con film plástico, refrigera. Cocinarás fresca mañana y pasado.',
        timer_segundos: null
      },
      {
        texto: 'TOFU MORI-NU NUEVO (si es Jueves o Viernes, necesitas paquete nuevo):\n• SOLO si es Martes/Viernes y necesitas tofu para Cena: abre un NUEVO paquete de Mori-Nu Silken\n• Vierte TODO en un recipiente de vidrio limpio\n• Tapa, refrigera inmediatamente\n• (Si es Domingo/Miércoles y todavía hay tofu del batch anterior, úsalo primero — no abras uno nuevo)',
        timer_segundos: null
      }
    ],
    almacenamiento: [
      'Arroz: 3 días. Pollo cocido: 3 días. Res marinada: cocina fresca. Tofu: en vidrio, tápado, 3 días.'
    ]
  },

  sabado: {
    titulo: 'Sabado — todo fresco, sin batch',
    dia: 'sabado',
    nota: 'El salmon se cocina el mismo dia (no aguanta bien recalentado). Arroz tambien fresco: 105 g crudo en la arrocera, 15 min.'
  }
};

export const getBatchCooking = (dia) => BATCH_COOKING[dia];
export const getBatchCookingList = () => [BATCH_COOKING.domingo_noche, BATCH_COOKING.miercoles_noche];
