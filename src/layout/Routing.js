import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../home/HomePage";


function Routing() {


  return (
    <Routes>
      
      <Route path="/*" element={<HomePage />} />
      
    </Routes>
  );
}

export default Routing;