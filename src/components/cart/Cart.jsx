import React from "react";
import { useCart } from "../../pages/Usecontext";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import { API_URL } from "../../../API/Api";


const Cart = () => {
  const { cartItems, removeItemFunction ,getTotalCartAmount} = useCart();
  const navigate = useNavigate();
  console.log("Cart items:", cartItems);

  const subtotal = getTotalCartAmount(); // Calculate subtotal
  const deliveryFee = subtotal * 0.03; // 3% of subtotal
  const totalAmount = subtotal + deliveryFee; // Final total
  
  return (
    <>
      
      <div className="cart">
        <div className="cart-item">
          <div className="cart-item-title headers">
            <div className="disableclass">Item</div>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>

          <hr className="thick-hr" />

          {Object.entries(cartItems).map(([itemId,item], index) => (
            <div key={index}>
              <div className="cart-item-title cartBox">
                <img
                  className="image disableclass"
                  src={`${API_URL}uploads/${item.image}`}
                />
                <div>{item.productName}</div>
                <div>
                  {"\u20B9"} {item.price}
                </div>
                <div> {item.quantity} </div>
                <div>
                  {" "}
                  {"\u20B9"} {item.price * item.quantity}
                </div>
                <img
                  className="deleteimage"
                  onClick={() => removeItemFunction(itemId)}
                  src="../../../x-circle-fill.svg"
                />
              </div>
              <hr className="thick-hr" />
            </div>
          ))}
        </div>
        <div className="cartBottom">
          <div className="cartTotal">
            <h4>Cart Total</h4>
              <div className="cardtotaldetails">
                <div>Sub Total</div>
                <div>{"\u20B9"} {subtotal.toFixed(2)}</div> 
              </div><hr />
            <div className="cardtotaldetails">
              <div>Delivery Fee (3%)</div>
              <div>{"\u20B9"} {deliveryFee.toFixed(2)}</div>
            </div><hr /> 
            <div className="cardtotaldetails">
              <div> <strong>Total</strong> </div>
              <div> <strong>{"\u20B9"} {totalAmount.toFixed(2)}</strong></div> 
            </div>
            <button onClick={()=>navigate('/order')}>Check-Out</button>
          </div>
          <div className="promoCode">
          <div>
            <p>If You Have Promo Code Please Enter Here</p>
            <div className="promoinput">
              <input type="text" placeholder="Enter your code " />
              <button>Submit</button>
            </div>
          </div>
        </div>
        </div>
        
      </div>
     
    </>
  );
};

export default Cart;
