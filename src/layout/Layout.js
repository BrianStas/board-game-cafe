import React from "react";
import Routing from "./Routing";
import NavBar from "./NavBar";

function Layout() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div>
          <NavBar />
        </div> 
        
        <main className="flex-1">
          <Routing />
        </main>
        <div>
            
        </div>
      </div>
    </div>
  );
}

export default Layout;