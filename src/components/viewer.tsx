import * as React from 'react'
import ImgContainer from './img-container'
import '../css/viewer.styl'

interface Props {
  list: string[]
  onLoadMore?: () => {}
}

const Viewer = (props: Props) => {
  const { list } = props

  const ImgList = list.map(url => {
    return (<ImgContainer src={url} key={url} />)
  })
  return (
    <div className="viewer">
      {ImgList}
    </div>
  )
}

export default Viewer


