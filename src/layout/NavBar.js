import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SignUpWithGoogle } from '../utils/Authentication';
import { useShoppingCart } from '../context/ShoppingCartContext';
import CartItem from '../food/CartItem';
import { formatCurrency } from '../utils/formatCurrency';
import { auth } from "../firebase";
import { onAuthStateChanged } from 'firebase/auth';

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useShoppingCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const [firebaseUserInfo, setFirebaseUserInfo] = useState(auth.currentUser);
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => onAuthStateChanged(auth, setFirebaseUserInfo), []);

  // Get table number from localStorage or session
  useEffect(() => {
    const savedTable = localStorage.getItem('tableNumber') || 'A-12';
    setTableNumber(savedTable);
  }, []);

  const displayName = firebaseUserInfo?.displayName || null;
  const userPoints = 1250; // Would come from Firebase/database in production

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity), 
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity, 
    0
  );

  // Calculate points earned (1 point per 1000 won spent)
  const pointsToEarn = Math.floor(totalAmount / 1000);

  function orderHandler() {
    // Generate random order number for pickup
    const newOrderNumber = Math.floor(Math.random() * 9000) + 1000;
    
    const orderData = {
      orderNumber: newOrderNumber,
      tableNumber,
      userId: firebaseUserInfo?.uid || 'guest',
      userName: displayName || 'Guest',
      items: cartItems,
      total: totalAmount,
      pointsEarned: pointsToEarn,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    console.log('Order placed:', orderData);
    
    // In production, send to backend/Firebase:
    // await addDoc(collection(db, 'orders'), orderData);
    // if (firebaseUserInfo) {
    //   await updateDoc(doc(db, 'users', firebaseUserInfo.uid), {
    //     points: increment(pointsToEarn)
    //   });
    // }

    setOrderNumber(newOrderNumber);
    
    // Clear cart after slight delay to show confirmation
    setTimeout(() => {
      cartItems.forEach(item => removeFromCart(item));
      setIsCartOpen(false);
    }, 3000);
  }

  const isActive = (path) => location.pathname === path;

  // Check if user is admin (in production, check from Firebase custom claims)
  const isAdmin = firebaseUserInfo?.email === 'admin@actionphase.com'; // Replace with actual admin check

  return (
    <>
      {/* Main Navbar */}
      <nav className="sticky top-0 z-40 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white shadow-lg border-b border-white border-opacity-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Menu Button */}
            <div className="flex items-center gap-4">
              <div className="dropdown dropdown-bottom">
                <button 
                  tabIndex={0} 
                  className="btn btn-ghost btn-circle hover:bg-white hover:bg-opacity-20"
                  aria-label="Menu"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M4 6h16M4 12h16M4 18h7" 
                    />
                  </svg>
                </button>
                
                <ul 
                  tabIndex={0} 
                  className="dropdown-content menu mt-3 z-[51] p-2 shadow-2xl bg-gray-900 rounded-2xl w-64 border border-white border-opacity-20"
                >
                  <li>
                    <Link 
                      to="/" 
                      className={`text-lg py-3 rounded-lg ${isActive('/') ? 'bg-purple-600' : 'hover:bg-white hover:bg-opacity-10'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/boardgames" 
                      className={`text-lg py-3 rounded-lg ${isActive('/boardgames') ? 'bg-purple-600' : 'hover:bg-white hover:bg-opacity-10'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                      </svg>
                      Browse Games
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/food" 
                      className={`text-lg py-3 rounded-lg ${isActive('/food') ? 'bg-purple-600' : 'hover:bg-white hover:bg-opacity-10'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Order Food
                    </Link>
                  </li>
                  
                  {/* Admin Only Section */}
                  {isAdmin && (
                    <>
                      <div className="divider my-1"></div>
                      <li>
                        <Link 
                          to="/admin/tables" 
                          className={`text-lg py-3 rounded-lg bg-red-900 bg-opacity-30 hover:bg-red-800 ${isActive('/admin/tables') ? 'bg-red-600' : ''}`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          Admin: View Tables
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/admin/orders" 
                          className={`text-lg py-3 rounded-lg bg-red-900 bg-opacity-30 hover:bg-red-800 ${isActive('/admin/orders') ? 'bg-red-600' : ''}`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          Admin: Manage Orders
                        </Link>
                      </li>
                    </>
                  )}
                  
                  <div className="divider my-1"></div>
                  <li>
                    <button 
                      className="text-lg py-3 rounded-lg hover:bg-yellow-600"
                      onClick={() => alert('Staff has been notified and will assist you shortly!')}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      Call Staff
                    </button>
                  </li>
                </ul>
              </div>

              {/* Table Number Display */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white bg-opacity-20 rounded-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-semibold">Table {tableNumber}</span>
              </div>
            </div>

            {/* Center: Logo/Brand */}
            <Link 
              to="/" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                🎲
              </div>
              <span className="text-xl font-bold hidden md:block">Action Phase</span>
            </Link>

            {/* Right: User Info & Cart */}
            <div className="flex items-center gap-3">
              {/* User Section */}
              {firebaseUserInfo ? (
                <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-white bg-opacity-20 rounded-lg">
                  <div className="text-right">
                    <div className="text-sm font-semibold">{displayName}</div>
                    <div className="text-xs text-yellow-300">⭐ {userPoints.toLocaleString()} pts</div>
                  </div>
                </div>
              ) : (
                <button 
                  className="hidden md:flex btn btn-sm bg-white bg-opacity-20 hover:bg-opacity-30 border-none text-white"
                  onClick={SignUpWithGoogle}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                  Sign In
                </button>
              )}

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative btn btn-ghost btn-circle hover:bg-white hover:bg-opacity-20"
                aria-label="Shopping cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
          onClick={() => setIsCartOpen(false)}
        >
          <div 
            className="w-full max-w-md bg-gray-900 h-full overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cart Header */}
            <div className="bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-white">Your Order</h2>
                <p className="text-sm text-gray-400">Table {tableNumber}</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="p-8 text-center text-white">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-400 mb-4">Your cart is empty</p>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/food');
                    }}
                    className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold transition-colors"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : orderNumber ? (
                // Order Confirmation
                <div className="p-8 text-center text-white">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold mb-2">Order Placed!</h3>
                  <div className="bg-white bg-opacity-10 rounded-xl p-6 mb-4">
                    <div className="text-sm text-gray-400 mb-2">Your Order Number</div>
                    <div className="text-5xl font-bold text-orange-400">#{orderNumber}</div>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Please pick up your order at the front desk when your number is called.
                  </p>
                  {firebaseUserInfo && (
                    <div className="bg-yellow-600 bg-opacity-20 rounded-lg p-4 mb-4">
                      <div className="text-sm text-yellow-200">🎉 You earned {pointsToEarn} points!</div>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setOrderNumber(null);
                      setIsCartOpen(false);
                    }}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {cartItems.map(item => (
                    <div key={item.id}>
                      <CartItem item={item} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer - Only show if items exist and no order placed yet */}
            {cartItems.length > 0 && !orderNumber && (
              <div className="bg-gray-800 p-4 border-t border-gray-700 space-y-4">
                {/* Points Info for Logged In Users */}
                {firebaseUserInfo && (
                  <div className="bg-yellow-600 bg-opacity-20 rounded-lg p-3 text-sm">
                    <div className="flex justify-between text-yellow-200">
                      <span>Current Points:</span>
                      <span className="font-bold">{userPoints.toLocaleString()} pts</span>
                    </div>
                    <div className="flex justify-between text-yellow-200">
                      <span>You'll Earn:</span>
                      <span className="font-bold">+{pointsToEarn} pts</span>
                    </div>
                  </div>
                )}
                
                {/* Total */}
                <div className="flex justify-between items-center text-xl font-bold text-white">
                  <span>Total:</span>
                  <span className="text-orange-400">{formatCurrency(totalAmount)}</span>
                </div>
                
                {/* Place Order Button */}
                <button
                  onClick={orderHandler}
                  className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-xl font-bold text-lg text-white transition-all active:scale-95 shadow-lg"
                >
                  Place Order
                </button>
                
                <p className="text-xs text-center text-gray-400">
                  Pick up at front desk • Table {tableNumber}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;