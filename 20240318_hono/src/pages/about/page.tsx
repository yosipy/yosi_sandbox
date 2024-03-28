import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Head } from "../../homura/head/Head"

export default function About() {
  console.log("aboit")
  return (
    <>
      <Helmet>
        <title>Hello World</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      {/* <Head>
        <title>Hello World</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Head> */}
      <Link to="/">Home</Link>
      <h1>About - Basic</h1>
    </>
  )
}
