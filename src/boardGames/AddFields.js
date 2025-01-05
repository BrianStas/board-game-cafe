import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Select from 'react-select'
import { addField } from '../utils/Api';

//this file is specifically for adding fields into the board game collection

function AddFields() {

    const location = useLocation();
    
    const [searchInput, setSearchInput] = useState("");

    const initialFormData = {
        game_id: searchInput,
        field_name: "",
        field_value: "",
    }
    const [formData, setFormData] = useState(initialFormData);

    const boardGameList = location.state.boardGames;

    const options = boardGameList.map((game) => {
        return { value: game.id, label: game.name }
    })

    async function handleSubmit(event) {
        event.preventDefault();
        await addField(formData.game_id, formData.field_name, formData.field_value);
        console.log("submitted!", formData);
        setFormData(initialFormData);
    }

    function handleInput(event) {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      }

  return (
    <div>
        <h1>Add Fields</h1>
        <form className="flex flex-col items-center"
        onSubmit={handleSubmit}>
            {/* <label htmlFor="search" className="">    */}
            <div className="form-group w-full">
                <div className="flex w-3/4 max-w-md">
                    <Select
                        id="game_id"
                        name="game_id"
                        options={options}
                        placeholder="Find a Game..."
                        className="flex-grow"
                        onChange={(choice) =>{console.log("new choice: ", choice); setFormData({...formData, game_id: choice.value}); setSearchInput(choice.value);}}
                    />
                </div>
                <div className="form-group mb-4">
                    <label
                        htmlFor="field_name"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        What is the field name?
                    </label>
                    <input
                        type="text"
                        className="form-control bg-white text-black"
                        id="field_name"
                        name="field_name"
                        onChange={handleInput}
                        value={formData.field_name}
                        placeholder="Field Name"
                    />
                </div>
                <div className="form-group mb-4">
                    <label
                        htmlFor="field_value"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        What is the field value?
                    </label>
                    <input
                        type="text"
                        className="form-control bg-white text-black"
                        id="field_value"
                        name="field_value"
                        onChange={handleInput}
                        value={formData.field_value}
                        placeholder="Field Value"
                    />
                </div>
            </div>
            {/* </label> */}
            <button type="submit" className="btn btn-secondary glass ml-4">Submit</button>
        </form>
    </div>
  )
}

export default AddFields