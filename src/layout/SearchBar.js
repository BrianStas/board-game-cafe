import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function SearchBar({ games }) {
  const [searchInput, setSearchInput] = useState(null);
  const navigate = useNavigate();

  // Map games to react-select options
  const options = games.map((game) => ({
    value: game.id,
    label: game.name
  }));

  // Handle form submission (Enter key or button click)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!searchInput) {
      alert('Please select a game first!');
      return;
    }

    console.log("Navigating to game:", searchInput);
    navigate(`/boardgames/${searchInput.value}`); // FIXED: Proper function call
  };

  // Custom styles for react-select to match your theme
  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: state.isFocused ? '#8B5CF6' : '#D1D5DB',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(139, 92, 246, 0.1)' : 'none',
      '&:hover': {
        borderColor: '#8B5CF6'
      },
      minHeight: '48px', // Touch-friendly height
      fontSize: '16px',
      borderRadius: '12px'
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? '#8B5CF6' 
        : state.isFocused 
        ? '#EDE9FE' 
        : 'white',
      color: state.isSelected ? 'white' : '#1F2937',
      padding: '12px 16px',
      cursor: 'pointer',
      fontSize: '16px'
    }),
    placeholder: (base) => ({
      ...base,
      color: '#9CA3AF',
      fontSize: '16px'
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
    })
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        {/* Search Select */}
        <div className="w-full max-w-md">
          <Select
            id="search"
            name="search"
            options={options}
            placeholder="🔍 Find a Game..."
            className="w-full"
            styles={customStyles}
            value={searchInput}
            onChange={(choice) => {
              console.log("Game selected:", choice);
              setSearchInput(choice);
            }}
            isClearable
            isSearchable
            noOptionsMessage={() => "No games found"}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!searchInput}
          className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 ${
            searchInput
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:from-yellow-500 hover:to-orange-600 hover:shadow-xl hover:scale-105 active:scale-95'
              : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
          }`}
        >
          {searchInput ? `📚 Learn to Play ${searchInput.label}!` : '📚 Learn to Play!'}
        </button>
      </form>

      {/* Helper Text */}
      {searchInput && (
        <p className="text-center text-white text-sm mt-3 opacity-80">
          Press Enter or click the button to continue
        </p>
      )}
    </div>
  );
}

export default SearchBar;