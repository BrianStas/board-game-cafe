import './App.css';
import './index.css';
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./home/HomePage";
import BoardGamePage from "./boardGames/BoardGamePage";
import FoodHome from "./food/FoodHome";
import { ShoppingCartProvider } from './context/ShoppingCartContext';

function App() {
  return (
    <ShoppingCartProvider>
      <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/boardgames/:boardGame" element={<BoardGamePage />} />
            <Route path="/food" element={<FoodHome />} />
          </Route>
        </Routes>
      </div>
    </ShoppingCartProvider>
  );
}

export default App;
