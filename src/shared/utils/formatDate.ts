export const formatDateForInput = (date: string | null) => {
    if (!date || date === null) {
        return "";
    }
  const d = new Date(date);
  return d.toISOString().split("T")[0]; // Converts to YYYY-MM-DD
};
