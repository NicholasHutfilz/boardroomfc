"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { IconPlus, IconClock, IconTrophy, IconLoader2 } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSaves } from "@/lib/hooks/use-saves"

const getTeamLogo = (teamName: string | null | undefined) => {
  if (!teamName) return "/placeholder.svg"
  
  const teamLogos: Record<string, string> = {
    "Chelsea": "/Chelsea_FC.png",
    "Arsenal": "/Arsenal_FC.png",
  }
  
  return teamLogos[teamName] || "/placeholder.svg"
}

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  } else {
    const days = Math.floor(diffInMinutes / 1440)
    return `${days} day${days !== 1 ? 's' : ''} ago`
  }
}

export function SaveSelector({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { saves, loading, error, updateSaveLastOpened } = useSaves()
  const router = useRouter()

  // Debug logging
  useEffect(() => {
    console.log('SaveSelector render:', { 
      loading, 
      error,
      savesCount: saves.length 
    })
  }, [loading, error, saves.length])

  const handleSaveSelect = async (saveId: string) => {
    try {
      await updateSaveLastOpened(saveId)
      router.push("/dashboard")
    } catch (error) {
      console.error("Failed to update save:", error)
      // Still navigate even if update fails
      router.push("/dashboard")
    }
  }

  const handleCreateNew = () => {
    router.push("/create-manager")
  }

  if (loading) {
    console.log('Saves loading...')
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col items-center justify-center gap-4 min-h-[200px]">
              <IconLoader2 className="size-8 animate-spin text-muted-foreground" />
              <p className="text-muted-foreground">Loading your saves...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    console.log('Error loading saves:', error)
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col items-center justify-center gap-4 min-h-[200px]">
              <p className="text-destructive">Error loading saves: {error}</p>
              <Button onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  console.log('Rendering saves list with', saves.length, 'saves')

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Welcome to Boardroom FC</h1>
              <p className="text-muted-foreground text-balance">
                {saves.length > 0 
                  ? "Select a save file to continue or create a new one"
                  : "Create your first save file to get started"
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {saves.map((save) => (
                <Card 
                  key={save.id}
                  className="cursor-pointer transition-all hover:shadow-md hover:scale-105"
                  onClick={() => handleSaveSelect(save.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className="flex-shrink-0">
                        <Image
                          src={getTeamLogo(save.most_recent_team)}
                          alt={save.most_recent_team || "Team"}
                          width={64}
                          height={64}
                          className="rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <h3 className="font-bold text-lg">{save.manager_name}</h3>
                          <p className="font-semibold text-base text-muted-foreground">
                            {save.most_recent_team || "No Team"}
                          </p>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center justify-center gap-1">
                            <IconClock className="size-4" />
                            {formatTimeAgo(save.date_last_opened)}
                          </div>
                          {save.most_recent_place && (
                            <div className="flex items-center justify-center gap-1">
                              <IconTrophy className="size-4" />
                              {save.most_recent_place}
                            </div>
                          )}
                          {save.most_recent_season && (
                            <p>Season {save.most_recent_season}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card 
                className="cursor-pointer transition-all hover:shadow-md hover:scale-105 border-dashed"
                onClick={handleCreateNew}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center justify-center gap-3 text-center h-full">
                    <div className="bg-muted flex size-16 items-center justify-center rounded-lg">
                      <IconPlus className="size-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">Create New Save</h3>
                      <p className="text-sm text-muted-foreground">
                        Start a new career
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-muted-foreground text-center text-xs text-balance">
        Your save files are stored securely and can be accessed from any device.
      </div>
    </div>
  )
} 