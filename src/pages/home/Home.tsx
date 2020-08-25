import '@styles/home.styl'
import '@utils/rem'
import * as React from 'react'
import { useEffect, useState } from  'react'
import { InterfacePhoto } from '@interfaces/index'

import * as API from '@api/index'
import Viewer from './viewer'

const App = () => {
  const [list, setList] = useState<InterfacePhoto[]>([])

  useEffect(() => {
    getPhotoList()
  }, [])

  const handleLike = (id, isLike) => {
      API.likePhoto(id, isLike).then(res => {
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
