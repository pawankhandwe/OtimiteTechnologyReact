
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

  // const addToCart = (product: Product) => {
  //   const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  //   const updatedCart = [...cart, { ...product, quantity: quantities[product.id] || 1 }];

  //   localStorage.setItem('cart', JSON.stringify(updatedCart));
  //   alert("Product added to cart!");
  // };

  const addToCart = (product: Product) => {
    // Get the current cart from local storage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex((item: Product) => item.id === product.id);

  
    if (existingProductIndex !== -1) {
      // If the product already exists, update its quantity
      cart[existingProductIndex].quantity += quantities[product.id] || 1;
    } else {
      // If the product is not in the cart, add it with the specified quantity
      cart.push({ ...product, quantity: quantities[product.id] || 1 });
    }
  
    // Update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  
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
        
          <div className="product-container">
  {currentdata.map((data) => (
    <div className="product-card" key={data.id}>
      <img src={data.image} alt={data.title} className="product-image" />
      <div className="product-title">{data.title}</div>
      <div className="product-price">Price: ${data.price}</div>
      <div className="product-quantity">Quantity: {quantities[data.id] || 1}</div>
      <button className='inc' onClick={() => modifyQuantity(data.id, true)}>Inc</button>
  <button className='dec' onClick={() => modifyQuantity(data.id, false)}>Dec</button>
       <br></br>
      <button className="add-to-cart-button" onClick={() => addToCart(data)}>   
        Add to Cart
      </button>
      <br></br>
      <br></br>
      <Link to={`/products/${data.id}`} className="details-button" >
                  Product Details
                </Link>
    </div>
  ))}
</div>

        ) : (
          <p>Loading data...</p>
        )}
        <Link to="/cart">Go to Cart</Link>
      </div>
    </>
  );
}
