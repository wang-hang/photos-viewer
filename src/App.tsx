import * as React from 'react'
import { useEffect, useState } from  'react'
import './css/style.styl'
import './utils/rem'

import { getImgList } from './api/index'
import Viewer from './components/viewer'

const App = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    getImgList().then((res) => setList(res))
  })

  return (
    <div className='app'>
      <header className='header'>
        <h1>HH &amp;&amp; OO</h1>
      </header>
      <main className='main'>
        <Viewer list={list} />
      </main>
    </div>

  )
}

export default App
