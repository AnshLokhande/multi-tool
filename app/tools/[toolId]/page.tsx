'use client'
import { notFound } from "next/navigation"
import { pdfTools, imageTools, videoTools, audioTools, codeTools, archiveTools } from "@/lib/tool-data"
import FileUploader from "@/components/file-uploader"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ToolPageProps {
  params: {
    toolId: string
  }
}

// Change the component to be async and await params
export default async function ToolPage({ params }: ToolPageProps) {
  // Access toolId by awaiting params
  const toolId = await params.toolId

  // Find the tool from all tool categories
  const allTools = [...pdfTools, ...imageTools, ...videoTools, ...audioTools, ...codeTools, ...archiveTools]

  const tool = allTools.find((t) => t.id === toolId)

  if (!tool) {
    notFound()
  }

  return (
    <div className="container py-12 px-4 md:px-6">
      <Link
        href="/#tools"
        className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to tools</span>
      </Link>

      <div className="flex flex-col items-center text-center mb-12">
        <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">{tool.icon}</div>
        <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
        <p className="text-muted-foreground max-w-[600px]">{tool.description}</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <FileUploader toolId={toolId} category={tool.category} />
      </div>
    </div>
  )
}

