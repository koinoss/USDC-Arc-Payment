import { useState } from "react";
import ConnectWallet from "./components/ConnectWallet.jsx";
import SendPayment from "./components/SendPayment.jsx";

export default function App() {
  const [account, setAccount] = useState(null);

  return (
    <div className="container">
      <h1>Arc Testnet Payment Dapp</h1>
      <p className="subtitle">
        Circle-এর Arc Testnet-এ USDC পেমেন্ট পাঠান (wallet to wallet)
      </p>

      <ConnectWallet account={account} onConnect={setAccount} />
      <SendPayment account={account} />

      <footer>
        <p>Chain ID: 5042002 &middot; Faucet: faucet.circle.com</p>
      </footer>
    </div>
  );
}
