"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, Check, X, Download, Save, FileIcon, FileAudioIcon, Archive, ImageIcon, VideoIcon } from "lucide-react"
import { SignInButton } from "@clerk/nextjs"
import ToolOptions from "./tool-options"
import { getToolById } from "@/lib/tool-data"

interface FileUploaderProps {
  toolId: string
  category: string
}

export default function FileUploader({ toolId, category }: FileUploaderProps) {
  const { toast } = useToast()
  const { isSignedIn } = useUser()
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [processedFileUrl, setProcessedFileUrl] = useState<string | null>(null)
  const [toolOptions, setToolOptions] = useState<Record<string, any>>({})

  // Get the tool details
  const tool = getToolById(toolId)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (newFiles: File[]) => {
    // Validate file types based on the tool category and specific tool
    const validFiles = newFiles.filter((file) => {
      // For conversion tools, check specific file types
      switch (toolId) {
        // PDF conversions
        case "pdf-to-word":
        case "pdf-to-excel":
        case "split-pdf":
        case "compress-pdf":
        case "unlock-pdf":
        case "ocr-pdf":
          if (!file.type.includes("pdf")) {
            toast({
              title: "Invalid file type",
              description: "Please select PDF files only for this operation.",
              variant: "destructive",
            })
            return false
          }
          break

        case "word-to-pdf":
          if (!file.name.endsWith(".doc") && !file.name.endsWith(".docx")) {
            toast({
              title: "Invalid file type",
              description: "Please select Word documents (.doc or .docx) only.",
              variant: "destructive",
            })
            return false
          }
          break

        // Image conversions
        case "jpg-to-png":
          if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
            toast({
              title: "Invalid file type",
              description: "Please select JPG/JPEG images only.",
              variant: "destructive",
            })
            return false
          }
          break

        case "png-to-jpg":
          if (!file.type.includes("png")) {
            toast({
              title: "Invalid file type",
              description: "Please select PNG images only.",
              variant: "destructive",
            })
            return false
          }
          break

        case "svg-to-png":
          if (!file.type.includes("svg")) {
            toast({
              title: "Invalid file type",
              description: "Please select SVG images only.",
              variant: "destructive",
            })
            return false
          }
          break

        case "heic-to-jpg":
          if (!file.name.endsWith(".heic")) {
            toast({
              title: "Invalid file type",
              description: "Please select HEIC images only.",
              variant: "destructive",
            })
            return false
          }
          break

        // Video conversions
        case "mp4-to-mov":
          if (!file.type.includes("mp4")) {
            toast({
              title: "Invalid file type",
              description: "Please select MP4 videos only.",
              variant: "destructive",
            })
            return false
          }
          break

        case "mov-to-mp4":
          if (!file.type.includes("quicktime")) {
            toast({
              title: "Invalid file type",
              description: "Please select MOV videos only.",
              variant: "destructive",
            })
            return false
          }
          break

        case "avi-to-gif":
          if (!file.name.endsWith(".avi")) {
            toast({
              title: "Invalid file type",
              description: "Please select AVI videos only.",
              variant: "destructive",
            })
            return false
          }
          break

        case "mkv-to-mp3":
          if (!file.name.endsWith(".mkv")) {
            toast({
              title: "Invalid file type",
              description: "Please select MKV videos only.",
              variant: "destructive",
            })
            return false
          }
          break

        // Audio conversions
        case "mp3-to-wav":
          if (!file.type.includes("mp3")) {
            toast({
              title: "Invalid file type",
              description: "Please select MP3 audio files only.",
              variant: "destructive",
            })
            return false
          }
          break

        case "wav-to-mp3":
          if (!file.type.includes("wav")) {
            toast({
              title: "Invalid file type",
              description: "Please select WAV audio files only.",
              variant: "destructive",
            })
            return false
          }
          break

        case "flac-to-aac":
          if (!file.type.includes("flac")) {
            toast({
              title: "Invalid file type",
              description: "Please select FLAC audio files only.",
              variant: "destructive",
            })
            return false
          }
          break

        case "ogg-to-m4a":
          if (!file.type.includes("ogg")) {
            toast({
              title: "Invalid file type",
              description: "Please select OGG audio files only.",
              variant: "destructive",
            })
            return false
          }
          break

        // Code conversions
        case "json-to-xml":
          if (!file.type.includes("json") && !file.name.endsWith(".json")) {
            toast({
              title: "Invalid file type",
              description: "Please select JSON files only.",
              variant: "destructive",
            })
            return false
          }
          break

        case "xml-to-json":
          if (!file.type.includes("xml") && !file.name.endsWith(".xml")) {
            toast({
              title: "Invalid file type",
              description: "Please select XML files only.",
              variant: "destructive",
            })
            return false
          }
          break

        case "yaml-to-csv":
          if (!file.name.endsWith(".yaml") && !file.name.endsWith(".yml")) {
            toast({
              title: "Invalid file type",
              description: "Please select YAML files only.",
              variant: "destructive",
            })
            return false
          }
          break

        case "csv-to-yaml":
          if (!file.type.includes("csv") && !file.name.endsWith(".csv")) {
            toast({
              title: "Invalid file type",
              description: "Please select CSV files only.",
              variant: "destructive",
            })
            return false
          }
          break

        // Archive conversions
        case "zip-to-rar":
          if (!file.type.includes("zip") && !file.name.endsWith(".zip")) {
            toast({
              title: "Invalid file type",
              description: "Please select ZIP archives only.",
              variant: "destructive",
            })
            return false
          }
          break

        case "rar-to-zip":
          if (!file.name.endsWith(".rar")) {
            toast({
              title: "Invalid file type",
              description: "Please select RAR archives only.",
              variant: "destructive",
            })
            return false
          }
          break

        case "tar-to-7z":
          if (!file.name.endsWith(".tar")) {
            toast({
              title: "Invalid file type",
              description: "Please select TAR archives only.",
              variant: "destructive",
            })
            return false
          }
          break

        case "7z-to-tar":
          if (!file.name.endsWith(".7z")) {
            toast({
              title: "Invalid file type",
              description: "Please select 7Z archives only.",
              variant: "destructive",
            })
            return false
          }
          break

        // General category validation
        default:
          if (category === "pdf" && !file.type.includes("pdf") && !toolId.includes("word-to-pdf")) {
            toast({
              title: "Invalid file type",
              description: "Please select PDF files only.",
              variant: "destructive",
            })
            return false
          } else if (category === "image" && !file.type.includes("image")) {
            toast({
              title: "Invalid file type",
              description: "Please select image files only.",
              variant: "destructive",
            })
            return false
          } else if (category === "video" && !file.type.includes("video")) {
            toast({
              title: "Invalid file type",
              description: "Please select video files only.",
              variant: "destructive",
            })
            return false
          } else if (category === "audio" && !file.type.includes("audio")) {
            toast({
              title: "Invalid file type",
              description: "Please select audio files only.",
              variant: "destructive",
            })
            return false
          }
      }
      return true
    })

    if (validFiles.length > 0) {
      setFiles([...files, ...validFiles])
      setShowOptions(true)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
    if (newFiles.length === 0) {
      setShowOptions(false)
    }
  }

  const updateToolOptions = (options: Record<string, any>) => {
    setToolOptions(options)
  }

  // Update the processFiles function to handle the remaining tools
  const processFiles = () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to process.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate processing with progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setIsProcessing(false)
        setIsComplete(true)

        // Get the first file (or handle multiple files if needed)
        const file = files[0]
        let outputBlob: Blob
        let outputName = ""
        let outputType = ""

        // Handle different conversion types based on toolId
        switch (toolId) {
          // PDF conversions
          case "pdf-to-word":
            outputType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            outputName = file.name.replace(/\.pdf$/i, ".docx")
            break
          case "word-to-pdf":
            outputType = "application/pdf"
            outputName = file.name.replace(/\.(doc|docx)$/i, ".pdf")
            break
          case "pdf-to-excel":
            outputType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            outputName = file.name.replace(/\.pdf$/i, ".xlsx")
            break
          case "merge-pdf":
            outputType = "application/pdf"
            outputName = "merged-document.pdf"
            break
          case "split-pdf":
            outputType = "application/pdf"
            outputName = "split-document-part1.pdf"
            break
          case "compress-pdf":
            outputType = "application/pdf"
            outputName = file.name.replace(/\.pdf$/i, "-compressed.pdf")
            break
          case "ocr-pdf":
            outputType = "application/pdf"
            outputName = file.name.replace(/\.pdf$/i, "-searchable.pdf")
            break

          // Image conversions
          case "jpg-to-png":
            outputType = "image/png"
            outputName = file.name.replace(/\.(jpg|jpeg)$/i, ".png")
            break
          case "png-to-jpg":
            outputType = "image/jpeg"
            outputName = file.name.replace(/\.png$/i, ".jpg")
            break
          case "svg-to-png":
            outputType = "image/png"
            outputName = file.name.replace(/\.svg$/i, ".png")
            break
          case "heic-to-jpg":
            outputType = "image/jpeg"
            outputName = file.name.replace(/\.heic$/i, ".jpg")
            break
          case "resize-image":
            outputType = file.type
            outputName = file.name.replace(/(\.[^.]+)$/, "-resized$1")
            break
          case "crop-image":
            outputType = file.type
            outputName = file.name.replace(/(\.[^.]+)$/, "-cropped$1")
            break
          case "compress-image":
            outputType = file.type
            outputName = file.name.replace(/(\.[^.]+)$/, "-compressed$1")
            break
          case "webp-converter":
            if (file.type.includes("webp")) {
              outputType = "image/jpeg"
              outputName = file.name.replace(/\.webp$/i, ".jpg")
            } else {
              outputType = "image/webp"
              outputName = file.name.replace(/(\.[^.]+)$/, ".webp")
            }
            break

          // Video conversions
          case "mp4-to-mov":
            outputType = "video/quicktime"
            outputName = file.name.replace(/\.mp4$/i, ".mov")
            break
          case "mov-to-mp4":
            outputType = "video/mp4"
            outputName = file.name.replace(/\.mov$/i, ".mp4")
            break
          case "avi-to-gif":
            outputType = "image/gif"
            outputName = file.name.replace(/\.avi$/i, ".gif")
            break
          case "mkv-to-mp3":
            outputType = "audio/mpeg"
            outputName = file.name.replace(/\.mkv$/i, ".mp3")
            break
          case "trim-video":
            outputType = file.type
            outputName = file.name.replace(/(\.[^.]+)$/, "-trimmed$1")
            break
          case "compress-video":
            outputType = file.type
            outputName = file.name.replace(/(\.[^.]+)$/, "-compressed$1")
            break
          case "rotate-video":
            outputType = file.type
            outputName = file.name.replace(/(\.[^.]+)$/, "-rotated$1")
            break
          case "video-to-gif":
            outputType = "image/gif"
            outputName = file.name.replace(/(\.[^.]+)$/, ".gif")
            break

          // Audio conversions
          case "mp3-to-wav":
            outputType = "audio/wav"
            outputName = file.name.replace(/\.mp3$/i, ".wav")
            break
          case "wav-to-mp3":
            outputType = "audio/mpeg"
            outputName = file.name.replace(/\.wav$/i, ".mp3")
            break
          case "flac-to-aac":
            outputType = "audio/aac"
            outputName = file.name.replace(/\.flac$/i, ".aac")
            break
          case "ogg-to-m4a":
            outputType = "audio/m4a"
            outputName = file.name.replace(/\.ogg$/i, ".m4a")
            break
          case "cut-audio":
            outputType = file.type
            outputName = file.name.replace(/(\.[^.]+)$/, "-cut$1")
            break

          // Code conversions
          case "json-to-xml":
            outputType = "application/xml"
            outputName = file.name.replace(/\.json$/i, ".xml")
            break
          case "xml-to-json":
            outputType = "application/json"
            outputName = file.name.replace(/\.xml$/i, ".json")
            break
          case "yaml-to-csv":
            outputType = "text/csv"
            outputName = file.name.replace(/\.(yaml|yml)$/i, ".csv")
            break
          case "csv-to-yaml":
            outputType = "application/x-yaml"
            outputName = file.name.replace(/\.csv$/i, ".yaml")
            break
          case "minify-js":
            outputType = "application/javascript"
            outputName = file.name.replace(/\.js$/i, ".min.js")
            break
          case "minify-css":
            outputType = "text/css"
            outputName = file.name.replace(/\.css$/i, ".min.css")
            break
          case "beautify-js":
          case "beautify-css":
          case "beautify-html":
            outputType = file.type
            outputName = file.name.replace(/(\.[^.]+)$/, "-beautified$1")
            break

          // Archive conversions
          case "zip-to-rar":
            outputType = "application/vnd.rar"
            outputName = file.name.replace(/\.zip$/i, ".rar")
            break
          case "rar-to-zip":
            outputType = "application/zip"
            outputName = file.name.replace(/\.rar$/i, ".zip")
            break
          case "tar-to-7z":
            outputType = "application/x-7z-compressed"
            outputName = file.name.replace(/\.tar$/i, ".7z")
            break
          case "7z-to-tar":
            outputType = "application/x-tar"
            outputName = file.name.replace(/\.7z$/i, ".tar")
            break
          case "compress-files":
            outputType = "application/zip"
            outputName = "compressed-archive.zip"
            break
          case "extract-files":
            outputType = "application/octet-stream"
            outputName = "extracted-files.zip"
            break
          case "password-protect":
            outputType = "application/zip"
            outputName = file.name.replace(/(\.[^.]+)$/, "-protected$1")
            break
          case "repair-archive":
            outputType = file.type
            outputName = file.name.replace(/(\.[^.]+)$/, "-repaired$1")
            break
          case "split-archive":
            outputType = file.type
            outputName = file.name.replace(/(\.[^.]+)$/, "-part1$1")
            break

          // Default case
          default:
            outputType = file.type
            outputName = `processed-${file.name}`
        }

        // Create a simulated converted file
        // In a real app, this would be the actual converted file from a server
        // For now, we'll create a blob with the correct MIME type

        // For text-based formats, we can create more realistic simulations
        if (
          outputType.includes("text") ||
          outputType.includes("json") ||
          outputType.includes("xml") ||
          outputType.includes("yaml") ||
          outputType.includes("csv")
        ) {
          // Create sample content based on conversion type
          let content = ""

          if (toolId === "json-to-xml") {
            content = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item>Converted from JSON</item>\n</root>'
          } else if (toolId === "xml-to-json") {
            content = '{\n  "root": {\n    "item": "Converted from XML"\n  }\n}'
          } else if (toolId === "yaml-to-csv") {
            content = "name,age,city\nJohn,30,New York\nJane,25,Boston"
          } else if (toolId === "csv-to-yaml") {
            content =
              "people:\n  - name: John\n    age: 30\n    city: New York\n  - name: Jane\n    age: 25\n    city: Boston"
          } else {
            content = `Converted content for ${file.name}`
          }

          outputBlob = new Blob([content], { type: outputType })
        } else {
          // For binary formats, we'll use the original file data but with the new MIME type
          // In a real app, this would be the actual converted data
          outputBlob = new Blob([file], { type: outputType })
        }

        const url = URL.createObjectURL(outputBlob)
        setProcessedFileUrl(url)

        toast({
          title: "Processing complete",
          description: `Your file has been converted to ${outputName.split(".").pop()?.toUpperCase() || "the new format"} successfully.`,
        })
      }
    }, 200)
  }

  // Update the handleDownload function to handle the remaining tools
  const handleDownload = () => {
    if (!processedFileUrl || files.length === 0) return

    const a = document.createElement("a")
    a.href = processedFileUrl

    // Get the original file
    const originalFile = files[0]
    let fileName = ""

    // Set appropriate filename based on the tool
    switch (toolId) {
      // PDF conversions
      case "pdf-to-word":
        fileName = originalFile.name.replace(/\.pdf$/i, ".docx")
        break
      case "word-to-pdf":
        fileName = originalFile.name.replace(/\.(doc|docx)$/i, ".pdf")
        break
      case "pdf-to-excel":
        fileName = originalFile.name.replace(/\.pdf$/i, ".xlsx")
        break
      case "merge-pdf":
        fileName = "merged-document.pdf"
        break
      case "split-pdf":
        fileName = "split-document-part1.pdf"
        break
      case "compress-pdf":
        fileName = originalFile.name.replace(/\.pdf$/i, "-compressed.pdf")
        break
      case "ocr-pdf":
        fileName = originalFile.name.replace(/\.pdf$/i, "-searchable.pdf")
        break

      // Image conversions
      case "jpg-to-png":
        fileName = originalFile.name.replace(/\.(jpg|jpeg)$/i, ".png")
        break
      case "png-to-jpg":
        fileName = originalFile.name.replace(/\.png$/i, ".jpg")
        break
      case "svg-to-png":
        fileName = originalFile.name.replace(/\.svg$/i, ".png")
        break
      case "heic-to-jpg":
        fileName = originalFile.name.replace(/\.heic$/i, ".jpg")
        break
      case "resize-image":
        fileName = originalFile.name.replace(/(\.[^.]+)$/, "-resized$1")
        break
      case "crop-image":
        fileName = originalFile.name.replace(/(\.[^.]+)$/, "-cropped$1")
        break
      case "compress-image":
        fileName = originalFile.name.replace(/(\.[^.]+)$/, "-compressed$1")
        break
      case "webp-converter":
        if (originalFile.type.includes("webp")) {
          fileName = originalFile.name.replace(/\.webp$/i, ".jpg")
        } else {
          fileName = originalFile.name.replace(/(\.[^.]+)$/, ".webp")
        }
        break

      // Video conversions
      case "mp4-to-mov":
        fileName = originalFile.name.replace(/\.mp4$/i, ".mov")
        break
      case "mov-to-mp4":
        fileName = originalFile.name.replace(/\.mov$/i, ".mp4")
        break
      case "avi-to-gif":
        fileName = originalFile.name.replace(/\.avi$/i, ".gif")
        break
      case "mkv-to-mp3":
        fileName = originalFile.name.replace(/\.mkv$/i, ".mp3")
        break
      case "trim-video":
        fileName = originalFile.name.replace(/(\.[^.]+)$/, "-trimmed$1")
        break
      case "compress-video":
        fileName = originalFile.name.replace(/(\.[^.]+)$/, "-compressed$1")
        break
      case "rotate-video":
        fileName = originalFile.name.replace(/(\.[^.]+)$/, "-rotated$1")
        break
      case "video-to-gif":
        fileName = originalFile.name.replace(/(\.[^.]+)$/, ".gif")
        break

      // Audio conversions
      case "mp3-to-wav":
        fileName = originalFile.name.replace(/\.mp3$/i, ".wav")
        break
      case "wav-to-mp3":
        fileName = originalFile.name.replace(/\.wav$/i, ".mp3")
        break
      case "flac-to-aac":
        fileName = originalFile.name.replace(/\.flac$/i, ".aac")
        break
      case "ogg-to-m4a":
        fileName = originalFile.name.replace(/\.ogg$/i, ".m4a")
        break
      case "cut-audio":
        fileName = originalFile.name.replace(/(\.[^.]+)$/, "-cut$1")
        break

      // Code conversions
      case "json-to-xml":
        fileName = originalFile.name.replace(/\.json$/i, ".xml")
        break
      case "xml-to-json":
        fileName = originalFile.name.replace(/\.xml$/i, ".json")
        break
      case "yaml-to-csv":
        fileName = originalFile.name.replace(/\.(yaml|yml)$/i, ".csv")
        break
      case "csv-to-yaml":
        fileName = originalFile.name.replace(/\.csv$/i, ".yaml")
        break
      case "minify-js":
        fileName = originalFile.name.replace(/\.js$/i, ".min.js")
        break
      case "minify-css":
        fileName = originalFile.name.replace(/\.css$/i, ".min.css")
        break
      case "beautify-js":
      case "beautify-css":
      case "beautify-html":
        fileName = originalFile.name.replace(/(\.[^.]+)$/, "-beautified$1")
        break

      // Archive conversions
      case "zip-to-rar":
        fileName = originalFile.name.replace(/\.zip$/i, ".rar")
        break
      case "rar-to-zip":
        fileName = originalFile.name.replace(/\.rar$/i, ".zip")
        break
      case "tar-to-7z":
        fileName = originalFile.name.replace(/\.tar$/i, ".7z")
        break
      case "7z-to-tar":
        fileName = originalFile.name.replace(/\.7z$/i, ".tar")
        break
      case "compress-files":
        fileName = "compressed-archive.zip"
        break
      case "extract-files":
        fileName = "extracted-files.zip"
        break
      case "password-protect":
        fileName = originalFile.name.replace(/(\.[^.]+)$/, "-protected$1")
        break
      case "repair-archive":
        fileName = originalFile.name.replace(/(\.[^.]+)$/, "-repaired$1")
        break
      case "split-archive":
        fileName = originalFile.name.replace(/(\.[^.]+)$/, "-part1$1")
        break

      // Default case
      default:
        fileName = `processed-${originalFile.name}`
    }

    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    toast({
      title: "Download started",
      description: `Your ${fileName.split(".").pop()?.toUpperCase() || "file"} is being downloaded.`,
    })
  }

  const resetProcess = () => {
    setFiles([])
    setProgress(0)
    setIsComplete(false)
    setShowOptions(false)
    setProcessedFileUrl(null)
    setToolOptions({})
  }

  // Set appropriate accept types based on the specific tool
  const getAcceptTypes = () => {
    if (toolId === "pdf-to-word" || toolId === "pdf-to-excel") {
      return ".pdf,application/pdf"
    } else if (toolId === "word-to-pdf") {
      return ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    } else if (toolId.includes("jpg-to-")) {
      return ".jpg,.jpeg,image/jpeg"
    } else if (toolId.includes("png-to-")) {
      return ".png,image/png"
    } else if (toolId.includes("mp4-to-")) {
      return ".mp4,video/mp4"
    } else if (toolId.includes("mov-to-")) {
      return ".mov,video/quicktime"
    } else {
      switch (category) {
        case "pdf":
          return ".pdf,application/pdf"
        case "image":
          return ".jpg,.jpeg,.png,.gif,.webp,.svg,.heic"
        case "video":
          return ".mp4,.mov,.avi,.mkv,.webm"
        case "audio":
          return ".mp3,.wav,.flac,.aac,.ogg,.m4a"
        case "code":
          return ".json,.xml,.yaml,.csv,.js,.css,.html"
        case "archive":
          return ".zip,.rar,.tar,.7z"
        default:
          return "*"
      }
    }
  }

  return (
    <div className="space-y-6">
      {!isComplete ? (
        <>
          {!showOptions && (
            <Card
              className={`border-2 border-dashed p-10 text-center ${
                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">Drag & Drop Files</h3>
                  <p className="text-sm text-muted-foreground">or click to browse from your computer</p>
                </div>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  multiple={tool?.allowMultiple}
                  accept={getAcceptTypes()}
                  onChange={handleFileInput}
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Browse Files</span>
                  </Button>
                </label>
              </div>
            </Card>
          )}

          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Selected Files</h3>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px]">
                          {file.name}
                        </span>
                        <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                ))}
              </div>

              {showOptions && tool && (
                <ToolOptions toolId={toolId} category={category} onOptionsChange={updateToolOptions} />
              )}

              {isProcessing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                </div>
              ) : (
                <Button onClick={processFiles} className="w-full">
                  Process Files
                </Button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4 p-10 border rounded-lg bg-primary/5">
            <div className="p-3 rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium">Processing Complete!</h3>
            <p className="text-center text-muted-foreground">
              Your files have been processed successfully. You can now download the result.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download Result
            </Button>

            {!isSignedIn ? (
              <SignInButton mode="modal">
                <Button variant="outline" className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  Sign in to Save
                </Button>
              </SignInButton>
            ) : (
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  toast({
                    title: "File saved",
                    description: "Your file has been saved to your account.",
                  })
                }}
              >
                <Save className="mr-2 h-4 w-4" />
                Save to My Files
              </Button>
            )}
          </div>

          <Button variant="ghost" className="w-full" onClick={resetProcess}>
            Process Another File
          </Button>
        </div>
      )}
    </div>
  )
}

function getFileIcon(fileType: string) {
  if (fileType.startsWith("image/")) {
    return <ImageIcon className="h-5 w-5 text-blue-500" />
  } else if (fileType.startsWith("video/")) {
    return <VideoIcon className="h-5 w-5 text-purple-500" />
  } else if (fileType.startsWith("audio/")) {
    return <FileAudioIcon className="h-5 w-5 text-green-500" />
  } else if (fileType.includes("pdf")) {
    return <FileIcon className="h-5 w-5 text-red-500" />
  } else if (fileType.includes("zip") || fileType.includes("rar") || fileType.includes("tar")) {
    return <Archive className="h-5 w-5 text-yellow-500" />
  } else {
    return <FileIcon className="h-5 w-5 text-gray-500" />
  }
}

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

