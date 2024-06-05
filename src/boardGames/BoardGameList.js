import React, { useEffect, useState } from 'react'
import { listGames } from '../utils/Api';

function BoardGameList() {
    const [loading, setLoading] = useState(true);
    const [boardGames, setBoardGames] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(loadGames, []);

    function loadGames(){
        listGames()
        .then(setBoardGames)
        .then((data)=>setLoading(false));
        console.log("boardGames array is: ", boardGames);
    }

    if(loading){
        return <div>Loading...</div>
    }
    return (<>
        <div>BoardGameList</div>
        {boardGames && boardGames.map((game)=>{
            return <div key={game.id}>{game.name}</div>
        })}
        </>)
}

export default BoardGameList