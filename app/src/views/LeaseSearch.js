import React from 'react'
import {LeaseSearchBar, LeaseSearchResults} from '@leaseotb/ui-components'

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
    
      <LeaseSearchBar></LeaseSearchBar>

      <br/>
      <hr/>

      <LeaseSearchResults data={mock}></LeaseSearchResults>
    </div>
  )
}

export default LeaseSearch