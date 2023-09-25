import React from "react";
import './currentdiagnosis.css'

export default function CurrentDiagnosis() {

    return(
        <>
        <div className="container-diagnosis">
         <h1 id="diagnosis-h1">Current Diagnosis</h1>
            <div className="current-diagnosis">
                <div className="diagnosis">
                    <li>Severe Asthma</li>
                </div>
            </div>
            <div className="possible-treatment">
            <h1 id="treatment-h1">First-Aid Treatment</h1>
                <div className="treatment">
                    <li>Sitting upright can help keep your airways open. Be sure to avoid lying down while you’re having an asthma attack, as this can make symptoms worse.</li>
                    <li>Try to remain as calm as you can while you’re having an asthma attack. Panic and stress can also worsen your symptoms.</li>
                </div>
            </div>
            </div>
        </>
    )
    
}