import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react';
import { client } from '../backend';

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const [result, setResult] = useState("(loading)");

    useEffect(() => {
        getItemsAsync();

        async function getItemsAsync() {
            const response = await client.api["recent-items"].$get();
            const json = await response.json();
            setResult(JSON.stringify(json));
        }
    }, [])

    return (
        <div className='p-2'>
            <h1>{result}</h1>
        </div>
    );
}
