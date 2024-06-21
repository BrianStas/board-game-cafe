import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

function BoardGamePage() {

    const location = useLocation();

    const boardGameList = location.state.games;
    
    const {boardGame} = useParams();

    const bgd = boardGameList.find((game)=> game.id === boardGame)
    console.log("boardGameData: ", bgd);

    // const boardGameData = boardGames.find((boardGame) => boardGame.id === boardGame)
    // console.log("boardGameData: ", boardGameData);

    return (<div>
        <h1>{bgd.name}</h1>
        <iframe 
        width="560" 
        height="315" 
        src={bgd.ltp_url} 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen></iframe>
        <p>{bgd.description}</p>
    </div>)
}

export default BoardGamePage