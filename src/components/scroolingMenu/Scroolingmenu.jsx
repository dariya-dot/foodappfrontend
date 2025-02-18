import React, { useEffect, useState } from "react";
import { API_URL } from "../../../API/Api";
import './Scrooling.css'

const Scroolingmenu = () => {
  const [venderData, setVenderData] = useState([]);

  const venderdataFunction = async () => {
    try {
      const response = await fetch(`${API_URL}vender/all-venders`);

      const data = await response.json();
      setVenderData(data);
      console.log(data)
    } catch (error) {
      console.error("data not fetched from the UPI", error);
    }
  };
  useEffect(() => {
    venderdataFunction();
  }, []);

  return (
    <div className="firmSection">
      {venderData?.venders?.map((vender,index) => {
        return (
          <div className="venderBox" key={index}>
            {vender.firm.map((item,index) => {
              return (
                
                <div className="firmBox" key={index}>
                <div className="firmName">{item.firmName}</div>
                  <div className="firmImage">
                    <img src={`${API_URL}product/uploads/${item.image}`} />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Scroolingmenu;
