// src/redux/roomTypeSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RoomType, RoomTypeState } from "../roomtype/RoomType.Type";
import { getRoomTypes, addRoomType, updateRoomType, deleteRoomType, getRoomTypesByEstablishmentId,getRoomCategoryTypes } from "../roomtype/RoomTypeService";


const initialState: RoomTypeState = {
  roomTypes: [],
  status: "idle",
  error: null,
};

export const fetchRoomTypesAsync = createAsyncThunk(
  "roomTypes/fetchRoomTypes",
  async () => {
    const response = await getRoomTypes();
    return response;
  }
);

export const fetchRoomTypesByEstablishmentIdAsync = createAsyncThunk(
    "roomTypes/getRoomTypesByEstablishmentId",
    async (establsihmentId:number) => {
        const response = await getRoomTypesByEstablishmentId(establsihmentId);
        return response;
    }
);

export const fetchRoomCategoryTypesAsync = createAsyncThunk(
  "roomTypes/getRoomCategoryTypes",
  async () => {
      const response = await getRoomCategoryTypes();
      return response;
  }
);


export const createRoomTypeAsync = createAsyncThunk(
    'roomTypes/createRoomType',
    async (roomType: RoomType, { rejectWithValue }) => {
        try {
            const response: any = await addRoomType(roomType);
            return response.entity;
        } catch (error: any) {
            return rejectWithValue(error.message);  // This will ensure the error is handled by the `rejected` case in the slice.
        }
    }
);

export const editRoomTypeAsync = createAsyncThunk(
    "roomTypes/editRoomType",
    async (roomType: RoomType, { rejectWithValue }) => {
        try {
            const response: any = await updateRoomType(roomType);
            return response.entity;
        } catch (error: any) {
            // Return a rejected action with the error message
            return rejectWithValue(error.message);
        }
    }
);


export const removeRoomTypeAsync = createAsyncThunk(
  "roomTypes/removeRoomType",
  async (roomTypeId: number) => {
    await deleteRoomType(roomTypeId);
    return roomTypeId;
  }
);

const roomTypeSlice = createSlice({
  name: "roomTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomTypesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoomTypesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roomTypes = action.payload;
      })
      .addCase(fetchRoomTypesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createRoomTypeAsync.fulfilled, (state, action) => {
        state.roomTypes.push(action.payload);
      })
      .addCase(editRoomTypeAsync.fulfilled, (state, action) => {
        const index = state.roomTypes.findIndex(
          (roomType) => roomType.id === action.payload.id
        );
        if (index !== -1) {
          state.roomTypes[index] = action.payload;
        }
      })
      .addCase(removeRoomTypeAsync.fulfilled, (state, action) => {
        state.roomTypes = state.roomTypes.filter((roomType) => roomType.id !== action.payload);
      });
  },
});

export default roomTypeSlice.reducer;
