import React from 'react'
import MetaMaskButton from "./MetaMaskButton";
import {Grid, Button} from '@material-ui/core'

const Layout = ({ children }) => {
  return (
    <div>
      <button>Create New Lease</button>
      <hr/>
      <MetaMaskButton />

      {children}
    </div>
  )
}

export default Layout