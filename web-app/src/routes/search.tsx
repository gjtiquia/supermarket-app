import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/search')({
    component: Search,
})

function Search() {
    return <div className="p-2">TODO : Search page</div>
}
