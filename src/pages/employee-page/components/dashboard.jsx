import React from "react";
import '../employee.css'
import Calendar from "../../../components/calendar/calendar";
import Request from "./request.jsx";

export default function Dashboard() {
    
    return(
        <>
             <div className="dash-employee">
                <p>Dashboard</p>
                <div className="dashemployee-row">
                <Request/>
                <Calendar/>
                </div>
             </div>
        </>
    )
}