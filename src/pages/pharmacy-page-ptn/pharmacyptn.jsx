import React, { useState, useEffect } from 'react';
import './pharmacyptn.css';
import PtnHeader from "../patient-page/components/header"
import PtnSidebar from "../patient-page/components/sidebar"
import axios from 'axios';
import PharmacyView from './components/pharmacyview';


export default function PharmacyPtn() {


  return (
    <>
        <div className="pharmacy-page-ptn">
        <PtnHeader/>
        <div className="pharmacy-content-ptn">
        <PtnSidebar/>
        <div className='pharmacy-container-ptn'>
            <PharmacyView/>
        </div>
        </div>
        </div>
    </>
  );
}
