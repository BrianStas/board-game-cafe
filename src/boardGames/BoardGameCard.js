import React from 'react'

function BoardGameCard({game}) {
  return (
    <>
        <div className="card lg:card-side h-60 bg-base-100 shadow-xl card-bordered grid grid-cols-12 grid-rows-3 grid-flow-cols">
            <figure className=" col-span-3 row-span-3"><img src={game.imgurl} alt="Movie" className='max-h-full object-contain' /></figure>
            <div className="card-body col-span-8 row-span-3">
                <h2 className="card-title justify-center">{game.name}</h2>
                <p>{game.description}</p>
                <div className="card-actions justify-end">
                <button className="btn btn-secondary">Learn To Play</button>
            </div>
        </div>
        </div>
    </>
  )
}

export default BoardGameCard