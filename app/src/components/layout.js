import React, {useContext, useEffect, useState} from 'react'
import MetaMaskButton from "./MetaMaskButton";
import ConnectionBanner from '@rimble/connection-banner'
import NetworkIndicator from '@rimble/network-indicator'

import MetaMaskContext from "../context/metamask";

import { Flex, Box, Heading, Tooltip, ToastMessage } from 'rimble-ui'

const Layout = ({ children }) => {
  const { web3, accounts, error, awaiting, openMetaMask } = useContext(
    MetaMaskContext,
  );
  
  const [netID, setNet] = useState(null)


  if (web3) {
    web3.eth.getChainId().then(setNet)
  }

    return (
      <div>
          <ConnectionBanner
            currentNetwork={netID}
            requiredNetwork={4}
            onWeb3Fallback={false}>
          </ConnectionBanner>
        <Flex>
          <Box p={3} width={2 / 5} color="blue" bg="white">
            <h1 style={{fontSize: '2em'}}>Lease on the Block Demo</h1>
            <br/>
              <Heading>Your Wallet</Heading>
              <br/>
              <MetaMaskButton />
            <br/>

            <br/>


          </Box>
          <Box p={3} width={3 / 5} color="white" bg="white">
            {children}
          </Box>
        </Flex>
        <Box p={3} color="white" bg="blue" >
          <p>Click for Repository - Refresh Page to Update Metamask Data (bug as of 7/10)</p> 
          <br/>
          &copy;2020 Lease on the Block 
        </Box>
      </div>
    )

}

export default Layout