"use client"

import * as React from "react"
import { IconCheck, IconChevronsDown, IconPlus } from "@tabler/icons-react"
import Image from "next/image"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const teams = [
  {
    name: "Chelsea",
    logo: "/Chelsea_FC.png",
    lastPlayed: "Just now",
    id: "chelsea"
  },
  {
    name: "Arsenal", 
    logo: "/Arsenal_FC.png",
    lastPlayed: "2 days ago",
    id: "arsenal"
  }
]

export function TeamSwitcher() {
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center">
                <Image
                  src={activeTeam.logo}
                  alt={activeTeam.name}
                  width={20}
                  height={20}
                  className="size-5 rounded"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeTeam.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {activeTeam.lastPlayed}
                </span>
              </div>
              <IconChevronsDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Save Files
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Image
                    src={team.logo}
                    alt={team.name}
                    width={16}
                    height={16}
                    className="size-4 rounded"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="font-medium">{team.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {team.lastPlayed}
                  </span>
                </div>
                {activeTeam.id === team.id && <IconCheck className="size-4" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border border-dashed">
                <IconPlus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">New Save</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
