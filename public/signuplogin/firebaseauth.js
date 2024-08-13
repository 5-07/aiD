import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAI01UcyL55n5tLyoAhwjZ3OoXX2iO071M",
    authDomain: "aidchatbot.firebaseapp.com",
    projectId: "aidchatbot",
    storageBucket: "aidchatbot.appspot.com",
    messagingSenderId: "462737434299",
    appId: "1:462737434299:web:18f2cc904f3d1b3f77ab9e",
    measurementId: "G-FLP745N7DE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Toggle between Sign Up and Sign In forms
document.getElementById('signUpButton').addEventListener('click', () => {
  document.getElementById('signup').style.display = 'block';
  document.getElementById('signIn').style.display = 'none';
});

document.getElementById('signInButton').addEventListener('click', () => {
  document.getElementById('signup').style.display = 'none';
  document.getElementById('signIn').style.display = 'block';
});


// Normal Sign Up
document.getElementById('signupForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: email,
          firstName: firstName,
          lastName: lastName
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
          .then(() => {
            window.location.href = 'index.html'; // Redirect to home page after sign-up
          })
          .catch((error) => {
            console.error("Error writing document", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          showMessage('Email Address Already Exists!', 'signUpMessage');
        } else {
          showMessage('Unable to Create User', 'signUpMessage');
        }
      });
  });
  
  // Normal Sign In
  document.getElementById('signInForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        showMessage('Sign In Successful', 'signInMessage');
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        
        window.location.replace( ''); // 

      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
          showMessage('Incorrect Email or Password', 'signInMessage');
        } else {
          showMessage('Account Does Not Exist', 'signInMessage');
        }
      });
  });
  
  