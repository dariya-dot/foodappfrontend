import React, { useRef } from 'react'


import Landingpage from './pages/Landingpage'
import { Route, Routes } from 'react-router-dom'

import Cart from './components/cart/Cart'
import Placeorder from './pages/placeorder/Placeorder'
import { useState } from 'react'

import Products from './components/products/Products'
import Navbar from './components/Navbar/Navbar'
import Login from './pages/loginpage/Login'
import UserDetails from './components/userdetails/UserDetails'
import Forgetpassword from './components/forgetpassword/Forgetpassword'
import ResetNewpassword from './components/forgetpassword/ResetNewpassword'
import Appstore from './components/appstore/Appstore'
import Footer from './components/Footer/Footer'
import Allproducts from './components/complteproducts/Allproducts'
import Orders from './components/orders/orders'
const App = () => {
   const [showLogin,setShowLogin]=useState(false)
   const footerRef = useRef(null);
   const appstoreRef=useRef(null)
    const scrollToFooter = () => {
      footerRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToAppstore = () => {
      appstoreRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  return (
  
    
     <>
     <Navbar scrollToAppstore={scrollToAppstore} scrollToFooter={scrollToFooter} setShowLogin={setShowLogin}/>
     {showLogin && <Login setShowLogin={setShowLogin} />}
     <Routes>
      
      <Route path='/' element={<Landingpage showLogin={showLogin} setShowLogin={setShowLogin}/>}/>
      <Route path="/product/:firmId/:firmName" element={<Products setShowLogin={setShowLogin}/>}/>
      <Route path="/cart" element ={<Cart setShowLogin={setShowLogin} />} />
      <Route path='/order' element={<Placeorder setShowLogin={setShowLogin} />}/>
      <Route path='/userdatails/:userId' element={<UserDetails/>} />
      <Route path='/forget-password' element={<Forgetpassword  setShowLogin={setShowLogin} />}/>
      <Route path='/new-password/:token' element ={<ResetNewpassword/>}/>
      <Route path='/allproducts' element={<Allproducts/>}/>
     
      <Route path='/orders/:userId' element={<Orders/>}/>
    </Routes>
    <Appstore ref={appstoreRef}/>
    <Footer ref={footerRef}/>
     </>
   
  )
}

export default App