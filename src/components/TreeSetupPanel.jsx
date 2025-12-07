import { MOCK_SUBS } from "../enums/mock";
import { TREES } from "../enums/trees";
import { exportAllTrees } from "../utils/export";

export const TreeSetupPanel = ({
  handleFileUpload,
  setSubscribers,
  topGifts,
  topSubs,
  updateTopGift,
  updateTopSub,
  subscribers,
  error,
}) => {
  return (
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
            onClick={() => exportAllTrees(TREES, subscribers)}
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
  );
};
