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
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center">
        {boardGames && boardGames.map((game)=>
            <div key={game.id} className=" my-6 w-full">
                <BoardGameCard game={game} />
            </div>
        )}
        </div>
        </>)
}

export default BoardGameList