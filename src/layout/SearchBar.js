import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'

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
    )
}

export default SearchBar