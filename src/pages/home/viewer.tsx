import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import {debounce} from 'lodash'

import '@styles/viewer.styl'

import { InterfacePhoto } from '@interfaces/index'
import ImgContainer from './img-container'

interface Props {
  list: InterfacePhoto[]
  onLike: (id:string, like:boolean) => void,
  onLoadMore?: () => void
}

const Viewer = (props: Props) => {
  const { list, onLike, onLoadMore } = props
  const el = useRef(null)

  const handleScroll = () => {
    const imgList = el.current
    const lastChild = imgList.lastElementChild
    const winHeight = window.innerHeight
    const { top } = lastChild.getBoundingClientRect()
    const willShow =  top < winHeight + 300 // 最后一张图片即将出现在屏幕内
    // 加载更多图片
    if(willShow){
      onLoadMore()
    }
  }
  const debouncedHandler = debounce(handleScroll)

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandler)
    return () => window.removeEventListener('scroll', debouncedHandler)
  }, [])

  const ImgList = list.map((item) => {
    return (<ImgContainer data={item} key={item.id} onLike={onLike}  />)
  })
  return (
    <div className='viewer' >
      <div className='img-list' ref={el}>
        {ImgList}
      </div>
    </div>
  )
}

export default Viewer
