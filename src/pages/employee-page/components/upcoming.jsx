import React from "react";
import '../employee.css'


export default function Upcoming() {
    
    return(
        <>
             <div className="upcoming-wrapper">
                <p>Upcoming Appointments</p>
                
                <div className="table-appointment">
                    <table className="table">
                       
                            <th>Name</th>
                            <th>Ticket No.</th>
                            <th>Time</th>
                      
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