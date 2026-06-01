import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBnq9JnvaqaCFBrGxYtpF7K4mKJ8Ell_tQ",
  authDomain: "chejinna-f512d.firebaseapp.com",
  projectId: "chejinna-f512d",
  storageBucket: "chejinna-f512d.firebasestorage.app",
  messagingSenderId: "445037003935",
  appId: "1:445037003935:web:adbb3fae64c8d5ba66ceaa"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
