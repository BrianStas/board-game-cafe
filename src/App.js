import './App.css';
import './index.css'
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";

function App() {
  return(
    <div className="App">
    
    <Routes>     
      {/* Route for all other pages */}
      <Route path="/*" element={<Layout />} />
    </Routes>
  </div>
  )
}

export default App;
