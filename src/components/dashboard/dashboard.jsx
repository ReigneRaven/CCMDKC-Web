import React from "react";
import './dashboard.css'
import MedicalHistory from "../../components/tables/medhistory"

const Dashboard = () => {
    return (
        <>
        <div className="dash-container">
            <MedicalHistory/>
        </div>
        </>
    )
};
export default Dashboard;