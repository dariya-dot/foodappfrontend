import React, { useEffect, useState } from "react";
import { API_URL } from "../../../API/Api";
import { useCart } from "../../pages/Usecontext";
import "./allproducts.css";

const Allproducts = () => {
 
  const [allProducts, setAllProducts] = useState([]);
  const { cartItems, addItemFunction, removeItemFunction } = useCart();
   const [selectCategory, setSelectCategory] = useState("All");
    const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const allProductshandler = async () => {
      try {
        const response = await fetch(`${API_URL}product/all`, {
          method: "GET",
        });
        const data = await response.json();
        if (response.ok) {
          setAllProducts(data.products);
          console.log("from all products page ", data.products);
        }
      } catch (error) {
        console.error(error);
      }
    };
    allProductshandler();
    
  }, []);
  const filterHandler = (category, select) => {
    setSelectCategory(category);
    setActiveCategory(select);
  };

  return (
    <>
    
    <div className="catagiry">
        <div
          onClick={() => filterHandler("All", "All")}
          className={activeCategory === "All" ? "activeButton" : ""}
        >
          {" "}
          <img
            src="../../../all.jpg"
            className={activeCategory === "All" ? "activeimage" : ""}
          />{" "}
          <p className={activeCategory === "All" ? "activeText" : ""}>All</p>
        </div>
        <div
          onClick={() => filterHandler("Veg", "Veg")}
          className={activeCategory === "Veg" ? "activeButton" : ""}
        >
          {" "}
          <img
            src="../../../soth.jpg"
            className={activeCategory === "Veg" ? "activeimage" : ""}
          />{" "}
          <p className={activeCategory === "Veg" ? "activeText" : ""}>
            Veg
          </p>
        </div>
        <div
          onClick={() => filterHandler("Non-Veg", "Non-Veg")}
          className={activeCategory === "Non-Veg" ? "activeButton" : ""}
        >
          {" "}
          <img
            src="../../../nonVeg.jpg"
            className={activeCategory === "Non-Veg" ? "activeimage" : ""}
          />{" "}
          <p className={activeCategory === "Non-Veg" ? "activeText" : ""}>
            Non-Veg
          </p>
        </div>
       
        
      </div>
    <div className="productSection">
      {allProducts.length > 0 ? (
        allProducts.map((item) => {
          const currentItem = cartItems[item._id] || { quantity: 0 }; // Moved inside map()
          if(activeCategory==="All" || item.
            category.includes(activeCategory)){
            return (
              <div key={item._id} className="productgrid">
                <div className="productImage">
                  <img
                    src={`${API_URL}uploads/${item.image}`}
                    alt={item.productName}
                    className="product-image"
                  />
                  <div>
                    {currentItem.quantity === 0 ? (
                      <img
                        className="add"
                        onClick={() => addItemFunction(item)}
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                        src="../../../icons8-plus-512.png"
                        alt="Add"
                      />
                    ) : (
                      <div className="countSymbols">
                        <img
                          onClick={() => removeItemFunction(item._id)}
                          style={{
                            width: "25px",
                            height: "25px",
                            cursor: "pointer",
                          }}
                          src="../../../delete.png"
                          alt="Remove"
                        />
                        <div className="count">{currentItem.quantity}</div>
                        <img
                          onClick={() => addItemFunction(item)}
                          style={{
                            width: "25px",
                            height: "25px",
                            cursor: "pointer",
                          }}
                          src="../../../add.png"
                          alt="Increase"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="productDetails">
                  <h3>{item.productName}</h3>
                  <p>Price: ₹{item.price}</p>
                  <p>{item.description}</p>
                  
                  <p>Restarent: {item.firmname[0]}</p>
                </div>
              </div>
            );
          }
          
        })
      ) : (
        <></>
      )}
    </div>
    </>
  );
};

export default Allproducts;
