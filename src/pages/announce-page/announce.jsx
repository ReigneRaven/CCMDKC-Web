import React from 'react'
import Head2 from '../../components/headers/header'
import '../announce-page/announce.css'
import ImgView from '../../components/imgview/imgview'
import ClientAnnounce from '../../assets/announce - Copy.jpg'
import Sidebar from '../patient-page/components/sidebar'
import Header from '../patient-page/components/header'




export default function Announcements(){

    return(
        <>
        <div className="announce-page">
        <Header/>
        <div className="announce-content">
        <Sidebar/>
        <div className='announcement-container'>
            <Head2 text="Announcements"/>
            <ImgView src={ClientAnnounce} id="announce-img"/>
            
        </div>
        </div>
        </div>
        </>
    )

}