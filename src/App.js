import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Order_game from './componentes/order_game';
import AdminPage from './componentes/admin_pedidos';
import Checkgame from './componentes/check_out_game';
import Ticket from './componentes/ticket_state';
import Home from './componentes/home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/check" element={<Checkgame />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/order_game" element={<Order_game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
