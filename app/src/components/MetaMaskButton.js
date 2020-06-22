import React, { useContext } from "react";

import MetaMaskContext from "../context/metamask";
import { MetaMaskButton as Button } from 'rimble-ui'

export default function MetaMaskButton() {
  const { web3, accounts, error, awaiting, openMetaMask } = useContext(
    MetaMaskContext,
  );

  function handleButtonClick() {
    alert(`Web3 (${web3.version}) is enabled`); // eslint-disable-line no-alert
  }

  if (error && error.notInstalled) {
    return (
      <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
        Install MetaMask
      </a>
    );
  } else if (error) {
    return (
      <Button type="button" onClick={openMetaMask}>
        {error.message}
      </Button>
    );
  } else if (!web3 && awaiting) {
    return (
      <Button type="button" onClick={openMetaMask}>
        MetaMask loading...
      </Button>
    );
  } else if (!web3) {
    return (
      <Button type="button" onClick={openMetaMask}>
        Please open and allow MetaMask
      </Button>
    );
  } else if (accounts.length === 0) {
    return <Button type="button">No Wallet</Button>;
  } else {
    return (
      <Button type="button" onClick={handleButtonClick}>
        <code>{accounts[0].slice(0, 16)}</code>
      </Button>
    );
  }
}