import React from 'react'
import Head2 from '../../components/headers/header'
import './announce.css'
import ImgView from '../../components/imgview/imgview'
import ClientAnnounce from '../../assets/announce - Copy.jpg'
import Sidebar from '../patient-page/components/sidebar'
import Header from '../patient-page/components/header'




export default function AnnouncementsPtn(){
    
    return(
        <>
        <div className="announce-page-ptn">
        <Header/>
        <div className="announce-content-ptn">
        <Sidebar/>
        <div className='announcement-container-ptn'>
            <Head2 text="Announcements"/>
            <ImgView src={ClientAnnounce} id="announce-img-ptn"/>
            
        </div>
        </div>
        </div>
        </>
    )

}