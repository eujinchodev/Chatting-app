import React, { useState } from "react";
import { HashRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Profile from "routes/Profile";
import Authentication from "../routes/Auth";
import Home from "../routes/Home";
import Nav from "./Nav";


const AppRouter = ({isLoggedIn, userObj}) => {
    return(
    <Router>
        {isLoggedIn && <Nav/>}
        <Routes>
            {
                isLoggedIn?
                <>
                <Route path="/profile" element={<Profile userObj={userObj}/>}>
                </Route>
                <Route path="/" element={<Home userObj={userObj}/>}>
                </Route>
                </>
                :
                <Route path="/" element={<Authentication/>}>
                </Route>
            }
        </Routes>
    </Router>
    );
}

export default AppRouter;