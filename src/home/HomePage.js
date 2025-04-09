import { useEffect, useState } from "react";
import { listGames } from "../utils/Api";
import SearchBar from "../layout/SearchBar";
import { useNavigate } from "react-router-dom";

//TODO: Find new button formats and real design elements


//this is another comment

export default function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [boardGames, setBoardGames] = useState([]);

  useEffect(() => {
    listGames()
      .then(setBoardGames)
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-2xl font-bold">Loading games...</div>;
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD93D]/80 to-[#6C63FF]/80 mix-blend-multiply"></div>

      <div className="relative z-10 p-10 backdrop-blur-md bg-white/20 rounded-2xl shadow-xl text-center max-w-2xl animate-fade-in">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-md mb-4">🎲 Welcome to The Action Phase!</h1>
        <p className="text-lg text-white mb-8 drop-shadow-sm">For a game leader, please ring the bell on your table!</p>
        
        <SearchBar games={boardGames} />

        <div className="mt-10 flex justify-center space-x-6">
          <button
            onClick={() => navigate(`/boardgames`)}
            className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-4 px-6 rounded-xl shadow-md transform transition hover:scale-105 hover:shadow-xl"
          >
            🎮 Game Library
          </button>

          <button
            onClick={() => navigate(`/food`)}
            className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-4 px-6 rounded-xl shadow-md transform transition hover:scale-105 hover:shadow-xl"
          >
            🍔 Order Food
          </button>
        </div>
      </div>
    </div>
  );
}