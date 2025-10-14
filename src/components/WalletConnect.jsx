import React, { useState } from "react";
import { ethers } from "ethers";

function WalletConnect() {
  const [wallet, setWallet] = useState(null);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWallet(accounts[0]);
      } catch (err) {
        console.error("User rejected wallet connection");
      }
    } else {
      alert("Metamask not detected");
    }
  }

  return (
    <div>
      {wallet ? (
        <span>Connected: {wallet.slice(0,6)}...{wallet.slice(-4)}</span>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-yellow-400 text-black px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default WalletConnect;
