import React, { useState, Fragment } from "react";
import { Gift } from "lucide-react";
import { Tree } from "./Tree";
import { MOCK_SUBS } from "./mock";
import { exportAllTrees } from "./export";
import { generateEvenlyDistributedPositions } from "./generatePositions";

const trees = [
  { bg: "bg-red-600", border: "border-yellow-400" },
  { bg: "bg-purple-600", border: "border-neutral-900" },
  { bg: "bg-blue-600", border: "border-neutral-900" },
  { bg: "bg-green-600", border: "border-lime-400" },
  { bg: "bg-indigo-700", border: "border-purple-300" },
  { bg: "bg-teal-700", border: "border-cyan-300" },
  { bg: "bg-amber-700", border: "border-yellow-200" },
  { bg: "bg-violet-800", border: "border-fuchsia-300" },
  { bg: "bg-orange-600", border: "border-yellow-300" },
  { bg: "bg-rose-700", border: "border-pink-300" },
];

const ChristmasTreeGenerator = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [error, setError] = useState("");
  const [treePositions, setTreePositions] = useState({});
  const [topGifts, setTopGifts] = useState(["", "", ""]);
  const [topSubs, setTopSubs] = useState(["", "", ""]);

  const updateTopGift = (index, value) => {
    const newGifts = [...topGifts];
    newGifts[index] = value;
    setTopGifts(newGifts);
  };

  const updateTopSub = (index, value) => {
    const newSubs = [...topSubs];
    newSubs[index] = value;
    setTopSubs(newSubs);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

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

  const useMockData = () => {
    setSubscribers(MOCK_SUBS);
    setTreePositions({});
    setError("");
  };

  const getTreePositions = (treeIndex) => {
    const startIdx = treeIndex * 36;
    const treeSubs = subscribers.slice(startIdx, startIdx + 36);

    if (!treePositions[treeIndex]) {
      const newPositions = generateEvenlyDistributedPositions(treeSubs);
      setTreePositions((prev) => ({ ...prev, [treeIndex]: newPositions }));
      return newPositions;
    }
    return treePositions[treeIndex];
  };

  const randomizeTree = (treeIndex) => {
    const startIdx = treeIndex * 36;
    const treeSubs = subscribers.slice(startIdx, startIdx + 36);
    const newPositions = generateEvenlyDistributedPositions(treeSubs);
    setTreePositions((prev) => ({ ...prev, [treeIndex]: newPositions }));
  };

  return (
    <>
      <style>{`
        .html2canvas-padding {
          padding-bottom: 0 !important;
        }
        
        body.exporting-canvas .html2canvas-padding {
          padding-bottom: 14px !important;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-950 to-red-950 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-red-400 to-green-400 bg-clip-text text-transparent">
            🎄 sarisnatal 🎄
          </h1>

          <div className="bg-gray-800/90 backdrop-blur rounded-lg shadow-xl p-6 mb-8 border-2 border-red-900">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">
                  Upload Subscriber CSV
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Expected format: Username,Subscribe Date,Current
                  Tier,Tenure,Streak,Sub Type,Founder
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2 text-gray-200">
                    🎁 Top 3 Gifts
                  </label>
                  <div className="space-y-2">
                    {topGifts.map((gift, index) => (
                      <input
                        key={`gift-${index}`}
                        type="text"
                        value={gift}
                        onChange={(e) => updateTopGift(index, e.target.value)}
                        placeholder={`Gift Giver #${index + 1}`}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      />
                    ))}
                  </div>
                </div>

                {/* Top Subs Section */}
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2 text-gray-200">
                    🎉 Top 3 Bits
                  </label>
                  <div className="space-y-2">
                    {topSubs.map((sub, index) => (
                      <input
                        key={`sub-${index}`}
                        type="text"
                        value={sub}
                        onChange={(e) => updateTopSub(index, e.target.value)}
                        placeholder={`Top Sub #${index + 1}`}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={useMockData}
                className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-600 border border-green-600"
              >
                Use Mock Data (for testing)
              </button>

              {subscribers.length > 0 && (
                <button
                  onClick={() => exportAllTrees(trees, subscribers)}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700"
                >
                  Export All Trees
                </button>
              )}
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-900/50 text-red-300 rounded-lg border border-red-700">
                Error: {error}
              </div>
            )}

            {subscribers.length > 0 && (
              <div className="mt-4 p-4 bg-green-900/50 text-green-300 rounded-lg border border-green-700">
                Found {subscribers.length} subscribers! Generating trees...
              </div>
            )}
          </div>

          {subscribers.length === 0 && (
            <div className="text-center text-gray-400 mt-8">
              <Gift size={64} className="mx-auto mb-4 text-gray-600" />
              <p>
                Upload a CSV file or use mock data to generate your subscriber
                trees!
              </p>
            </div>
          )}
        </div>

        <div className="trees-container flex flex-row flex-wrap justify-center">
          {trees.map(({ bg, border }, treeIndex) => (
            <Fragment key={treeIndex}>
              <Tree
                bg={bg}
                border={border}
                treeIndex={treeIndex}
                subscribers={subscribers}
                getTreePositions={getTreePositions}
                randomizeTree={randomizeTree}
                treePositions={treePositions}
                setTreePositions={setTreePositions}
                topGifts={topGifts}
                topSubs={topSubs}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChristmasTreeGenerator;
