// HelloNameContract.js

import Web3 from "web3";
import HelloName from "./HelloName.json"; // Replace with your actual ABI file

// Function to initialize Web3 and load contract
export const getContract = async () => {
  const provider = await detectEthereumProvider();

  if (provider) {
    const web3 = new Web3(provider);

    try {
      // Request account access if needed
      await provider.request({ method: "eth_requestAccounts" });
      console.log("Connected to MetaMask");

      // Get current network ID
      const networkId = await web3.eth.net.getId();

      // Load deployed contract
      const deployedNetwork = HelloName.networks[networkId];
      const contract = new web3.eth.Contract(
        HelloName.abi,
        deployedNetwork.address
      );

      return contract;
    } catch (error) {
      console.error("User denied account access or other error:", error);
      return null;
    }
  } else {
    console.error("MetaMask extension not detected");
    return null;
  }
};

// Function to detect MetaMask provider
const detectEthereumProvider = async () => {
  const provider = await window.ethereum;
  if (provider) {
    await provider.request({ method: "eth_requestAccounts" });
    return provider;
  } else {
    console.error("Please install MetaMask extension");
    return null;
  }
};
