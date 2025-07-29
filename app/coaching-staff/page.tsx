"use client"

import { ProtectedRoute } from "@/components/protected-route"
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
            <AssistantManagerChat />
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  )
}