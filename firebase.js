/*
Se va a hacer del modo viejo pero que funciona, es el modo que presento
el profesor carlos
*/



const firebaseConfig = {
    apiKey: "AIzaSyA12E98UfraYKcCFxIoC8QyRooXnlumn1A",
    authDomain: "ciclo3misiontic-b9088.firebaseapp.com",
    projectId: "ciclo3misiontic-b9088",
    storageBucket: "ciclo3misiontic-b9088.appspot.com",
    messagingSenderId: "953197985528",
    appId: "1:953197985528:web:8e5b859b8f4e488dd4050d",
    measurementId: "G-QYRQFL4T7G"
};
//Declaracion variables y constantes

const fireApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(fireApp);
const proveedor = new firebase.auth.GoogleAuthProvider();
const database = firebase.firestore();
let usuarioActual;
let listaTareas = [];

//Variables del DOM
const btnLogin = document.getElementById('btn-login');
const btnLogOut = document.getElementById('btn-logout');
const formulario = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const contendorTarea = document.getElementById('todos-container');


const btnRegistro = document.getElementById('btn-registro');
//Funciones
async function login() {
    try {
        const respuesta = await auth.signInWithPopup(proveedor)
        console.log(respuesta.user.displayName);
        usuarioActual = respuesta.user;
        console.log(respuesta);

        listaTareas = await leerTareas()

        pintarBrowser(listaTareas)
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

function logOut() {
    auth.signOut();
}

async function adicionarTarea(texto){
    const tarea = {
        tarea : texto,
        completada : false,
        user: usuarioActual.displayName
    }
    const respuesta = await guardarTarea(tarea)
    console.log(respuesta);
    input.value=''
    listaTareas = await leerTareas()
        pintarBrowser(listaTareas)
}

function pintarBrowser(tareas){
    let contenidoHtml = "";
    tareas.forEach((t)=>{
        contenidoHtml += `
        <li>${t.tarea}</li>
        `
    })
    contendorTarea.innerHTML = contenidoHtml
}
//Base de datos
async function guardarTarea(task) {
    try {
        const respuesta = await database.collection('lista-tareas').add(task)
        return respuesta
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

async function leerTareas() {
    const tareas = []
    const respuesta = await database.collection('lista-tareas').get()
    respuesta.forEach(function(item){
        console.log(item.data());
        tareas.push(item.data())
    })
    return tareas
}



//Eventos
//Login
btnLogin.addEventListener('click', (e) => {
    login()
    btnRegistro.classList.add('visually-hidden')
    btnLogOut.classList.remove('visually-hidden')


})
//LogOut
btnLogOut.addEventListener('click', () => {
    logOut()

})

//Formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(input.value);
    const texto = input.value
    if(texto !=""){
        adicionarTarea(texto)
    }
})

//Persistencia sesion
// usuarioActual = firebase.auth().setPersistance(firebase.auth.Auth.Persistance.SESSION)
//     .then(() =>{
//         var provider = new firebase.auth.GoogleAuthProvider();
//     // In memory persistence will be applied to the signed in Google user
//     // even though the persistence was set to 'none' and a page redirect
//     // occurred.
//     return firebase.auth().signInWithRedirect(provider);
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     })
