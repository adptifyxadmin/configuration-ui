import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store'; // Assuming your store is in the same directory
import { getEstablishments } from '../establishment/EstablishmentService'; // Import your service or API function
import { Establishment } from './Establishment.Type';

// Define the EstablishmentState interface
interface EstablishmentState {
    establishments: Establishment[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Set the initial state
const initialState: EstablishmentState = {
    establishments: [],
    status: 'idle',
    error: null,
};

// Async thunk for fetching establishments
export const fetchEstablishmentsAsync = createAsyncThunk<Establishment[]>(
    'establishments/fetchEstablishments',
    async () => {
        const response = await getEstablishments();
        return response; // Make sure this returns an array of establishments
    }
);

// Establishment slice
const establishmentSlice = createSlice({
    name: 'establishments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEstablishmentsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEstablishmentsAsync.fulfilled, (state, action: PayloadAction<Establishment[]>) => {
                state.status = 'succeeded';
                state.establishments = action.payload; // Set the fetched establishments
            })
            .addCase(fetchEstablishmentsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null; // Capture the error
            });
    },
});

export default establishmentSlice.reducer;

// Selector to get establishments from the state
export const selectEstablishments = (state: RootState) => state.establishment.establishments;
export const selectEstablishmentStatus = (state: RootState) => state.establishment.status;
export const selectEstablishmentError = (state: RootState) => state.establishment.error;
