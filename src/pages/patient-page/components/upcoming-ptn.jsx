import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpcomingPtn() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage

    if (userId) {
      axios.get(`http://localhost:5000/api/appointments/user/${userId}`)

        .then((response) => {
          setAppointments(response.data);
        })
        .catch((error) => {
          console.error('Error fetching appointments:', error);
        });
    }
  }, []); 

  return (
    <>
      <div className="upcoming-wrapper">
        <p>Upcoming Appointments</p>

        <div className="table-appointment">
          <table className="table-ptn">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.name}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.appointmentTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
