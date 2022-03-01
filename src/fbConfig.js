import { initializeApp } from "firebase/app";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged,signInWithPopup,GoogleAuthProvider, signOut,
    } from "firebase/auth";
    import { getFirestore, collection, addDoc, getDocs, orderBy, query, onSnapshot,
         doc, deleteDoc, updateDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth();
export const createUser=(email, password) => createUserWithEmailAndPassword(authService, email, password);
export const signInUser=(email, password) => signInWithEmailAndPassword(authService, email, password);
export const changeUser=(user)=> onAuthStateChanged(authService, user);
export const signInPopUp=(provider)=> signInWithPopup(authService, provider);
export const googleProvider=()=> new GoogleAuthProvider();
export const userSignOut=()=> signOut(authService);

export const db = getFirestore();
export const collect=(path)=> collection(db, path);
export const addDocument =(path, data)=> addDoc(collect(path), data);
export const getDoc =(path)=> getDocs(collect(path));
export const orderByCreated = (order)=> orderBy("createdAt", order);
export const dbQuery =(path,order)=> query(collect(path),orderByCreated(order));
export const snapshot = (query, snapshot) => onSnapshot(query, snapshot);
export const document = (collectionName, id)=> doc(db, collectionName, id);
export const deleteDocument =(willDeleteDoc)=> deleteDoc(willDeleteDoc);
export const updateDocument =(willEditDoc, willReplacedData)=> updateDoc(willEditDoc, willReplacedData);