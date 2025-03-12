import React, { useEffect, useState } from 'react'
import { listFood } from '../utils/Api';
import FoodCard from './FoodCard';

//this component is for the main food page, showing all items in the menu

//new projects, we'll see how the commits work

function FoodHome() {
    const [loading, setLoading] = useState(true);
    const [menuItems, setMenuItems] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(loadFood, []);

    function loadFood(){
        listFood()
        .then(setMenuItems)
        .then((data)=>{setLoading(false)});
        console.log("menuItems array is: ", menuItems);
    }

    if(loading){
        return <div>Loading...</div>
    }
    return (
        <div>
            <div className="flex justify-center space-x-10 ">
                <button className="btn btn-primary">Main</button>
                <button className="btn btn-primary">Sides</button>
                <button className="btn btn-primary">Snacks</button>
                <button className="btn btn-primary">Drinks</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {menuItems && menuItems.map((food)=>
                    <div key={food.id} className="my-6">
                        <FoodCard food={food} />
                    </div>
                )}   
            </div>
        </div> 
    )
}

export default FoodHome