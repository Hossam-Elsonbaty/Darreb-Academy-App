import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/axios';
import { useLanguage } from '../context/LanguageContext';
const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('success');
  const [modalMessage, setModalMessage] = useState('');
  const { language } = useLanguage();

  const getCart = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      setIsCartLoading(false);
      return;
    }

    setIsCartLoading(true);
    try {
      const res = await api.get('/cart');
      setCartItems(Array.isArray(res.data.cart) ? res.data.cart : []);
      console.log('Cart from server:', res.data.cart);
    } catch (err) {
      console.log('Get cart error:', err);
    } finally {
      setIsCartLoading(false);
    }
  };

const addToCart = async (course) => {
  try {
    await api.post('/cart', { courseId: course._id });
    await getCart();
    setModalType('success');
    setModalMessage('Course added to cart!');
    setShowModal(true);
  } catch (error) {
    setModalType('error');
    setModalMessage('Failed to add course.');
    setShowModal(true);
  }
};

const removeFromCart = async (courseId) => {
  try {
    await api.delete('/cart', { data: { courseId } });
    await getCart();
  } catch (error) {
    console.log(error);
  }
};

const isInCart = (courseId) =>
  cartItems.some(item => item.course?._id === courseId);
  useEffect(() => {
    getCart();
  }, [language]);
  return (
    <CartContext.Provider value={{
      cartItems,
      isCartLoading,
      addToCart,
      removeFromCart,
      showModal,
      setShowModal,
      modalType,
      modalMessage,
      setCartItems,
      getCart
      , isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
