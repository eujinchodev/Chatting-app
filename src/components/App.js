import React, {useEffect, useState} from "react";
import AppRouter from "components/Router";
import {authService, changeUser} from "fbConfig";


function App() {
  const [init, setInit]=useState(false);
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const [userObj, setUserObj]=useState(null);
  useEffect(()=>{
    changeUser((user)=>{
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[]);
  return (
    <>
    {init ? 
      (<AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> )
      : ("initializing")}
    </>
  );
}

export default App;
