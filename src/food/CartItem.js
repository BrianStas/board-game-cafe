import React from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'

function CartItem({ id, quantity }) {
   const {removeFromCart } = useShoppingCart()
   const item =
   

   return (
    <img src={item.imgurl} style={{width: "125px", height:"75px", objectFit:"cover"}} />
   )
}

export default CartItem