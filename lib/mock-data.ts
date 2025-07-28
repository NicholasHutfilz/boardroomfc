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
export const mockPlayerData: Record<string, Player> = {
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
    name: "Marvin Ducksch",
    position: "ST",
    positionGroup: "Forward",
    age: 30,
    nationality: "Germany",
    club: "Werder Bremen",
    preferredFoot: "Right",
    height: "185 cm",
    weight: "78 kg",
    currentAbility: 150,
    potentialAbility: 150,
    value: "€2.2M",
    wage: "€29,000 p/a",
    contract: "30/6/2026",
    morale: "Excellent",
    condition: 92,
    ability: "Accomplished",
    corners: 12, crossing: 11, dribbling: 13, finishing: 16, firstTouch: 14, freeKicks: 15,
    heading: 13, longShots: 14, longThrows: 8, marking: 8, passing: 13, penaltyTaking: 16,
    tackling: 7, technique: 15, aggression: 12, anticipation: 16, bravery: 13,
    composure: 15, concentration: 14, decisions: 15, determination: 16, flair: 14,
    leadership: 12, offTheBall: 16, positioning: 15, teamwork: 14, vision: 14,
    workRate: 15, acceleration: 12, agility: 13, balance: 13, jumpingReach: 14,
    naturalFitness: 14, pace: 12, stamina: 15, strength: 12,
    traits: ["Shoots With Power", "Plays Short Simple Passes"],
    personalityDescription: "Professional",
    mediaDescription: "Striker",
    appearances: 156,
    goals: 68,
    assists: 23,
    yellowCards: 8,
    redCards: 0
  },
  "3": {
    id: "3",
    name: "Romano Schmid",
    position: "AM(C)",
    positionGroup: "Midfielder",
    age: 25,
    nationality: "Austria",
    club: "Werder Bremen",
    preferredFoot: "Right",
    height: "181 cm",
    weight: "74 kg",
    currentAbility: 145,
    potentialAbility: 155,
    value: "€1.8M",
    wage: "€23,000 p/a",
    contract: "30/6/2027",
    morale: "Good",
    condition: 89,
    ability: "Accomplished",
    corners: 13, crossing: 12, dribbling: 15, finishing: 13, firstTouch: 16, freeKicks: 14,
    heading: 10, longShots: 15, longThrows: 8, marking: 10, passing: 16, penaltyTaking: 12,
    tackling: 11, technique: 16, aggression: 9, anticipation: 14, bravery: 11,
    composure: 15, concentration: 14, decisions: 15, determination: 14, flair: 16,
    leadership: 10, offTheBall: 14, positioning: 13, teamwork: 15, vision: 16,
    workRate: 14, acceleration: 14, agility: 16, balance: 15, jumpingReach: 10,
    naturalFitness: 15, pace: 13, stamina: 14, strength: 10,
    traits: ["Plays Short Simple Passes", "Runs With Ball Often"],
    personalityDescription: "Professional",
    mediaDescription: "Attacking Midfielder",
    appearances: 98,
    goals: 15,
    assists: 28,
    yellowCards: 12,
    redCards: 1
  },
  "4": {
    id: "4",
    name: "Mitchell Weiser",
    position: "WB(R)",
    positionGroup: "Defender",
    age: 30,
    nationality: "Germany",
    club: "Werder Bremen",
    preferredFoot: "Right",
    height: "180 cm",
    weight: "75 kg",
    currentAbility: 140,
    potentialAbility: 140,
    value: "€1.1M",
    wage: "€25,000 p/a",
    contract: "30/6/2025",
    morale: "Good",
    condition: 91,
    ability: "Very Good",
    corners: 10, crossing: 14, dribbling: 12, finishing: 9, firstTouch: 13, freeKicks: 8,
    heading: 12, longShots: 10, longThrows: 12, marking: 13, passing: 13, penaltyTaking: 8,
    tackling: 14, technique: 12, aggression: 12, anticipation: 13, bravery: 14,
    composure: 12, concentration: 13, decisions: 13, determination: 15, flair: 10,
    leadership: 12, offTheBall: 12, positioning: 14, teamwork: 14, vision: 12,
    workRate: 16, acceleration: 15, agility: 14, balance: 13, jumpingReach: 12,
    naturalFitness: 16, pace: 15, stamina: 16, strength: 13,
    traits: ["Plays Short Simple Passes"],
    personalityDescription: "Professional",
    mediaDescription: "Wing Back",
    appearances: 187,
    goals: 12,
    assists: 35,
    yellowCards: 23,
    redCards: 0
  },
  "5": {
    id: "5",
    name: "Leonardo Bittencourt",
    position: "AM(RL)",
    positionGroup: "Midfielder",
    age: 30,
    nationality: "Brazil",
    club: "Werder Bremen",
    preferredFoot: "Left",
    height: "176 cm",
    weight: "70 kg",
    currentAbility: 150,
    potentialAbility: 150,
    value: "€2.0M",
    wage: "€32,000 p/a",
    contract: "30/6/2025",
    morale: "Excellent",
    condition: 88,
    ability: "Accomplished",
    corners: 14, crossing: 13, dribbling: 16, finishing: 14, firstTouch: 16, freeKicks: 15,
    heading: 9, longShots: 14, longThrows: 8, marking: 9, passing: 15, penaltyTaking: 13,
    tackling: 10, technique: 16, aggression: 8, anticipation: 14, bravery: 12,
    composure: 15, concentration: 13, decisions: 14, determination: 13, flair: 17,
    leadership: 11, offTheBall: 14, positioning: 12, teamwork: 14, vision: 15,
    workRate: 13, acceleration: 13, agility: 15, balance: 14, jumpingReach: 8,
    naturalFitness: 13, pace: 12, stamina: 13, strength: 9,
    traits: ["Plays Short Simple Passes", "Runs With Ball Often"],
    personalityDescription: "Professional",
    mediaDescription: "Attacking Midfielder",
    appearances: 142,
    goals: 23,
    assists: 41,
    yellowCards: 15,
    redCards: 1
  }
}

export type { Player } 