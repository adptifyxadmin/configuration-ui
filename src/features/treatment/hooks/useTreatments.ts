import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  createTreatmentAsync,
  editTreatmentAsync,
  fetchTreatmentsAsync,
  removeTreatmentAsync,
} from "../TreatmentSlice"
import { Treatment } from "../../treatment/Treatment.Type";

const useTreatments = () => {
  const dispatch = useAppDispatch();
  const treatments = useAppSelector((state) => state.treatment.treatments);
  const error = useAppSelector((state) => state.treatment.error);
  const loading = useAppSelector((state) => state.treatment.status);

  const createTreatment = (treatment: Treatment) => dispatch(createTreatmentAsync(treatment));
  const editTreatment = (treatment: Treatment) => dispatch(editTreatmentAsync(treatment));
  const removeTreatment = (treatmentId: number) => dispatch(removeTreatmentAsync(treatmentId));

  useEffect(() => {
    dispatch(fetchTreatmentsAsync());
  }, [dispatch]);

  const memoizedTreatments = useMemo(() => treatments, [treatments]);

  return {
    treatments: memoizedTreatments,
    error,
    loading,
    createTreatment,
    editTreatment,
    removeTreatment,
  };
};

export default useTreatments;
