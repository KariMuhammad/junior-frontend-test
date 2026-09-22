import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  isPriorityFilter,
  PRIORITY_FILTER_VALUES,
  type PriorityFilter,
} from '@/types/task'

type TaskFilterControlsProps = {
  completedCount: number
  filter: PriorityFilter
  onFilterChange: (filter: PriorityFilter) => void
  totalCount: number
}

function TaskFilterControls({
  completedCount,
  filter,
  onFilterChange,
  totalCount,
}: TaskFilterControlsProps) {
  function handleFilterChange(value: string) {
    if (isPriorityFilter(value)) {
      onFilterChange(value)
    }
  }

  return (
    <div className="grid gap-4 rounded-xl border bg-card p-4 shadow-xs sm:grid-cols-[1fr_auto] sm:items-end">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">
          {totalCount} {totalCount === 1 ? 'total task' : 'total tasks'}
        </Badge>
        <Badge variant="secondary">
          {completedCount} completed
        </Badge>
      </div>

      <div className="grid gap-2 sm:min-w-48">
        <label
          htmlFor="priority-filter"
          className="text-muted-foreground text-xs font-medium"
        >
          Filter by priority
        </label>
        <Select value={filter} onValueChange={handleFilterChange}>
          <SelectTrigger id="priority-filter" className="w-full">
            <SelectValue placeholder="All priorities" />
          </SelectTrigger>
          <SelectContent>
            {PRIORITY_FILTER_VALUES.map((priority) => (
              <SelectItem key={priority} value={priority}>
                {priority === 'All' ? 'All priorities' : priority}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export { TaskFilterControls }
