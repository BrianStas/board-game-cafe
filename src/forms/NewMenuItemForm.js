import React from 'react'
import { useState } from "react";
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

//this page is for adding menu items by admin

function NewMenuItemForm() {
 
  const initialFormData = {
    name: "",
    imgurl: "",
    description: "",
    price: 0,
    category: ""
  };
  

  const [formData, setFormData] = useState(initialFormData);

  function handleInput(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleNumberInput(event){
    setFormData({
     ...formData,
      [event.target.name]: Number(event.target.value),
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await addDoc(collection(db, "MenuCollection"), formData);
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
            Menu Item Name
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
            htmlFor="price"
            className="block text-gray-700 font-bold mb-2"
          >
           Item Price
          </label>
          <input
            type="number"
            className="form-control bg-white text-black"
            id="price"
            name="price"
            onChange={handleNumberInput}
            value={formData.price}
          />
        </div>

        <div className="form-group mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-bold mb-2"
          >
           Item Category
          </label>
          <input
            type="text"
            className="form-control bg-white text-black"
            id="category"
            name="category"
            onChange={handleInput}
            value={formData.category}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
           Food Description
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

export default NewMenuItemForm