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

interface PlayerProfileProps {
  playerId: string
}

interface Player {
  id: string
  name: string
  position: string
  positionGroup: string
  age: number
  nationality: string
  club: string
  preferredFoot: string
  height: string
  weight: string
  currentAbility: number
  potentialAbility: number
  value: string
  wage: string
  contract: string
  morale: string
  condition: number
  ability: string
  // Technical attributes
  corners: number
  crossing: number
  dribbling: number
  finishing: number
  firstTouch: number
  freeKicks: number
  heading: number
  longShots: number
  longThrows: number
  marking: number
  passing: number
  penaltyTaking: number
  tackling: number
  technique: number
  // Mental attributes
  aggression: number
  anticipation: number
  bravery: number
  composure: number
  concentration: number
  decisions: number
  determination: number
  flair: number
  leadership: number
  offTheBall: number
  positioning: number
  teamwork: number
  vision: number
  workRate: number
  // Physical attributes
  acceleration: number
  agility: number
  balance: number
  jumpingReach: number
  naturalFitness: number
  pace: number
  stamina: number
  strength: number
  // Player traits
  traits: string[]
  personalityDescription: string
  mediaDescription: string
  // Career stats
  appearances: number
  goals: number
  assists: number
  yellowCards: number
  redCards: number
}

