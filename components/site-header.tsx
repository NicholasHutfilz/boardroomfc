"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Calendar, Clock } from "lucide-react"
import { mockPlayerData } from "@/lib/mock-data"

function getPageTitle(pathname: string): string {
  switch (pathname) {
    case "/dashboard":
      return "Dashboard"
    case "/inbox":
      return "Inbox"
    case "/saves":
      return "Saves"
    case "/create-manager":
      return "Create Manager"
    case "/login":
      return "Login"
    case "/squad":
      return "Squad Management"
    default:
      return "BoardRoom FC"
  }
}

function getBreadcrumbContent(pathname: string) {
  // Handle squad management page
  if (pathname === "/squad") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Squad Management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  // Handle individual player pages
  if (pathname.startsWith("/squad/")) {
    const playerId = pathname.split("/squad/")[1]
    const player = mockPlayerData[playerId]
    const playerName = player?.name || `Player ${playerId}`

    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/squad">Squad Management</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{playerName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  // For other pages, show simple title
  const pageTitle = getPageTitle(pathname)
  return <h1 className="text-base font-medium">{pageTitle}</h1>
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {getBreadcrumbContent(pathname)}
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>July 28th, 2025</span>
            <Separator orientation="vertical" className="h-4" />
            <Clock className="w-4 h-4" />
            <span>9:30 AM UTC</span>
          </div>
        </div>
      </div>
    </header>
  )
}
