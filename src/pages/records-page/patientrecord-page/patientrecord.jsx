import React from "react";
import '../patientrecord-page/patientrecord.css';
import Header from "../../employee-page/components/header";
import Sidebar from "../../employee-page/components/sidebar";
import PatientRecordForm from "./components/patientrecordForm";
import PatientRecordView from "./components/patientrecordView";
import MedicalRecordForm from "./components/medicalrecordForm";

export default function PatientRecord() {
    return (
        <>
            <div className="profile">
                <Header />
                <div className="content">
                    <Sidebar />
                    <div className="patientrecord-container">
                        <div className="forms-container column">
                            <div className="patientform">
                                <PatientRecordForm />
                                <MedicalRecordForm />
                            </div>
                            <div className="patientview"> {/* New container for PatientRecordView */}
                                <PatientRecordView />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
