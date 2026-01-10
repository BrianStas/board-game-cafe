import './App.css';
import './index.css';
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./home/HomePage";
import BoardGamePage from "./boardGames/BoardGamePage";
import FoodHome from "./food/FoodHome";
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import AdminTables from './components/AdminTables';
import AdminOrders from './components/AdminOrders';

function App() {
  return (
    <ShoppingCartProvider>
      <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/boardgames/:boardGame" element={<BoardGamePage />} />
            <Route path="/food" element={<FoodHome />} />

             {/* Admin Routes */}
            <Route path="/admin/tables" element={<AdminTables />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </div>
    </ShoppingCartProvider>
  );
}

export default App;
