import { createContext, useContext, useEffect, useState } from "react";
import { API_URL, USR_URL } from "../../API/Api";

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const token = localStorage.getItem("token");

  const loadCartData = async () => {
   if(token){
    const response = await fetch(`${USR_URL}cart/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    const data = await response.json();
    setCartItems(data.cartData || {});
   
   }
  };

  const addItemFunction = async (product) => {
    setCartItems((prev) => {
      const existingItem = prev[product._id];

      return {
        ...prev,
        [product._id]: existingItem
          ? { ...existingItem, quantity: existingItem.quantity + 1 }
          : { ...product, quantity: 1 },
      };
    });

    try {
      const token = localStorage.getItem("token");
      if(token){
        const response = await fetch(`${USR_URL}cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            itemId: product._id,
            productName: product.productName,
            price: product.price,
            image:product.image,
          }),
        });
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error adding item to MongoDB:", error);
    }
  };

  const removeItemFunction = async (itemId) => {
    setCartItems((prev) => {
  
    
      const updatedCart = { ...prev };

      if (updatedCart[itemId]) {
        const currentItem = updatedCart[itemId];

        if (currentItem.quantity === 1) {
          delete updatedCart[itemId];
        } else {
          updatedCart[itemId] = {
            ...currentItem,
            quantity: currentItem.quantity - 1,
          };
        }
      }

      return updatedCart;
    });

    try {
      const token = localStorage.getItem("token");

      if(token){
      const response = await fetch(`${USR_URL}cart/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ itemId: itemId }),
      });
      const data = await response.json();
      console.log(data);
      // loadCartData();
    }
    } catch (error) {
      console.error("Error removing item from MongoDB:", error);
    }
  };

  const getTotalCartQuantity = (cartItems) => {
    return Object.values(cartItems).reduce(
      (total, item) => total + item.quantity,
      0
    );
  };
  const getTotalCartAmount = () => {
    return Object.values(cartItems).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    console.log("Updated cart items:", cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (token) {
      loadCartData();
    }
  }, [token]);

  return (
    <cartContext.Provider
      value={{
        cartItems,
        addItemFunction,
        getTotalCartAmount,
        removeItemFunction,
        getTotalCartQuantity,
        token,
        setCartItems
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(cartContext);
};
