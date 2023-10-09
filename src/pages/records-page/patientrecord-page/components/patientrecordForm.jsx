import React, { useState } from 'react';
import axios from 'axios';
import '../patientrecord';
import Button from './button';

export default function PatientRecordForm() {
  const [patientName, setPatientName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [PatientRecord, setPatientRecord] = useState([
    {PatientRecord:''},
  ])

  const handlePatientRecordAdd = () => {
    setPatientRecord([...PatientRecord, {PatientRecord:''}])

  }
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
      
      axios.post('http://localhost:5000/api/records',{
        patientName,
        weight,
        height,
        age,
        sex
      })
      .then(result => console.log(result))
      .catch(err => console.log(err))
    
  };

  return (
    <>
      <form className="create-patientrecord" onSubmit={onSubmit}>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Patient Name"
          className="input-patientrecord"
        />
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight"
          className="input-patientrecord"
        />
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Height"
          className="input-patientrecord"
        />
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          className="input-patientrecord"
        />
        <input
          type="text"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          placeholder="Sex"
          className="input-patientrecord"
        />
        <Button text={'Add'} type="submit" onClick={handlePatientRecordAdd}></Button>
      </form>
    </>
  );
}
