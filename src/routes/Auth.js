import { authService, createUser, signInUser, googleProvider, signInPopUp } from "fbConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import React, { useState } from "react";

const Authentication=()=>{
    const [form, setForm]=useState({email:"", password:""});
    // const [email, setEmail]=useState("");
    // const [password, setPassword]=useState("");
    const [newAccount, setNewAccount]=useState(true);
    const [error, setError]=useState("");
    //const auth = getAuth();
    // const auth = authService;
    const onChange=({target:{name,value}})=>{
        setForm({...form,[name]:value});
        // const {target:{name,value}}=event;
        // if(name === "email"){
        //     setEmail(value);
        // }else if(name==="password"){
        //     setPassword(value);
        // }
    } 
    const onSubmit=async(event)=>{
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                data = await createUser(form.email, form.password);
            }else{
                data = await signInUser(form.email, form.password);
             }
             console.log(data);
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
                // try {
        //     let data;
        //     if(newAccount) {
        //     data = await createUserWithEmailAndPassword(auth, form.email, form.password);
        //     } else {
        //     data = await signInWithEmailAndPassword(auth, form.email, form.password);
        //         }
        //     console.log (data);
        //     } catch(error) {
        //     console.log(error)
        //         }
        // }
    }
    const toggleAccount =()=> setNewAccount((prev)=>!prev);
    const onSocialClick =async(event)=>{
        const provider = googleProvider();
        const data = await signInPopUp(provider);
        console.log(data);
    };
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} name="email" placeholder="Email" required type="text" value={form.email}/>
                <input onChange={onChange} name="password" placeholder="Password" required type="password" value={form.password}/>
                <input type="submit" value={newAccount ? "Create Account":"Sign In"}/>
                <span>{error}</span>
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                
            </div>
        </div>);
}
export default Authentication;