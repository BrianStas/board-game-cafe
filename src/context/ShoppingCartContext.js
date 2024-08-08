import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, deleteDoc, doc, FieldValue, getDoc, increment, limit, onSnapshot, query, setDoc, updateDoc } from "firebase/firestore";


const ShoppingCartContext= createContext({})

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}){
    
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, 'cart'), snapshot => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCartItems(items);
      });
  
      return () => unsubscribe();
    }, []);

    
    const openCart= () => setIsOpen(true)
    const closeCart= () => setIsOpen(false)
    console.log("open status: ", isOpen)

    async function addToCart(item){
      try{
      console.log("in the try block");

      const snapshot =query(collection(db, 'cart'), limit(1));
      
      if (snapshot.empty) {
        console.log("empty snapshot")
        await setDoc(doc(db, 'cart', item.id), {
          ...item,
          quantity: 1
        });
      }else{
        const cartRef = doc(db, 'cart', item.id);
        const docSnap = await getDoc(cartRef);
        console.log("docSnap successful: ", docSnap)
      
        if (docSnap.exists()) {
          await updateDoc(cartRef, {
            quantity: increment(1)
          });
        } else {
          await setDoc(cartRef, {
            ...item,
            quantity: 1
          });
        }
      }}catch (err) {
        console.error("error increasing quantity: ", err);
      }
    };

    // function getItemQuantity(id){
    //     return cartItems.find(item => item.id === id)?.quantity || 0
    // }

    async function decreaseCartQuantity(itemId){
      try{
      const cartRef = doc(db, 'cart', itemId);
      const docSnap = await getDoc(cartRef);
    
      if (docSnap.exists()) {
        const currentQuantity = docSnap.data().quantity;
        if (currentQuantity > 1) {
          await updateDoc(cartRef, {
            quantity: increment(-1)
          });
        } else {
          await deleteDoc(cartRef);
        }
      }} catch (err) {
        console.error("error decreasing quantity: ", err);
      }
    };

    async function removeFromCart(item){
      const cartRef = doc(db, 'cart', item.id);
      await deleteDoc(cartRef);
      
    }


    return <ShoppingCartContext.Provider value={{ 
        addToCart, 
        decreaseCartQuantity, 
        removeFromCart,
        openCart,
        cartItems,
        closeCart}}>
        {children}
        </ShoppingCartContext.Provider>
}