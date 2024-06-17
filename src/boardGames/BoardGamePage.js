import React from 'react'
import { useParams } from 'react-router-dom'

function BoardGamePage({boardGames}) {

    const {boardGame} = useParams();

    return (
        <div>BoardGamePage</div>
    )
}

export default BoardGamePage