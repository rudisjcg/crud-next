import Layout from '@/components/Layout'
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function DeleteItemPage() {

    const router = useRouter();
    const [itemInfo, setItemInfo] = useState();
    const {id} = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/items?id='+ id).then((res) => {
            setItemInfo(res.data)
        })
    }, [id])

    function goBack() {
        router.push('/')
    }

    async function deleteItem () {
        await axios.delete('/api/items?id='+ id);
        goBack();
    }

  return (
    <Layout>
        <h1>Do you want to Delete this Item?</h1>
        <div className='flex gap-10 mt-5'>

        <button onClick={deleteItem}
        className='border p-1 bg-red-500 text-white rounded-lg'>Delete</button>
        <button onClick={goBack}
        className='border p-1 bg-slate-300 text-white rounded-lg'>No, I dont</button>
        </div>
    </Layout>
  )
}
