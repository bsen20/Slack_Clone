// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCfhFpT1ojL_Kv6nhNaLvbGaERHlLFAZqg",
    authDomain: "slack-clone-7d385.firebaseapp.com",
    projectId: "slack-clone-7d385",
    storageBucket: "slack-clone-7d385.appspot.com",
    messagingSenderId: "493365918891",
    appId: "1:493365918891:web:16b8920c939229a93a0bee",
    measurementId: "G-R24RJ20Z4X"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db,auth,provider};