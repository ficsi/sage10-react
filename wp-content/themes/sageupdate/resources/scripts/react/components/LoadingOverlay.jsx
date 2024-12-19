import React from 'react'

function LoadingOverlay(props) {
  console.log(props)
  return (
    <div className="overlay">
      <div className="overlay__inner">
        <div className="overlay__content"><span className="spinner"></span></div>
      </div>
    </div>
  )
}

export default LoadingOverlay
