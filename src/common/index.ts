export async function sleep(secs = 2) {
  return new Promise((resolve) => {
    setTimeout(resolve, secs * 1000)
  })
}

export function formatFullTime() {
  const now = new Date()

  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')

  const hh = String(now.getHours()).padStart(2, '0')
  const min = String(now.getMinutes()).padStart(2, '0')
  const ss = String(now.getSeconds()).padStart(2, '0')

  return `${yyyy}/${mm}/${dd} ${hh}:${min}:${ss}`
}
