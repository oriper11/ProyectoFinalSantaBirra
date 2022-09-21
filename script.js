const Productos = [
  {
      id: 1,
      nombre: 'Growler Blonde',
      marca: 'Santa Birra',
      precio: 950,
      imagen: "/assets/blonde.jpg"
  },
  {
      id: 2,
      nombre: 'Growler Porter',
      marca: 'Santa Birra',
      precio: 950,
      imagen: "/assets/porter.jpg"
  },
  {
      id: 3,
      nombre: 'Growler Vera IPA',
      marca: 'Santa Birra',
      precio: 950,
      imagen: "/assets/ipa.jpg"
  },
  {
      id: 4,
      nombre: 'Growler Apa',
      marca: 'Santa Birra',
      precio: 950,
      imagen: "/assets/apa.jpg"
  },
  {
    id: 5,
    nombre: 'Growler Double Honey',
    marca: 'Santa Birra',
    precio: 950,
    imagen: "/assets/honey.jpg"
},
{
  id: 6,
  nombre: 'Growler Scottish',
  marca: 'Santa Birra',
  precio: 950,
  imagen: "/assets/scottish.jpg"
},
{
  id: 7,
  nombre: 'Santa Julia Dulce',
  marca: 'Santa Julia',
  precio: 560,
  imagen: "/assets/julia.jpg"
},
{
  id: 8,
  nombre: 'Cordero con piel de lobo',
  marca: 'Cordero con piel de lobo',
  precio: 980,
  imagen: "/assets/cordero.jpg"
},
{
  id: 9,
  nombre: 'Otro loco más',
  marca: 'Otro loco más',
  precio: 870,
  imagen: "/assets/otro.jpg"
},
{
  id: 10,
  nombre: 'Portillo Malbec',
  marca: 'Portillo Malbec',
  precio: 470,
  imagen: "/assets/portilla.jpg"
},
{
  id: 11,
  nombre: 'Luigi Bosca',
  marca: 'Luigi Bosca',
  precio: 1200,
  imagen: "/assets/luigi.jpg"
},
{
  id: 12,
  nombre: 'Fernet Branca 750ml + 2 Coca Colas 225ml',
  marca: 'Promo 1',
  precio: 2000,
  imagen: "/assets/promofernet.jpg"
},
{
  id: 13,
  nombre: 'Gancia + 1 Sprite 225ml',
  marca: 'Promo 2',
  precio: 1200,
  imagen: "/assets/sprite.jpg"
},
{ id: 15,
  nombre: '2 Aperol + 2 Cinzano Pro',
  marca: 'Promo 4',
  precio: 1300,
  imagen: "/assets/aperol.jpg"
},
{
  id: 14,
  nombre: 'Campari + 2 Citric',
  marca: 'Promo 3',
  precio: 930,
  imagen: "/assets/campari.jpg"
}
];


let carrito = [];
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#botonVaciar');
const DOMbotonComprar = document.querySelector('#botonComprar');
const miLocalStorage = window.localStorage;

function renderizarProductos() {
  Productos.forEach((info) => {
      // Estructura
      const productos = document.createElement('div');
      productos.classList.add('card', 'col-lg-12');
      // Body
      const productosCardBody = document.createElement('div');
      productosCardBody.classList.add('card-body');
      // Titulo
      const productosTitle = document.createElement('h5');
      productosTitle.classList.add('card-title');
      productosTitle.textContent = info.nombre;
      // Imagen
      const productosImagen = document.createElement('img');
      productosImagen.classList.add('img-fluid');
      productosImagen.setAttribute('src', info.imagen);
      // Precio
      const productosPrecio = document.createElement('p');
      productosPrecio.classList.add('card-text');
      productosPrecio.textContent = `$${info.precio}`;
      // Boton 
      const productosBoton = document.createElement('button');
      productosBoton.classList.add('btn', 'btn-primary');
      productosBoton.textContent = 'Agregar al carrito';
      productosBoton.setAttribute('marcador', info.id);
      productosBoton.addEventListener('click', sumarProductoAlCarrito);
      // Productos mostrados
      productosCardBody.appendChild(productosImagen);
      productosCardBody.appendChild(productosTitle);
      productosCardBody.appendChild(productosPrecio);
      productosCardBody.appendChild(productosBoton);
      productos.appendChild(productosCardBody);
      DOMitems.appendChild(productos);
  });
}

