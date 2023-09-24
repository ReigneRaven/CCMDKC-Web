import React from "react";
import './currentdiagnosis.css'

export default function CurrentDiagnosis() {

    return(
        <>
        <div className="container-diagnosis">
         <h1 id="dashboard-h1">Current Diagnosis</h1>
            <div className="current-diagnosis">
                <div className="scrollable-container">
                <table className="scrollable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Symptoms</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>08-26-23</td>
                            <td>Fatigue, Frequent Urination, and Back-ache</td>
                        </tr>
                        <tr>
                            <td>08-26-23</td>
                            <td>Fatigue, Frequent Urination, and Back-ache</td>
                        </tr>
                        <tr>
                            <td>08-26-23</td>
                            <td>Fatigue, Frequent Urination, and Back-ache</td>
                        </tr>
                        <tr>
                            <td>08-26-23</td>
                            <td>Fatigue, Frequent Urination, and Back-ache</td>
                        </tr>
                        <tr>
                            <td>08-26-23</td>
                            <td>Fatigue, Frequent Urination, and Back-ache</td>
                        </tr>
                    </tbody>
                </table>
                </div>  
            </div>
            </div>
        </>
    )
    
}