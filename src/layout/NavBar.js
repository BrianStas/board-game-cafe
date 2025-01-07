import React, { useEffect, useState } from 'react';
import { Link, } from 'react-router-dom';
import { SignUpWithGoogle } from '../utils/Authentication';
import { useShoppingCart } from '../context/ShoppingCartContext';
import CartItem from '../food/CartItem';
import { formatCurrency } from '../utils/formatCurrency';
import { auth } from "../firebase";
import { onAuthStateChanged } from 'firebase/auth';

// you'll find links to access new food and new game forms here

function NavBar() {

    const [firebaseUserInfo, setFirebaseUserInfo] = useState(auth.currentUser);

    useEffect(() => onAuthStateChanged(auth, setFirebaseUserInfo), []);

    const {  cartItems, removeFromCart } = useShoppingCart();

    const displayName = firebaseUserInfo?.displayName || "Loading…";

    function orderHandler(){
        alert('Order placed successfully! See front desk to pick up.');
        for(let item of cartItems){
            removeFromCart(item);
        }
    }

  return (
    <div className="navbar bg-base-100">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <Link to={'/'}>Homepage</Link>
                </li>
                <li>
                    <Link to={'/boardgames'}>Board Games</Link>
                </li>
                <li>
                    <Link to={'/food'}>Order Food</Link>
                </li>
                {/* <li>
                    <Link to={'/newgame'}>New Game Form</Link>
                </li>
                <li>
                    <Link to={'/newfood'}>New Food Form</Link>
                </li> */}
            </ul>
            </div>
        </div>
        <div className="navbar-center">
            <a className="btn btn-ghost text-xl" href="/">Action Phase</a>
        </div>
        <div className="navbar-end">
            <div className="mr-4">
            {firebaseUserInfo ? <p>Welcome, {displayName}</p> : <button className="btn btn-circle mr-2" onClick={SignUpWithGoogle} >
            Sign In
            </button>}
            </div>
            <div className="drawer drawer-end w-12">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                
                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-circle "><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    fill="currentColor"
                    className="h-5 w-5"
                >
                    <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                </svg></label>
                </div>
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {cartItems.length ? 
                            <div>
                                {cartItems.map(item => (
                                    <li key={item.id}>
                                        <CartItem item={item} />
                                    </li>
                                ))}
                            </div>
                             : 
                        <li className="self-center">No items in cart.</li> }
                        {cartItems.length ? 
                        <div className="flex flex-col">
                            <div className="ms-auto font-bold">
                                Total: {formatCurrency(cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0))}
                            </div> 
                            <button className="btn btn-primary mt-4" onClick={orderHandler}>Place Order</button> 
                         </div>
                         : null
                        }
                    </ul>
                    
                    
                 
                </div>
            </div>
        </div>
    </div>
  )
}

export default NavBar