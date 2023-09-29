

import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart)); 

    }
  }, []);

  console.log(cart.length);
  
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
    <h2>Cart Page</h2>
    <h3>Total Price: ${calculateTotalPrice()}</h3>
    {Object.keys(cart).length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Total</th> 
          </tr>
        </thead>
        <tbody>
        {Object.values(cart).map((item, index) => (
  <tr key={index}>
    <td>{item.title}</td>
    <td>${item.price.toFixed(2)}</td>
    <td>{item.quantity}</td>
    <td>
      <img src={item.image} alt={item.title} style={{ width: '100px' }} />
    </td>
    <td>$ {(item.price*item.quantity).toFixed(2)} </td>
  </tr>
))}

        </tbody>
      </table>
  
   ) : (
      <p>Your cart is empty.</p>
    )}
     {/* <h1>Total price of products is {calculateTotalPrice}</h1> */}
     
  </div>
 
  
  );
}
