import React from 'react'
import Head2 from '../../components/headers/header'
import './announce-admn.css'
// import ImgView from '../../components/imgview/imgview'
// import ClientAnnounce from '../../assets/announce - Copy.jpg'
import Sidebar from '../employee-page/components/sidebar'
import Header from '../employee-page/components/header'
import BulletinFormAdm from './components/bulletinform-adm'
import BulletinViewAdm from './components/bulletinview-adm'




export default function AnnouncementsAmn(){
    
    return(
        <>
        <div className="announce-page-amn">
        <Header/>
        <div className="announce-content-amn">
        <Sidebar/>
        <div className='announcement-container-amn'>
            <Head2 text="Bulletin" id="bulletin-header"/>
            <BulletinFormAdm className="bulletin-form-adm" />
            <BulletinViewAdm/>
        </div>
        </div>
        </div>
        </>
    )

}