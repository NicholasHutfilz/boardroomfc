import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SoccerInbox } from "@/components/inbox"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function InboxPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="@container/main flex flex-1 flex-col overflow-auto">
            <SoccerInbox />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 