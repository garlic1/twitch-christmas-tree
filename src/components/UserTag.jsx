export const UserTag = ({
  user,
  index,
  positions,
  handleMouseDown,
  draggingIndex,
  colors
}) => {
  const pos = positions[index];
  if (!pos) return null;

  const { bg, border } = colors;
  const isHighTier = user?.tier === "Tier 2" || user?.tier === "Tier 3";

  return (
    <div
      key={user.user_id}
      onMouseDown={(e) => handleMouseDown(e, index)}
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
        transform: `rotate(${pos.rotate}deg)`,
        cursor: draggingIndex === index ? "grabbing" : "grab",
        userSelect: "none",
      }}
    >
      <div style={{ transform: "translate(-50%, -50%)" }}>
        <div
          className={`
                  ${isHighTier ? "bg-yellow-400" : bg} 
                  ${
                    isHighTier ? "text-black" : "text-white"
                  } px-1 rounded-full font-bold border
                  ${isHighTier ? "border-neutral-900" : border} 
                  shadow-sm whitespace-nowrap flex items-center justify-center html2canvas-padding`}
          style={{ height: "14px", fontSize: "9px" }}
        >
          {user.user_name}
        </div>
      </div>
    </div>
  );
};
