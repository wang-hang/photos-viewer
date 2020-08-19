import * as React from 'react'
import './css/style.styl'
import './utils/rem'
import { useEffect, useState } from  'react'

import Viewer from './components/viewer'
import { getImgList } from './api/index'

const App = (props: any) => {
  const [list, setList] = useState([])

  useEffect(() => {
    getImgList().then(res => setList(res))
  })

  return (
    <div className='app'>
      <header className='header'>
        This is Header
      </header>
      <main className='main'>
        <Viewer list={list} />
      </main>
    </div>

  )
}

export default App
