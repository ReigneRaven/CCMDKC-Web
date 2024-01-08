import React, { useState } from 'react';
import Head2 from '../../../components/headers/header';
import '../../../components/headers/header.css';
import './booking.css';
import Button from '../../../components/buttons/button';
import DiaLogo from '../../../components/logo/logo';
import ClientLogo from '../../../assets/ccmdkc-logo.png';
import { useLocation } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'; 




export default function Booking() {
    const location = useLocation();
    const { state } = location;
    
    const { service, UserName, appointmentDate, appointmentTime } = state;
    return (
        <>
            <main>
                <div className='bookingpage'>
                    <div id='booking-logo'><DiaLogo src={ClientLogo} /></div>

                    <div id='booking-form'>
                      <Head2 text="Appointment Confirmation"></Head2>

                      <p>Service: {service}</p>
                      <p>User Name: {UserName}</p>
                      <p>Appointment Date: {appointmentDate}</p>
                      <p>Appointment Time: {appointmentTime}</p>
                    
                    
                    </div>
                </div>
            </main>
        </>
    );
}

