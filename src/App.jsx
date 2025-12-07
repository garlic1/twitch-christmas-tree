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
        .starry-bg {
          background: linear-gradient(to top, #1e1b4b, #581c87, #4c1d95);
          position: relative;
        }
        
        .starry-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(2px 2px at 20% 30%, white, transparent),
            radial-gradient(2px 2px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(2px 2px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 15% 90%, white, transparent),
            radial-gradient(2px 2px at 40% 20%, white, transparent),
            radial-gradient(1px 1px at 70% 40%, white, transparent),
            radial-gradient(1px 1px at 25% 60%, white, transparent),
            radial-gradient(2px 2px at 85% 85%, white, transparent),
            radial-gradient(1px 1px at 10% 15%, white, transparent),
            radial-gradient(1px 1px at 95% 35%, white, transparent),
            radial-gradient(2px 2px at 45% 75%, white, transparent),
            radial-gradient(1px 1px at 65% 25%, white, transparent),
            radial-gradient(1px 1px at 30% 45%, white, transparent),
            radial-gradient(2px 2px at 55% 90%, white, transparent),
            radial-gradient(1px 1px at 75% 55%, white, transparent),
            radial-gradient(1px 1px at 5% 70%, white, transparent),
            radial-gradient(2px 2px at 88% 20%, white, transparent),
            radial-gradient(1px 1px at 42% 38%, white, transparent),
            radial-gradient(1px 1px at 68% 82%, white, transparent),
            radial-gradient(2px 2px at 12% 52%, white, transparent),
            radial-gradient(1px 1px at 92% 48%, white, transparent),
            radial-gradient(1px 1px at 38% 12%, white, transparent),
            radial-gradient(2px 2px at 78% 68%, white, transparent),
            radial-gradient(1px 1px at 22% 28%, white, transparent),
            radial-gradient(1px 1px at 58% 58%, white, transparent),
            radial-gradient(2px 2px at 72% 8%, white, transparent),
            radial-gradient(1px 1px at 48% 92%, white, transparent);
          background-size: 100% 100%;
          background-position: 
            0% 0%, 40% 60%, 130% 270%, 70% 100%, 20% 50%, 90% 30%, 50% 80%,
            60% 40%, 110% 150%, 35% 75%, 15% 25%, 85% 85%, 5% 45%, 95% 65%,
            45% 15%, 75% 95%, 25% 35%, 65% 55%, 55% 75%, 10% 10%, 80% 20%,
            30% 90%, 100% 50%, 40% 30%, 70% 70%, 20% 60%, 90% 40%, 50% 20%,
            60% 80%, 15% 55%;
          opacity: 0.8;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-950 to-red-950 p-8 starry-bg ">
        <div className="max-w-6xl mx-auto relative z-10">
          <h1
            className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-red-400 to-green-400 bg-clip-text text-transparent"
            style={{ minHeight: "50px" }}
          >
            🎄 gerador de árvores dos subs 🎄
          </h1>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <p className="text-center text-gray-300 text-sm">
              aqui eu crio a nossa árvore de subs! ela é atualizada todos os
              dias e é feita com muito carinho ♥
            </p>
          </div>
          <a
            href="https://twitch.tv/sarisla"
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-8 mx-auto max-w-2xl"
          >
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all p-4 rounded-lg shadow-lg border-2 border-purple-400 text-center cursor-pointer transform hover:scale-105">
              <p className="text-white text-lg font-bold">
                ✨ venha fazer parte da árvore! ✨
              </p>
              <p className="text-purple-200 text-sm mt-1">twitch.tv/sarisla</p>
            </div>
          </a>

          <div className="bg-gray-800/90 backdrop-blur rounded-lg shadow-xl p-6 mb-8 border-2 border-red-900">
            <div className="space-y-4">
              <div className="flex flex-row items-center gap-2">
                <div className="flex-1">
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
                <p className="text-white text-lg font-bold">ou</p>
                <div>
                  <button
                    onClick={() => setSubscribers(MOCK_SUBS)}
                    className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-600 px-3"
                  >
                    🎄 Ver Exemplo
                  </button>
                </div>
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
              {subscribers.length > 0 && (
                <button
                  onClick={() => exportAllTrees(trees, subscribers)}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700"
                >
                  Exportar Todas As Árvores
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
                Encontrou {subscribers.length} subs! Gerando árvores...
              </div>
            )}
          </div>

          {subscribers.length === 0 && (
            <div className="text-center text-neutral-200 mt-8">
              <Gift size={64} className="mx-auto mb-4 text-neutral-200" />
              <p>Faça o upload de um arquivo .csv ou veja o exemplo!</p>
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
        <footer className="mt-16 py-6 border-t border-gray-700 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400 text-sm">
              Desenvolvido com ódio ♥ por{" "}
              <a
                href="https://garlico.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              >
                garlico
              </a>
            </p>
            <p>
              <a
                href="https://github.com/garlic1/twitch-christmas-tree"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 font-semibold transition-colors"
              >
                🎄 Source Code 🎄
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChristmasTreeGenerator;
