import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((product) => product.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) => (
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    ));
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

  if (!existingCartItem) {
    return;
  }

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) => (
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  ));
}

const clearCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

  if (!existingCartItem) {
    return;
  }

  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  clearItemFromCart: () => { },
  cartCount: 0,
  cartTotal: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove))
  }

  const clearItemFromCart = (productToRemove) => {
    setCartItems(clearCartItem(cartItems, productToRemove));
  }

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    setCartTotal(newTotal);
  }, [cartItems]);

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartCount, cartTotal }

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}