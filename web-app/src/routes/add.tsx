import { AddItemForm } from '@/components/addItemForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/add')({
    component: Add,
})

function Add() {
    return <AddItemForm />
}

function Add_OLD() {
    return (
        <div className='p-2 flex flex-col gap-2'>
            <div className='flex gap-2'>
                <p>Name:</p>
                <input className='border-1 rounded-md px-1' />
            </div>

            <div className='flex gap-1'>
                <p>Price: $</p>
                <input className='border-1 rounded-md px-1' />
            </div>

            <div className='flex gap-2'>
                <p>Unit:</p>
                <select id="unit" className='border-1 rounded-md'>
                    <option value="each">each</option>
                    <option value="per pack">per pack</option>
                    <option value="per kg">per kg</option>
                    <option value="per lb">per lb</option>
                </select>
            </div>
        </div>
    )
}
