import React, { useEffect, useState } from "react";
import "./placeorder.css";
import { useCart } from "../Usecontext";
import { load } from "@cashfreepayments/cashfree-js";
import { API_URL, USR_URL } from "../../../API/Api";
import { useNavigate } from "react-router-dom";
const Placeorder = () => {
  const navigate = useNavigate(); 
  const { cartItems, getTotalCartAmount, token } = useCart();
  const userId = localStorage.getItem("userId");
  const [orderId, setOrderId] = useState(null);
  const [cashfree, setCashfree] = useState(null);
const [orderData,setOrderData]=useState()
  const [sessionId, setSessionId] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    number: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const subtotal = getTotalCartAmount(); // Calculate subtotal
  const deliveryFee = subtotal * 0.03; // 3% of subtotal
  const totalAmount = subtotal + deliveryFee; // Final total
  useEffect(() => {
    if (sessionId && orderId) {
      paymentPage();
    }
  }, [sessionId, orderId]);
  
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        const cashfreeInstance = await load({ mode: "sandbox" });
        setCashfree(cashfreeInstance);
      } catch (error) {
        console.error("Error initializing Cashfree:", error);
      }
    };
    initializeSDK();
  }, []);

  const placeOrderHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    if (Object.keys(cartItems).length === 0) {
      console.error("Cart is empty");
      alert("cart is empty")
      return;
    }

    const merchantTransactionId = "MUID" + Date.now().toString(); // Unique transaction ID

    const paymentData = {
      totalAmount: totalAmount,
      customerId: userId,
      number: data.number,
      email: data.email,
      name: `${data.firstName} ${data.lastName}`,
      merchantTransactionId,
      order: Object.entries(cartItems).map(([itemId, item]) => ({
        image: `${API_URL}uploads/${item.image}`,
        itemId: itemId,
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
      })),
      Address: data,
    };
    setOrderData(paymentData)
    try {
      const response = await fetch(`${USR_URL}payment/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(paymentData,userId),
      });

      const PaidData = await response.json();
      console.log(PaidData);
   
      if (PaidData.success && PaidData.data.payment_session_id) {
        setOrderId(PaidData.data.order_id);
        setSessionId(PaidData.data.payment_session_id);
        setTimeout(() => {
          paymentPage();
        }, 500);
      //  await paymentPage();
      } else {
        alert("payment not intiated");
      }
    } catch (error) {
      console.log("Error in placeOrderHandler:", error);
    }
  };

  

  
  const paymentPage = async () => {
    try {
      if (cashfree) {
        cashfree
          .checkout({
            paymentSessionId: sessionId,
            redirectTarget: "_modal",
          })
          .then(() => {
           verifyPayment(orderId);
          });
      } else {
        console.error("Cashfree SDK is not loaded");
      }
    } catch (error) {
      console.log("payment error:", error);
    }
  };

  const verifyPayment = async (orderId) => {
    try {
      const res = await fetch(`${USR_URL}payment/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      if (data && data.data.order_status === 'PAID'
        ) {
        alert("payment done ");
        console.log("data from the front end ",data);
        
      
      const saveData = async () => {
        try {
          const response = await fetch(`${USR_URL}order/save`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
            body: JSON.stringify({ orderData,orderId,userId }),
          });
          const data=await response.json()
          console.log(data)
          if(data.message=== 'user not saved'){

            alert('order not  placed user not found')
        
          }else{
            alert("order saved")
            navigate('/')
          }
        
        } catch (error) {
          console.log(error)
        }
      };
      await saveData()

      }
      else{
        alert("order not saved ")
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <form onSubmit={placeOrderHandler} className="place-order">
      <div className="placeorderLeft">
        <strong>Delivery information</strong>
        <div className="multiInput">
          <input
            type="text"
            required
            onChange={onchangeHandler}
            value={data.firstName}
            name="firstName"
            placeholder="First Name"
          />
          <input
            type="text"
            required
            onChange={onchangeHandler}
            value={data.lastName}
            name="lastName"
            placeholder="Last Name"
          />
        </div>

        <input
          required
          onChange={onchangeHandler}
          value={data.email}
          name="email"
          type="email"
          placeholder="Email Id"
          style={{ width: "100%", boxSizing: "border-box" }}
        />
        <input
          required
          onChange={onchangeHandler}
          value={data.street}
          name="street"
          type="text"
          placeholder="Door No / Street & Land-Mark"
          style={{ width: "100%", marginTop: "10px", boxSizing: "border-box" }}
        />

        <div className="multiInput">
          <input
            name="number"
            type="text"
            placeholder="Contact Number"
            onChange={onchangeHandler}
            value={data.number}
            pattern="\d{10}"
            maxLength={10}
            required
          />
          <input
            name="city"
            type="text"
            onChange={onchangeHandler}
            value={data.city}
            required
            placeholder="Village/City"
          />
        </div>
        <div className="multiInput">
          <input
            name="pincode"
            type="Number"
            onChange={onchangeHandler}
            value={data.pincode}
            required
            placeholder="Zipcode"
          />
          <input
            name="state"
            type="text"
            onChange={onchangeHandler}
            value={data.state}
            required
            placeholder="State"
          />
        </div>
        <input
          name="country"
          type="text"
          onChange={onchangeHandler}
          value={data.country}
          required
          placeholder="Country"
        />
      </div>
      <div className="palceorderRight">
        <div className="cartBottom">
          <div className="cartTotal">
            <h4>Cart Total</h4>
            <div className="cardtotaldetails">
              <div>Sub Total</div>
              <div>
                {"\u20B9"} {subtotal.toFixed(2)}
              </div>
            </div>
            <hr  className="hr"/>
            <div className="cardtotaldetails">
              <div>Delivery Fee (3%)</div>
              <div>
                {"\u20B9"} {deliveryFee.toFixed(2)}
              </div>
            </div>
            <hr className="hr" />
            <div className="cardtotaldetails">
              <div>
                <strong>Total</strong>
              </div>
              <div>
                <strong>
                  {"\u20B9"} {totalAmount.toFixed(2)}
                </strong>
              </div>
            </div>
  <center>          <button type="submit">Proceed To Payment</button></center>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
