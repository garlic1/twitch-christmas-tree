export const exportSingleTree = async (treeIndex) => {
  try {
    const html2canvas = (await import("html2canvas")).default;
    document.body.classList.add("exporting-canvas");

    const treeElement = document.querySelector(`#tree-${treeIndex}`);
    if (!treeElement) return;

    const canvas = await html2canvas(treeElement, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true,
    });

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `christmas-tree-${treeIndex + 1}-${Date.now()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    });

    document.body.classList.remove("exporting-canvas");
  } catch (error) {
    console.error("Export failed:", error);
    alert("Failed to export image.");
    document.body.classList.remove("exporting-canvas");
  }
};

export const exportAllTrees = async (trees, subscribers) => {
  try {
    const html2canvas = (await import("html2canvas")).default;
    document.body.classList.add("exporting-canvas");

    const activeTrees = trees.filter((_, index) => {
      const startIdx = index * 38;
      return subscribers.slice(startIdx, startIdx + 38).length > 0;
    });

    for (let i = 0; i < activeTrees.length; i++) {
      const treeElement = document.querySelector(`#tree-${i}`);
      if (!treeElement) continue;

      const canvas = await html2canvas(treeElement, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
      });

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `christmas-tree-${i + 1}-${Date.now()}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      });

      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    document.body.classList.remove("exporting-canvas");
  } catch (error) {
    console.error("Export failed:", error);
    alert("Failed to export images.");
    document.body.classList.remove("exporting-canvas");
  }
};
