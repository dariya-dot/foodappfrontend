import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Products.css";

import { useCart } from "../../pages/Usecontext";
import { API_URL } from "../../../API/Api";



const Products = () => {
  const [product, setProducts] = useState([]);
  const { firmId, firmName } = useParams();
  
  const { cartItems, addItemFunction, removeItemFunction } = useCart();

  useEffect(() => {
    const productsFunction = async () => {
     
      try {
        const response = await fetch(`${API_URL}product/${firmId}/product`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    productsFunction();
  }, [firmId]);

 

  return (
    <>
    
    <center>
    <h2>{firmName}</h2></center>
      <div className="productSection">
        {product.map((item) => {
          const currentItem = cartItems[item._id] || { quantity: 0 };

          return (
            <div className="productgrid" key={item._id}>
              <div className="productImage">
                <img src={`${API_URL}uploads/${item.image}`} alt={item.productName} />
                <div>
                  {currentItem.quantity === 0 ? (
                    <img
                      className="add"
                      onClick={() => addItemFunction(item)}
                      style={{ width: "30px", height: "30px", cursor: "pointer" }}
                      src="../../../icons8-plus-512.png"
                      alt="Add"
                    />
                  ) : (
                    <div className="countSymbols">
                      <img
                        onClick={() => removeItemFunction(item._id)}
                        style={{ width: "25px", height: "25px", cursor: "pointer" }}
                        src="../../../delete.png"
                        alt="Remove"
                      />
                      <div className="count">{currentItem.quantity}</div>
                      <img
                        onClick={() => addItemFunction(item)}
                        style={{ width: "25px", height: "25px", cursor: "pointer" }}
                        src="../../../add.png"
                        alt="Increase"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="productDetails">
                <div className="productName">{item.productName}</div>
                <div className="itemDescription">{item.description}</div>
                <div className="price">🏷️ {"\u20B9"} {item.price}</div>
              </div>
            </div>
          );
        })}
      </div>
      
    </>
  );
};
export default Products