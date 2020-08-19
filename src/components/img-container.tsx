import * as React from 'react'
import classNames from 'classnames'
import '../css/img-container'

const { useState } = React

interface Props {
  src: string
}

const ImgContainer = (props: Props) => {
  const { src } = props
  const [loading, setLoading] = useState(true)
  const handleLoaded = () => { setLoading(false) }
  const imgCls = classNames({hidden: loading})

  return (
    <div className="img-container">
      <img src={src} className={imgCls} onLoad={handleLoaded} />
      {
        loading && <div className="loading"></div>
      }
    </div>
  )
}


export default ImgContainer
