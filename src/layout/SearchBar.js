import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'

//react-select is a specific react library for this functionality

function SearchBar({games}) {

    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
 

    const options = games.map((game) => {
        return { value: game.id, label: game.name }
    })

    const clickHandler = () => {
        console.log("search input click: ", searchInput)
        navigate(`/boardgames/${searchInput.value}`)
    }

    return (<div>
        <form className="flex justify-center">
           
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
            
        </form>
        <button className="btn btn-primary mt-5" onClick={clickHandler}>Learn to Play!</button>
        </div>
    )
}

export default SearchBar