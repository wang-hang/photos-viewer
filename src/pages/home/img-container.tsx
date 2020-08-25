import classNames from 'classnames'
import * as Hammer from 'hammerjs'
import * as React from 'react'

import '@styles/img-container'

import { InterfacePhoto } from '../../interfaces/index'
import LikeIcon from '@components/like-icon'

const { useState, useEffect, useRef } = React

interface Props {
  data: InterfacePhoto,
  onLike?: (id: string) => void
}

const ImgContainer = (props: Props) => {
  const { data: {url, id, likeCount}, onLike } = props
  /** State */
  const [loading, setLoading] = useState(true)
  const [isLike, setIsLike] = useState(false)

  /** handler */
  const handleLoaded = () => { setLoading(false) }
  const handleToggleLike = (preLike) => {
    console.log(preLike)
    setIsLike(!isLike)
  }

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
      <img src={url} className={imgCls} onLoad={handleLoaded} />
      {
        loading && <div className='loading'></div>
      }
      <div className='options-bar'>
        <div className='heart'>
          <LikeIcon like={isLike} onClick={handleToggleLike}></LikeIcon>
        </div>
      </div>
    </div>
  )
}

export default ImgContainer
