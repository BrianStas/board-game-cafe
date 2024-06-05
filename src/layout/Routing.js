import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../home/HomePage";
import BoardGameList from "../boardGames/BoardGameList";


function Routing() {


  return (
    <Routes>

      <Route path="/boardgames" element={<BoardGameList />} />
      <Route path="/*" element={<HomePage />} />
      
    </Routes>
  );
}

export default Routing;