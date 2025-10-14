import React, { useState, useEffect } from "react";

function TokenCards() {
  const [tokens, setTokens] = useState([]);

  async function fetchTokens() {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=price_change_percentage_24h_desc&per_page=50&page=1&sparkline=false"
      );
      const data = await res.json();
      // Filter exclude BTC, ETH, BNB
      const filtered = data.filter(
        c => !["bitcoin","ethereum","binancecoin"].includes(c.id)
      );
      setTokens(filtered.slice(0,10)); // top 10 hype
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchTokens();
    const interval = setInterval(fetchTokens, 30*60*1000); // 30 menit
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4">
      {tokens.map(token => (
        <div key={token.id} className="bg-gray-900 p-4 rounded flex justify-between">
          <span>{token.name}</span>
          <span className={token.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-500"}>
            {token.price_change_percentage_24h.toFixed(2)}% {token.price_change_percentage_24h > 0 ? "↑" : "↓"}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TokenCards;
