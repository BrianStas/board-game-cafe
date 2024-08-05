import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, doc, FieldValue, onSnapshot } from "firebase/firestore";


const ShoppingCartContext= createContext({})

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}){
    const [cartItems, setCartItems] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const cartRef= collection(db, 'cart')

    useEffect(() => {
      onSnapshot
        
        console.log("cart items: ", cartItems)
    }, []);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
    const openCart= () => setIsOpen(true)
    const closeCart= () => setIsOpen(false)
    console.log("open status: ", isOpen)

    async function addToCart(item){
        const itemRef = doc(db, 'cart', item.id);
        const docRef = await itemRef.get();
      
        if (docRef.exists) {
          // If the item is already in the cart, increase the quantity
          await itemRef.update({
            quantity: FieldValue.increment(1)
          });
        } else {
          // If the item is not in the cart, add it with quantity 1
          itemRef.set({
            ...item,
            quantity: 1
          });
        }
      };

    function getItemQuantity(id){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    async function decreaseCartQuantity(item) {
        const itemRef = doc(db, 'cart', item.id);
        const docRef = await cartRef.get();
      
        if (docRef.exists) {
          const currentQuantity = docRef.data().quantity;
          if (currentQuantity > 1) {
            await itemRef.update({
              quantity: FieldValue.increment(-1)
            });
          } else {
            itemRef.delete();
          }
        }
      };

    function removeFromCart(id){
        setCartItems(currItems => currItems.filter(item=>item.id!==id))
    }

    return <ShoppingCartContext.Provider value={{
        getItemQuantity, 
        addToCart, 
        decreaseCartQuantity, 
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart}}>
        {children}
        </ShoppingCartContext.Provider>
}