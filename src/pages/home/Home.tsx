import * as React from 'react'
import { useEffect, useState, useRef } from  'react'
import * as _ from 'lodash'

import { InterfacePhoto } from '@interfaces/index'
import * as API from '@api/index'
import * as LS from '@utils/local-storage-manager'
import '@styles/home.styl'
import '@utils/rem'

import Viewer from './viewer'


const Home = () => {
  const [list, setList] = useState<InterfacePhoto[]>([])
  const fullListRef = useRef<InterfacePhoto[]>()

  const pageSize = 3 // 一次加载5张
  let pageIndex = 0

  useEffect(() => {
    getPhotoList()
    return () => {}
  }, [])

  const handleLike = (id: string, isLike: boolean) => {
    let localLikeList: string[] = LS.get('likeList') || []
    API.likePhoto(id, isLike).then(res => {
      if(isLike){ // 在列表里添加
        localLikeList.push(id)
        localLikeList = _.uniq(localLikeList)
      }else { // 在列表里删除
        localLikeList = _.remove(localLikeList, (oldId) => oldId === id )
      }
      // 保存到localStorage中
      LS.set('likeList', localLikeList)
      console.log(list)
      getPhotoList()
    })
  }
  const getPhotoList = () => {
    return API.getPotos().then((photoList => {
      fullListRef.current = photoList
      updateList(fullListRef.current, pageIndex)
    }))
  }
  const updateList = (fullPhotosList: InterfacePhoto[], index:number) => {
    const end = index * pageSize + pageSize
    const newPhotos = fullPhotosList.slice(0, end)
    if(end > fullPhotosList.length) return 
    console.log(fullPhotosList)
    setList(newPhotos)
  }
  const handleLoadMore = () => {
    pageIndex++
    updateList(fullListRef.current, pageIndex)
  }
  return (
    <div className='app'>
      <header className='header'>
        <h1>HH &amp;&amp; OO</h1>
      </header>
      <main className='main'>
        <Viewer list={list}  onLike={handleLike} onLoadMore={handleLoadMore} />
      </main>
    </div>

  )
}

export default Home
