import React from "react";
import '../patient-profile.css'
import Upcoming from "../../employee-page/components/upcoming";
import Calendar from "../../../components/calendar/calendar";

export default function PtnDashboard() {
    
    return(
        <>
             <div className="dash-patient">
                <p>Dashboard</p>
                <div className="dashpatient-row">
                <Upcoming/>
                <Calendar/>
                </div>
             </div>
        </>
    )
}