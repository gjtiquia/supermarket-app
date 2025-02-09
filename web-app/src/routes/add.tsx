import { AddItemForm } from '@/components/addItemForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/add')({
    component: Add,
})

function Add() {
    return (
        <div className='p-2 max-w-sm mx-auto'>
            <AddItemForm />
        </div>
    )
}
