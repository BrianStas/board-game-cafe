import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../home/HomePage";
import BoardGameList from "../boardGames/BoardGameList";
import NewGameForm from "../forms/NewGameForm";
import BoardGamePage from "../boardGames/BoardGamePage";
import AddFields from "../boardGames/AddFields";


function Routing() {


  return (
    <Routes>

      <Route path="/boardgames" element={<BoardGameList />} />
      <Route path="/boardgames/addfields" element={<AddFields />} />
      <Route path="/boardgames/:boardGame" element={<BoardGamePage />} />

      <Route path="/newgame" element={<NewGameForm />} />      
      <Route path="/*" element={<HomePage />} />
      
    </Routes>
  );
}

export default Routing;