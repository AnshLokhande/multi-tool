"use client"

import Link from "next/link"
import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { FileIcon } from "lucide-react"
import MobileNav from "./mobile-nav"

export default function Header() {
  const { isSignedIn } = useUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <FileIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ConvertAnything
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <Link href="#pdf-tools" className="text-sm font-medium hover:text-primary transition-colors">
              PDF
            </Link>
            <Link href="#image-tools" className="text-sm font-medium hover:text-primary transition-colors">
              Images
            </Link>
            <Link href="#video-tools" className="text-sm font-medium hover:text-primary transition-colors">
              Video
            </Link>
            <Link href="#audio-tools" className="text-sm font-medium hover:text-primary transition-colors">
              Audio
            </Link>
            <Link href="#code-tools" className="text-sm font-medium hover:text-primary transition-colors">
              Code
            </Link>
            <Link href="#archive-tools" className="text-sm font-medium hover:text-primary transition-colors">
              Archives
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">Sign up</Button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>

        <MobileNav />
      </div>
    </header>
  )
}

