// src/redux/roomSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Room, RoomState } from "../room/Room.Type";
import { getRooms, addRoom, updateRoom, deleteRoom } from "../room/RoomService";


const initialState: RoomState = {
  rooms: [],
  status: "idle",
  error: null,
};

export const fetchRoomsAsync = createAsyncThunk(
  "rooms/fetchRooms",
  async () => {
    const response = await getRooms();
    return response;
  }
);

export const createRoomAsync = createAsyncThunk(
    'rooms/createRoom',
    async (room: Room, { rejectWithValue }) => {
        try {
            const response: any = await addRoom(room);
            return response.entity;
        } catch (error: any) {
            return rejectWithValue(error.message);  // This will ensure the error is handled by the `rejected` case in the slice.
        }
    }
);

export const editRoomAsync = createAsyncThunk(
    "rooms/editRoom",
    async (room: Room, { rejectWithValue }) => {
        try {
            const response: any = await updateRoom(room);
            return response.entity;
        } catch (error: any) {
            // Return a rejected action with the error message
            return rejectWithValue(error.message);
        }
    }
);

export const removeRoomAsync = createAsyncThunk(
  'rooms/removeRoom',
  async (roomId: number, { rejectWithValue }) => {
    try {
      await deleteRoom(roomId);
      return roomId;
    } catch (error: any) {
      // Return error message to be used in the UI
      return rejectWithValue(error.message);
    }
  }
);
const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoomsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms = action.payload;
      })
      .addCase(fetchRoomsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createRoomAsync.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
      })
      .addCase(editRoomAsync.fulfilled, (state, action) => {
        const index = state.rooms.findIndex(
          (room) => room.id === action.payload.id
        );
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
      })
      .addCase(removeRoomAsync.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter((room) => room.id !== action.payload);
      });
  },
});

export default roomSlice.reducer;
