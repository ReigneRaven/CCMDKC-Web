import React, { useState } from 'react';
import Head2 from '../../../components/headers/header';
import '../../../components/headers/header.css';
import './booking.css';
import Button from '../../../components/buttons/button';
import DiaLogo from '../../../components/logo/logo';
import ClientLogo from '../../../assets/ccmdkc-logo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';



export default function Booking() {
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    const [appointmentTime, setAppointmentTime] = useState('');
    const [name, setName] = useState('');
 
    const handleAppointmentDateChange = (appointmentDate) => {
        setAppointmentDate(appointmentDate);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAppointmentTimeChange = (e) => {
        setAppointmentTime(e.target.value);
    };

    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/appointments', {
            name,
            appointmentDate: appointmentDate.toISOString(),
            appointmentTime,
            userId: userId,
        })
        .then(result => {
         console.log(result)
         navigate(`/patient/${userId}`)
        })
        .catch(err => console.log(err))
       
    };

    return (
        <>
            <main>
                <div className='bookingpage'>
                    <div id='booking-logo'><DiaLogo src={ClientLogo} /></div>

                    <div id='booking-form'>
                        <form onSubmit={handleSubmit}>
                            <Head2 text="Book an Appointment"></Head2>
                            <h3>Please enter the details below</h3>
                            <div className="booking-input">
                                <input 
                                    placeholder="Name" 
                                    className="custom-input" 
                                    value={name}
                                    onChange={handleNameChange}
                                    required
                                />
                                <DatePicker
                                    placeholderText="Appointment Date"
                                    className="custom-input custom-datepicker"
                                    selected={appointmentDate}
                                    value={appointmentDate}
                                    onChange={handleAppointmentDateChange}
                                />
                                <input
                                    type="time"
                                    placeholder="Timeslot"
                                    className="custom-input"
                                    value={appointmentTime}
                                    onChange={handleAppointmentTimeChange}
                                />
                            </div>
                            <Button label="Confirm" type="submit" />
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

