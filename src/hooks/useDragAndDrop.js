import { useEffect, useState } from "react";

export const useDragAndDrop = ({
    treePositions,
    setTreePositions,
    treeIndex
}) => {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, idx) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setDraggingIndex(idx);
  };

  const handleMouseMove = (e) => {
    if (draggingIndex === null) return;

    const treeElement = document.getElementById(`tree-${treeIndex}`);
    if (!treeElement) return;

    const treeRect = treeElement.getBoundingClientRect();
    const newLeft =
      ((e.clientX - treeRect.left - dragOffset.x) / treeRect.width) * 100;
    const newTop =
      ((e.clientY - treeRect.top - dragOffset.y) / treeRect.height) * 100;

    const positions = [...treePositions[treeIndex]];
    positions[draggingIndex] = {
      ...positions[draggingIndex],
      left: `${newLeft.toFixed(1)}%`,
      top: `${newTop.toFixed(1)}%`,
    };

    setTreePositions((prev) => ({
      ...prev,
      [treeIndex]: positions,
    }));
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
  };

  useEffect(() => {
    if (draggingIndex !== null) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [draggingIndex]);

  return {
    draggingIndex,
    handleMouseDown,
    handleMouseUp,
  };
};
