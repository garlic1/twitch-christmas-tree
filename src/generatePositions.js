export const generateEvenlyDistributedPositions = (subscribers) => {
  const treeShape = [
    { row: 1, width: 10, center: 50, yPos: 14, count: 1 },
    { row: 2, width: 20, center: 45, yPos: 20, count: 2 },
    { row: 3, width: 32, center: 40, yPos: 25, count: 3 },
    { row: 4, width: 22, center: 45, yPos: 31, count: 2 },
    { row: 5, width: 40, center: 45, yPos: 37, count: 3 },
    { row: 6, width: 58, center: 45, yPos: 43, count: 4 },
    { row: 7, width: 58, center: 45, yPos: 49, count: 4 },
    { row: 8, width: 68, center: 45, yPos: 55, count: 5 },
    { row: 9, width: 82, center: 45, yPos: 61, count: 5 },
    { row: 10, width: 80, center: 45, yPos: 67, count: 6 },
    { row: 11, width: 35, center: 45, yPos: 74, count: 3 },
  ];

  const getRotatedDimensions = (width, height, angleDeg) => {
    const angleRad = (Math.abs(angleDeg) * Math.PI) / 180;
    const cos = Math.abs(Math.cos(angleRad));
    const sin = Math.abs(Math.sin(angleRad));

    const rotatedWidth = width * cos + height * sin;
    const rotatedHeight = width * sin + height * cos;

    return { width: rotatedWidth, height: rotatedHeight };
  };

  const measureElement = (text, rotation) => {
    const temp = document.createElement("div");
    temp.className =
      "bg-red-600 text-white px-2 rounded-full font-bold border shadow-sm whitespace-nowrap";
    temp.style.cssText =
      "position: absolute; visibility: hidden; height: 18px; font-size: 9px;";
    temp.textContent = text;
    document.body.appendChild(temp);
    const width = temp.offsetWidth;
    const height = temp.offsetHeight;
    document.body.removeChild(temp);

    const rotated = getRotatedDimensions(width, height, rotation);
    return rotated.width;
  };

  const getContainerWidth = () => {
    const container = document.querySelector(".tree-item img");
    return container ? container.offsetWidth : 400;
  };

  const containerWidth = getContainerWidth();
  const positions = [];
  const rotateVariance = 10;
  let subIndex = 0;

  treeShape.forEach((row) => {
    const rowSubs = subscribers.slice(subIndex, subIndex + row.count);
    subIndex += row.count;

    const rotations = rowSubs.map(
      () => (Math.random() - 0.5) * rotateVariance * 2
    );

    const tagWidths = rowSubs.map((sub, i) => {
      const pxWidth = measureElement(sub.user_name, rotations[i]);
      return (pxWidth / containerWidth) * 100;
    });

    const totalTagWidth = tagWidths.reduce((sum, w) => sum + w, 0);
    const availableSpace = row.width - totalTagWidth;
    const gap = Math.max(0, availableSpace / (row.count + 1));

    const startX = row.center - row.width / 2;
    let currentX = startX + gap;

    tagWidths.forEach((tagWidth, i) => {
      const xPos = currentX + tagWidth / 2;

      const randomX = (Math.random() - 0.5) * 1;
      const randomY = (Math.random() - 0.5) * 0.5;

      positions.push({
        top: `${(row.yPos + randomY).toFixed(1)}%`,
        left: `${(xPos + randomX).toFixed(1)}%`,
        rotate: rotations[i].toFixed(1),
      });

      currentX += tagWidth + gap;
    });
  });

  return positions;
};
