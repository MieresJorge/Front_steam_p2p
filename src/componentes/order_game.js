import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AgregarComprador({ handleAddComprador }) {
  const [formData, setFormData] = useState({
    Buy_game_name: '',
    Buy_User_name: '',
    Buy_email: '',
  });

  const [orderId, setOrderId] = useState(null);
  const [visualized, setVisualized] = useState(false);
  const [visualizeResult, setVisualizeResult] = useState(null);
  const [visualizeResult2, setVisualizeResult2] = useState(null);
  const [visualizeResult3, namevisualize] = useState(null);
  const [visualizeResult4, imurl] = useState(null);
  const [visible, setVisible] = useState(false); // Define 'visible' state
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowDetails = (visible) => {
    if (visible === 1) {
      setVisible(true);
    }
  };

  const handleVisualizeClick = async (e) => {
    e.preventDefault();
    setIsButtonLoading(true); // Activa el estado de carga del botón
  
    try {
      const response = await axios.post('http://localhost:3000/api/getInfoGame', {
        buy_Game_Name: formData.Buy_game_name
      });
  
      if (response.status === 200) {
        handleShowDetails(1)
        console.log('Respuesta del endpoint:', response.data.taxIncludedPrice);
        setVisualizeResult(response.data.taxIncludedPrice);
        setVisualizeResult2(response.data.appPrice);
        namevisualize(response.data.appName);
        imurl(response.data.imgname);
        setVisualized(true);
      } else {
        console.error('La solicitud no fue exitosa.');
      }
    } catch (error) {
      console.error('Error al visualizar compra:', error);
      window.alert('Por favor ingresar url de juego que desea visualizar');
    } finally {
      setIsButtonLoading(false); // Desactiva el estado de carga del botón, independientemente del resultado
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/pedidos', formData);

      if (response.status === 201) {
        console.log('Pedido agregado con éxito');
        const orderId = response.data.insertedId;
        setOrderId(orderId);
        handleAddComprador(formData);
        const responsemail = await axios.post('http://localhost:3000/api/sendMail', {
          ID_buy_order: orderId, // Puedes pasar el número de ticket u otros datos necesarios aquí
          Buy_game_name: formData.Buy_game_name,
          Buy_Price_game: visualizeResult, // Ajusta esto según la lógica de tu aplicación
          Buy_email: formData.Buy_email
        });
        if (responsemail ===201)
        console.log("m")
      } else {
        console.error('Error al agregar el pedido');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className='display-3'>Encargar Juego</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group mt-2">
              <label id='titles' htmlFor="Buy_game_name">url del juego en la tienda de Steam</label>
              <input
                type="text"
                name="Buy_game_name"
                className="form-control mt-2"
                placeholder="https://store.steampowered.com/app/686810/Hell_Let_Loose"
                value={formData.Buy_game_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mt-2">
              <label id='titles' htmlFor="Buy_User_name">Nombre de usuario en Steam</label>
              <input
                type="text"
                name="Buy_User_name"
                className="form-control"
                placeholder="CAI141"
                value={formData.Buy_User_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mt-2">
              <label id='titles' htmlFor="Buy_email">Correo Electronico</label>
              <input
                type="text"
                name="Buy_email"
                className="form-control"
                placeholder="usuario@gmail.com"
                value={formData.Buy_email}
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-2"
              onClick={handleVisualizeClick}
              disabled={isButtonLoading} // Deshabilita el botón mientras está en estado de carga
            >
              {isButtonLoading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                  <span role="status"> Loading...</span>
                </button>
              ) : (
                'Visualizar'
              )}
            </button>



            {visible && (
              <div className="card mt-2" >
                <img src={visualizeResult4} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{visualizeResult3}</h5>
                  {visualizeResult2 && (
                    <p className='alert alert-danger mt-2'>Valor juego en Steam: $ {visualizeResult2}<br></br> Valor del juego con impuestos Pais ${visualizeResult2 * 2}</p>
                  )}
                  {visualizeResult && (
                    <p className='alert alert-success mt-2'>Usted pagara por el juego: $ {visualizeResult}</p>
                  )}
                  <button
                    type="submit"
                    className="btn btn-success mt-2"
                    disabled={!visualized}>Comprar</button>
                </div>
              </div>
            )}
            <br></br>
          </form>
          {orderId && (
            <div class="alert alert-success" role="alert">
            Su numero de ticket es: {orderId}
            </div>
          )}

          <Link to="/admin" className="btn btn-secondary mt-3">
            Ir a la página de administración de prueba
          </Link>
          <br></br>
          <Link to="/check" className="btn btn-secondary mt-3">
            CheckOUt
          </Link>
          <br></br>
          <Link to="/ticket" className="btn btn-secondary mt-3">
            Ticket
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AgregarComprador;
