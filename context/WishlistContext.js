import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  /* =========================
      GET WISHLIST
  ========================= */
  const getWishlist = async () => {
    try {
      setLoading(true);
      const res = await api.get('/wishlist');
      setWishlist(res.data.items || []);
    } catch (err) {
      console.log('Get wishlist error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  /* =========================
      ADD TO WISHLIST
  ========================= */
  const addToWishlist = async (course) => {
    setWishlist((prev) => [...prev, { course }]);

    try {
      await api.post('/wishlist', {
        courseId: course._id,
      });
    } catch (err) {
      console.log('Add wishlist error:', err.response?.data || err.message);
    }
  };

  /* =========================
      REMOVE FROM WISHLIST
  ========================= */
  const removeFromWishlist = async (courseId) => {
    setWishlist((prev) =>
      prev.filter((item) => item.course._id !== courseId)
    );

    try {
      await api.delete(`/wishlist/${courseId}`);
    } catch (err) {
      console.log('Remove wishlist error:', err.response?.data || err.message);
    }
  };

  /* =========================
      TOGGLE WISHLIST
  ========================= */
  const toggleWishlist = async (course) => {
    const exists = wishlist.some(
      (item) => item.course._id === course._id
    );

    if (exists) {
      await removeFromWishlist(course._id);
    } else {
      await addToWishlist(course);
    }
  };

  /* =========================
      CHECK IF IN WISHLIST
  ========================= */
  const isInWishlist = (courseId) => {
    return wishlist.some(
      (item) => item.course._id === courseId
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        getWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
