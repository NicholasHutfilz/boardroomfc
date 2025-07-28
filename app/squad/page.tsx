import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { ProtectedRoute } from "@/components/protected-route"
import { SquadTable } from "@/components/squad-table"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function SquadPage() {
  return (
    <ProtectedRoute>
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
            <div className="@container/main flex flex-1 flex-col gap-2 overflow-auto">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold tracking-tight">Squad</h1>
                    <p className="text-muted-foreground">
                      Manage your team's players, view their attributes, and make strategic decisions.
                    </p>
                  </div>
                </div>
                <SquadTable />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}