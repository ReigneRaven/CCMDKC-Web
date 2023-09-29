import React, { useEffect, useState} from "react";
import '../employee.css'
import { useAppointmentContext } from "../../../Hooks/useAppointmentContext";

export default function Upcoming() {

    // const {appointment, dispatch} = useAppointmentContext();

    // const dateCreated = (updatedAt) => {
    //     return new Date(updatedAt).toLocaleDateString("en-US", {
    //       year: "numeric",
    //       month: "long",
    //       day: "numeric",
    //     });
    //   }

    // useEffect(()=>{
    //     const fetchAppointment = async() => {
    //         const res = await fetch('/api/appointments/')
    //         const json = await res.json();

    //         if (res.ok){
    //             dispatch({type: "SET_APPOINTMENT", payload:json})
    //         }
    //     }

    //     fetchAppointment();

    // }, [])

    
    return(
        <>
             <div className="upcoming-wrapper">
                <p>Upcoming Appointments</p>
                
                <div className="table-appointment">
                    <table className="table">
                        <thead>
                            <th>Name</th>
                            <th>Ticket No.</th>
                            <th>Time</th>
                        </thead>
                        <tbody>
                            {/* {
                                appointment.map((appointment)=>(
                                    <tr>
                                        {/* <td>{appointment.id}</td>
                                        <td>{appointment.name}</td>
                                        <td>{appointment.appointmentTicketNo}</td>
                                        <td>{appointment.appointmentTime}</td>
                                        <td>{appointment.dateCreated(appointment.updatedAt)}</td> 
                                ))
                            } */}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}