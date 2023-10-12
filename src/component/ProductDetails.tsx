import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  title: string;
  image: string;
  price: number;
  description: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null); 
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  return (
    <div className="product-details">
      {product ? (
        <>
          <h2 className="product-title">{product.title}</h2>
          <img src={product.image} alt={product.title} className="product-image" />
          <p className="product-price">Price: ${product.price}</p>
          <p className="product-description"><b>Description:</b> {product.description}</p>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;
