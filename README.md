## How to install packages :

## 1- Tailwind CSS -> npm install tailwindcss @tailwindcss/vite

- import tailwind css in vite.config.ts files
  import tailwindcss from "@tailwindcss/vite";
- import tailwind css in index.css file
  @import "tailwindcss";

## 2- Flowbite With React -> npm install flowbite-react

- import flowbiteReact in vite.config.ts files
  import flowbiteReact from "flowbite-react/plugin/vite";
- import plugins in index.css file
  @import "flowbite-react/plugin/tailwindcss";
  @source "../.flowbite-react/class-list.json";

## 3- Lucide Icon -> npm install lucide-react

- import this package in your file component

## 4- Axios HTTP Client For Laravel API -> npm i axios

## 5- Router Navigation -> npm i react-router-dom

- import this package in main.tsx file and use in router floder

## 6- Toast Notifications -> npm i react-hot-toast

- import this package when you need to show error succes messages

## 7- Framer Motion Animation -> npm i framer-motion

## 8- Eslint - Prettier -> npm i -D prettier eslint-config-prettier

- for cleaning code match with all teams project

## 9- Web Socket -> npm i laravel-echo pusher-js : Notice X Not Yet

- import this server in the api folder when you use it

## 10- Zustand => npm install zustand

## 11 - Lottie React => npm install lottie-react

## Requirements :

- Node.js 22.20.0
- npm 10+
- Git

## Run Project :

- npm install
- npm run dev

## CMD :

- npm list --depth=0

## Environment Variables :

- Inside .env file Type :

- VITE_API_URL=http://127.0.0.1:8000/api

# Reverb

VITE_REVERB_APP_KEY=
VITE_REVERB_HOST=
VITE_REVERB_PORT=

## Git Workflow

- Create a new feature branch from develop.
- Do not push directly to develop.
- Create a Pull Request after finishing your task.

## Coding Rules

- Use TypeScript.
- Use functional components.
- Use PascalCase for components.
- Use camelCase for variables.
- Keep components reusable.

## Strucutre

- Feature based Strucutre

## API

- Laravel Backend
- Base URL: https://asmasaleh-dev-5803994.postman.co/workspace/North-And-South-Star's-Workspac~8b0683c4-37ad-4b31-886d-62c5455502ff/collection/56201067-71bd5744-104c-469a-87ae-0b6d62727229?action=share&creator=56221919
- http://127.0.0.1:8000/api
