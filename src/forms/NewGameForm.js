import React from 'react'
import { useState } from "react";
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

//this page is specifically for adding new board games but shouldn't be available to users

//this is a comment

function NewGameForm() {
 
  const initialFormData = {
    name: "",
    imgurl: "",
    min_players: 0,
    max_players: 0,
    complexity_level: 0,
    description: "",
  };
  
  const [formData, setFormData] = useState(initialFormData);

  function handleInput(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await addDoc(collection(db, "BoardGames"), formData);
    console.log("submitted!", formData);
    setFormData(initialFormData);
  }

  return (
    <div className="flex items-center justify-center min-h-full md:py-20">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 bg-gray-100 p-8 rounded-lg shadow-md"
      >
        <h1 className="text-2xl text-bold mb-4 text-center">New Board Game</h1>

        <div className="form-group mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-bold mb-2"
          >
            Game Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label
            htmlFor="imgurl"
            className="block text-gray-700 font-bold mb-2"
          >
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="imgurl"
            name="imgurl"
            value={formData.imgurl}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label
            htmlFor="min_players"
            className="block text-gray-700 font-bold mb-2"
          >
            Minimum number of players
          </label>
          <input
            type="number"
            className="form-control bg-white text-black"
            id="min_players"
            name="min_players"
            onChange={handleInput}
            value={formData.min_players}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label
            htmlFor="max_players"
            className="block text-gray-700 font-bold mb-2"
          >
           Maximum number of players
          </label>
          <input
            type="number"
            className="form-control bg-white text-black"
            id="max_players"
            name="max_players"
            onChange={handleInput}
            value={formData.max_players}
          />
        </div>

        <div className="form-group mb-4">
          <label
            htmlFor="complexity_level"
            className="block text-gray-700 font-bold mb-2"
          >
           Game complexity level
          </label>
          <input
            type="number"
            className="form-control bg-white text-black"
            id="complexity_level"
            name="complexity_level"
            onChange={handleInput}
            value={formData.complexity_level}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
           Game Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInput}
            rows="4"
            cols="50"
            required
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="btn bg-turqoise hover:bg-sky-400 border-0 text-off-white px-9 mr-3">
            Submit
          </button>
          <button
            type="button"
            className="btn border-black bg-gray-400 text-off-white border-0 mr-3 px-9"
            
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewGameForm