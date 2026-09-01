/**
 * Recetario corregido — Fase 1.
 * FUENTE DE VERDAD. Transcripcion literal de la seccion 5.2 del documento auditado.
 * Ninguna cifra de este archivo se recalcula ni se deriva: se muestra tal cual.
 */

export const RECETAS = {
  batido_post_entreno: {
    id: 'batido_post_entreno',
    nombre: 'Batido post-entreno',
    tipo: 'batido',
    rango: null,
    cuando: 'Todos los dias, justo despues de entrenar (~10:30)',
    tiempo_min: 4,
    kcal: 519, proteina_g: 38, grasa_g: 14, carbo_g: 65,
    ajuste_fase1: null,
    regla_especial: null,
    ingredientes: [
      { nombre: 'Whey Isolate', crudo: '35 g', kcal: 130, p: 30, g: 1, c: 1 },
      { nombre: 'Crema de arroz', crudo: '40 g', kcal: 150, p: 1, g: 0.5, c: 36 },
      { nombre: 'Banano', crudo: '100 g (1 ud)', kcal: 89, p: 1, g: 0, c: 23 },
      { nombre: 'Mantequilla de mani', crudo: '25 g', kcal: 150, p: 6, g: 12.5, c: 5 },
      { nombre: 'Creatina', crudo: '5 g', kcal: 0, p: 0, g: 0, c: 0 },
      { nombre: 'Agua', crudo: '400 ml', kcal: 0, p: 0, g: 0, c: 0 }
    ],
    pasos: [
      'Antes de encender nada: ten la licuadora limpia y seca sobre la mesa, enchufada, y la gramera digital a mano.',
      'Pesa cada ingrediente ANTES de licuar (nunca a ojo ni con cucharas): 35 g de whey isolate, 40 g de crema de arroz, 5 g de creatina, 25 g de mantequilla de mani, y 100 g de banano pelado.',
      'Mide 400 ml de agua fria usando las marcas de mL del vaso de la licuadora o una jarra medidora.',
      'Vierte en la licuadora, en este orden: agua, whey, crema de arroz, creatina.',
      { texto: 'Licua a velocidad BAJA durante 10 segundos exactos.', timer_segundos: 10 },
      'Destapa, agrega el banano partido en 2-3 trozos y la mantequilla de mani.',
      { texto: 'Licua a velocidad ALTA durante 20 segundos exactos, hasta que la mezcla este lisa, cafe claro uniforme y sin trocitos de banano.', timer_segundos: 20 },
      'Sirve de inmediato en un vaso de minimo 500 ml. Tomatelo dentro de los siguientes 15-20 minutos.',
      'Lava la licuadora de inmediato con agua tibia.'
    ]
  },

  chicken_teriyaki_don: {
    id: 'chicken_teriyaki_don',
    nombre: 'Chicken Teriyaki Don',
    tipo: 'almuerzo',
    rango: 'B',
    cuando: 'Almuerzo — Lunes y Jueves',
    tiempo_min: 12,
    kcal: 738, proteina_g: 42.5, grasa_g: 18.5, carbo_g: 95,
    ajuste_fase1: { descripcion: 'Sube el arroz crudo de 110 g a 130 g (+20 g).', delta_kcal: 70, delta_p: 1.3, delta_g: 0.2, delta_c: 15.5 },
    regla_especial: null,
    ingredientes: [
      { nombre: 'Arroz blanco', crudo: '110 g', cocido: '275 g', kcal: 385, p: 7, g: 1, c: 85 },
      { nombre: 'Pechuga de pollo (del batch)', crudo: '135 g', cocido: '108 g', kcal: 160, p: 32, g: 3, c: 0 },
      { nombre: 'Ghee (coccion)', crudo: '7 g', kcal: 63, p: 0, g: 7, c: 0 },
      { nombre: 'Espinaca', crudo: '50 g', cocido: '40 g', kcal: 12, p: 1.5, g: 0, c: 1 },
      { nombre: 'Salsa soya', crudo: '15 ml', kcal: 10, p: 1, g: 0, c: 1 },
      { nombre: 'Mirin', crudo: '10 ml', kcal: 24, p: 0, g: 0, c: 5 },
      { nombre: 'Jengibre rallado', crudo: '5 g', kcal: 4, p: 0, g: 0, c: 1 },
      { nombre: 'Aceite sesamo (topping)', crudo: '5 ml', kcal: 45, p: 0, g: 5, c: 0 },
      { nombre: 'Sesamo semillas', crudo: '5 g', kcal: 30, p: 1, g: 2.5, c: 1 },
      { nombre: 'Cebolla larga', crudo: '15 g', kcal: 5, p: 0, g: 0, c: 1 }
    ],
    pasos: [
      'Saca del refrigerador el pollo ya cocido del batch cooking (108 g cocido = 135 g que pesaste crudo).',
      'Saca tambien 275 g de arroz ya cocido del contenedor del batch.',
      'Pon una sarten antiadherente (24-26 cm) a FUEGO MEDIO (posicion 5 de 9). Dejala calentar vacia 1 minuto.',
      'Agrega los 7 g de ghee. Debe derretirse en 10-15 segundos y verse liquido y brillante, SIN humear.',
      { texto: 'Agrega el pollo cocido. Muevelo con espatula cada 15-20 segundos durante 2 minutos, hasta que este caliente por dentro y ligeramente dorado por fuera.', timer_segundos: 120 },
      { texto: 'Agrega 15 ml de salsa de soya, 10 ml de mirin, 5 g de jengibre rallado. Sube a fuego MEDIO-ALTO y revuelve sin parar durante 1 minuto, hasta que el liquido burbujee y se reduzca a una salsa espesa y brillante.', timer_segundos: 60 },
      { texto: 'Pasa el pollo a un plato. En la misma sarten agrega 50 g de espinaca. Saltea 1 minuto moviendo, hasta que este marchita y verde oscuro brillante.', timer_segundos: 60 },
      'Arma el bowl: arroz (275 g) -> pollo con su salsa -> espinaca a un lado.',
      'Termina con: 5 g de sesamo, 15 g de cebolla larga picada, y 5 ml de aceite de sesamo crudo rociado encima.',
      'Sirve de inmediato.'
    ]
  },

  gyudon: {
    id: 'gyudon',
    nombre: 'Gyudon — Beef Bowl',
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
      { nombre: 'Ghee (coccion)', crudo: '5 g', kcal: 45, p: 0, g: 5, c: 0 },
      { nombre: 'Salsa soya', crudo: '15 ml', kcal: 10, p: 1, g: 0, c: 1 },
      { nombre: 'Mirin', crudo: '10 ml', kcal: 24, p: 0, g: 0, c: 5 },
      { nombre: 'Jengibre rallado', crudo: '5 g', kcal: 4, p: 0, g: 0, c: 1 },
      { nombre: 'Sesamo semillas', crudo: '5 g', kcal: 30, p: 1, g: 2.5, c: 1 }
    ],
    pasos: [
      'Saca la res en tiras ya marinada del refrigerador (110 g).',
      'Saca 275 g de arroz cocido del batch.',
      'Sarten a FUEGO ALTO (posicion 8 de 9) — necesita estar muy caliente.',
      'Agrega los 5 g de ghee — debe derretirse casi al instante y verse brillante.',
      { texto: 'Agrega la res. NO la muevas durante 90 segundos (sellar): el lado en contacto con la sarten pasa de rojo/rosado a cafe oscuro.', timer_segundos: 90 },
      { texto: 'Voltea y cocina 90 segundos mas. Punto correcto: por fuera cafe oscuro, por dentro rosado palido a cafe claro.', timer_segundos: 90 },
      { texto: 'Baja a fuego MEDIO. Agrega 30 g de cebolla larga y 5 g de jengibre. Saltea 2 minutos hasta que la cebolla este translucida.', timer_segundos: 120 },
      { texto: 'Agrega 15 ml de salsa de soya y 10 ml de mirin. Sube brevemente el fuego y deja reducir 1 minuto, hasta que la salsa espese como un glaseado.', timer_segundos: 60 },
      { texto: 'Pasa la carne a un plato. Frie 1 huevo a fuego medio-bajo, sin voltear, 2-3 minutos: clara firme, yema liquida.', timer_segundos: 150 },
      'Arma el bowl: arroz -> carne con salsa -> huevo frito encima -> 5 g de sesamo.'
    ]
  },

  egg_soboro_don: {
    id: 'egg_soboro_don',
    nombre: 'Egg Soboro Don',
    tipo: 'almuerzo',
    rango: 'B',
    cuando: 'Almuerzo — Miercoles',
    tiempo_min: 10,
    kcal: 776, proteina_g: 40.5, grasa_g: 25, carbo_g: 94.5,
    ajuste_fase1: { descripcion: 'Sube el arroz crudo de 110 g a 130 g (+20 g).', delta_kcal: 70, delta_p: 1.3, delta_g: 0.2, delta_c: 15.5 },
    regla_especial: null,
    ingredientes: [
      { nombre: 'Arroz blanco', crudo: '110 g', cocido: '275 g', kcal: 385, p: 7, g: 1, c: 85 },
      { nombre: 'Huevos', crudo: '3 ud (150 g)', kcal: 210, p: 18, g: 15, c: 1.5 },
      { nombre: 'Pechuga desmenuzada (del batch)', crudo: '60 g', cocido: '48 g', kcal: 70, p: 14, g: 1.5, c: 0 },
      { nombre: 'Salsa soya', crudo: '10 ml', kcal: 7, p: 0.5, g: 0, c: 1 },
      { nombre: 'Mirin', crudo: '10 ml', kcal: 24, p: 0, g: 0, c: 5 },
      { nombre: 'Aceite sesamo', crudo: '5 ml', kcal: 45, p: 0, g: 5, c: 0 },
      { nombre: 'Cebolla larga', crudo: '15 g', kcal: 5, p: 0, g: 0, c: 1 },
      { nombre: 'Sesamo semillas', crudo: '5 g', kcal: 30, p: 1, g: 2.5, c: 1 }
    ],
    pasos: [
      'En un bowl, bate 3 huevos con 10 ml de salsa de soya y 10 ml de mirin, hasta color amarillo parejo sin vetas blancas.',
      'Sarten a FUEGO MEDIO-BAJO (posicion 3-4 de 9) — clave para que quede en granitos, no tortilla.',
      'Vierte el huevo batido en la sarten.',
      { texto: 'Revuelve rapido y sin parar con varios palillos juntos, desmenuzando el huevo mientras se cocina, durante 3 minutos, hasta que no quede liquido brillante.', timer_segundos: 180 },
      'Retira del fuego apenas ya no veas huevo liquido. Si dejas de mover, se pega en trozos grandes.',
      'Saca 48 g de pechuga desmenuzada del batch (deshebrala con dos tenedores si hace falta).',
      'Arma el bowl: 275 g de arroz en la base; sobre una mitad el huevo soboro, sobre la otra el pollo desmenuzado.',
      'Termina con: 5 ml de aceite de sesamo, 15 g de cebolla larga picada, 5 g de sesamo.'
    ]
  },

  salmon_don: {
    id: 'salmon_don',
    nombre: 'Salmon Don',
    tipo: 'almuerzo',
    rango: 'A',
    cuando: 'Almuerzo — Sabado',
    tiempo_min: 15,
    kcal: 737, proteina_g: 36.5, grasa_g: 25, carbo_g: 86,
    ajuste_fase1: { descripcion: 'Sube el arroz crudo de 105 g a 125 g (+20 g) y el aceite de oliva del topping de 5 ml a 10 ml.', delta_kcal: 115, delta_p: 1.3, delta_g: 5.1, delta_c: 15.6 },
    regla_especial: null,
    ingredientes: [
      { nombre: 'Arroz blanco', crudo: '105 g', cocido: '265 g', kcal: 370, p: 7, g: 0.5, c: 82 },
      { nombre: 'Salmon filete', crudo: '130 g', cocido: '105 g', kcal: 265, p: 26, g: 17, c: 0 },
      { nombre: 'Espinaca', crudo: '50 g', cocido: '40 g', kcal: 12, p: 1.5, g: 0, c: 1 },
      { nombre: 'Aceite oliva (topping)', crudo: '5 ml', kcal: 45, p: 0, g: 5, c: 0 },
      { nombre: 'Salsa soya', crudo: '10 ml', kcal: 7, p: 0.5, g: 0, c: 1 },
      { nombre: 'Nori (tiras)', crudo: '2 g', kcal: 5, p: 0.5, g: 0, c: 0.5 },
      { nombre: 'Sesamo semillas', crudo: '5 g', kcal: 30, p: 1, g: 2.5, c: 1 },
      { nombre: 'Cebolla larga', crudo: '10 g', kcal: 3, p: 0, g: 0, c: 0.5 }
    ],
    pasos: [
      'Precalienta la air fryer a 180 C durante 3 minutos, vacia.',
      'Seca el filete de salmon (130 g) con papel de cocina por ambos lados.',
      'Sazona con sal y pimienta al gusto.',
      'Coloca el salmon en la canasta (piel hacia abajo si tiene), sin encimar.',
      { texto: 'Cocina a 180 C durante 10 minutos SIN abrir ni voltear. Listo cuando se separa facil en laminas con un tenedor y el centro se ve opaco rosado-anaranjado.', timer_segundos: 600 },
      { texto: 'Mientras tanto, en sarten SECA a fuego medio, saltea 50 g de espinaca 1 minuto hasta que este marchita.', timer_segundos: 60 },
      'Cocina 105 g de arroz crudo en la arrocera (rinde ~265 g cocido) — avisa sola al terminar.',
      'Arma el bowl: arroz -> espinaca -> salmon encima.',
      'Termina con: 10 ml de salsa de soya, 2 g de nori en tiras, 5 g de sesamo, 10 g de cebolla larga, 5 ml de aceite de oliva crudo.'
    ]
  },

  miso_udon_huevo: {
    id: 'miso_udon_huevo',
    nombre: 'Miso Udon + Huevo',
    tipo: 'cena',
    rango: 'B',
    cuando: 'Cena — Lunes y Jueves',
    tiempo_min: 10,
    kcal: 668, proteina_g: 31.5, grasa_g: 22, carbo_g: 84.5,
    ajuste_fase1: null,
    regla_especial: 'El miso se disuelve SIEMPRE fuera del fuego — hervirlo destruye los probioticos y amarga el sabor.',
    ingredientes: [
      { nombre: 'Fideos udon', crudo: '100 g seco', cocido: '220 g', kcal: 350, p: 9, g: 1, c: 75 },
      { nombre: 'Pasta miso', crudo: '20 g', kcal: 35, p: 2, g: 1, c: 5 },
      { nombre: 'Huevos', crudo: '2 ud (100 g)', kcal: 140, p: 12, g: 10, c: 1 },
      { nombre: 'Espinaca', crudo: '40 g', cocido: '30 g', kcal: 10, p: 1, g: 0, c: 1 },
      { nombre: 'Tofu Mori-Nu Silken (firme)', crudo: '80 g', kcal: 78, p: 7.6, g: 4.5, c: 1 },
      { nombre: 'Aceite sesamo', crudo: '7 ml', kcal: 63, p: 0, g: 7, c: 0 },
      { nombre: 'Nori', crudo: '2 g', kcal: 5, p: 0.5, g: 0, c: 0.5 },
      { nombre: 'Cebolla larga', crudo: '15 g', kcal: 5, p: 0, g: 0, c: 1 }
    ],
    pasos: [
      'Hierve 500 ml de agua a fuego alto hasta ebullicion completa.',
      { texto: 'Agrega 100 g de fideos udon secos. Cocina 3 minutos desde que vuelve a hervir.', timer_segundos: 180 },
      { texto: 'Agrega 40 g de espinaca. Cocina 1 minuto mas. El tofu Mori-Nu es delicado — lo agregaras sin cocinar en el paso siguiente.', timer_segundos: 60 },
      'RETIRA LA OLLA DEL FUEGO POR COMPLETO. El miso nunca debe hervir.',
      'Disuelve 20 g de pasta miso en un cucharon con un poco del caldo caliente, luego vierte de vuelta a la olla.',
      'Huevo: poche directo en la sopa (tapar 3 min sin destapar) o revuelto aparte y agregado despues.',
      'Agregา 80 g de tofu Mori-Nu del recipiente de vidrio — CUIDADO, es delicado. Deja reposar 30 seg sin mover.',
      'Sirve en un bowl hondo. Termina con 2 g de nori en tiras, 15 g de cebolla larga, 7 ml de aceite de sesamo.'
    ]
  },

  tofu_don_espinaca: {
    id: 'tofu_don_espinaca',
    nombre: 'Tofu Don + Espinaca',
    tipo: 'cena',
    rango: 'B',
    cuando: 'Cena — Martes y Viernes',
    tiempo_min: 15,
    kcal: 755, proteina_g: 36, grasa_g: 26.5, carbo_g: 85,
    ajuste_fase1: null,
    regla_especial: null,
    ingredientes: [
      { nombre: 'Arroz blanco', crudo: '100 g', cocido: '250 g', kcal: 350, p: 7, g: 0.5, c: 78 },
      { nombre: 'Tofu Mori-Nu Silken (láminas)', crudo: '200 g', kcal: 194, p: 19, g: 9, c: 2 },
      { nombre: 'Huevo', crudo: '1 ud (50 g)', kcal: 70, p: 6, g: 5, c: 0.5 },
      { nombre: 'Espinaca', crudo: '60 g', cocido: '45 g', kcal: 14, p: 2, g: 0, c: 1 },
      { nombre: 'Ghee (coccion)', crudo: '5 g', kcal: 45, p: 0, g: 5, c: 0 },
      { nombre: 'Salsa soya', crudo: '15 ml', kcal: 10, p: 1, g: 0, c: 1 },
      { nombre: 'Aceite sesamo (topping)', crudo: '5 ml', kcal: 45, p: 0, g: 5, c: 0 },
      { nombre: 'Sesamo semillas', crudo: '5 g', kcal: 30, p: 1, g: 2.5, c: 1 },
      { nombre: 'Cebolla larga', crudo: '10 g', kcal: 3, p: 0, g: 0, c: 0.5 }
    ],
    pasos: [
      'Tofu Mori-Nu Silken: vierte 200 g del recipiente en un bowl. NO lo secas ni cocinas — es muy delicado. Resevalo para el final frio o tibio.',
      { texto: '(Saltea 60 g de espinaca se hace igual, fuego medio en sarten, 1 minuto hasta marchita.)', timer_segundos: 60 },
      { texto: 'Frie 1 huevo a fuego medio-bajo, 2-3 minutos sin voltear (yema liquida).', timer_segundos: 150 },
      'Arma el bowl: 250 g de arroz -> tofu Mori-Nu (cuidado, delicado) -> espinaca -> huevo encima.',
      'Termina con: 15 ml de salsa de soya, 5 ml de aceite de sesamo, 5 g de sesamo, 10 g de cebolla larga.'
    ]
  },

  sopa_miso_arroz_tofu: {
    id: 'sopa_miso_arroz_tofu',
    nombre: 'Sopa Miso + Arroz + Tofu',
    tipo: 'cena',
    rango: 'C',
    cuando: 'Cena — Miercoles, Sabado y Domingo',
    tiempo_min: 8,
    kcal: 668, proteina_g: 28.9, grasa_g: 19.5, carbo_g: 88,
    ajuste_fase1: null,
    regla_especial: 'El miso se disuelve SIEMPRE fuera del fuego.',
    ingredientes: [
      { nombre: 'Arroz blanco', crudo: '100 g', cocido: '250 g', kcal: 350, p: 7, g: 0.5, c: 78 },
      { nombre: 'Pasta miso', crudo: '20 g', kcal: 35, p: 2, g: 1, c: 5 },
      { nombre: 'Tofu Mori-Nu Silken (cubos)', crudo: '120 g', kcal: 116, p: 11.4, g: 5.5, c: 1 },
      { nombre: 'Huevo', crudo: '1 ud (50 g)', kcal: 70, p: 6, g: 5, c: 0.5 },
      { nombre: 'Espinaca', crudo: '50 g', cocido: '40 g', kcal: 12, p: 1.5, g: 0, c: 1 },
      { nombre: 'Nori', crudo: '2 g', kcal: 5, p: 0.5, g: 0, c: 0.5 },
      { nombre: 'Aceite sesamo', crudo: '7 ml', kcal: 63, p: 0, g: 7, c: 0 },
      { nombre: 'Cebolla larga', crudo: '15 g', kcal: 5, p: 0, g: 0, c: 1 }
    ],
    pasos: [
      'Hierve 400 ml de agua a fuego alto hasta ebullicion completa.',
      { texto: 'Agrega 50 g de espinaca. Cocina 1 minuto.', timer_segundos: 60 },
      'RETIRA LA OLLA DEL FUEGO POR COMPLETO. Disuelve 20 g de pasta miso con un poco del caldo caliente y vierte de vuelta.',
      'Agregا 120 g de tofu Mori-Nu del recipiente (CUIDADO, es delicado). Deja reposar 30 seg sin mover.',
      'Huevo: poche directo en la sopa (tapar 3 min) o revuelto aparte.',
      'Sirve la sopa en un bowl. El arroz (250 g) va en un bowl aparte al lado, no se mezcla dentro de la sopa.',
      'Termina con: 2 g de nori en tiras, 15 g de cebolla larga, 7 ml de aceite de sesamo.'
    ]
  }
};

export function pasosNormalizados(receta) {
  return receta.pasos.map((paso, i) => typeof paso === 'string'
    ? { n: i + 1, texto: paso, timer_segundos: null }
    : { n: i + 1, texto: paso.texto, timer_segundos: paso.timer_segundos ?? null });
}

export const getReceta = (id) => RECETAS[id] ?? null;
