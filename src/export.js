export const exportTreesAsPNG = async () => {
  try {
    const html2canvas = (await import("html2canvas")).default;
    
    document.body.classList.add('exporting-canvas');

    // Get all individual tree containers
    const treeElements = document.querySelectorAll(".tree-item");

    for (let i = 0; i < treeElements.length; i++) {
      const canvas = await html2canvas(treeElements[i], {
        backgroundColor: null, // Transparent background
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

      // Small delay between downloads
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    
    document.body.classList.remove('exporting-canvas');
  } catch (error) {
    console.error("Export failed:", error);
    alert("Failed to export images. Make sure all images are loaded.");
  }
};
