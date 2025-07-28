import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { ProtectedRoute } from "@/components/protected-route"
import { PlayerProfile } from "@/components/player-profile"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface PlayerPageProps {
  params: {
    playerId: string
  }
}

export default function PlayerPage({ params }: PlayerPageProps) {
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
                <PlayerProfile playerId={params.playerId} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}