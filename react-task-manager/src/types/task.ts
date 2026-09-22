export const PRIORITY_VALUES = ['High', 'Medium', 'Low'] as const

export type Priority = (typeof PRIORITY_VALUES)[number]

export type Task = {
  id: string
  title: string
  priority: Priority
  completed: boolean
}

export type AddTaskInput = Pick<Task, 'title' | 'priority'>

export type UpdateTaskInput = Pick<Task, 'id' | 'title' | 'priority'>

export function isPriority(value: unknown): value is Priority {
  return (
    typeof value === 'string' &&
    PRIORITY_VALUES.includes(value as Priority)
  )
}
