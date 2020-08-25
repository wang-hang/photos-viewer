import { uploadFiles } from '@api/index'
import { FileWithName } from '@interfaces/index'
import * as _ from 'lodash'
import * as React from 'react'
import { useRef, useState } from 'react'
import c from 'classnames'

import '@styles/upload'

import FileUploadItem from './file-upload-item'
interface PercentMap {
  [key: string]: {
    percent: number,
    status: 'processing' | 'success' | 'fail',
  }
}

const Upload = () => {
  const inputEl = useRef(null)
  const [fileList, setFileList]  = useState<FileWithName[]>([])
  const [percentMap, setPercentMap]  = useState<PercentMap>({})
  const [loading, setLoading]  = useState<boolean>(false)
  const hasFiles = fileList.length !== 0
  const allUploaded = hasFiles && Object.values(percentMap).every(v => v.status === 'success')
  const buttonDisabled = loading || allUploaded
  const btnCls = c('btn submit-btn', {'disabled': buttonDisabled})

  /** Handler */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = fileList
    const files = [...e.target.files]
    e.target.value = null
    const newList = files.map((f) => {
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
    setLoading(true)
    uploadFiles(fileList, handleProgress)
    .then(() => {
      setLoading(false)
    })
    .catch((err) => {
      console.error(err)
    })
  }
  const handleProgress = (percentObj: {[key: string]: number}) => {
    const newPercentMap: PercentMap = {...percentMap}
    for (const key in percentObj) {
      const percent = percentObj[key]
      newPercentMap[key] = {
        percent,
        status: percent < 100 ? 'processing' : 'success',
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
        fileList.map((f) => {
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
      <div className='form' onSubmit={handleSubmit}>
        <input type='file' ref={inputEl} className='file' multiple onChange={handleFileChange} />
        <div className='upload-landing' >
          {
            hasFiles
            ?
            fileListDom
            :
            <div className='placeholder' onClick={handleAddFile}>点击添加文件</div>
          }
        </div>
        <button type='submit' className={btnCls} onClick={handleSubmit} disabled={loading || allUploaded}>上传</button>
        <button className='btn clear-btn' onClick={handleClear}>清空</button>
      </div>
    </div>
  )
}

export default Upload
