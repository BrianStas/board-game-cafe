import React from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utils/formatCurrency'

function CartItem({ item }) {
    const { removeFromCart } = useShoppingCart()
    return (
    <div>
        <img
            src={item.imgurl}
            className="w-14 h-14 object-cover"
        />
        <div className="me-auto font-bold">
            <div>
                {item.name} {item.quantity > 1 && (
                    <span className="text-xs font-normal">
                        x{item.quantity}
                    </span>)}
            </div>
            <div className="font-light text-xs">
                {formatCurrency(item.price)}
            </div>
        </div>
    
        <div>
            {formatCurrency(item.price * item.quantity) }
        </div>
        <button className="btn btn-xs btn-outline btn-error" onClick={() => removeFromCart(item)}>X</button>
    </div>
    )
}

export default CartItem