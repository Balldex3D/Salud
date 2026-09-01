export const BATCH_COOKING = {
  domingo_noche: {
    titulo: 'Batch Cooking — cubre Lunes, Martes, Miercoles',
    dia: 'domingo_noche',
    tiempo_min: 50,
    tareas: [
      { texto: 'Arroz: mide 550 g crudo. Enjuaga bajo el chorro de agua fria 30-45 seg. Cocina en la arrocera (proporcion 1:1.2). Rinde ~1.375 kg cocido.', timer_segundos: null },
      { texto: 'Pollo: corta 330 g de pechuga cruda en cubos de 2 cm. Sarten a fuego medio-alto con 10 g de ghee. Cocina 8-10 minutos moviendo cada 1-2 min, hasta que NINGUN cubo se vea rosado por dentro.', timer_segundos: 540 },
      { texto: 'Res: corta 220 g en tiras finas (perpendicular a la fibra). Marina en soya+mirin+jengibre y refrigera SIN cocinar — la res se cocina fresca cada dia.', timer_segundos: null },
      { texto: 'Tofu: abre el paquete de Mori-Nu Silken y vierte el contenido en un recipiente de vidrio. Tápalo y refrigera. Dura 3 días abierto.', timer_segundos: null },
      { texto: 'Cebolla y jengibre: pica la cebolla larga (150 g) y ralla el jengibre (30 g). Guarda en contenedores separados.', timer_segundos: null }
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
    tareas: [
      { texto: 'Mismo proceso con cantidades menores: 420 g arroz crudo (rinde ~1.050 kg cocido), 135 g pechuga en cubos, 110 g res marinada. Si es Martes/Viernes: abre nuevo paquete de tofu Mori-Nu en vidrio para la Cena.', timer_segundos: null }
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
