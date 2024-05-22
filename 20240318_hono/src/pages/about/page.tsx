import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
// import { Head } from "../../homura/head/Head"
import { useEffect, useLayoutEffect } from "react"

export default function About() {
  console.log("aboit")
  useLayoutEffect(() => {
    console.log("################useLayoutEffect")
  }, [])
  useEffect(() => {
    console.log("About effect")
  }, [])
  return (
    <>
      <Helmet>
        <title>Hello World</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      {/* <Head title="About!!" /> */}
      <Link to="/">Home</Link>
      <h1>About - Basic</h1>
    </>
  )
}
