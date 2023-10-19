import React, { useEffect } from "react";
import '../medicalhistory-page/healthhistory.css'
import Header from "../patient-page/components/header";
import Sidebar from "../patient-page/components/sidebar";
import HistoryModalPtn from "./components/history-tablemodal";
import HistoryTablePtn from "./components/history-tableview";

export default function MedicalRecord(){

    return(
        <>
         <div className="profile">
            <Header/>
            <div className="content">
            <Sidebar/>
            <div className="medicalrecord-container">
            <h2>Medical History</h2>
            <HistoryTablePtn/>

            </div>
            </div>
            </div>
        </>
    )
}
    