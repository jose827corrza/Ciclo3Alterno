function my(){
    let emailText = document.getElementById('exampleInputEmail1').value;
    let psswrd = document.getElementById('exampleInputPassword1').value;
    alert("datos "+emailText+psswrd);
    
}
var  firebaseConfig = {
    apiKey: "AIzaSyA12E98UfraYKcCFxIoC8QyRooXnlumn1A",
    authDomain: "ciclo3misiontic-b9088.firebaseapp.com",
    projectId: "ciclo3misiontic-b9088",
    storageBucket: "ciclo3misiontic-b9088.appspot.com",
    messagingSenderId: "953197985528",
    appId: "1:953197985528:web:95ebe892f090b359d4050d",
    measurementId: "G-P18NE6S3XT"
  };

firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    auth.languageCode = "es";
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Login con un proveedor
async function loginProvider(provider) {
    const response = await auth.signInWithPopup(provider)
    console.log(response);
    }

loginProvider(googleProvider);
async function createWithEmailAndPassword(exampleInputEmail1, exampleInputPassword1){
    try {
        const response = await auth.createUserWithEmailAndPassword(email, password);
        var user = firebase.auth().currentUser;
        console.log(user);
        console.log(response.user.exampleInputEmail1);
      } catch (error) {
        throw new Error(error)
      }
}
createWithEmailAndPassword('prueba@email.com', '123456')

// Login usuario email y password
async function signInWithEmailAndPassword(email, password) {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      console.log(user);
      console.log(response.user.email);
      actualStatusAuth()
    } catch (error) {
      throw new Error(error)
    }
  }
  signInWithEmailAndPassword('prueba@email.com', '123456')