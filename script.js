class Producto {
    constructor(nombre, marca, precio, img){
      this.nombre = nombre
      this.marca = marca
      this.precio = precio
      this.img = img
    }
}

const producto1 = new Producto("Growler Blonde", "Santa Birra",950,"/assets/blonde.jpg")
const producto2 = new Producto("Growler Porter", "Santa Birra",950,"/assets/porter.jpg")
const producto3 = new Producto("Growler Vera IPA", "Santa Birra",950,"/assets/ipa.jpg")
const producto4 = new Producto("Growler Apa", "Santa Birra",950,"/assets/apa.jpg")
const producto5 = new Producto("Growler Double Honey", "Santa Birra",950,"/assets/honey.jpg")
const producto6 = new Producto("Growler Scottish", "Santa Birra",950,"/assets/scottish.jpg")
const producto7 = new Producto("Santa Julia Dulce","Santa Julia", 560,"/assets/julia.jpg")
const producto8 = new Producto("Cordero con piel de lobo","Cordero con piel de lobo", 980,"/assets/cordero.jpg")
const producto9 = new Producto("Otro loco mas","Otro loco mas", 870,"/assets/otro.jpg")
const producto10 = new Producto("Portillo Malbec", "Portillo Malbec",470,"/assets/portilla.jpg" )
const producto11 = new Producto("Luigi Bosca","Luigi Bosca", 1200, "/assets/luigi.jpg")
const producto12 = new Producto("Fernet Branca 750ml + 2 Coca Colas 225ml", "Promo 1", 2000, "/assets/promofernet.jpg")
const producto13 = new Producto("Gancia + 1 Sprite 225ml", "Promo 2", 1200, "/assets/sprite.jpg")
const producto14 = new Producto("2 Aperol + 2 Cinzano Pro", "Promo 4", 1300, "/assets/aperol.jpg")
const producto15 = new Producto("Campari + 2 Citric", "Promo 3", 950, "/assets/campari.jpg")

const productos = [producto1, producto2, producto3, producto4, producto5,producto6,producto7,producto8,producto9,producto10,producto11,producto12,producto13,producto14,producto15]

let carrito = [];

const productosTienda = document.getElementById("productosTienda")
const botonCarrito = document.getElementById("botonCarrito")
const compraFinal = document.getElementById("compraFinal")
const miLocalStorage = window.localStorage;

//productos mostrados en dom//


productos.forEach((producto) => {
  productosTienda.innerHTML += `
    <div class="card border-primary mb-3" style="max-width: 20rem;margin:4px;">
      <div class="card-header">${producto.nombre}</div>
        <div class="card-body">
          <p class="card-text">Marca: ${producto.marca}</p>
          <p class="card-text">Precio: $${producto.precio}</p>
          <p class="card-text">Stock: ${producto.stock}</p>
          <button class="btn btn-secondary botonCarrito">Agregar al carrito</button>
      </div>
    </div>
  
  `
});
compraFinal.addEventListener('click', () => {
  Swal.fire({
    title: 'Carrito',
    showDenyButton: true,
    showCancelButton: true,
    html:
      '<p>Productos de Carrito</p>',
    confirmButtonText: 'Finalizar Compra',
    denyButtonText: `Cancelar Compra`,
    cancelButtonText: 'Seguir comprando'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {   
      Swal.fire('Compra Finalizada', 'En breve se enviaran los productos', 'success')
    } else if (result.isDenied) {
      Swal.fire('¿Desea Cancelar su compra?', '', 'info')
    }
  })
},

function sumarProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute(productos))
    // Actualizamos el carrito 
    representarCarrito();
    guardarCarritoEnLocalStorage();
              
  },
  
  function representarCarrito() {
    productosTienda.textContent = '';
    // 
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = productos.filter((itemProductos) => {
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
        const vaciarCarrito = document.createElement('button');
        vaciarCarrito.classList.add('btn', 'btn-danger', 'mx-5');
        vaciarCarrito.textContent = 'Eliminar producto';
        vaciarCarrito.style.marginLeft = '1rem';
        vaciarCarrito.dataset.item = item;
        vaciarCarrito.addEventListener('click', borrarItemCarrito);
      
        productos.appendChild(vaciarCarrito);
        productosTienda.appendChild(productos);
    });
    // Convertimos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
  },
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
  
  });
  
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
  };
  
  
carrito.addEventListener('click', vaciarCarrito);{
  
  cargarCarritoDeLocalStorage();
  renderizarProductos();
  representarCarrito();

};
//asincronismo//
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
            <div class="card" id="producto${indice}" style="width: 18rem;margin:3px;">
            <img src="/assets/${producto.img}" class="card-img-top" alt="...">
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