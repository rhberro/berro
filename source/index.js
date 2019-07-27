import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React, { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom'

import TasksService from './services/tasks'
import UsersService from './services/users'

ReactDOM.render(
  <StrictMode>
    <Suspense fallback="Loading...">
      <BrowserRouter>
        <Switch>
          <Route exact path="/users" component={UsersService} />
          <Route exact path="/tasks" component={TasksService} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
  document.getElementById('application')
)
