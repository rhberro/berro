import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

export const ServiceContext = React.createContext()

const services = new Map()

const setServiceAttribute = (name, attribute, value) => {
  const service = services.get(name)

  if (!service) {
    return
  }

  const attr = { [attribute]: value }
  const attrs = Object.assign(service, attr)

  services.set(name, attrs)
}

const setServiceAttributes = (name, attributes) => {
  const service = services.get(name)

  if (!service) {
    return
  }

  const attrs = Object.assign(service, attributes)

  services.set(name, attrs)
}

const ServiceProvider = props => {
  const { children } = props

  const onScriptLoad = event => {
    const { detail } = event
    const { name } = detail

    const service = services.get(name)

    if (!service) {
      return
    }

    setServiceAttributes(name, detail)
    setServiceAttribute(name, 'loaded', true)
    setServiceAttribute(name, 'loading', false)

    mount(name)
  }

  const onScriptError = (name, event) => {
    document.body.removeChild(event.target)
    setServiceAttribute(name, 'error', 'Failed to load service.')
    setServiceAttribute(name, 'loading', false)
  }

  const getManifest = async address => {
    try {
      const manifest = await fetch(`${address}/manifest.json`)
      return await manifest.json()
    } catch (error) {
      return error
    }
  }

  const getScript = name => {
    const service = services.get(name)

    const { manifest } = service
    const { entry } = manifest

    const script = document.createElement('script')

    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', entry)

    script.addEventListener('error', onScriptError)

    document.body.appendChild(script)
  }

  const load = async name => {
    const service = services.get(name)

    const { address } = service

    const manifest = await getManifest(address)

    setServiceAttribute(name, 'loading', true)
    setServiceAttribute(name, 'manifest', manifest)

    getScript(name)
  }

  const unmount = name => {
    const service = services.get(name)

    const { container, loaded, unmount } = service

    if (loaded && container && unmount) {
      return unmount(container.current)
    }
  }

  const mount = name => {
    const service = services.get(name)

    const { container, loaded, loading, mount } = service

    if (loading) {
      return
    }

    if (loaded) {
      return mount(container.current)
    }

    return load(name)
  }

  const register = (name, address, container) => {
    const service = services.get(name)

    if (service) {
      return setServiceAttribute(name, 'container', container)
    }

    const attributes = {
      address,
      container,
      error: null,
      loaded: false,
      loading: false,
      mount: null,
      name,
      unmount: null,
    }

    services.set(name, attributes)
  }

  const effect = () => {
    window.addEventListener('berro-service-loaded', onScriptLoad)

    return () => {
      window.removeEventListener('berro-service-loaded', onScriptLoad)
    }
  }

  const effectValues = []

  useEffect(effect, effectValues)

  const value = {
    mount,
    register,
    unmount,
  }

  return <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
}

export default ServiceProvider
