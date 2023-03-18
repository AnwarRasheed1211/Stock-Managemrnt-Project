import Head from 'next/head'
import Link from 'next/link'


export default function Home() {
  return (
    <>
      <Head>
        <title>Anwar Rasheed Page</title>
      </Head>
      <h1>Anwar Rasheed Page</h1>
      <p>
        This is a sample page for Anwar Rasheed
      </p>
      <Link href="/about">About</Link>
 
    </>
  )
}
