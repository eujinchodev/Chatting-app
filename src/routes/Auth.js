import React, { useState } from "react";

const Auth=()=>{
    const [form, setForm]=useState({email:"", password:""});
    // const [email, setEmail]=useState("");
    // const [password, setPassword]=useState("");
    const onChange=({target:{name,value}})=>{
        setForm({...form,[name]:value});
        console.log(name,value);
        // const {target:{name,value}}=event;
        // if(name === "email"){
        //     setEmail(value);
        // }else if(name==="password"){
        //     setPassword(value);
        // }
        
    }
    const onSubmit=(event)=>{
        event.preventDefault();
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} name="email" placeholder="Email" required type="text" value={form.email}/>
                <input onChange={onChange} name="password" placeholder="Password" required type="password" value={form.password}/>
                <input type="submit" value="Log in"/>
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Emmail</button>
            </div>
        </div>);
}
export default Auth;