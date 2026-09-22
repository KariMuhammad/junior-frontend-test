# React task manager

A small task manager built with React, TypeScript, Redux Toolkit, Tailwind CSS, and shadcn/ui.

## Requirements

- Node.js 20.19 or newer
- npm

## Setup

From this directory, install the dependencies:

```bash
npm install
```

## Run the app

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed by Vite. To serve the production build locally, run:

```bash
npm run build
npm run preview
```

## Checks

Run the linter and production build before handing off changes:

```bash
npm run lint
npm run build
```

## Features

- Create tasks with a trimmed title and High, Medium, or Low priority.
- Reject blank titles and titles longer than 100 characters.
- Edit a task's title or priority without changing its completion state.
- Toggle completion from each task card.
- Delete tasks through a confirmation dialog.
- Filter the list by All, High, Medium, or Low priority.
- Show total and completed task counts.
- Persist tasks across reloads with safe handling for malformed or unavailable storage.
- Use the keyboard to move through dialogs, forms, selects, and task actions.

## Persistence

Tasks are stored in `localStorage` under:

```text
fekra-task-manager.tasks.v1
```

The app validates the stored task shape before loading it. Missing data, invalid JSON, invalid task records, duplicate IDs, and storage errors produce an empty in-memory list instead of a startup error.

## Architecture

```text
src/
├── components/
│   ├── tasks/       Task cards, forms, filters, and empty states
│   └── ui/          shadcn/ui primitives
├── redux/           Store, typed hooks, slice, selectors, persistence
├── types/           Task and priority contracts
├── App.tsx          Responsive shell and view-level filter state
└── main.tsx         Redux Provider and application entry point
```

Redux owns task data and lifecycle actions. The priority filter stays in the view because it only changes which tasks are rendered. Components dispatch actions through the typed hooks and read state through selectors.

## Manual verification

Check the app at a narrow mobile width and a desktop width.

- Add one task at each priority.
- Submit with the keyboard.
- Confirm blank and overlong titles show useful errors.
- Edit a title and priority, then confirm completion is unchanged.
- Cancel an edit and confirm the task stays unchanged.
- Toggle a task and confirm its visual state changes.
- Open delete confirmation, cancel it, then delete a task.
- Try All, High, Medium, and Low filters.
- Confirm the filtered-empty state and reset action.
- Reload the page and confirm tasks remain.
- Replace the stored value with invalid JSON and confirm the app starts with an empty list.
- Confirm icon-only edit, delete, and checkbox controls have accessible names.
- Run `npm run lint` and `npm run build`.
