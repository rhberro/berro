import React, { Suspense, StrictMode } from 'react'
import ReactDOM from 'react-dom'

import Root from './modules/application'

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <Root />
    </Suspense>
  </StrictMode>,
  document.getElementById('application')
)

if (module && module.hot) module.hot.accept()
