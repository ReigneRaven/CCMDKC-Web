import React, { useEffect } from "react";
import './calendar.css'
import {FiChevronLeft} from 'react-icons/fi'
import {FiChevronRight} from 'react-icons/fi'

export default function Calendar() {

        useEffect(() => {
            let date = new Date();
            let currYear = date.getFullYear();
            let currMonth = date.getMonth();
            let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); // Initialize lastDateofMonth here
            
            const currentDate = document.querySelector(".current-date");
            const daysTag = document.querySelector(".days");
            const leftIcon = document.querySelectorAll(".icons span");
    
            const months = ["January", "February", "March", "April", "May",
                "June", "July", "August", "September", "October", "November", "December"];
    
            const renderCalendar = () => {
                let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
                let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
                let lastDateofPrevMonth = new Date(currYear, currMonth, 0).getDate();
                let liTag = "";
            
                for (let i = firstDayofMonth; i > 0; i--) {
                    liTag += `<li class="inactive">${lastDateofPrevMonth - i + 1}</li>`;
                }
            
                for (let i = 1; i <= lastDateofMonth; i++) {
                    let Today = i === date.getDate() && currMonth === new Date().getMonth()
                            && currYear === new Date().getFullYear() ?  "active" : "";
                    liTag += `<li class="${Today}">${i}</li>`;
                }
            
                for (let i = 0; i < 6 - lastDayofMonth; i++) {
                    liTag += `<li class="inactive">${i + 1}</li>`;
                }
            
                currentDate.innerText = `${months[currMonth]} ${currYear}`;
                daysTag.innerHTML = liTag;
            }
            
            renderCalendar();
            
            leftIcon.forEach(icon => {
                icon.addEventListener("click", () => {
                    currMonth = icon.id === "prev" ? (currMonth - 1 + 12) % 12 : (currMonth + 1) % 12;
                    
                    if(currMonth<0 || currMonth>11){
                        date = new Date(currYear, currMonth);
                        currYear = date.getFullYear();
                        currMonth = date.getMonth();
                    }else{
                        date = new Date();
                    }
                    renderCalendar();
                });
            });
        }
    )
    return(
        <>
            <div className="wrapper">
                <header className="cal-head">
                    <p className="current-date" id="mm-yy-calendar">
                        Date
                    </p>
                    <div className="icons">
                        <span className="material-symbols-round" id="prev">
                            <FiChevronLeft/>
                        </span>
                        <span className="material-symbols-round" id="next">
                            <FiChevronRight/>
                        </span>
                    </div>
                </header>
                <div className="calendar">
                    <ul className="weeks">
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </ul>
                    <ul className="days">
                        
                    </ul>
                </div>
            </div>
        </>
    )
}