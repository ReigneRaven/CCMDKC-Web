import React, { useState } from "react";
import Calendar from 'react-calendar';
import './upcomingdate.css';

export default function UpcomingAppointments() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Function to handle date selection
    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    return (
        <div className="container-date">
            <h1 id="appointment-h1">Upcoming Appointments</h1>
            <div className="upcoming-appointments">
                <div className="calendar-event-container">
                    <div className="calendar-container">
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            // Disable both double arrow buttons for previous and next months
                            prev2Label={null}
                            next2Label={null}
                        />
                    </div>
                    <div className="event-note">
                        <h2>Heads Up! Your Upcoming Appointment is on:</h2>
                        <p>{selectedDate.toLocaleDateString()}</p> {/* Display selected date */}
                    </div>
                </div>
            </div>
        </div>
    );
}
