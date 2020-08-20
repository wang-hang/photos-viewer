import classNames from 'classnames'
import Hammer from 'hammerjs'
import * as React from 'react'

import '../css/img-container'

import { ImgData } from '../interfaces/index'

const { useState, useEffect, useRef } = React

interface Props {
  data: ImgData,
  onLike?: (index) => void
}

const ImgContainer = (props: Props) => {
  const { data: {src, id}, onLike } = props
  /** State */
  const [loading, setLoading] = useState(true)

  /** handler */
  const handleLoaded = () => { setLoading(false) }

  const imgCls = classNames({hidden: loading})
  const el = useRef(null)
  useEffect(() => {
    const manager = new Hammer.Manager(el.current)
    const doubleTap = new Hammer.Tap({
      event: 'doubletap',
      taps: 2,
    })
    manager.add(doubleTap)
    manager.on('doubletap', (e) => {
      onLike(id)
    })
    return () => manager.destroy()
  }, [])

  return (
    <div className='img-container' ref={el} >
      <img src={src} className={imgCls} onLoad={handleLoaded} />
      {
        loading && <div className='loading'></div>
      }
    </div>
  )
}

export default ImgContainer
