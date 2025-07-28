import { ManagerCreation } from "@/components/manager-creation"
import { ProtectedRoute } from "@/components/protected-route"

export default function CreateManagerPage() {
  return (
    <ProtectedRoute>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <ManagerCreation />
        </div>
      </div>
    </ProtectedRoute>
  )
} 