import React from 'react';
import './casehistory.css'; // You can add your CSS styles here
import DataTable from '../../components/tables/DataTable';


function CaseHistory() {
  return (
    <div className="casehistory-details">
      <DataTable />
    </div>
  );
}

export default CaseHistory;