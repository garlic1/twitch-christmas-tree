import React, { useState, Fragment } from "react";
import { Gift } from "lucide-react";
import { Tree } from "./components/Tree";
import { generateEvenlyDistributedPositions } from "./utils/generatePositions";
import { Header } from "./components/Header";
import { TREES } from "./enums/trees";
import { Footer } from "./components/Footer";
import { TreeSetupPanel } from "./components/TreeSetupPanel";

const ChristmasTreeGenerator = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [error, setError] = useState("");
  const [treePositions, setTreePositions] = useState({});
  const [topGifts, setTopGifts] = useState(() => {
    const saved = localStorage.getItem("topGifts");
    return saved ? JSON.parse(saved) : ["", "", ""];
  });
  const [topSubs, setTopSubs] = useState(() => {
    const saved = localStorage.getItem("topSubs");
    return saved ? JSON.parse(saved) : ["", "", ""];
  });

  const updateTopGift = (index, value) => {
    const newGifts = [...topGifts];
    newGifts[index] = value;
    setTopGifts(newGifts);
    localStorage.setItem("topGifts", JSON.stringify(newGifts));
  };

  const updateTopSub = (index, value) => {
    const newSubs = [...topSubs];
    newSubs[index] = value;
    setTopSubs(newSubs);
    localStorage.setItem("topSubs", JSON.stringify(newSubs));
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSubscribers([])

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split("\n");
    const subs = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(",");

      if (values[0] === "sarisla") continue;

      subs.push({
        user_id: `csv_${i}`,
        user_name: values[0],
        tier: values[2],
        tenure: {
          months: parseInt(values[3]) || 0,
        },
        streak: parseInt(values[4]) || 0,
        sub_type: values[5],
        is_founder: values[6] === "true",
      });
    }

    const sorted = subs.sort((a, b) => b.tenure.months - a.tenure.months);
    setSubscribers(sorted);
    setTreePositions({});
    setError("");
  };

  const randomizeTree = (treeIndex) => {
    const startIdx = treeIndex * 36;
    const treeSubs = subscribers.slice(startIdx, startIdx + 36);
    const newPositions = generateEvenlyDistributedPositions(treeSubs);
    setTreePositions((prev) => ({ ...prev, [treeIndex]: newPositions }));
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-950 to-red-950 p-8 starry-bg ">
        <div className="max-w-6xl mx-auto relative z-10">
          <Header />

          <TreeSetupPanel
            handleFileUpload={handleFileUpload}
            setSubscribers={setSubscribers}
            topGifts={topGifts}
            topSubs={topSubs}
            updateTopGift={updateTopGift}
            updateTopSub={updateTopSub}
            subscribers={subscribers}
            error={error}
          />

          {subscribers.length === 0 && (
            <div className="text-center text-neutral-200 mt-8">
              <Gift size={64} className="mx-auto mb-4 text-neutral-200" />
              <p>Faça o upload de um arquivo .csv ou veja o exemplo!</p>
            </div>
          )}
        </div>
        <div className="trees-container flex flex-row flex-wrap justify-center">
          {TREES.map(({ bg, border }, treeIndex) => (
            <Fragment key={treeIndex}>
              <Tree
                bg={bg}
                border={border}
                treeIndex={treeIndex}
                subscribers={subscribers}
                randomizeTree={randomizeTree}
                treePositions={treePositions}
                setTreePositions={setTreePositions}
                topGifts={topGifts}
                topSubs={topSubs}
              />
            </Fragment>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ChristmasTreeGenerator;
