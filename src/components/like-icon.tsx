import * as React from 'react'
import { useState } from 'react'
import c from 'classnames'

import '@styles/like-icon'

interface Props{
  like: boolean,
  onClick: (like:boolean) => void
}

const LikeIcon = (props: Props) => {
  const { like, onClick } = props
  const cls = c('iconfont', like ? 'icon-heart-fill like' : 'icon-heart')
  const handleClick = () => {
    onClick(like)
  }
  return (
    <div className="like-icon" onClick={handleClick}>
      <i className={cls} />
    </div>
  )
}

export default LikeIcon