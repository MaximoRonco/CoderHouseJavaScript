
const btnBuscar = document.querySelector('#btn-busqueda'),
busqueda = document.querySelector('#busqueda'),
contMaquinas = document.querySelector('#cont-maquinas');
const contenido = document.querySelector("#contenido");
const iniciandoSesion = document.querySelector("#cargando")

let btnAgregar;
let encontrado;
let usActual = JSON.parse(localStorage.getItem('usuarioActual'));

/*  Notificaciones  */
function toastify(texto, dir) {
    Toastify({
        text: texto,
        duration: 3000,
        destination: dir,
        newWindow: false,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "white",
            color: "black",
            fontWeight: "bold",
            border: "1px solid rgb(201, 0, 0)",
        },
        onClick: function(){} // Callback after click
    }).showToast();
}

/* Notificacion Bienvenido */

let texto = "Bienvenido " + usActual;
toastify(texto);

/* -------------------- */

let maquinasDB = [];
const API_URL = "./db.json"


const getData = async(url) =>{
    const response = await fetch(url);
    const data = await response.json();
    maquinasDB = data;
    getMaquinas(maquinasDB);
}

getData(API_URL);

/*  Traer todas las maquinas al inicio*/
function getMaquinas(maquinasDB){
    
    maquinasDB.forEach(maquina => {
        const {img, nombre, descripcion, zona, id} = maquina;
        contMaquinas.innerHTML += ` <div class="card">
                                                <div class="cardContent">
                                                    <img src="${img}" alt="">
                                                    <h3>${nombre}</h3>
                                                    <h5>${zona}</h5>
                                                    <p>${descripcion}</p>
                                                </div>
                                                <div class="divBoton">
                                                    <button id="${id}" class="agg">Agregar</button>
                                                </div>
                                    </div>`;
    });
    
    const btnAgregar = document.querySelectorAll(".agg");
    
    btnAgregar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let btnId = parseInt(e.target.id);
            let maquinaAgg = agregarMaquina(maquinasDB, btnId);
            let texto = "Maquina agregada";
            let dir = "./misMaquinas.html"
            toastify(texto,dir)
            return maquinaAgg;
        });
    });
}

getMaquinas(maquinasDB);


/* */

/* Filtrado por nombre de maquina */

function buscarMaquina(arr, filtro){
    const encontrado = arr.find((e)=>{
        return e.nombre.includes(filtro);
    });
    return encontrado
}

btnBuscar.addEventListener('click',()=>{
    const encontrado = buscarMaquina(maquinasDB, busqueda.value);
    if(encontrado){
        const {img, nombre, descripcion, zona} = encontrado;
        contMaquinas.innerHTML += `  <div class="card">
                                        <img src="${img}" alt="">
                                        <h3>${nombre}</h3>
                                        <h5>${zona}</h5>
                                        <p>${descripcion}</p>
                                        <button class="agg">Agregar</button>
                                    </div>`
    }
})

/* Agregar maquina a listado */

class Maquina{
    constructor(id, imagen, nombre, descripcion, zona){
        this.id = id;
        this.imagen = imagen;
        this. nombre = nombre
        this.descripcion = descripcion;
        this.zona = zona;
    }
}

function agregarMaquina(arr, filtro){
    const misMaquinas = arr.find((el)=>{
        return el.id == filtro;
    })
    crearMiMaquina(misMaquinas);
    return misMaquinas
}



function crearMiMaquina(misMaquinas) {
    const { id, img, nombre, descripcion, zona } = misMaquinas;
    const maquinaMisMaquinas = new Maquina(id, img, nombre, descripcion, zona);
    guardarMaquinaLS(usActual,maquinaMisMaquinas);
}

function guardarMaquinaLS(nomUsuario, maquina){
    let us = JSON.parse(localStorage.getItem('usuarios'));
    const usuarioEncontrado = us.find((usuario) => usuario.usuario === nomUsuario)
    usuarioEncontrado.maquinas.push(maquina);
    localStorage.setItem('usuarios',JSON.stringify(us))
}


/* */

// Agregar el boton para eliminar de la lista de maquinas
// Hacer que se guarde en el local storage


/* --------------------------- */