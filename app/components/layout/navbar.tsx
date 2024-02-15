"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 

const NavBar = () => {

  const { setTheme } = useTheme()

  return (
    <div className='p-4 bg-white dark:bg-background px-12 h-[80px] w-full flex items-center justify-between shadow-xl sticky top-0 z-20'>
        <div className="logo flex items-center gap-4">
            <Image src="/kin.png" width={40} height={40} alt="Kin Lang Logo" />
            <h1 className="text-2xl font-bold text-black/80 dark:text-white/80">Kin Lang</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant={'outline'} className="">GitHub</Button>
          <Button className="bg-blue-500">Docs</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
    </div>
  )
}

export default NavBar