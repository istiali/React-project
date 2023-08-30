import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseApp = {
    apiKey: "AIzaSyD8BdlY8olRIn-011vZMOG-gB-Ms7zJlOA",
    authDomain: "sample-f5984.firebaseapp.com",
    projectId: "sample-f5984",
    storageBucket: "sample-f5984.appspot.com",
    messagingSenderId: "1088805464513",
    appId: "1:1088805464513:web:3f228e1b4d28743548e740",
    measurementId: "G-CD8XBN07JF"
  };
  // firebase.initializeApp(firebaseConfig);
  // const auth = getAuth(app);
  const app = initializeApp(firebaseApp);

  export const auth=getAuth(app);