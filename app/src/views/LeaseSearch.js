import React from 'react'
import {LeaseSearchBar, LeaseSearchResults} from '@leaseotb/ui-components'
import { Button, Link, Card, Heading, EthAddress} from "rimble-ui";

const LeaseSearch = () => {
  
  const mock = [
    {
      address: '411 Washington',
      contract: '49184027148s29j',
      rent: '500',
    },
    {
      address: '402 Washington',
      contract: '1340589238jx0',
      rent: '300',
    }
  ]
  return (
    <div>
      <br/>
      <Card bg='blue' color='white' style={{borderRadius: '.5em'}}>
      <Heading>Lease Factory</Heading>
      <br/>
        <Card bg='white' color='blue' style={{borderRadius: '.5em'}}>
          <EthAddress address='0xec5ca73b02089ccf31f03dbd5e68211f8fa82f22cc5982ddcb342e1f70a7bcb4'/>
          <br/>
          <a target='__blank' href='https://rinkeby.etherscan.io/address/0xb2b00110576a5c485f8bd7e834ba38f48d99c5a1#code'>
            View on Etherscan
          </a>
       </Card>
        </Card>
    </div>
  )
}

export default LeaseSearch