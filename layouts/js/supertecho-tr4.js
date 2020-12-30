/**
 * Represents a getElement.
 * @param {string} selector - The selector html.
 * @returns {HTMLElement}
 */
const getElement = (selector) => document.querySelector(selector);
// data variable  segun cada separacion viguetas 
//

let dataPanel = [
  {
    name: "p183",
    cantA: 0,
    cantB: 0,
    cantTotal: 0,
    areaPanel: 0,
    aPpAc: 0,
    values: [1.5, 1, 1.25, 1.5, 0, 0]
  },
  {
    name: "p305",
    cantA: 0,
    cantB: 0,
    cantTotal: 0,
    areaPanel: 0,
    aPpAc: 0,
    values: [2.25, 2, 2.5, 1.5, 1.75, 2]
  },
  {
    name: "p366",
    cantA: 0,
    cantB: 0,
    cantTotal: 0,
    areaPanel: 0,
    aPpAc: 0,
    values: [3, 3, 2.5, 3, 3.5, 2]
  },
  {
    name: "p515",
    cantA: 0,
    cantB: 0,
    cantTotal: 0,
    areaPanel: 0,
    aPpAc: 0,
    values: [4.5, 5, 5, 4.5, 3.5, 4]
  },
  {
    name: "p600",
    cantA: 0,
    cantB: 0,
    cantTotal: 0,
    areaPanel: 0,
    aPpAc: 0,
    values: [5.25, 5, 5, 4.5, 5.25, 4]
  },
];
class Observer {
  subscribers = [];
  subscribe(callback) {
    this.subscribers.push(callback);
  }
  notify() {
    this.subscribers.forEach((subcriptor) => {
      subcriptor();
    });
  }
}
class WoocommerceApi {
  constructor() {
    this.consumerKey = "ck_0157c4f5fbc72b4a71161b929dea276a81006fd9";
    this.consumerSecret = "cs_b575ce513cbaf2478ca0d06c2d0dd64699ec642d";
    this.dominio = "https://maxco.punkuhr.com/";
    /* datos en duro */
    this.data = [
      /* accesorios */
      {
        sku: 452804,
        nombre: "CANALETA ALZN 0.30x3.00M",
        cantidad: 0,
        unidad: "Piezas",
        detalle: "3m",
        accesorio: true,
        activado: false,
      },
      /* {
        sku: 403047,
        nombre: "SUJETADOR GALV X 0.90 mm X 005/200",
        cantidad: 0,
        unidad: "Unidad",
        detalle: "", accesorio: true,
        activado: false,
      },
      {
        sku: 448790,
        nombre: "SOPORTE CANALETA 2A GALV2B0.90MMX005/200",
        cantidad: 0,
        unidad: "Piezas",
        detalle: "3m", accesorio: true,
        activado: false,
      }, {
        sku: 403047,
        nombre: "SOPORTE CANALETA 2B GALV2B0.90MMX005/200",
        cantidad: 0,
        unidad: "Piezas",
        detalle: "3m", accesorio: true,
        activado: false,
      }, {
        sku: 403047,
        nombre: "SOPORTE CANALETA 2C GALV2C0.90MMX005/200",
        cantidad: 0,
        unidad: "Piezas",
        detalle: "3m", accesorio: true,
        activado: false,
      }, {
        sku: 403047,
        nombre: "SOPORTE CANALETA 2D GALV2B0.90MMX005/200",
        cantidad: 0,
        unidad: "Piezas",
        detalle: "3m", accesorio: true,
        activado: false,
      },
      {
        sku: 403047,
        nombre: "SOPORTE CANALETA 2E GALV2B0.90MMX005/200",
        cantidad: 0,
        unidad: "Piezas",
        detalle: "3m", accesorio: true,
        activado: false,
      },
      {
        sku: 403047,
        nombre: "CUMBRERA ALZN 0.30x3.00M",
        cantidad: 0,
        unidad: "Piezas",
        detalle: "3m", accesorio: true,
        activado: false,
      }, */
      {
        sku: 452807,
        nombre: "CENEFA ALZN 0.30x3.00M",
        cantidad: 0,
        unidad: "Piezas",
        detalle: "3m", accesorio: true,
        activado: false,
      },

      /* materiales generales */
      // {
      //   sku: 449071,
      //   nombre: "TORNILLO1/4X7/8PNTA BROCA STITCH RUSPERT",
      //   cantidad: 0,
      //   unidad: "Cto",
      //   detalle: "", accesorio: false,
      //   activado: true,
      // }, {
      //   sku: 449071,
      //   nombre: "TORNILLO # 10x3/4 Recubrimiento Ruspert",
      //   cantidad: 0,
      //   unidad: "Cto",
      //   detalle: "", accesorio: false,
      //   activado: true,
      // },
      // {
      //   sku: 449071,
      //   nombre: "TORNILLO TAPPER 1/4 X 3 3 / 4 RUSPERT",
      //   cantidad: 0,
      //   unidad: "Cto",
      //   detalle: "", accesorio: false,
      //   activado: true,
      // },
      // {
      //   sku: 449071,
      //   nombre: "TORNILLO1/4X7/8PNTA BROCA STITCH RUSPERT",
      //   cantidad: 0,
      //   unidad: "Cto",
      //   detalle: "", accesorio: false,
      //   activado: true,
      // },
      // {
      //   sku: 449071,
      //   nombre: "TORNILLO WAFER #8 X 3/4 PNTA BROCA GALVA",
      //   cantidad: 0,
      //   unidad: "Cto",
      //   detalle: "", accesorio: false,
      //   activado: true,
      // },
      {
        sku: 456081,
        nombre: "REMACHE POP 5/32 X 12",
        cantidad: 0,
        unidad: "Cto",
        detalle: "", accesorio: false,
        activado: true,
      },
      {
        sku: 453878,
        nombre: "CINTA BUTIL 3/8",
        cantidad: 0,
        unidad: "Rollos",
        detalle: "14m", accesorio: false,
        activado: true,
      },
      {
        sku: 453877,
        nombre: "CINTA BUTIL 7/8*",
        cantidad: 0,
        unidad: "Rollos",
        detalle: "8m", accesorio: false,
        activado: true,
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
          material.cantidad = data[index].cantidad;
          material.unidad = data[index].unidad;
          material.detalle = data[index].detalle;
          material.accesorio = data[index].accesorio;
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
    this.getFechaHoy("#fecha_actual");
    this.cargarEventListeners();
    this.cargarLogica();
  }
  /**
 * Represents a getValueInput.
 * @param {string} element - The selector html.
 * @returns {string}
 */
  getValueInput(element) {
    return getElement(element).value;
  }
  cargarEventListeners() {
    getElement("#cubierta_agua").addEventListener("change", (e) => {
      inputCubiertaAgua.notify();

      if (e.target.value != 1) {
        getElement("#caida2B").removeAttribute("disabled");
      } else {
        getElement("#caida2B").setAttribute("disabled", true);
      }
    })
    getElement("#caida1A").addEventListener("change", () => {
      inputCaida1A.notify();
    })
    getElement("#caida2B").addEventListener("change", () => {
      inputCaida2B.notify();
    })
    getElement("#cubiertaL").addEventListener("change", () => {
      inputCaidaL.notify();
    })
    getElement("#separacionViguetas").addEventListener("change", () => {
      inputSeparacionViguetas.notify();
    })
    getElement("#panel").addEventListener("change", () => {
      this.calcularOpcionesPanel();
    })
    getElement("#checkAccesorios").addEventListener("change", (e) => {
      if (e.target.checked) {
        getElement("#cardtable2").classList.remove("d-none");
        woo.materiales.forEach(e => {
          if (e.accesorio == true) {
            e.activado = true;
          }
        });
      } else {
        getElement("#cardtable2").classList.add("d-none");
        woo.materiales.forEach(e => {
          if (e.accesorio == true) {
            e.activado = false;
          }
        })
      }
      checkboxMostrarAccesorios.notify();
    })
  }
  cargarLogica() {
    inputCubiertaAgua.subscribe(() => {
      this.calcularAreaCubierta(true);
      this.calcularOpcionesPanel();
    });
    inputCaida1A.subscribe(() => {
      this.calcularAreaCubierta(true);
      this.calcularOpcionesPanel();
    });
    inputCaida2B.subscribe(() => {
      this.calcularAreaCubierta(true);
      this.calcularOpcionesPanel();
    });
    inputCaidaL.subscribe(() => {
      this.calcularAreaCubierta(true);
      this.calcularOpcionesPanel();
    });
    inputSeparacionViguetas.subscribe(() => {
      this.calcularAreaCubierta(true);
      this.calcularOpcionesPanel();
    });
    checkboxMostrarAccesorios.subscribe(() => {
      this.llenarTablas();
    });

  }
  calcularAreaCubierta(applyInput = false) {
    let areaCubierta = 0;
    if (this.getValueInput("#cubierta_agua") == 1) {
      areaCubierta = parseFloat(this.getValueInput("#caida1A")) * parseFloat
        (this.getValueInput("#cubiertaL"));
    } else {
      areaCubierta = parseFloat(this.getValueInput("#cubiertaL")) * (parseFloat(this.getValueInput("#caida1A")) + parseFloat(this.getValueInput("#caida2B")));
    }
    if (applyInput) {
      getElement("#areaCubierta").value = areaCubierta.toFixed(2);
    } else {
      return areaCubierta;
    }
  }
  calcularOpcionesPanel() {

    let cubiertaAgua = this.getValueInput("#cubierta_agua");
    let caida1A = this.getValueInput("#caida1A");
    let caida2B = this.getValueInput("#caida2B");
    let cubiertaL = this.getValueInput("#cubiertaL");
    let separacionViquetas = this.getValueInput("#separacionViguetas");
    let areaCubierta = this.calcularAreaCubierta();

    dataPanel = dataPanel.filter(panel => {

      if (separacionViquetas == 0.75) {
        panel.cantA = Math.ceil(parseFloat
          (caida1A / panel.values[0]));
      } else if (separacionViquetas == 1) {
        panel.cantA = Math.ceil(parseFloat
          (caida1A / panel.values[1]));
      } else if (separacionViquetas == 1.25) {
        panel.cantA = Math.ceil(parseFloat
          (caida1A / panel.values[2]));
      }
      else if (separacionViquetas == 1.5) {
        panel.cantA = Math.ceil(parseFloat
          (caida1A / panel.values[3]));
      } else if (separacionViquetas == 1.75) {
        panel.cantA = Math.ceil(parseFloat
          (caida1A / panel.values[4])) == Infinity ? 0 : Math.ceil(parseFloat
            (caida1A / panel.values[4]));
      } else if (separacionViquetas == 2) {
        panel.cantA = Math.ceil(parseFloat
          (caida1A / panel.values[5])) == Infinity ? 0 : Math.ceil(parseFloat
            (caida1A / panel.values[5]));
      }

      if (cubiertaAgua == 2) {
        if (separacionViquetas == 0.75) {
          panel.cantB = Math.ceil(parseFloat
            (caida2B / panel.values[0]));
        } else if (separacionViquetas == 1) {
          panel.cantB = Math.ceil(parseFloat
            (caida2B / panel.values[1]));
        } else if (separacionViquetas == 1.25) {
          panel.cantB = Math.ceil(parseFloat
            (caida2B / panel.values[2]));
        }
        else if (separacionViquetas == 1.5) {
          panel.cantB = Math.ceil(parseFloat
            (caida2B / panel.values[3]));
        } else if (separacionViquetas == 1.75) {
          panel.cantB = Math.ceil(parseFloat
            (caida2B / panel.values[4])) == Infinity ? 0 : Math.ceil(parseFloat
              (caida2B / panel.values[4]));
        } else if (separacionViquetas == 2) {
          panel.cantB = Math.ceil(parseFloat
            (caida2B / panel.values[5])) == Infinity ? 0 : Math.ceil(parseFloat
              (caida2B / panel.values[5]));
        }
      } else {
        panel.cantB = 0;
      }
      panel.cantTotal = Math.ceil(cubiertaL / 1.05) * (panel.cantA + panel.cantB)
      switch (panel.name) {
        case "p183":
          panel.areaPanel = (panel.cantTotal * 1.05 * 1.83).toFixed(2);
          break;
        case "p305":
          panel.areaPanel = (panel.cantTotal * 1.05 * 3.05).toFixed(2);;
          break;
        case "p366":
          panel.areaPanel = (panel.cantTotal * 1.05 * 3.66).toFixed(2);;
          break;
        case "p515":
          panel.areaPanel = (panel.cantTotal * 1.05 * 5.15).toFixed(2);;
          break;
        case "p600":
          panel.areaPanel = (panel.cantTotal * 1.05 * 6).toFixed(2);;
          break;
      }
      panel.aPpAc = Math.round((parseFloat(panel.areaPanel) / areaCubierta) * 100);
      return panel;
    });

    this.getDataPanelSelected();
    console.log(dataPanel);
  }
  getDataPanelSelected() {
    function getPanelByName(namePanel) {
      return dataPanel.filter(e => e.name == namePanel)[0];
    }
    let currentPanel = getPanelByName(this.getValueInput("#panel"));
    getElement("#cantidadPanel").value = currentPanel.cantTotal;
    getElement("#pporcentaje").value = `${currentPanel.aPpAc}%`;

  }
  llenarTabla(elementTable, obj_material) {
    getElement(elementTable).innerHTML = "";
    obj_material.forEach((material) => {
      if (material.activado) {
        let image;
        if (material.images.length !== 0) {
          image = material.images[material.images.length - 1].src;
        } else {
          image =
            "https://maxco.punkuhr.com/wp-content/plugins/woocommerce/assets/images/placeholder.png";
        }
        getElement(elementTable).innerHTML += `
          <tr class="">
                <td data-title="SKU"><b>${material.sku}</b></td>
                <td class="text-center" data-title="">
                  <a href="${material.permalink}" target="_blank">
                    <img src="${image}" alt="${material.name}" class="img-fluid" height="80" width="80" min-height="80" min-width="80" loading="lazy"/>
                  </a>
                </td>
                <td class="text-left" data-title="Material">${material.name}</td>
                <td class="text-center" data-title="Detalle">${material.detalle}</td>
                <td class="text-center" data-title="Unidad">${material.unidad}</td>
                <td class="text-right" data-title="Cantidad">${material.cantidad}</td>
          </tr>
      `;
      }
    });
  }
  getFechaHoy(campo) {
    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();

    dd = addZero(dd);
    mm = addZero(mm);

    let fecha = dd + "/" + mm + "/" + yyyy;
    getElement(campo).innerHTML = fecha;
  }
  llenarTablas() {
    this.llenarTabla("#tabla1 tbody", woo.materiales.filter(e => !e.accesorio && e.activado))
    this.llenarTabla("#tabla2 tbody", woo.materiales.filter(e => e.accesorio && e.activado));

  }
  showOrHideSpinner(hide = true) {
    if (hide) {
      getElement("#spinner").classList.add("d-none");
      getElement("#tabla1").classList.remove("d-none");
      getElement("#checkboxs").classList.remove("d-none");
    } else {
      getElement("#spinner").classList.remove("d-none");
    }
  }
}

/* Observadores */
const inputCubiertaAgua = new Observer();
const inputCaida1A = new Observer();
const inputCaida2B = new Observer();
const inputCaidaL = new Observer();
const inputSeparacionViguetas = new Observer();
const checkboxMostrarAccesorios = new Observer();
/* instancias generales */

const woo = new WoocommerceApi();
const ui = new UI();


async function init() {
  try {
    woo.materiales = await woo.getDatosBaseFormateados(); //guardo los datos en una propiedad
    ui.showOrHideSpinner();
    ui.llenarTablas();
  } catch (error) {
    console.log(error);
  }
}
init();
