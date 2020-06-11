import React from "react";

import Routes from './router/Routes'

import MetaMaskContext from "./metamask";
import MetaMaskButton from "./MetaMaskButton";

export default function App() {
  return (
    <div>
      <h3>LeaseOTB Quorum Demo</h3>
      <MetaMaskContext.Provider immediate value={null}>
        <MetaMaskButton />

        <Routes/>
      </MetaMaskContext.Provider>
    </div>
  );
}
