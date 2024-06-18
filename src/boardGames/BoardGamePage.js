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

    return (
        <div>{bgd.name}</div>
    )
}

export default BoardGamePage