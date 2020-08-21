import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

import '@styles/viewer.styl'

import { ImgData } from '@interfaces/index'
import ImgContainer from './img-container'

interface Props {
  list: ImgData[]
  onLoadMore?: () => {}
}

const Viewer = (props: Props) => {
  const { list } = props

  const ImgList = list.map((item) => {
    return (<ImgContainer data={item} key={item.id} onLike={(imgId) => console.log(imgId)}  />)
  })
  return (
    <div className='viewer' >
      {ImgList}
    </div>
  )
}

export default Viewer
