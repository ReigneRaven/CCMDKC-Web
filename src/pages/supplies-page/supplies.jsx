import React, { useEffect } from "react";
import '../supplies-page/supplies.css'
import SuppliesForm from "./components/suppliesForm";
import Header from "../employee-page/components/header";
import Sidebar from "../employee-page/components/sidebar";
import { useSuppliesContext } from "../../Hooks/useSuppliesContext";
import Button from "./components/buttons";

export default function Supplies(){
    const {supplies, dispatch} = useSuppliesContext();

    useEffect(() => {
        const fetchSupplies = async()=> {
        const res = await fetch('api/supplies/');
        const json = await res.json();

        if (res.ok){
            dispatch({type:"SET_STOCKS", payload: json})
        }
    }
        fetchSupplies();
    },[]);

    return(
        <>
         <div className="profile">
            <Header/>
            <div className="content">
            <Sidebar/>
            <div className="supplies-container">
            <h2>Supplies</h2>
            <SuppliesForm/>
            </div>
            </div>
            </div>
        </>
    )
}