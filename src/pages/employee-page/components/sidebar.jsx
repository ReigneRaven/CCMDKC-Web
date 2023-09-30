import React from "react";
import { Link } from "react-router-dom";
import {LuLayoutDashboard} from 'react-icons/lu'
import {MdMedicalServices, MdOutlineAnnouncement} from 'react-icons/md'


export default function Sidebar(){
    return(
        <>
                <div className="sidenav">
                    <ul>
                    <Link to="/admin" className="link-div"><LuLayoutDashboard/>&nbsp;Dashboard</Link>

                    <Link to="/admin/supplies" className="link-div"><MdMedicalServices/>&nbsp;Supplies</Link>
    
                    <Link to="/admin/announcements" className="link-div" id="announce-link"><MdOutlineAnnouncement/>&nbsp;Announcements</Link>
                        
                    </ul>
                </div>
        </>
    )
}