import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCKH01w4JAQFF7nJWiDFbWN4NGMyBez5ws",
  authDomain: "feruzjon-discord.firebaseapp.com",
  databaseURL: "https://feruzjon-discord.firebaseio.com",
  projectId: "feruzjon-discord",
  storageBucket: "feruzjon-discord.appspot.com",
  messagingSenderId: "988736332066",
  appId: "1:988736332066:web:861173016e545b8df9057b",
  measurementId: "G-NHP4GV8PEG",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
