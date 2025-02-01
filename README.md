# Supermarket App

## Commands

Prerequisites: 
- [pnpm installed](https://pnpm.io/installation)

### Development Commands

```bash
# install all dependencies
pnpm install
```

```bash
# open a new terminal tab/window with /backend as the root
cd backend

# start dev server at port 3000
pnpm run dev
```

```bash
# open a new terminal tab/window with /web-app as the root
cd web-app

# start dev server at port 5173
pnpm run dev
```

### Production Commands

```bash
# install all dependencies
pnpm install

# build for production
pnpm run build

# serve /backend at port 3000
pnpm run start
```

## Known Issues
- as of 2025-02-01, Tailwind v4 has been released, but shadcn/ui does not officially support Tailwind v4 yet.
    - [Related Issue](https://github.com/shadcn-ui/ui/discussions/2996)
    - [shadcn progress in upgrading to v4](https://github.com/shadcn/app-tailwind-v4)
    - best not to use shadcn/ui yet until v4 is officially supported