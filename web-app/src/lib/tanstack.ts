import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
})

// Query Keys as individual constants
export const QUERY_KEYS = {
    session: "session",
    // Add other query keys here as needed
} as const;