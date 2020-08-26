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
      setList(photoList)
    }))
  }

  return (
    <div className='app'>
      <header className='header'>
        <h1>HH &amp;&amp; OO</h1>
      </header>
      <main className='main'>
        <Viewer list={list}  onLike={handleLike}/>
      </main>
    </div>

  )
}

export default App
