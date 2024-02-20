import React from "react";
import '../reports-page/reports.css';
import Header from "../employee-page/components/header";
import Sidebar from "../employee-page/components/sidebar";
import ReportsForm from "./components/reportsform";



export default function Reports() {
    return (
        <>
            <div className="profile">
                <Header />
                <div className="content">
                    <Sidebar />
                    <div className="reports-container">
                       <p id="reports-title">Reports</p>
                      <ReportsForm/>
                    </div>
                </div>
            </div>
        </>
    );
}
