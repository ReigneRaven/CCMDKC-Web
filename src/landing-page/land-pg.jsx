import React from 'react'
import '../landing-page/land-pg.css'
import Head2 from '../components/headers/header'
import '../components/headers/header.css'
import InputField from '../components/textfield/textfield'
import Button from '../components/buttons/button'
import DiaLogo from '../components/logo/logo'
import ClientLogo from '../assets/ccmdkc-logo.png'
import {Link} from 'react-router-dom'

export default function Landing (){
    return(
    <>
    <main>
        
        <div className='homepage'>
        <div id='home-logo'><DiaLogo src={ClientLogo}/></div>
    
        <div id='home-form'>
        <form>
        <Head2 text="Sign in"></Head2>
        <InputField placeholder="Username"/>
        <InputField placeholder="Password"/>
        <Button label="Login"/>
        </form>
        <Link to='/register'><p>Don't have an account?</p></Link> {/* not functioning yet bc there is no /register page ata */}
        </div>
        </div>
    </main>
    </>
    )
}