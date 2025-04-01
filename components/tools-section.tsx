"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileIcon, ImageIcon, VideoIcon, FileAudioIcon, CodeIcon, ArchiveIcon } from "lucide-react"
import ToolGrid from "./tool-grid"
import { pdfTools, imageTools, videoTools, audioTools, codeTools, archiveTools } from "@/lib/tool-data"

export default function ToolsSection() {
  const [activeTab, setActiveTab] = useState("pdf")

  return (
    <section id="tools" className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Tool</h2>

        <Tabs defaultValue="pdf" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
              <TabsTrigger value="pdf" className="flex flex-col items-center gap-2 py-3 px-4">
                <FileIcon className="h-5 w-5" />
                <span>PDF</span>
              </TabsTrigger>
              <TabsTrigger value="image" className="flex flex-col items-center gap-2 py-3 px-4">
                <ImageIcon className="h-5 w-5" />
                <span>Images</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex flex-col items-center gap-2 py-3 px-4">
                <VideoIcon className="h-5 w-5" />
                <span>Video</span>
              </TabsTrigger>
              <TabsTrigger value="audio" className="flex flex-col items-center gap-2 py-3 px-4">
                <FileAudioIcon className="h-5 w-5" />
                <span>Audio</span>
              </TabsTrigger>
              <TabsTrigger value="code" className="flex flex-col items-center gap-2 py-3 px-4">
                <CodeIcon className="h-5 w-5" />
                <span>Code</span>
              </TabsTrigger>
              <TabsTrigger value="archive" className="flex flex-col items-center gap-2 py-3 px-4">
                <ArchiveIcon className="h-5 w-5" />
                <span>Archives</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="pdf" id="pdf-tools">
            <ToolGrid tools={pdfTools} />
          </TabsContent>

          <TabsContent value="image" id="image-tools">
            <ToolGrid tools={imageTools} />
          </TabsContent>

          <TabsContent value="video" id="video-tools">
            <ToolGrid tools={videoTools} />
          </TabsContent>

          <TabsContent value="audio" id="audio-tools">
            <ToolGrid tools={audioTools} />
          </TabsContent>

          <TabsContent value="code" id="code-tools">
            <ToolGrid tools={codeTools} />
          </TabsContent>

          <TabsContent value="archive" id="archive-tools">
            <ToolGrid tools={archiveTools} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

