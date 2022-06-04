import { useRouter } from 'next/router'
import React from 'react'

const User = ({ user }) => {
  const router = useRouter()
  const { id } = router.query
  return (
    <div>
      <h2>This is User Page with id : {id}</h2>
      <h1>User Name : {user?.name}</h1>
      <p>Email : {user?.email}</p>
      <p>Phone : {user?.phone}</p>
    </div>
  )
}

export default User

export async function getStaticPaths() {
  // Call an external API endpoint to get users
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()

  // Get the paths we want to pre-render based on users
  const paths = users.map((user) => ({
    params: { id: JSON.stringify(user.id) },
  }))

  console.log(paths)
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params?.id}`
  )
  const user = await res.json()

  // Pass post data to the page via props
  return { props: { user } }
}
