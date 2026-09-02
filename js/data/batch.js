export const BATCH_COOKING = {
  domingo_noche: {
    titulo: 'Batch Cooking — Domingo noche (cubre Lunes, Martes, Miércoles)',
    dia: 'domingo_noche',
    tiempo_min: 50,
    orden_sugerido: `⏱️ ORDEN EXACTO PARA 50 MINUTOS:
MIN 0:   ENCIENDE ARROCERA con 550g arroz + 660ml agua (durará ~20 min)
MIN 2:   MIENTRAS HIERVE EL ARROZ: Corta pollo (195g), res (110g), cebolla (150g), ralla jengibre (30g)
MIN 5:   ABRE TOFU: Pasa a contenedor de vidrio
MIN 8:   POLLO ESTÁ CORTADO y LISTO para cocinar
MIN 10:  INICIA COCCIÓN POLLO en sartén (8-10 min)
MIN 20:  ARROZ ESTÁ LISTO. Retira de arrocera. Pasa a contenedor.
MIN 21:  POLLO COCIDO. Divide en cubos + deshilachado. Marinada de res lista.
MIN 30:  TODO ESTÁ EN CONTENEDORES, etiquetado y en nevera.
FIN: 50 min. Lunes, Martes, Miércoles listos.`,
    tareas: [
      {
        texto: 'PASO 1: ENCIENDE LA ARROCERA (MIN 0)\n\nPrepara: 550g de arroz blanco CRUDO + 660ml de AGUA FRÍA.\n\nInstrucciones:\n1. Abre la arrocera\n2. Coloca 550g de arroz crudo en el recipiente interno\n3. Agrega 660ml de agua fría (no hirviente)\n4. Remueve bien\n5. Enciende la ARROCERA\n6. La arrocera dirá cuándo esté lista (~20 minutos). Ella sola cambiará a "Mantener caliente"\n\nMientras se cocina el arroz, continúa con los siguientes pasos.',
        timer_segundos: null
      },
      {
        texto: 'PASO 2: CORTA POLLO (MIN 2-8)\n\nPreparación: 195g de pechuga de pollo CRUDA\n\nTécnica:\n1. Saca la pechuga del refrigerador\n2. Coloca sobre tabla de corte LIMPIA\n3. Con cuchillo bien afilado, corta en TIRAS de 2-3cm de ancho (perpendicular a la fibra)\n4. NO hagas cubos todavía. Solo tiras grandes.\n5. Coloca todas las tiras en un plato\n\nRecuerda: Esto son 195g totales. Más adelante los dividirás en dos tipos:\n• 135g → cubos de 2cm (Lunes Teriyaki)\n• 60g → deshilachado (Miércoles Soboro)',
        timer_segundos: null
      },
      {
        texto: 'PASO 3: CORTA RES EN TIRAS FINAS (MIN 2-8)\n\nPreparación: 110g de res magra CRUDA (lomo, entraña o bife angosto)\n\nTécnica IMPORTANTE:\n1. Saca la res del refrigerador\n2. Coloca sobre tabla de corte LIMPIA\n3. Identifica la FIBRA de la carne (líneas que van en una dirección)\n4. CORTA PERPENDICULAR a esa fibra (ángulo de 90 grados)\n5. Las tiras deben ser FINAS: aproximadamente 3-4mm de espesor\n6. Largo: 5-8cm\n7. Coloca todas las tiras en un plato SEPARADO\n\n⚠️ Importante: Cortar PERPENDICULAR a la fibra hace que la carne sea más tierna en la boca.',
        timer_segundos: null
      },
      {
        texto: 'PASO 4: ABRE TOFU (MIN 5)\n\nPreparación: 1 paquete de TOFU MORI-NU SILKEN (310g)\n\nInstrucciones:\n1. Saca el paquete del refrigerador\n2. Abre cuidadosamente (es frágil)\n3. Vierte TODO EL CONTENIDO en un CONTENEDOR HERMÉTICO DE VIDRIO (no plástico)\n4. Cierra bien\n5. Coloca etiqueta: "TOFU - Lunes/Martes/Miércoles CENA" + fecha de hoy\n6. Coloca en la NEVERA INMEDIATAMENTE\n\nNo hagas nada más con el tofu. Ya está guardado.',
        timer_segundos: null
      },
      {
        texto: 'PASO 5: PICA CEBOLLA LARGA (MIN 2-8)\n\nPreparación: 150g de cebolla larga CRUDA\n\nTécnica:\n1. Lava bien la cebolla larga bajo agua fría\n2. Con cuchillo, corta en RODAJAS FINAS (2-3mm de grosor)\n3. Corta toda la cebolla (parte blanca Y parte verde)\n4. Coloca en un plato\n5. En total debes tener ~150g de cebolla picada\n\nDespués: Se guardará en contenedor en la nevera.',
        timer_segundos: null
      },
      {
        texto: 'PASO 6: RALLA JENGIBRE (MIN 2-8)\n\nPreparación: 1 raíz de jengibre fresco (~40-50g)\n\nTécnica:\n1. Pela bien el jengibre con un cuchillo (quita la piel café clara)\n2. Coloca sobre tabla de corte\n3. Usando un RALLADOR FINO (el lado con agujeros pequeños), ralla hacia abajo\n4. Recoge lo rallado en un plato\n5. Debes tener ~30g de jengibre rallado (fibras cortas y jugosas)\n\nNota: El jengibre picado NO sirve. Debe ser RALLADO (fibras muy finas).',
        timer_segundos: null
      },
      {
        texto: 'PASO 7: COCINA EL POLLO (MIN 10, después de cortarlo)\n\nPreparación: Las 195g de pollo en tiras que cortaste + 10g de ghee\n\nProceso:\n1. Pon una sartén antiadherente GRANDE (24-26cm) a FUEGO MEDIO-ALTO (posición 6-7)\n2. Espera 1 minuto\n3. Agrega 10g de ghee. Debe derretirse rápido y verse brillante\n4. Agrega TODAS las tiras de pollo de una vez\n5. Cocina SIN REVOLVER durante 2-3 minutos hasta que los bordes se vean DORADOS (color café claro)\n6. LUEGO revuelve. Cocina 3-4 minutos más, moviendo constantemente\n7. El pollo está LISTO cuando:\n   - Exterior: DORADO (café claro, no blanco)\n   - Interior: Blanco firme (presiona con espátula, no debe soltar líquido)\n   - TIEMPO TOTAL: 8-10 minutos desde que lo pusiste\n\n⚠️ No cocines de más o queda seco.',
        timer_segundos: 600
      },
      {
        texto: 'PASO 8: DIVIDE POLLO INMEDIATAMENTE (MIN 20, JUSTO DESPUÉS DE COCINAR)\n\nEl pollo debe estar CALIENTE cuando lo dividas.\n\nDivisión:\n\n📦 CONTENEDOR A - POLLO CUBOS (135g para Lunes Teriyaki):\n1. Saca 135g de pollo cocido de la sartén\n2. Coloca sobre tabla de corte LIMPIA\n3. Corta en CUBOS pequeños (aproximadamente 2cm × 2cm)\n4. Coloca en CONTENEDOR HERMÉTICO DE VIDRIO (separado)\n5. Etiqueta: "POLLO CUBOS - Lunes almuerzo Teriyaki"\n6. Cierra bien\n7. A la NEVERA INMEDIATAMENTE\n\n📦 CONTENEDOR B - POLLO DESHILACHADO (60g para Miércoles Soboro):\n1. Saca los 60g restantes de pollo cocido\n2. Coloca en otro CONTENEDOR HERMÉTICO DE VIDRIO (SEPARADO del A)\n3. Con DOS TENEDORES, desmenúzalo: Agarra con ambos tenedores en direcciones opuestas y tira suavemente hasta que quede todo deshilachado (trozos pequeños)\n4. Etiqueta: "POLLO DESHILACHADO - Miércoles almuerzo Soboro"\n5. Cierra bien\n6. A la NEVERA INMEDIATAMENTE\n\n⚠️ IMPORTANTE: DOS CONTENEDORES DIFERENTES. No mezcles.',
        timer_segundos: null
      },
      {
        texto: 'PASO 9: MARINADA DE RES (MIN 21, DESPUÉS DE COCINAR POLLO)\n\nPreparación: Las 110g de res en tiras CRUDA + marinada\n\nMarinada (mezcla):\n1. En un TAZÓN pequeño, mezcla:\n   - 7.5ml de salsa de soya (aproximadamente 1.5 cucharaditas)\n   - 2.5ml de mirin (aproximadamente 0.5 cucharadita)\n   - 2.5g de jengibre rallado (la que acabas de rallar)\n2. Remueve bien con una cuchara\n\nAhora agrega la res:\n1. Vierte las tiras de res en el tazón\n2. Remueve bien hasta que TODAS las tiras estén cubiertas por la marinada\n3. Coloca TODA la mezcla (res + marinada) en un CONTENEDOR HERMÉTICO o BOLSA HERMÉTICA\n4. Etiqueta: "RES MARINADA - Martes almuerzo Gyudon. USAR SOLO MARTES"\n5. A la NEVERA (NO congelador)\n\n⚠️ IMPORTANTE: Esta res solo dura 2 días. Úsala SOLO el martes. No congelador.',
        timer_segundos: null
      },
      {
        texto: 'PASO 10: GUARDA CEBOLLA Y JENGIBRE (MIN 22)\n\n📦 CEBOLLA LARGA (150g):\n1. Coloca todos los 150g de cebolla picada en un CONTENEDOR HERMÉTICO\n2. Etiqueta: "CEBOLLA LARGA - Lunes/Martes/Miércoles almuerzo"\n3. A la NEVERA\n\n📦 JENGIBRE RALLADO (30g):\n1. Coloca todos los 30g de jengibre rallado en un CONTENEDOR PEQUEÑO SEPARADO\n2. Etiqueta: "JENGIBRE - Marinada + condimento"\n3. A la NEVERA en un lugar SEPARADO de los otros (huele intenso)\n\n✅ El arroz debe estar listo para este momento también.',
        timer_segundos: null
      },
      {
        texto: 'PASO 11: GUARDA ARROZ (MIN 20, CUANDO LA ARROCERA AVISA QUE ESTÁ LISTO)\n\n1. Abre la arrocera\n2. El arroz estará CALIENTE (ten cuidado)\n3. Espera 2 minutos a que enfríe un poco\n4. Con una cuchara de madera o plástico (no metal), remueve el arroz suavemente\n5. Coloca EN UN CONTENEDOR HERMÉTICO DE VIDRIO GRANDE\n6. Cierra bien\n7. Etiqueta: "ARROZ - Lunes/Martes/Miércoles almuerzo" + fecha de hoy\n8. A la NEVERA\n\n📌 Rendimiento: 550g de arroz crudo rinde ~1.375 kg cocido\n   - Lunes: 325g cocido (150g del almuerzo)\n   - Martes: 275g cocido (110g del almuerzo)\n   - Miércoles: 325g cocido (150g del almuerzo)',
        timer_segundos: null
      },
      {
        texto: 'CHECKLIST FINAL (MIN 45-50)\n\nVerifica que TODO está en la NEVERA, ETIQUETADO y LISTO:\n\n☐ ARROZ - Contenedor hermético, etiquetado, nevera\n☐ POLLO CUBOS - Contenedor hermético A, etiquetado, nevera\n☐ POLLO DESHILACHADO - Contenedor hermético B (SEPARADO), etiquetado, nevera\n☐ RES MARINADA - Contenedor hermético, etiquetado, NEVERA (NO congelador)\n☐ TOFU - Contenedor hermético, etiquetado, nevera\n☐ CEBOLLA LARGA - Contenedor hermético, etiquetado, nevera\n☐ JENGIBRE - Contenedor hermético SEPARADO, etiquetado, nevera\n\n✅ SI TODOS ESTÁN MARCADOS: Batch cooking terminado. Lunes, Martes, Miércoles preparados.',
        timer_segundos: null
      }
    ],
    almacenamiento: [
      '📦 NEVERA - ARROZ (550g crudo → 1.375kg cocido): 3 días — se usa Lunes/Martes/Miércoles almuerzo',
      '📦 NEVERA - POLLO CUBOS (135g): 3 días — Lunes almuerzo LISTO',
      '📦 NEVERA - POLLO DESHILACHADO (60g): 3 días — Miércoles almuerzo LISTO',
      '❄️  NEVERA (NO congelador) - RES MARINADA (110g): máximo 2 días — Martes almuerzo LISTO',
      '📦 NEVERA - TOFU (310g): 3 días — se usa Lunes/Martes/Miércoles cena',
      '📦 NEVERA - CEBOLLA LARGA (150g picada): 3 días — Lunes/Martes/Miércoles almuerzo',
      '📦 NEVERA (AISLADO del resto) - JENGIBRE (30g rallado): 3 días — marinada + condimento'
    ]
  },

  miercoles_noche: {
    titulo: 'Batch Cooking — Miércoles noche (cubre Jueves, Viernes)',
    dia: 'miercoles_noche',
    tiempo_min: 35,
    orden_sugerido: `⏱️ ORDEN EXACTO PARA 35 MINUTOS:
MIN 0:   ENCIENDE ARROCERA con 420g arroz + 504ml agua (~15 min)
MIN 2:   Corta pollo (135g), res (110g), ralla jengibre
MIN 5:   ABRE TOFU NUEVO: pasa a contenedor
MIN 8:   INICIA COCCIÓN POLLO en sartén (8-10 min)
MIN 15:  ARROZ LISTO. Retira de arrocera.
MIN 20:  POLLO LISTO. Divide en cubos. Marinada de res lista.
MIN 30:  TODO en contenedores, etiquetado, nevera.
FIN: 35 min. Jueves y Viernes listos.`,
    tareas: [
      {
        texto: 'PASO 1: ENCIENDE LA ARROCERA (MIN 0)\n\nPrepara: 420g de arroz blanco CRUDO + 504ml de AGUA FRÍA.\n\nInstrucciones:\n1. Abre la arrocera\n2. Coloca 420g de arroz crudo en el recipiente\n3. Agrega 504ml de agua fría\n4. Remueve bien\n5. Enciende la ARROCERA\n6. Ella sola te dirá cuando está lista (~15 minutos). Cambiará a "Mantener caliente"\n\nMientras se cocina, continúa con los siguientes pasos.',
        timer_segundos: null
      },
      {
        texto: 'PASO 2: CORTA POLLO (MIN 2-8)\n\nPreparación: 135g de pechuga de pollo CRUDA\n\nTécnica:\n1. Saca del refrigerador\n2. Coloca en tabla de corte LIMPIA\n3. Corta en TIRAS de 2-3cm de ancho (perpendicular a la fibra)\n4. Coloca todas en un plato\n\nNota: Este pollo se dividirá en CUBOS pequeños después de cocinarlo:\n• 70g cubos → Jueves Teriyaki\n• 65g cubos → Viernes Teriyaki',
        timer_segundos: null
      },
      {
        texto: 'PASO 3: CORTA RES EN TIRAS FINAS (MIN 2-8)\n\nPreparación: 110g de res magra CRUDA\n\nTécnica IMPORTANTE:\n1. Saca del refrigerador\n2. Coloca en tabla de corte LIMPIA\n3. Identifica la FIBRA (líneas de la carne)\n4. Corta PERPENDICULAR a la fibra (ángulo 90 grados)\n5. Las tiras deben ser FINAS: 3-4mm de espesor\n6. Largo: 5-8cm\n7. Coloca en un plato SEPARADO\n\n⚠️ Perpendicular = más tierno al comer.',
        timer_segundos: null
      },
      {
        texto: 'PASO 4: ABRE TOFU NUEVO (MIN 5)\n\nPreparación: 1 paquete NUEVO de TOFU MORI-NU SILKEN (310g)\n\nInstrucciones:\n1. Saca del refrigerador\n2. Abre cuidadosamente (es frágil)\n3. Vierte TODO en CONTENEDOR HERMÉTICO DE VIDRIO\n4. Cierra bien\n5. Etiqueta: "TOFU - Jueves/Viernes CENA" + fecha de hoy\n6. A la NEVERA INMEDIATAMENTE',
        timer_segundos: null
      },
      {
        texto: 'PASO 5: RALLA JENGIBRE (MIN 2-8)\n\nPreparación: ~40-50g de raíz de jengibre fresco\n\nTécnica:\n1. Pela bien la piel café del jengibre\n2. Coloca sobre tabla\n3. Con RALLADOR FINO, ralla hacia abajo\n4. Recoge en un plato\n5. Debes tener ~10-12g de jengibre rallado (solo necesitas menos esta vez que domingo)\n\nNota: Debe ser RALLADO (fibras finas), no picado.',
        timer_segundos: null
      },
      {
        texto: 'PASO 6: COCINA POLLO (MIN 10)\n\nPreparación: Las 135g de pollo en tiras + 5g de ghee\n\nProceso:\n1. Pon sartén antiadherente GRANDE a FUEGO MEDIO-ALTO (posición 6-7)\n2. Espera 1 minuto\n3. Agrega 5g de ghee. Debe verse brillante\n4. Agrega TODAS las tiras de pollo\n5. Cocina SIN REVOLVER 2-3 minutos hasta DORADO\n6. Revuelve. Cocina 3-4 minutos más, moviendo\n7. LISTO cuando:\n   - Exterior: DORADO (café claro)\n   - Interior: Blanco firme\n   - TIEMPO TOTAL: 8-10 minutos\n\n⚠️ No cocines de más.',
        timer_segundos: 600
      },
      {
        texto: 'PASO 7: DIVIDE POLLO EN CUBOS (MIN 20, INMEDIATAMENTE DESPUÉS)\n\nEl pollo debe estar CALIENTE.\n\nDivisión para Jueves Y Viernes:\n1. Saca el pollo cocido de la sartén\n2. Coloca en tabla de corte LIMPIA\n3. Corta en CUBOS pequeños (2cm × 2cm)\n4. Debe salirte ~110g total de pollo en cubos\n5. Divide mentalmente:\n   - 70g cubos → Jueves\n   - 65g cubos → Viernes\n6. Coloca TODO en UN SOLO CONTENEDOR HERMÉTICO DE VIDRIO\n7. Etiqueta: "POLLO CUBOS - Jueves/Viernes almuerzo Teriyaki"\n8. Cierra bien\n9. A la NEVERA INMEDIATAMENTE\n\nNota: Esta vez todo va en UN contenedor (a diferencia de domingo que fue dos contenedores).',
        timer_segundos: null
      },
      {
        texto: 'PASO 8: MARINADA DE RES (MIN 21)\n\nPreparación: Las 110g de res en tiras CRUDA + marinada\n\nMarinada:\n1. En un TAZÓN, mezcla:\n   - 7.5ml de salsa de soya (~1.5 cucharaditas)\n   - 2.5ml de mirin (~0.5 cucharadita)\n   - 2.5g de jengibre rallado\n2. Remueve bien\n\nAgrega res:\n1. Vierte las tiras de res\n2. Remueve hasta que TODAS estén cubiertas\n3. Coloca TODO (res + marinada) en CONTENEDOR HERMÉTICO o BOLSA\n4. Etiqueta: "RES MARINADA - Jueves/Viernes almuerzo Gyudon"\n5. A la NEVERA (NO congelador)\n\n⚠️ Dura 2 días máximo. Se divide en dos almuerzos:\n   - Jueves: 55g\n   - Viernes: 55g',
        timer_segundos: null
      },
      {
        texto: 'PASO 9: GUARDA ARROZ (MIN 15, CUANDO ARROCERA AVISA)\n\n1. Abre la arrocera\n2. Espera 2 minutos a que enfríe un poco (está caliente)\n3. Con cuchara de madera/plástico, remueve suavemente\n4. Coloca en CONTENEDOR HERMÉTICO DE VIDRIO GRANDE\n5. Cierra bien\n6. Etiqueta: "ARROZ - Jueves/Viernes almuerzo" + fecha\n7. A la NEVERA\n\n📌 Rendimiento: 420g crudo rinde ~1.050kg cocido\n   - Jueves: 275g cocido (110g del almuerzo)\n   - Viernes: 275g cocido (110g del almuerzo)',
        timer_segundos: null
      },
      {
        texto: 'CHECKLIST FINAL (MIN 30-35)\n\nVerifica que TODO está en NEVERA, ETIQUETADO y LISTO:\n\n☐ ARROZ - Contenedor hermético, etiquetado, nevera\n☐ POLLO CUBOS - Contenedor hermético, etiquetado, nevera\n☐ RES MARINADA - Contenedor hermético, etiquetado, NEVERA (NO congelador)\n☐ TOFU - Contenedor hermético, etiquetado, nevera\n\n✅ SI TODOS ESTÁN: Batch cooking terminado. Jueves y Viernes preparados.',
        timer_segundos: null
      }
    ],
    almacenamiento: [
      '📦 NEVERA - ARROZ (420g crudo → 1.050kg cocido): 3 días — Jueves/Viernes almuerzo',
      '📦 NEVERA - POLLO CUBOS (110g): 3 días — Jueves (70g) + Viernes (65g) almuerzo',
      '❄️  NEVERA (NO congelador) - RES MARINADA (110g): máximo 2 días — Jueves (55g) + Viernes (55g) almuerzo',
      '📦 NEVERA - TOFU (310g): 3 días — Jueves/Viernes cena'
    ]
  },

  sabado: {
    titulo: 'Sábado — Todo fresco, SIN batch cooking',
    dia: 'sabado',
    tiempo_min: 20,
    nota: 'El salmón se cocina el MISMO DÍA (no congela bien recalentado). Arroz también fresco.',
    tareas: [
      {
        texto: 'SÁBADO ALMUERZO - ARROZ FRESCO:\n\nPreparación: 125g de arroz blanco CRUDO (SOLO para sábado almuerzo)\n\nInstrucciones:\n1. MAÑANA del sábado (o el viernes noche), mide 125g de arroz crudo\n2. En tu ARROCERA, coloca 125g de arroz\n3. Agrega 155ml de agua fría (proporción 1:1.24)\n4. Remueve bien\n5. Enciende la arrocera\n6. Ella te dirá cuando esté listo (~15 minutos)\n7. El arroz rendirá ~315g cocido\n8. Úsalo FRESCO para el almuerzo del sábado\n\n⚠️ IMPORTANTE: Este NO viene del batch. Es fresco el sábado mismo.',
        timer_segundos: null
      },
      {
        texto: 'SÁBADO ALMUERZO - SALMÓN FRESCO:\n\nPreparación: 130g de filete de salmón FRESCO\n\nCompra: \n• Sábado por la MAÑANA en el mercado o supermercado\n• Pide que te lo corten: "130 gramos de salmón filete, con piel"\n• Guarda en el refrigerador en una bolsa hermética\n\nCocción:\n• Ver la receta SALMON_DON en la app\n• Se cocina con air fryer el MISMO DÍA del almuerzo\n• El salmón NO se congela bien. Cocina FRESCO.\n• Úsalo el sábado almuerzo. No hagas batch.\n\n⚠️ IMPORTANTE: Salmón fresco, no congelado. Cocina el mismo día.',
        timer_segundos: null
      }
    ],
    almacenamiento: [
      '🍚 ARROZ - Cocina FRESCO el sábado almuerzo (125g crudo → 315g cocido)',
      '🐟 SALMÓN - Compra FRESCO el sábado por la mañana, cocina el MISMO día con air fryer'
    ]
  }
};

export const getBatchCooking = (dia) => BATCH_COOKING[dia];
export const getBatchCookingList = () => [BATCH_COOKING.domingo_noche, BATCH_COOKING.miercoles_noche];
