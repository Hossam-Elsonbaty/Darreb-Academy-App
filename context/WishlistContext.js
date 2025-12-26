// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';
// import api from '../api/axios';
// const WishlistContext = createContext();
// export const WishlistProvider = ({ children }) => {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   /* =========================
//      GET WISHLIST
//   ========================= */
//   const fetchWishlist = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/wishlist');
//       setWishlistItems(res.data || []);
//     } catch (error) {
//       console.log('Fetch wishlist error:', error.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   /* =========================
//      ADD TO WISHLIST
//   ========================= */
//   const addToWishlist = async (course) => {
//     try {
//       await api.post('/wishlist', {
//         courseId: course.id,
//       });
//       setWishlistItems((prev) => [...prev, course]);
//     } catch (error) {
//       console.log('Add wishlist error:', error.response?.data || error.message);
//     }
//   };
//   /* =========================
//      REMOVE FROM WISHLIST
//   ========================= */
//   const removeFromWishlist = async (id) => {
//     try {
//       await api.delete(`/wishlist/${id}`);
//       setWishlistItems((prev) =>
//         prev.filter(
//           (item) => item.id !== id && item.course?.id !== id
//         )
//       );
//     } catch (error) {
//       console.log(
//         'Remove wishlist error:',
//         error.response?.data || error.message
//       );
//     }
//   };
//   /* =========================
//      CHECK IF IN WISHLIST
//   ========================= */
//   const isInWishlist = (id) => {
//     return wishlistItems.some(
//       (item) => item.id === id || item.course?.id === id
//     );
//   };
//   useEffect(() => {
//     fetchWishlist();
//   }, []);
//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlistItems,
//         addToWishlist,
//         removeFromWishlist,
//         isInWishlist,
//         loading,
//         fetchWishlist,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };
// export const useWishlist = () => useContext(WishlistContext);

import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (course) => {
    setWishlistItems((prev) => {
      if (prev.some((item) => item.id === course.id)) return prev;
      return [...prev, course];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
