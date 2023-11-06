import React from 'react';
import Modal from 'react-modal';
import '../estilos/confirm.css'; // Importa un archivo CSS personalizado para los estilos


const ConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="confirmation-modal" // Aplica una clase de CSS para personalizar el estilo del modal
      overlayClassName="confirmation-overlay" // Aplica una clase de CSS para personalizar el estilo del fondo del modal
      ariaHideApp={false}
    >
      <h2 id='confirmar-button'>¿Seguro que ya completo el pedido?</h2>
      <div className="button-container">
        <button className="confirm-button" onClick={onConfirm}>Sí</button>
        <button className="cancel-button" onClick={onClose}>No</button>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
