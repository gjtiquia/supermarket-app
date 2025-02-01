import { useEffect, useState } from "react";
import { client } from "./backend";

function App() {
    const [result, setResult] = useState("(loading)");

    useEffect(() => {
        getItemsAsync();

        async function getItemsAsync() {
            const response = await client.api["recent-items"].$get();
            const json = await response.json();
            setResult(json.items[0].name);
        }
    }, [])

    return (
        <div className="h-dvh flex flex-col items-center justify-center">
            <h1>{result}</h1>
        </div>
    );
}

export default App;
