# Supermarket App

## Commands

Prerequisites: 
- [Deno installed](https://docs.deno.com/runtime/getting_started/installation/)
- [pnpm installed](https://pnpm.io/installation)

```bash
cd backend

# install dependencies
deno install

# starts server at port 8000
deno task start
```

```bash
cd web-app

# install dependencies
pnpm install

# start dev server
pnpm run dev
```

## Troubleshooting

- [Deno Type Error: Parameter 'c' implicitly has an 'any' type](https://github.com/honojs/hono/issues/1691)

## Known Issues

- [Deno workspaces (monorepos)](https://docs.deno.com/runtime/fundamentals/workspaces/) does not play well with Vite ([related issue](https://github.com/denoland/deno/issues/26138)), so we are not using workspaces in this project
- Deno's typescript errors are also not popping up properly on the Vite project, so we will use pnpm instead for the `/web-app`, and use Deno for the `/backend`

