import * as React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import '@styles/app.styl'
import 'react-toastify/dist/ReactToastify.min.css';

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
      toast.success('登录成功')
    },
    )
    .catch((err ) => {
      toast.error(`登录失败:${err}`, {
        position: toast.POSITION.TOP_CENTER
      })
    })
  }
  return (
    <div className='app'>
        <Switch>
          <Route path='/upload' component={Upload}></Route>
          <Route path='/data' component={Data}></Route>
          <Route path='/' component={Home}></Route>
        </Switch>
        <ToastContainer hideProgressBar autoClose={3000} position='top-center'  closeButton={false}/>
    </div>

  )
}

export default App
