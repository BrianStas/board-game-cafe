import React from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utils/formatCurrency'

function CartItem({ item }) {
    const { removeFromCart } = useShoppingCart()

    return (
        <div className="flex items-center justify-between bg-base-200 rounded-xl p-4 shadow-sm mb-3">
            <img
                src={item.imgurl}
                alt={item.name}
                className="w-16 h-16 rounded-md object-cover mr-4"
            />
            <div className="flex-1">
                <div className="font-semibold text-sm md:text-base">
                    {item.name}
                    {item.quantity > 1 && (
                        <span className="text-xs text-gray-500 font-normal ml-1">
                            × {item.quantity}
                        </span>
                    )}
                </div>
                <div className="text-xs text-gray-500">
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div className="text-right mr-4 text-sm font-medium">
                {formatCurrency(item.price * item.quantity)}
            </div>
            <button
                className="btn btn-sm btn-outline btn-error"
                onClick={() => removeFromCart(item)}
            >
                Remove
            </button>
        </div>
    )
}

export default CartItem