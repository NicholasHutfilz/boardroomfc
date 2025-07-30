"use client"

import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/components/protected-route"
import { ArrowLeft } from "lucide-react"
import { ManagerTimeline } from "@/components/manager-timeline"

export default function ManagerTimelinePage() {
  const getCurrentDateTime = () => {
    const now = new Date()
    return now.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <ProtectedRoute>
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: "url('/topdownpitch.jpg')"
        }}
      >
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Custom Navbar */}
        <div className="relative z-10 flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white">
              Manager Career Timeline
            </h1>
          </div>
          
          <div className="text-sm text-white/80">
            {getCurrentDateTime()}
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-[calc(100vh-80px)]">
          <ManagerTimeline />
        </div>
      </div>
    </ProtectedRoute>
  )
}