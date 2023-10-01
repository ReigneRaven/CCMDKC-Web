import React, { useState } from 'react';
import Head2 from '../../../components/headers/header';
import '../../../components/headers/header.css';
import './booking.css';
import Button from '../../../components/buttons/button';
import DiaLogo from '../../../components/logo/logo';
import ClientLogo from '../../../assets/ccmdkc-logo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Booking() {
    const [birthdate, setBirthdate] = useState(new Date());
    const [timeslot, setTimeslot] = useState('');

    const handleBirthdateChange = (date) => {
        setBirthdate(date);
    };

    const handleTimeslotChange = (e) => {
        setTimeslot(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                                <input placeholder="Name" className="custom-input" required />
                                <DatePicker
                                    placeholderText="Birthdate"
                                    className="custom-input custom-datepicker"
                                    selected={birthdate}
                                    onChange={handleBirthdateChange}
                                />
                                <input
                                    type="time"
                                    placeholder="Timeslot"
                                    className="custom-input"
                                    value={timeslot}
                                    onChange={handleTimeslotChange}
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
