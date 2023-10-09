import React, { useState } from 'react';
import axios from 'axios';
import '../medicalrecord';
import Button from './button';

export default function MedicalRecordForm() {
  const [allergies, setAllergies] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [temperature, setTemperature] = useState('');
  const [surgeries, setSurgeries] = useState('');
  const [MedicalRecord, setMedicalRecord] = useState([
    {MedicalRecord:''},
  ])

  const handleMedicalRecordAdd = () => {
    setMedicalRecord([...MedicalRecord, {MedicalRecord:''}])

  }
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
      
      axios.put('http://localhost:5000/api/user/:id/medical-history',{
        allergies,
        diagnosis,
        bloodPressure,
        temperature,
        surgeries
      })
      .then(result => console.log(result))
      .catch(err => console.log(err))
    
  };

  return (
    <>
      <form className="create-medicalrecord" onSubmit={onSubmit}>
        <input
          type="text"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          placeholder="Allergies"
          className="input-medicalrecord"
        />
        <input
          type="text"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Diagnosis"
          className="input-medicalrecord"
        />
        <input
          type="text"
          value={bloodPressure}
          onChange={(e) => setBloodPressure(e.target.value)}
          placeholder="Blood-Pressure"
          className="input-medicalrecord"
        />
        <input
          type="text"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          placeholder="Temperature"
          className="input-medicalrecord"
        />
        <input
          type="text"
          value={surgeries}
          onChange={(e) => setSurgeries(e.target.value)}
          placeholder="Surgeries"
          className="input-medicalrecord"
        />
        <Button text={'Add'} type="submit" onClick={handleMedicalRecordAdd}></Button>
      </form>
    </>
  );
}
