import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyARQcPHPs4oJHaLBE7EhJlqewbQnzMYmnk",
  authDomain: "dumpling-recipe-app.firebaseapp.com",
  databaseURL: "https://dumpling-recipe-app-default-rtdb.firebaseio.com",
  projectId: "dumpling-recipe-app",
  storageBucket: "dumpling-recipe-app.appspot.com",
  messagingSenderId: "242213804165",
  appId: "1:242213804165:web:34c7094e9ff0c5fd0271ec"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export {app, auth, db};