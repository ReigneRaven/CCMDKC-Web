import React from "react"
import '../patient-page/patient-profile.css'
import PtnHeader from "../patient-page/components/header"
import PtnSidebar from "./components/sidebar"
import PtnDashboard from "./components/dashboard"
import Cookies from "js-cookie"



export default function UserProfile (){
    const userId = Cookies.get("userId");
    const userName = Cookies.get("userName")

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