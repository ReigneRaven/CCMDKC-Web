import React, { useState } from 'react';
import axios from 'axios';
import Button from '../../patientrecord-page/components/button';
import { useParams } from 'react-router-dom';

export default function MedicalRecordForm() {
  const [allergies, setAllergies] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [temperature, setTemperature] = useState('');
  const [surgeries, setSurgeries] = useState('');
  const [patientObjectId, setPatientObjectId] = useState(''); 
  const [MedicalRecord, setMedicalRecord] = useState([
    {MedicalRecord:''},
  ])

  const handleMedicalRecordAdd = () => {
    setMedicalRecord([...MedicalRecord, {MedicalRecord:''}])
  };

  const { id } = useParams();

  const onSubmit = (e) => {
    e.preventDefault(); 

    axios
      .post(`http://localhost:5000/api/records/${patientObjectId}/medical-history`, {
        allergies,
        diagnosis,
        bloodPressure,
        temperature,
        surgeries,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form className="create-medicalrecord" onSubmit={onSubmit}>
        <input
          type="text"
          value={patientObjectId}
          onChange={(e) => setPatientObjectId(e.target.value)}
          placeholder=" Patient ObjectId"
          className="input-medicalrecord"
        />
        <div className="medicalinput-row">
          <input
            type="text"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
            placeholder=" Blood-Pressure"
            className="input-medicalrecord custom-medical"
          />
          <input
            type="text"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder=" Temperature"
            className="input-medicalrecord custom-medical"
          />
        </div>
        <input
          type="text"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          placeholder=" Allergies"
          className="input-medicalrecord"
        />
        <input
          type="text"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder=" Diagnosis"
          className="input-medicalrecord"
        />
        <input
          type="text"
          value={surgeries}
          onChange={(e) => setSurgeries(e.target.value)}
          placeholder=" Surgeries"
          className="input-medicalrecord"
        />
        <Button text={'Add'} type="submit" onClick={handleMedicalRecordAdd}></Button>
      </form>
    </>
  );
}