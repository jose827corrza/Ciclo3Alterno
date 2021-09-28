import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js';
const firebaseConfig = {
    apiKey: "AIzaSyA12E98UfraYKcCFxIoC8QyRooXnlumn1A",
    authDomain: "ciclo3misiontic-b9088.firebaseapp.com",
    projectId: "ciclo3misiontic-b9088",
    storageBucket: "ciclo3misiontic-b9088.appspot.com",
    messagingSenderId: "953197985528",
    appId: "1:953197985528:web:8e5b859b8f4e488dd4050d",
    measurementId: "G-QYRQFL4T7G"
};

const signupform = document.querySelector('#form-signup');


const fireApp = initializeApp(firebaseConfig);
const auth = getAuth(fireApp);
const firestoreDatos = getFirestore();

onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('logged in!');
        console.log(user.user);
    } else {
        console.log('no user');
    }
});

// createUserWithEmailAndPassword(auth, 'josesito@jeje.com', 'contrasela789')
//             .then((userCredential) => {
//                 // Signed in
//                 const usuario = userCredential.user;
//                 // ...
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 // ..
//             });


signupform.addEventListener('submit', (e) => {
    const NewUser = document.querySelector('#NewUserEmail').value;
    const NewPsswd = document.querySelector('#NewUserPassword').value;
    e.preventDefault();
    console.log('Enviando');
    createUserWithEmailAndPassword(auth, NewUser, NewPsswd)
        .then((userCredential) => {
            // Signed in
            console.log('se registro')
            const usuario = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
});

const User = document.querySelector('#UserEmail').value;
const Psswd = document.querySelector('#UserPassword').value;

const LogIn = document.querySelector('#form-logIn');
LogIn.addEventListener('submit', () => {
    signInWithEmailAndPassword(auth, User, Psswd)
        .then((userCredential) => {
            // Signed in
            console.log('se registro')
            const usuario = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
})

