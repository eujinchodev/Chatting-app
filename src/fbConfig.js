import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged,signInWithPopup,GoogleAuthProvider, signOut,
    } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, onSnapshot,
         doc, deleteDoc, updateDoc, where} from "firebase/firestore";
import {getStorage, ref, uploadString, getDownloadURL, deleteObject} from "firebase/storage";

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
export const orderByCreated = (name, order)=> orderBy(name, order);
export const dbQuery =(path, order)=> query(collect(path), order);
export const docWhere =(name,op,state)=> where(name,op,state);
export const snapshot = (query, snapshot) => onSnapshot(query, snapshot);
export const document = (collectionName, id)=> doc(db, collectionName, id);
export const deleteDocument =(willDeleteDoc)=> deleteDoc(willDeleteDoc);
export const updateDocument =(willEditDoc, willReplacedData)=> updateDoc(willEditDoc, willReplacedData);

export const storageService = getStorage();
export const refStorage = (path) => ref(storageService, path);
export const uploadStrings = (refData, value, metadata) => uploadString(refData, value, metadata);
export const downloadUrl = (refData)=> getDownloadURL(refData);
export const deleteObj= (willDeleteObjURL) =>deleteObject(refStorage(willDeleteObjURL));