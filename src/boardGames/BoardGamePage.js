import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGame } from "../utils/Api";
import { motion } from "framer-motion";

export default function BoardGamePage() {
  const [bgd, setBgd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const { boardGame } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getGame(boardGame)
      .then((data) => {
        setBgd(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading game:", error);
        setLoading(false);
      });
  }, [boardGame]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-white text-6xl"
        >
          🎲
        </motion.div>
      </div>
    );
  }

  if (!bgd) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center text-white p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-4">Game Not Found</h2>
          <button
            onClick={() => navigate('/boardgames')}
            className="px-6 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:bg-gray-100"
          >
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    const level = difficulty?.toLowerCase();
    if (level === 'easy' || level === 'beginner') return 'bg-green-500';
    if (level === 'medium' || level === 'intermediate') return 'bg-yellow-500';
    if (level === 'hard' || level === 'expert' || level === 'advanced') return 'bg-red-500';
    return 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 px-4 py-8 max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/boardgames')}
          className="mb-6 flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-lg font-semibold">Back to Games</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Video & Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Game Title Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {bgd.name}
              </h1>
              {bgd.tagline && (
                <p className="text-xl text-gray-200 italic">{bgd.tagline}</p>
              )}
            </motion.div>

            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white border-opacity-20"
            >
              <div className="p-4 bg-white bg-opacity-5 border-b border-white border-opacity-20">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  How to Play
                </h2>
              </div>
              
              {showVideo || !bgd.ltp_url ? (
                <div className="relative pb-[56.25%] h-0 overflow-hidden">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={bgd.ltp_url}
                    title={`How to play ${bgd.name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                </div>
              ) : (
                <div 
                  className="relative pb-[56.25%] h-0 overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600 cursor-pointer group"
                  onClick={() => setShowVideo(true)}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:bg-opacity-30 transition-all"
                    >
                      <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </motion.div>
                    <p className="text-white text-xl font-bold">Click to Watch Tutorial</p>
                    <p className="text-gray-200 text-sm mt-2">Learn to play in 10 minutes</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20"
            >
              <h2 className="text-2xl font-bold text-white mb-4">About This Game</h2>
              <p className="text-lg text-gray-200 leading-relaxed">
                {bgd.description || "A fantastic board game experience awaits!"}
              </p>
            </motion.div>
          </div>

          {/* Sidebar - Stats & Info */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 space-y-4"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Quick Info</h2>

              {/* Players */}
              <div className="bg-white bg-opacity-5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-sm text-gray-300 font-semibold uppercase">Players</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {bgd.min_players === bgd.max_players 
                    ? bgd.min_players 
                    : `${bgd.min_players} - ${bgd.max_players}`}
                </p>
                {bgd.ideal_players && (
                  <p className="text-sm text-gray-300 mt-1">Best with {bgd.ideal_players}</p>
                )}
              </div>

              {/* Play Time */}
              <div className="bg-white bg-opacity-5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-300 font-semibold uppercase">Play Time</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {bgd.playtime || bgd.avg_playtime || "30-60"} min
                </p>
              </div>

              {/* Difficulty */}
              {bgd.difficulty && (
                <div className="bg-white bg-opacity-5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-sm text-gray-300 font-semibold uppercase">Difficulty</span>
                  </div>
                  <span className={`inline-block px-4 py-2 ${getDifficultyColor(bgd.difficulty)} rounded-lg text-white font-bold`}>
                    {bgd.difficulty}
                  </span>
                </div>
              )}

              {/* Age */}
              {bgd.min_age && (
                <div className="bg-white bg-opacity-5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-300 font-semibold uppercase">Min Age</span>
                  </div>
                  <p className="text-3xl font-bold text-white">{bgd.min_age}+</p>
                </div>
              )}
            </motion.div>

            {/* Location Finder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 border border-white border-opacity-20"
            >
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-white">Find This Game</h3>
              </div>

              <div className="space-y-3">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-sm text-white opacity-80 mb-1">Shelf Location</div>
                  <div className="text-4xl font-bold text-white">
                    {bgd.shelf_location || bgd.location || "B-4"}
                  </div>
                </div>

                {bgd.zone && (
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="text-sm text-white opacity-80 mb-1">Zone</div>
                    <div className="font-semibold text-white">{bgd.zone}</div>
                  </div>
                )}

                <div className="flex items-center gap-2 p-3 bg-white bg-opacity-20 rounded-lg">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-white">Available Now</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <button
                onClick={() => alert('Staff has been notified and will bring the game to your table!')}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                🎲 Request This Game
              </button>

              <button
                onClick={() => alert('Staff will help you learn this game!')}
                className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                🎓 Get Staff Help
              </button>

              <button
                onClick={() => navigate('/boardgames')}
                className="w-full py-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold rounded-xl border-2 border-white border-opacity-50 transition-all active:scale-95"
              >
                ← Browse More Games
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}