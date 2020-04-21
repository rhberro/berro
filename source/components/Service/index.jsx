import PropTypes from 'prop-types'
import React, { useContext, useEffect, useRef } from 'react'

import { ServiceContext } from '../ServiceContainer/index.jsx'

const Service = props => {
  const { address, name } = props

  const { mount, register, services, unmount } = useContext(ServiceContext)

  const container = useRef()

  const lifecycle = () => {
    register(name, address, container)

    mount(name)

    return () => {
      unmount(name)
    }
  }

  useEffect(lifecycle)

  return (
    <div ref={container}>
      <p>Loading...</p>
    </div>
  )
}

Service.propTypes = {
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default Service
