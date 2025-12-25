// import React, { createContext, useContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import api from '../api/axios';
// import { useLanguage } from '../context/LanguageContext';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [isCartLoading, setIsCartLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState('success');
//   const [modalMessage, setModalMessage] = useState('');
//   const { language } = useLanguage();

//   const getCart = async () => {
//     const token = await AsyncStorage.getItem('token');
//     if (!token) {
//       setIsCartLoading(false);
//       return;
//     }

//     setIsCartLoading(true);
//     try {
//       const res = await api.get('/cart');
//       setCartItems(Array.isArray(res.data.cart) ? res.data.cart : []);
//       console.log('Cart from server:', res.data.cart);
//     } catch (err) {
//       console.log('Get cart error:', err);
//     } finally {
//       setIsCartLoading(false);
//     }
//   };

//   const addToCart = async (course) => {
//     const token = await AsyncStorage.getItem('token');
//     if (!token) return;

//     try {
//       await api.post('/cart', { courseId: course._id });

//       // تحديث فورى للـ UI مع thumbnail
//       setCartItems(prev => [...prev, { course }]);

//       setModalType('success');
//       setModalMessage(language === 'en' ? 'Course added to cart!' : 'تمت إضافة الكورس إلى سلة التسوق!');
//       setShowModal(true);
//     } catch (error) {
//       const message = error.response?.data?.message || '';
//       setModalType('error');
//       setModalMessage(language === 'en' ? message || 'Failed to add course.' : message || 'فشل في إضافة الكورس.');
//       setShowModal(true);
//     }
//   };

//   const removeFromCart = async (courseId) => {
//     const token = await AsyncStorage.getItem('token');
//     if (!token) return;

//     try {
//       await api.delete('/cart', { data: { courseId } });
//       setCartItems(prev => prev.filter(item => item.course._id !== courseId));
//       setModalType('success');
//       setModalMessage(language === 'en' ? 'Course removed from cart!' : 'تمت إزالة الكورس من سلة التسوق!');
//       setShowModal(true);
//     } catch (error) {
//       setModalType('error');
//       setModalMessage(language === 'en' ? 'Failed to remove course.' : 'فشل في إزالة الكورس.');
//       setShowModal(true);
//     }
//   };

//   useEffect(() => {
//     getCart();
//   }, []);

//   return (
//     <CartContext.Provider value={{
//       cartItems,
//       isCartLoading,
//       addToCart,
//       removeFromCart,
//       showModal,
//       setShowModal,
//       modalType,
//       modalMessage,
//       setCartItems,
//       getCart
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (course) => {
    setCartItems((prev) => {
      const exists = prev.find(item => item.id === course.id);
      if (exists) return prev; 
      return [...prev, course];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  const isInCart = (id) => {
    return cartItems.some(item => item.id === id);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
