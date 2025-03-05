import React from 'react';
import { Trash2, X } from 'lucide-react';

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: 'white',
    //   borderRadius: '8px',
      padding: '20px',
      width: '350px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: '#d32f2f',
      fontWeight: '600',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#666',
    },
    content: {
      marginBottom: '20px',
      color: '#333',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
    },
    cancelButton: {
      padding: '8px 16px',
      border: '1px solid #ccc',
      background: 'none',
      cursor: 'pointer',
    },
    confirmButton: {
      padding: '8px 16px',
      border: 'none',
      backgroundColor: '#d32f2f',
      color: 'white',
      cursor: 'pointer',
    },
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.header}>
          <div style={modalStyles.title}>
            <Trash2 size={20} />
            Delete Node
          </div>
          <button 
            style={modalStyles.closeButton}
            onClick={onCancel}
          >
            <X size={20} />
          </button>
        </div>
        
        <div style={modalStyles.content}>
          Are you sure you want to delete this node? 
          This action cannot be undone.
        </div>
        
        <div style={modalStyles.buttonContainer}>
          <button 
            style={modalStyles.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            style={modalStyles.confirmButton}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;