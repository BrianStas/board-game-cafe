import React from 'react'

function FoodCard({food}) {

  
  function clickHandler(){
    
  }

  return (
    <>
        <div className="card bg-base-100 w-64 shadow-xl text-center h-full">
            <figure><img src={food.imgurl} alt="Movie" className='h-40 w-40 object-cover' /></figure>
            <div className="card-body">
                <h2 className="card-title justify-center">{food.name}</h2>
                <p>{food.description}</p>
                <div className="card-actions justify-center">
                  <button className="btn btn-secondary">Order</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default FoodCard