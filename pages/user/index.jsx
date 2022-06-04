import Link from 'next/link'
import React from 'react'

const User = ({ users }) => {
  return (
    <div>
      <h2>This is Users Main Page</h2>
      <h4>Number of Users : {users?.length}</h4>

      <div>
        {users?.map((user) => (
          <div key={user?.id}>
            <h4>{user?.name}</h4>
            <Link href={`/user/${user?.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default User

export async function getStaticProps(context) {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()
  return {
    props: { users }, // will be passed to the page component as props
  }
}
