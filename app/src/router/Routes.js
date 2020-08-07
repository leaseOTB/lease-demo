import React from 'react'
import {Redirect, BrowserRouter, Route, Switch} from 'react-router-dom'
import AuthRoute from './AuthRoute'

import LeaseSearch from '../views/LeaseSearch'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <LeaseSearch/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes