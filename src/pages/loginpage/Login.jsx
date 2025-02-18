import React, {  useState } from "react";
import "./login.css";
import { USR_URL } from "../../../API/Api";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [otp,setOtp]=useState('')
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 const[resisterd,setResisterd]=useState()

  const resisterHandler = async () => {
    try {
      const response = await fetch(`${USR_URL}user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.message === "user alredy existed") {
          alert("email used already");
        }
        if (data.message === "Please Enter the valid email") {
          alert("Not avalid email");
        }}
      if (response.ok) {
        setPassword("");
        setUserName("");
        console.log("Response Data:", data);
        const otp=data.otp
        setOtp(otp)
        setResisterd(data.userId)
        console.log(otp)
      }
    } catch (error) {
      console.error(error);
    }
  };
const otpHandler=async(e)=>{
  e.preventDefault()
  console.log("otp called")
  try {
    const response= await fetch(`${USR_URL}user/otp`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email, otp }),
    })
    const data= await response.json()
    if(!response.ok){
      if (data.message === "user not found in otpAthentication  in backend"){
        alert("user not found")
       
      }
       if (data.message === "you entered wrong otp") {
        alert("you entered wrong OTP");
      }
    }

      if (response.ok){
        alert("OTP authentication done and registerd sucessfully")
        console.log(data)
        window.location.reload()
      }
  
  } catch (error) {
    console.error(error)
  }
}
  const loginHandler = async () => {
    try {
      
      const response = await fetch(`${USR_URL}user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.message === "This email is not registered") {
          setPassword("");
          setEmail("");
          alert("email not resistred");
        } else if (data.message === "Email and password are incorrect") {
          alert("Email and password are incorrect");
        }else if(data.message==="Your account was not verified and has been removed. Please register again."){
          alert("Your account was not verified and has been removed. Please register again.")
          setPassword("");
          setEmail("");
          window.location.reload()
        }
      }

      if (response.ok) {
        setEmail("");
        setPassword("");
        setAgree(false);
        setShowLogin(false);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName",data.userName)
        alert("loged in")
        console.log("Response Data:", data.user);
        window.location.reload();
       
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loginAndResisterHandler = (e) => {
    e.preventDefault();
    if (currentState === "Sign-Up") {
      resisterHandler(e);
    }
    if (currentState === "Login") {
      loginHandler(e);
    }
  };

  return (
    <>
  <form onSubmit={loginAndResisterHandler}>
        <div className="loginPopUp " id={otp !== '' ? "yesOTP":"" } >
          <div className="loginPopUpContainer">
            <div className="loginPopUpContainerTitle">
              <h2>{currentState}</h2>
              <img
                onClick={() => setShowLogin(false)}
                style={{ cursor: "pointer", width: "25px", height: "25px" }}
                src="../../../cross.png"
              />
            </div>

            <div className="loginPopUpInputs">
              {currentState === "Login" ? (
                ""
              ) : (
                <input
                required
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter Your Name"
                />
              )}
              <input
              required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Id"
              />
             <div className="passwordInput">
             <input
              required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
               <span onClick={togglePasswordVisibility} className="toggle-password">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
             </div>
            </div>
          <button type="submit">
              {currentState === "Sign-Up" ? "SEND OTP" : "Login"}
            </button>
            
           <Link onClick={() => setShowLogin(false)} to='/forget-password'>Forget Password?</Link>
           
            <div className="loginPopUpCondition">
              <input
              
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                type="checkbox"
                required
              />
              <p>
                I agree to Food-Print's Terms of Service, Privacy Policy and
                Content Policies
              </p>
            </div>

            <div className="account">
              {currentState === "Sign-Up" ? (
                <p>
                  Already have an account?
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setCurrentState("Login")}
                  >
                    Login
                  </span>
                </p>
              ) : (
                <p>
                  New to Food-Print ?
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setCurrentState("Sign-Up")}
                  >
                    Create account
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </form>    
     
       {/*   otp section */}

      <form onSubmit={otpHandler}>
        <div className="loginPopUp " id={otp === '' && resisterd !=="" ? "noOTP":"" }>
          <div className="loginPopUpContainer">
            <div className="loginPopUpContainerTitle">
              <h2>Sign UP</h2>
              <img
                onClick={() => setShowLogin(false)}
                style={{ cursor: "pointer", width: "25px", height: "25px" }}
                src="../../../cross.png"
              />
            </div>

            <div className="loginPopUpInputs">
              
              <input
              required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Id"
              />
              <input
                required
                type="string"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter your otp"
              />
            </div>
          <button type="submit">
              Submit OTP
            </button>
            
           
           
            <div className="loginPopUpCondition">
             
              <p>
               OTP sent to you email : ****{email.split(4)}
              </p>
            </div>

            <div className="account">
              {currentState === "Sign-Up" ? (
                <p>
                  Already have an account?
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => (setCurrentState("Login"),setOtp(''))} 
                  >
                    Login
                  </span>
                </p>
              ) : (
                <p>
                  New to Food-Print ?
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setCurrentState("Sign-Up")}
                  >
                    Create account
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </form> 
     
      

    </>
  );
};

export default Login;
