// import axios from 'axios';
// import { createContext, useEffect, useState } from 'react';

// const UserContext = createContext();

// const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   async function fetchUserProfile() {
//     try {
//       const { data } = await axios.get('/auth/profile');
//       // setUser(data)
//       console.log('Data => ', data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   return <UserContext.Provider>{children}</UserContext.Provider>;
// };

// export default UserProvider;
