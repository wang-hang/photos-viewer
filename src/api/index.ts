import { ImgData } from '../interfaces/index'

function getImgList(): Promise<ImgData[]> {
  return new Promise((resolve, reject) => {
    const list = [
      // 'http://files.wanghang.cool/wallpaper-1.jpg',
      // 'http://files.wanghang.cool/wallpaper-2.jpeg',
      // 'http://files.wanghang.cool/wallpaper-3.jpg',
      {id: 1, src: 'http://files.wanghang.cool/wallpaper-4.jpg' },
      {id: 2, src: 'http://files.wanghang.cool/wallpaper-4.jpg' },
      {id: 3, src: 'http://files.wanghang.cool/wallpaper-4.jpg' },
      {id: 4, src: 'http://files.wanghang.cool/wallpaper-4.jpg' },
    ]
    setTimeout(() => resolve(list), 200)
  })
}

export {
  getImgList,
}