// Sumar productos al carrito 
function sumarProductoAlCarrito(evento) {
  carrito.push(evento.target.getAttribute('marcador'))
  // Actualizamos el carrito 
  representarCarrito();
  guardarCarritoEnLocalStorage();
            
}

function representarCarrito() {
  DOMcarrito.textContent = '';
  // 
  const carritoSinDuplicados = [...new Set(carrito)];
  carritoSinDuplicados.forEach((item) => {
      const miItem = Productos.filter((itemProductos) => {
          return itemProductos.id === parseInt(item);
      });
      // Contar el numero de veces que se repite el producto
      const numeroUnidadesItem = carrito.reduce((total, itemId) => {
          return itemId === item ? total += 1 : total;
      }, 0);

      const productos = document.createElement('li');
      productos.classList.add('list-group-item', 'text-right', 'mx-2');
      productos.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}`;
      // Eliminar producto seleccionado
      const miBoton = document.createElement('button');
      miBoton.classList.add('btn', 'btn-danger', 'mx-5');
      miBoton.textContent = 'Eliminar producto';
      miBoton.style.marginLeft = '1rem';
      miBoton.dataset.item = item;
      miBoton.addEventListener('click', borrarItemCarrito);
      productos.appendChild(miBoton);
      DOMcarrito.appendChild(productos);
  });
  // Convertimos el precio total en el HTML
  DOMtotal.textContent = calcularTotal();
}
//Eliminar un elemnento del carrito
function borrarItemCarrito(evento) {
  const id = evento.target.dataset.item;
  // Borramos todos los productos
  carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
  });
  // actualizamos el carrito
  representarCarrito();
  guardarCarritoEnLocalStorage();

}

function calcularTotal() {
  // Recorremos el carrito 
  return carrito.reduce((total, item) => {
      // Buscar el precio de cada elemento
      const miItem = Productos.filter((itemProductos) => {
          return itemProductos.id === parseInt(item);
      });
      // Los sumamos al total 
      return total + miItem[0].precio;
  }, 0).toFixed(2);
}

function vaciarCarrito() {
  // Borramos los productos guardados
  carrito = [];
  // actualizamos  cambios
  representarCarrito();
  localStorage.clear();

}
function guardarCarritoEnLocalStorage () {
  miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage () {
  // Chequear si existe un carrito guardado
  if (miLocalStorage.getItem('carrito') !== null) {
      // Cargar la info
      carrito = JSON.parse(miLocalStorage.getItem('carrito'));
  }
}

DOMbotonVaciar.addEventListener('click', vaciarCarrito);

cargarCarritoDeLocalStorage();
renderizarProductos();
representarCarrito();

DOMbotonComprar.addEventListener('click', () => {
    Swal.fire({
      title: '¿Desea finalizar la compra?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Finalizar Compra',
      denyButtonText: `Cancelar Compra`,
      cancelButtonText: 'Seguir comprando'
    }).then((result) => {
//Si la compra esta ok, compra confirmada, si no cancelar
      if (result.isConfirmed) {   
        Swal.fire('Compra Finalizada', 'En breve se enviaran los productos', 'success')
      } else if (result.isDenied) {
        Swal.fire('¿Desea Cancelar su compra?', '', 'info')
      }
    })
  }) 



  const divProductos = document.getElementById("divProductos")
  const inputProducto = document.getElementById("inputProducto")
  
  const traerProductos = async () => {
      const response = await fetch('./json/productos.json')
      const productos = await response.json()
      return productos
  }
  
  function mostrarProductos(arrayProductos) {
      arrayProductos.forEach((producto, indice) => {
          divProductos.innerHTML += `
              <div class="card" id="producto${indice}" style="width:250px;height:300px;margin:3px;">
                  <div class="card-body">
                      <h5 class="card-title">${producto.nombre}</h5>
                      <p class="card-text">Marca: ${producto.marca}</p>
                      <p class="card-text">Precio: $${producto.precio}</p>
                      <button class="btn btn-dark">Agregar al carrito</button>
                  </div>
              </div>
          
          `
      });
  
  }
  
  inputProducto.addEventListener('input', () => {
      let res = inputProducto.value
  
      traerProductos().then(productos => {
          const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(res.toLowerCase()))
          divProductos.innerHTML = ""
          mostrarProductos(productosFiltrados)
      })
  })