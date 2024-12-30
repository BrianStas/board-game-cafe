import { ShowMore } from '@re-dev/react-truncate'
import React from 'react'
import { Link } from 'react-router-dom'

function BoardGameCard({game}) {

//this is the actual card display on lookup

  return (
    <>
        <div className="card lg:card-side h-fit bg-base-100 shadow-xl card-bordered grid grid-cols-12 grid-rows-3 grid-flow-cols mx-4">
            <figure className=" col-span-3 row-span-3"><img src={game.imgurl} alt="Movie" className='h-60 object-contain' /></figure>
            <div className="card-body col-span-8 row-span-3">
                <h2 className="card-title justify-center">{game.name}</h2>
                <ShowMore lines={3}>{game.description}</ShowMore>
                <div className="card-actions justify-end">
                <Link to={game.id} className="btn btn-primary">Learn To Play</Link>
            </div>
        </div>
        </div>
    </>
  )
}

export default BoardGameCard