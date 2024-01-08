import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head2 from '../../components/headers/header';
import '../../components/headers/header.css';
import './appointment.css';
import Button from '../../components/buttons/button';
import DiaLogo from '../../components/logo/logo';
import DatePicker from 'react-datepicker';

import Consult from '../../assets/consult.png';
import { useNavigate, useParams } from 'react-router-dom';

export default function Appointment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [UserName, setUserName] = useState('');
  const [appointments, setAppointments] = useState('')
  const [selectedService, setSelectedService] = useState('');

  const handleAppointmentDateChange = (appointmentDate) => {
    setAppointmentDate(appointmentDate);
};

  const handleAppointmentTimeChange = (e) => {
   setAppointmentTime(e.target.value);
};

  const handleNameChange = (e) => {
    setUserName(e.target.value);
};

const handleServiceChange = (e) => {
  setSelectedService(e.target.value);
};


  useEffect(() => {
    // Retrieve user ID from localStorage
    const userId = localStorage.getItem('userId');

    if (userId) {
      axios
        .get(`http://localhost:5000/api/user/${userId}`)
        .then((result) => setUser(result.data))
        .catch((err) => console.log(err));
    }
  }, []); 

  // const handleClick = () => {
  //   if (user) {
  //     navigate(`/confirmation/${user._id}`);
  //   }
  // };

  const userId = localStorage.getItem('userId');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/appointments', {
        service: selectedService,
        UserName,
        appointmentDate: appointmentDate.toISOString(),
        appointmentTime,
        userId: userId,
    })
    .then(result => {
        console.log(result);
        axios.get(`http://localhost:5000/api/appointments/user/${userId}`)
            .then((response) => {
                const formattedAppointments = response.data.map(appointment => {
                    const formattedDate = new Date(appointment.appointmentDate).toLocaleDateString('en-US');
                    return {
                        ...appointment,
                        appointmentDate: formattedDate
                    };
                });
                setAppointments(formattedAppointments);
                navigate(`/patient/${userId}`);
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .catch(err => console.log(err));
};
  return (
    <>
      <main>
        <div className="servicespage">
          <div id="services-logo">
            <DiaLogo src={Consult} />
          </div>
          
          <form onSubmit={handleSubmit}>
          <div id="services-form">
            <div id="services-book">
              <div className="services-info">
                <Head2 text="Book an Appointment" />
                {/* <h3>Operating Hours</h3>  */}
              </div>

            <div className="appoint-deets">
            
            <div className="service-option">
            <label for="services-select" id='label-serv'>Choose a Service<span className='aster-serv'>*</span></label>
            <select name="services" id="services-select" onChange={handleServiceChange}>
               <option value="nephro">Nephrology Consultation</option>               
               <option value="obgyn">OB-GYN Consultation</option>               
               <option value="lab">Laboratory</option>                              
            </select>
            </div>

          <p id="enter-deets">Appointment details:</p>
          
            <input 
              placeholder="Username" 
              id="custom-name" 
              value={UserName}
              onChange={handleNameChange}
              required
              />
            
            <div className="deetsrow2">
              <DatePicker
                placeholderText="Appointment Date"
                className="custom-booking custom-datepicker"
                selected={appointmentDate}
                value={appointmentDate}
                onChange={handleAppointmentDateChange}
                id='appoint-date'
                required
                />
              <input
              type="time"
              placeholder="Timeslot"
              className="custom-booking"
              value={appointmentTime}
              onChange={handleAppointmentTimeChange}
              id='appoint-time'
              required
              />
            </div>
          </div>
            
            <div className="deets-btn">
            <Button label="Book" type="submit"/>
            </div>
          </div>
        </div>
        </form>
      </div>
      
      </main>
    </>
  );
}
