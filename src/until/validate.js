
export function validaTime (time) {
  const res = time.replace(/T|(.000Z)/g, ' ')
  return res
}
