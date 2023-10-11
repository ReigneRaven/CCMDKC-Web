import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import '../employee.css'
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5000');

export default function Request() {

    const [appointments, setAppointments] = useState([]);
    
    useEffect(() => {
        // Fetch appointments and set up Socket.io event listeners
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/appointments');
                const formattedAppointments = response.data.map(appointment => {
                    const formattedDate = new Date(appointment.appointmentDate).toLocaleDateString('en-US');
                    return {
                        ...appointment,
                        appointmentDate: formattedDate,
                        processed: appointment.status === 'Accepted' || appointment.status === 'Denied',
                    };
                });
                setAppointments(formattedAppointments);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchAppointments();

        // Listen for appointmentStatusChanged event from the server
        socket.on('appointmentStatusChanged', (data) => {
            // Update the appointments in state based on the event data
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment._id === data.appointmentId
                        ? { ...appointment, status: data.status }
                        : appointment
                )
            );
        });

        return () => {
            // Clean up the socket connection when the component unmounts
            socket.disconnect();
        };
    }, []);

    const handleAcceptAppointment = (appointmentId) => {
        axios.put(`http://localhost:5000/api/appointments/${appointmentId}/status`,
            { status: 'Accepted' })
            
            .then(response => {
                console.log('Appointment accepted successfully', response);
                socket.emit('appointmentStatusChanged', { appointmentId, status: 'Accepted' });
               
            })
            .catch(error => {
                console.error('Error accepting appointment', error);
            });
    };

    const handleDenyAppointment = (appointmentId) => {
        axios.put(`http://localhost:5000/api/appointments/${appointmentId}/status`,
            { status: 'Denied' })
            .then(response => {
                console.log('Appointment denied successfully', response);
                // Emit a Socket.io event to notify the client about the status change
                socket.emit('appointmentStatusChanged', { appointmentId, status: 'Denied' });
            })
            .catch(error => {
                console.error('Error denying appointment', error);
            });
    };



    return (
        <>
            <div className="upcoming-wrapper">
                <p>Appointments</p>
    
                <div className="request-table-appointment">
                    <table className="appointment-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr
                                    key={appointment._id}
                                    className={
                                        appointment.status === 'Accepted'? 'accepted-row': appointment.status === 'Denied'? 'denied-row': ''}>
                                    
                                    <td>{appointment.name}</td>
                                    <td>{appointment.appointmentDate}</td>
                                    <td>{appointment.appointmentTime}</td>
                                    <td>{appointment.status}</td>
                                    <td>
                                        <div className="buttons-req">
                                            <button
                                                onClick={() => handleAcceptAppointment(appointment._id)}
                                                className={appointment.processed ? 'disabled-button' : ''}
                                                disabled={appointment.processed}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleDenyAppointment(appointment._id)}
                                                className={appointment.processed ? 'disabled-button' : ''}
                                                disabled={appointment.processed}
                                            >
                                                Deny
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
                                }
    