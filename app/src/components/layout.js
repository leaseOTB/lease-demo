import React, {useContext, useEffect, useState} from 'react'
import MetaMaskButton from "./MetaMaskButton";
import ConnectionBanner from '@rimble/connection-banner'
import NetworkIndicator from '@rimble/network-indicator'

import MetaMaskContext from "../context/metamask";

import { Flex, Box } from 'rimble-ui'

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
        <Flex>
          <Box p={3} width={1 / 4} color="white" bg="white">
            <MetaMaskButton />

            <br/>
            <br/>


            <NetworkIndicator currentNetwork={netID} requiredNetwork={4}/>


          </Box>
          <Box p={3} width={3 / 4} color="white" bg="white">
            {children}
          </Box>
        </Flex>
      </div>
    )

}

export default Layout