/*
Update page
It populates the supplier data into the form.
*/
import Head from "next/head"
import Link from "next/link"

import { useState } from "react";
import { useForm } from "react-hook-form";



// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Supplier({ supplier }) {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");


  const updateSupplier = async (data) => {
    const response = await fetch(`/api/supplier/${supplier._id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // serialisation
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const result = await response.json();   // deserialise
    if (result.error) {
      alert("Error: " + result.error)
    } else {
      alert("Supplier updated")
      window.location.href = "/suppliers"
    }
    console.log(result)
    setData(JSON.stringify(data))
  }

  console.log('supplier 2', supplier)
  if (!supplier) return (
    <div>
      <p>Supplier not found</p>
      <Link href="/suppliers">Back</Link>
    </div>
  );

  return (
    <>
      <Head>
        <title>Update {supplier.title}</title>
      </Head>

      <div style={{ margin: '1rem' }}>
        <form onSubmit={handleSubmit(updateSupplier)}>
          <h1>Update Supplier</h1>
          <label htmlFor="title">supplier name</label><br />
          <input id="title" {...register("supplier_name", { required: true })} 
          placeholder="Supplier Name" 
          defaultValue={supplier.supplier_name}
          /><br />

          <label htmlFor="title">Address</label><br />
          <input id="title" {...register("address", { required: true })} 
          placeholder="Your Address" 
          defaultValue={supplier.address}
          /><br />
          <label htmlFor="content">Phone Number</label><br />
          <textarea id="text" {...register("phoneNumber")} placeholder="About you" 
          defaultValue={supplier.phoneNumber}/><br />
          <input type="submit" />
          <p>{data}</p><br />
        </form>
      </div>

      <Link href="/suppliers">Back</Link>
    </>
  )
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
  console.debug('params', params)
  const res = await fetch(`http://localhost:3000/api/supplier/${params.id}`)
  const supplier = await res.json()
  console.debug('supplier 1', supplier)
  return { props: { supplier } }
}