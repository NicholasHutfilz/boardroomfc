"use client"

import ProtectedRoute from "@/components/protected-route"
import { SiteHeader } from "@/components/site-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AssistantManagerChat } from "@/components/assistant-manager-chat"

export default function CoachingStaffPage() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <SiteHeader />
          <div className="flex-1 flex flex-col p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Coaching Staff</h1>
              <p className="text-muted-foreground">
                Manage your coaching staff and delegate responsibilities to your assistant manager.
              </p>
            </div>
            
            {/* Assistant Manager Chat Interface */}
            <div className="flex-1">
              <AssistantManagerChat />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  )
}