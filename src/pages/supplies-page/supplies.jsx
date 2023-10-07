import React, { useEffect } from "react";
import '../supplies-page/supplies.css'
import SuppliesForm from "./components/suppliesForm";
import Header from "../employee-page/components/header";
import Sidebar from "../employee-page/components/sidebar";
import SuppliesView from "./components/suppliesView";



export default function Supplies(){

    return(
        <>
         <div className="profile">
            <Header/>
            <div className="content">
            <Sidebar/>
            <div className="supplies-container">
            <h2>Supplies</h2>
            <SuppliesForm/>
            <SuppliesView/>
            </div>
            </div>
            </div>
        </>
    )
}
    