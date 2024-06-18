import { useEffect, useState } from "react";
import { listGames } from "../utils/Api";
import SearchBar from "../layout/SearchBar";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'

export default function HomePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [boardGames, setBoardGames] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(loadGames, []);

    const options = boardGames.map((game) => {
        return { value: game.id, label: game.name }
    })

    function loadGames(){
        listGames()
        .then(setBoardGames)
        .then((data)=>{setLoading(false)});
        console.log("boardGames array is: ", boardGames);
    }

    const clickHandler = () => {
        console.log("search input click: ", searchInput)
        navigate(`/boardgames/${searchInput.value}`, {state: {boardGames}})
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
                <div>
                    <form className="flex justify-center">
                        {/* <label htmlFor="search" className="">    */}
                        <div className="flex w-3/4 max-w-md">
                            <Select
                                id="search"
                                name="search"
                                options={options}
                                placeholder="Find a Game..."
                                className="flex-grow"
                                onChange={(choice) =>{console.log("new choice: ", choice); setSearchInput(choice)}}
                            />
                        </div>
                        
                        {/* </label> */}
                        {/* <button type="submit" className="btn btn-secondary glass ml-4">Search</button> */}
                    </form>
                    <button className="btn btn-primary mt-5" onClick={clickHandler}>Learn to Play!</button>
                    </div>
                <div className="mt-10 flex justify-center space-x-10">
                <button 
                    className="btn btn-primary py-10 content-center"
                    onClick={()=> navigate(`/boardgames`)}>Game Library</button>
                <button className="btn btn-primary py-10 content-center">Order Food</button>
                </div>
            </div>
        </div>
    </div>
    )
}