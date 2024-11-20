/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { getContract } from "./HelloNameContract";

function Token() {
  const [contract, setContract] = useState(null);
  const [name, setName] = useState("");
  const [inputName, setInputName] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    const initContract = async () => {
      const contractInstance = await getContract();
      if (contractInstance) {
        setContract(contractInstance);

        // Example: Load initial name from contract
        const initialName = await contractInstance.methods.getName().call();
        setName(initialName);
      } else {
        console.error("Error initializing contract");
      }
    };

    initContract();
  }, []);

  useEffect(() => {
    const connectToMetaMask = async () => {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.request({ method: "eth_requestAccounts" });
          console.log("Connected to MetaMask");

          // Get current MetaMask account
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          setCurrentAccount(accounts[0]);

          // Listen for account change
          window.ethereum.on("accountsChanged", (newAccounts) => {
            setCurrentAccount(newAccounts[0]);
          });
        } catch (error) {
          console.error("User denied account access or other error:", error);
        }
      } else {
        console.error("MetaMask extension not detected");
      }
    };

    connectToMetaMask();
  }, []);

  const handleInputChange = (event) => {
    setInputName(event.target.value);
  };

  const storeName = async () => {
    setLoading(true);
    try {
      await contract.methods.setName(inputName).send({ from: currentAccount });
      setLoading(false);
      setInputName(""); // Clear input field after successful store
    } catch (error) {
      console.error("Error storing name:", error);
      setLoading(false);
    }
  };

  const getName = async () => {
    try {
      const storedName = await contract.methods.getName().call();
      setName(storedName);
    } catch (error) {
      console.error("Error getting name:", error);
    }
  };

  return (
    <div className="app">
      <h1>Hello World and Name DApp</h1>
      <div className="form">
        <input
          type="text"
          value={inputName}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />

        <button onClick={storeName}>Set Name</button>
      </div>
      <button onClick={getName} className="btn">
        Get Name
      </button>
      <div>
        <p>Your stored name: {name}</p>
        {/* Added for error handling */}
        {/* {loading && <p>Loading...</p>}
        <p>Connected Account: {currentAccount}</p> */}
      </div>
    </div>
  );
}

export default Token;
