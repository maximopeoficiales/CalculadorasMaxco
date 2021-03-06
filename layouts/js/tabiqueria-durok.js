/**
 * Represents a getElement.
 * @param {string} selector - The selector html.
 * @returns {HTMLElement}
 */
const getElement = (selector) => document.querySelector(selector);

class WoocommerceApi {
  constructor() {
    this.consumerKey = "ck_8f55a46b8cd9bdb4323eb5a139cc0ecc2a598f68";
    this.consumerSecret = "cs_21ab0989bffd0c32d3fbe447b5849dc78444dffa";
    this.dominio = "https://maxco.pe/";
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
          product_id: formateado[count].id.toString(),
          quantity: formateado[count].redondeo,
        });
        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        try {
          let respuesta = await fetch(
            `${location.protocol}//${location.host}/wp-json/cocart/v1/add-item`,
            requestOptions
          );
          if (respuesta.ok) {
            respuesta = respuesta.json();
            console.log(respuesta);
            count++;
          } else if (respuesta.status == 403) {
            return false;
          }
        } catch (error) {
          return false;
        }

      } else {
        validacion = false;
      }
    } while (validacion == true);
    return true;


  }
  async getAllMaterials(llamados = 0) {
    let materialsComplete = [],
      page = 1;
    do {
      try {
        const url = `${this.dominio}wp-json/wc/v3/products/?per_page=100&page=${page}&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
        let materiales = await (await fetch(url)).json();
        if (materiales.length !== 0) {
          materiales.forEach((element) => {
            materialsComplete.push(element);
          });
          page++;
        } else {
          page = false;
        }
      } catch (error) {
        if (llamados > 10)
          return `HTTP-Error: ${response.status}, volviendo a intentar`;
        console.warn(error);
        return this.getAllMaterials(llamados + 1);
      }
    } while (page != false);
    return materialsComplete;
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
  calcularMetraje(metraje) {
    this.materiales.forEach((e) => {
      //si esta activados
      if (e.activado) {
        e.cantidad = parseFloat(e.precio_metro2 * metraje).toFixed(2);
        if (
          /* si es uno de estos casos */
          e.unidad.toLowerCase().includes("cajas") == true ||
          e.unidad.toLowerCase() == "cientos" ||
          e.unidad.toLowerCase() == "millar" ||
          e.unidad.toLowerCase().includes("rollos") == true
        ) {
          if (e.unidad.toLowerCase() == "cientos") {
            e.redondeo = Math.ceil(e.cantidad / 100);
          }
          if (e.unidad.toLowerCase() == "millar") {
            e.redondeo = Math.ceil(e.cantidad / 100);
          }
          if (e.unidad.toLowerCase().includes("cajas")) {
            //por ahora luego sera de cajas de 20
            e.redondeo = Math.ceil(e.cantidad / 20);
          }
          if (e.unidad.toLowerCase().includes("rollos")) {
            e.redondeo = Math.ceil(e.cantidad / 75);
          }
        } else {
          /* si eres un caso comun */
          e.redondeo = Math.ceil(e.cantidad);
        }
      }
    });
  }
  getMontoTotal() {
    let acumulador2 = 0,
      total = this.materiales.reduce((acumulador, m) => {
        if (m.activado) {
          acumulador2 = acumulador + m.redondeo;
        }
        return acumulador2;
      }, 0);
    return total;
  }
  getPrecioTotal() {
    let acumulador2 = 0,
      total = this.materiales.reduce((acumulador, m) => {
        /* falta cambiar al sale_price */
        if (m.activado) {
          let precio = m.price == "" ? 0 : parseFloat(m.price);
          acumulador2 =
            parseFloat(acumulador) + parseFloat(m.redondeo) * precio;
        }
        return parseFloat(acumulador2);
      }, 0);
    return parseFloat(acumulador2).toFixed(2);
  }
}
/* Interfaz grafica*/
class UI {
  constructor() {
    this.tabla = getElement("#dataTable tbody");
  }
  llenarTabla(obj_material) {
    this.tabla.innerHTML = "";
    obj_material.forEach((material) => {
      if (material.activado) {
        let image;
        if (material.images.length !== 0) {
          image = material.images[material.images.length - 1].src;
        } else {
          image =
            "https://maxco.punkuhr.com/wp-content/plugins/woocommerce/assets/images/placeholder.png";
        }
        this.tabla.innerHTML += `
          <tr class="">
                <td data-title="SKU"><b>${material.sku}</b></td>
                <td class="text-center" data-title="">
                  <a href="${material.permalink}" target="_blank">
                    <img src="${image}" alt="${material.name}" class="img-fluid" height="80" width="80" min-height="80" min-width="80" loading="lazy"/>
                  </a>
                </td>
                <td class="text-left" data-title="Material">${material.name}</td>
                <td class="text-right" data-title="Unid. x M2">${material.precio_metro2}</td>
                <td class="text-right" data-title="Cantidad">${material.cantidad}</td>
                <td class="text-right" data-title="Redondeo">${material.redondeo}</td>
                <td class="text-center" data-title="Unidad">${material.unidad}</td>
                <td class="" data-title="Accion">
                    <button class="btn btn-sm btn-danger" type="button" data-sku="${material.sku}" name="eliminar_material"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </td>
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
  mostrarSpinner() {
    let ocultos = document.querySelectorAll("#collapseCardExample2")[0]
      .children; //obtengo los divs
    //muestro la tabla oculto el spinner
    ocultos[0].classList.remove("d-none");
    ocultos[1].classList.add("d-none");
    ocultos[2].classList.add("d-none");
  }
  ocultarSpinner() {
    let ocultos = document.querySelectorAll("#collapseCardExample2")[0]
      .children; //obtengo los divs
    //muestro la tabla oculto el spinner
    ocultos[0].classList.add("d-none");
    ocultos[1].classList.remove("d-none");
    ocultos[2].classList.remove("d-none");
  }
  /* funcion para los alerts dinamicos */
  mostrarMensajeConfirmacionSku(sku, callback) {
    let material = woo.materiales.filter(
      (m) => m.sku == sku && m.activado === true
    );
    let { images, name } = material[0];
    if (images.length == 0) {
      images =
        "https://maxco.punkuhr.com/wp-content/plugins/woocommerce/assets/images/placeholder.png";
    } else {
      images = images[images.length - 1].src;
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ",
        cancelButton: "btn btn-danger mr-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Estas Seguro borrarlo?",
        text: `${name}`,
        imageUrl: `${images}`,
        imageWidth: "100%",
        imageHeight: 200,
        imageAlt: `${name}`,
        showCancelButton: true,
        confirmButtonText: "Borrar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        allowOutsideClick: false,
      })
      .then((result) => {
        if (result.value) {
          callback();
          swalWithBootstrapButtons.fire(
            "Borrado!",
            "El material se ha borrado correctamente. 😢",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "Tu material esta a salvo 😎",
            "error"
          );
        }
      });
  }
  mostrarMensajeCustom(icon, title, text) {
    Swal.fire({
      icon,
      title,
      text,
      allowOutsideClick: false,
    });
  }
  mostrarConfirmacionCustom(title, text, icon, confirmButtonText, callback) {
    Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) callback();
    });
  }
  mostrarConfirmacionHtml(
    { title, html, confirmButtonText, cancelButtonText },
    callback
  ) {
    Swal.fire({
      title,
      html,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText,
      cancelButtonText,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) callback();
    });
  }
  async cargarEventListeners() {
    /* eliminar material */
    document.addEventListener("click", (e) => {
      if (e.target.type == "button") {
        e.preventDefault();
        if (e.target.hasAttribute("data-sku")) {
          let sku = e.target.getAttribute("data-sku");
          let filaEliminar = e.target.parentElement.parentElement;
          /* eliminar y desactivar de la woo.materiales */
          this.mostrarMensajeConfirmacionSku(sku, () => {
            /* callback si confirma borrado */
            woo.materiales.forEach((m) => {
              //desactivo el material de la propiedad instanciada
              if (m.sku == sku) {
                m.activado = false;
              }
              return m;
            });
            this.tabla.removeChild(filaEliminar);
            this.eventoCalcular();
          });
        }
      }
      this.mostrarCantidadTotal();
    });
    /* calcular */
    getElement("#calcular").addEventListener("click", (e) => {
      e.preventDefault();
      if (this.getMetrajeInput() === "" || this.getMetrajeInput() === 0)
        this.mostrarMensajeCustom(
          "info",
          "Ops...",
          "Complete el campo del Metraje"
        );
      else this.eventoCalcular();
    });
    /* evento calcular intro */
    getElement("#metraje").addEventListener("keydown", (e) => {
      if (e.key === "Enter")
        if (this.getMetrajeInput() === "" || this.getMetrajeInput() === 0) {
        } else {
          this.eventoCalcular();
        }
    });
    /* resetear materiales */
    document
      .querySelector("#resetear_materiales")
      .addEventListener("click", (e) => {
        e.preventDefault();
        this.mostrarConfirmacionCustom(
          "Advertencia",
          "¿Esta seguro de resetear los materiales?",
          "warning",
          "Resetear",
          () => {
            this.resetMateriales();
          }
        );
      });
    //agregar al carrito
    document
      .querySelector("#agregar_carrito")
      .addEventListener("click", (e) => {
        e.preventDefault();
        if (woo.getMontoTotal() != 0) {
          let html = `
                <div class="text-center my-2" id="spinner_combo">
                    <p>Agregando Materiales ...</p>
                    <div class="lds-roller">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                    </div>
                </div>
                `;
          this.mostrarConfirmacionCustom(
            "Estas seguro de agregar al carrito",
            "",
            "warning",
            "Agregar al carrito",
            () => {
              this.mostrarConfirmacionHtml(
                {
                  html,
                },
                null
              );
              (async () => {
                document
                  .querySelectorAll(".swal2-styled")[0]
                  .classList.add("d-none");
                document
                  .querySelectorAll(".swal2-styled")[1]
                  .classList.add("d-none");
                let respuesta = await woo.agregarCarrito();
                if (respuesta) {
                  this.mostrarMensajeCustom(
                    "success",
                    "Felicitaciones",
                    "Materiales agregados al carrito 😎"
                  );
                  setTimeout(() => {
                    location.reload();
                  }, 2000);
                } else if (respuesta == false) {
                  this.mostrarMensajeCustom(
                    "info",
                    "Materiales Sin Stock",
                    "No es posible agregar al carrito"
                  );
                  setTimeout(() => {
                    location.reload();
                  }, 2000);
                }
              })();
            }
          );
        } else {
          this.mostrarMensajeCustom("info", "Ops ...", "Precio total en cero");
        }
      });
    /* agregar opcionales */
    document
      .querySelector("#agregar_opcionales")
      .addEventListener("click", (e) => {
        e.preventDefault();
        let n_esquina = getElement("#n_esquinas");
        let vano_puerta_1 = getElement("#vano_puerta_1");
        let vano_puerta_17 = getElement("#vano_puerta_17");
        const limpiarOpcionales = () => {
          n_esquina.value = "";
          vano_puerta_1.value = "";
          vano_puerta_17.value = "";
        };
        const agregarOpcionales = () => {
          //403047 Perfil Parante
          //403081 Angulo Esquinero
          //448790 Perfil Riel
          this.mostrarSpinner();
          if (n_esquina.value !== "" && parseInt(n_esquina.value) !== 0) {
            /* busco al angulo esquinero */
            let index;
            let anguloesquinero = woo.materiales.find(
              (m, i) => {
                if (m.sku == 403081) {
                  index = i;
                  return m;
                }
              } //3236  es su id
            );
            //si se activa por primera vez
            if (!anguloesquinero.activado) {
              woo.materiales.splice(index, 1); //lo elimino del array su indice es 2
              //si ya lo agregue ignoralo
              anguloesquinero.activado = true;
              anguloesquinero.cantidad = parseInt(n_esquina.value);
              anguloesquinero.redondeo = parseInt(n_esquina.value);
              woo.materiales.push(anguloesquinero); //lo agrego para que aparezca al final
            }
            //403047 perfil parante galv
            woo.materiales.forEach((m) => {
              if (m.activado && m.sku == 403047) {
                m.cantidad = parseFloat(m.cantidad) + 2;
                m.redondeo = Math.ceil(m.cantidad);
              }
            });
          }
          if (
            vano_puerta_1.value !== "" &&
            parseInt(vano_puerta_1.value) !== 0
          ) {
            //modificar a sus respectivos del carrito
            woo.materiales.forEach((m) => {
              if (m.activado) {
                if (m.sku == 403081) {
                  m.cantidad = parseFloat(m.cantidad) + 4;
                  m.redondeo = Math.ceil(m.cantidad);
                }
                if (m.sku == 403047) {
                  m.cantidad = parseFloat(m.cantidad) + 2;
                  m.redondeo = Math.ceil(m.cantidad);
                }
                if (m.sku == 448790) {
                  m.cantidad = parseFloat(m.cantidad) + 1;
                  m.redondeo = Math.ceil(m.cantidad);
                }
              }
            });
          }
          if (
            vano_puerta_17.value !== "" &&
            parseInt(vano_puerta_17.value) !== 0
          ) {
            //modificar a sus respectivos del carrito
            woo.materiales.forEach((ma) => {
              if (ma.activado) {
                if (ma.sku == 403081) {
                  ma.cantidad = parseFloat(ma.cantidad) + 5;
                  ma.redondeo = Math.ceil(ma.cantidad);
                }
                if (ma.sku == 403047) {
                  ma.cantidad = parseFloat(ma.cantidad) + 2;
                  ma.redondeo = Math.ceil(ma.cantidad);
                }
                if (ma.sku == 448790) {
                  ma.cantidad = parseFloat(ma.cantidad) + 1;
                  ma.redondeo = Math.ceil(ma.cantidad);
                }
              }
            });
          }

          this.llenarTabla(woo.materiales); //lleno la tabla
          this.mostrarCantidadTotal();
          this.mostrarPrecioTotal();
          limpiarOpcionales();
          setTimeout(() => {
            this.ocultarSpinner();
          }, 1500);
        };
        if (
          n_esquina.value == "" &&
          vano_puerta_1.value == "" &&
          vano_puerta_17.value == ""
        ) {
          this.mostrarMensajeCustom(
            "info",
            "Ops...",
            "Complete almenos un campo continuar"
          );
        } else if (
          n_esquina.value !== "" ||
          vano_puerta_1.value !== "" ||
          vano_puerta_17.value !== ""
        ) {
          this.mostrarConfirmacionCustom(
            "Advertencia",
            "¿Seguro de agregar estos materiales opcionales?,se actualizaran los materiales",
            "warning",
            "Agregar",
            agregarOpcionales
          );
        }
      });
    document
      .querySelector("#agregar_material")
      .addEventListener("click", (e) => {
        e.preventDefault();
        let html = `
        <div class="d-none" id="mostrar_combos">
          <div class="row">
              <div class="col-md-12">
                  <div class="form-group">
                      <select class="form-control" name="" id="select_m">
                      </select>
                  </div>
              </div>
          </div>
          <div class="row">
              <div class="col-md-6">
                    <div class="form-group">
                      <label for="unidad_m">Unidad X</label>
                      <input type="number" class="form-control form-control-sm" name="" id="unidad_m" min="0">
                      </input>
                    </div>
              </div>
              <div class="col-md-6">
                    <div class="form-group">
                        <label for="factor_m">Factor:</label>
                        <select class="form-control form-control-sm" name="" id="factor_m">
                          <option value="Planchas">Planchas</option>
                          <option value="Piezas">Piezas</option>
                          <option value="Planchas">Planchas</option>
                          <option value="Cientos">Cientos</option>
                          <option value="Rollos">Rollos</option>
                          <option value="Cajas de 5 kg">Cajas de 5 kg</option>
                          <option value="Cajas de 20 kg">Cajas de 20 kg</option>
                          <option value="Cajas de 27 kg">Cajas de 27 kg</option>
                          <option value="Millar">Millar </option>
                          <option value="Bolsas">Bolsas</option>
                        </select>
                    </div>
              </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <div class="form-group">
                  <label for="cantidad_m">Cantidad</label>
                  <input type="number" class="form-control form-control-sm" name="" id="cantidad_m" min="0">
                  </input>
              </div>
            </div>
            <div class="col-sm-12 col-md-6"></div>
          </div>
        </div>
          <div class="text-center my-2" id="spinner_combo">
              <p>Cargando Materiales ...</p>
              <div class="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
              </div>
          </div>
        `;
        let callback = () => {
          let id_material = getElement("#select_m").value;
          let factor = getElement("#factor_m").value;
          let unidad_x = getElement("#unidad_m").value;
          let cantidad = getElement("#cantidad_m").value;
          if (
            id_material !== "" &&
            factor !== "" &&
            unidad_x !== "" &&
            cantidad !== ""
          ) {
            let materialencontrado = woo.allMaterials.find(
              (m) => m.id == id_material
            );
            materialencontrado.activado = true;
            materialencontrado.unidad = factor;
            materialencontrado.precio_metro2 = unidad_x;
            materialencontrado.cantidad = cantidad;
            materialencontrado.redondeo = 0;
            woo.materiales.push(materialencontrado);
            this.eventoCalcular();
            this.llenarTabla(woo.materiales);
          } else {
            this.mostrarMensajeCustom(
              "info",
              "Ops...",
              "Por favor completar todos los campos"
            );
          }
        };
        this.mostrarConfirmacionHtml(
          {
            title: "Elija el material:",
            html,
            confirmButtonText: "Agregar Material",
            cancelButtonText: "Cancelar",
          },
          callback
        );
        (async () => {
          getElement("#swal2-title").classList.add("d-none");
          getElement(".swal2-actions").classList.add("d-none");
          if (woo.allMaterials.length === 0) {
            woo.allMaterials = await woo.getAllMaterials();
          }
          let selectmateriales = getElement("#select_m");
          let template = "";
          woo.allMaterials.forEach((material) => {
            template += `
            <option value="${material.id}">${material.name}</option>
          `;
          });
          selectmateriales.innerHTML = template;
          $("#select_m").select2({ theme: "bootstrap4" });
          getElement("#spinner_combo").classList.add("d-none");
          getElement("#mostrar_combos").classList.remove("d-none");
          getElement("#swal2-title").classList.remove("d-none");
          getElement(".swal2-actions").classList.remove("d-none");
        })();
      });

    /* eventos change para que no se pasen del limite */
    getElement("#n_esquinas").addEventListener("change", (e) => {
      e.target.value = parseInt(e.target.value);
    });
    getElement("#vano_puerta_1").addEventListener("change", (e) => {
      if (parseFloat(e.target.value) > 1) e.target.value = "0";
    });
    document
      .querySelector("#vano_puerta_17")
      .addEventListener("change", (e) => {
        if (parseFloat(e.target.value) > 1.7) e.target.value = "0";
      });
  }
  eventoCalcular() {
    let metraje = this.getMetrajeInput();
    this.mostrarSpinner();
    woo.calcularMetraje(parseFloat(metraje));
    this.llenarTabla(woo.materiales);
    setTimeout(() => {
      this.ocultarSpinner();
    }, 1000);
    this.mostrarCantidadTotal();
    this.mostrarPrecioTotal();
  }
  async getAllMaterials() {
    try {
      let data = await woo.getAllMaterials();
      return data;
    } catch (error) {
      console.warn(error);
    }
  }
  async resetMateriales() {
    this.mostrarSpinner();
    let materiales = await woo.getDatosBaseFormateados(); //obtengo los datos de nuevo
    woo.materiales = materiales.slice(); //copio lo obtenido y lo guardo
    this.llenarTabla(woo.materiales); //lleno la tabla
    this.ocultarSpinner();
    this.mostrarCantidadTotal();
    this.mostrarPrecioTotal();
  }
  mostrarCantidadTotal() {
    let monto_total = parseInt(woo.getMontoTotal());
    getElement("#cantidad_total").innerHTML = monto_total;
  }
  mostrarPrecioTotal() {
    let precio_total = parseFloat(woo.getPrecioTotal()).toFixed(2);
    getElement("#precio_total").innerHTML = `$ ${precio_total}`;
  }
  getMetrajeInput() {
    return parseInt(getElement("#metraje").value) || 0;
  }
}
/* instancias generales */
const woo = new WoocommerceApi();
const ui = new UI();

async function init() {
  try {
    ui.getFechaHoy("#fecha_actual"); //obtengo fecha actual
    woo.materiales = await woo.getDatosBaseFormateados(); //guardo los datos en una propiedad
    ui.llenarTabla(woo.materiales);
    ui.ocultarSpinner();
    ui.cargarEventListeners();
  } catch (error) {
    console.warn(error);
  }
}
init();
