import React, { useEffect, useState } from "react";
import { API_URL, USR_URL } from "../../../API/Api";
import { useParams } from "react-router-dom";
import "./order.css";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const { userId } = useParams();
  const token = localStorage.getItem("token");

  const ordersHandler = async () => {
    try {
      const response = await fetch(`${USR_URL}order/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const data = await response.json();
      setOrderData(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ordersHandler();
  }, []);
  console.log(orderData);
  return (
    <>
   
      {orderData ? (
        <>
          {orderData.map((item) => {
            return (
              <div key={item._id} className="Allorders">
                <div className="AddressContainer">
                  <center>
                    <h3>Address & Payment Details </h3>
                  </center>
                  <div className="Address">
                    <p>
                      {" "}
                      <strong>Name: </strong>{" "}
                      <span>
                        {item.Address.firstName} {item.Address.lastName}
                      </span>
                    </p>
                    <p>
                      <strong>Phonenumber :</strong>{" "}
                      <span>{item.Address.number}</span>{" "}
                    </p>
                    <p>
                      <strong>Street: </strong>
                      <span>{item.Address.street}</span>{" "}
                    </p>
                    <p>
                      {" "}
                      <strong>State:</strong> <span>{item.Address.state}</span>
                    </p>
                    <p>
                      <strong>PinCode:</strong>
                      <span>{item.Address.pincode}</span>
                    </p>
                  </div>

                  <div className="Address">
                    <p>
                      <strong>Payment Status: </strong>{" "}
                      <span>{item.payment}</span>
                    </p>
                    <p>
                      <strong>Total Amount Including Delivery chareges:</strong>
                      <span> ₹ {item.totalAmount}</span>
                    </p>
                    <p>
                      {" "}
                      <strong>OrderId: </strong>
                      <span> {item.orderId}</span>
                    </p>
                    <p>
                      <strong>Order Update:</strong>
                      <span>{item.status}</span>
                    </p>
                  </div>
                </div>
                <h3>Ordered Items</h3>
                <div className="production">
                 
                  {item.items.map((items, index) => {
                    return (
                      <div key={index} >
                        <div className="productsSection">
                          <div className="prdouctImage">
                            <img src={`${API_URL}product/uploads/${items.image}`} />
                          </div>
                          <div className="details">
                            <div>
                              <strong>Item:</strong>
                              <span>{items.productName}</span>
                            </div>
                            <div>
                              <strong>Quantity:</strong>
                              <span> {items.quantity}</span>
                            </div>
                            <div>
                              <strong>Price:</strong>
                              <span> ₹ {items.price}</span>
                            </div>
                            <div>
                                <strong>SubTotal:₹ </strong><span>{(items.price * items.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                </div>
                <div className="amount"><center>Amount : ₹ {item.items.reduce((acc, items) => acc + items.price * items.quantity, 0).toFixed(2)}</center></div>
                
              </div>
            );
          })}
          
        </>
      ) : (
        " "
      )}
      <hr />
    </>
  );
};

export default Orders;
