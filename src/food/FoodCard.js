import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";
import { motion } from "framer-motion";

function FoodCard({ food }) {
  const { addToCart, decreaseCartQuantity, removeFromCart, cartItems } = useShoppingCart();

  const cartItem = cartItems.find((item) => item.id === food.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <motion.div
      className="rounded-2xl p-4 backdrop-blur-md bg-white/20 border border-white/30 shadow-lg text-white flex flex-col h-full justify-between"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <img
        src={food.imgurl}
        alt={food.name}
        className="rounded-xl object-cover w-full h-40 mb-4 shadow-md"
      />

      <div className="flex flex-col flex-grow justify-between">
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-center">{food.name}</h2>
          <p className="text-sm text-center text-white/80">{food.description}</p>
        </div>

        <div className="text-center font-bold text-yellow-200 text-lg mb-2">
          {formatCurrency(food.price)}
        </div>

        {quantityInCart === 0 ? (
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full transition"
            onClick={() => addToCart(food)}
          >
            Add to Order
          </button>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => decreaseCartQuantity(food.id)}
                className="bg-yellow-300 hover:bg-yellow-400 text-black px-3 py-1 rounded-full"
              >
                −
              </button>
              <span className="text-white">{quantityInCart} in cart</span>
              <button
                onClick={() => addToCart(food)}
                className="bg-yellow-300 hover:bg-yellow-400 text-black px-3 py-1 rounded-full"
              >
                +
              </button>
            </div>
            <button
              className="text-red-300 hover:text-red-500 text-sm underline"
              onClick={() => removeFromCart(food)}
            >
              Remove from cart
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default FoodCard;