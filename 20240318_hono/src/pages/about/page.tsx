import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"

export default function About() {
  console.log("aboit")
  return (
    <>
      <Helmet>
        <title>Hello World</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Link to="/">Home</Link>
      <h1>About - Basic</h1>
    </>
  )
}
