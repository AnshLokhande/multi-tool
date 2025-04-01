import type { ReactNode } from "react"

export interface Tool {
  id: string
  name: string
  description: string
  icon: ReactNode
  category: "pdf" | "image" | "video" | "audio" | "code" | "archive"
  allowMultiple?: boolean
}

