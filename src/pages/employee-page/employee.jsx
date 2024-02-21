import React from "react";
import './employee.css'
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Dashboard from "./components/dashboard";
import Cookies from "js-cookie";

export default function Employee() {

    const adminId = Cookies.get("adminId");
    

    return(
        <>
            
            <div className="profile">
            <Header adminId={adminId}/>
            <div className="content">
            <Sidebar adminId={adminId}/>
            <Dashboard adminId={adminId}/>
            </div>
            </div>
        </>
    )
}