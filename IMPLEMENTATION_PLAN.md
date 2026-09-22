# React task manager handoff

## Current status

- The repository currently contains the assignment README only.
- The working tree was clean when this handoff was written.
- No application files, dependencies, or commits have been added yet.
- The next thread should start with subtask 1 and stop after its commit.

## Scope

Build the web challenge in `react-task-manager/`. The React Native challenge is out of scope because the user wants to work on web development only, even though the assignment README mentions both challenges.

## Decisions

- Use Vite, React, and TypeScript.
- Use Redux Toolkit for task state and typed React Redux hooks.
- Use Tailwind CSS and shadcn/ui for reusable UI primitives.
- Use React Hook Form and Zod for task form handling and validation.
- Use npm as the package manager.
- Use an English, left-to-right, responsive light interface.
- Do not add automated tests. Run lint and production builds, then follow the manual acceptance checklist.
- Compose app-specific pieces such as `TaskForm`, `TaskList`, and `TaskItem` from shadcn primitives. Do not hand-build generic controls.

## Data contract

```ts
type Priority = "High" | "Medium" | "Low"

type Task = {
  id: string
  title: string
  priority: Priority
  completed: boolean
}
```

Redux actions:

- `addTask({ title, priority })`
- `updateTask({ id, title, priority })`
- `deleteTask(id)`
- `toggleTask(id)`

Generate IDs with `crypto.randomUUID()`. Editing must preserve the existing task ID and completion state.

Persist tasks under `fekra-task-manager.tasks.v1`. Validate stored data before loading it. Malformed data, missing data, and storage errors must fall back to an empty task list without crashing the app.

## Subtasks and commit boundaries

Complete these in order. After each item, run its checks, create the listed commit, report the result, and wait for user approval before starting the next item.

### 1. Scaffold the app

Create `react-task-manager/` from the Vite React TypeScript template. Configure Tailwind CSS, shadcn/ui, the `@/` import alias, ESLint, and npm scripts. Add only the shadcn primitives needed by the later work, including Button, Card, Dialog, AlertDialog, Input, Select, Checkbox, Badge, and Form.

Checks:

- `npm run lint`
- `npm run build`

Commit: `chore: scaffold task manager app`

Stop and report the commit hash.

### 2. Add Redux state and persistence

Configure the store, provider, typed hooks, task types, slice actions, selectors, safe `localStorage` hydration, and a store subscription that persists task changes.

Checks:

- `npm run build`
- Manually dispatch or exercise the slice through a temporary development path and confirm add, update, toggle, delete, hydrate, and persistence behavior.

Commit: `feat: add task state and persistence`

Stop and report the commit hash.

### 3. Build task creation

Create the responsive app shell and empty state. Add a shadcn dialog with a React Hook Form and Zod schema. The form must collect a trimmed title and priority, reject blank titles and titles over 100 characters, dispatch valid submissions, close after success, and reset for the next task.

Checks:

- `npm run lint`
- `npm run build`
- Manually verify validation, keyboard submission, task creation, and reload persistence.

Commit: `feat: add task creation flow`

Stop and report the commit hash.

### 4. Add task actions

Render reusable task cards with title, priority badge, and completion checkbox. Add editing through the shared form. Add deletion through a confirmation alert dialog. Completed tasks should remain actionable and have a clear visual treatment.

Checks:

- `npm run lint`
- `npm run build`
- Manually verify edit, cancel edit, toggle, delete, cancel delete, and persistence after reload.

Commit: `feat: add task editing and lifecycle actions`

Stop and report the commit hash.

### 5. Add priority filters

Add an `All`, `High`, `Medium`, and `Low` shadcn select. Keep the selected filter in component state and derive the visible list without mutating Redux state. Add a filter-specific empty state and compact total and completed counts.

Checks:

- `npm run lint`
- `npm run build`
- Manually verify every filter before and after task edits, toggles, and deletes.

Commit: `feat: add priority filters and task summary`

Stop and report the commit hash.

### 6. Polish and document

Finish responsive spacing, focus states, accessible labels, screen-reader text for icon-only buttons, and error-safe layouts. Add setup, run, build, architecture, and manual verification instructions for the web app.

Checks:

- `npm run lint`
- `npm run build`
- Complete the acceptance checklist below at narrow and desktop widths.

Commit: `docs: finalize task manager submission`

Stop and report the final commit list.

## Acceptance checklist

- A user can add a task at every priority.
- Blank and overlong titles are rejected.
- A user can edit a title and priority without changing completion state.
- A user can cancel editing or deletion without changing data.
- A user can toggle completion and delete tasks.
- Priority filters show the correct tasks, and `All` restores the full list.
- Tasks survive a full browser reload.
- Invalid stored data does not crash startup.
- Empty, filtered-empty, and populated states render correctly.
- Controls work by keyboard.
- The layout remains usable on narrow and desktop screens.
- The production build and lint command pass.

## Useful references

- Vite guide: https://vite.dev/guide/
- shadcn Vite installation: https://ui.shadcn.com/docs/installation/vite
- Redux Toolkit TypeScript quick start: https://redux-toolkit.js.org/tutorials/typescript
