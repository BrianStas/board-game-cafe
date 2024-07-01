import './App.css';
import './index.css'
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { ShoppingCartProvider } from './context/ShoppingCartContext';

function App() {
  return(
    <ShoppingCartProvider>
      <div className="App">
    
        <Routes>     
          {/* Route for all other pages */}
          <Route path="/*" element={<Layout />} />
        </Routes>
      </div>
    </ShoppingCartProvider>
  )
}

export default App;
