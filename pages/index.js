import Link from 'next/link'
import Layout from '@/components/Layout'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'


export default function Home() {
  const user = useSession();
  const [items, setItem] = useState([]);
  useEffect(() => {
    axios.get('/api/items').then((res) => {
      setItem(res.data)
    })
  }, [])
  console.log(user)
  
  return (
    <Layout>

    <div className='flex flex-col m-5 gap-10'>
      <div className='flex gap-5 justify-center items-center'>
      <img src={user.data.user.image} className='w-10 rounded-full'/>
      <h2>{user.data.user.name}</h2>
      </div>
    <Link href={'/items/New'}
    className='border w-[100px] text-center rounded-md bg-green-500'
    >New Item</Link>
    <div>
      <h1>List of Items</h1>
      <span>items...</span>
      <table>
        <thead>
          <td>Item Name</td>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td className='w-[200px]'>{item.name}</td>
              <td className='flex gap-5'>
                <Link href={'/items/edit/'+item._id}
                className='border pl-2 pr-2 bg-green-500 text-white rounded-lg'>Edit</Link>
                <Link href={'/items/delete/'+item._id}
                className='border pl-2 pr-2 bg-red-500 text-white rounded-lg'>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </Layout>
  )
}
