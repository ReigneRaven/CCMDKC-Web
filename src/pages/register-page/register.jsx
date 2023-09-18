import React from "react";
import './register.css'
import Head2 from '../../components/headers/header'
import '../../components/headers/header.css'
import InputField from '../../components/textfield/textfield'
import Button from '../../components/buttons/button'
import DiaLogo from '../../components/logo/logo'
import ClientLogo from '../../assets/ccmdkc-logo.png'
import {Link} from 'react-router-dom'

export default function Register (){
    
    return (
        <>
        <main>
            <div className='registerpage'>
                <div id='register-logo'><DiaLogo src={ClientLogo}/></div>
        
            <div id='register-form'>
                <form>
                    <Head2 text="Register"></Head2>
                    <InputField placeholder=" Name" className="user-input"/>
                <div className="form1">
                    <InputField placeholder=" Birthdate" className="user-input"/>
                    <InputField placeholder=" Sex" className="user-input"/>
                </div>
                    <InputField placeholder=" Address" className="user-input"/>
                    <InputField placeholder=" Contact No." className="user-input"/>
                    <InputField placeholder=" Email" className="user-input"/>
                    <InputField placeholder=" Password" className="user-input"/>
                <div className="terms"> 
                    <Link to='/t&c'><p>Terms of Use and Privacy Policy</p></Link>
                </div>
                    <Button label="Login"/>
                </form>
            </div>
            </div>
        </main>
        </>
    )
}