import PropTypes from 'prop-types'
import React, { useContext, useEffect } from 'react'

import { ServiceContext } from '../ServiceContainer/index.jsx'

const Service = props => {
  const { address, name } = props

  const { container, error, mount, unmount } = useContext(ServiceContext)

  const lifecycle = () => {
    mount(name, address)

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
