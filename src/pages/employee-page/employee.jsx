import React from "react";
import './employee.css'
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Dashboard from "./components/dashboard";

export default function Employee() {

    const adminId = localStorage.getItem("adminId");
    

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