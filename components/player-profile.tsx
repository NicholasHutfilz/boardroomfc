"use client"

import * as React from "react"
import Link from "next/link"
import { IconArrowLeft, IconEdit, IconStar, IconTrophy } from "@tabler/icons-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { mockPlayerData, type Player } from "@/lib/mock-data"

interface PlayerProfileProps {
  playerId: string
}

// Helper function to get ability color
function getAbilityColor(ability: string): string {
  switch (ability.toLowerCase()) {
    case "accomplished":
      return "bg-blue-500"
    case "very good":
      return "bg-green-500"
    case "good":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
}

// Helper function to get attribute color based on value
function getAttributeColor(value: number): string {
  if (value >= 15) return "text-green-600"
  if (value >= 12) return "text-blue-600"
  if (value >= 9) return "text-yellow-600"
  return "text-red-600"
}

export function PlayerProfile({ playerId }: PlayerProfileProps) {
  const player = mockPlayerData[playerId]

  if (!player) {
    return (
      <div className="px-4 lg:px-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold">Player not found</h2>
          <p className="text-muted-foreground mt-2">The requested player could not be found.</p>
          <Link href="/squad">
            <Button className="mt-4">
              <IconArrowLeft className="h-4 w-4 mr-2" />
              Back to Squad
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 lg:px-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/squad">
          <Button variant="outline" size="sm">
            <IconArrowLeft className="h-4 w-4 mr-2" />
            Back to Squad
          </Button>
        </Link>
        <Button variant="outline" size="sm">
          <IconEdit className="h-4 w-4 mr-2" />
          Edit Player
        </Button>
      </div>

      {/* Player Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={`/placeholder-player.jpg`} alt={player.name} />
              <AvatarFallback className="text-lg">
                {player.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-3xl">{player.name}</CardTitle>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {player.position}
                </Badge>
              </div>
              <CardDescription className="text-base mb-4">
                {player.personalityDescription} • {player.mediaDescription}
              </CardDescription>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Age:</span>
                  <div className="font-medium">{player.age} years old</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Nationality:</span>
                  <div className="font-medium">{player.nationality}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Height/Weight:</span>
                  <div className="font-medium">{player.height}, {player.weight}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Preferred Foot:</span>
                  <div className="font-medium">{player.preferredFoot}</div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-muted-foreground text-sm mb-1">Current Ability</div>
              <div className="text-2xl font-bold">{player.currentAbility}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm mb-1">Potential Ability</div>
              <div className="text-2xl font-bold">{player.potentialAbility}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm mb-1">Market Value</div>
              <div className="text-2xl font-bold">{player.value}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm mb-1">Condition</div>
              <div className="flex items-center gap-2">
                <Progress value={player.condition} className="flex-1" />
                <span className="text-sm font-medium">{player.condition}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
          <TabsTrigger value="contract">Contract</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Attributes */}
            <Card>
              <CardHeader>
                <CardTitle>Key Attributes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${getAbilityColor(player.ability)}`} />
                    <span className="font-medium">Overall Ability: {player.ability}</span>
                  </div>
                  <Progress value={(player.currentAbility / 200) * 100} className="h-2" />
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Condition:</span>
                    <span className="font-medium">{player.condition}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Morale:</span>
                    <span className="font-medium">{player.morale}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contract Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contract Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Wage:</span>
                    <span className="font-medium">{player.wage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contract Until:</span>
                    <span className="font-medium">{player.contract}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Value:</span>
                    <span className="font-medium">{player.value}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Player Traits */}
          {player.traits && player.traits.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Player Traits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {player.traits.map((trait, index) => (
                    <Badge key={index} variant="secondary">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="attributes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Technical Attributes */}
            <Card>
              <CardHeader>
                <CardTitle>Technical</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Corners:</span>
                  <span className={`font-medium ${getAttributeColor(player.corners)}`}>{player.corners}</span>
                </div>
                <div className="flex justify-between">
                  <span>Crossing:</span>
                  <span className={`font-medium ${getAttributeColor(player.crossing)}`}>{player.crossing}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dribbling:</span>
                  <span className={`font-medium ${getAttributeColor(player.dribbling)}`}>{player.dribbling}</span>
                </div>
                <div className="flex justify-between">
                  <span>Finishing:</span>
                  <span className={`font-medium ${getAttributeColor(player.finishing)}`}>{player.finishing}</span>
                </div>
                <div className="flex justify-between">
                  <span>First Touch:</span>
                  <span className={`font-medium ${getAttributeColor(player.firstTouch)}`}>{player.firstTouch}</span>
                </div>
                <div className="flex justify-between">
                  <span>Free Kicks:</span>
                  <span className={`font-medium ${getAttributeColor(player.freeKicks)}`}>{player.freeKicks}</span>
                </div>
                <div className="flex justify-between">
                  <span>Heading:</span>
                  <span className={`font-medium ${getAttributeColor(player.heading)}`}>{player.heading}</span>
                </div>
                <div className="flex justify-between">
                  <span>Long Shots:</span>
                  <span className={`font-medium ${getAttributeColor(player.longShots)}`}>{player.longShots}</span>
                </div>
                <div className="flex justify-between">
                  <span>Marking:</span>
                  <span className={`font-medium ${getAttributeColor(player.marking)}`}>{player.marking}</span>
                </div>
                <div className="flex justify-between">
                  <span>Passing:</span>
                  <span className={`font-medium ${getAttributeColor(player.passing)}`}>{player.passing}</span>
                </div>
                <div className="flex justify-between">
                  <span>Penalty Taking:</span>
                  <span className={`font-medium ${getAttributeColor(player.penaltyTaking)}`}>{player.penaltyTaking}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tackling:</span>
                  <span className={`font-medium ${getAttributeColor(player.tackling)}`}>{player.tackling}</span>
                </div>
                <div className="flex justify-between">
                  <span>Technique:</span>
                  <span className={`font-medium ${getAttributeColor(player.technique)}`}>{player.technique}</span>
                </div>
              </CardContent>
            </Card>

            {/* Mental Attributes */}
            <Card>
              <CardHeader>
                <CardTitle>Mental</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Aggression:</span>
                  <span className={`font-medium ${getAttributeColor(player.aggression)}`}>{player.aggression}</span>
                </div>
                <div className="flex justify-between">
                  <span>Anticipation:</span>
                  <span className={`font-medium ${getAttributeColor(player.anticipation)}`}>{player.anticipation}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bravery:</span>
                  <span className={`font-medium ${getAttributeColor(player.bravery)}`}>{player.bravery}</span>
                </div>
                <div className="flex justify-between">
                  <span>Composure:</span>
                  <span className={`font-medium ${getAttributeColor(player.composure)}`}>{player.composure}</span>
                </div>
                <div className="flex justify-between">
                  <span>Concentration:</span>
                  <span className={`font-medium ${getAttributeColor(player.concentration)}`}>{player.concentration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Decisions:</span>
                  <span className={`font-medium ${getAttributeColor(player.decisions)}`}>{player.decisions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Determination:</span>
                  <span className={`font-medium ${getAttributeColor(player.determination)}`}>{player.determination}</span>
                </div>
                <div className="flex justify-between">
                  <span>Flair:</span>
                  <span className={`font-medium ${getAttributeColor(player.flair)}`}>{player.flair}</span>
                </div>
                <div className="flex justify-between">
                  <span>Leadership:</span>
                  <span className={`font-medium ${getAttributeColor(player.leadership)}`}>{player.leadership}</span>
                </div>
                <div className="flex justify-between">
                  <span>Off The Ball:</span>
                  <span className={`font-medium ${getAttributeColor(player.offTheBall)}`}>{player.offTheBall}</span>
                </div>
                <div className="flex justify-between">
                  <span>Positioning:</span>
                  <span className={`font-medium ${getAttributeColor(player.positioning)}`}>{player.positioning}</span>
                </div>
                <div className="flex justify-between">
                  <span>Teamwork:</span>
                  <span className={`font-medium ${getAttributeColor(player.teamwork)}`}>{player.teamwork}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vision:</span>
                  <span className={`font-medium ${getAttributeColor(player.vision)}`}>{player.vision}</span>
                </div>
                <div className="flex justify-between">
                  <span>Work Rate:</span>
                  <span className={`font-medium ${getAttributeColor(player.workRate)}`}>{player.workRate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Physical Attributes */}
            <Card>
              <CardHeader>
                <CardTitle>Physical</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Acceleration:</span>
                  <span className={`font-medium ${getAttributeColor(player.acceleration)}`}>{player.acceleration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Agility:</span>
                  <span className={`font-medium ${getAttributeColor(player.agility)}`}>{player.agility}</span>
                </div>
                <div className="flex justify-between">
                  <span>Balance:</span>
                  <span className={`font-medium ${getAttributeColor(player.balance)}`}>{player.balance}</span>
                </div>
                <div className="flex justify-between">
                  <span>Jumping Reach:</span>
                  <span className={`font-medium ${getAttributeColor(player.jumpingReach)}`}>{player.jumpingReach}</span>
                </div>
                <div className="flex justify-between">
                  <span>Natural Fitness:</span>
                  <span className={`font-medium ${getAttributeColor(player.naturalFitness)}`}>{player.naturalFitness}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pace:</span>
                  <span className={`font-medium ${getAttributeColor(player.pace)}`}>{player.pace}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stamina:</span>
                  <span className={`font-medium ${getAttributeColor(player.stamina)}`}>{player.stamina}</span>
                </div>
                <div className="flex justify-between">
                  <span>Strength:</span>
                  <span className={`font-medium ${getAttributeColor(player.strength)}`}>{player.strength}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contract" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">Current Wage</div>
                    <div className="text-2xl font-bold">{player.wage}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">Contract Expires</div>
                    <div className="text-2xl font-bold">{player.contract}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">Market Value</div>
                    <div className="text-2xl font-bold">{player.value}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">Club</div>
                    <div className="text-2xl font-bold">{player.club}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Career Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">Appearances</div>
                    <div className="text-2xl font-bold">{player.appearances}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">Goals</div>
                    <div className="text-2xl font-bold">{player.goals}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">Assists</div>
                    <div className="text-2xl font-bold">{player.assists}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">Goals per Game</div>
                    <div className="text-2xl font-bold">
                      {player.appearances > 0 ? (player.goals / player.appearances).toFixed(2) : "0.00"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disciplinary Record</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">Yellow Cards</div>
                    <div className="text-2xl font-bold text-yellow-600">{player.yellowCards}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">Red Cards</div>
                    <div className="text-2xl font-bold text-red-600">{player.redCards}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 