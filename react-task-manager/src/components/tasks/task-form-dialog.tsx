import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/redux/hooks'
import { addTask } from '@/redux/tasksSlice'
import { PRIORITY_VALUES, type Priority } from '@/types/task'

const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Enter a task title.')
    .max(100, 'Task titles must be 100 characters or fewer.'),
  priority: z.enum(PRIORITY_VALUES),
})

type TaskFormValues = z.infer<typeof taskFormSchema>

const defaultValues: TaskFormValues = {
  title: '',
  priority: 'Medium',
}

function TaskFormDialog() {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const form = useForm<TaskFormValues>({
    defaultValues,
    resolver: zodResolver(taskFormSchema),
  })

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (!nextOpen) {
      form.reset(defaultValues)
    }
  }

  function onSubmit(values: TaskFormValues) {
    dispatch(
      addTask({
        title: values.title.trim(),
        priority: values.priority as Priority,
      }),
    )
    form.reset(defaultValues)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" size="lg" className="w-full sm:w-auto">
          <Plus />
          Add task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create a task</DialogTitle>
          <DialogDescription>
            Add a clear next step and give it a priority so it is easy to find.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="grid gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task title</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      placeholder="e.g. Prepare the weekly update"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Keep it specific and under 100 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PRIORITY_VALUES.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create task</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export { TaskFormDialog }
