"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { getToolById } from "@/lib/tool-data"

interface ToolOptionsProps {
  toolId: string
  category: string
  onOptionsChange?: (options: Record<string, any>) => void
}

export default function ToolOptions({ toolId, category, onOptionsChange }: ToolOptionsProps) {
  const tool = getToolById(toolId)

  // Call onOptionsChange when options change
  const updateOptions = (options: Record<string, any>) => {
    if (onOptionsChange) {
      onOptionsChange(options)
    }
  }

  if (!tool) return null

  // PDF Tool Options
  if (category === "pdf") {
    return <PDFToolOptions toolId={toolId} onOptionsChange={updateOptions} />
  }

  // Image Tool Options
  if (category === "image") {
    return <ImageToolOptions toolId={toolId} onOptionsChange={updateOptions} />
  }

  // Video Tool Options
  if (category === "video") {
    return <VideoToolOptions toolId={toolId} onOptionsChange={updateOptions} />
  }

  // Audio Tool Options
  if (category === "audio") {
    return <AudioToolOptions toolId={toolId} onOptionsChange={updateOptions} />
  }

  // Code Tool Options
  if (category === "code") {
    return <CodeToolOptions toolId={toolId} onOptionsChange={updateOptions} />
  }

  // Archive Tool Options
  if (category === "archive") {
    return <ArchiveToolOptions toolId={toolId} onOptionsChange={updateOptions} />
  }

  return null
}

// Update all the tool option components to accept onOptionsChange
function PDFToolOptions({
  toolId,
  onOptionsChange,
}: { toolId: string; onOptionsChange?: (options: Record<string, any>) => void }) {
  const [pageRange, setPageRange] = useState("all")
  const [quality, setQuality] = useState(90)
  const [password, setPassword] = useState("")

  switch (toolId) {
    case "merge-pdf":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Merge Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="merge-order">Merge Order</Label>
              <Select defaultValue="order">
                <SelectTrigger id="merge-order">
                  <SelectValue placeholder="Select merge order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="order">File Order</SelectItem>
                  <SelectItem value="name">File Name</SelectItem>
                  <SelectItem value="date">Date Modified</SelectItem>
                  <SelectItem value="size">File Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )

    case "split-pdf":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Split Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="split-method">Split Method</Label>
              <Select defaultValue="range">
                <SelectTrigger id="split-method">
                  <SelectValue placeholder="Select split method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="range">Page Range</SelectItem>
                  <SelectItem value="every">Every N Pages</SelectItem>
                  <SelectItem value="extract">Extract Pages</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="page-range">Page Range</Label>
              <Input
                id="page-range"
                placeholder="e.g., 1-5, 8, 11-13"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter page numbers and/or page ranges separated by commas.
              </p>
            </div>
          </CardContent>
        </Card>
      )

    case "compress-pdf":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Compression Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="quality-slider">Quality</Label>
                <span className="text-sm">{quality}%</span>
              </div>
              <Slider
                id="quality-slider"
                min={10}
                max={100}
                step={1}
                value={[quality]}
                onValueChange={(value) => setQuality(value[0])}
              />
              <p className="text-xs text-muted-foreground">Higher quality means larger file size.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="compression-level">Compression Level</Label>
              <Select defaultValue="medium">
                <SelectTrigger id="compression-level">
                  <SelectValue placeholder="Select compression level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Better Quality)</SelectItem>
                  <SelectItem value="medium">Medium (Balanced)</SelectItem>
                  <SelectItem value="high">High (Smaller Size)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )

    case "unlock-pdf":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Unlock PDF</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pdf-password">PDF Password</Label>
              <Input
                id="pdf-password"
                type="password"
                placeholder="Enter the PDF password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Enter the password to unlock the protected PDF.</p>
            </div>
          </CardContent>
        </Card>
      )

    default:
      return (
        <Card>
          <CardHeader>
            <CardTitle>PDF Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pdf-quality">Output Quality</Label>
              <Select defaultValue="high">
                <SelectTrigger id="pdf-quality">
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )
  }
}

