import React, { useState, useEffect } from "react";
import { Gift } from "lucide-react";
import { generateTree } from "./generateTree";
import { MOCK_SUBS } from "./mock";
import { exportAllTrees, exportTreesAsPNG } from "./export";
import { generateEvenlyDistributedPositions } from "./generatePositions";

const trees = [
  { bg: "bg-red-600", border: "border-yellow-400" },
  { bg: "bg-purple-600", border: "border-neutral-900" },
  { bg: "bg-blue-600", border: "border-neutral-900" },
  { bg: "bg-green-600", border: "border-lime-400" },
  { bg: "bg-orange-600", border: "border-yellow-300" },
];

const ChristmasTreeGenerator = () => {
  const [clientId, setClientId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [broadcasterId, setBroadcasterId] = useState("");
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for OAuth token in URL on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      if (token) {
        setAccessToken(token);
        // Clear the hash from URL
        window.history.replaceState(null, "", window.location.pathname);

        // Get user info with this token
        getUserInfo(token);
      }
    }
  }, []);

  const getUserInfo = async (token) => {
    const storedClientId = clientId || localStorage.getItem("clientId");
    if (!storedClientId) return;

    try {
      const response = await fetch("https://api.twitch.tv/helix/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Client-Id": storedClientId,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data[0]) {
          setBroadcasterId(data.data[0].id);
          setIsLoggedIn(true);
        }
      }
    } catch (err) {
      console.error("Error getting user info:", err);
    }
  };

  const handleLogin = () => {
    if (!clientId) {
      alert("Please enter your Client ID first");
      return;
    }

    localStorage.setItem("clientId", clientId);

    const redirectUri = window.location.origin;
    const scope = "channel:read:subscriptions";
    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=token&scope=${scope}`;

    window.location.href = authUrl;
  };

  const useMockData = () => {
    setSubscribers(MOCK_SUBS);
    setError("");
  };

  const fetchSubscribers = async () => {
    setLoading(true);
    setError("");

    try {
      const allSubs = [];
      let cursor = null;
      let hasMore = true;

      while (hasMore) {
        const url = new URL("https://api.twitch.tv/helix/subscriptions");
        url.searchParams.append("broadcaster_id", broadcasterId);
        url.searchParams.append("first", "100");
        if (cursor) {
          url.searchParams.append("after", cursor);
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Client-Id": clientId,
          },
        });

        if (!response.ok) {
          throw new Error(
            `API Error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        allSubs.push(...data.data);

        cursor = data.pagination?.cursor;
        hasMore = !!cursor;
      }

      const sorted = allSubs.sort((a, b) => {
        const monthsA = a.tenure?.months || 0;
        const monthsB = b.tenure?.months || 0;
        return monthsB - monthsA;
      });

      setSubscribers(sorted);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const [treePositions, setTreePositions] = useState({});

  const getTreePositions = (treeIndex) => {
    const startIdx = treeIndex * 38;
    const treeSubs = subscribers.slice(startIdx, startIdx + 38);

    if (!treePositions[treeIndex]) {
      const newPositions = generateEvenlyDistributedPositions(treeSubs);
      setTreePositions((prev) => ({ ...prev, [treeIndex]: newPositions }));
      return newPositions;
    }
    return treePositions[treeIndex];
  };

  const randomizeTree = (treeIndex) => {
    const startIdx = treeIndex * 38;
    const treeSubs = subscribers.slice(startIdx, startIdx + 38);
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
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-green-800">
            🎄 Twitch Subscriber Christmas Trees 🎄
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Setup</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Client ID
                </label>
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Your Twitch App Client ID"
                />
              </div>

              {!isLoggedIn ? (
                <div className="space-y-3">
                  <button
                    onClick={handleLogin}
                    disabled={!clientId}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Login with Twitch
                  </button>

                  <div className="text-center text-sm text-gray-600">
                    Or enter manually:
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Access Token
                    </label>
                    <input
                      type="password"
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="OAuth token with channel:read:subscriptions scope"
                      autoComplete="new-password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Broadcaster ID
                    </label>
                    <input
                      type="text"
                      value={broadcasterId}
                      onChange={(e) => setBroadcasterId(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Twitch channel user ID"
                    />
                  </div>

                  <button
                    onClick={() => setIsLoggedIn(true)}
                    disabled={!accessToken || !broadcasterId}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Use Manual Credentials
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 bg-green-100 text-green-700 rounded-lg">
                    ✓ Logged in! Broadcaster ID: {broadcasterId || "Loading..."}
                  </div>

                  {broadcasterId && (
                    <button
                      onClick={fetchSubscribers}
                      disabled={loading}
                      className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {loading ? "Loading..." : "Generate Trees"}
                    </button>
                  )}
                </div>
              )}

              <button
                onClick={useMockData}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700"
              >
                Use Mock Data (for testing)
              </button>

              <button
                onClick={exportAllTrees}
                disabled={subscribers.length === 0}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Export Trees as PNG
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                Error: {error}
              </div>
            )}

            {subscribers.length > 0 && (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                Found {subscribers.length} subscribers! Generating trees...
              </div>
            )}
          </div>

          {/* Trees */}

          {subscribers.length === 0 && !loading && (
            <div className="text-center text-gray-600 mt-8">
              <Gift size={64} className="mx-auto mb-4 text-gray-400" />
              <p>
                Enter your Twitch API credentials above to generate your
                subscriber trees!
              </p>
            </div>
          )}
        </div>
        <div className="trees-container flex flex-row flex-wrap justify-center">
          {trees.map(({ bg, border }, treeIndex) =>
            generateTree(
              bg,
              border,
              treeIndex,
              subscribers,
              getTreePositions,
              randomizeTree
            )
          )}
        </div>
      </div>
    </>
  );
};

export default ChristmasTreeGenerator;
