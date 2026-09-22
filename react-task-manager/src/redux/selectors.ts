import type { Task } from '@/types/task'

import type { RootState } from './store'

export const selectTasks = (state: RootState): Task[] => state.tasks

export const selectTaskById = (
  state: RootState,
  taskId: string,
): Task | undefined => selectTasks(state).find((task) => task.id === taskId)

export const selectTaskCount = (state: RootState): number =>
  selectTasks(state).length

export const selectCompletedTaskCount = (state: RootState): number =>
  selectTasks(state).filter((task) => task.completed).length

export const selectIncompleteTaskCount = (state: RootState): number =>
  selectTasks(state).filter((task) => !task.completed).length