// Mock player data - in a real app this would be fetched from your database
const mockPlayerData: Record<string, Player> = {
  "1": {
    id: "1",
    name: "Michael Zetterer",
    position: "GK",
    positionGroup: "Goalkeeper",
    age: 26,
    nationality: "Germany",
    club: "Werder Bremen",
    preferredFoot: "Right",
    height: "193 cm",
    weight: "84 kg",
    currentAbility: 140,
    potentialAbility: 150,
    value: "€104,000",
    wage: "€5,500 p/a",
    contract: "30/6/2025",
    morale: "Excellent",
    condition: 95,
    ability: "Very Good",
    corners: 7, crossing: 5, dribbling: 8, finishing: 4, firstTouch: 10, freeKicks: 7,
    heading: 13, longShots: 4, longThrows: 8, marking: 5, passing: 11, penaltyTaking: 7,
    tackling: 5, technique: 12, aggression: 14, anticipation: 15, bravery: 13,
    composure: 12, concentration: 10, decisions: 12, determination: 15, flair: 10,
    leadership: 6, offTheBall: 5, positioning: 14, teamwork: 14, vision: 10,
    workRate: 15, acceleration: 12, agility: 15, balance: 12, jumpingReach: 9,
    naturalFitness: 13, pace: 11, stamina: 14, strength: 15,
    traits: ["Moves Into Channels", "Shoots With Power", "Likes Ball Played Into Feet", "Runs With Ball Often"],
    personalityDescription: "Ambitious",
    mediaDescription: "Striker",
    appearances: 83,
    goals: 14,
    assists: 32,
    yellowCards: 2,
    redCards: 0
  },
  "2": {
    id: "2",
    name: "Mitchell Weiser",
    position: "DR",
    positionGroup: "Defender",
    age: 27,
    nationality: "Germany",
    club: "Werder Bremen",
    preferredFoot: "Right",
    height: "180 cm",
    weight: "75 kg",
    currentAbility: 145,
    potentialAbility: 145,
    value: "€1,500,000",
    wage: "€8,500 p/a",
    contract: "30/6/2024",
    morale: "Excellent",
    condition: 89,
    ability: "Good",
    corners: 11, crossing: 16, dribbling: 12, finishing: 8, firstTouch: 13, freeKicks: 9,
    heading: 11, longShots: 9, longThrows: 11, marking: 14, passing: 13, penaltyTaking: 5,
    tackling: 14, technique: 12, aggression: 14, anticipation: 15, bravery: 13,
    composure: 12, concentration: 14, decisions: 13, determination: 15, flair: 10,
    leadership: 12, offTheBall: 13, positioning: 14, teamwork: 15, vision: 12,
    workRate: 16, acceleration: 13, agility: 14, balance: 13, jumpingReach: 11,
    naturalFitness: 15, pace: 14, stamina: 15, strength: 12,
    traits: ["Plays Short Simple Passes", "Gets Forward Whenever Possible"],
    personalityDescription: "Professional",
    mediaDescription: "Right Back",
    appearances: 147,
    goals: 8,
    assists: 23,
    yellowCards: 15,
    redCards: 1
  },
  "6": {
    id: "6",
    name: "Christian Groß",
    position: "MCR",
    positionGroup: "Midfielder",
    age: 32,
    nationality: "Germany",
    club: "Werder Bremen",
    preferredFoot: "Right",
    height: "181 cm",
    weight: "78 kg",
    currentAbility: 150,
    potentialAbility: 150,
    value: "€130,000",
    wage: "€6,800 p/a",
    contract: "30/6/2024",
    morale: "Very Good",
    condition: 88,
    ability: "Good",
    corners: 8, crossing: 9, dribbling: 10, finishing: 8, firstTouch: 13, freeKicks: 12,
    heading: 11, longShots: 10, longThrows: 10, marking: 13, passing: 14, penaltyTaking: 8,
    tackling: 15, technique: 12, aggression: 15, anticipation: 15, bravery: 15,
    composure: 14, concentration: 16, decisions: 15, determination: 16, flair: 9,
    leadership: 15, offTheBall: 10, positioning: 15, teamwork: 16, vision: 13,
    workRate: 16, acceleration: 10, agility: 11, balance: 12, jumpingReach: 11,
    naturalFitness: 14, pace: 9, stamina: 15, strength: 14,
    traits: ["Plays Short Simple Passes", "Tries To Beat Offside Trap"],
    personalityDescription: "Professional",
    mediaDescription: "Central Midfielder",
    appearances: 124,
    goals: 6,
    assists: 18,
    yellowCards: 22,
    redCards: 0
  },
  "10": {
    id: "10",
    name: "Niclas Füllkrug",
    position: "STCR",
    positionGroup: "Forward",
    age: 28,
    nationality: "Germany",
    club: "Werder Bremen",
    preferredFoot: "Right",
    height: "188 cm",
    weight: "85 kg",
    currentAbility: 155,
    potentialAbility: 155,
    value: "€1,625,000",
    wage: "€13,000 p/a",
    contract: "30/6/2024",
    morale: "Excellent",
    condition: 87,
    ability: "Good",
    corners: 6, crossing: 8, dribbling: 11, finishing: 16, firstTouch: 13, freeKicks: 11,
    heading: 17, longShots: 14, longThrows: 8, marking: 7, passing: 11, penaltyTaking: 13,
    tackling: 7, technique: 12, aggression: 14, anticipation: 16, bravery: 16,
    composure: 14, concentration: 13, decisions: 14, determination: 16, flair: 11,
    leadership: 12, offTheBall: 16, positioning: 15, teamwork: 13, vision: 11,
    workRate: 15, acceleration: 11, agility: 12, balance: 13, jumpingReach: 17,
    naturalFitness: 14, pace: 11, stamina: 14, strength: 17,
    traits: ["Moves Into Channels", "Plays With Back To Goal", "Shoots With Power"],
    personalityDescription: "Ambitious",
    mediaDescription: "Target Man",
    appearances: 89,
    goals: 47,
    assists: 12,
    yellowCards: 8,
    redCards: 1
  }
}

const getAttributeColor = (value: number) => {
  if (value >= 18) return "text-green-600 font-bold"
  if (value >= 15) return "text-green-500"
  if (value >= 12) return "text-yellow-500"
  if (value >= 8) return "text-orange-500"
  return "text-red-500"
}

const getAbilityColor = (ability: string) => {
  switch (ability) {
    case "Excellent":
      return "bg-green-500"
    case "Very Good":
      return "bg-green-400"
    case "Good":
      return "bg-yellow-400"
    case "Decent":
      return "bg-orange-400"
    default:
      return "bg-gray-400"
  }
}

