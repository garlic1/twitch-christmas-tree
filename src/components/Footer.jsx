export const Footer = () => {
  return (
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
  );
};
