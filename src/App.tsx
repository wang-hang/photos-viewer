import * as React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'

import '@styles/app.styl'

import Data from '@/pages/data/Data'
import Home from '@/pages/home/Home'
import Upload from '@/pages/upload/Upload'

import { logIn } from '@api/index'

const App = () => {
  const search = useLocation().search
  const searchParams = new URLSearchParams(search.replace('?', ''))
  const username = searchParams.get('username')
  const pwd = searchParams.get('pwd')
  if(username && pwd){
    logIn(username, pwd).then(res => {
      console.log('登录成功')
    })
    .catch(err => {
      console.log('登录失败')
    })
  }
  return (
    <div className='app'>
        <Switch>
          <Route path='/upload' component={Upload}></Route>
          <Route path='/data' component={Data}></Route>
          <Route path='/' component={Home}></Route>
        </Switch>
    </div>

  )
}

export default App
