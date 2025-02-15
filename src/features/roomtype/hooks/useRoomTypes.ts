import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  createRoomTypeAsync,
  editRoomTypeAsync,
  fetchRoomTypesAsync,
  removeRoomTypeAsync,
} from "../RoomTypeSlice"
import { RoomType } from "../../roomtype/RoomType.Type";

const useRoomTypes = () => {
  const dispatch = useAppDispatch();
  const roomTypes = useAppSelector((state) => state.roomtype.roomTypes);
  const error = useAppSelector((state) => state.roomtype.error);
  const loading = useAppSelector((state) => state.roomtype.status);

  const createRoomType = (roomType: RoomType) => dispatch(createRoomTypeAsync(roomType));
  const editRoomType = (roomType: RoomType) => dispatch(editRoomTypeAsync(roomType));
  const removeRoomType = (roomTypeId: number) => dispatch(removeRoomTypeAsync(roomTypeId));

  useEffect(() => {
    dispatch(fetchRoomTypesAsync());
  }, [dispatch]);

  const memoizedRoomTypes = useMemo(() => roomTypes, [roomTypes]);

  return {
    roomTypes: memoizedRoomTypes,
    error,
    loading,
    createRoomType,
    editRoomType,
    removeRoomType,
  };
};

export default useRoomTypes;
