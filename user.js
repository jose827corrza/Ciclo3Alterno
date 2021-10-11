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
let listaServicios = [];

//Variables del DOM
const btnLogin = document.getElementById('btn-login');
const btnLogOut = document.getElementById('btn-logout');
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