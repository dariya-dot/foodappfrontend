import React from "react";
import { Link } from "react-router-dom";
import "./home.css";


const Home = () => {
  return (
   <div className="header">
     <div className="homeSection">
      <h1>Order Your Favourite food here</h1>
      <p>India Restaurants - Find the best restaurants, cafés and bars in India on FOOD PRINT.
      View Menus, Photos, Ratings and User Reviews for Top restaurants in India</p>
     <Link to='/allproducts'> <button >View Menu</button></Link>
    </div>
   </div>
  );
};

export default Home;
