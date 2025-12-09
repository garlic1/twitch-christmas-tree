import { useState, useEffect } from "react";
import { exportSingleTree } from "../utils/export";
import { generateEvenlyDistributedPositions } from "../utils/generatePositions";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { UserTag } from "./UserTag";
import { GiftTag } from "./GiftTag";

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

  const currentTreePositions = treePositions[treeIndex] || [];

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
        {currentTreePositions.length > 0 &&
          treeSubs.map((user, index) => (
            <UserTag
              user={user}
              index={index}
              positions={currentTreePositions}
              handleMouseDown={handleMouseDown}
              draggingIndex={draggingIndex}
              colors={{ bg: bg, border: border }}
            />
          ))}
        {topGifts.map(
          (gift, idx) =>
            gift && (
              <GiftTag
                gift={gift}
                positions={giftPositions}
                index={idx}
                variant={"gift"}
              />
            )
        )}
        {topSubs.map(
          (gift, idx) =>
            gift && (
              <GiftTag
                gift={gift}
                positions={subPositions}
                index={idx}
                variant={"cheer"}
              />
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
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-500 border border-blue-500"
        >
          💾 Exportar Esta Árvore
        </button>
      </div>
    </div>
  );
};
