export const PRIORITY_VALUES = ['High', 'Medium', 'Low'] as const

export const PRIORITY_FILTER_VALUES = ['All', ...PRIORITY_VALUES] as const

export type Priority = (typeof PRIORITY_VALUES)[number]

export type PriorityFilter = (typeof PRIORITY_FILTER_VALUES)[number]

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

export function isPriorityFilter(value: unknown): value is PriorityFilter {
  return (
    typeof value === 'string' &&
    PRIORITY_FILTER_VALUES.includes(value as PriorityFilter)
  )
}
