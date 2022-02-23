import React, {useEffect, useState} from "react";
import AppRouter from "components/Router";
import {authService, changeUser} from "fbConfig";


function App() {
  const [init, setInit]=useState(false);
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  useEffect(()=>{
    changeUser((user)=>{
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[]);
  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "initializing"}
    </>
  );
}

export default App;
