import * as React from 'react'
import { useEffect, useState } from  'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import '@styles/app.styl'

import Data from '@/pages/data/Data'
import Home from '@/pages/home/Home'
import Upload from '@/pages/upload/Upload'

const Router = HashRouter

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Switch>
          <Route path='/upload' component={Upload}></Route>
          <Route path='/data' component={Data}></Route>
          <Route path='/' component={Home}></Route>
        </Switch>
      </Router>
    </div>

  )
}

export default App
