import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Tool } from "@/lib/types"

interface ToolGridProps {
  tools: Tool[]
}

export default function ToolGrid({ tools }: ToolGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <Card
          key={tool.id}
          className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-md bg-primary/10 text-primary">{tool.icon}</div>
              <CardTitle>{tool.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="min-h-[60px]">{tool.description}</CardDescription>
          </CardContent>
          <CardFooter>
            <Link href={`/tools/${tool.id}`} className="w-full">
              <Button className="w-full group-hover:bg-primary/90 transition-colors">Use Now</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

