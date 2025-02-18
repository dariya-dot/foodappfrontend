import React, { useEffect, useState } from "react";
import "./restraentmenu.css";
import { API_URL } from "../../../API/Api";
import { Link } from "react-router-dom";

const Restarentmenu = () => {
  const [firmMenu, setfirmMenu] = useState([]);
  const [selectRegion, setSelectRegion] = useState("All");
  const [activeregion, setActiveregion] = useState("All");
  const menufunction = async () => {
    try {
      const response = await fetch(`${API_URL}vender/all-venders`);
      const data = await response.json();
      setfirmMenu(data.venders);
      console.log("data from the restarent menu page", data);
    } catch (error) {
      console.error("error from the Restarent menu page ", error);
    }
  };

  useEffect(() => {
    menufunction();
  }, []);

  const filterHandler = (region, select) => {
    setSelectRegion(region);
    setActiveregion(select);
  };

  return (
    <>
      <h3
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#333",
        }}
      >
       food category
      </h3>

      <div className="catagiry">
        <div
          onClick={() => filterHandler("All", "All")}
          className={activeregion === "All" ? "activeButton" : ""}
        >
          {" "}
          <img
            src="../../../all.jpg"
            className={activeregion === "All" ? "activeimage" : ""}
          />{" "}
          <p className={activeregion === "All" ? "activeText" : ""}>All</p>
        </div>
        <div
          onClick={() => filterHandler("SouthIND", "SouthIND")}
          className={activeregion === "SouthIND" ? "activeButton" : ""}
        >
          {" "}
          <img
            src="../../../soth.jpg"
            className={activeregion === "SouthIND" ? "activeimage" : ""}
          />{" "}
          <p className={activeregion === "SouthIND" ? "activeText" : ""}>
            SouthIND
          </p>
        </div>
        <div
          onClick={() => filterHandler("NortIND", "NortIND")}
          className={activeregion === "NortIND" ? "activeButton" : ""}
        >
          <img
            src="../../../north.jpg"
            className={activeregion === "NortIND" ? "activeimage" : ""}
          />{" "}
          <p className={activeregion === "NortIND" ? "activeText" : ""}>
            NortIND
          </p>
        </div>

        <div
          onClick={() => filterHandler("Chenies", "Chenies")}
          className={activeregion === "Chenies" ? "activeButton" : ""}
        >
          <img
            src="../../../chinese.jpg"
            className={activeregion === "Chenies" ? "activeimage" : ""}
          />{" "}
          <p className={activeregion === "Chenies" ? "activeText" : ""}>
            Chinese
          </p>
        </div>
        <div
          onClick={() => filterHandler("Bakery", "Bakery")}
          className={activeregion === "Bakery" ? "activeButton" : ""}
        >
          <img
            src="../../../bakery.jpg"
            className={activeregion === "Bakery" ? "activeimage" : ""}
          />{" "}
          <p className={activeregion === "Bakery" ? "activeText" : ""}>
            Bakery
          </p>
        </div>
      </div>
      <h3
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#333",
        }}
      >
     Top Restarents near you
      </h3>
      <div className="firmgrid">
        {firmMenu.map((vender) => {
          return vender.firm.map((item, index) => {
            if (selectRegion === "All" || item.region.includes(selectRegion)) {
              return (
                <Link
                  to={`/product/${item._id}/${item.firmName}`}
                  key={index}
                  className="link"
                >
                  <div className="foodItems" key={index}>
                    <div className="firmimage">
                      <img
                        src={`${API_URL}product/uploads/${item.image}`}
                        alt=""
                      />
                    </div>
                    <div className="firmdetails">
                      <div className="firmName">{item.firmName}...</div>
                      <div className="firmAddress">📍{item.area}</div>
                      <div className="offer">🔖{item.offer}</div>
                    </div>
                  </div>
                </Link>
              );
            }
          });
        })}
      </div>
    </>
  );
};

export default Restarentmenu;
