export const generateRandomizedPositions = () => {
  // Helper to add randomness to a value
  const randomize = (base, range) => base + (Math.random() * range * 2 - range);

  const basePositions = [
    // Row 1 - 1 name (top)
    { top: 14, left: 50, rotate: 5, topRange: 0, leftRange: 3, rotateRange: 5 },

    // Row 2 - 2 names
    {
      top: 20,
      left: 42,
      rotate: -8,
      topRange: 0,
      leftRange: 3,
      rotateRange: 5,
    },
    {
      top: 20,
      left: 60,
      rotate: 10,
      topRange: 0,
      leftRange: 3,
      rotateRange: 5,
    },

    // Row 3 - 3 names
    { top: 26, left: 35, rotate: 7, topRange: 2, leftRange: 3, rotateRange: 5 },
    {
      top: 24,
      left: 50,
      rotate: -5,
      topRange: 0,
      leftRange: 3,
      rotateRange: 5,
    },
    { top: 26, left: 65, rotate: 9, topRange: 0, leftRange: 3, rotateRange: 5 },

    // Row 4 - 2 names (narrows)
    {
      top: 32,
      left: 40,
      rotate: -10,
      topRange: 0,
      leftRange: 3,
      rotateRange: 5,
    },
    { top: 32, left: 59, rotate: 8, topRange: 0, leftRange: 3, rotateRange: 5 },

    // Row 5 - 3 names
    {
      top: 39,
      left: 32,
      rotate: 12,
      topRange: 0,
      leftRange: 3,
      rotateRange: 5,
    },
    {
      top: 37,
      left: 50,
      rotate: -7,
      topRange: 0,
      leftRange: 3,
      rotateRange: 5,
    },
    {
      top: 39,
      left: 70,
      rotate: 11,
      topRange: 0,
      leftRange: 3,
      rotateRange: 5,
    },

    // Row 6 - 4 names
    {
      top: 44,
      left: 22,
      rotate: -9,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },
    { top: 44, left: 40, rotate: 6, topRange: 0, leftRange: 2, rotateRange: 5 },
    {
      top: 44,
      left: 58,
      rotate: -11,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },
    { top: 44, left: 78, rotate: 8, topRange: 0, leftRange: 2, rotateRange: 5 },

    // Row 7 - 4 names
    {
      top: 50,
      left: 23,
      rotate: 10,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },
    {
      top: 50,
      left: 45,
      rotate: -8,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },
    { top: 50, left: 60, rotate: 7, topRange: 0, leftRange: 2, rotateRange: 5 },
    {
      top: 50,
      left: 78,
      rotate: -12,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },

    // Row 8 - 5 names
    {
      top: 56,
      left: 18,
      rotate: -7,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },
    {
      top: 56,
      left: 33,
      rotate: 11,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },
    {
      top: 56,
      left: 50,
      rotate: -9,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },
    { top: 56, left: 67, rotate: 8, topRange: 0, leftRange: 2, rotateRange: 5 },
    {
      top: 56,
      left: 82,
      rotate: -10,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },

    // Row 9 - 5 names
    { top: 62, left: 12, rotate: 9, topRange: 0, leftRange: 2, rotateRange: 5 },
    {
      top: 62,
      left: 29,
      rotate: -11,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },
    { top: 62, left: 50, rotate: 6, topRange: 0, leftRange: 2, rotateRange: 5 },
    {
      top: 62,
      left: 70,
      rotate: -8,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },
    {
      top: 62,
      left: 90,
      rotate: 12,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },

    // Row 10 - 6 names (widest)
    {
      top: 68,
      left: 12,
      rotate: -10,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },
    { top: 68, left: 27, rotate: 8, topRange: 0, leftRange: 2, rotateRange: 5 },
    {
      top: 68,
      left: 42,
      rotate: -7,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },
    {
      top: 68,
      left: 58,
      rotate: 11,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },
    {
      top: 68,
      left: 73,
      rotate: -9,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },
    { top: 68, left: 88, rotate: 7, topRange: 0, leftRange: 2, rotateRange: 5 },

    // Row 11 - 3 names (arc end)
    {
      top: 74,
      left: 35,
      rotate: -9,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },
    { top: 75, left: 50, rotate: 7, topRange: 0, leftRange: 2, rotateRange: 5 },
    {
      top: 74,
      left: 65,
      rotate: -7,
      topRange: 0,
      leftRange: 2,
      rotateRange: 5,
    },
  ];

  return basePositions.map((pos) => ({
    top: `${randomize(pos.top, pos.topRange).toFixed(1)}%`,
    left: `${randomize(pos.left, pos.leftRange).toFixed(1)}%`,
    rotate: randomize(pos.rotate, pos.rotateRange).toFixed(1),
  }));
};
