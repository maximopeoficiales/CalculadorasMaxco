/**
 * Represents a getElement.
 * @param {string} selector - The selector html.
 * @returns {HTMLElement}
 */
const getElement = (selector) => document.querySelector(selector);

class WoocommerceApi {
  constructor() {
    this.consumerKey = "ck_0157c4f5fbc72b4a71161b929dea276a81006fd9";
    this.consumerSecret = "cs_b575ce513cbaf2478ca0d06c2d0dd64699ec642d";
    this.dominio = "https://maxco.punkuhr.com/";
    /* datos en duro */
    this.data = [
      {
        sku: 449071,
        nombre: "Planchas de 1,22m x 2,44m (4' x 8') DUROCK",
        precio_unidad: 0.35,
        cantidad: 0,
        redondeo: 0,
        unidad: "Planchas",
        activado: true,
      },
      {
        sku: 403047,
        nombre: "PERFIL PARANTE 89 X 38 X 0.9 X 3 GALV",
        precio_unidad: 1.02,
        cantidad: 0,
        redondeo: 0,
        unidad: "Piezas",
        activado: true,
      },
      {
        sku: 448790,
        nombre: "PERFIL RIEL 90 X 40 X 0.90 X 3 GALV",
        precio_unidad: 0.25,
        cantidad: 0,
        redondeo: 0,
        unidad: "Piezas",
        activado: true,
      },
      {
        sku: 449111,
        nombre: "TORNILLO 7x7/16 PB",
        precio_unidad: 7.35,
        cantidad: 0,
        redondeo: 0,
        unidad: "Millar",
        activado: true,
      },
      {
        sku: 449121,
        nombre: "TORNILLO DUROCK 1 1/4",
        precio_unidad: 11,
        cantidad: 0,
        redondeo: 0,
        unidad: "Millar",
        activado: true,
      },
      {
        sku: 449113,
        nombre: "TORNILLO LOCAL 6X1 P. BROCA",
        precio_unidad: 11,
        cantidad: 0,
        redondeo: 0,
        unidad: "Millar",
        activado: true,
      },
      {
        sku: 449123,
        nombre: "TYVEK STUCCO WRAP DE 5 X 200",
        precio_unidad: 0.011,
        cantidad: 0,
        redondeo: 0,
        unidad: "Rollos",
        activado: true,
      },
      {
        sku: 449069,
        nombre: "CINTA DUROCK USG 4",
        precio_unidad: 1.43,
        cantidad: 0,
        redondeo: 0,
        unidad: "Rollos",
        activado: true,
      },
      {
        sku: 408036,
        nombre: "CINTA DE PAPEL CTK DE 250",
        precio_unidad: 1.43,
        cantidad: 0,
        redondeo: 0,
        unidad: "Rollos",
        activado: true,
      },

      {
        sku: 449109,
        nombre: "FULMINANTE MARRON CAL.22",
        precio_unidad: 1.8,
        cantidad: 0,
        redondeo: 0,
        unidad: "Cientos",
        activado: true,
      },
      {
        sku: 449107,
        nombre: "CLAVOS LOCAL 1",
        precio_unidad: 1.8,
        cantidad: 0,
        redondeo: 0,
        unidad: "Cientos",
        activado: true,
      },
      {
        sku: 455790,
        nombre: "Malla de Refuerzo rollo de 38 x 150 (0,96m x 45,75m) opcional",
        precio_unidad: 0.024,
        cantidad: 0,
        redondeo: 0,
        unidad: "Rollos",
        activado: true,
      },
      {
        sku: 449070,
        nombre: "BASECOAT USG DUROCK 50LB",
        precio_unidad: 0.14,
        cantidad: 0,
        redondeo: 0,
        unidad: "Bolsas",
        activado: true,
      },
      {
        sku: 450744,
        nombre: "MASILLA MAXROCK CAJA X 20KG",
        precio_unidad: 1.02,
        cantidad: 0,
        redondeo: 0,
        unidad: "Cajas de 5 kilos",
        activado: true,
      },
      {
        sku: 403081,
        nombre: "ANGULO ESQUINERO 30X30X0.30X3.00 GALV",
        precio_unidad: 0,
        cantidad: 0,
        redondeo: 0,
        unidad: "Piezas",
        activado: false,
      },
    ];
    /* ordenados por sku */
    this.data = this.getDatosOrdenadosSku(this.data);
    /* esta variable sera usada para hacer los calculados */
    this.backup = [];
    this.materiales = [];
    this.allMaterials = [];
  }
  getDatosOrdenadosSku(array) {
    let data = array.sort((a, b) => {
      if (a.sku > b.sku) {
        return 1;
      }
      if (a.sku < b.sku) {
        return -1;
      }
      return 0;
    });
    return data;
  }
  async getDatosBase(llamados = 0) {
    let skus = this.data.map((e) => e.sku);
    let url = `${this.dominio}wp-json/wc/v3/products?sku=${skus.join(
      ","
    )}&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret
      }&per_page=100`;
    try {
      let materiales = await (await fetch(url)).json();
      return materiales;
    } catch (error) {
      if (llamados > 10) return `HTTP-Error: En la peticion al servidor`;
      console.warn(error);
      return this.getDatosBase(llamados + 1);
    }
  }
  async agregarCarrito() {
    /* plugin coCart */
    let formateado = this.materiales.filter((m) => m.activado);
    let count = 0,
      validacion = true;
    do {
      if (count < formateado.length) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let raw = JSON.stringify({
          product_id: formateado[count].id,
          quantity: formateado[count].redondeo,
        });
        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        let respuesta = await fetch(
          `${location.protocol}//${location.host}/wp-json/cocart/v1/add-item`,
          requestOptions
        );
        if (respuesta.ok) {
          console.log(respuesta.json());
          count++;
        }
      } else {
        validacion = false;
      }
    } while (validacion == true);
    return true;
  }

  async getDatosBaseFormateados() {
    try {
      const respuestaMateriales = await this.getDatosBase(); //obtengo datos base
      // Si se obtenieron datos
      let materiales = respuestaMateriales;
      materiales = this.getDatosOrdenadosSku(materiales); //ordeno por sku
      let data = this.data; //obtengo la data en duro
      //agrego las nuevas propiedades necesarios para la tabla
      let newmateriales = materiales.map(function (material, index) {
        if (material.sku == data[index].sku) {
          material.precio_metro2 = data[index].precio_unidad;
          material.cantidad = data[index].cantidad;
          material.redondeo = data[index].redondeo;
          material.unidad = data[index].unidad;
          material.activado = data[index].activado;
          return material;
        }
      });
      return newmateriales; //retormno los materiales con nuevas caracteristicas
    } catch (error) {
      console.warn(error);
    }
  }
}
/* Interfaz grafica*/
class UI {
  constructor() {
  }
}
/* instancias generales */
const woo = new WoocommerceApi();
const ui = new UI();

async function init() {
  try {
    // woo.materiales = await woo.getDatosBaseFormateados(); //guardo los datos en una propiedad
  } catch (error) {
  }
}
init();
