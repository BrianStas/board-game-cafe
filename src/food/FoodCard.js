import React from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'

function FoodCard({food}) {

  const { addToCart, decreaseCartQuantity, removeFromCart, cartItems } = useShoppingCart()
  
  const cartItem = cartItems.find(cartItem => cartItem.id === food.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  

  return (
    <>
        <div className="card bg-base-100 w-64 shadow-xl text-center h-full">
            <figure><img src={food.imgurl} alt="Movie" className='h-40 w-40 object-cover' /></figure>
            <div className="card-body">
                <h2 className="card-title justify-center">{food.name}</h2>
                <p>{food.description}</p>
                <div className="card-actions justify-center">
                  {quantityInCart === 0 ? (
                    <button className="btn btn-secondary" onClick={()=> addToCart(food)}>Order</button>
                  ) : <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center justify-content-center">
                        <button className="btn btn-secondary" onClick={()=> decreaseCartQuantity(food.id)}>-</button>
                        <div>
                        <span className="fs-3">{quantityInCart}</span> in cart
                        </div>
                        <button className="btn btn-secondary" onClick={()=> addToCart(food)}>+</button>
                      </div>
                      <button className="btn btn-danger" onClick={()=> removeFromCart(food)}>Remove</button>
                    </div>}
                </div>
            </div>
        </div>
    </>
  )
}

export default FoodCard