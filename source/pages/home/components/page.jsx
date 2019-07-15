import React from 'react'
import { Link } from 'react-router-dom'

function Page() {
  return (
    <div>
      This is the homepage, you can{' '}
      <Link to="/about">visit the about page.</Link>
    </div>
  )
}

export default Page
