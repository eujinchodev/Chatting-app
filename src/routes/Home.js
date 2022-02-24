import React, { useEffect, useState } from "react";
import {addDocument, collect, getDoc} from "fbConfig";
// import { db } from "fbConfig";
// import { addDoc, collection } from "firebase/firestore";

const Home =()=> {
    const [chat, setChat]=useState("");
    const [chats, setChats]=useState([]);
    const getChats=async()=>{
        const getDbChats = await getDoc("chats");
        console.log(getDbChats);
    }
    useEffect(()=>{
        getChats();
    },[])
    const onSubmit= async (event)=>{
        event.preventDefault();
        try{
            const docRef = await addDocument("chats", {
                chat,
                createAt: Date.now(),
            });
            setChat("");
            console.log("Doc Ref : ", docRef);
            // const docRef = await addDoc(collection(db, "chats"), {
            //     chat,
            //     createdAt: Date.now(),
            //     });
            // setChat("");
        }catch(error){
            console.log("catch error : ",error);
        }
    }
    const onChange=(event)=>{
        const {target:{value}}=event;
        setChat(value);
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input 
                type="text" 
                placeholder="What's on your mind?" 
                maxLength={120} 
                onChange={onChange}
                value={chat}
                />
                <input type="submit" 
                value="Post"
                />
            </form>
        </div>
    );
}
export default Home;