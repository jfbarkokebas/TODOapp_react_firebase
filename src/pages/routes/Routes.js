import {Routes, Route } from "react-router-dom";

import React from 'react'
import Home from "../Home/Home";
import Register from "../Register/Register";

const RoutesApp = () => {
  return (    
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/register' element={<Register/>} />
        </Routes>    
  )
}

export default RoutesApp