import { FileWithName, ImgData, InterfacePhoto } from '@interfaces/index'
import * as AV from 'leancloud-storage'

const appId = 'uf7FCU7x33jbyEpVE2IpFUC2-gzGzoHsz'
const appKey = 'mNsq0lrczIDT1Ux7mFJAQU8f'
const serverURL = 'http://api.wanghang.cool'
AV.init({appId, appKey, serverURL})

const uploadFile = (file: File, onprogress?) => {
    const fileInstance = new AV.File(file.name, file)
    return fileInstance.save({onprogress})
}

const uploadFiles = (fileList: FileWithName[], onprogress) => {
  const percentMap = {}
  const pList = fileList.map((f) => {
    percentMap[f.name] = 0
    return new AV.File(f.name, f.raw).save({onprogress: ({percent}) => {
      percentMap[f.name] = Math.floor(percent)
      onprogress(percentMap)
    }})
    .then((res) => {
      addPhoto(res.url())
    })
  })
  return Promise.all(pList)
}

const addPhoto = (photoUrl: string) => {
  const p = new AV.Object('Photo')
  p.set('url', photoUrl)
  p.set('like', 0)
  return p.save().then((res) => {
    console.log(`图片: ${photoUrl}  保存成功`)
  })
  .catch((err) => {
    console.error(`图片:  ${photoUrl}  保存失败`)
  })
}

const getPotos = ():Promise<InterfacePhoto[]> => {
  const query = new AV.Query('Photo')
  return query.find().then((res) => {
    const photos = res.map(item => {
      const id = item.id
      const url = item.get('url')
      const like = item.get('like')
      return { id, url, like }
    })
    return photos
  })

}

export {
  uploadFile,
  uploadFiles,
  addPhoto,
  getPotos,
}
