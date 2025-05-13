import React from "react";

const useEditngId = () => {
  const [editingId, setEditingId] = React.useState<number | null>(null);

  const handleEditMode = (id: number) => {
    setEditingId(id);
  };
  const handleCancelEditMode = () => {
    setEditingId(null);
  };
  return {
    editingId,
    handleEditMode,
    handleCancelEditMode,
  };
};

export default useEditngId;
