import React from "react";
import Feed from "./components/Feed";
import TokenCards from "./components/TokenCards";
import WalletConnect from "./components/WalletConnect";

function App() {
  return (
    <div className="min-h-screen bg-black text-yellow-400 p-4">
      <div className="flex justify-end mb-4">
        <WalletConnect />
      </div>
      <Feed />
      <TokenCards />
    </div>
  );
}

export default App;
