import React from "react";
import './employee.css'
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Dashboard from "./components/dashboard";

export default function Employee() {
    
    return(
        <>
            
            <div className="profile">
            <Header/>
            <div className="content">
            <Sidebar/>
            <Dashboard/>
            </div>
            </div>
        </>
    )
}