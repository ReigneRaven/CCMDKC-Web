import React, { useState } from 'react';
import Head2 from '../../components/headers/header';
import '../../components/headers/header.css';
import './records.css'
import Button from '../../components/buttons/button';
import DiaLogo from '../../components/logo/logo';
import ClientLogo from '../../assets/ccmdkc-logo.png';
import { useNavigate } from 'react-router-dom';

export default function Records() {
    const navigate = useNavigate(); // Get the navigate function from React Router
  
    const handlePatientRecordClick = () => {
      // Navigate to the patient record page when the button is clicked
      navigate('/admin/patientrecord');
    };
  
    const handleMedicalHistoryClick = () => {
      // Navigate to the medical history page when the button is clicked
      navigate('/medhistory');
    };
  
    return (
      <>
        <main>
          <div className='recordspage'>
            <div id='records-logo'><DiaLogo src={ClientLogo} /></div>
  
            <div id='records-form'>
              <Head2 text="Records Infomation"></Head2>
              <Button label="Patient Record" type="submit" id="patientrecord-btn" onClick={handlePatientRecordClick} />
              <Button label="Medical History" type="submit" id="medhistory-btn" onClick={handleMedicalHistoryClick} />
            </div>
          </div>
        </main>
      </>
    );
  }