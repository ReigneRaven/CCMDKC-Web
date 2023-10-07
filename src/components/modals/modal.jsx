import React from 'react';

const MedicalDetails = ({ data, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Medical History Details</h2>
        <p>{data.description}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default MedicalDetails;