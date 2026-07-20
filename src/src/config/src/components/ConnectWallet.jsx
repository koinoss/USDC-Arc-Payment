import { ARC_TESTNET } from "../config/chain";

export default function ConnectWallet({ account, onConnect }) {
  async function addAndSwitchNetwork() {
    if (!window.ethereum) {
      alert("MetaMask পাওয়া যায়নি। ব্রাউজারে MetaMask install করুন।");
      return;
    }
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ARC_TESTNET.chainIdHex }],
      });
    } catch (switchError) {
      // 4902 মানে network এখনো wallet-এ যোগ করা হয়নি
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: ARC_TESTNET.chainIdHex,
              chainName: ARC_TESTNET.chainName,
              rpcUrls: ARC_TESTNET.rpcUrls,
              nativeCurrency: ARC_TESTNET.nativeCurrency,
              blockExplorerUrls: ARC_TESTNET.blockExplorerUrls,
            },
          ],
        });
      } else {
        console.error(switchError);
      }
    }
  }

  async function connect() {
    if (!window.ethereum) {
      alert("MetaMask পাওয়া যায়নি। ব্রাউজারে MetaMask install করুন।");
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    await addAndSwitchNetwork();
    onConnect(accounts[0]);
  }

  return (
    <div className="connect-box">
      {account ? (
        <div className="connected">
          ✅ Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </div>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
      }
