export const MERCADO = {
  semanal_perecederos: [
    { id: 'pollo', producto: 'Pechuga de pollo', cantidad: '600 g', precio_ck: 7350, nota: 'Comprar donde sea mas barato (Carulla ~$12.250/kg).' },
    { id: 'res', producto: 'Res lomo/bola', cantidad: '450 g', precio_ck: 13750, nota: 'Precio no verificado con precision — orden de magnitud razonable.' },
    { id: 'salmon', producto: 'Salmon filete', cantidad: '130 g', precio_ck: 19211, nota: 'IMPORTANTE: Éxito congelado importado. Es el item mas caro del presupuesto.' },
    { id: 'huevos', producto: 'Huevos', cantidad: '30 unidades', precio_ck: 15000, nota: 'No verificado con precision.' },
    { id: 'tofu', producto: 'Tofu firme', cantidad: '1.050 g (3x 350g)', precio_d1: 27825, precio_exito: 58380, nota: 'CRUCIAL: comprar solo en D1 o Ara. En Éxito/Carulla cuesta mas del doble.' },
    { id: 'espinaca', producto: 'Espinaca', cantidad: '375 g', precio_ck: 6250, nota: '' },
    { id: 'cebolla_larga', producto: 'Cebolla larga', cantidad: '2 manojos', precio_ck: 3000, nota: '' },
    { id: 'jengibre', producto: 'Jengibre fresco', cantidad: '50 g', precio_ck: 1250, nota: '' },
    { id: 'ajo', producto: 'Ajo', cantidad: '1 cabeza', precio_ck: 1000, nota: '' },
    { id: 'banano', producto: 'Banano', cantidad: '1 kg (~7 uds)', precio_ck: 2000, nota: '' }
  ],

  mensual_no_perecederos: [
    { id: 'arroz', producto: 'Arroz blanco', cantidad: '5 kg', precio_ck: 14960, nota: 'Verificado en Éxito marca propia.' },
    { id: 'udon', producto: 'Fideos udon secos', cantidad: '4 paq. (200 g c/u)', precio_ck: 40000, nota: 'No verificado con precision.' },
    { id: 'crema_arroz', producto: 'Crema de arroz', cantidad: '1 kg', precio_ck: 26273, nota: 'Verificado (Anabolic Cream, Farmatodo).' },
    { id: 'miso', producto: 'Pasta miso', cantidad: '500 g', precio_ck: 30000, nota: 'No verificado — podria costar mas.' },
    { id: 'mirin', producto: 'Mirin', cantidad: '375 ml', precio_ck: 24000, nota: 'No verificado con precision.' },
    { id: 'sesamo_oil', producto: 'Aceite de sesamo', cantidad: '250 ml', precio_ck: 16950, nota: 'Verificado en Mercado Libre.' },
    { id: 'sesamo_semillas', producto: 'Sesamo semillas', cantidad: '200 g', precio_ck: 12000, nota: '' },
    { id: 'nori', producto: 'Nori', cantidad: '10 hojas', precio_ck: 15000, nota: 'No verificado con precision.' },
    { id: 'vinagre_arroz', producto: 'Vinagre de arroz', cantidad: '250 ml', precio_ck: 12000, nota: '' },
    { id: 'ghee', producto: 'Ghee', cantidad: '250 g', precio_ck: 17857, nota: 'Verificado en Carulla (TAEQ).' },
    { id: 'aceite_oliva', producto: 'Aceite de oliva', cantidad: '500 ml', precio_ck: 16950, nota: 'Verificado en D1.' },
    { id: 'mani', producto: 'Mantequilla de mani', cantidad: '500 g', precio_ck: 28000, nota: 'Verificado en Éxito (Manitoba) — buscar marca propia D1/Ara para bajar.' },
    { id: 'yerba_mate', producto: 'Yerba mate', cantidad: '~250 g/mes', precio_ck: 26400, nota: 'Verificado en Éxito (Siraj/Taragui).' }
  ],

  presupuesto_info: {
    total_escenario_a: 713000,
    total_escenario_b: 591000,
    tope_maximo: 1200000,
    escenario_a: 'Tofu y salmon comprados en Éxito/Carulla — riesgo presupuestal: bajo (40% del tope)',
    escenario_b: 'Tofu comprado en D1/Ara, salmon en Éxito — riesgo presupuestal: bajo (31% del tope)',
    recomendacion: 'Compra tofu solo en D1 o Ara, nunca en Éxito/Carulla. Trata el salmon del sabado como gasto premium (~$19.000). Busca mantequilla de mani y ghee en marca propia D1/Ara.'
  }
};

export const getItemSemanal = (id) => MERCADO.semanal_perecederos.find(i => i.id === id);
export const getItemMensual = (id) => MERCADO.mensual_no_perecederos.find(i => i.id === id);
