import { configureStore } from '@reduxjs/toolkit'

import tasksReducer from './tasksSlice'
import { saveTasksToStorage } from './persistence'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
})

let lastPersistedTasks = store.getState().tasks

store.subscribe(() => {
  const tasks = store.getState().tasks

  if (tasks === lastPersistedTasks) {
    return
  }

  lastPersistedTasks = tasks
  saveTasksToStorage(tasks)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
