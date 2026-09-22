import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function App() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-3xl items-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Task Manager</CardTitle>
            <CardDescription>
              A focused workspace for keeping your work moving.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              The task workspace is ready for state management and task
              actions.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default App
