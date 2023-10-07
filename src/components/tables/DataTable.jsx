import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import MedicalDetails from '../modals/modal';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    // Use Axios to fetch data from your backend API
    axios.get('/api/records/medical-history')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const openModal = (rowData) => {
    setSelectedRow(rowData);
  };

  const closeModal = () => {
    setSelectedRow(null);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.description}</td>
              {/* Add more table data cells as needed */}
              <td>
                <button onClick={() => openModal(row)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRow && (
        <MedicalDetails data={selectedRow} onClose={closeModal} />
      )}
    </div>
  );
};

export default DataTable;