const AttributeRow = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-sm">{label}</span>
    <span className={`text-sm font-medium ${getAttributeColor(value)}`}>
      {value}
    </span>
  </div>
)

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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Best Attributes</div>
                    <div className="space-y-1">
                      <AttributeRow label="Anticipation" value={player.anticipation} />
                      <AttributeRow label="Determination" value={player.determination} />
                      <AttributeRow label="Work Rate" value={player.workRate} />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Key Skills</div>
                    <div className="space-y-1">
                      <AttributeRow label="Technique" value={player.technique} />
                      <AttributeRow label="Passing" value={player.passing} />
                      <AttributeRow label="Positioning" value={player.positioning} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Player Traits */}
            <Card>
              <CardHeader>
                <CardTitle>Player Traits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {player.traits.map((trait, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <IconStar className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{trait}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Season Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{player.appearances}</div>
                  <div className="text-sm text-muted-foreground">Appearances</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{player.goals}</div>
                  <div className="text-sm text-muted-foreground">Goals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{player.assists}</div>
                  <div className="text-sm text-muted-foreground">Assists</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">{player.yellowCards}</div>
                  <div className="text-sm text-muted-foreground">Yellow Cards</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">{player.redCards}</div>
                  <div className="text-sm text-muted-foreground">Red Cards</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attributes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Technical Attributes */}
            <Card>
              <CardHeader>
                <CardTitle>Technical</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <AttributeRow label="Corners" value={player.corners} />
                <AttributeRow label="Crossing" value={player.crossing} />
                <AttributeRow label="Dribbling" value={player.dribbling} />
                <AttributeRow label="Finishing" value={player.finishing} />
                <AttributeRow label="First Touch" value={player.firstTouch} />
                <AttributeRow label="Free Kicks" value={player.freeKicks} />
                <AttributeRow label="Heading" value={player.heading} />
                <AttributeRow label="Long Shots" value={player.longShots} />
                <AttributeRow label="Long Throws" value={player.longThrows} />
                <AttributeRow label="Marking" value={player.marking} />
                <AttributeRow label="Passing" value={player.passing} />
                <AttributeRow label="Penalty Taking" value={player.penaltyTaking} />
                <AttributeRow label="Tackling" value={player.tackling} />
                <AttributeRow label="Technique" value={player.technique} />
              </CardContent>
            </Card>

            {/* Mental Attributes */}
            <Card>
              <CardHeader>
                <CardTitle>Mental</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <AttributeRow label="Aggression" value={player.aggression} />
                <AttributeRow label="Anticipation" value={player.anticipation} />
                <AttributeRow label="Bravery" value={player.bravery} />
                <AttributeRow label="Composure" value={player.composure} />
                <AttributeRow label="Concentration" value={player.concentration} />
                <AttributeRow label="Decisions" value={player.decisions} />
                <AttributeRow label="Determination" value={player.determination} />
                <AttributeRow label="Flair" value={player.flair} />
                <AttributeRow label="Leadership" value={player.leadership} />
                <AttributeRow label="Off The Ball" value={player.offTheBall} />
                <AttributeRow label="Positioning" value={player.positioning} />
                <AttributeRow label="Teamwork" value={player.teamwork} />
                <AttributeRow label="Vision" value={player.vision} />
                <AttributeRow label="Work Rate" value={player.workRate} />
              </CardContent>
            </Card>

            {/* Physical Attributes */}
            <Card>
              <CardHeader>
                <CardTitle>Physical</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <AttributeRow label="Acceleration" value={player.acceleration} />
                <AttributeRow label="Agility" value={player.agility} />
                <AttributeRow label="Balance" value={player.balance} />
                <AttributeRow label="Jumping Reach" value={player.jumpingReach} />
                <AttributeRow label="Natural Fitness" value={player.naturalFitness} />
                <AttributeRow label="Pace" value={player.pace} />
                <AttributeRow label="Stamina" value={player.stamina} />
                <AttributeRow label="Strength" value={player.strength} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contract" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contract Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Current Wage</div>
                  <div className="text-2xl font-bold">{player.wage}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Contract Expires</div>
                  <div className="text-2xl font-bold">{player.contract}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Market Value</div>
                  <div className="text-2xl font-bold">{player.value}</div>
                </div>
              </div>
              <Separator />
              <div>
                <div className="text-muted-foreground text-sm mb-2">Player Morale</div>
                <div className="text-lg font-medium text-green-600">{player.morale}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Career Statistics</CardTitle>
              <CardDescription>
                Performance statistics for {player.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">{player.appearances}</div>
                  <div className="text-muted-foreground">Appearances</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{player.goals}</div>
                  <div className="text-muted-foreground">Goals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{player.assists}</div>
                  <div className="text-muted-foreground">Assists</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-500">{player.yellowCards}</div>
                  <div className="text-muted-foreground">Yellow Cards</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">{player.redCards}</div>
                  <div className="text-muted-foreground">Red Cards</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}