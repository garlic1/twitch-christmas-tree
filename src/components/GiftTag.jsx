export const GiftTag = ({ gift, positions, index, variant }) => {
  return (
    <div
      className="absolute"
      style={{
        ...positions[index],
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
  );
};
