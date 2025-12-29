import { createContext, useState } from 'react';

const ToasterContext = createContext();

export const ToasterProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('success');
  const [modalMessage, setModalMessage] = useState('');
  return (
    <ToasterContext.Provider
      value={{
        showModal,
        setShowModal,
        modalType,
        setModalType,
        modalMessage,
        setModalMessage,
      }}>
      {children}
    </ToasterContext.Provider>
  );
};

export default ToasterContext;