function ImageToolOptions({
  toolId,
  onOptionsChange,
}: { toolId: string; onOptionsChange?: (options: Record<string, any>) => void }) {
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [quality, setQuality] = useState(90)
  const [keepAspectRatio, setKeepAspectRatio] = useState(true)

  switch (toolId) {
    case "resize-image":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Resize Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number.parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number.parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="aspect-ratio" checked={keepAspectRatio} onCheckedChange={setKeepAspectRatio} />
              <Label htmlFor="aspect-ratio">Maintain aspect ratio</Label>
            </div>
          </CardContent>
        </Card>
      )

    case "crop-image":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Crop Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="crop-width">Width (px)</Label>
                <Input
                  id="crop-width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number.parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crop-height">Height (px)</Label>
                <Input
                  id="crop-height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number.parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crop-preset">Preset Dimensions</Label>
              <Select defaultValue="custom">
                <SelectTrigger id="crop-preset">
                  <SelectValue placeholder="Select preset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Custom</SelectItem>
                  <SelectItem value="square">Square (1:1)</SelectItem>
                  <SelectItem value="profile">Profile Picture (1:1)</SelectItem>
                  <SelectItem value="cover">Cover Photo (16:9)</SelectItem>
                  <SelectItem value="instagram">Instagram (4:5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )

    case "compress-image":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Compression Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="image-quality">Quality</Label>
                <span className="text-sm">{quality}%</span>
              </div>
              <Slider
                id="image-quality"
                min={10}
                max={100}
                step={1}
                value={[quality]}
                onValueChange={(value) => setQuality(value[0])}
              />
              <p className="text-xs text-muted-foreground">Higher quality means larger file size.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="output-format">Output Format</Label>
              <Select defaultValue="original">
                <SelectTrigger id="output-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="original">Same as Original</SelectItem>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )

    case "remove-bg":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Background Removal Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bg-mode">Mode</Label>
              <Select defaultValue="auto">
                <SelectTrigger id="bg-mode">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto (AI Detection)</SelectItem>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="output-bg">Output Background</Label>
              <Select defaultValue="transparent">
                <SelectTrigger id="output-bg">
                  <SelectValue placeholder="Select background" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transparent">Transparent</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="color">Custom Color</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )

    default:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Image Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-quality">Output Quality</Label>
              <div className="flex justify-between">
                <span className="text-sm">Quality</span>
                <span className="text-sm">{quality}%</span>
              </div>
              <Slider
                id="image-quality"
                min={10}
                max={100}
                step={1}
                value={[quality]}
                onValueChange={(value) => setQuality(value[0])}
              />
            </div>
          </CardContent>
        </Card>
      )
  }
}

function VideoToolOptions({
  toolId,
  onOptionsChange,
}: { toolId: string; onOptionsChange?: (options: Record<string, any>) => void }) {
  const [startTime, setStartTime] = useState("00:00:00")
  const [endTime, setEndTime] = useState("00:01:00")
  const [quality, setQuality] = useState(720)

  switch (toolId) {
    case "trim-video":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Trim Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time (HH:MM:SS)</Label>
                <Input id="start-time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time (HH:MM:SS)</Label>
                <Input id="end-time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case "compress-video":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Compression Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video-quality">Resolution</Label>
              <Select defaultValue={quality.toString()}>
                <SelectTrigger id="video-quality">
                  <SelectValue placeholder="Select resolution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="360">360p</SelectItem>
                  <SelectItem value="480">480p</SelectItem>
                  <SelectItem value="720">720p (HD)</SelectItem>
                  <SelectItem value="1080">1080p (Full HD)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="video-bitrate">Bitrate</Label>
              <Select defaultValue="auto">
                <SelectTrigger id="video-bitrate">
                  <SelectValue placeholder="Select bitrate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto (Recommended)</SelectItem>
                  <SelectItem value="low">Low (Smaller Size)</SelectItem>
                  <SelectItem value="medium">Medium (Balanced)</SelectItem>
                  <SelectItem value="high">High (Better Quality)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )

    case "rotate-video":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Rotation Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rotation-angle">Rotation Angle</Label>
              <Select defaultValue="90">
                <SelectTrigger id="rotation-angle">
                  <SelectValue placeholder="Select angle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="90">90° Clockwise</SelectItem>
                  <SelectItem value="180">180°</SelectItem>
                  <SelectItem value="270">90° Counter-clockwise</SelectItem>
                  <SelectItem value="flip-h">Flip Horizontal</SelectItem>
                  <SelectItem value="flip-v">Flip Vertical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )

    default:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Video Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="output-format">Output Format</Label>
              <Select defaultValue="mp4">
                <SelectTrigger id="output-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mp4">MP4</SelectItem>
                  <SelectItem value="mov">MOV</SelectItem>
                  <SelectItem value="avi">AVI</SelectItem>
                  <SelectItem value="webm">WebM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="video-quality">Quality</Label>
              <Select defaultValue="high">
                <SelectTrigger id="video-quality">
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )
  }
}

