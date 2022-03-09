import React, { useEffect, useState } from "react";
import { dbQuery, docWhere, collect, snapshot, orderByCreated, getDoc, userSignOut } from "fbConfig";
import { getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { doc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile=({userObj})=>{
    const [newDisplayName, setNewDisplayName]=useState(userObj.displayName);
    const navigate=useNavigate();
    const onLogOutClick=()=>{
        userSignOut();
        navigate("/");
    }
    const getMyChats=async()=>{
        const q = dbQuery("chats", docWhere("creatorId","==",userObj.uid));
        // const q = await dbQuery(collect("chats"),docWhere("creatorId","==",userObj.uid),orderByCreated("createdAt","asc"));
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc)=>{
            console.log(doc.id, "=>", doc.data());
        });
    };
    useEffect(()=>{
        getMyChats();
    },[]);
    const onChange =(event)=>{
        const {target:{value}}=event;
        setNewDisplayName(value);
    };
    const onSubmit=async (event)=>{
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            console.log("change");
            await updateProfile(userObj, {displayName : newDisplayName});
        }
    };
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Display name" value={newDisplayName} onChange={onChange}/>
                <input type="submit" value="Update Profile"/>
            </form>
                <button onClick={onLogOutClick}>Log Out</button>
        </div>
    );
}
export default Profile;