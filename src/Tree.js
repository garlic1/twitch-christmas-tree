import { useState } from "react";
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

  const giftPositions = [
    { bottom: "7%", left: "9%" },
    { bottom: "13%", left: "20%" },
    { bottom: "2%", left: "30%" },
  ];

  const subPositions = [
    { bottom: "7%", left: "71%" },
    { bottom: "13%", left: "82%" },
    { bottom: "2%", left: "92%" },
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
      className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 m-4 border-2 border-gray-200"
    >
      <div
        id={`tree-${treeIndex}`}
        className="tree-item relative inline-block mb-4"
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
              style={{
                position: "absolute",
                top: pos.top,
                left: pos.left,
                transform: `rotate(${pos.rotate}deg)`,
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
          🎲 Randomize Positions
        </button>
        <button
          onClick={() => exportSingleTree(treeIndex)}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 text-sm"
        >
          💾 Export This Tree
        </button>
      </div>
    </div>
  );
};
