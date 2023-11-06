import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      <nav style={navbarStyle}>
        <div class="badge bg-secondary" style={leftSideStyle}>STEAMP2P</div>
        <div style={rightSideStyle}>
            <Link to='Order_game' className='btn'>Comprar Juegos</Link>
            <button className='btn'>Vender articulos</button>          
        </div>
      </nav>
      <div style={imageContainerStyle}>
        <img src="https://img.freepik.com/foto-gratis/hombre-traje-neon-sienta-silla-letrero-neon-que-dice-palabra_188544-27011.jpg?w=1380&t=st=1699284554~exp=1699285154~hmac=ec745070e1830124cc08b412a19761594130729253772997f5496942113f15c0" alt="Bienvenido a STEAMP2P" style={imageStyle} />
        <div style={welcomeTextStyle}>Bienvenido a STEAMP2P</div>
      </div>
    </div>
  );
};

const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: 'lightgray',
};

const leftSideStyle = {
  fontSize: '24px',
};

const rightSideStyle = {
  display: 'flex',
};

const imageContainerStyle = {
  position: 'relative',
};

const imageStyle = {
  width: '100%',
  height: 'calc(100vh - 60px)', // Ajusta la altura restando la altura del navbar
};

const welcomeTextStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '24px',
};

export default App;
