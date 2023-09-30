import React from "react"
import '../patient-page/patient-profile.css'
import PtnHeader from "../patient-page/components/header"
import PtnSidebar from "./components/sidebar"
import PtnDashboard from "./components/dashboard"
import Upcoming from "../employee-page/components/upcoming"
import Calendar from "../../components/calendar/calendar"




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
        <Upcoming/>
        <Calendar/>
        </>
    )
}