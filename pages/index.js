import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home({ suppliers }) {

 

  function deleteSupplier(id) {
    fetch(`/api/supplier/${id}`,
      {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        // alert("Deleting " + id)
        window.location.reload(false);
      })

  }

  return (
    <>
      <Head>
        <title>Suppliers</title>
      </Head>
      <h1 style={{textAlign:'center'}}>Suppliers</h1>
      <p style={{margin: '2rem', textAlign: 'center'}}>
        <Link href="/suppliers/add">+New Supplier</Link>
      </p>
      <table><thead>
          <tr>
            <th style={{width: '20rem'}}>Supplier Name </th>
            <th style={{width: '10rem'}}>Address</th>
            <th style={{width: '10rem'}}>Phone Number</th>
            <th style={{width: '10rem'}}>Action</th>
          </tr>
        </thead>
        <tbody>
        {
          suppliers.map(supplier => {
            return (
              <tr  key={supplier._id}>
                <td style={{textAlign:'center'}}>
                  <Link href={`/suppliers/${supplier._id}`}>
                    
                    {supplier.supplier_name}

                    
                    
                  </Link>
                </td>
                <td style={{textAlign:'center'}}>{supplier.address}</td>
                <td style={{textAlign:'center'}}>{supplier.phoneNumber}</td>
                <td style={{textAlign: 'center'}}>
                  <button  onClick={() => deleteSupplier(supplier._id)}>Delete</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
      </table>
      <p>
      </p>

    </>
  )
}
export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/supplier/`)
  const suppliers = await res.json()
  
  // console.debug('blog 1', blogs)
  return { props: { suppliers } }
}