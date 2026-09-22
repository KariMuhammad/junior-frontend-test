# Frontend project guide

This checkout contains a React task manager in `react-task-manager/`. You can add, edit, complete, delete, and filter tasks by priority. Tasks are saved in the browser.

## What you need

- Node.js 20.19 or newer
- npm

## Run the app

1. Open a terminal in `react-task-manager/`.
2. Install packages with `npm install`.
3. Start the development server with `npm run dev`.
4. Open the local URL printed by Vite.

## Useful commands

- `npm run lint` checks the code.
- `npm run build` makes a production build.
- `npm run preview` serves the production build locally. Run `npm run build` first.

## Where things live

- `src/App.tsx` lays out the main screen and priority filter.
- `src/components/tasks/` contains task cards, forms, and filter controls.
- `src/redux/` contains task state, actions, selectors, and browser storage.
- `src/types/task.ts` defines task types and priorities.

Tasks are saved in local storage under `fekra-task-manager.tasks.v1`. They stay in the same browser and device where you created them.
