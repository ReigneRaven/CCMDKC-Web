import React, { useState } from 'react';
import Head2 from '../../components/headers/header';
import '../../components/headers/header.css';
import './services.css'
import Button from '../../components/buttons/button';
import DiaLogo from '../../components/logo/logo';
import ClientLogo from '../../assets/ccmdkc-logo.png';
import ServicesIcon from '../../assets/services.jpg';
import { Link, useNavigate } from 'react-router-dom';

export default function Services() {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/booking');
    };

    return (
        <>
            <main>
                <div className='servicespage'>
                    <div id='services-logo'><DiaLogo src={ClientLogo} /></div>

                    <div id='services-form'>
                    <div id='services-icon'><img src={ServicesIcon} /></div>
                            
                            <div className="services-info">
                                <Head2 text="Consultation Hours"></Head2>
                                <h3>1:00PM-4:00PM</h3>
                            </div>
                            <Button label="Book" type="submit" onClick={(e) => handleClick()} /> 
                    </div>
                </div>
            </main>
        </>
    );
}