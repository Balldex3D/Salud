export const BATCH_COOKING = {
  domingo_noche: {
    titulo: 'Batch Cooking — cubre Lunes, Martes, Miercoles',
    dia: 'domingo_noche',
    tiempo_min: 50,
    orden_sugerido: `ORDEN SUGERIDO PARA 50 MINUTOS:
1. MIN 0: ENCIENDE LA ARROCERA con 550g de arroz (durará ~20 min)
2. MIN 2-10: Corta 195g pollo + 110g res + Abre tofu + Pica cebolla + Ralla jengibre
3. MIN 11: Inicia cocción del pollo (8-10 min)
4. MIN 20: Arroz listo. Divide pollo en dos preparaciones diferentes
5. MIN 21: Marinada de res y tofu en vidrio
6. MIN 30: Todo guardado y etiquetado`,
    tareas: [
      {
        texto: 'ARROZ (550g crudo → ~1.375 kg cocido para 3 almuerzos):\nCocina en la arrocera. Proporción 1:1.2 (550g + 660ml agua). Listo ~20 min.\n\n📍 ALMACENAMIENTO:\n├─ RECIPIENTE: Contenedor hermético de vidrio\n├─ DÓNDE: NEVERA\n├─ DURACIÓN: 3 días\n├─ ETIQUETA: "ARROZ - Lunes/Martes/Miércoles almuerzo"\n└─ USOS: \n   • LUNES almuerzo: 150g (Teriyaki)\n   • MARTES almuerzo: 150g (Gyudon)\n   • MIÉRCOLES almuerzo: 150g (Soboro)',
        timer_segundos: null
      },
      {
        texto: 'POLLO (195g crudo → ~155g cocido, en DOS preparaciones DIFERENTES):\n\n🔥 PASO 1 - COCCIÓN ÚNICA:\nCocina 195g pechuga con 10g ghee, fuego medio-alto, 8-10 min, hasta dorado.\n\n✂️ PASO 2 - DIVIDE INMEDIATAMENTE DESPUÉS (mientras sigue caliente):\n└─ 135g → CUBOS de 2cm (Lunes: Teriyaki)\n└─ 60g → DESMENUZADO con tenedores (Miércoles: Soboro)\n\n📍 CONTENEDOR A - POLLO CUBOS (135g):\n├─ RECIPIENTE: Contenedor hermético vidrio A\n├─ DÓNDE: NEVERA\n├─ DURACIÓN: 3 días\n├─ ETIQUETA: "POLLO CUBOS - LUNES almuerzo Teriyaki"\n└─ CÓMO USAR: Frío del refrigerador. Vierte en salsa de Teriyaki.\n\n📍 CONTENEDOR B - POLLO DESMENUZADO (60g):\n├─ RECIPIENTE: Contenedor hermético vidrio B (SEPARADO del A)\n├─ DÓNDE: NEVERA\n├─ DURACIÓN: 3 días  \n├─ ETIQUETA: "POLLO DESHILACHADO - MIÉRCOLES almuerzo Soboro"\n└─ CÓMO USAR: Frío del refrigerador. Vierte sobre arroz + huevo + espinaca.\n\n⚠️ IMPORTANTE: NO MEZCLES. Dos contenedores DIFERENTES. Una se come lunes (cubos), otra miércoles (deshilachada).',
        timer_segundos: 540
      },
      {
        texto: 'RES (110g crudo → marinada fresca para MARTES SOLO):\n\n🔪 PASO 1 - CORTE EN TIRAS FINAS:\nSaca 110g de res magra (entraña o bife angosto). Corta EN TIRAS FINAS perpendicular a la fibra.\n\n🥘 PASO 2 - MARINADA:\nEn un bol: 7.5ml soya + 2.5ml mirin + 2.5g jengibre rallado. Remueve bien.\nVierte las tiras de res. Remueve hasta cubrir todo.\n\n📍 ALMACENAMIENTO - RES MARINADA (110g):\n├─ RECIPIENTE: Bolsa hermética O contenedor vidrio\n├─ DÓNDE: NEVERA (NO CONGELADOR)\n├─ DURACIÓN: Máximo 2 días\n├─ ETIQUETA: "RES MARINADA - MARTES almuerzo GYUDON. USAR MARTES"\n└─ CANTIDAD: 110g EXACTOS para UNA SOLA COMIDA (MARTES almuerzo)\n\n⚠️ IMPORTANTE: Esta res NO congeles. La cocineras FRESCA el martes.\n✅ MARTES ALMUERZO: Vierte TODO (res + marinada) en sartén, cocina según receta Gyudon.',
        timer_segundos: null
      },
      {
        texto: 'TOFU MORI-NU (paquete 310g para 3 cenas):\nAbre paquete. Vierte TODO en recipiente de VIDRIO (no plástico). Tapa hermético.\n\n📍 ALMACENAMIENTO - TOFU (310g):\n├─ RECIPIENTE: Contenedor hermético vidrio\n├─ DÓNDE: NEVERA\n├─ DURACIÓN: 3 días después de abierto\n├─ ETIQUETA: "TOFU - Lunes/Martes/Miércoles CENA"\n└─ USOS: \n   • LUNES cena: 100g (Miso shiru)\n   • MARTES cena: 105g (Chukka)\n   • MIÉRCOLES cena: 105g (Chukka)\n\n✅ CÓMO USAR: Frío del refrigerador. Vierte según receta de cada cena.',
        timer_segundos: null
      },
      {
        texto: 'CEBOLLA LARGA (150g picada para 3 almuerzos):\nCorta 150g cebolla larga en rodajas finas (2-3mm).\n\n📍 ALMACENAMIENTO - CEBOLLA LARGA (150g):\n├─ RECIPIENTE: Contenedor hermético vidrio\n├─ DÓNDE: NEVERA\n├─ DURACIÓN: 3 días\n├─ ETIQUETA: "CEBOLLA LARGA - Lunes/Martes/Miércoles almuerzo"\n└─ USOS:\n   • LUNES: 50g (guarnición Teriyaki)\n   • MARTES: 50g (guarnición Gyudon)\n   • MIÉRCOLES: 50g (guarnición Soboro)\n\n✅ CÓMO USAR: Agrega fresca al servir cada plato.',
        timer_segundos: null
      },
      {
        texto: 'JENGIBRE RALLADO (30g para marinadas y condimento):\nPela y ralla 30g de jengibre fresco (fibras cortas).\n\n📍 ALMACENAMIENTO - JENGIBRE (30g):\n├─ RECIPIENTE: Contenedor hermético SEPARADO (aísla el olor)\n├─ DÓNDE: NEVERA\n├─ DURACIÓN: 3 días\n├─ ETIQUETA: "JENGIBRE - Marinada Gyudon + condimento cenas"\n└─ USOS:\n   • MARTES: Marinada Gyudon (2.5g)\n   • Cenas: Condimento sopas (1g cada cena)\n\n⚠️ IMPORTANTE: Contenedor SEPARADO — huele intenso.',
        timer_segundos: null
      }
    ],
    almacenamiento: [
      '📦 NEVERA - ARROZ (550g): 3 días — 50g × 3 almuerzos',
      '📦 NEVERA - POLLO CUBOS (135g): 3 días — LUNES almuerzo completo',
      '📦 NEVERA - POLLO DESHILACHADO (60g): 3 días — MIÉRCOLES almuerzo completo',
      '❄️  NEVERA (NO CONGELADOR) - RES MARINADA (110g): 2 días — MARTES almuerzo completo',
      '📦 NEVERA - TOFU (310g): 3 días — 100g LUNES, 105g MARTES, 105g MIÉRCOLES cena',
      '📦 NEVERA - CEBOLLA LARGA (150g): 3 días — 50g × 3 almuerzos',
      '📦 NEVERA (aislado) - JENGIBRE (30g): 3 días — condimento'
    ]
  },

  miercoles_noche: {
    titulo: 'Batch Cooking — cubre Jueves, Viernes',
    dia: 'miercoles_noche',
    tiempo_min: 35,
    orden_sugerido: `ORDEN SUGERIDO PARA 35 MINUTOS:
1. MIN 0: Enciende ARROCERA con 420g arroz (~15 min)
2. MIN 2-8: Corta 135g pollo + 110g res + Abre tofu nuevo
3. MIN 9: Inicia cocción pollo (8-10 min)
4. MIN 15: Arroz listo
5. MIN 20: Pollo cocido. Res marinada. Tofu en vidrio
6. MIN 25: Todo etiquetado`,
    tareas: [
      {
        texto: 'ARROZ (420g crudo → ~1.050 kg cocido para 2 almuerzos):\nCocina en arrocera. Proporción 1:1.2 (420g + 504ml agua). Listo ~15 min.\n\n📍 ALMACENAMIENTO:\n├─ RECIPIENTE: Contenedor hermético vidrio\n├─ DÓNDE: NEVERA\n├─ DURACIÓN: 3 días\n├─ ETIQUETA: "ARROZ - Jueves/Viernes almuerzo"\n└─ USOS:\n   • JUEVES almuerzo: 150g (Teriyaki)\n   • VIERNES almuerzo: 150g (Teriyaki)',
        timer_segundos: null
      },
      {
        texto: 'POLLO (135g crudo → ~110g cocido en CUBOS para 2 almuerzos):\n\n🔥 PASO 1 - COCCIÓN:\nCocina 135g pechuga con 5g ghee, fuego medio-alto, 8-10 min.\n\n✂️ PASO 2 - DIVIDE EN CUBOS:\n├─ 70g cubos → JUEVES almuerzo Teriyaki\n└─ 65g cubos → VIERNES almuerzo Teriyaki\n\n📍 ALMACENAMIENTO - POLLO CUBOS (110g):\n├─ RECIPIENTE: Contenedor hermético vidrio\n├─ DÓNDE: NEVERA\n├─ DURACIÓN: 3 días\n├─ ETIQUETA: "POLLO CUBOS - Jueves/Viernes almuerzo Teriyaki"\n└─ USOS: Frío del refrigerador. Vierte en salsa Teriyaki.',
        timer_segundos: 540
      },
      {
        texto: 'RES (110g crudo → marinada fresca para JUEVES Y VIERNES):\n\n🔪 PASO 1 - CORTE:\nSaca 110g res magra. Corta EN TIRAS FINAS perpendicular a la fibra.\n\n🥘 PASO 2 - MARINADA:\n7.5ml soya + 2.5ml mirin + 2.5g jengibre. Remueve bien.\n\n📍 ALMACENAMIENTO - RES MARINADA (110g):\n├─ RECIPIENTE: Bolsa hermética O contenedor vidrio\n├─ DÓNDE: NEVERA (NO CONGELADOR)\n├─ DURACIÓN: 2 días\n├─ ETIQUETA: "RES MARINADA - Jueves/Viernes almuerzo Gyudon"\n├─ USOS:\n│  • JUEVES almuerzo: 55g (Gyudon)\n│  • VIERNES almuerzo: 55g (Gyudon)\n└─ CÓMO: Vierte TODO (res + marinada) en sartén fresco.',
        timer_segundos: null
      },
      {
        texto: 'TOFU NUEVO (310g para 2 cenas):\nAbre paquete nuevo. Vierte TODO en recipiente de VIDRIO.\n\n📍 ALMACENAMIENTO:\n├─ RECIPIENTE: Contenedor hermético vidrio\n├─ DÓNDE: NEVERA\n├─ DURACIÓN: 3 días\n├─ ETIQUETA: "TOFU - Jueves/Viernes CENA"\n└─ USOS:\n   • JUEVES cena: 155g (Miso shiru)\n   • VIERNES cena: 155g (Chukka)',
        timer_segundos: null
      }
    ],
    almacenamiento: [
      '📦 NEVERA - ARROZ (420g): 3 días — 150g × 2 almuerzos',
      '📦 NEVERA - POLLO CUBOS (110g): 3 días — 70g JUEVES, 65g VIERNES almuerzo',
      '❄️  NEVERA (NO CONGELADOR) - RES MARINADA (110g): 2 días — 55g × 2 almuerzos',
      '📦 NEVERA - TOFU (310g): 3 días — 155g JUEVES, 155g VIERNES cena'
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
