import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { loadTasksFromStorage } from './persistence'
import type { AddTaskInput, Task, UpdateTaskInput } from '@/types/task'

const initialState: Task[] = loadTasksFromStorage()

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.push(action.payload)
      },
      prepare({ title, priority }: AddTaskInput) {
        return {
          payload: {
            id: crypto.randomUUID(),
            title: title.trim(),
            priority,
            completed: false,
          } satisfies Task,
        }
      },
    },
    updateTask(state, action: PayloadAction<UpdateTaskInput>) {
      const task = state.find((item) => item.id === action.payload.id)

      if (task) {
        task.title = action.payload.title.trim()
        task.priority = action.payload.priority
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      const taskIndex = state.findIndex((task) => task.id === action.payload)

      if (taskIndex !== -1) {
        state.splice(taskIndex, 1)
      }
    },
    toggleTask(state, action: PayloadAction<string>) {
      const task = state.find((item) => item.id === action.payload)

      if (task) {
        task.completed = !task.completed
      }
    },
  },
})

export const { addTask, deleteTask, toggleTask, updateTask } = tasksSlice.actions
export default tasksSlice.reducer
