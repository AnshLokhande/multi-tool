"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs"

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const { isSignedIn } = useUser()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="text-xl font-bold">ConvertAnything</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <nav className="mt-8 flex flex-col gap-4">
          <Link href="#pdf-tools" className="text-lg font-medium" onClick={() => setOpen(false)}>
            PDF Tools
          </Link>
          <Link href="#image-tools" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Image Tools
          </Link>
          <Link href="#video-tools" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Video Tools
          </Link>
          <Link href="#audio-tools" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Audio Tools
          </Link>
          <Link href="#code-tools" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Code Tools
          </Link>
          <Link href="#archive-tools" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Archive Tools
          </Link>
        </nav>
        {!isSignedIn && (
          <div className="mt-auto flex flex-col gap-2">
            <SignInButton mode="modal">
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="w-full">Sign up</Button>
            </SignUpButton>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

