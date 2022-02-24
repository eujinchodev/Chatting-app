import React from "react";
import { userSignOut } from "fbConfig";
import { useNavigate } from "react-router-dom";

const Profile=()=>{
    const navigate=useNavigate();
    const onLogOutClick=()=>{
        userSignOut();
        navigate("/");
    }
    return(
        <div>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    );
}
export default Profile;