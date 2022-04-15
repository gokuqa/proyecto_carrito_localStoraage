//variables.
const carrito =document.querySelector('#carrito');
const listaCursos = document.querySelector("#lista-cursos") 
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //agregar curso al carrito presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso)
    //eliminar curso del carrito.
    carrito.addEventListener('click',eliminarCurso);
    //vaciar carrito.

    //muestra los cursos del localStorage.
    document.addEventListener('DOMContentLoaded', () =>{
        articulosCarrito= JSON.parse(localStorage.getItem('carrito') ) || [];
        carritoHTML();
    })
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito=[];//reseteamos el carrito
        limpiarHTML(); //elimminamos todo el HTML
    })
}
//funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado=e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    
    
}
//eliminar datos del curso.
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
    const cursoId =e.target.getAttribute('data-id')

    //elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito =articulosCarrito.filter( curso => curso.id !== cursoId)
    carritoHTML();
}}

//lee el contenido del HTML al que dimos click y extrae la informacion del curso.
function leerDatosCurso(curso) {

  //const crear un objeto con el contenido del curso actual.
      const infoCurso={
      imagen: curso.querySelector('img').src,
      titulo: curso.querySelector('h4').textContent,
      precio: curso.querySelector('.precio span').textContent,
      id: curso.querySelector('a').getAttribute('data-id'),
      cantidad: 1
  }


  const existe =articulosCarrito.some(curso =>curso.id===infoCurso.id);
  if(existe){
      const cursos =articulosCarrito.map( curso =>{
          if(curso.id===infoCurso.id){
            curso.cantidad++;
            return curso; //retorna el objeto actualizado
          }else{
              return curso; //retorna los objetos que no son actualizados
          }
      });
      articulosCarrito=[...cursos]
  }else{

      articulosCarrito = [...articulosCarrito, infoCurso];
  }
  //agregar elementos al arreglo de carrito.
  console.log(articulosCarrito)

  carritoHTML();
}

//muestra el carrito de compras en el HTML.
function carritoHTML(){

    //limpiar el HTML.
    limpiarHTML();



    //recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso=>{
    const {imagen,titulo,precio, cantidad, id}=curso;
    const row = document.createElement('tr');
    row.innerHTML=`
        <td>
            <img src="${imagen}" width="100"> 
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
        
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        
        </td>
    `;

    //agregar al html del carrito en el tbody.  
    contenedorCarrito.appendChild(row); 

    
    });
    //

    //agregar el carrito de compras al storage,
    sincronizarStorage();

}
function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}
function limpiarHTML(){
    //forma lenta.
    //contenedorCarrito.innerHTML='';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}