/**
 * Recetario corregido — Fase 1 (v3)
 * Con fotos, pasos detallados, y estructura para overlay.
 * FUENTE DE VERDAD: Documento auditado Christian v3.
 */

export const RECETAS = {
  batido_post_entreno: {
    id: 'batido_post_entreno',
    nombre: 'Batido post-entreno',
    foto_url: null, // Placeholder visual en lugar de imagen externa
    tipo: 'batido',
    rango: null,
    cuando: 'Todos los días, justo después de entrenar (~10:30)',
    tiempo_min: 4,
    kcal: 513, proteina_g: 40.2, grasa_g: 13.5, carbo_g: 61,
    ajuste_fase1: null,
    regla_especial: null,
    ingredientes: [
      { nombre: 'Whey Isolate', crudo: '35 g', kcal: 130, p: 30, g: 1, c: 1 },
      { nombre: 'Crema de arroz (Primor)', crudo: '40 g', kcal: 144, p: 3.2, g: 0, c: 32 },
      { nombre: 'Banano', crudo: '100 g (1 ud)', kcal: 89, p: 1, g: 0, c: 23 },
      { nombre: 'Mantequilla de maní', crudo: '25 g', kcal: 150, p: 6, g: 12.5, c: 5 },
      { nombre: 'Creatina', crudo: '5 g', kcal: 0, p: 0, g: 0, c: 0 },
      { nombre: 'Agua', crudo: '400 ml', kcal: 0, p: 0, g: 0, c: 0 }
    ],
    pasos_detallados: [
      { paso: 1, titulo: 'Prepara la estación', texto: 'Antes de encender nada: ten la licuadora limpia y seca sobre la mesa, enchufada, y la gramera digital a mano. Todo listo = puedes empezar.' },
      { paso: 2, titulo: 'Pesa cada ingrediente', texto: 'Con la gramera digital, pesa cada ingrediente ANTES de licuar (nunca a ojo ni con cucharas): 35 g de whey isolate, 40 g de crema de arroz, 5 g de creatina, 25 g de mantequilla de maní, y 100 g de banano pelado (si tu banano pesa más o menos, corta un trozo para llegar exacto).' },
      { paso: 3, titulo: 'Mide el agua', texto: 'Mide 400 ml de agua fría usando las marcas de mL del vaso de la licuadora o una jarra medidora.' },
      { paso: 4, titulo: 'Vierte en orden', texto: 'Vierte en la licuadora, EN ESTE ORDEN: agua → whey → crema de arroz → creatina.' },
      { paso: 5, titulo: 'Primer pulso (bajo)', texto: 'Licúa a velocidad BAJA (botón más lento) durante 10 segundos exactos (cronometra con celular). Este pulso corto evita que el whey forme grumos.', timer_segundos: 10 },
      { paso: 6, titulo: 'Agrega frutas y grasas', texto: 'Destapa, agrega el banano partido en 2-3 trozos y la mantequilla de maní.' },
      { paso: 7, titulo: 'Segundo pulso (alto)', texto: 'Licúa a velocidad ALTA (botón más rápido) durante 20 segundos exactos. La mezcla está lista cuando es completamente lisa, de color café claro uniforme y no ves ni un solo trocito de banano flotando. Si ves grumos, licúa 5 segundos más y revisa de nuevo.', timer_segundos: 20 },
      { paso: 8, titulo: 'Sirve de inmediato', texto: 'Sirve en un vaso de mínimo 500 ml. Tómatelo dentro de los siguientes 15-20 minutos — pasados 30 min la crema de arroz empieza a espesar y a separarse del líquido.' },
      { paso: 9, titulo: 'Lava la licuadora', texto: 'Lava la licuadora de inmediato con agua tibia (el maní se pega y endurece si se seca).' }
    ],
    pasos: [
      'PREPARA LA ESTACIÓN: Antes de empezar nada, coloca la licuadora limpia y SECA sobre la mesa. Verifica que esté enchufada y que funcione. Ten la GRAMERA DIGITAL a mano. Todo listo = puedes empezar. Esto evita atrasos después de entrenar cuando tienes hambre.',
      'PESA CADA INGREDIENTE: Usa la gramera digital ANTES de licuar. NUNCA a ojo ni con cucharas (es impreciso). Pesa: 35 g de whey isolate (polvo de proteína), 40 g de crema de arroz (polvo café claro), 5 g de creatina (polvo blanco, si la usas), 25 g de mantequilla de maní (pasta, del tarro), y 100 g de banano PELADO. Si tu banano pesa 105 g o 95 g, corta un pedacito para llegar a 100 g exactos.',
      'MIDE EL AGUA: Necesitas 400 ml de agua FRÍA. Usa las marcas de mL del vaso de la licuadora si tiene, o una jarra medidora. El agua fría hace que el batido salga más frío y refrescante.',
      'VIERTE EN ORDEN EN LA LICUADORA: Esto es IMPORTANTE porque el whey isolate tiende a formar grumos. Orden: (1) agua primero, (2) whey isolate, (3) crema de arroz, (4) creatina (si la usas). Los polvos se van al agua, no al aire.',
      { texto: 'PRIMER PULSO — VELOCIDAD BAJA: Licúa a la VELOCIDAD MÁS BAJA (botón al mínimo) durante 10 SEGUNDOS EXACTOS. Cronometra con tu celular. Este pulso corto y suave mezcla el whey SIN formar grumos. Si licúas a velocidad alta desde el inicio, el whey se apelmaza y salen bolitas duras que no se deshacen.', timer_segundos: 10 },
      'AGREGA FRUTAS Y GRASAS: Destapa la licuadora. Toma el banano y pártelo en 2-3 trozos (no lo pongas entero, se atasca). Agrega también los 25 g de mantequilla de maní (una cucharada colmada aprox).',
      { texto: 'SEGUNDO PULSO — VELOCIDAD ALTA: Licúa a la VELOCIDAD MÁS ALTA (botón al máximo) durante 20 SEGUNDOS EXACTOS. La mezcla debe quedar COMPLETAMENTE LISA, de color CAFÉ CLARO UNIFORME (no hay manchas blancas de whey sin mezclar ni café oscuro), y NO DEBEN VERSE ni un solo trocito de banano flotando. Si ves grumos o trocitos de banano, licúa 5 segundos más y revisa. Repite si es necesario.', timer_segundos: 20 },
      'SIRVE DE INMEDIATO: Vierte en un vaso grande (MÍNIMO 500 ml). TÓMATELO DENTRO DE LOS SIGUIENTES 15-20 MINUTOS. Pasados 30 minutos, la crema de arroz empieza a ESPESARSE (se vuelve muy espeso, casi como un pudín) y la mezcla se SEPARA (el agua se va al fondo, los polvos suben). Si esperas mucho, queda desagradable de tomar.',
      'LAVA LA LICUADORA INMEDIATAMENTE: Enjuaga con agua tibia (no fría, el maní es graso) y lava bien. Si dejas secar la mantequilla de maní dentro, se pega DURO y es muy difícil de limpiar después. Unos 2 minutos de limpieza ahora te ahorran frustraciones después.'
    ]
  },

  chicken_teriyaki_don: {
    id: 'chicken_teriyaki_don',
    nombre: 'Chicken Teriyaki Don',
    foto_url: null,
    tipo: 'almuerzo',
    rango: 'B',
    cuando: 'Almuerzo — Lunes y Jueves',
    tiempo_min: 12,
    kcal: 808, proteina_g: 43.8, grasa_g: 18.7, carbo_g: 110.5,
    ajuste_fase1: { descripcion: 'Arroz sube de 110 g a 130 g crudo (ya incluido en kcal).', delta_kcal: 70, delta_p: 1.3, delta_g: 0.2, delta_c: 15.5 },
    regla_especial: null,
    ingredientes: [
      { nombre: 'Arroz blanco', crudo: '130 g', cocido: '325 g', kcal: 455, p: 8.3, g: 1.2, c: 100.5 },
      { nombre: 'Pechuga de pollo (del batch)', crudo: '135 g', cocido: '108 g', kcal: 160, p: 32, g: 3, c: 0 },
      { nombre: 'Ghee (cocción)', crudo: '7 g', kcal: 63, p: 0, g: 7, c: 0 },
      { nombre: 'Espinaca', crudo: '50 g', cocido: '40 g', kcal: 12, p: 1.5, g: 0, c: 1 },
      { nombre: 'Salsa soya', crudo: '15 ml', kcal: 10, p: 1, g: 0, c: 1 },
      { nombre: 'Mirin', crudo: '10 ml', kcal: 24, p: 0, g: 0, c: 5 },
      { nombre: 'Jengibre rallado', crudo: '5 g', kcal: 4, p: 0, g: 0, c: 1 },
      { nombre: 'Aceite sésamo (topping)', crudo: '5 ml', kcal: 45, p: 0, g: 5, c: 0 },
      { nombre: 'Sésamo semillas', crudo: '5 g', kcal: 30, p: 1, g: 2.5, c: 1 },
      { nombre: 'Cebolla larga', crudo: '15 g', kcal: 5, p: 0, g: 0, c: 1 }
    ],
    pasos_detallados: [
      { paso: 1, titulo: 'Saca el pollo', texto: 'Saca del refrigerador el pollo ya cocido del batch cooking (108 g cocido = 135 g que pesaste crudo el domingo). Si no separaste porciones, pesa 108 g de pollo cocido ahora en la gramera.' },
      { paso: 2, titulo: 'Saca el arroz', texto: 'Saca también 325 g de arroz ya cocido del batch, de la nevera o el congelador, y recaliéntalo hasta que esté humeante — nunca lo sirvas frío.' },
      { paso: 3, titulo: 'Calienta la sartén', texto: 'Pon una sartén antiadherente (24-26 cm) a FUEGO MEDIO (posición 5 de 9 en la perilla, o el punto intermedio de tu estufa). Déjala calentar vacía 1 minuto.' },
      { paso: 4, titulo: 'Agrega ghee', texto: 'Agrega los 7 g de ghee (≈1 cucharadita colmada). Debe derretirse en 10-15 segundos y verse líquido y brillante, SIN humear. Si humea, baja un poco el fuego — se está quemando.' },
      { paso: 5, titulo: 'Calienta el pollo', texto: 'Agrega el pollo cocido. Muévelo con espátula cada 15-20 segundos durante 2 minutos, hasta que esté caliente por dentro y ligeramente dorado por fuera (dorado = que la superficie cambia de color a café claro; ya está cocido, solo lo estás recalentando y dándole color).', timer_segundos: 120 },
      { paso: 6, titulo: 'Hacer la salsa', texto: 'Agrega directo a la sartén: 15 ml de salsa de soya, 10 ml de mirin, 5 g de jengibre rallado. Sube el fuego a MEDIO-ALTO (6-7) y revuelve sin parar durante 1 minuto: el líquido debe burbujear y reducirse (que hierva sin tapa hasta que el agua se evapora) hasta verse espeso y brillante, pegándose ligeramente al pollo — esa mezcla espesa es la salsa teriyaki, un glaseado.', timer_segundos: 60 },
      { paso: 7, titulo: 'Saltea la espinaca', texto: 'Pasa el pollo con su salsa a un plato. En la MISMA sartén (sin lavar, para aprovechar el sabor), agrega los 50 g de espinaca. Saltéala (muévela sin parar en la sartén) 1 minuto a fuego medio, hasta que se vea marchita (que pierde volumen, se ve más chica y blanda, de un verde oscuro brillante). No pases de 1 minuto o queda aguada.', timer_segundos: 60 },
      { paso: 8, titulo: 'Arma el bowl', texto: 'Primero el arroz (325 g) en la base, encima el pollo con su salsa, y a un lado la espinaca.' },
      { paso: 9, titulo: 'Termina con toppings', texto: 'Termina con: 5 g de semillas de sésamo, 15 g de cebolla larga picada fina, y 5 ml de aceite de sésamo crudo rociado por encima (no se cocina, va al final).' },
      { paso: 10, titulo: 'Sirve', texto: 'Sirve de inmediato mientras está caliente.' }
    ],
    pasos: [
      'Saca del refrigerador el pollo ya cocido del batch cooking. Si viene en un bloque, pesa 108 g (cocido) en la gramera. Colócalo en un plato.',
      'Saca también 325 g de arroz ya cocido del batch, de la nevera o del congelador. En microondas: calienta 2 minutos revolviendo a mitad de camino. En sartén: calienta a fuego medio 2-3 minutos removiendo. El arroz debe estar HUMEANTE (vapor caliente saliendo).',
      'Pon una sartén antiadherente grande (24-26 cm) a FUEGO MEDIO (posición 5 de 9 en la perilla). Déjala vacía durante 1 minuto para que se caliente.',
      'Agrega 7 g de ghee (aproximadamente 1 cucharadita colmada). Espera 10-15 segundos. El ghee debe derretirse completamente, verse líquido y brillante. Si ves humo, baja el fuego — se está quemando.',
      { texto: 'Agrega el pollo cocido a la sartén. Con una espátula de silicona, muévelo cada 15-20 segundos. Cocina durante 2 minutos. El pollo debe verse DORADO (superficie de color café claro, no gris). Si está frío por dentro cuando lo pruebes, cocina 30 segundos más.', timer_segundos: 120 },
      { texto: 'Agrega directo a la sartén (sin sacar el pollo): 15 ml de salsa de soya (aproximadamente 1 cucharada), 10 ml de mirin (aproximadamente 2 cucharaditas), y 5 g de jengibre rallado. SUBE EL FUEGO a MEDIO-ALTO (posición 6-7). Revuelve SIN PARAR durante 1 minuto. El líquido debe BURBUJEAR (hervir lentamente). Verás que la cantidad de líquido disminuye y se vuelve más espeso, pegándose al pollo. Cuando termine debe verse como un glaseado brillante cubriendo el pollo.', timer_segundos: 60 },
      { texto: 'Pasa TODO el pollo con su salsa a un plato limpio. En la MISMA sartén (sin lavarla, para aprovechar los sabores que quedan), agrega 50 g de espinaca. Si es CONGELADA, agrega directo congelada. Si es FRESCA de bolsa, lava bien, pica en trozos medianos y sécala. REVUELVE SIN PARAR durante 1 minuto a fuego MEDIO. La espinaca debe cambiar a un verde oscuro brillante y verse MARCHITA (pierde volumen, se ve más pequeña, blanda). No pases de 1 minuto o queda aguada y sin sabor.', timer_segundos: 60 },
      'Arma el bowl: En un bowl grande, coloca 325 g de arroz caliente en la BASE. Encima del arroz, coloca todo el pollo con su salsa teriyaki (en el centro). A un lado, coloca la espinaca marchita.',
      'Termina con los toppings: Espolvorea 5 g de semillas de sésamo sobre el pollo. Pica 15 g de cebolla larga (solo la parte verde, finita) y espolvorea. Rocía 5 ml de aceite de sésamo CRUDO (NO se cocina, va al final para mantener su sabor) por encima de todo.',
      'Sirve de inmediato mientras está caliente. Si esperas mucho, el arroz se enfría.'
    ]
  },

  gyudon: {
    id: 'gyudon',
    nombre: 'Gyudon — Beef Bowl',
    foto_url: 'https://images.unsplash.com/photo-1585238341710-4dd19c75f39e?w=600&q=80',
    tipo: 'almuerzo',
    rango: 'B',
    cuando: 'Almuerzo — Martes y Viernes',
    tiempo_min: 10,
    kcal: 758, proteina_g: 37.5, grasa_g: 23.5, carbo_g: 95.5,
    ajuste_fase1: null,
    regla_especial: null,
    ingredientes: [
      { nombre: 'Arroz blanco', crudo: '110 g', cocido: '275 g', kcal: 385, p: 7, g: 1, c: 85 },
      { nombre: 'Res lomo (tiras, marinada)', crudo: '110 g', cocido: '88 g', kcal: 180, p: 22, g: 10, c: 0 },
      { nombre: 'Huevo', crudo: '1 ud (50 g)', kcal: 70, p: 6, g: 5, c: 0.5 },
      { nombre: 'Cebolla larga', crudo: '30 g', kcal: 10, p: 0.5, g: 0, c: 2 },
      { nombre: 'Ghee (cocción)', crudo: '5 g', kcal: 45, p: 0, g: 5, c: 0 },
      { nombre: 'Salsa soya', crudo: '15 ml', kcal: 10, p: 1, g: 0, c: 1 },
      { nombre: 'Mirin', crudo: '10 ml', kcal: 24, p: 0, g: 0, c: 5 },
      { nombre: 'Jengibre rallado', crudo: '5 g', kcal: 4, p: 0, g: 0, c: 1 },
      { nombre: 'Sésamo semillas', crudo: '5 g', kcal: 30, p: 1, g: 2.5, c: 1 }
    ],
    pasos_detallados: [
      { paso: 1, titulo: 'Saca la res marinada', texto: 'Saca la res en tiras ya marinada del refrigerador (110 g crudo). La marinada es la mezcla de salsa de soya + mirin + jengibre que le dejaste reposar desde el batch, para que absorba sabor.' },
      { paso: 2, titulo: 'Saca el arroz', texto: 'Saca también 275 g de arroz cocido del batch, de la nevera o el congelador, y recaliéntalo hasta que esté humeante.' },
      { paso: 3, titulo: 'Calienta bien la sartén', texto: 'Sartén a FUEGO ALTO (posición 8 de 9). A diferencia del pollo, la res necesita la sartén MUY caliente para sellar rápido y no soltar tanto líquido.' },
      { paso: 4, titulo: 'Agrega ghee', texto: 'Agrega los 5 g de ghee — debe derretirse casi al instante y verse brillante.' },
      { paso: 5, titulo: 'Sella la res', texto: 'Agrega las tiras de res. NO las muevas durante los primeros 90 segundos — esto es sellar la carne (dejarla quieta en la sartén muy caliente para que se forme una costra oscura por fuera y se atrapen los jugos por dentro). Verás que el lado en contacto con la sartén pasa de rojo/rosado a café oscuro.', timer_segundos: 90 },
      { paso: 6, titulo: 'Voltea y sella', texto: 'Voltea las tiras y sella el otro lado 90 segundos más. Punto correcto: por fuera café oscuro, y si cortas una tira por dentro se ve rosado pálido a café claro (término medio) — no rojo crudo brillante.', timer_segundos: 90 },
      { paso: 7, titulo: 'Saltea verduras', texto: 'Baja el fuego a MEDIO. Agrega 30 g de cebolla larga picada y 5 g de jengibre rallado. Saltéalos 2 minutos moviendo, hasta que la cebolla esté translúcida (que se ve casi transparente, sin el blanco opaco que tiene cruda) y suave.', timer_segundos: 120 },
      { paso: 8, titulo: 'Hacer glaseado', texto: 'Agrega 15 ml de salsa de soya y 10 ml de mirin. Sube brevemente a fuego medio-alto y deja reducir 1 minuto moviendo, hasta que la salsa espese y cubra la carne como un glaseado brillante.', timer_segundos: 60 },
      { paso: 9, titulo: 'Fríe el huevo', texto: 'Pasa la carne a un plato. En sartén aparte (o la misma, limpia con papel), fríe 1 huevo a fuego medio-bajo, sin voltear, 2-3 minutos: la clara debe quedar blanca y firme (opaca, no transparente), y la yema brillante y líquida al inclinar el plato. Si todavía se ve transparente, déjalo 30-60 segundos más.', timer_segundos: 150 },
      { paso: 10, titulo: 'Arma el bowl', texto: 'Arroz (275 g) → carne con su salsa → huevo frito encima → 5 g de sésamo espolvoreado.' }
    ],
    pasos: [
      'Saca del refrigerador la res en tiras (ya marinada, 110 g). La marinada es la mezcla de salsa de soya + mirin + jengibre que reposó desde el batch cooking.',
      'Saca 275 g de arroz cocido del batch (nevera o congelador). En microondas: calienta 1-2 minutos revolviendo a mitad de camino. En sartén: calienta a fuego medio 2-3 minutos removiendo. El arroz debe estar HUMEANTE.',
      'Pon una sartén antiadherente a FUEGO MUY ALTO (posición 8 de 9). La sartén debe estar CALIENTE. A diferencia del pollo, la res necesita sartén muy caliente para sellarse rápido y no soltar tanto líquido.',
      'Agrega 5 g de ghee. Debe derretirse casi AL INSTANTE (en 3-5 segundos) y verse brillante. Si no se derrite rápido, la sartén no está lo suficientemente caliente.',
      { texto: 'Agrega TODA la res (las tiras con su marinada). NO REVUELVAS NADA durante 90 segundos exactos. Esto se llama SELLAR: dejas la carne quieta en la sartén muy caliente para que se forme una costra oscura por fuera, atrapando los jugos por dentro. Verás que el lado en contacto con la sartén pasa de rojo/rosado a CAFÉ OSCURO. No toques.', timer_segundos: 90 },
      { texto: 'Después de 90 segundos, VOLTEA TODAS las tiras con una espátula. Sella el otro lado 90 segundos más. Debe quedar CAFÉ OSCURO por fuera. Si cortas una tira por la mitad (después de cocinar), debe verse rosado pálido en el interior (TÉRMINO MEDIO), no rojo brillante (crudo). Si ves rojo crudo, cocina 30 segundos más por lado.', timer_segundos: 90 },
      { texto: 'BAJA EL FUEGO a MEDIO (posición 5). Pica 30 g de cebolla larga (toda, incluida la parte blanca) en trozos medianos. Agrega a la sartén junto con 5 g de jengibre rallado. REVUELVE SIN PARAR durante 2 minutos. La cebolla debe cambiar de BLANCO OPACO a TRANSLÚCIDO (casi transparente, como de vidrio). Debe estar blanda.', timer_segundos: 120 },
      { texto: 'Agrega 15 ml de salsa de soya (aproximadamente 1 cucharada) y 10 ml de mirin (aproximadamente 2 cucharaditas) directo a la sartén. SUBE BREVEMENTE A FUEGO MEDIO-ALTO (posición 6-7). Revuelve SIN PARAR durante 1 minuto. El líquido debe REDUCIRSE (disminuir) y volverse ESPESO y BRILLANTE, pegándose ligeramente a la carne. Esto es el GLASEADO. Cuando termina, la cantidad de líquido es mucho menos.', timer_segundos: 60 },
      { texto: 'Pasa TODA la carne con su salsa a un plato limpio. En la MISMA sartén (o en otra pequeña, limpia con papel), fríe 1 HUEVO a fuego MEDIO-BAJO. SIN VOLTEAR. Cocina 2-3 minutos. Sabrás que está listo cuando: la CLARA está BLANCA OPACA (no transparente) y la YEMA está BRILLANTE Y LÍQUIDA cuando inclinas el plato. Si todavía ves transparencia en la clara, cocina 30-60 segundos más.', timer_segundos: 150 },
      'Arma el bowl: En un bowl grande, coloca 275 g de arroz caliente en la BASE. Encima del arroz, coloca TODA la carne con su glaseado (en el centro). Encima de la carne, coloca el huevo frito. Espolvorea 5 g de semillas de sésamo sobre todo. Sirve de inmediato.',
    ]
  },

  egg_soboro_don: {
    id: 'egg_soboro_don',
    nombre: 'Egg Soboro Don',
    foto_url: 'https://images.unsplash.com/photo-1584080298045-c35b67e16f96?w=600&q=80',
    tipo: 'almuerzo',
    rango: 'B',
    cuando: 'Almuerzo — Miércoles',
    tiempo_min: 10,
    kcal: 846, proteina_g: 41.8, grasa_g: 25.2, carbo_g: 110,
    ajuste_fase1: { descripcion: 'Arroz sube de 110 g a 130 g crudo (ya incluido en kcal).', delta_kcal: 70, delta_p: 1.3, delta_g: 0.2, delta_c: 15.5 },
    regla_especial: null,
    ingredientes: [
      { nombre: 'Arroz blanco', crudo: '130 g', cocido: '325 g', kcal: 455, p: 8.3, g: 1.2, c: 100.5 },
      { nombre: 'Huevos', crudo: '3 ud (150 g)', kcal: 210, p: 18, g: 15, c: 1.5 },
      { nombre: 'Pechuga desmenuzada (del batch)', crudo: '60 g', cocido: '48 g', kcal: 70, p: 14, g: 1.5, c: 0 },
      { nombre: 'Salsa soya', crudo: '10 ml', kcal: 7, p: 0.5, g: 0, c: 1 },
      { nombre: 'Mirin', crudo: '10 ml', kcal: 24, p: 0, g: 0, c: 5 },
      { nombre: 'Aceite sésamo', crudo: '5 ml', kcal: 45, p: 0, g: 5, c: 0 },
      { nombre: 'Cebolla larga', crudo: '15 g', kcal: 5, p: 0, g: 0, c: 1 },
      { nombre: 'Sésamo semillas', crudo: '5 g', kcal: 30, p: 1, g: 2.5, c: 1 }
    ],
    pasos_detallados: [
      { paso: 1, titulo: 'Bate los huevos', texto: 'En un bowl, bate 3 huevos (150 g) con 10 ml de salsa de soya y 10 ml de mirin usando un tenedor, hasta que el color sea amarillo parejo (sin vetas blancas de clara sin mezclar).' },
      { paso: 2, titulo: 'Calienta a fuego bajo', texto: 'Sartén a FUEGO MEDIO-BAJO (posición 3-4 de 9) — esto es clave para lograr la textura soboro (granitos sueltos de huevo, en vez de una tortilla entera).' },
      { paso: 3, titulo: 'Vierte el huevo', texto: 'Vierte el huevo batido en la sartén (sin aceite si es antiadherente).' },
      { paso: 4, titulo: 'Revuelve constantemente', texto: 'Empieza a revolver de inmediato, rápido y sin parar, con 3-4 palillos de madera juntos o dos tenedores, como "desmenuzando" el huevo mientras se cocina. Este movimiento constante durante 3 minutos es lo que evita que se forme una tortilla: debe quedar en granitos pequeños e irregulares, húmedos pero no líquidos.', timer_segundos: 180 },
      { paso: 5, titulo: 'Retira cuando esté listo', texto: 'Retira del fuego apenas ya no veas huevo líquido brillante (a los ~3 minutos). Si dejas de mover aunque sea 10 segundos, se pega en trozos grandes — no pares de mover.' },
      { paso: 6, titulo: 'Saca el pollo', texto: 'Saca 48 g de pechuga de pollo ya cocida y desmenuzada del batch. Si no está desmenuzada, deshébrala ahora con dos tenedores.' },
      { paso: 7, titulo: 'Saca el arroz', texto: 'Saca también 325 g de arroz ya cocido del batch, de la nevera o el congelador, y recaliéntalo hasta que esté humeante — nunca lo sirvas frío.' },
      { paso: 8, titulo: 'Arma el bowl', texto: '325 g de arroz cocido en la base; sobre una mitad pon el huevo soboro y sobre la otra mitad el pollo desmenuzado, para que se vean los dos colores separados.' },
      { paso: 9, titulo: 'Termina', texto: 'Termina con: 5 ml de aceite de sésamo rociado, 15 g de cebolla larga picada y 5 g de sésamo por encima.' }
    ],
    pasos: [
      'En un bowl mediano, rompe 3 huevos. Agrega 10 ml de salsa de soya (aproximadamente 2 cucharaditas) y 10 ml de mirin (aproximadamente 2 cucharaditas). Con un tenedor, BATE bien hasta que el color sea AMARILLO PAREJO en toda la mezcla. NO deben verse vetas blancas de clara sin batir. Tarda ~1 minuto de batido constante.',
      'Pon una sartén antiadherente a FUEGO MEDIO-BAJO (posición 3-4 de 9). Esto es CLAVE — si el fuego está muy alto, el huevo se pegará en trozos grandes. Espera que se caliente 1 minuto.',
      'Vierte TODO el huevo batido en la sartén (sin aceite si es antiadherente). Verás que empieza a coagularse.',
      { texto: 'INMEDIATAMENTE empieza a REVOLVER SIN PARAR. Usa 3-4 palillos de madera juntos o dos tenedores, como si estuvieras "desmenuzando" el huevo mientras se cocina. El movimiento debe ser RÁPIDO y CONSTANTE durante 3 MINUTOS EXACTOS. NO pares de mover, ni un segundo. Si paras, el huevo se pega en trozos grandes (tortilla). Debe quedar en GRANITOS PEQUEÑOS E IRREGULARES, un poco húmedos pero NO líquidos.', timer_segundos: 180 },
      'Apenas ya NO VEAS HUEVO LÍQUIDO BRILLANTE en la mezcla (a los ~3 minutos), RETIRA DEL FUEGO INMEDIATAMENTE. Coloca la sartén en un lugar seguro.',
      'Saca 48 g de pechuga de pollo ya cocida del batch. Si viene en un bloque, pesa 48 g. Si está DESMENUZADA, úsala tal cual. Si está en trozos, deshébrala con dos tenedores tirando suavemente en direcciones opuestas hasta que quede toda deshilachada.',
      'Saca 325 g de arroz cocido del batch (nevera o congelador). En microondas: calienta 2 minutos revolviendo a mitad de camino. En sartén: calienta a fuego medio 2-3 minutos removiendo. El arroz debe estar HUMEANTE.',
      'Arma el bowl: En un bowl grande, coloca 325 g de arroz caliente en la BASE. Divide mentalmente el arroz en dos mitades. En UNA MITAD, coloca todo el huevo soboro (los granitos que acabas de cocinar). En la OTRA MITAD, coloca todo el pollo desmenuzado. Los dos colores deben verse separados (amarillo de huevo, blanco/café del pollo).',
      'Termina: Rocía 5 ml de aceite de sésamo CRUDO (NO cocido) sobre el bowl completo. Pica 15 g de cebolla larga bien fina (solo la parte verde, si prefieres) y espolvorea. Espolvorea 5 g de semillas de sésamo. Sirve de inmediato mientras está caliente.'
    ]
  },

  salmon_don: {
    id: 'salmon_don',
    nombre: 'Salmon Don',
    foto_url: null,
    tipo: 'almuerzo',
    rango: 'A',
    cuando: 'Almuerzo — Sábado',
    tiempo_min: 15,
    kcal: 852, proteina_g: 37.8, grasa_g: 30.1, carbo_g: 101.5,
    ajuste_fase1: { descripcion: 'Arroz sube de 105 g a 125 g crudo, aceite de oliva de 5 ml a 10 ml (ya incluido).', delta_kcal: 115, delta_p: 1.3, delta_g: 5.1, delta_c: 15.6 },
    regla_especial: null,
    ingredientes: [
      { nombre: 'Arroz blanco', crudo: '125 g', cocido: '315 g', kcal: 440, p: 8.3, g: 0.6, c: 97.5 },
      { nombre: 'Salmón filete', crudo: '130 g', cocido: '105 g', kcal: 265, p: 26, g: 17, c: 0 },
      { nombre: 'Espinaca', crudo: '50 g', cocido: '40 g', kcal: 12, p: 1.5, g: 0, c: 1 },
      { nombre: 'Aceite oliva (topping)', crudo: '10 ml', kcal: 90, p: 0, g: 10, c: 0 },
      { nombre: 'Salsa soya', crudo: '10 ml', kcal: 7, p: 0.5, g: 0, c: 1 },
      { nombre: 'Nori (tiras)', crudo: '2 g', kcal: 5, p: 0.5, g: 0, c: 0.5 },
      { nombre: 'Sésamo semillas', crudo: '5 g', kcal: 30, p: 1, g: 2.5, c: 1 },
      { nombre: 'Cebolla larga', crudo: '10 g', kcal: 3, p: 0, g: 0, c: 0.5 }
    ],
    pasos_detallados: [
      { paso: 1, titulo: 'Precalienta air fryer', texto: 'Precalienta la air fryer a 180°C durante 3 minutos (vacía, con la canasta puesta) mientras preparas el salmón.' },
      { paso: 2, titulo: 'Seca el salmón', texto: 'Seca el filete de salmón (130 g) con papel de cocina por ambos lados — si queda húmedo no dora bien.' },
      { paso: 3, titulo: 'Sazona', texto: 'Sazona con ¼ de cucharadita de sal (≈1.5 g) y 6-8 vueltas de molino de pimienta, repartidas en ambos lados y frotadas suavemente con los dedos (no aporta calorías relevantes).' },
      { paso: 4, titulo: 'Coloca en air fryer', texto: 'Coloca el salmón en la canasta de la air fryer (piel hacia abajo si la tiene), sin encimar con nada más.' },
      { paso: 5, titulo: 'Cocina en air fryer', texto: 'Cocina a 180°C durante 10 minutos SIN abrir la air fryer ni voltear antes de tiempo. Está listo cuando, al presionarlo suavemente con un tenedor, se separa fácilmente en láminas y el centro se ve opaco rosado-anaranjado (opaco = sólido, sin brillo vidrioso; no translúcido).', timer_segundos: 600 },
      { paso: 6, titulo: 'Saltea espinaca', texto: 'Mientras tanto, en sartén SECA (sin aceite ni ghee) a fuego medio, saltea 50 g de espinaca 1 minuto moviendo sin parar, hasta que esté marchita.' },
      { paso: 7, titulo: 'Cocina arroz fresco', texto: 'Cocina 125 g de arroz crudo en la arrocera (agua según las marcas de tu arrocera, normalmente proporción 1:1.2 a 1:1.5 arroz:agua) — rinde ≈315 g cocido. La arrocera avisa sola cuando pasa a "mantener caliente". Este arroz se cocina fresco hoy mismo, no viene del congelador.' },
      { paso: 8, titulo: 'Arma el bowl', texto: 'Arroz → espinaca → el salmón encima (entero o en 2-3 trozos).' },
      { paso: 9, titulo: 'Termina con toppings', texto: 'Termina con: 10 ml de salsa de soya rociada, 2 g de nori cortado en tiras finas con tijera, 5 g de sésamo, 10 g de cebolla larga picada y 10 ml de aceite de oliva crudo por encima.' },
      { paso: 10, titulo: 'Importante', texto: 'Si al presionarlo no se separa fácil en láminas o el centro todavía se ve translúcido/vidrioso (no opaco), vuelve a cerrar la air fryer y cocina 2-3 minutos más — no te arriesgues a comer pescado crudo por dentro.' }
    ],
    pasos: [
      'PRIMERO: Precalienta la air fryer a 180°C durante exactamente 3 minutos (vacía, con la canasta puesta adentro). Mientras se precalienta, prepara el salmón en los siguientes pasos.',
      'Saca el filete de salmón (130 g) del refrigerador o congelador. Con papel de cocina LIMPIO, seca bien por AMBOS lados (parte de piel y parte de carne). Si queda húmedo no dora bien en la air fryer.',
      'Sazona el salmón: Usando ¼ de cucharadita de sal (aproximadamente 1.5 g) y un molino de pimienta fresca, espolvorea por ambos lados. Usa 6-8 vueltas del molino de pimienta (no cuentes, aproximadamente). Frota suavemente con los dedos para que se distribuya bien. Estos condimentos NO suman calorías relevantes.',
      'Coloca el salmón en la CANASTA de la air fryer (NO en la bandeja inferior). Si el filete tiene piel, coloca con la PIEL HACIA ABAJO. No pongas nada más encima ni alrededor del salmón.',
      { texto: 'Cocina a 180°C durante 10 MINUTOS EXACTOS. NO ABRAS la air fryer antes de los 10 minutos. NO VOLTEES el salmón. Déjalo tranquilo. A los 10 minutos, abre y verifica: Presiona suavemente el salmón con un tenedor. Debe separarse FÁCILMENTE en láminas (trozos hojosos). El CENTRO debe verse OPACO de color rosado-anaranjado (opaco = sólido, sin brillo aceitoso o vidrioso). Si todavía ves el centro translúcido (brillante como agua) o rojo, NO ESTÁ LISTO — cocina 2-3 minutos más.', timer_segundos: 600 },
      { texto: 'Mientras el salmón se cocina en la air fryer, prepara la espinaca (minuto 2-3): En una sartén pequeña, SIN ACEITE NI GHEE (completamente seca), a fuego MEDIO, coloca 50 g de espinaca. Si es CONGELADA, colócala directo. Si es FRESCA de bolsa, lava bien, pica en trozos medianos y sécala con papel. REVUELVE SIN PARAR durante 1 minuto exacto. La espinaca debe cambiar a VERDE OSCURO BRILLANTE y verse MARCHITA (pierde volumen, se ve más pequeña, blanda). NO pases de 1 minuto.', timer_segundos: 60 },
      'Cocina el ARROZ FRESCO (minuto 1 o después, mientras se cocinan las otras cosas): En una ARROCERA (no en sartén), coloca 125 g de arroz blanco crudo. Agrega AGUA según las marcas de tu arrocera — normalmente es una proporción 1:1.2 a 1:1.5 (arroz:agua). Por ejemplo, si la marca dice 1.2, es 125 g de arroz con 150 ml de agua. Si no tiene marcas, prueba 155 ml de agua. Enciende la arrocera. Ella misma cambiará a "Mantener caliente" cuando esté lista. El arroz rendirá aproximadamente 315 g cocido. ESTE ARROZ ES FRESCO, NO viene del congelador como los otros días.',
      'Cuando el salmón está listo (después de verificar que está opaco en el centro), arma el bowl: En un bowl grande, coloca 315 g de arroz CALIENTE en la BASE. Encima del arroz, coloca la espinaca marchita. Encima de la espinaca, coloca el salmón entero o en 2-3 trozos grandes (según tamaño del filete).',
      'Termina con los toppings: Rocía 10 ml de salsa de soya (aproximadamente 2 cucharaditas) sobre el salmón. Corta 2 g de nori (alga) en tiras finas usando tijera. Espolvorea el nori. Espolvorea 5 g de semillas de sésamo. Pica 10 g de cebolla larga bien fina (solo la parte verde si prefieres) y espolvorea. Finalmente, rocía 10 ml de aceite de oliva CRUDO (NO se cocina, va al final para mantener su sabor) por encima de TODO.',
      'IMPORTANTE — Control de cocción del salmón: Si después de los 10 minutos el salmón no se separa fácil en láminas o el centro todavía se ve translúcido (brillante, no opaco), el pescado NO está cocido. Vuelve a meter en la air fryer otros 2-3 minutos. NO te apresures — un pescado crudo por dentro es peligroso. Es mejor cocinarlo un poco de más que de menos.'
    ]
  },

  miso_udon_huevo: {
    id: 'miso_udon_huevo',
    nombre: 'Miso Udon + Huevo',
    foto_url: 'https://images.unsplash.com/photo-1552611052-33ffed76715f?w=600&q=80',
    tipo: 'cena',
    rango: 'B',
    cuando: 'Cena — Lunes y Jueves',
    tiempo_min: 10,
    kcal: 655, proteina_g: 31.1, grasa_g: 20.9, carbo_g: 85.4,
    ajuste_fase1: null,
    regla_especial: 'El miso se disuelve SIEMPRE fuera del fuego — hervirlo destruye los probióticos vivos y amarga el sabor.',
    ingredientes: [
      { nombre: 'Fideos udon', crudo: '100 g seco', cocido: '220 g', kcal: 350, p: 9, g: 1, c: 75 },
      { nombre: 'Pasta miso', crudo: '20 g', kcal: 35, p: 2, g: 1, c: 5 },
      { nombre: 'Huevos', crudo: '2 ud (100 g)', kcal: 140, p: 12, g: 10, c: 1 },
      { nombre: 'Espinaca', crudo: '40 g', cocido: '30 g', kcal: 10, p: 1, g: 0, c: 1 },
      { nombre: 'Tofu Mori-Nu Silken', crudo: '80 g', kcal: 47, p: 6.6, g: 1.9, c: 1.9 },
      { nombre: 'Aceite sésamo', crudo: '7 ml', kcal: 63, p: 0, g: 7, c: 0 },
      { nombre: 'Nori', crudo: '2 g', kcal: 5, p: 0.5, g: 0, c: 0.5 },
      { nombre: 'Cebolla larga', crudo: '15 g', kcal: 5, p: 0, g: 0, c: 1 }
    ],
    pasos: [
      'Hierve 500 ml de agua en una olla grande a fuego ALTO. Sabrás que está lista cuando ves burbujas grandes subiendo rápido desde el fondo.',
      { texto: 'Agrega 100 g de fideos udon SECOS (vienen en paquete). Revuelve bien para que no se peguen. Desde que el agua vuelve a hervir, cocina exactamente 3 minutos cronometrando con tu celular.', timer_segundos: 180 },
      { texto: 'Agrega 40 g de espinaca. Si es CONGELADA: mete directo congelada. Si es FRESCA de bolsa: lava, pica en trozos medianos, sécala bien con papel. Cocina 1 minuto más removiendo.', timer_segundos: 60 },
      'RETIRA LA OLLA DEL FUEGO COMPLETAMENTE. Colócala lejos de la estufa. NO HIERVAS MÁS — si hierves el miso se destruye.',
      'En un cucharón pequeño, disuelve 20 g de pasta miso: Vierte un poco del caldo caliente (no hirviendo) en el cucharón, agrega el miso y revuelve con una cuchara hasta que no queden grumos (tarda ~30 seg). Vierte todo de vuelta a la olla revolviendo lentamente.',
      'Prepara el huevo: OPCIÓN A (Pochéado — más fácil para principiantes): Calienta una sartén pequeña con agua, cuando hierva baja a fuego bajo y rompe 2 huevos en tazas pequeñas. Deslízalos suavemente en el agua caliente, cocina 3-4 minutos sin tapar hasta que la clara esté blanca opaca y la yema siga liquida. OPCIÓN B (Revuelto — si prefieres): Revuelve 2 huevos en un tazón, en sartén pequeña con fuego medio-bajo cocina revolviendo 2-3 minutos hasta que esté firme pero con un poco de humedad. Los dos están bien.',
      'Agrega 80 g de tofu Mori-Nu del recipiente (viene en su propio envase de vidrio). El tofu Silken es DELICADO: agrégalo con una cuchara sin grandes movimientos. Deja reposar 30 segundos sin mover la olla para que se temple.',
      'Sirve en un bowl hondo: Vierte la sopa con fideos, espinaca y tofu. Coloca el huevo (pochéado o revuelto) encima. Termina con: 2 g de nori cortado en tiras finas con tijera, 15 g de cebolla larga picada fina, y 7 ml de aceite de sésamo CRUDO rociado por encima (el aceite NO se cocina, va al final para que mantenga su sabor).'
    ]
  },

  tofu_don_espinaca: {
    id: 'tofu_don_espinaca',
    nombre: 'Tofu Don + Espinaca',
    foto_url: null,
    tipo: 'cena',
    rango: 'B',
    cuando: 'Cena — Martes y Viernes',
    tiempo_min: 15,
    kcal: 760, proteina_g: 33.5, grasa_g: 27.7, carbo_g: 94,
    ajuste_fase1: null,
    regla_especial: null,
    ingredientes: [
      { nombre: 'Arroz blanco', crudo: '100 g', cocido: '250 g', kcal: 350, p: 7, g: 0.5, c: 78 },
      { nombre: 'Tofu Mori-Nu Silken (cubos)', crudo: '200 g', kcal: 118, p: 16.5, g: 4.7, c: 4.7 },
      { nombre: 'Almidón de maíz (maicena)', crudo: '8 g', kcal: 30, p: 0, g: 0, c: 7.3 },
      { nombre: 'Huevo', crudo: '1 ud (50 g)', kcal: 70, p: 6, g: 5, c: 0.5 },
      { nombre: 'Espinaca', crudo: '60 g', cocido: '45 g', kcal: 14, p: 2, g: 0, c: 1 },
      { nombre: 'Ghee (cocción)', crudo: '10 g', kcal: 90, p: 0, g: 10, c: 0 },
      { nombre: 'Salsa soya', crudo: '15 ml', kcal: 10, p: 1, g: 0, c: 1 },
      { nombre: 'Aceite sésamo (topping)', crudo: '5 ml', kcal: 45, p: 0, g: 5, c: 0 },
      { nombre: 'Sésamo semillas', crudo: '5 g', kcal: 30, p: 1, g: 2.5, c: 1 },
      { nombre: 'Cebolla larga', crudo: '10 g', kcal: 3, p: 0, g: 0, c: 0.5 }
    ],
    pasos: [
      'PASO 1: Escurre el tofu (esto tarda 15 minutos así que hazlo primero). Abre la caja del tofu Mori-Nu. Coloca el bloque ENTERO sobre 3-4 capas de papel de cocina limpio. Déjalo reposar 15 minutos EXACTOS sin mover, sin presionar, sin poner nada encima. Esto elimina el agua que tiene adentro.',
      'Mientras escurre el tofu, prepara la espinaca: Si es CONGELADA (bolsa del congelador), úsala tal cual. Si es FRESCA de bolsa, lava bien bajo agua fría, pica en trozos medianos (no demasiado pequeños o se deshacen) y sécala muy bien con papel de cocina.',
      'Pasados los 15 minutos, corta el tofu en cubos de 2 cm: Coloca la tabla sobre una superficie estable. Con un cuchillo bien afilado, haz cortes limpios y seguros. El tofu Silken es delicado — no presiones el cuchillo, déjalo hacer el trabajo. Si un cubo se desmorona un poco, está bien, colócalo igual en la sartén.',
      'Pasa el tofu por maicena JUSTO ANTES de freír (no antes, o se humedece y no dora): En un plato hondo, coloca 8 g de almidón de maíz. Toma cada cubo delicadamente y pásalo por la maicena cubriéndolo por todos los lados. Sacude el exceso suavemente. El tofu debe verse cubierto de polvillo blanco.',
      'Calienta la sartén grande antiadherente a FUEGO MEDIO (posición 5 de 9 en la perilla). Espera 1 minuto. Agrega 10 g de ghee (aproximadamente 1 cucharadita colmada). Espera hasta que se derrita completamente y se vea brillante sin fumar.',
      'Coloca los cubos de tofu en la sartén SIN QUE SE TOQUEN entre sí (si no caben todos, hazlo en 2 tandas, 4-5 cubos por tanda). NO revuelvas ni toques durante los primeros 2 minutos — esto deja que se dore el lado inferior. Verás que se pone café oscuro.',
      { texto: 'Gira cada cubo con una espátula de plástico LENTAMENTE. Cocina 2 minutos más. Vuelve a girar para que dore otro lado. Repite hasta que TODOS los lados estén dorados (café claro a café oscuro). En total tarda unos 8-10 minutos. El tofu debe verse dorado en todos lados, firme pero no quemado.', timer_segundos: 600 },
      { texto: 'Mientras el tofu dora, prepara la espinaca en una sartén PEQUEÑA APARTE (o cuando termines el tofu): A fuego MEDIO, coloca 60 g de espinaca (fresca o congelada, ya preparada). Si es fresca, NO agregues aceite (cociná en seco). Si prefieres, agrega 1/2 cucharadita de ghee. Mueve SIN PARAR durante 1 minuto, hasta que la espinaca esté MARCHITA (cambia de color a verde oscuro brillante, pierde volumen, se ve blanda). No pases de 1 minuto o queda aguada.', timer_segundos: 60 },
      { texto: 'Fríe el huevo en la MISMA sartén pequeña donde cociste la espinaca (limpia con papel si queda restos): A fuego MEDIO-BAJO, agrega 1 huevo (sin cáscara). Cocina SIN VOLTEAR durante 2-3 minutos. Sabrás que está listo cuando: la clara es BLANCA OPACA (no transparente) y la yema sigue BRILLANTE Y LÍQUIDA al inclinar el plato. Si todavía ves transparencia en la clara, cocina 30 segundos más.', timer_segundos: 180 },
      'Recalienta el arroz (250 g cocido) del refrigerador: En microondas 1-2 minutos (revolviendo a mitad de camino) o en sartén a fuego medio 2-3 minutos removiendo. Debe estar HUMEANTE (con vaho caliente saliendo).',
      'Arma el bowl: Primero coloca 250 g de arroz caliente en la BASE. Encima del arroz, coloca los cubos de tofu dorados en el CENTRO. A un lado, coloca la espinaca marchita. Encima de todo, coloca el huevo frito.',
      'Termina: Rocía 15 ml de salsa de soya (aproximadamente 1 cucharada) sobre el tofu. Rocía 5 ml de aceite de sésamo CRUDO (NO cocido, va al final) por encima. Espolvorea 5 g de semillas de sésamo. Pica 10 g de cebolla larga fina y espolvorea encima. Sirve CALIENTE.'
    ]
  },

  sopa_miso_arroz_tofu: {
    id: 'sopa_miso_arroz_tofu',
    nombre: 'Tofu Tamago Miso Shiru Teishoku',
    foto_url: 'https://images.unsplash.com/photo-1551632440-83d424c9a14d?w=600&q=80',
    tipo: 'cena',
    rango: 'C',
    cuando: 'Cena — Miércoles, Sábado y Domingo',
    tiempo_min: 8,
    kcal: 611, proteina_g: 26.9, grasa_g: 16.3, carbo_g: 88.8,
    ajuste_fase1: null,
    regla_especial: 'El miso se disuelve SIEMPRE fuera del fuego. Arroz se sirve en bowl aparte (no mezclado).',
    ingredientes: [
      { nombre: 'Arroz blanco', crudo: '100 g', cocido: '250 g', kcal: 350, p: 7, g: 0.5, c: 78 },
      { nombre: 'Pasta miso', crudo: '20 g', kcal: 35, p: 2, g: 1, c: 5 },
      { nombre: 'Tofu Mori-Nu Silken (cubos)', crudo: '120 g', kcal: 71, p: 9.9, g: 2.8, c: 2.8 },
      { nombre: 'Huevo', crudo: '1 ud (50 g)', kcal: 70, p: 6, g: 5, c: 0.5 },
      { nombre: 'Espinaca', crudo: '50 g', cocido: '40 g', kcal: 12, p: 1.5, g: 0, c: 1 },
      { nombre: 'Nori', crudo: '2 g', kcal: 5, p: 0.5, g: 0, c: 0.5 },
      { nombre: 'Aceite sésamo', crudo: '7 ml', kcal: 63, p: 0, g: 7, c: 0 },
      { nombre: 'Cebolla larga', crudo: '15 g', kcal: 5, p: 0, g: 0, c: 1 }
    ],
    pasos: [
      'Prepara el tofu PRIMERO (esto es importante para que no se apresure): Abre la caja del tofu Mori-Nu. Con un cuchillo bien afilado, corta el bloque en cubos de 2 cm. Usa movimientos lentos y seguros — el tofu es delicado y se desmorona. Coloca los cubos en un plato aparte.',
      'Prepara la espinaca: Si es CONGELADA, úsala directo. Si es FRESCA de bolsa, lava bien bajo agua fría, pica en trozos medianos y sécala con papel de cocina.',
      'Hierve 400 ml de agua en una olla a fuego ALTO. Sabrás que está lista cuando ves burbujas grandes subiendo rápido.',
      { texto: 'Agrega la espinaca (50 g, ya preparada). Cocina 30 segundos. LUEGO agrega suavemente los cubos de tofu con una cuchara (NO los dejes caer, colócalos delicadamente). Cocina 1 minuto más. El tofu NO debe hervir, solo debe templarse.', timer_segundos: 90 },
      'RETIRA LA OLLA DEL FUEGO COMPLETAMENTE. Coloca lejos de la estufa. El miso se debe disolver SIN que hierva.',
      'En un cucharón pequeño, disuelve 20 g de pasta miso: Vierte un poco del caldo caliente en el cucharón, agrega el miso, y revuelve con cuchara hasta que NO queden grumos (tarda ~30 seg). Vierte TODO de vuelta a la olla, revolviendo lentamente.',
      'Prepara el huevo mientras se templa la sopa: OPCIÓN A (Pochéado — recomendado): Calienta una sartén pequeña con agua, cuando hierva baja a fuego bajo. Rompe 1 huevo en una taza pequeña. Deslízalo suavemente en el agua. Cocina 3-4 minutos SIN TAPAR hasta que la clara esté blanca opaca y la yema siga líquida. OPCIÓN B (Revuelto): Si lo prefieres, revuelve 1 huevo en un tazón, cocina en sartén con fuego medio-bajo 2-3 minutos revolviendo hasta que esté firme. Ambas formas están bien.',
      { texto: 'Recalienta el arroz (250 g cocido): Si es MIÉRCOLES o SÁBADO: saca del refrigerador y calienta en microondas 1 minuto o en sartén a fuego medio 2-3 minutos removiendo. Si es DOMINGO: saca DIRECTO del congelador (sin descongelar) y calienta en microondas 2-3 minutos o en sartén 3-4 minutos removiendo. El arroz debe estar HUMEANTE.', timer_segundos: 180 },
      'Sirve: En un bowl hondo, vierte la sopa (con tofu y espinaca). En un bowl APARTE al lado, sirve el arroz caliente. NO MEZCLES el arroz con la sopa, se deshace. Coloca el huevo pochéado o revuelto ENCIMA de la sopa.',
      'Termina: Corta 2 g de nori (alga) en tiras finas con tijera. Pica 15 g de cebolla larga bien fina. Rocía 7 ml de aceite de sésamo CRUDO por encima (el aceite NO se cocina, va al final para mantener su sabor). Sirve de inmediato mientras la sopa está caliente.'
    ]
  }
};

export function pasosNormalizados(receta) {
  return receta.pasos.map((paso, i) => typeof paso === 'string'
    ? { n: i + 1, texto: paso, timer_segundos: null }
    : { n: i + 1, texto: paso.texto, timer_segundos: paso.timer_segundos ?? null });
}

export const getReceta = (id) => RECETAS[id] ?? null;
