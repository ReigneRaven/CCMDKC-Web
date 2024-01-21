import React, { useState, useEffect } from 'react';
import Head2 from '../../components/headers/header';
import './pharmacyptn.css';
import PtnHeader from "../patient-page/components/header"
import PtnSidebar from "../patient-page/components/sidebar"
import axios from 'axios';


export default function PharmacyPtn() {


  return (
    <>
        <div className="pharmacy-page-ptn">
        <PtnHeader/>
        <div className="pharmacy-content-ptn">
        <PtnSidebar/>
        <div className='pharmacy-container-ptn'>
            <Head2 text="PHARMACY" id="pharmacy-header"></Head2>
        </div>
        </div>
        </div>
    </>
  );
}
