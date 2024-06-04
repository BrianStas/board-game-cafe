import React from "react";
import Routing from "./Routing";

function Layout() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div>
          
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