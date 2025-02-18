import React, { useState, useEffect } from "react";
import "./user.css";
import { USR_URL } from "../../../API/Api";


const UserDetails = () => {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState({});

  console.log("userid", userId);
  console.log(`${USR_URL}user/get/${userId}`);

  const userdataFunction = async () => {
    try {
      const response = await fetch(`${USR_URL}user/get/${userId}`);
      const data = await response.json();
      if (!response.ok) {
        console.log("Network response was not ok");
      }

      setUserData(data.userdetails);
      console.log("userdetails from front end", data.userdetails);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    userdataFunction();
  }, []);

  return (
    <div>
      <div className="user-details">
        <h2>User Details</h2>
        <p>
          <strong>Name:</strong> {userData.userName}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        
        <h3>Cart Details:</h3>

        {userData.cartData && Object.keys(userData.cartData).length > 0 ? (
        Object.entries(userData.cartData).map(([itemId, item]) => (
          <>
          <div key={itemId} className="cart-item">
            <p><strong>Product:</strong> {item.productName}</p>
            <p><strong>Price:</strong> ₹{item.price}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
          </div>
        
          
          </>
        ))
      ) : (
        <p>No items in the cart</p>
      )}
      </div>
      
    </div>
  );
};

export default UserDetails;
