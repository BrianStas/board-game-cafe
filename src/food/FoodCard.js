import React from 'react'

function FoodCard({food}) {
  return (
    <>
        <div className="card lg:card-side h-60 bg-base-100 shadow-xl card-bordered grid grid-cols-12 grid-rows-3 grid-flow-cols">
            <figure className=" col-span-3 row-span-3"><img src={food.imgurl} alt="Movie" className='max-h-full object-contain' /></figure>
            <div className="card-body col-span-8 row-span-3">
                <h2 className="card-title justify-center">{food.name}</h2>
                <p>{food.description}</p>
                <div className="card-actions justify-end">
                <button className="btn btn-secondary">Order</button>
            </div>
        </div>
        </div>
    </>
  )
}

export default FoodCard