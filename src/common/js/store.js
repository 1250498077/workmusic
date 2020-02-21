export function savaToLocal(id, value) {
  console.log('savaToLocal方法')
  console.log(id)
  console.log(value)
  sessionStorage.setItem(id, value)
}
export function loadFromlLocal(id) {
  console.log('loadFromlLocal方法')
  console.log(id)
  console.log(sessionStorage.getItem(id))
  return sessionStorage.getItem(id)
}
