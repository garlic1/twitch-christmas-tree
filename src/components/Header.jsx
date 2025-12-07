export const Header = () => {
  return (
    <>
      <h1
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-red-400 to-green-400 bg-clip-text text-transparent"
        style={{ minHeight: "50px" }}
      >
        🎄 gerador de árvores dos subs 🎄
      </h1>
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
        <p className="text-center text-gray-300 text-sm">
          aqui eu crio a nossa árvore de subs! ela é atualizada todos os dias e
          é feita com muito carinho ♥
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
    </>
  );
};
