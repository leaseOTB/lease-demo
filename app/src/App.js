import React from "react";

import Routes from "./router/Routes";

import MetaMaskContext from "./context/metamask";
import Layout from "./components/layout";

import "./assets/Tailwind.css";

export default function App() {
  return (
    <div>
      <MetaMaskContext.Provider immediate value={null}>
        <Layout>
          <Routes />
        </Layout>
      </MetaMaskContext.Provider>
    </div>
  );
}
