import React, { useEffect } from "react";
import '../patientrecord-page/patientrecord.css'
import Header from "../../employee-page/components/header";
import Sidebar from "../../employee-page/components/sidebar";
import PatientRecordForm from "./components/patientrecordForm";
import PatientRecordView from "./components/patientrecordView";



export default function PatientRecord(){

    return(
        <>
         <div className="profile">
            <Header/>
            <div className="content">
            <Sidebar/>
            <div className="patientrecord-container">
            <h2>Patient Record</h2>
            <PatientRecordForm/>
            <PatientRecordView/>
            </div>
            </div>
            </div>
        </>
    )
}
    