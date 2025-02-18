import React from 'react'
import Home from '../components/Home/Home'

// import Scroolingmenu from '../components/scroolingMenu/Scroolingmenu'
import Display from '../components/displysection/Display'
import Restarentmenu from '../components/restarentmenu/Restarentmenu'

import './landing.css'




const Landingpage = () => {
  return (
    <div>
         
        <Home/>
        <Display/>
        {/* <Scroolingmenu/> */}
        <Restarentmenu/>
       
        
    </div>
  )
}

export default Landingpage