import React, { useState } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [paymentLink, setPaymentLink] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        'https://api.mercadopago.com/checkout/preferences',
        {
          items: [
            {
              title: 'Age of empire IV',
              unit_price: 100.0,
              quantity: 1,
            },
          ],
        },
        {
          headers: {
            Authorization: 'Bearer TEST-1647540674745499-110421-6189ed7b09c340691e30e5c2bbb7f639-1535418603',
          },
        }
      );

      setPaymentLink(response.data.init_point);
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }
  };

  return (
    <div>
      <h1>Realizar Pago con Mercado Pago</h1>
      <button onClick={handlePayment}>Realizar Pago</button>
      {paymentLink && (
        <a href={paymentLink} target="_blank" rel="noopener noreferrer">
          Ir al proceso de pago
        </a>
      )}
    </div>
  );
};

export default Checkout;
