function getImgList():Promise<string[]>{
  return new Promise((resolve, reject) => {
    const list = [
      'http://files.wanghang.cool/wallpaper-1.jpg',
      // 'http://files.wanghang.cool/wallpaper-2.jpeg',
      // 'http://files.wanghang.cool/wallpaper-3.jpg',
      // 'http://files.wanghang.cool/wallpaper-4.jpg',
    ]
    setTimeout(() => resolve(list), 200)
  })
}

export {
  getImgList,
}