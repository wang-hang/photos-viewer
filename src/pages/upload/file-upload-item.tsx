import c from 'classnames'
import * as React from 'react'
import { useState } from 'react'

interface Props {
  name: string,
  progress: number,
  status?: 'processing' | 'success' | 'fail'
}

const FileUploadItem = (props: Props) => {
  const { name, progress, status } = props

  // console.log(`${name}, ${progress}, ${status}`)
  const progressBarCls = c('upload-progress-bar', status)
  const progressStyle = {
    width: `${progress}%`,
  }
  return (
    <div className='file-upload-item'>
      <div className='file-name'>
        <span>{name}</span>
        <span>{progress}%</span>
      </div>
      <div className={progressBarCls} style={progressStyle}></div>
    </div>
  )
}

export default FileUploadItem
