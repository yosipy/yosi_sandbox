import { useParams, Link } from "react-router-dom"

export default function ArticleShow() {
  let { id } = useParams()
  console.log("ArticleShow")
  console.log(id)

  return (
    <>
      {id}
      <Link to="/">Home</Link>
      <h1>ArticleShow</h1>
    </>
  )
}
