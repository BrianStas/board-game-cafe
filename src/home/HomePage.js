import { useEffect, useState } from "react";
import { listGames } from "../utils/Api";
import SearchBar from "../layout/SearchBar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [boardGames, setBoardGames] = useState([]);
  const [firebaseUserInfo, setFirebaseUserInfo] = useState(auth.currentUser);
  const [tableNumber, setTableNumber] = useState('');
  const [sessionTime, setSessionTime] = useState('0:00');

  useEffect(() => onAuthStateChanged(auth, setFirebaseUserInfo), []);

  useEffect(() => {
    listGames()
      .then(setBoardGames)
      .then(() => setLoading(false));
  }, []);

  // Get table number and session time
  useEffect(() => {
    const savedTable = localStorage.getItem('tableNumber') || 'A-12';
    setTableNumber(savedTable);

    const sessionStart = localStorage.getItem('sessionStart') || Date.now();
    localStorage.setItem('sessionStart', sessionStart);

    // Update session time every minute
    const updateTime = () => {
      const elapsed = Date.now() - parseInt(sessionStart);
      const hours = Math.floor(elapsed / 3600000);
      const minutes = Math.floor((elapsed % 3600000) / 60000);
      setSessionTime(`${hours}:${minutes.toString().padStart(2, '0')}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const displayName = firebaseUserInfo?.displayName?.split(' ')[0] || null;
  const greeting = displayName ? `Welcome back, ${displayName}!` : 'Welcome to The Action Phase!';

  // Quick actions for common tasks
  const quickActions = [
    {
      icon: '🎲',
      title: 'Browse Games',
      description: `${boardGames.length} games available`,
      path: '/boardgames',
      gradient: 'from-purple-500 to-blue-500',
      delay: 0.5
    },
    {
      icon: '🍔',
      title: 'Order Food',
      description: 'Snacks & drinks',
      path: '/food',
      gradient: 'from-orange-500 to-red-500',
      delay: 0.6
    },
    {
      icon: '🔔',
      title: 'Call Staff',
      description: 'Need assistance?',
      action: () => alert('Staff has been notified and will assist you shortly!'),
      gradient: 'from-yellow-500 to-orange-500',
      delay: 0.7
    }
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-6xl mb-4"
        >
          🎲
        </motion.div>
        <div className="text-2xl font-bold">Loading games...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Top Info Bar */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl mb-6 flex flex-wrap gap-3 justify-center"
        >
          {/* Table Info */}
          <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl px-4 py-2 flex items-center gap-2 border border-white border-opacity-30">
            <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-white font-semibold">Table {tableNumber}</span>
          </div>

          {/* Session Time */}
          <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl px-4 py-2 flex items-center gap-2 border border-white border-opacity-30">
            <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white font-semibold">{sessionTime}</span>
          </div>

          {/* User Points (if logged in) */}
          {firebaseUserInfo && (
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl px-4 py-2 flex items-center gap-2 border border-white border-opacity-30">
              <span className="text-yellow-300 text-lg">⭐</span>
              <span className="text-white font-semibold">1,250 pts</span>
            </div>
          )}
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-5xl p-6 sm:p-8 lg:p-10 backdrop-blur-lg bg-white bg-opacity-10 rounded-3xl shadow-2xl border border-white border-opacity-20"
        >
          {/* Welcome Message */}
          <motion.div
            className="text-center mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg mb-3">
              🎲 {greeting}
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 drop-shadow-md">
              What would you like to do today?
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <SearchBar games={boardGames} />
          </motion.div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: action.delay, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => action.path ? navigate(action.path) : action.action()}
                className={`bg-gradient-to-br ${action.gradient} p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-white border border-white border-opacity-20`}
              >
                <div className="text-5xl sm:text-6xl mb-3">{action.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{action.title}</h3>
                <p className="text-sm sm:text-base opacity-90">{action.description}</p>
              </motion.button>
            ))}
          </div>

          {/* Bottom Tips */}
          <motion.div
            className="mt-8 p-4 bg-white bg-opacity-10 rounded-xl border border-white border-opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-center text-white text-sm sm:text-base">
              💡 <span className="font-semibold">Pro Tip:</span> Need help choosing a game? Our staff are game experts and love to help!
            </p>
          </motion.div>
        </motion.div>

        {/* Footer Stats */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-6 grid grid-cols-3 gap-4 w-full max-w-3xl"
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-1">{boardGames.length}+</div>
            <div className="text-xs sm:text-sm text-gray-200">Board Games</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-green-300 mb-1">12-2AM</div>
            <div className="text-xs sm:text-sm text-gray-200">Open Daily</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-blue-300 mb-1">WiFi</div>
            <div className="text-xs sm:text-sm text-gray-200">Free & Fast</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}