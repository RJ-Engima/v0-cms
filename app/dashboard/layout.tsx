import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Database,
  FileText,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  ChevronDown,
  Search,
  Bell,
  BarChart2,
  Globe,
  LineChart,
  AlertTriangle,
  CheckCircle,
  History,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background dark:gradient-mesh-bg">
      {/* Top navigation bar */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-slate-800/50 dark:bg-transparent dark:backdrop-blur-xl">
        <div className="flex h-16 items-center px-4 sm:px-6">
          {/* Mobile menu trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <div className="flex h-16 items-center border-b px-6 dark:border-slate-800/50">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <Database className="h-5 w-5 text-primary" />
                  <span className="text-lg">MediaVault</span>
                </Link>
              </div>
              <div className="px-2 py-4">
                <div className="mb-4 px-4">
                  <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage src="/vibrant-street-market.png" alt="User" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Admin User</p>
                      <p className="text-xs text-muted-foreground">admin@example.com</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-1 px-2">
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start">
                      <LayoutDashboard className="mr-2 h-4 w-4 text-primary" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/dashboard/content-types">
                    <Button variant="ghost" className="w-full justify-start">
                      <Database className="mr-2 h-4 w-4 text-indigo-500" />
                      Content Types
                    </Button>
                  </Link>
                  <Link href="/dashboard/content">
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4 text-emerald-500" />
                      Content
                    </Button>
                  </Link>
                  <Link href="/dashboard/media">
                    <Button variant="ghost" className="w-full justify-start">
                      <ImageIcon className="mr-2 h-4 w-4 text-blue-500" />
                      Media Library
                      <Badge className="ml-auto bg-primary/20 text-primary hover:bg-primary/30">24</Badge>
                    </Button>
                  </Link>
                  <Link href="/dashboard/users">
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4 text-amber-500" />
                      Users
                    </Button>
                  </Link>
                  <Link href="/dashboard/analytics">
                    <Button variant="ghost" className="w-full justify-start">
                      <BarChart2 className="mr-2 h-4 w-4 text-purple-500" />
                      Analytics
                    </Button>
                  </Link>

                  {/* SEO Section with Accordion */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="seo" className="border-none">
                      <AccordionTrigger className="py-2 hover:no-underline">
                        <Button variant="ghost" className="w-full justify-start p-0 hover:bg-transparent">
                          <Globe className="mr-2 h-4 w-4 text-green-500" />
                          SEO
                        </Button>
                      </AccordionTrigger>
                      <AccordionContent className="pl-6 pt-1 pb-0">
                        <div className="flex flex-col space-y-1">
                          <Link href="/dashboard/seo">
                            <Button variant="ghost" className="w-full justify-start h-9">
                              <LineChart className="mr-2 h-4 w-4 text-green-500" />
                              Reports
                            </Button>
                          </Link>
                          <Link href="/dashboard/seo/analyze">
                            <Button variant="ghost" className="w-full justify-start h-9">
                              <Search className="mr-2 h-4 w-4 text-green-500" />
                              Analyze
                            </Button>
                          </Link>
                          <Link href="/dashboard/seo/issues">
                            <Button variant="ghost" className="w-full justify-start h-9">
                              <AlertTriangle className="mr-2 h-4 w-4 text-green-500" />
                              Issues
                            </Button>
                          </Link>
                          <Link href="/dashboard/seo/recommendations">
                            <Button variant="ghost" className="w-full justify-start h-9">
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              Recommendations
                            </Button>
                          </Link>
                          <Link href="/dashboard/seo/history">
                            <Button variant="ghost" className="w-full justify-start h-9">
                              <History className="mr-2 h-4 w-4 text-green-500" />
                              History
                            </Button>
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Link href="/dashboard/settings">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4 text-slate-500" />
                      Settings
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold md:ml-0 ml-4">
            <Database className="h-5 w-5 text-primary" />
            <span className="hidden md:inline-block text-lg">MediaVault</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center">
            <div className="flex space-x-1">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <LayoutDashboard className="mr-1 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/content">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <FileText className="mr-1 h-4 w-4" />
                  Content
                </Button>
              </Link>
              <Link href="/dashboard/media">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <ImageIcon className="mr-1 h-4 w-4" />
                  Media
                </Button>
              </Link>
              <Link href="/dashboard/seo">
                <Button variant="ghost" size="sm" className="bg-primary/10 text-primary">
                  <Globe className="mr-1 h-4 w-4" />
                  SEO
                </Button>
              </Link>
              <Link href="/dashboard/users">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Users className="mr-1 h-4 w-4" />
                  Users
                </Button>
              </Link>
            </div>
          </nav>

          {/* Right side actions */}
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden md:flex relative w-full max-w-sm items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search media..."
                className="w-full rounded-full bg-muted pl-8 md:w-[200px] lg:w-[300px] border-none"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                3
              </span>
            </Button>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 rounded-full px-2 hover:bg-accent">
                  <Avatar className="h-8 w-8 border-2 border-primary/20">
                    <AvatarImage src="/vibrant-street-market.png" alt="User" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-xs leading-none text-muted-foreground">admin@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-16 md:z-10">
          <div className="flex h-full flex-col border-r bg-background/80 backdrop-blur-sm dark:border-slate-800/50 dark:bg-slate-900/20">
            <div className="flex-1 overflow-y-auto py-4 px-3">
              <div className="space-y-1">
                <Link href="/dashboard">
                  <Button variant="ghost" className="w-full justify-start">
                    <LayoutDashboard className="mr-2 h-4 w-4 text-primary" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/dashboard/content-types">
                  <Button variant="ghost" className="w-full justify-start">
                    <Database className="mr-2 h-4 w-4 text-indigo-500" />
                    Content Types
                  </Button>
                </Link>
                <Link href="/dashboard/content">
                  <Button variant="ghost" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4 text-emerald-500" />
                    Content
                  </Button>
                </Link>
                <Link href="/dashboard/media">
                  <Button variant="ghost" className="w-full justify-start">
                    <ImageIcon className="mr-2 h-4 w-4 text-blue-500" />
                    Media Library
                    <Badge className="ml-auto bg-primary/20 text-primary hover:bg-primary/30">24</Badge>
                  </Button>
                </Link>
                <Link href="/dashboard/users">
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4 text-amber-500" />
                    Users
                  </Button>
                </Link>
                <Link href="/dashboard/analytics">
                  <Button variant="ghost" className="w-full justify-start">
                    <BarChart2 className="mr-2 h-4 w-4 text-purple-500" />
                    Analytics
                  </Button>
                </Link>

                {/* SEO Section with Accordion */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="seo" className="border-none">
                    <AccordionTrigger className="py-2 hover:no-underline">
                      <Button variant="ghost" className="w-full justify-start p-0 hover:bg-transparent">
                        <Globe className="mr-2 h-4 w-4 text-green-500" />
                        SEO
                      </Button>
                    </AccordionTrigger>
                    <AccordionContent className="pl-6 pt-1 pb-0">
                      <div className="flex flex-col space-y-1">
                        <Link href="/dashboard/seo">
                          <Button variant="ghost" className="w-full justify-start h-9">
                            <LineChart className="mr-2 h-4 w-4 text-green-500" />
                            Reports
                          </Button>
                        </Link>
                        <Link href="/dashboard/seo/analyze">
                          <Button variant="ghost" className="w-full justify-start h-9">
                            <Search className="mr-2 h-4 w-4 text-green-500" />
                            Analyze
                          </Button>
                        </Link>
                        <Link href="/dashboard/seo/issues">
                          <Button variant="ghost" className="w-full justify-start h-9">
                            <AlertTriangle className="mr-2 h-4 w-4 text-green-500" />
                            Issues
                          </Button>
                        </Link>
                        <Link href="/dashboard/seo/recommendations">
                          <Button variant="ghost" className="w-full justify-start h-9">
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            Recommendations
                          </Button>
                        </Link>
                        <Link href="/dashboard/seo/history">
                          <Button variant="ghost" className="w-full justify-start h-9">
                            <History className="mr-2 h-4 w-4 text-green-500" />
                            History
                          </Button>
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Link href="/dashboard/settings">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4 text-slate-500" />
                    Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 md:ml-64">{children}</main>
      </div>
    </div>
  )
}
