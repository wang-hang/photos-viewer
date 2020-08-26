const LS = window.localStorage

export function set(key:string, val:any){
  LS.setItem(key, JSON.stringify(val))
}

export function get(key: string){
  const v = LS.getItem(key)
  return JSON.parse(LS.getItem(key))
}
