import React from "react";

const usePlayerStatAccordion = () => {
  const [expandedRows, setExpandedRows] = React.useState<Set<number>>(
    new Set()
  );
  const [editingRow, setEditingRow] = React.useState<number | null>(null);

  const toggleRow = (idx: number) =>
    setExpandedRows((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      if (editingRow === idx) setEditingRow(null);
      return next;
    });

  return {
    isExpanded: (idx: number) => expandedRows.has(idx),
    isEditing: (idx: number) => editingRow === idx,
    startEditing: setEditingRow,
    stopEditing: () => setEditingRow(null),
    toggleRow,
  };
};
export default usePlayerStatAccordion;
