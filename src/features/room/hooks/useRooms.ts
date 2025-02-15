import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  createRoomAsync,
  editRoomAsync,
  fetchRoomsAsync,
  removeRoomAsync,
} from "../RoomSlice"
import { Room } from "../../room/Room.Type";

const useRooms = () => {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state) => state.room.rooms);
  const error = useAppSelector((state) => state.room.error);
  const loading = useAppSelector((state) => state.room.status);

  const createRoom = (room: Room) => dispatch(createRoomAsync(room));
  const editRoom = (room: Room) => dispatch(editRoomAsync(room));
  const removeRoom = (roomId: number) => dispatch(removeRoomAsync(roomId));

  useEffect(() => {
    dispatch(fetchRoomsAsync());
  }, [dispatch]);

  const memoizedRooms = useMemo(() => rooms, [rooms]);

  return {
    rooms: memoizedRooms,
    error,
    loading,
    createRoom,
    editRoom,
    removeRoom,
  };
};

export default useRooms;
