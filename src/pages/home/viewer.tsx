import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

import '@styles/viewer.styl'

import { InterfacePhoto } from '@interfaces/index'
import ImgContainer from './img-container'

interface Props {
  list: InterfacePhoto[]
  onLike: (id:string, like:boolean) => void,
  onLoadMore?: () => {}
}

const Viewer = (props: Props) => {
  const { list, onLike } = props

  const ImgList = list.map((item) => {
    return (<ImgContainer data={item} key={item.id} onLike={onLike}  />)
  })
  return (
    <div className='viewer' >
      {ImgList}
    </div>
  )
}

export default Viewer
