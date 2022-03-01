import { db, deleteDocument, updateDocument, document } from "fbConfig";
import React, { useState } from "react";

const Chat=({chatObj, isOwner})=>{
    const ChatRef = document("chats", `${chatObj.id}`);
    const [editing, setEditing]=useState(false);
    const [newChat, setNewChat]=useState(chatObj.chat);
    const onDeleteClick=async()=>{          //async 안 붙여줘도 onSnapshot 덕분에 바로바로 업뎃 가능
        const ok = window.confirm("Are you sure you want to delete this chat?");
        if(ok){
            await deleteDocument(ChatRef);
        }
    }
    const toggleEditing=()=>{
        setEditing(prev=>!prev);
    }
    const onSubmit= async(event)=>{         //async 안붙여줘도 같은 이유로 가능
        event.preventDefault();
        await updateDocument(ChatRef, {
            chat:newChat,
        });
        setEditing(false);
    }
    const onChange=(event)=>{
        setNewChat(event.target.value);
    }
    return(
        <div>
            {
                editing ? (
                    <>
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} type="text" value={newChat} required />
                        <input type="submit" value="Update Chat" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                    </>
                ):
                (
                    <>
                    <h4>{chatObj.chat}</h4>
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Chat</button>
                            <button onClick={toggleEditing}>Edit Chat</button>
                        </>
                    )}
                    </>
                )
            }
        </div>
    );
};

export default Chat;