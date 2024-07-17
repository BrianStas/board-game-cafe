import React from 'react';
import { Link, } from 'react-router-dom';
import { SignUpWithGoogle } from '../utils/Authentication';
import ShoppingCart from '../context/ShoppingCart';
import { useShoppingCart } from '../context/ShoppingCartContext';

function NavBar() {

    const { openCart, cartQuantity } = useShoppingCart();

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
                    <Link to={'/newgame'}>New Game Form</Link>
                </li>
                <li>
                    <Link to={'/newfood'}>New Food Form</Link>
                </li>
            </ul>
            </div>
        </div>
        <div className="navbar-center">
            <a className="btn btn-ghost text-xl" href="/">Action Phase</a>
        </div>
        <div className="navbar-end">
            <button className="btn btn-ghost btn-circle" onClick={SignUpWithGoogle} >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            {cartQuantity > 0 && <button className="btn btn-ghost btn-circle" onClick={openCart}>
            <div className="indicator">
            <ShoppingCart />
            {/* TODO: Sign-in button here with profile picture for those signed in */}
                <span className="badge badge-s badge-primary indicator-item indicator-bottom indicator-start">{cartQuantity}</span>
            </div>
            </button>}
        </div>
    </div>
  )
}

export default NavBar