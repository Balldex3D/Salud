export const BATCH_COOKING = {
  domingo_noche: {
    titulo: 'Batch Cooking — cubre Lunes, Martes, Miercoles',
    dia: 'domingo_noche',
    tiempo_min: 50,
    orden_sugerido: `ORDEN SUGERIDO PARA 50 MINUTOS:
1. MIN 0: ENCIENDE LA ARROCERA con 550g de arroz (durará ~20 min, no necesita supervisión)
2. MIN 2-10 (mientras arroz cocina): Corta 330g pollo + Corta 220g res + Abre tofu + Pica cebolla + Ralla jengibre
3. MIN 11: Inicia cocción del pollo (8-10 min)
4. MIN 20: Arroz listo. Pollo sigue en sartén.
5. MIN 21: Completa marinado de res y guarda. Verifica pollo.
6. MIN 30: Completa. Guarda todo.`,
    tareas: [
      {
        texto: 'ARROZ (550g crudo → ~1.375 kg cocido):\n• Abre la bolsa de arroz y vierte 550g en un bol (usa gramera)\n• Enjuaga bajo chorro de agua fría durante 30-45 segundos, moviendo con mano hasta que el agua salga clara\n• Vierte el arroz mojado en la arrocera\n• Agrega agua: proporción 1:1.2 (550g arroz + 660ml agua) — mide en la marca de la arrocera\n• Cierra la tapa, enciende el botón de COCCIÓN\n• Listo cuando: no sale vapor de la tapa y ésta se levanta fácil sin resistencia (aprox 20 min)',
        timer_segundos: null
      },
      {
        texto: 'POLLO (330g pechuga cruda → cubos cocidos):\n• Saca 330g de pechuga de pollo del fridge (usa gramera)\n• Corta en cubos de 2 cm de lado (más o menos como un dado de juego) — usa tabla y cuchillo de chef\n• Calienta la sartén grande a fuego medio-alto durante 30 segundos\n• Agrega 10g de ghee (mantequilla clarificada) y espera 10 seg hasta que brille\n• Vierte los cubos de pollo. NO MUEVAS los primeros 2 min (se doran)\n• Luego remueve cada 1-2 minutos, moviendo la sartén\n• Cocina 8-10 minutos total. Listo cuando: NINGÚN cubo se vea rosa/rojo por dentro (corta uno para verificar). Color dorado afuera.',
        timer_segundos: 540
      },
      {
        texto: 'RES (220g marinada para cocinar fresca cada día):\n• Saca 220g de res del fridge (usa gramera) — preferible carne magra (entraña, bife angosto)\n• Corta EN TIRAS FINAS perpendicular a la fibra (si la fibra va de izq-der, cortas de arriba-abajo)\n• Prepara marinada en un bol: 15ml soya + 5ml mirin + 5g jengibre rallado\n• Vierte las tiras en la marinada, remueve bien hasta que todas estén cubiertas\n• Tapa con film plástico y refrigera. NO COCINES HOY — la cocinarás fresca mañana, pasado y día siguiente.',
        timer_segundos: null
      },
      {
        texto: 'TOFU MORI-NU SILKEN (paquete 310g → recipiente vidrio):\n• Abre el paquete de Mori-Nu Silken Extra Firm\n• Busca un recipiente de vidrio LIMPIO (no plástico — retiene olor)\n• Vierte TODO el contenido del paquete en el recipiente (el tofu líquido + sólido)\n• Tapa con tapa de vidrio o film plástico\n• Refrigera inmediatamente. Dura 3 días abierto — úsalo en las 3 comidas de esta semana.',
        timer_segundos: null
      },
      {
        texto: 'CEBOLLA LARGA Y JENGIBRE (para condimentar):\n• Separa 150g de cebolla larga (la parte blanca y verde claro) — usa gramera o a ojo (~1 atado mediano)\n• Corta en rodajas finas (2-3mm) con cuchillo de chef\n• Guarda en un contenedor hermético de plástico o vidrio\n• Pela 30g de jengibre fresco (con cuchara raspa bien) — usa gramera\n• Ralla con rallador fino hasta que vea fibras cortas (no polvo)\n• Guarda en otro contenedor hermético separado (el jengibre huele y mancha todo)',
        timer_segundos: null
      }
    ],
    almacenamiento: [
      'Arroz: contenedor hermético, refrigerado. Dura 3 días.',
      'Pollo cocido: contenedor separado, refrigerado. Dura 3 días.',
      'Res marinada cruda: bolsa hermética. Cocínala fresca cada día — no la cocines de mas.',
      'Tofu Mori-Nu: en recipiente de vidrio tapado, refrigerado. Dura 3 días abierto.',
      'Cebolla y jengibre picados: contenedores separados, refrigerados.'
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
