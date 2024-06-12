import React, { useState } from 'react'
import Select from 'react-select'

function SearchBar({games}) {

    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };

    const options = games.map((game) => {
        return { value: game.name, label: game.name }
    })

    return (
        <form className="flex justify-center">
            {/* <label htmlFor="search" className="">    */}
            <div className="flex w-3/4 max-w-md">
                <Select
                    id="search"
                    name="search"
                    options={options}
                    placeholder="Find a Game..."
                    className="flex-grow"
                />
            </div>
            {/* </label> */}
            {/* <button type="submit" className="btn btn-secondary glass ml-4">Search</button> */}
        </form>
    )
}

export default SearchBar