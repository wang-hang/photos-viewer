import classNames from 'classnames'
import * as Hammer from 'hammerjs'
import * as React from 'react'

import { InterfacePhoto } from '@interfaces/index'
import LikeIcon from '@components/like-icon'
import * as LS from '@utils/local-storage-manager'

import '@styles/img-container'

const { useState, useEffect, useRef } = React

interface Props {
  data: InterfacePhoto,
  onLike?: (id: string, like: boolean) => void
}

const ImgContainer = (props: Props) => {
  const localLikeList: string[] = LS.get('likeList') || []
  const { data: {url, id, likeCount}, onLike } = props
  /** State */
  const [loading, setLoading] = useState(true)
  const [isLike, setIsLike] = useState(localLikeList.includes(id))

  /** handler */
  const handleLoaded = () => { setLoading(false) }
  const toggleLike = () => {
    const preLike = isLike
    onLike(id, !preLike)
    setIsLike(!preLike)
  }

  const imgCls = classNames({hidden: loading})
  const countCls = classNames('like-count', {"is-like": isLike})

  const el = useRef(null)
  useEffect(() => {
    const manager = new Hammer.Manager(el.current)
    const doubleTap = new Hammer.Tap({
      event: 'doubletap',
      taps: 2,
    })
    manager.add(doubleTap)
    manager.on('doubletap', () => {
      toggleLike()
    })
    return () => manager.destroy()
  }, [isLike])

  return (
    <div className='img-container' ref={el} >
      <img src={url} className={imgCls} onLoad={handleLoaded} />
      {
        loading && <div className='loading'></div>
      }
      <div className='options-bar' onClick={toggleLike}>
        <LikeIcon like={isLike} ></LikeIcon>
        <div className={countCls}>{likeCount}</div>
      </div>
    </div>
  )
}

export default ImgContainer
