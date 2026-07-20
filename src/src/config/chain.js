// Arc Testnet network details (Circle's L1 blockchain)
// Source: https://docs.arc.network
export const ARC_TESTNET = {
  chainIdDecimal: 5042002,
  chainIdHex: "0x" + (5042002).toString(16), // 0x4CF1D2
  chainName: "Arc Testnet",
  rpcUrls: ["https://rpc.testnet.arc.network"],
  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 18, // MetaMask "add network" expects 18 here for native currency display
  },
  blockExplorerUrls: ["https://testnet.arcscan.app"],
};

// Optional: if you want to send an ERC-20 token instead of native gas-token USDC,
// put its contract address here (check testnet.arcscan.app for the current address).
export const ERC20_TOKEN_ADDRESS = ""; // leave blank to only support native transfers

export const ERC20_ABI = [
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];
