import React from 'react'
import './myprofile.css'
import Profile from '../../assets/profile.png'


export default function MyProfile(){

    return(
        <>
        <div className="patient-profile">
            <img src = {Profile}/>
            <div className="patient-details">
                <p className="ptn-name">Name</p>
                <p className="ptn-number">+82 2-6240-9800</p>
                <p className="ptn-email">yeol614@gmail.com</p>
            </div>
        </div>

        <div className="patient-info">

        </div>
        </>
    )

}