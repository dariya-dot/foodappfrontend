import React,{ useState} from 'react'
import { useNavigate } from "react-router-dom";
import { USR_URL } from '../../../API/Api';
const Forgetpassword = () => {
 const [email, setEmail] = useState("");
 console.log(email)
 const navigate = useNavigate();

  const  forgetpasswordHandler=async(e)=>{
        e.preventDefault()
        try {
            const response = await fetch(`${USR_URL}user/reset-password`, {
                   method: "POST",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify({  email }),
                 });
        
            const data= await response.json()
            console.log(data)
            if(!response.ok){
              if(data.message==="user not fount with this email"){
                alert("user not fount with this email")
                setEmail("")
              }
              
            }else{
              alert("reset link sent to your email")
              navigate('/')
            }
        } catch (error) {
            console.error(error)
        }
    }
   

  return (
    <div>
      
        {/*   forget password  section */}
      <form onSubmit={forgetpasswordHandler}>
        <div className="loginPopUp "  >
          <div className="loginPopUpContainer">
            <div className="loginPopUpContainerTitle">
              <h2>FORGET PASSWORD</h2>
              <img
                onClick={() => navigate('/')}
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
                onChange={(e) => setEmail(e.target.value) }
                placeholder="Enter Email Id"
              />
             
            </div>
          <button type="submit">
             Send reset link 
            </button>
            
           
          

           
          
          </div>
        </div>
      </form>
    </div>
  )
}

export default Forgetpassword