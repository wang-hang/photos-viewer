import * as React from 'react'
import { useState } from 'react'
import c from 'classnames'

import '@styles/like-icon'

interface Props{
  like: boolean,
}

const LikeIcon = (props: Props) => {
  const { like, } = props
  const cls = c('iconfont', like ? 'icon-heart-fill like' : 'icon-heart')
  return (
    <div className="like-icon">
      <i className={cls} />
    </div>
  )
}

export default LikeIcon