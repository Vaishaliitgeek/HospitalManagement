import React, { useEffect } from 'react';
import './Modal.css'; // Create this file for the modal-specific styles

const Modal = ({ message, type, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-close the modal after 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [show, onClose]);

  if (!show) return null; // Don't render the modal if not visible

  return (
    <div className={`modal ${type === 'success' ? 'modal-success' : 'modal-error'}`}>
      <p>{message}</p>
    </div>
  );
};

export default Modal;
