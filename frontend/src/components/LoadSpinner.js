import React from 'react'

import Loader from 'react-loader-spinner'

const LoadSpinner = () => {
  return (
    <Loader
      type="Puff"
      color="#d8829d"
      height={100}
      width={100}
      timeout={1000}
      className="spinner"
    />

  )

}

export default LoadSpinner 