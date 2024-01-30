import React, { useEffect, useState } from "react";
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import '../employee.css';

const socket = socketIOClient('http://localhost:5000');

export default function Request() {
    const [appointments, setAppointments] = useState([]);
    const [sortBy, setSortBy] = useState("latest"); // "latest" or "oldest"

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/appointments');
                const formattedAppointments = response.data.map(appointment => {
                    const formattedDate = new Date(appointment.appointmentDate).toISOString().split('T')[0];

                    return {
                        ...appointment,
                        appointmentDate: formattedDate,
                        processed: appointment.status === 'Accepted' || appointment.status === 'Denied',
                        createdAt: new Date(appointment.createdAt).getTime(),
                    };
                });
                setAppointments(formattedAppointments);
                localStorage.setItem('formattedAppointments', JSON.stringify(formattedAppointments));
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchAppointments();

        socket.on('appointmentStatusChanged', (data) => {
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment._id === data.appointmentId
                        ? { ...appointment, status: data.status }
                        : appointment
                )
            );
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const sortedAppointments = appointments.slice().sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return sortBy === "latest" ? dateB - dateA : dateA - dateB;
    });

    const handleAcceptAppointment = (appointmentId) => {
        axios.put(`http://localhost:5000/api/appointments/${appointmentId}/status`,
            { status: 'Accepted' })
            .then(response => {
                const updatedAppointment = response.data;
                updatedAppointment.processed = true;

                setAppointments(prevAppointments =>
                    prevAppointments.map(appointment =>
                        appointment._id === updatedAppointment._id ? updatedAppointment : appointment
                    ));
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
                const deniedAppointment = response.data;
                deniedAppointment.processed = true;

                setAppointments(prevAppointments =>
                    prevAppointments.map(appointment =>
                        appointment._id === deniedAppointment._id ? deniedAppointment : appointment
                    ));
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
                    <div className="sort-dropdown-appointment-adm">
                        <label htmlFor="sort">Sort By:</label>
                        <select id="sort" value={sortBy} onChange={handleSortChange}>
                            <option value="latest">Latest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>

                    <table className="appointment-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Service</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAppointments.map((appointment) => (
                                <tr
                                    key={appointment._id}
                                    className={
                                        appointment.status === 'Accepted' ? 'accepted-row' : appointment.status === 'Denied' ? 'denied-row' : ''
                                    }>
                                    <td>{appointment.UserName}</td>
                                    <td>{appointment.service}</td>
                                    <td>{new Date(appointment.appointmentDate).toLocaleDateString('en-US')}</td>
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
