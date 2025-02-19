import React, { useState ,useEffect} from "react";
import "./navbar.css";

import { Link } from "react-router-dom";

import { useCart } from "../../pages/Usecontext";
import { useNavigate } from "react-router-dom";
const NavBar = ({scrollToAppstore,setShowLogin,scrollToFooter}) => {
  
  const { cartItems, getTotalCartQuantity } = useCart();
  
  const navigate = useNavigate(); 
  const [token,setToken]=useState(localStorage.getItem("token"))
  const userId=localStorage.getItem('userId')
  useEffect(() => {
    setToken(localStorage.getItem("token")); // ✅ Update state if token changes
  }, []);



  const logOutHandler=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    setToken(null)
    localStorage.removeItem('userId')
    setShowLogin(false)
    navigate("/");
    window.location.reload()
  }
  return (
    <>
      <div className="Navsection">
        <div className="leftSection">
          
          <Link className="link" to='/'><img src="../../../logo.png" /></Link>
        </div>
        <div className="centerSection">
          
           <Link className="Link"  to='/'>Home</Link>
           <Link className="Link" to='/allproducts'  >Menu</Link> 
           <Link className="Link" onClick={scrollToAppstore}  to='/'>Mobile App</Link>
           <Link  className="Link" onClick={scrollToFooter} to='/'> Contact us</Link>
          
        </div>
        <div className="rightsection">
          <img src="../../../search.png" />
          <Link to="/cart">
            <div className="cart">
              <i className="bi bi-cart-fill fs-5"></i>
              <em className="round">{getTotalCartQuantity(cartItems)}</em>
            </div>
          </Link>
          {!token?<button onClick={()=>setShowLogin(true)}>Sign in</button> :
          
        
          <div className="profiledetails">
            <img style={{cursor:"pointer"}} src="../../../profile.png" />
            <ul className="dropdown">
             <Link className="link" to={`orders/${userId}`} > <li><img src="../../../orders.png"/><p>Orders</p></li></Link>
              
              <Link className="link" to={`userdatails/${userId}`} > <li><img  src="../../../profile.png"/><p>Profile</p></li></Link>
              
              <li onClick={()=>{logOutHandler()}}><img  src="../../../logout.png"/><p>Logout</p></li>
             
            </ul>
          </div>
          
         
          }
          
          
        </div>
      </div>
    </>
  );
};

export default NavBar;
