import React, { useState, createContext } from "react";

export const CartCounterContext = createContext();

export const CartCounterProvider = ({ children }) => {
  // localStorage.clear();
  var cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  var totalItems = 0;
  cartItems.forEach(function (item, index) {
    totalItems = totalItems + item.quantity;
  });
  const [currentCount, setCurrentCount] = useState(totalItems);

  return (
    <CartCounterContext.Provider value={{ currentCount, setCurrentCount }}>
      {children}
    </CartCounterContext.Provider>
  );
};
