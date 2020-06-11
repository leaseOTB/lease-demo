import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import MetaMaskContext from "../metamask";

export default ({ render, ...routeProps }) => {
  const { web3 } = useContext(MetaMaskContext)

  return (
    <Route
      {...routeProps}
      render={() => (web3 ?
        render() :
        <Redirect to='/' />)
      }
    />
  )
}