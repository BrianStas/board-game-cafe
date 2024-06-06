import React, { useEffect, useState } from 'react'
import { listGames } from '../utils/Api';
import BoardGameCard from './BoardGameCard';

function BoardGameList() {
    const [loading, setLoading] = useState(true);
    const [boardGames, setBoardGames] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(loadGames, []);

    function loadGames(){
        listGames()
        .then(setBoardGames)
        .then((data)=>{setLoading(false)});
        console.log("boardGames array is: ", boardGames);
    }

    if(loading){
        return <div>Loading...</div>
    }
    return (<>
        <div>BoardGameList</div>
        {boardGames && boardGames.map((game)=>
            <div key={game.id} className="grid grid-cols-1 my-6">
                <BoardGameCard game={game} />
            </div>
        )}
        </>)
}

export default BoardGameList