import React from "react"
import '../patient-page/patient-profile.css'
import PtnHeader from "../patient-page/components/header"
import PtnSidebar from "./components/sidebar"
import PtnDashboard from "./components/dashboard"



export default function UserProfile (){
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName")

    return(

        <>
        <div className="profile">
           <PtnHeader userName={userName}/>
           <div className="content">
           <PtnSidebar userId={userId}/>
            <PtnDashboard userId={userId} userName={userName}/>
           </div>
        </div>
        </>
    )
}