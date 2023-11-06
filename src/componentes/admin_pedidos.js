import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../estilos/compradores.css';
import ConfirmationDialog from '../componentes/confirm'; // Importa tu componente de diálogo
import 'bootstrap/dist/css/bootstrap.min.css';

function Compradores() {
  const [compradores, setCompradores] = useState([]);
  const [checked, setChecked] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedBuyOrderId, setSelectedBuyOrderId] = useState(null);
  const [formData, setFormData] = useState({
    Buy_game_name: '',
    Buy_User_name: '',
    Buy_price_game: '',
    Buy_CVU_MP: '',
  });

  const handleCheckClick = (ID_buy_order) => {
    setSelectedBuyOrderId(ID_buy_order);
    setIsConfirmationOpen(true);
  };

  const handleConfirmUpdate = () => {
    axios.post('http://localhost:3000/api/updateBuy', { ID_buy_order: selectedBuyOrderId })
      .then((response) => {
        console.log('Estado actualizado con éxito:', response.data);
        fetchCompradores();
      })
      .catch((error) => {
        console.error('Error al actualizar el estado:', error);
      });
    setIsConfirmationOpen(false);
  };

  const fetchCompradores = () => {
    axios.get('http://localhost:3000/compradores')
      .then((response) => {
        setCompradores(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API:', error);
      });
  };

  useEffect(() => {
    fetchCompradores();
  }, []);

  return (
    <div>
      <h1>Lista de Pedidos</h1>
      <div className="card-body">
        {compradores.map((comprador) => (
          <div key={comprador.id} className="comprador-card comprador-light-bg">
            <img src={comprador.Buy_image_game} className="card-img-top" alt="..." />
            <h2>{comprador.Buy_game_name}</h2>
            <p>Numero orden de compra: {comprador.ID_buy_order}</p>
            <p>Nombre del Usuario: {comprador.Buy_User_name}</p>
            <p>CVU/MP: {comprador.Buy_CVU_MP}</p>
            <p>$: {comprador.Buy_Price_game}</p>
            <button
              className={`check-button ${checked ? 'checked' : ''}`}
              onClick={() => handleCheckClick(comprador.ID_buy_order)}
            >
              {checked ? 'X' : '✓'}
            </button>
          </div>
        ))}
      </div>

      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirmUpdate}
      />
    </div>
  );
}

export default Compradores;
