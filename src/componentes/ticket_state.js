import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TicketComponent() {
  // Estado local para almacenar el número de ticket y la respuesta de la solicitud
  const [ticketNumber, setTicketNumber] = useState('');
  const [buyOrderInfo, setBuyOrderInfo] = useState(null); // Almacenar la información de la orden

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realiza la solicitud GET
    try {
      const response = await fetch(`http://localhost:3000/api/usuario/${ticketNumber}`);
      if (response.ok) {
        const data = await response.json();

        // Asumiendo que data es un arreglo y quieres mostrar el primer elemento
        if (data.length > 0) {
          const firstOrder = data[0];
          setBuyOrderInfo(firstOrder); // Almacenar la información de la orden
        } else {
          setBuyOrderInfo(null); // Restablecer el estado si no hay datos
        }
      } else {
        setBuyOrderInfo(null); // Restablecer el estado si hay un error
      }
    } catch (error) {
      setBuyOrderInfo(null); // Restablecer el estado en caso de error
    }
  };

  return (
    <div className='container mt-4'>
      <h1>Ticket state</h1>
      <form className="row gy-2 gx-3 align-items-center" onSubmit={handleSubmit}>
        <div className="col-auto">
          <label className="visually-hidden" htmlFor="autoSizingInput">Name</label>
          <input
            type="text"
            className="form-control"
            id="autoSizingInput"
            placeholder="Su numero de ticket"
            value={ticketNumber}
            onChange={(e) => setTicketNumber(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">Buscar</button>
        </div>
      </form>
      {buyOrderInfo && (
        <div className='mt-4'>
          <p className="fw-lighter">Numero de ticket: {buyOrderInfo.ID_buy_order}</p>
          <p className="fw-lighter">Nombre del juego: {buyOrderInfo.Buy_game_name}</p>
          <p className="fw-lighter">Usuario: {buyOrderInfo.Buy_User_name}</p>
          <p className="fw-lighter">
            Estado: {(() => {
                switch (buyOrderInfo.Buy_state) {
                case 1:
                    return 'No se realizo pago';
                case 2:
                    return 'Procesando';
                case 3:
                    return 'Completado';
                default:
                    return 'Estado desconocido';
                }
            })()}
            </p>
          {/* Agrega más información aquí según tus necesidades */}
        </div>
      )}
    </div>
  );
}

export default TicketComponent;
