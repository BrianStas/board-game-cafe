import { createContext, useContext, useState } from "react";


const ShoppingCartContext= createContext({})

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}){
    const [cartItems, setCartItems] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
    const openCart= () => setIsOpen(true)
    const closeCart= () => setIsOpen(false)
    console.log("open status: ", isOpen)

    async function addToCart(item){
        const cartRef = db.collection('cart').doc(item.id);
        const doc = await cartRef.get();
      
        if (doc.exists) {
          // If the item is already in the cart, increase the quantity
          cartRef.update({
            quantity: firebase.firestore.FieldValue.increment(1)
          });
        } else {
          // If the item is not in the cart, add it with quantity 1
          cartRef.set({
            ...item,
            quantity: 1
          });
        }
      };

    function getItemQuantity(id){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    async function decreaseCartQuantity(item) {
        const cartRef = db.collection('cart').doc(item.id);
        const doc = await cartRef.get();
      
        if (doc.exists) {
          const currentQuantity = doc.data().quantity;
          if (currentQuantity > 1) {
            cartRef.update({
              quantity: firebase.firestore.FieldValue.increment(-1)
            });
          } else {
            cartRef.delete();
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