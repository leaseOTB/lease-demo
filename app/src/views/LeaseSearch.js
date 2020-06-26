import React from 'react'
import {LeaseSearchBar, LeaseSearchResults} from '@leaseotb/ui-components'
import { Button, Link } from "rimble-ui";

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
      <Link href='/send'>Send a New Lease</Link>
      
    </div>
  )
}

export default LeaseSearch