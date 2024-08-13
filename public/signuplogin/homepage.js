import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

onAuthStateChanged(auth, (user) => {
    if (user) {
        const loggedInUserId = user.uid; // Use user.uid directly
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('loggedUserFName').innerText = userData.firstName;
                    document.getElementById('loggedUserEmail').innerText = userData.email;
                    document.getElementById('loggedUserLName').innerText = userData.lastName;
                } else {
                    console.log("No document found matching ID");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    } else {
        console.log("User not signed in");
    }
});

const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            localStorage.removeItem('loggedInUserId');
            window.location.href = 'index.html'; // Redirect after sign-out
        })
        .catch((error) => {
            console.error('Error Signing out:', error);
        });
});
