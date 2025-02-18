import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { USR_URL } from "../../../API/Api";

const ResetNewpassword = () => {
  
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const resetpasswordHandler = async () => {

    try {
      const response = await fetch(`${USR_URL}user/new-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, token }),
      });

      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        
          alert("no response")
     
        
        
      }else{
        if(data.message==="password updated"){
          alert("password updated");
        navigate('/')
        }
        
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    resetpasswordHandler();
  };
  return (
    <div>
      {/*   forget password  section */}
      <form onSubmit={handleSubmit}>
        <div className="loginPopUp ">
          <div className="loginPopUpContainer">
            <div className="loginPopUpContainerTitle">
              <h2>NEW PASSWORD</h2>
              <img
                onClick={() => navigate("/")}
                style={{ cursor: "pointer", width: "25px", height: "25px" }}
                src="../../../cross.png"
              />
            </div>

            <div className="loginPopUpInputs">
              <input
                required
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <button type="submit">Submit Password</button>

            <div className="loginPopUpCondition">
              <p>Please submit your password</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetNewpassword;
