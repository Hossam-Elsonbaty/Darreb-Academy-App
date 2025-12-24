import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (course) => {
    setWishlistItems((prev) => {
      if (prev.some(item => item.id === course.id)) return prev;
      return [...prev, course];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter(item => item.id !== id));
  };

  const isInWishlist = (id) => wishlistItems.some(item => item.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
