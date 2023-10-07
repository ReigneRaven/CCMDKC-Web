import React from "react";
import '../patient-profile.css'
import Calendar from "../../../components/calendar/calendar";
import UpcomingPtn from "./upcoming-ptn";

export default function PtnDashboard({ id }) {

    
    
    return(
        <>
             <div className="dash-patient">
                <p>Dashboard</p>
                <div className="dashpatient-row">
                 <UpcomingPtn/> 
                <Calendar/>
                </div>
             </div>
        </>
    )
}