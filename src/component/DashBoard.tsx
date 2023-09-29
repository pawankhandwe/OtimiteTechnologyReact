
import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export default function DashBoard() {
  const [currentdata, setData] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...cart, { ...product, quantity: quantities[product.id] || 1 }];

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert("Product added to cart!");
  };

  const modifyQuantity = (productId: number, increment: boolean) => {
    const currentQuantity = quantities[productId] || 0;
    const newQuantity = increment ? currentQuantity + 1 : Math.max(currentQuantity - 1, 0);

    setQuantities({ ...quantities, [productId]: newQuantity });
  };

  return (
    <>
      <div>
        {currentdata && currentdata.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Image</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {currentdata.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.title}</td>
                  <td>
                    <img src={data.image} alt={data.title} style={{ width: '100px' }} />
                  </td>
                  <td>{data.price}</td>
                  <td>{data.description}</td>
                  <td>
                    <button onClick={() => addToCart(data)}>Add to Cart</button>
                  </td>
                  <td>{quantities[data.id] || 0}</td>
                  <td>
                    <button className='inc' onClick={() => modifyQuantity(data.id, true)}>Inc</button>
                    <br />
                    <br />
                    <button className='dec' onClick={() => modifyQuantity(data.id, false)}>Dec</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading data...</p>
        )}
        <Link to="/cart">Go to Cart</Link>
      </div>
    </>
  );
}
