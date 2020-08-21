import * as React from 'react'
import { useEffect, useState } from  'react'
import { HashRouter, Route } from 'react-router-dom'

import '@styles/app.styl'

import Home from '@/pages/home/Home'
import Upload from '@/pages/upload/Upload'
import Data from '@/pages/data/Data'

const Router = HashRouter

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Route path='/upload' component={Upload}></Route>
        <Route path='/data' component={Data}></Route>
        <Route path='/' exact component={Home}></Route>
      </Router>
    </div>

  )
}

export default App
