import { useState, useEffect } from "react";
import { exportSingleTree } from "../utils/export";
import { generateEvenlyDistributedPositions } from "../utils/generatePositions";
import { useDragAndDrop } from "../hooks/useDragAndDrop";

export const Tree = ({
  bg,
  border,
  treeIndex,
  subscribers,
  randomizeTree,
  treePositions,
  setTreePositions,
  topGifts,
  topSubs,
}) => {
  const [imagesLoaded, setImagesLoaded] = useState({});

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

  const { draggingIndex, handleMouseDown } = useDragAndDrop({
    treePositions,
    setTreePositions,
    treeIndex,
  });

  const startIdx = treeIndex * 36;
  const treeSubs = subscribers.slice(startIdx, startIdx + 36);

  useEffect(() => {
    if (treeSubs.length > 0 && !treePositions[treeIndex]) {
      const newPositions = generateEvenlyDistributedPositions(treeSubs);
      setTreePositions((prev) => ({ ...prev, [treeIndex]: newPositions }));
    }
  }, [treeSubs.length, treeIndex]);

  if (treeSubs.length === 0) return null;

  const positions = treePositions[treeIndex] || [];

  const handleImageLoad = () => {
    if (!imagesLoaded[treeIndex] && !treePositions[treeIndex]) {
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
        {positions.length > 0 &&
          treeSubs.map((sub, idx) => {
            const pos = positions[idx];
            if (!pos) return null;

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

      <div className="flex flex-row gap-2 w-full max-w-xs">
        <button
          onClick={() => randomizeTree(treeIndex)}
          className="w-16 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 text-sm"
          title="Randomizar Posições"
        >
          🎲
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
