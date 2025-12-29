import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  categories: [],
  loading: false,
  error: null,
};

// Async action to fetch courses data
export const fetchCategories = createAsyncThunk('courses/fetchCategories', async () => {
  const response = await axios.get('https://darreb-academy-backend.vercel.app/api/categories');
  return response.data; // The data will be available as payload
});

// Create the slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset errors on each new fetch
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // Save the courses from API
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture error
      });
  },
});

export default categoriesSlice.reducer;
