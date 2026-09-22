import { FilterX } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Priority } from '@/types/task'

type FilteredEmptyStateProps = {
  onReset: () => void
  priority: Priority
}

function FilteredEmptyState({
  onReset,
  priority,
}: FilteredEmptyStateProps) {
  return (
    <Card className="overflow-hidden border-dashed shadow-none">
      <CardContent className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center sm:min-h-72">
        <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <FilterX className="size-7" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold">No {priority} priority tasks</h3>
        <p className="text-muted-foreground mt-2 max-w-md text-sm leading-6">
          There are no tasks at this priority yet. Show all tasks to see the
          rest of your list.
        </p>
        <Button type="button" variant="outline" className="mt-5" onClick={onReset}>
          Show all tasks
        </Button>
      </CardContent>
    </Card>
  )
}

export { FilteredEmptyState }
