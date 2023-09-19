import React from 'react'
import './land-pg.css'
import Head2 from '../../components/headers/header'
import '../../components/headers/header.css'
import InputField from '../../components/textfield/textfield'
import Button from '../../components/buttons/button'
import DiaLogo from '../../components/logo/logo'
import ClientLogo from '../../assets/ccmdkc-logo.png'
import ClientBuilding from '../../assets/ccmdkc-bldg.png'
import {Link, useNavigate} from 'react-router-dom'

export default function Landing (){

    const navigate = useNavigate()

    function handleClick (){
        navigate("/patient")
    }

    return(
    <>
    <main>
        <div className='homepage'>
            <div id='home-pic'><DiaLogo src={ClientBuilding}/></div>
        
        <div id='home-form'>
            <form>
                <div id='home-logo'><DiaLogo src={ClientLogo}/></div>
                <Head2 text="Sign in"></Head2>
                <InputField placeholder=" Username" className="user-input"/>
                <InputField placeholder=" Password" className="user-input"/>
            <div className="check-password">
                <label className="checkbox"><input type="checkbox" />&nbsp;Remember&nbsp;me</label>
                <Link to='/forgotpassword'><p>&nbsp;Forgot Password?</p></Link>
            </div>
                <Button label="Login" onClick={(e) => handleClick()}/>
            </form>
            <div id='home-reg'>
                <p>Don't have an account?&nbsp;</p>
                <Link to='/register'>Sign up</Link>
            </div>
        </div>
        </div>
    </main>
    </>
    )
}