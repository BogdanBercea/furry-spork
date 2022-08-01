import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCotg4_6s20Agt9NeJcP2yWYsIBf3bA3FM",
  authDomain: "crwn-clothing-db-79305.firebaseapp.com",
  projectId: "crwn-clothing-db-79305",
  storageBucket: "crwn-clothing-db-79305.appspot.com",
  messagingSenderId: "540055102191",
  appId: "1:540055102191:web:1cc910412e9afb8077311a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('An error occured while creating a new user.', error.message);
    }
  }

  return userDocRef;
}