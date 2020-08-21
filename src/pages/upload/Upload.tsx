import * as React from 'react'
import * as _ from 'lodash'
import classnames from 'classnames'
import { uploadFiles, addPhoto } from '@api/index'
import {  useEffect, useState, useRef } from 'react'
import { FileWithName, InterfacePhoto } from '@interfaces/index'

import '@styles/upload'

import FileUploadItem from './file-upload-item'
type PercentMap = {
  [key: string]: {
    percent: number,
    status: 'processing' | 'success' | 'fail'
  }
}


const Upload = () => {
  const inputEl = useRef(null)
  const [fileList, setFileList]  = useState<FileWithName[]>([])
  const [percentMap, setPercentMap]  = useState<PercentMap>({})
  const hasFiles = fileList.length !== 0

  /** Handler */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = fileList
    const files = [...e.target.files]
    e.target.value = null
    const newList = files.map(f => {
      return { raw: f, name: f.name }
    })

    const newPercentMap = {...percentMap}
    newList.forEach((f) => {
      newPercentMap[f.name] = {percent: 0, status: 'processing'}
    })

    setPercentMap(newPercentMap)
    setFileList(list.concat(newList))
  }
  const handleAddFile = () => {
    inputEl.current.click()
  }
  const handleSubmit = () => {
    uploadFiles(fileList, handleProgress)
    .catch(err => {
      console.error(err)
    })
  }
  const handleProgress = (percentObj: {[key: string]: number}) => {
    const newPercentMap: PercentMap = {...percentMap}
    for(const key in percentObj){
      const percent = percentObj[key]
      newPercentMap[key] = {
        percent,
        status: percent < 100 ? 'processing' : 'success'
      }
    }
    setPercentMap(newPercentMap)
  }
  const handleClear = () => {
    setFileList([])
  }

  /** DOM  */
  const fileListDom = (
    <ul className='file-list'>
      {
        fileList.map(f => {
        const percent = _.get(percentMap, [f.name, 'percent'], 0)
        const status = _.get(percentMap, [f.name, 'status'], 'processing')
        return (
          <FileUploadItem name={f.name} key={f.name} progress={percent} status={status} />
        )
      })
      }
    </ul>
  )
  return (
    <div className='upload'>
      <h1 className='title'>Upload</h1>
      <div className="form" onSubmit={handleSubmit}>
        <input type="file" ref={inputEl} className="file" multiple onChange={handleFileChange} />
        <div className="upload-landing" onClick={handleAddFile}>
          {
            hasFiles
            ?
            fileListDom
            :
            <div className="placeholder">点击添加文件</div>
          }
        </div>
        <button type="submit" className='btn submit-btn' onClick={handleSubmit}>确定</button>
        <button className='btn clear-btn' onClick={handleClear}>清空</button>
      </div>
    </div>
  )
}

export default Upload