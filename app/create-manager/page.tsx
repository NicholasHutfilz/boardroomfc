import { ManagerCreation } from "@/components/manager-creation"

export default function CreateManagerPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <ManagerCreation />
      </div>
    </div>
  )
} 