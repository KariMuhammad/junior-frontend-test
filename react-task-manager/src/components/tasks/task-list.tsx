import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Task } from '@/types/task'
import { TaskItem } from './task-item'

type TaskListProps = {
  tasks: Task[]
}

function TaskList({ tasks }: TaskListProps) {
  return (
    <section aria-labelledby="task-list-heading" className="grid gap-4">
      <CardHeader className="px-0">
        <CardTitle id="task-list-heading">Your tasks</CardTitle>
        <CardDescription>
          Work through each item, or adjust its details as priorities change.
        </CardDescription>
      </CardHeader>
      <div className="grid gap-3">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </section>
  )
}

export { TaskList }
