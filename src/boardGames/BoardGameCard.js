import React from 'react'

function BoardGameCard({game}) {
  return (
    <>
        <div className="card lg:card-side bg-base-100 shadow-xl card-bordered">
            <figure><img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
            <div className="card-body">
                <h2 className="card-title">{game.name}</h2>
                <p>{game.description}</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Learn To Play</button>
            </div>
        </div>
        </div>
    </>
  )
}

export default BoardGameCard