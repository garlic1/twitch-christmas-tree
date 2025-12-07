import { useEffect, useState } from "react";
import { exportSingleTree } from "./export";
import { generateEvenlyDistributedPositions } from "./generatePositions";

export const Tree = ({
  bg,
  border,
  treeIndex,
  subscribers,
  getTreePositions,
  randomizeTree,
  treePositions,
  setTreePositions,
  topGifts,
  topSubs,
}) => {
  const [imagesLoaded, setImagesLoaded] = useState({});
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

  const giftPositions = [
    { bottom: "13%", left: "23%" },
    { bottom: "7%", left: "12%" },
    { bottom: "2%", left: "32%" },
  ];

  const subPositions = [
    { bottom: "13%", left: "79%" },
    { bottom: "7%", left: "69%" },
    { bottom: "2%", left: "88%" },
  ];

  const startIdx = treeIndex * 36;
  const treeSubs = subscribers.slice(startIdx, startIdx + 36);

  if (treeSubs.length === 0) return null;

  const positions = getTreePositions(treeIndex);

  const handleImageLoad = () => {
    if (!imagesLoaded[treeIndex]) {
      setImagesLoaded((prev) => ({ ...prev, [treeIndex]: true }));
      const newPositions = generateEvenlyDistributedPositions(treeSubs);
      setTreePositions((prev) => ({ ...prev, [treeIndex]: newPositions }));
    }
  };

  return (
    <div
      key={treeIndex}
      className="flex flex-col items-center p-6 m-4 border-2 bg-gray-800/90 backdrop-blur rounded-lg shadow-xl p-6 mb-8 border-2 border-red-900"
    >
      <div
        id={`tree-${treeIndex}`}
        className="tree-item relative inline-block mb-4"
        style={{ padding: "0px 20px", minWidth: "424px" }}
      >
        <img
          src="/arvorona.png"
          alt="Christmas Tree"
          className="w-96"
          onLoad={handleImageLoad}
        />
        {treeSubs.map((sub, idx) => {
          const pos = positions[idx] || positions[positions.length - 1];
          const months = sub.tenure?.months || 0;
          const isHighTier = sub?.tier === "Tier 2" || sub?.tier === "Tier 3";

          return (
            <div
              key={sub.user_id}
              onMouseDown={(e) => handleMouseDown(e, idx)}
              style={{
                position: "absolute",
                top: pos.top,
                left: pos.left,
                transform: `rotate(${pos.rotate}deg)`,
                cursor: draggingIndex === idx ? "grabbing" : "grab",
                userSelect: "none",
              }}
            >
              <div style={{ transform: "translate(-50%, -50%)" }}>
                <div
                  className={`
                  ${isHighTier ? "bg-yellow-400" : bg} 
                  ${
                    isHighTier ? "text-black" : "text-white"
                  } px-2 rounded-full font-bold border
                  ${isHighTier ? "border-neutral-900" : border} 
                  shadow-sm whitespace-nowrap flex items-center justify-center html2canvas-padding`}
                  style={{ height: "18px", fontSize: "9px" }}
                >
                  {sub.user_name}
                </div>
              </div>
            </div>
          );
        })}
        {topGifts.map(
          (gift, idx) =>
            gift && (
              <div
                key={`gift-${idx}`}
                className="absolute"
                style={{
                  ...giftPositions[idx],
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className="px-2 bg-yellow-400  text-black border-neutral-900 rounded-full font-bold border shadow-sm whitespace-nowrap flex items-center justify-center  html2canvas-padding"
                  style={{ height: "18px", fontSize: "9px" }}
                >
                  {gift}
                </div>
              </div>
            )
        )}
        {topSubs.map(
          (gift, idx) =>
            gift && (
              <div
                key={`gift-${idx}`}
                className="absolute"
                style={{
                  ...subPositions[idx],
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className="px-2 bg-yellow-400  text-black border-neutral-900 rounded-full font-bold border shadow-sm whitespace-nowrap flex items-center justify-center  html2canvas-padding"
                  style={{ height: "18px", fontSize: "9px" }}
                >
                  {gift}
                </div>
              </div>
            )
        )}
      </div>

      <div className="flex flex-col gap-2 w-full max-w-xs">
        <button
          onClick={() => randomizeTree(treeIndex)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 text-sm"
        >
          🎲 Randomizar Posições
        </button>
        <button
          onClick={() => exportSingleTree(treeIndex)}
          className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-600 border border-green-600"
        >
          💾 Exportar Esta Árvore
        </button>
      </div>
    </div>
  );
};
