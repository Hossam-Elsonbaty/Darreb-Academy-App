import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  courses: [],
  loading: false,
  error: null,
};

// Async action to fetch courses data
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await axios.get('https://darreb-academy-backend.vercel.app/api/courses');
  return response.data; // The data will be available as payload
});

// Create the slice
const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset errors on each new fetch
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload; // Save the courses from API
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture error
      });
  },
});

export default coursesSlice.reducer;
