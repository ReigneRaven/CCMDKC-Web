import React from "react";
import Header from "../employee-page/components/header";
import Sidebar from "../employee-page/components/sidebar";
import SuppliesForm from "./components/suppliesForm";
import SuppliesView from "./components/suppliesView";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Supplies() {
    return (
        <>
            <div className="profile">
                <Header />
                <div className="content">
                    <Sidebar />
                    <div className="supplies-container">
                        <div className="supplies-row">
                            <SuppliesForm className="supplies-form" />
                            <SuppliesView className="supplies-view" />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
