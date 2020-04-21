import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import React, { StrictMode, Suspense } from 'react'
import { SERVICE_CASES_HOST, SERVICE_TASKS_HOST, SERVICE_USERS_HOST } from './constants/environment'

import ReactDOM from 'react-dom'
import Service from './components/Service/index.jsx'
import ServiceContainer from './components/ServiceContainer/index.jsx'

const UsersService = () => <Service address={SERVICE_USERS_HOST} name="users" />
const TasksService = () => <Service address={SERVICE_TASKS_HOST} name="tasks" />
const CasesService = () => <Service address={SERVICE_CASES_HOST} name="cases" />

ReactDOM.render(
  <StrictMode>
    <Suspense>
      <ServiceContainer>
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/tasks">Tasks</Link>
              </li>
              <li>
                <Link to="/cases">Cases</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/users" component={UsersService} />
            <Route exact path="/tasks" component={TasksService} />
            <Route exact path="/cases" component={CasesService} />
          </Switch>
        </BrowserRouter>
      </ServiceContainer>
    </Suspense>
  </StrictMode>,
  document.getElementById('application')
)
