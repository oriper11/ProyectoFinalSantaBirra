//id: '', tipo:'', modelo:'', precio: 500, img:"nombre de la carpeta de img/nombre de la img"},
const productos = [
{id: '0', tipo: "cerveza", modelo:"Growler Blonde - Santa Birra", precio: 850, img: "/assets/blonde.jpg"},
{id: '1', tipo: "cerveza",modelo:"Growler Double Honey - Santa Birra", precio: 900, img:"/assets/honey.jpg"},
{id: '2', tipo: "cerveza",modelo: "Growler Apa- Santa Birra" , precio: 800, img: src="/assets/apa.jpg"},
{id: '3', tipo: "cerveza",modelo:"Growler Vera IPA - Santa Birra", precio: 830, img:"/assets/ipa.jpg"},
{id: '4', tipo: "cerveza",modelo:"Growler Scottish Ale - Santa Birra", precio: 950,img:"/assets/scottish.jpg"},
{id: '5',tipo: "cerveza",modelo: "Growler Stout Cream - Santa Birra", precio: 870, img:"/assets/porter.jpg"},
{id: '6',tipo: "vino",modelo: "Santa Julia Dulce", precio: 800, img:"/assets/julia.jpg"},
{id: '7',tipo: "vino",modelo: "Luigi Bosca ", precio: 1700, img:"/assets/luigi.jpg"},
{id: '8',tipo: "vino",modelo: "Portillo Malbec", precio: 1000, img: "/assets/portilla.jpg"},
{id: '9',tipo: "vino",modelo: "Cordero con piel de lobo", precio: 750, img:"/assets/cordero.jpg"},
{id: '10',tipo: "vino",modelo: "Otro loco mas", precio: 900, img: src="/assets/otro.jpg"},
{id: '11',tipo: "aperitivos",modelo: "Fernet Branca 750ml + 2 Coca Colas 225ml", precio: 1500, img:"/assets/promofernet.jpg"},
{id: '12',tipo: "aperitivos",modelo: "Gancia + 1 Sprite 225ml", precio: 950, img:"/assets/sprite.jpg"},
{id: '13',tipo: "aperitivos",modelo: "Campari + 2 Citric", precio: 950, img: "/assets/campari.jpg"},
{id: '14',tipo: "aperitivos",modelo: "2 Aperol + 2 Cinzano Pro", precio: 2300, img: "/assets/aperol.jpg"},

];

const contenedorTienda = document.getElementById('contenedorTienda');
const contenedorCarrito = document.getElementById('contenedorCarrito');

for (const producto of productos) {
    const divProducto = document.createElement('div');
    const imgProducto = document.createElement ('img');
    const nombreProducto = document.createElement('h4');
    const precioProducto = document.createElement('h3');
    const botonComprar = document.createElement('button');


  divProducto.classname = 'card';
  imgProducto.classname = 'card-img-top';
  nombreProducto.classname = 'card-nombre-producto';
  precioProducto.classname = 'card-precio-prodcucto';
  botonComprar.classname = 'btn-btn';


  divProducto.id = producto.id;
  imgProducto.src = producto.img;
  nombreProducto.append (producto.modelo);  
  precioProducto.append (`$${producto.precio}`);
  botonComprar.append ('Agregar al carrito');
  botonComprar.id = `${producto.id}`;

  botonComprar.onclick = () => {
    const productoComprado = productos.find(producto => producto.id === botonComprar.id);
    carrito.push({ nombre: productoComprado.modelo, precio: productoComprado.precio })
    let productoCompradoJSON = JSON.stringify(productoComprado)
    localStorage.setItem('productoComprado', productoCompradoJSON)
  }
  divProducto.append(imgProducto, nombreProducto, precioProducto, botonComprar);
    contenedorTienda.append(divProducto);
}
const mostrarCarrito = () => {
  for (const producto of carrito){
    const nombreProducto = `<h3>Producto: ${producto.nombre} </h3>`
    const precioProducto = `<h4>Precio: ${producto.precio} </h4>`
    contenedorCarrito.innerHTML += nombreProducto
    contenedorCarrito.innerHTML += precioProducto
  }
  const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
  contenedorCarrito.append(`Total: ${total}`);
};

const botonCarrito = document.getElementById("btnCarrito");
botonCarrito.onclick = mostrarCarrito;

const compraFinal = () => alert (
  '¡Felicitaciones por tu compra!',
  'Te enviaremos los detalles al mail.',
  'success'
  )

const botonComprafinal = document.getElementById("btnComprafinal")
botonComprafinal.onclick = compraFinal;

const btnbuscar = document.getElementById("btnBuscar");
const inputBuscador = document.getElementById('buscadorInput');

const buscarProducto = ()=>{
     const productoModelo = inputBuscador.value;

     const resultadoBusqueda = productos.filter(producto => producto.modelo === productoModelo )
     for(producto of productos){

      const id = producto.id;
      document.getElementById(id).style.display = "none";

     }
     for(producto of resultadoBusqueda){

        const id = producto.id;
        document.getElementById(id).style.display = "flex";

     }
     
}

btnbuscar.onclick = buscarProducto;


