import {Routes, Route } from "react-router-dom";

import React from 'react'
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Admin from "../pages/Admin/Admin";

const RoutesApp = () => {
  return (    
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/admin' element={<Admin/>} />
        </Routes>    
  )
}

export default RoutesApp