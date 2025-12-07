import { exportSingleTree } from "./export";

export const generateTree = (
  bg,
  border,
  treeIndex,
  subscribers,
  getTreePositions,
  randomizeTree
) => {
  const startIdx = treeIndex * 38;
  const treeSubs = subscribers.slice(startIdx, startIdx + 38);

  if (treeSubs.length === 0) return null;

  const positions = getTreePositions(treeIndex);

  return (
    <div
      key={treeIndex}
      className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 m-4 border-2 border-gray-200"
    >
      <div
        id={`tree-${treeIndex}`}
        className="tree-item relative inline-block mb-4"
      >
        <img src="/arvorinha.png" alt="Christmas Tree" className="w-96" />

        {treeSubs.map((sub, idx) => {
          const pos = positions[idx] || positions[positions.length - 1];
          const months = sub.tenure?.months || 0;

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
                  className={`${bg} text-white px-2 rounded-full font-bold border ${border} shadow-sm whitespace-nowrap flex items-center justify-center html2canvas-padding`}
                  style={{ height: "18px", fontSize: "9px" }}
                >
                  {sub.user_name}
                </div>
              </div>
            </div>
          );
        })}
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
