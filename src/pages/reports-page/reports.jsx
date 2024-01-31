import React from "react";
import '../reports-page/reports.css';
import Header from "../employee-page/components/header";
import Sidebar from "../employee-page/components/sidebar";
import Head2 from "../../components/headers/header";

export default function Reports() {
    return (
        <>
            <div className="profile">
                <Header />
                <div className="content">
                    <Sidebar />
                    <div className="reports-container">
                        <Head2 text="Reports Management" id="reports-header" />
                    </div>
                </div>
            </div>
        </>
    );
}
