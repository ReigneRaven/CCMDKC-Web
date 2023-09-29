import React from "react"
import '../patient-page/patient-profile.css'
import PtnHeader from "../patient-page/components/header"
import PtnSidebar from "./components/sidebar"
import PtnDashboard from "./components/dashboard"




export default function UserProfile (){


    return(

        <>
        <div className="profile">
           <PtnHeader/>
           <div className="content">
           <PtnSidebar/>
            <PtnDashboard/>
           </div>
        </div>

        </>
    )
}