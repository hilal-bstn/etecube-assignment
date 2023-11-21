import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import HomeMenu from "./Menu";


const PrivateComponent=()=>{
    
    const auth=localStorage.getItem('user');

    return auth ?<>           <div className="bottom-row">
    <div className="home-menu">
                <HomeMenu />
                </div>

     <div className="main-content"><Outlet/>
     </div></div></>
     :<Navigate to="/register"/>
}

export default PrivateComponent;