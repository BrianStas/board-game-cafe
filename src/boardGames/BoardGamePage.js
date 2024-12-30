import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getGame } from '../utils/Api';

function BoardGamePage() {

    //this is for the dedicated game page

    const [bgd, setBgd] = useState({});
    
    const {boardGame} = useParams();
    useEffect(setBoardGame, [])

    function setBoardGame() {
        getGame(boardGame)
       .then(data => setBgd(data))
    }

    return (<div className="max-w-5xl mx-auto">
        <div className="flex justify-center">
        <iframe 
        width="560" 
        height="315" 
        src={bgd.ltp_url} 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen></iframe>
        </div>
        <div className="grid grid-cols-4 gap-4 p-4 lg:mx-20">

            <div className="col-span-4 text-2xl font-bold mb-4 flex justify-center">
                {bgd.name}
            </div>

            <div className="col-span-3 mr-8">
                <p className="text-lg">
                {bgd.description}
                </p>
            </div>

            <div className="col-span-1 max-w-fit">
                <div className="bg-gray-100 p-4 rounded-lg shadow mb-4 flex flex-col items-center">
                <p className="text-sm font-bold">Number of Players</p>
                <p className="text-lg">{`${bgd.min_players} - ${bgd.max_players}`}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow flex flex-col items-center">
                <p className="text-sm font-bold">Average Play Time</p>
                <p className="text-lg">30-60 minutes</p>
                </div>
            </div>

        </div>
    </div>)
}

export default BoardGamePage