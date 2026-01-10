import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminTables() {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);

  // Simulated table data - in production, fetch from Firebase/database
  useEffect(() => {
    const mockTables = [
      { id: 'A-1', startTime: Date.now() - 3600000, players: 4, currentGame: 'Catan', status: 'active' },
      { id: 'A-2', startTime: Date.now() - 7200000, players: 2, currentGame: 'Ticket to Ride', status: 'active' },
      { id: 'A-3', startTime: Date.now() - 1800000, players: 3, currentGame: null, status: 'active' },
      { id: 'A-4', startTime: null, players: 0, currentGame: null, status: 'available' },
      { id: 'B-1', startTime: Date.now() - 5400000, players: 5, currentGame: 'Pandemic', status: 'active' },
      { id: 'B-2', startTime: Date.now() - 900000, players: 2, currentGame: 'Azul', status: 'active' },
      { id: 'B-3', startTime: null, players: 0, currentGame: null, status: 'available' },
      { id: 'B-4', startTime: null, players: 0, currentGame: null, status: 'cleaning' },
      { id: 'C-1', startTime: Date.now() - 10800000, players: 4, currentGame: 'Gloomhaven', status: 'active' },
      { id: 'C-2', startTime: Date.now() - 2700000, players: 6, currentGame: 'Codenames', status: 'active' },
    ];
    setTables(mockTables);

    // Update every minute
    const interval = setInterval(() => {
      setTables(prev => [...prev]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatDuration = (startTime) => {
    if (!startTime) return '--:--';
    const elapsed = Date.now() - startTime;
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  const calculateCharge = (startTime) => {
    if (!startTime) return 0;
    const elapsed = Date.now() - startTime;
    const hours = Math.ceil(elapsed / 3600000);
    return hours * 8000; // ₩8,000 per hour
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'available': return 'bg-blue-600';
      case 'cleaning': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const activeTables = tables.filter(t => t.status === 'active').length;
  const totalRevenue = tables.reduce((sum, t) => sum + calculateCharge(t.startTime), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">🔒 Admin: Table Management</h1>
            <p className="text-gray-300">Real-time table status and session tracking</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg font-semibold transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-20">
            <div className="text-gray-300 text-sm mb-1">Active Tables</div>
            <div className="text-3xl font-bold">{activeTables}</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-20">
            <div className="text-gray-300 text-sm mb-1">Total Tables</div>
            <div className="text-3xl font-bold">{tables.length}</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-20">
            <div className="text-gray-300 text-sm mb-1">Occupancy Rate</div>
            <div className="text-3xl font-bold">{Math.round((activeTables / tables.length) * 100)}%</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-20">
            <div className="text-gray-300 text-sm mb-1">Current Revenue</div>
            <div className="text-3xl font-bold">₩{totalRevenue.toLocaleString()}</div>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tables.map(table => (
            <div
              key={table.id}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-5 border border-white border-opacity-20 hover:bg-opacity-20 transition-all"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold">{table.id}</div>
                <span className={`px-3 py-1 ${getStatusColor(table.status)} rounded-full text-xs font-semibold`}>
                  {table.status.toUpperCase()}
                </span>
              </div>

              {/* Session Info */}
              {table.status === 'active' ? (
                <div className="space-y-3">
                  {/* Time */}
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-lg font-semibold">{formatDuration(table.startTime)}</span>
                  </div>

                  {/* Players */}
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-gray-300">{table.players} players</span>
                  </div>

                  {/* Current Game */}
                  {table.currentGame && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                      </svg>
                      <span className="text-gray-300 text-sm truncate">{table.currentGame}</span>
                    </div>
                  )}

                  {/* Charge */}
                  <div className="pt-3 border-t border-white border-opacity-20">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Current Charge:</span>
                      <span className="text-lg font-bold text-green-400">
                        ₩{calculateCharge(table.startTime).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <button 
                    className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition-colors"
                    onClick={() => {
                      if (window.confirm(`End session for Table ${table.id}?`)) {
                        alert(`Session ended. Final charge: ₩${calculateCharge(table.startTime).toLocaleString()}`);
                      }
                    }}
                  >
                    End Session
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  {table.status === 'available' ? '🟢 Ready for customers' : '🧹 Being cleaned'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminTables;