"use client"

import { SignUpButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { FileIcon, ImageIcon, VideoIcon, FileAudioIcon, CodeIcon, ArchiveIcon } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  const { isSignedIn } = useUser()

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated background with floating file icons */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="floating-icons">
          <FileIcon className="icon text-blue-500/20" style={{ left: "10%", top: "20%", animationDelay: "0s" }} />
          <ImageIcon className="icon text-purple-500/20" style={{ left: "25%", top: "60%", animationDelay: "1s" }} />
          <VideoIcon className="icon text-pink-500/20" style={{ left: "60%", top: "25%", animationDelay: "2s" }} />
          <FileAudioIcon
            className="icon text-indigo-500/20"
            style={{ left: "75%", top: "65%", animationDelay: "3s" }}
          />
          <CodeIcon className="icon text-cyan-500/20" style={{ left: "40%", top: "80%", animationDelay: "4s" }} />
          <ArchiveIcon className="icon text-blue-500/20" style={{ left: "85%", top: "15%", animationDelay: "5s" }} />
        </div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent animate-gradient">
            Convert Anything – PDFs, Images, Videos & More!
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            100+ free tools for files, code, and archives. No watermarks, no fuss.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="#tools">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8"
              >
                Start Converting
              </Button>
            </Link>
            {!isSignedIn && (
              <SignUpButton mode="modal">
                <Button size="lg" variant="outline" className="border-2 px-8">
                  Sign Up to Save Files
                </Button>
              </SignUpButton>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

