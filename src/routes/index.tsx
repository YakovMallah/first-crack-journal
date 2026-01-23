import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          First Crack Journal
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Follow my journey as I dive deep into the world of coffee. 
          From professional courses and tasting sessions to unique café experiences, 
          this is a record of everything I'm learning about the craft and culture of coffee.
        </p>
      </div>
    </div>
  )
}


