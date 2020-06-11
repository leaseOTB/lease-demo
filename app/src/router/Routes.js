import React from 'react'
import {Redirect, BrowserRouter, Route, Switch} from 'react-router-dom'
import AuthRoute from './AuthRoute'

import LeaseSearch from '../views/LeaseSearch'
import LeaseNew from '../views/LeaseNew'
import LeasePending from '../views/LeasePending'
import LeasePage from '../views/LeasePage'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/'>
          <LeaseSearch/>
        </Route>
        <AuthRoute path='/send/'>
          <LeaseNew/>
        </AuthRoute>
        <AuthRoute path='/pending'>
          <LeasePending/>
        </AuthRoute>
        <Route path='/lease/:leaseID'>
          <LeasePage/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes