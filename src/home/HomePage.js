import { useEffect, useState } from "react";
import NewGameForm from "../forms/NewGameForm";
import { listGames } from "../utils/Api";
import SearchBar from "../layout/SearchBar";

export default function HomePage() {
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

    return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-lg">
                <h1 className="mb-5 text-5xl font-bold">Welcome to The Action Phase!</h1>
                <p className="mb-5">For food orders or a game leader, please ring the bell on your table!</p>
                <SearchBar />
                <div className="mt-5 flex items-center justify-center">
                <button className="btn btn-primary mr-5 py-7 ">Game Library</button>
                <button className="btn btn-primary">Order Food</button>
                </div>
            </div>
        </div>
    </div>
    )
}