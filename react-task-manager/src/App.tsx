import { Inbox, ListTodo } from 'lucide-react'
import { useMemo, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TaskFormDialog } from '@/components/tasks/task-form-dialog'
import { FilteredEmptyState } from '@/components/tasks/filtered-empty-state'
import { TaskFilterControls } from '@/components/tasks/task-filter-controls'
import { filterTasksByPriority } from '@/components/tasks/task-filtering'
import { TaskList } from '@/components/tasks/task-list'
import { useAppSelector } from '@/redux/hooks'
import {
  selectCompletedTaskCount,
  selectTasks,
  selectTaskCount,
} from '@/redux/selectors'
import { type PriorityFilter } from '@/types/task'

function App() {
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('All')
  const tasks = useAppSelector(selectTasks)
  const taskCount = useAppSelector(selectTaskCount)
  const completedTaskCount = useAppSelector(selectCompletedTaskCount)
  const visibleTasks = useMemo(
    () => filterTasksByPriority(tasks, priorityFilter),
    [priorityFilter, tasks],
  )
  const hasTasks = taskCount > 0
  const hasVisibleTasks = visibleTasks.length > 0

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <header className="flex flex-col gap-6 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <ListTodo className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
                Fekra workspace
              </p>
              <h1 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                Task Manager
              </h1>
            </div>
          </div>
          <TaskFormDialog />
        </header>

        <section className="flex flex-1 flex-col justify-center py-12 sm:py-16">
          <div className="mx-auto w-full max-w-3xl">
            <div className="mb-8 max-w-2xl">
              <p className="text-primary text-sm font-semibold tracking-wide">
                {hasTasks ? 'Keep the momentum going' : 'A calmer way to plan'}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
                {hasTasks
                  ? 'Your next steps are ready to take shape.'
                  : 'Make space for your next win.'}
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl text-base leading-7 sm:text-lg">
                {hasTasks
                  ? `${taskCount} ${taskCount === 1 ? 'task is' : 'tasks are'} saved. Use the controls on each card to keep them moving.`
                  : 'Capture the work that matters, set its priority, and move through your day with a clear view of what comes next.'}
              </p>
            </div>

            {hasTasks ? (
              <div className="grid gap-5">
                <TaskFilterControls
                  completedCount={completedTaskCount}
                  filter={priorityFilter}
                  onFilterChange={setPriorityFilter}
                  totalCount={taskCount}
                />
                {hasVisibleTasks ? (
                  <TaskList tasks={visibleTasks} />
                ) : priorityFilter === 'All' ? null : (
                  <FilteredEmptyState
                    priority={priorityFilter}
                    onReset={() => setPriorityFilter('All')}
                  />
                )}
              </div>
            ) : (
              <Card className="overflow-hidden border-dashed shadow-none">
                <CardHeader className="sr-only">
                  <CardTitle>Your task list is empty</CardTitle>
                  <CardDescription>
                    Create your first task to get started.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center sm:min-h-72">
                  <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                    <Inbox className="size-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Your task list is empty
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-md text-sm leading-6">
                    Start with one small, concrete action. You can always
                    adjust the priority later.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <footer className="text-muted-foreground flex items-center justify-between border-t pt-5 text-xs">
          <span>Simple planning, steady progress.</span>
          <span>{taskCount} saved</span>
        </footer>
      </div>
    </main>
  )
}

export default App
