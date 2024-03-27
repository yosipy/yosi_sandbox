import { Suspense } from "react"
import { Link } from "react-router-dom"

let finished = false

const DelayComponent = () => {
  if (finished) {
    finished = false
    return (
      <div>
        <div id="title">取得したタイトル</div>
        <div id="description">取得した説明</div>
      </div>
    )
  }

  throw new Promise((resolve) => {
    return setTimeout(() => {
      finished = true
      resolve(true)
    }, 3000)
  })
}

export default function Top() {
  return (
    <>
      <Link to="/about">about</Link>
      <h1>Top - Basic</h1>
      <Suspense fallback={<div>Loading 3 sec...</div>}>
        <DelayComponent />
      </Suspense>
    </>
  )
}
