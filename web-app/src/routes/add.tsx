import { AddItemForm } from '@/components/addItemForm'
import { createFileRoute } from '@tanstack/react-router'

// TODO : fix routing problems, ie. going directly to /add doesn't work

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
