import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../home/HomePage";
import BoardGameList from "../boardGames/BoardGameList";
import NewGameForm from "../forms/NewGameForm";
import BoardGamePage from "../boardGames/BoardGamePage";
import AddFields from "../boardGames/AddFields";
import NewMenuItemForm from "../forms/NewMenuItemForm";
import FoodHome from "../food/FoodHome";


function Routing() {

  return (
    <Routes>

      <Route path="/boardgames" element={<BoardGameList />} />
      <Route path="/boardgames/addfields" element={<AddFields />} />
      <Route path="/boardgames/:boardGame" element={<BoardGamePage />} />
      <Route path="/food" element={<FoodHome />} />
      <Route path="/newgame" element={<NewGameForm />} />  
      <Route path="/newfood" element={<NewMenuItemForm />} />    
      <Route path="/*" element={<HomePage />} />
      
    </Routes>
  );
}

export default Routing;