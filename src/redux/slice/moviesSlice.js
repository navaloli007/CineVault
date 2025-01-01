import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//API call to fetch movies 
export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async (pageNumber) => {
        const res = await fetch(`${import.meta.env.VITE_MOVIES_BACKEND_URL}${pageNumber}`);
        if (!res.ok) {
            throw new Error("Failed to fetch movies");
        }
        return res.json();
    }
)

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        loading: null,
        pageNumber: 1
    },
    reducers: {
        nextPageFn: (state) => {
            state.pageNumber += 1;
        },
        previousPageFn: (state) => {
            state.pageNumber -= 1;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state) => {
            state.loading = true;
        })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload.results;
            })
            .addCase(fetchMovies.rejected, (state, dispatch) => {
                console.log("rejected");
            })

    }

})

export const { nextPageFn, previousPageFn } = moviesSlice.actions;
export default moviesSlice.reducer;