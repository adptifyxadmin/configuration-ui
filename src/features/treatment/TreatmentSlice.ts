// src/redux/treatmentSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Treatment, TreatmentState } from "./Treatment.Type";
import { getTreatments, addTreatment, updateTreatment, deleteTreatment } from "./TreatmentService";


const initialState: TreatmentState = {
  treatments: [],
  status: "idle",
  error: null,
};

export const fetchTreatmentsAsync = createAsyncThunk(
  "treatments/fetchTreatments",
  async () => {
    const response = await getTreatments();
    return response;
  }
);

export const createTreatmentAsync = createAsyncThunk(
    'treatments/createTreatment',
    async (treatment: Treatment, { rejectWithValue }) => {
        try {
            const response: any = await addTreatment(treatment);
            return response.entity;
        } catch (error: any) {
            return rejectWithValue(error.message);  // This will ensure the error is handled by the `rejected` case in the slice.
        }
    }
);

export const editTreatmentAsync = createAsyncThunk(
    "treatments/editTreatment",
    async (treatment: Treatment, { rejectWithValue }) => {
        try {
            const response: any = await updateTreatment(treatment);
            return response.entity;
        } catch (error: any) {
            // Return a rejected action with the error message
            return rejectWithValue(error.message);
        }
    }
);


export const removeTreatmentAsync = createAsyncThunk(
  "treatments/removeTreatment",
  async (treatmentId: number) => {
    await deleteTreatment(treatmentId);
    return treatmentId;
  }
);

const treatmentSlice = createSlice({
  name: "treatments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTreatmentsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTreatmentsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.treatments = action.payload;
      })
      .addCase(fetchTreatmentsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createTreatmentAsync.fulfilled, (state, action) => {
        state.treatments.push(action.payload);
      })
      .addCase(editTreatmentAsync.fulfilled, (state, action) => {
        const index = state.treatments.findIndex(
          (treatment) => treatment.id === action.payload.id
        );
        if (index !== -1) {
          state.treatments[index] = action.payload;
        }
      })
      .addCase(removeTreatmentAsync.fulfilled, (state, action) => {
        state.treatments = state.treatments.filter((treatment) => treatment.id !== action.payload);
      });
  },
});

export default treatmentSlice.reducer;
