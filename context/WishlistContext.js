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

// import React, { createContext, useContext, useState } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

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
