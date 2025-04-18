"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{
              opacity: theme === "light" ? 1 : 0,
              y: theme === "light" ? 0 : -30,
              scale: theme === "light" ? 1 : 0.5,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{
              opacity: theme === "dark" ? 1 : 0,
              y: theme === "dark" ? 0 : 30,
              scale: theme === "dark" ? 1 : 0.5,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-36 backdrop-blur-lg bg-white/90 dark:bg-slate-900/90 border border-border/40 shadow-lg"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer focus:bg-primary/10 transition-colors duration-200"
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
          {theme === "light" && (
            <motion.div
              className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer focus:bg-primary/10 transition-colors duration-200"
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
          {theme === "dark" && (
            <motion.div
              className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer focus:bg-primary/10 transition-colors duration-200"
        >
          <span className="mr-2 flex h-4 w-4 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </span>
          <span>System</span>
          {theme === "system" && (
            <motion.div
              className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
