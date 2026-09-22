import { Trash2 } from 'lucide-react'
import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useAppDispatch } from '@/redux/hooks'
import { cn } from '@/lib/utils'
import { deleteTask, toggleTask } from '@/redux/tasksSlice'
import { type Priority, type Task } from '@/types/task'
import { TaskFormDialog } from './task-form-dialog'

const priorityVariants: Record<
  Priority,
  'destructive' | 'secondary' | 'outline'
> = {
  High: 'destructive',
  Medium: 'secondary',
  Low: 'outline',
}

type TaskItemProps = {
  task: Task
}

function TaskItem({ task }: TaskItemProps) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const dispatch = useAppDispatch()

  function handleCheckedChange(checked: boolean | 'indeterminate') {
    if (typeof checked === 'boolean') {
      dispatch(toggleTask(task.id))
    }
  }

  return (
    <Card
      className={cn(
        'transition-colors',
        task.completed && 'bg-muted/40',
      )}
    >
      <CardContent className="flex items-start gap-3 p-4 sm:gap-4 sm:p-5">
        <div className="pt-1">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleCheckedChange}
            aria-label={`${task.completed ? 'Mark' : 'Complete'} ${task.title}`}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p
              className={cn(
                'min-w-0 break-words text-sm font-medium',
                task.completed &&
                  'text-muted-foreground line-through decoration-muted-foreground/50',
              )}
            >
              {task.title}
            </p>
            <Badge variant={priorityVariants[task.priority]}>
              {task.priority}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            {task.completed ? 'Completed' : 'Ready to work on'}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <TaskFormDialog task={task} />
          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Delete ${task.title}`}
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this task?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove &ldquo;{task.title}&rdquo; from
                  your task list.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => dispatch(deleteTask(task.id))}
                >
                  Delete task
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  )
}

export { TaskItem }
