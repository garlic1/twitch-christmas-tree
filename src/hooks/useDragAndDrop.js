import { useEffect, useState } from "react";

export const useDragAndDrop = ({
  treePositions,
  setTreePositions,
  treeIndex,
}) => {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleStart = (e, idx, clientX, clientY) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
    setDraggingIndex(idx);
  };

  const handleMouseDown = (e, idx) => {
    handleStart(e, idx, e.clientX, e.clientY);
  };

  const handleMove = (clientX, clientY) => {
    if (draggingIndex === null) return;

    const treeElement = document.getElementById(`tree-${treeIndex}`);
    if (!treeElement) return;

    const treeRect = treeElement.getBoundingClientRect();
    const newLeft =
      ((clientX - treeRect.left - dragOffset.x) / treeRect.width) * 100;
    const newTop =
      ((clientY - treeRect.top - dragOffset.y) / treeRect.height) * 100;

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

  const handleMouseMove = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
  };

  const handleTouchStart = (e, idx) => {
    const touch = e.touches[0];
    handleStart(e, idx, touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleEnd = () => {
    setDraggingIndex(null);
  };

  useEffect(() => {
    if (draggingIndex !== null) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleEnd);
      };
    }
  }, [draggingIndex, dragOffset]);

  return {
    draggingIndex,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
  };
};
