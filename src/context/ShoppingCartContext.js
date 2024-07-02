import { createContext, useContext, useState } from "react";
import ShoppingCart from "./ShoppingCart";


const ShoppingCartContext= createContext({})

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}){
    const [cartItems, setCartItems] = useState([])

    function getItemQuantity(id){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id){
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null){
                return [...currItems, {id, quantity: 1}]
            } else{
                return currItems.map(item =>{
                    if(item.id === id){
                        return {...item, quantity: item.quantity++}
                    }else{
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id){
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1){
                return currItems.filter(item=>item.id !==id)
            } else{
                return currItems.map(item =>{
                    if(item.id === id){
                        return {...item, quantity: item.quantity--}
                    }else{
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id){
        setCartItems(currItems => currItems.filter(item=>item.id!==id))
    }

    return <ShoppingCartContext.Provider value={{getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart}}>
        {children}
        <ShoppingCart />
        </ShoppingCartContext.Provider>
}