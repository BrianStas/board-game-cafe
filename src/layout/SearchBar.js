import React, { useState } from 'react'

function SearchBar() {

    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };

    return (
        <form className="flex justify-center">
            {/* <label htmlFor="search" className="">    */}
            <div className="flex w-3/4 max-w-md">
                <input
                    id="search"
                    name="search"
                    onChange={handleChange}
                    value={searchInput}
                    type="text"
                    placeholder="Find a Game..."
                    className="input input-bordered flex-grow"
                ></input>
            </div>
            {/* </label> */}
            <button type="submit" className="btn btn-secondary glass ml-4">Search</button>
        </form>
    )
}

export default SearchBar