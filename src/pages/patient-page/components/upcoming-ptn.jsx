import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import Cookies from 'js-cookie';

const socket = socketIOClient('http://localhost:5000');

const UpcomingPtn = () => {
  const [appointments, setAppointments] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [sortBy, setSortBy] = useState('latest'); // "latest" or "oldest"

  useEffect(() => {
    const userId = Cookies.get('userId');

    axios.get(`http://localhost:5000/api/user/${userId}`)
      .then(response => setLoggedInUser(response.data))
      .catch(error => console.error('Error fetching user:', error));

    axios.get(`http://localhost:5000/api/appointments/user/${userId}`)
      .then(response => {
        const formattedAppointments = response.data.map(appointment => {
          const formattedDate = new Date(appointment.appointmentDate).toLocaleDateString('en-US');
          const formattedTime = formatTime(appointment.appointmentTime);

          return {
            ...appointment,
            appointmentDate: formattedDate,
            appointmentTime: formattedTime,
            processed: appointment.status === 'Cancelled' || appointment.status === 'Denied' || appointment.status === 'Accepted',
          };
        });
        setAppointments(formattedAppointments);
      })
      .catch(error => console.error('Error fetching appointments:', error));

    const handleAppointmentStatusChange = (data) => {
      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment._id === data.appointmentId
            ? { ...appointment, status: data.status }
            : appointment
        )
      );
    };

    socket.on('appointmentStatusChanged', handleAppointmentStatusChange);

    return () => {
      socket.off('appointmentStatusChanged', handleAppointmentStatusChange);
      socket.disconnect();
    };
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleCancel = (appointmentId) => {
    const confirmed = window.confirm('Are you sure you want to cancel this appointment?');
    
    if (confirmed) {
      axios.put(`http://localhost:5000/api/appointments/${appointmentId}/cancel`)
        .then(response => {
          const cancelledAppointment = response.data;

          // Update the processed status and keep the original time
          setAppointments(prevAppointments =>
            prevAppointments.map(appointment =>
              appointment._id === cancelledAppointment._id
                ? { ...cancelledAppointment, processed: true, appointmentTime: appointment.appointmentTime }
                : appointment
            )
          );

          socket.emit('appointmentStatusChanged', {
            appointmentId: cancelledAppointment._id,
            status: 'Cancelled',
          });
        })
        .catch(error => {
          console.error('Error cancelling appointment', error);
        });
    }
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortBy === 'latest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });

  const filteredAppointments = sortedAppointments.filter(appointment =>
    appointment.UserName === loggedInUser?.UserName
  );

  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const formattedTime = new Date();
    formattedTime.setHours(hours);
    formattedTime.setMinutes(minutes);
    return formattedTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }

  function isUnder15MinutesBeforeAppointment(appointment) {
    const appointmentDateTime = new Date(`${appointment.appointmentDate} ${appointment.appointmentTime}`);
    const currentDateTime = new Date();
    const timeDifferenceInMinutes = (appointmentDateTime - currentDateTime) / (1000 * 60);
    return timeDifferenceInMinutes <= 15;
  }

  return (
    <div className="upcoming-wrapper">
      <p>Upcoming Appointments</p>

      <div className="sort-dropdown-upcoming">
        <label htmlFor="sort">Sort By:</label>
        <select id="sort" value={sortBy} onChange={handleSortChange}>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div className="table-appointment">
        <table className="table-ptn">
          <thead>
            <tr>
              <th>Username</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Cancellation</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(appointment => {
              const isPendingAndUnder15Minutes = appointment.status === 'Pending' && isUnder15MinutesBeforeAppointment(appointment);

              return (
                <tr
                  key={appointment._id}
                  className={appointment.status === 'Accepted' ? 'accepted' : appointment.status === 'Denied' ? 'denied' : appointment.status === 'Cancelled' ? 'cancelled' : ''}
                >
                  <td>{appointment.UserName}</td>
                  <td>{appointment.service}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.appointmentTime}</td>
                  <td>{appointment.status}</td>
                  <td>
                    {appointment.status === 'Denied' || appointment.status === 'Cancelled' ? (
                      <button 
                        className={`cancel-btn ${appointment.status === 'Denied' ? 'denied-btn' : 'cancelled-btn'}`} 
                        disabled
                      >
                        Cancel
                      </button>
                    ) : (
                      <>
                        {appointment.status === 'Accepted' && isUnder15MinutesBeforeAppointment(appointment) ? (
                          <button 
                            className="cancel-btn accepted-btn" 
                            disabled
                          >
                            Cancel
                          </button>
                        ) : (
                          <button 
                            id={`cancel-btn-ptn-${appointment._id}`} 
                            onClick={() => handleCancel(appointment._id)}
                            className={`cancel-btn ${appointment.status === 'Accepted' ? 'accepted-btn' : ''}`}
                            disabled={isPendingAndUnder15Minutes}
                          >
                            Cancel
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingPtn;
