import React from 'react';
import './RemoveRowAlert.css'; 

const RemoveRowAlert = ({ message, onClose }) => {
  return (
    <div className="centered-alert">
      <div className="alert-contentt">
        <p>{message}</p>
        <button className='removealertclose' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RemoveRowAlert;