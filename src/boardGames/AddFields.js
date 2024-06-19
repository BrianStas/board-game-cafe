import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Select from 'react-select'

function AddFields() {

    const location = useLocation();

    const [searchInput, setSearchInput] = useState("");
    console.log("search Input: ", searchInput);

    const boardGameList = location.state.boardGames;

    const options = boardGameList.map((game) => {
        return { value: game.id, label: game.name }
    })

  return (
    <div>
        <h1>Add Fields</h1>
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
    </div>
  )
}

export default AddFields