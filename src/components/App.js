import React, {useState} from "react";
import AppRouter from "components/Router";
import {authService} from "fbConfig";


function App() {
  const [isLoggedIn, setIsLoggedIn]=useState(authService.currentUser);
  return (
    <AppRouter isLoggedIn={isLoggedIn}/>
  );
}

export default App;