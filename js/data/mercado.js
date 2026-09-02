export const MERCADO = {
  semanal_perecederos: [
    { id: 'pollo', producto: 'Pechuga de pollo', cantidad: '350 g', nota: '135g (Lunes) + 135g (Jueves) + 60g deshilachado (Miércoles, del batch domingo)' },
    { id: 'res', producto: 'Res lomo/bola', cantidad: '250 g', nota: '110g marinada (Martes) + 110g marinada (Viernes)' },
    { id: 'salmon', producto: 'Salmón filete FRESCO', cantidad: '130 g', nota: 'Compra sábado por la mañana. NO congelado. Se cocina el mismo día.' },
    { id: 'huevos', producto: 'Huevos', cantidad: '30 unidades', nota: 'Para toda la semana (batido diario + recetas)' },
    { id: 'tofu', producto: 'Tofu Mori-Nu Silken', cantidad: '700 g (2 paquetes de 350g)', nota: 'Lunes cena 80g + Martes cena 200g + Sábado cena 120g + Domingo cena 120g' },
    { id: 'espinaca', producto: 'Espinaca', cantidad: '300-350 g', nota: 'Para Chicken Teriyaki (50g x2) + Tofu Don (60g x2) + batch cooking' },
    { id: 'cebolla_larga', producto: 'Cebolla larga', cantidad: '2-3 manojos', nota: 'Para batch cooking (150g) + topping en recetas (Lunes/Martes/Miércoles/Sábado/Domingo)' },
    { id: 'jengibre', producto: 'Jengibre fresco', cantidad: '50 g', nota: '30g batch domingo + 10g batch miércoles + recetas' },
    { id: 'ajo', producto: 'Ajo', cantidad: '1 cabeza', nota: 'Opcional en recetas' },
    { id: 'banano', producto: 'Banano', cantidad: '1 kg (~7 uds)', nota: 'Para batido post-entreno diario' }
  ],

  mensual_no_perecederos: [
    { id: 'arroz', producto: 'Arroz blanco', cantidad: '5 kg', nota: 'Semanal: 1.100g (domingo batch) + 840g (miércoles batch) + 125g (sábado fresco)' },
    { id: 'udon', producto: 'Fideos udon secos', cantidad: '4 paq. (200 g c/u)', nota: 'Para Miso Udon (Lunes + Jueves cenas)' },
    { id: 'crema_arroz', producto: 'Crema de arroz', cantidad: '1 kg', nota: 'Para batido post-entreno' },
    { id: 'miso', producto: 'Pasta miso', cantidad: '500 g', nota: 'Para Miso Udon y Tofu Tamago (40g/semana)' },
    { id: 'mirin', producto: 'Mirin', cantidad: '375 ml', nota: 'Para marinadas y recetas (40ml/semana)' },
    { id: 'sesamo_oil', producto: 'Aceite de sésamo', cantidad: '250 ml', nota: 'Para toppings y recetas' },
    { id: 'sesamo_semillas', producto: 'Sésamo semillas', cantidad: '200 g', nota: 'Para topping en todos los bowls' },
    { id: 'nori', producto: 'Nori (alga)', cantidad: '10 hojas', nota: 'Para Miso Udon y Tofu Tamago' },
    { id: 'vinagre_arroz', producto: 'Vinagre de arroz', cantidad: '250 ml', nota: 'Opcional en recetas' },
    { id: 'ghee', producto: 'Ghee clarificado', cantidad: '250 g', nota: 'Para cocción (batch + recetas)' },
    { id: 'aceite_oliva', producto: 'Aceite de oliva', cantidad: '500 ml', nota: 'Para Salmon Don topping (10ml/semana)' },
    { id: 'mani', producto: 'Mantequilla de maní', cantidad: '500 g', nota: 'Para batido post-entreno' },
    { id: 'salsa_soya', producto: 'Salsa de soya', cantidad: '500 ml', nota: 'Para marinadas y recetas' }
  ],

  notas_importantes: {
    presupuesto: '⚠️ Presupuesto DESHABILITADO. Se hará un presupuesto real después con facturas verificadas de compras reales.',
    compras_semanales: 'Estas son compras SEMANALES para la rotación: Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo.',
    consistencia: 'IMPORTANTE: Lo que se compra (columna cantidad) = Exactamente lo que se usa en el recetario. Nada se bota. Nada sobra sin congelar.',
    salmon_fresco: 'El salmón del sábado es FRESCO, no batch. Se compra el sábado por la mañana y se cocina ese mismo día.',
    tofu_critico: 'El tofu Mori-Nu abierto dura 3 días en nevera. Se compran 2 paquetes (700g), se usan 520g en la semana, sobra 180g para semana siguiente O se congela.',
    sobrantes: 'Cualquier sobrante (pollo, res, tofu, verduras) se congela para la semana siguiente o se prepara en receta adicional. Cero desperdicio.'
  }
};

export const getItemSemanal = (id) => MERCADO.semanal_perecederos.find(i => i.id === id);
export const getItemMensual = (id) => MERCADO.mensual_no_perecederos.find(i => i.id === id);
