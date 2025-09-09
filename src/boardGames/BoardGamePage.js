import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGame } from "../utils/Api";
import { motion } from "framer-motion";

export default function BoardGamePage() {
  const [bgd, setBgd] = useState({});
  const { boardGame } = useParams();

  useEffect(() => {
    getGame(boardGame).then((data) => setBgd(data));
  }, [boardGame]);

  //this is it

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-16"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD93D]/70 to-[#6C63FF]/70 mix-blend-multiply"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-md bg-white/20 rounded-2xl shadow-2xl max-w-5xl w-full"
      >
        <div className="p-6 md:p-10 space-y-8 text-white">
          {/* Game Title */}
          <h1 className="text-4xl font-bold text-center drop-shadow-lg">
            {bgd.name}
          </h1>

          {/* Video Embed */}
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-md">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={bgd.ltp_url}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>

          {/* Game Description and Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Description */}
            <div className="md:col-span-3 text-lg leading-relaxed text-white/90">
              <p>{bgd.description}</p>
            </div>

            {/* Sidebar Stats */}
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white/30 p-4 rounded-xl text-center shadow">
                <p className="text-sm uppercase tracking-wide font-bold text-white/80">
                  Number of Players
                </p>
                <p className="text-2xl font-semibold">{`${bgd.min_players} - ${bgd.max_players}`}</p>
              </div>
              <div className="bg-white/30 p-4 rounded-xl text-center shadow">
                <p className="text-sm uppercase tracking-wide font-bold text-white/80">
                  Avg. Play Time
                </p>
                <p className="text-2xl font-semibold">30 - 60 mins</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}