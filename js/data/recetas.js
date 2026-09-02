/**
 * Recetario corregido — Fase 1 (v3)
 * Con fotos, pasos detallados, y estructura para overlay.
 * FUENTE DE VERDAD: Documento auditado Christian v3.
 */

export const RECETAS = {
  batido_post_entreno: {
    id: 'batido_post_entreno',
    nombre: 'Batido post-entreno',
    foto_url: 'https://images.unsplash.com/photo-1590080876-cd4e9154db92?w=600&q=80',
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
      'Antes de encender nada: ten la licuadora limpia y seca sobre la mesa, enchufada, y la gramera digital a mano.',
      'Pesa cada ingrediente ANTES de licuar: 35 g de whey isolate, 40 g de crema de arroz, 5 g de creatina, 25 g de mantequilla de maní, y 100 g de banano pelado.',
      'Mide 400 ml de agua fría usando las marcas de mL del vaso de la licuadora o una jarra medidora.',
      'Vierte en la licuadora, en este orden: agua, whey, crema de arroz, creatina.',
      { texto: 'Licúa a velocidad BAJA durante 10 segundos exactos.', timer_segundos: 10 },
      'Destapa, agrega el banano partido en 2-3 trozos y la mantequilla de maní.',
      { texto: 'Licúa a velocidad ALTA durante 20 segundos exactos, hasta que la mezcla esté lisa, café claro uniforme y sin trocitos de banano.', timer_segundos: 20 },
      'Sirve de inmediato en un vaso de mínimo 500 ml. Tómatelo dentro de los siguientes 15-20 minutos.',
      'Lava la licuadora de inmediato con agua tibia.'
    ]
  },

  chicken_teriyaki_don: {
    id: 'chicken_teriyaki_don',
    nombre: 'Chicken Teriyaki Don',
    foto_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
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
      'Saca del refrigerador el pollo ya cocido del batch cooking (108 g cocido).',
      'Saca también 325 g de arroz ya cocido del batch y recaliéntalo hasta que esté humeante.',
      'Pon una sartén antiadherente (24-26 cm) a FUEGO MEDIO (posición 5 de 9). Déjala calentar vacía 1 minuto.',
      'Agrega los 7 g de ghee. Debe derretirse en 10-15 segundos y verse líquido y brillante, SIN humear.',
      { texto: 'Agrega el pollo cocido. Muévelo con espátula cada 15-20 segundos durante 2 minutos, hasta que esté caliente por dentro y ligeramente dorado por fuera.', timer_segundos: 120 },
      { texto: 'Agrega 15 ml de salsa de soya, 10 ml de mirin, 5 g de jengibre rallado. Sube a fuego MEDIO-ALTO y revuelve sin parar durante 1 minuto, hasta que la salsa espese y brille.', timer_segundos: 60 },
      { texto: 'Pasa el pollo a un plato. En la misma sartén agrega 50 g de espinaca. Saltéala 1 minuto moviendo, hasta que esté marchita y verde oscuro brillante.', timer_segundos: 60 },
      'Arma el bowl: arroz (325 g) → pollo con su salsa → espinaca a un lado.',
      'Termina con: 5 g de sésamo, 15 g de cebolla larga picada, y 5 ml de aceite de sésamo crudo rociado encima.',
      'Sirve de inmediato.'
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
      'Saca la res en tiras ya marinada del refrigerador (110 g).',
      'Saca 275 g de arroz cocido del batch y recaliéntalo.',
      'Sartén a FUEGO ALTO (posición 8 de 9) — necesita estar muy caliente.',
      'Agrega los 5 g de ghee — debe derretirse casi al instante y verse brillante.',
      { texto: 'Agrega la res. NO la muevas durante 90 segundos (sellar): el lado en contacto con la sartén pasa de rojo/rosado a café oscuro.', timer_segundos: 90 },
      { texto: 'Voltea y cocina 90 segundos más. Punto correcto: por fuera café oscuro, por dentro rosado pálido a café claro.', timer_segundos: 90 },
      { texto: 'Baja a fuego MEDIO. Agrega 30 g de cebolla larga y 5 g de jengibre. Saltéalos 2 minutos hasta que la cebolla esté translúcida.', timer_segundos: 120 },
      { texto: 'Agrega 15 ml de salsa de soya y 10 ml de mirin. Sube brevemente el fuego y deja reducir 1 minuto, hasta que la salsa espese como un glaseado.', timer_segundos: 60 },
      { texto: 'Pasa la carne a un plato. Fríe 1 huevo a fuego medio-bajo, sin voltear, 2-3 minutos: clara firme, yema líquida.', timer_segundos: 150 },
      'Arma el bowl: arroz → carne con salsa → huevo frito encima → 5 g de sésamo.'
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
      'En un bowl, bate 3 huevos con 10 ml de salsa de soya y 10 ml de mirin, hasta color amarillo parejo.',
      'Sartén a FUEGO MEDIO-BAJO (posición 3-4 de 9) — clave para que quede en granitos, no tortilla.',
      'Vierte el huevo batido en la sartén.',
      { texto: 'Revuelve rápido y sin parar con varios palillos juntos, desmenuzando el huevo mientras se cocina, durante 3 minutos, hasta que no quede líquido brillante.', timer_segundos: 180 },
      'Retira del fuego apenas ya no veas huevo líquido. Si dejas de mover, se pega en trozos grandes.',
      'Saca 48 g de pechuga desmenuzada del batch (deshebrala con dos tenedores si hace falta).',
      'Saca 325 g de arroz cocido del batch y recaliéntalo hasta que esté humeante.',
      'Arma el bowl: 325 g de arroz en la base; sobre una mitad el huevo soboro, sobre la otra el pollo desmenuzado.',
      'Termina con: 5 ml de aceite de sésamo, 15 g de cebolla larga picada, 5 g de sésamo.'
    ]
  },

  salmon_don: {
    id: 'salmon_don',
    nombre: 'Salmon Don',
    foto_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
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
      'Precalienta la air fryer a 180°C durante 3 minutos (vacía, con la canasta puesta).',
      'Seca el filete de salmón (130 g) con papel de cocina por ambos lados.',
      'Sazona con ¼ de cucharadita de sal y 6-8 vueltas de molino de pimienta.',
      'Coloca el salmón en la canasta de la air fryer (piel hacia abajo si la tiene), sin encimar.',
      { texto: 'Cocina a 180°C durante 10 minutos SIN abrir ni voltear. Listo cuando se separa fácil en láminas y el centro se ve opaco rosado-anaranjado.', timer_segundos: 600 },
      { texto: 'Mientras tanto, en sartén SECA a fuego medio, saltea 50 g de espinaca 1 minuto hasta que esté marchita.', timer_segundos: 60 },
      'Cocina 125 g de arroz crudo en la arrocera (rinde ≈315 g cocido) — avisa sola al terminar.',
      'Arma el bowl: arroz → espinaca → salmón encima.',
      'Termina con: 10 ml de salsa de soya, 2 g de nori en tiras, 5 g de sésamo, 10 g de cebolla larga, 10 ml de aceite de oliva crudo.'
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
      'Hierve 500 ml de agua a fuego alto hasta ebullición completa.',
      { texto: 'Agrega 100 g de fideos udon secos. Cocina 3 minutos desde que vuelve a hervir.', timer_segundos: 180 },
      { texto: 'Agrega 40 g de espinaca. Cocina 1 minuto más. El tofu Mori-Nu es delicado — lo agregarás sin cocinar en el paso siguiente.', timer_segundos: 60 },
      'RETIRA LA OLLA DEL FUEGO POR COMPLETO. El miso nunca debe hervir.',
      'Disuelve 20 g de pasta miso en un cucharón con un poco del caldo caliente, luego vierte de vuelta a la olla.',
      'Huevo: pochéado directo en la sopa (tapar 3 min sin destapar) o revuelto aparte y agregado después.',
      'Agrega 80 g de tofu Mori-Nu del recipiente de vidrio — CUIDADO, es delicado. Deja reposar 30 seg sin mover.',
      'Sirve en un bowl hondo. Termina con 2 g de nori en tiras, 15 g de cebolla larga, 7 ml de aceite de sésamo.'
    ]
  },

  tofu_don_espinaca: {
    id: 'tofu_don_espinaca',
    nombre: 'Tofu Don + Espinaca',
    foto_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
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
      'Escurre el tofu: abre la caja de Mori-Nu y pon el bloque ENTERO sobre 3-4 capas de papel de cocina durante 15 minutos exactos. No lo prenses ni le pongas nada encima.',
      'Después de los 15 minutos, corta el tofu en cubos de 2 cm sobre la tabla, con cuidado: usa un cuchillo bien afilado y un solo movimiento limpio por corte.',
      'Justo antes de freír (no antes — si lo dejas cubierto de maicena se humedece y no dora), pon 8 g de almidón de maíz en un plato hondo y pasa cada cubo por el almidón por todos los lados, con cuidado, sacudiendo el exceso.',
      'Sartén antiadherente a FUEGO MEDIO (posición 5 de 9). Agrega 10 g de ghee y espera a que se derrita y se vea brillante.',
      'Coloca los cubos de tofu en la sartén sin que se toquen entre sí (si no caben todos, hazlo en 2 tandas). Cocina unos 2 minutos por cada lado que toque la sartén, girando con cuidado con una espátula, hasta que todos los lados se vean dorados. En total son unos 8-10 minutos.',
      'Mientras el tofu dora, en una sartén pequeña aparte, saltea 60 g de espinaca en seco o con una gota de aceite, a fuego medio, 1 minuto, hasta que esté marchita.',
      'En la misma sartén pequeña (limpia con papel de cocina si hace falta), fríe 1 huevo a fuego medio-bajo, 2-3 minutos sin voltear para yema líquida.',
      'Saca 250 g de arroz ya cocido del batch, de la nevera o el congelador, y recaliéntalo hasta que esté humeante.',
      '250 g de arroz cocido en la base → los cubos de tofu dorados encima → la espinaca a un lado → el huevo frito encima de todo.',
      'Termina con: 15 ml de salsa de soya, 5 ml de aceite de sésamo crudo, 5 g de sésamo y 10 g de cebolla larga.'
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
      'Hierve 400 ml de agua a fuego alto hasta ebullición completa.',
      { texto: 'Agrega 120 g de tofu en cubos de 2 cm y 50 g de espinaca. Cocina 2 minutos.', timer_segundos: 120 },
      'RETIRA LA OLLA DEL FUEGO POR COMPLETO. En un cucharón, disuelve 20 g de pasta de miso con un poco del caldo caliente hasta que no queden grumos, y vierte de vuelta a la olla revolviendo.',
      'Mientras se cocina la sopa (o justo antes de servir), saca 250 g de arroz ya cocido del batch — de la nevera si es miércoles o sábado, o directo del congelador si es domingo — y recaliéntalo hasta que esté humeante. Los domingos el arroz se recalienta DIRECTO desde congelado, sin descongelar antes.',
      'Huevo: pochéado directo en la sopa caliente (tapar la olla 3 minutos sin destapar) o revuelto aparte en sartén y agregado después ya cocido.',
      'Sirve la sopa en un bowl hondo. El arroz (250 g cocido, ya recalentado) va en un bowl aparte al lado — no lo mezcles dentro de la sopa para que no se deshaga.',
      'Termina con 2 g de nori en tiras, 15 g de cebolla larga picada y 7 ml de aceite de sésamo por encima.'
    ]
  }
};

export function pasosNormalizados(receta) {
  return receta.pasos.map((paso, i) => typeof paso === 'string'
    ? { n: i + 1, texto: paso, timer_segundos: null }
    : { n: i + 1, texto: paso.texto, timer_segundos: paso.timer_segundos ?? null });
}

export const getReceta = (id) => RECETAS[id] ?? null;
