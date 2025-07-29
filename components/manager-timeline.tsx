"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconTrophy, IconCalendar, IconMapPin } from "@tabler/icons-react"
import Image from "next/image"

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  team: 'arsenal' | 'chelsea'
  type: 'appointment' | 'achievement' | 'milestone'
  achievement?: string
  position: 'left' | 'right'
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: 'July 2024',
    title: 'Appointed Chelsea Manager',
    description: 'Signed a 3-year contract with Chelsea FC after successful tenure at Arsenal.',
    team: 'chelsea',
    type: 'appointment',
    position: 'right'
  },
  {
    id: '2',
    date: 'May 2024',
    title: 'Premier League Champions',
    description: 'Led Arsenal to their first Premier League title in 20 years with a record-breaking 95 points.',
    team: 'arsenal',
    type: 'achievement',
    achievement: 'Premier League Winner',
    position: 'left'
  },
  {
    id: '3',
    date: 'May 2023',
    title: 'Conference League Victory',
    description: 'Guided Arsenal to European glory with a 2-1 victory over Real Betis in the final.',
    team: 'arsenal',
    type: 'achievement',
    achievement: 'UEFA Conference League Winner',
    position: 'right'
  },
  {
    id: '4',
    date: 'March 2023',
    title: 'Contract Extension',
    description: 'Signed a 2-year contract extension after impressive European campaign.',
    team: 'arsenal',
    type: 'milestone',
    position: 'left'
  },
  {
    id: '5',
    date: 'October 2022',
    title: 'First North London Derby Victory',
    description: 'Secured a memorable 3-1 victory over Tottenham at Emirates Stadium.',
    team: 'arsenal',
    type: 'milestone',
    position: 'right'
  },
  {
    id: '6',
    date: 'July 2022',
    title: 'Appointed Arsenal Manager',
    description: 'Began managerial career at Arsenal FC with ambitious plans to restore the club to former glory.',
    team: 'arsenal',
    type: 'appointment',
    position: 'left'
  }
]

export function ManagerTimeline() {
  return (
    <div className="relative max-w-6xl mx-auto p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Managerial Journey
        </h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          From Arsenal's resurgence to Chelsea's new era - a timeline of leadership, trophies, and transformation.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Central vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-red-500 to-blue-500 h-full"></div>

        {/* Timeline Events */}
        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="relative flex items-center">
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full border-4 border-gray-800 z-10 flex items-center justify-center">
                {event.type === 'achievement' && (
                  <IconTrophy className="w-3 h-3 text-yellow-600" />
                )}
                {event.type === 'appointment' && (
                  <IconMapPin className="w-3 h-3 text-blue-600" />
                )}
                {event.type === 'milestone' && (
                  <IconCalendar className="w-3 h-3 text-green-600" />
                )}
              </div>

              {/* Event Card */}
              <div className={`w-5/12 ${event.position === 'left' ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}>
                <Card className={`bg-white/10 backdrop-blur-md border-white/20 p-6 hover:bg-white/15 transition-all duration-300 ${
                  event.position === 'left' ? 'text-right' : 'text-left'
                }`}>
                  {/* Team Logo */}
                  <div className={`flex items-center gap-3 mb-4 ${
                    event.position === 'left' ? 'justify-end' : 'justify-start'
                  }`}>
                    <Image
                      src={event.team === 'arsenal' ? '/Arsenal_FC.png' : '/Chelsea_FC.png'}
                      alt={event.team === 'arsenal' ? 'Arsenal FC' : 'Chelsea FC'}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                    <div>
                      <div className="text-sm text-white/70">{event.date}</div>
                      {event.achievement && (
                        <Badge 
                          variant="outline" 
                          className={`text-xs mt-1 ${
                            event.type === 'achievement' 
                              ? 'border-yellow-400 text-yellow-400' 
                              : 'border-white/40 text-white/80'
                          }`}
                        >
                          {event.achievement}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Event Content */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {event.description}
                  </p>

                  {/* Achievement Badge for Major Wins */}
                  {event.type === 'achievement' && (
                    <div className={`mt-4 ${event.position === 'left' ? 'text-right' : 'text-left'}`}>
                      <div className="inline-flex items-center gap-2 bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium">
                        <IconTrophy className="w-3 h-3" />
                        Trophy Won
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Current Status */}
        <div className="relative mt-16 text-center">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white z-10 flex items-center justify-center">
            <IconMapPin className="w-4 h-4 text-white" />
          </div>
          <Card className="bg-blue-600/20 backdrop-blur-md border-blue-400/30 p-6 max-w-md mx-auto mt-4">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Image
                src="/Chelsea_FC.png"
                alt="Chelsea FC"
                width={40}
                height={40}
                className="rounded"
              />
              <div>
                <h3 className="text-lg font-bold text-white">Current Position</h3>
                <p className="text-sm text-blue-200">Chelsea FC Manager</p>
              </div>
            </div>
            <p className="text-white/80 text-sm">
              Ready to write the next chapter at Stamford Bridge
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}