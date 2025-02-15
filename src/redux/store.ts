import { configureStore } from "@reduxjs/toolkit";
import treatmentsReducer from "../features/treatment/TreatmentSlice";
import roomtypesReducer from "../features/roomtype/RoomTypeSlice";
import roomsReducer from "../features/room/RoomSlice";
import establishmentReducer from "../features/establishment/EstablishmentSlice";

export const store = configureStore({
  reducer: {
        treatment: treatmentsReducer,
        roomtype: roomtypesReducer,
        room: roomsReducer,
        establishment: establishmentReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
