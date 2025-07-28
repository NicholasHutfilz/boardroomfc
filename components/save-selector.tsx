"use client"

import { useState } from "react"
import Image from "next/image"
import { IconPlus, IconClock, IconTrophy } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

const mockSaves = [
  {
    id: "chelsea-save",
    managerName: "Alex Ferguson",
    teamName: "Chelsea",
    logo: "/Chelsea_FC.png",
    lastPlayed: "2 hours ago",
    season: "2024/25",
    league: "Premier League",
    position: "3rd"
  },
  {
    id: "arsenal-save", 
    managerName: "Pep Guardiola",
    teamName: "Arsenal",
    logo: "/Arsenal_FC.png", 
    lastPlayed: "3 days ago",
    season: "2024/25",
    league: "Premier League",
    position: "1st"
  }
]

export function SaveSelector({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const handleSaveSelect = (saveId: string) => {
    // Handle save selection logic here
    console.log('Selected save:', saveId)
  }

  const handleCreateNew = () => {
    // Handle create new save logic here
    console.log('Create new save')
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Welcome to Boardroom FC</h1>
              <p className="text-muted-foreground text-balance">
                Select a save file to continue or create a new one
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockSaves.map((save) => (
                <Card 
                  key={save.id}
                  className="cursor-pointer transition-all hover:shadow-md hover:scale-105"
                  onClick={() => handleSaveSelect(save.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className="flex-shrink-0">
                        <Image
                          src={save.logo}
                          alt={save.teamName}
                          width={64}
                          height={64}
                          className="rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <h3 className="font-bold text-lg">{save.managerName}</h3>
                          <p className="font-semibold text-base text-muted-foreground">{save.teamName}</p>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center justify-center gap-1">
                            <IconClock className="size-4" />
                            {save.lastPlayed}
                          </div>
                          <div className="flex items-center justify-center gap-1">
                            <IconTrophy className="size-4" />
                            {save.position} in {save.league}
                          </div>
                          <p>Season {save.season}</p>
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