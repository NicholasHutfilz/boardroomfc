import { SaveSelector } from "@/components/save-selector"
import { ProtectedRoute } from "@/components/protected-route"

export default function SavesPage() {
  return (
    <ProtectedRoute>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <SaveSelector />
        </div>
      </div>
    </ProtectedRoute>
  )
} 