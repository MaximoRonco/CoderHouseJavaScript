
/* Logica de inicio de sesión*/
const usuario = document.querySelector('#usuario'),
contraseña = document.querySelector('#contraseña'),
iniciar = document.querySelector('#iniciar'),
checkbox = document.querySelector('.check');
const iniciandoSesion = document.getElementById("cargando")
const contenido = document.querySelector(".container");

let usuarios = [];
let usuarioEncontrado;
let contraseñaEncontrada;

class Recordar{
    constructor(usuario,contraseña){
        this.usuario = usuario,
        this.contraseña = contraseña
    }
}

function cargando(){
    iniciandoSesion.classList.remove("none");
    iniciandoSesion.classList.add("block");
    contenido.classList.add("none");
    setTimeout(()=>{
        iniciandoSesion.classList.remove("block");
        iniciandoSesion.classList.add("none");
        window.location.href = "./home.html";
    },2000)
}


function guardarUsuario(recordarUsu){
    usuarios.push(recordarUsu);
    guardarEnSession(usuarios);
}

function guardarEnSession(usuarios){
    return sessionStorage.setItem('usuarios', JSON.stringify(usuarios));
}

iniciar.addEventListener('click',(e)=>{
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
    if(usuarios == null){ // Condicional para comprobar que exista algo en el localStorage
        alert("No existen usuarios registrados :D")
    }else{
        e.preventDefault();
        usuarioEncontrado = buscarUsuario(usuario.value);
        contraseñaEncontrada = buscarContraseña(contraseña.value);
        if(usuarioEncontrado && contraseñaEncontrada){
            cargando();
            if(checkbox.checked){
                const recordarUsu = new Recordar(usuario.value, contraseña.value);
                guardarUsuario(recordarUsu);
                alert("Usuario sera recordado")
                localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado.usuario));            
            }else{      
                localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado.usuario));
            }
        }else{
            alert("Contraseña o usuario incorrectos")
        }
        return usuarios
    }
})



function buscarUsuario(usuarioFilter){
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
    usuarioEncontrado = usuarios.filter(e => e.usuario === usuarioFilter);
    return usuarioEncontrado.length > 0 ? usuarioEncontrado[0] : null
}


function buscarContraseña(contraseñaFilter){
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
    contraseñaEncontrada = usuarios.filter(e => e.contraseña === contraseñaFilter);
    return contraseñaEncontrada.length > 0 ? contraseñaEncontrada[0] : null
}

