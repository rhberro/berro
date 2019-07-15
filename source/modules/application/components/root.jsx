import { BrowserRouter, Router, Route, Switch } from 'react-router-dom'
import React from 'react'

const HomePage = React.lazy(() => import('./../../../pages/home'))
const AboutPage = React.lazy(() => import('./../../../pages/about'))

function Root() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Root
