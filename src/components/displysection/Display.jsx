import React from "react";
import { useState, useEffect } from "react";
import "./Display.css";
import { API_URL } from "../../../API/Api";

const Display = () => {
  const [venderData, setVenderData] = useState([]);

  const venderdataFunction = async () => {
    try {
      const response = await fetch(`${API_URL}vender/all-venders`);

      const data = await response.json();
      setVenderData({
        venders: data.venders.slice(0, 8), // Get only the first 7 items
      });
     
    } catch (error) {
      console.error("data not fetched from the UPI", error);
    }
  };
  useEffect(() => {
    venderdataFunction();
  },[]);
  return (
    <div className="displayfirmSectionContainer">
            <div className="displayfirmSection">
      {venderData?.venders?.map((vender,index) => {
        return (
          <div className="venderBox" key={index}>
            {vender.firm.map((item, index) => {
              return (
                <div className="displayBox" key={index}>
                  <div className="diplayfirmImage">
                    <img src={`${API_URL}product/uploads/${item.image}`} />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
    </div>
    
  );
};

export default Display;
