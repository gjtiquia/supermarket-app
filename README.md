# Supermarket App

## Commands

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
deno install

# start dev server
deno task dev
```

## Troubleshooting

- [Deno Type Error: Parameter 'c' implicitly has an 'any' type](https://github.com/honojs/hono/issues/1691)

## Known Issues

- [Deno workspace (monorepo)](https://docs.deno.com/runtime/fundamentals/workspaces/) does not play well with Vite ([related issue](https://github.com/denoland/deno/issues/26138))