import React from 'react'
import Head2 from '../../components/headers/header'
import '../announce-page/announcement.css'
import ImgView from '../../components/imgview/imgview'
import ClientAnnounce from '../../assets/announce.jpg'

export default function Announcements(){

    return(
        <>
        
        <div className='announcement-container'>
            <Head2 text="Announcements"/>
            <ImgView src={ClientAnnounce}/>
        </div>
        
        </>
    )

}