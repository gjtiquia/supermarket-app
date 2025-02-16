import { createAuthClient } from "better-auth/react"

// TODO : use .env and production url
// TODO : and in the backend, in dev, need to allow cors, for the auth client to work in dev port 5173
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000" // the base url of your auth server
})