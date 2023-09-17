import React from 'react';
import ReactDOM from 'react-dom';

const ModalWrapper = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');
  const modalElement = document.createElement('div');

  React.useEffect(() => {
    modalRoot.appendChild(modalElement);
    return () => {
      modalRoot.removeChild(modalElement);
    };
  }, [modalElement, modalRoot]);

  const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  };

  const cardStyle = {
    width: '1300px', 
    height: '600px', 
    backgroundColor: 'black',
    border: '1px solid #fff', 
    overflowY: 'scroll', 
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  };

  return ReactDOM.createPortal(
    <div style={modalStyle}>
      <div style={cardStyle}>{children}</div>
    </div>,
    modalElement
  );
};

export default ModalWrapper;
