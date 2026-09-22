import type { PriorityFilter, Task } from '@/types/task'

export function filterTasksByPriority(
  tasks: readonly Task[],
  priorityFilter: PriorityFilter,
): Task[] {
  if (priorityFilter === 'All') {
    return [...tasks]
  }

  return tasks.filter((task) => task.priority === priorityFilter)
}
