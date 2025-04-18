"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sidebarVariants = cva(
  "relative flex h-full min-h-screen w-full flex-col overflow-hidden border-r bg-background",
  {
    variants: {
      variant: {
        default: "w-64",
        sm: "w-14 md:w-64",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface SidebarContextValue {
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = React.createContext<SidebarContextValue>({
  expanded: true,
  setExpanded: () => undefined,
})

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [expanded, setExpanded] = React.useState(true)

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <div className="flex min-h-screen flex-col md:flex-row">{children}</div>
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarVariants> {}

export function Sidebar({ className, variant, ...props }: SidebarProps) {
  const { expanded } = useSidebar()

  return <div className={cn(sidebarVariants({ variant }), expanded ? "w-64" : "w-14", className)} {...props} />
}

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return <div className={cn("flex h-14 items-center border-b px-4", className)} {...props} />
}

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return <div className={cn("flex-1 overflow-auto py-2", className)} {...props} />
}

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return <div className={cn("px-2 py-2", className)} {...props} />
}

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return <div className={cn("grid gap-1", className)} {...props} />
}

export interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return <div className={cn("", className)} {...props} />
}

export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "default" | "lg"
  isActive?: boolean
  asChild?: boolean
}

export function SidebarMenuButton({
  className,
  size = "default",
  isActive = false,
  asChild = false,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? React.Fragment : "button"
  return (
    <Comp
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        size === "lg" && "text-base",
        isActive && "bg-accent text-accent-foreground",
        className,
      )}
      {...props}
    />
  )
}

export interface SidebarMenuSubProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenuSub({ className, ...props }: SidebarMenuSubProps) {
  return <div className={cn("grid gap-1 pl-6", className)} {...props} />
}

export interface SidebarMenuSubItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenuSubItem({ className, ...props }: SidebarMenuSubItemProps) {
  return <div className={cn("", className)} {...props} />
}

export interface SidebarMenuSubButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  asChild?: boolean
}

export function SidebarMenuSubButton({
  className,
  isActive = false,
  asChild = false,
  ...props
}: SidebarMenuSubButtonProps) {
  const Comp = asChild ? React.Fragment : "button"
  return (
    <Comp
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive && "bg-accent text-accent-foreground",
        className,
      )}
      {...props}
    />
  )
}

export interface SidebarRailProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarRail({ className, ...props }: SidebarRailProps) {
  return <div className={cn("absolute inset-y-0 right-0 w-px bg-border", className)} {...props} />
}

export interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  const { expanded, setExpanded } = useSidebar()
  return (
    <button className={cn("", className)} onClick={() => setExpanded(!expanded)} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <line x1="9" x2="15" y1="3" y2="3" />
        <line x1="9" x2="15" y1="21" y2="21" />
        <line x1="9" x2="9" y1="9" y2="15" />
        <line x1="15" x2="15" y1="9" y2="15" />
      </svg>
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  )
}

export interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarInset({ className, ...props }: SidebarInsetProps) {
  return <div className={cn("flex flex-1 flex-col overflow-hidden", className)} {...props} />
}