// Update the AudioToolOptions component to remove the removed tools
function AudioToolOptions({
  toolId,
  onOptionsChange,
}: { toolId: string; onOptionsChange?: (options: Record<string, any>) => void }) {
  const [startTime, setStartTime] = useState("00:00:00")
  const [endTime, setEndTime] = useState("00:01:00")
  const [bitrate, setBitrate] = useState(192)

  switch (toolId) {
    case "cut-audio":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Cut Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="audio-start-time">Start Time (HH:MM:SS)</Label>
                <Input id="audio-start-time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="audio-end-time">End Time (HH:MM:SS)</Label>
                <Input id="audio-end-time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>
      )

    default:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Audio Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="audio-format">Output Format</Label>
              <Select defaultValue="mp3">
                <SelectTrigger id="audio-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mp3">MP3</SelectItem>
                  <SelectItem value="wav">WAV</SelectItem>
                  <SelectItem value="flac">FLAC</SelectItem>
                  <SelectItem value="aac">AAC</SelectItem>
                  <SelectItem value="ogg">OGG</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="audio-bitrate">Bitrate (kbps)</Label>
                <span className="text-sm">{bitrate} kbps</span>
              </div>
              <Slider
                id="audio-bitrate"
                min={64}
                max={320}
                step={32}
                value={[bitrate]}
                onValueChange={(value) => setBitrate(value[0])}
              />
            </div>
          </CardContent>
        </Card>
      )
  }
}

function CodeToolOptions({
  toolId,
  onOptionsChange,
}: { toolId: string; onOptionsChange?: (options: Record<string, any>) => void }) {
  switch (toolId) {
    case "minify-js":
    case "minify-css":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Minify Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="remove-comments" defaultChecked />
              <Label htmlFor="remove-comments">Remove comments</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="preserve-semicolons" defaultChecked />
              <Label htmlFor="preserve-semicolons">Preserve semicolons</Label>
            </div>
          </CardContent>
        </Card>
      )

    case "beautify-js":
    case "beautify-css":
    case "beautify-html":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Beautify Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="indent-size">Indent Size</Label>
              <Select defaultValue="2">
                <SelectTrigger id="indent-size">
                  <SelectValue placeholder="Select indent size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 spaces</SelectItem>
                  <SelectItem value="4">4 spaces</SelectItem>
                  <SelectItem value="tab">Tab</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="preserve-newlines" defaultChecked />
              <Label htmlFor="preserve-newlines">Preserve line breaks</Label>
            </div>
          </CardContent>
        </Card>
      )

    default:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Code Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code-format">Output Format</Label>
              <Select defaultValue="auto">
                <SelectTrigger id="code-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-detect</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                  <SelectItem value="yaml">YAML</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )
  }
}

function ArchiveToolOptions({
  toolId,
  onOptionsChange,
}: { toolId: string; onOptionsChange?: (options: Record<string, any>) => void }) {
  switch (toolId) {
    case "compress-files":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Compression Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="archive-format">Archive Format</Label>
              <Select defaultValue="zip">
                <SelectTrigger id="archive-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zip">ZIP</SelectItem>
                  <SelectItem value="rar">RAR</SelectItem>
                  <SelectItem value="7z">7Z</SelectItem>
                  <SelectItem value="tar">TAR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="compression-level">Compression Level</Label>
              <Select defaultValue="normal">
                <SelectTrigger id="compression-level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="store">Store (No Compression)</SelectItem>
                  <SelectItem value="fast">Fast (Less Compression)</SelectItem>
                  <SelectItem value="normal">Normal (Balanced)</SelectItem>
                  <SelectItem value="maximum">Maximum (Slower)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )

    case "password-protect":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Password Protection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="archive-password">Password</Label>
              <Input id="archive-password" type="password" placeholder="Enter password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="encryption-method">Encryption Method</Label>
              <Select defaultValue="aes256">
                <SelectTrigger id="encryption-method">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aes128">AES-128</SelectItem>
                  <SelectItem value="aes256">AES-256 (Recommended)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )

    default:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Archive Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="output-format">Output Format</Label>
              <Select defaultValue="zip">
                <SelectTrigger id="output-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zip">ZIP</SelectItem>
                  <SelectItem value="rar">RAR</SelectItem>
                  <SelectItem value="7z">7Z</SelectItem>
                  <SelectItem value="tar">TAR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )
  }
}

