import React, { useEffect } from "react";
import { dbQuery, docWhere, collect, snapshot, orderByCreated, getDoc, userSignOut } from "fbConfig";
import { getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { doc } from "firebase/firestore";

const Profile=({userObj})=>{
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
    return(
        <div>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    );
}
export default Profile;