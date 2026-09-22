import { isPriority, type Task } from '@/types/task'

export const TASK_STORAGE_KEY = 'fekra-task-manager.tasks.v1'

const MAX_TASK_TITLE_LENGTH = 100

function getStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return window.localStorage
  } catch {
    return null
  }
}

function isTaskRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function isStoredTask(value: unknown): value is Task {
  if (!isTaskRecord(value)) {
    return false
  }

  return (
    typeof value.id === 'string' &&
    value.id.trim().length > 0 &&
    typeof value.title === 'string' &&
    value.title.trim().length > 0 &&
    value.title.length <= MAX_TASK_TITLE_LENGTH &&
    isPriority(value.priority) &&
    typeof value.completed === 'boolean'
  )
}

function isTaskList(value: unknown): value is Task[] {
  if (!Array.isArray(value) || !value.every(isStoredTask)) {
    return false
  }

  const ids = value.map((task) => task.id)
  return new Set(ids).size === ids.length
}

export function parseStoredTasks(serializedTasks: string | null): Task[] {
  if (!serializedTasks) {
    return []
  }

  try {
    const parsed: unknown = JSON.parse(serializedTasks)
    return isTaskList(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function loadTasksFromStorage(
  storage: Storage | null = getStorage(),
): Task[] {
  if (!storage) {
    return []
  }

  try {
    return parseStoredTasks(storage.getItem(TASK_STORAGE_KEY))
  } catch {
    return []
  }
}

export function saveTasksToStorage(
  tasks: readonly Task[],
  storage: Storage | null = getStorage(),
): void {
  if (!storage) {
    return
  }

  try {
    storage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // Storage may be unavailable or full. The in-memory state remains usable.
  }
}
