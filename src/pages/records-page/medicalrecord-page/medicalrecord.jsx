import React, { useEffect } from "react";
import '../medicalrecord-page/medicalrecord.css'
import Header from "../../employee-page/components/header";
import Sidebar from "../../employee-page/components/sidebar";
import MedicalRecordForm from "./components/medicalrecordForm";
import MedicalRecordView from "./components/medicalrecordView";

export default function MedicalRecord(){

    return(
        <>
         <div className="profile">
            <Header/>
            <div className="content">
            <Sidebar/>
            <div className="medicalrecord-container">
            <h2>Medical History</h2>
            <MedicalRecordForm/>
            <MedicalRecordView/>
            </div>
            </div>
            </div>
        </>
    )
}
    