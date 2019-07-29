import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

export const ServiceContext = React.createContext()

const services = new Map()

const ServiceProvider = props => {
  const { children } = props

  const container = useRef()

  const handleLoad = event => {
    const {
      detail,
      detail: { name },
    } = event

    services.set(name, detail)

    mount(name)
  }

  const handleError = event => {
    document.body.removeChild(event.target)
  }

  const createScript = address => {
    const script = document.createElement('script')

    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', `${address}/main.js`)

    script.onerror = handleError

    document.body.appendChild(script)
  }

  const mount = (name, address) => {
    const service = services.get(name)
    if (service) {
      return service.mount(container.current)
    }

    createScript(address)
  }

  const unmount = name => {
    const service = services.get(name)
    if (service) {
      return service.unmount(container.current)
    }
  }

  const effect = () => {
    window.addEventListener('berro-service-loaded', handleLoad)

    return () => {
      window.removeEventListener('berro-service-loaded', handleLoad)
    }
  }

  const effectValues = []

  useEffect(effect, effectValues)

  const value = {
    container,
    mount,
    unmount,
  }

  return <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
}

export default ServiceProvider
