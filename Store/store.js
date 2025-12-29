import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './Slices/coursesSlice';
import categoriesReducer from './Slices/categoriesSlice';
import loaderReducer from './Slices/loaderSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    loader: loaderReducer,
    categories: categoriesReducer,
  },
});

