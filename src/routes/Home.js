import React, { useEffect, useState } from "react";
import {
    addDocument, collect, getDoc, orderByCreated, 
    dbQuery, snapshot, storageService, refStorage, uploadStrings, downloadUrl
    } from "fbConfig";
//import { doc } from "firebase/firestore";
import Chat from "components/Chat";
import { v4 as uuidv4 } from 'uuid';
// import { db } from "fbConfig";
// import { addDoc, collection } from "firebase/firestore";

const Home =({userObj})=> {
    const [chat, setChat]=useState("");
    const [chats, setChats]=useState([]);
    const [previewFile, setPreviewFile] = useState("");
    // const getChats=async()=>{
    //     const getDbChats = await getDoc("chats");
    //     getDbChats.forEach((doc)=>{
    //         const dbChatObj = {
    //             ...doc.data(),
    //             id:doc.id,
    //         };
    //         setChats((prev)=>[dbChatObj,...prev]);
    //         //useState의 setChats함수를 쓴다면 value대신 함수를 안에 넣을 수 있는데,
    //         //이때 인자값은 Chats들의 data들을 담고있음 prev == chats 배열의 모든 데이터
    //         //forEach로 DbChats에 담겨있는 데이터 하나하나들을 순환하면서 setChats에 하나씩 담고있음
    //         //foreEach로 해서 useEffect에 getChats() 하는 방법은 실시간이 아니라 새로고침해야 하기 때문에 
    //         //snapshot을 이용하면 실시간 채팅이 가능하다
    //     });
    //}
    useEffect(()=>{
        const q = dbQuery("chats", "asc");
        snapshot(q, (shot)=>{
            const chatArr=shot.docs.map((doc)=>{
                return{
                    id:doc.id,
                    ...doc.data(),
                };
            });
            setChats(chatArr);
        });
    },[]);
    const onSubmit= async (event)=>{
        event.preventDefault();
        try{
            let downloadFileURL ="";
            if(previewFile!=""){
                const fileRef = refStorage(`${userObj.uid}/${uuidv4()}`);
                const response = await uploadStrings(fileRef, previewFile, "data_url");
                downloadFileURL = await downloadUrl(response.ref);
                console.log(response.ref);
            }
            const chatObj={
                    chat,
                    createdAt: Date.now(),
                    creatorId:userObj.uid,
                    downloadFileURL
                };
            const docRef = await addDocument("chats", chatObj);
            setChat("");
            setPreviewFile("");
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
    const onFileChange=(event)=>{
        const {target:{files}}=event;
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend=(finishedEvent)=>{
            setPreviewFile(finishedEvent.currentTarget.result);
        }
        reader.readAsDataURL(file);
        //console.log(file);
    }
    const onClearPhotoClick=()=> setPreviewFile(null);
    //console.log(chats);
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
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" 
                value="Post"
                />
                {previewFile && 
                    <div>
                        <img src={previewFile} width="50px" height="50px" />
                        <button onClick={onClearPhotoClick}>Cancel Upload Photo</button>
                    </div>
                    }
            </form>
            <div>
                {chats.map(chat=>
                    <Chat key={chat.id} chatObj={chat} isOwner={chat.creatorId === userObj.uid} />
                    )}
            </div>
        </div>
    );
}
export default Home;