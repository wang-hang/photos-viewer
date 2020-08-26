import * as React from 'react'
import { useEffect, useState } from  'react'
import * as _ from 'lodash'

import { InterfacePhoto } from '@interfaces/index'
import * as API from '@api/index'
import * as LS from '@utils/local-storage-manager'
import '@styles/home.styl'
import '@utils/rem'

import Viewer from './viewer'

const App = () => {
  const [list, setList] = useState<InterfacePhoto[]>([])
  let pageIndex = 0
  const pageSize = 5 // 一次加载5张
  let fullList = []

  useEffect(() => {
    getPhotoList()
  }, [])

  const handleLike = (id, isLike) => {
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
      getPhotoList()
    })
  }
  const getPhotoList = () => {
    API.getPotos().then((photoList => {
      fullList = photoList
      updateList()
    }))
  }
  const updateList = () => {
    const end = pageIndex * pageSize + pageSize
    const newPhotos = fullList.slice(0, end)
    if(end > fullList.length) return 
    setList(newPhotos)
  }
  const handleLoadMore = () => {
    pageIndex++
    updateList()
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

export default App
