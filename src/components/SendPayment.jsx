import { useState } from "react";
import { BrowserProvider, parseUnits, Contract, isAddress } from "ethers";
import { ERC20_TOKEN_ADDRESS, ERC20_ABI } from "../config/chain";

export default function SendPayment({ account }) {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendPayment(e) {
    e.preventDefault();
    setStatus("");
    setTxHash("");

    if (!isAddress(to)) {
      setStatus("❌ Receiver address সঠিক না।");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setStatus("❌ সঠিক amount দিন।");
      return;
    }

    try {
      setLoading(true);
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      let tx;
      if (ERC20_TOKEN_ADDRESS) {
        const contract = new Contract(ERC20_TOKEN_ADDRESS, ERC20_ABI, signer);
        const decimals = await contract.decimals();
        tx = await contract.transfer(to, parseUnits(amount, decimals));
      } else {
        tx = await signer.sendTransaction({
          to,
          value: parseUnits(amount, 18),
        });
      }

      setStatus("⏳ Transaction পাঠানো হয়েছে, confirm হওয়ার অপেক্ষায়...");
      setTxHash(tx.hash);
      await tx.wait();
      setStatus("✅ Payment সফল হয়েছে!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Transaction ব্যর্থ হয়েছে: " + (err.shortMessage || err.message));
    } finally {
      setLoading(false);
    }
  }

  if (!account) {
    return <p className="hint">Payment পাঠাতে আগে wallet connect করুন।</p>;
  }

  return (
    <form className="send-form" onSubmit={sendPayment}>
      <label>
        Receiver Address
        <input
          type="text"
          placeholder="0x..."
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </label>
      <label>
        Amount (USDC)
        <input
          type="number"
          step="any"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "পাঠানো হচ্ছে..." : "Send Payment"}
      </button>

      {status && <p className="status">{status}</p>}
      {txHash && (
        <a
          href={`https://testnet.arcscan.app/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          Explorer-এ দেখুন ↗
        </a>
      )}
    </form>
  );
        }
