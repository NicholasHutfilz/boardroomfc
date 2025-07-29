"use client"

import * as React from "react"
import { 
  Star, 
  Trash2, 
  Send, 
  PlusCircle,
  Reply,
  Forward,
  Paperclip,
  Search,
  Archive
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface InboxMessage {
  id: string
  from: string
  fromEmail: string
  avatar: string
  subject: string
  preview: string
  content: string
  timestamp: string
  isRead: boolean
  isStarred: boolean
  hasAttachments: boolean
  attachments?: {
    name: string
    size: string
    type: string
  }[]
  participants?: {
    name: string
    avatar: string
  }[]
}

const mockMessages: InboxMessage[] = [
  {
    id: "1",
    from: "Phil Murphy",
    fromEmail: "p.murphy@boardroomfc.com",
    avatar: "/people/philmurphy.png",
    subject: "Brighton AI Tactical Shift - Mid-Season Analysis",
    preview: "Brighton's AI management system has autonomously changed formation to 3-4-3 due to fixture congestion and declining player morale. Fascinating case study of adaptive intelligence.",
    content: "Boss,\n\nYou need to see this - Brighton's AI management system just made an autonomous tactical shift that's caught everyone off guard. Their algorithm detected a 15% drop in squad morale over the past month (due to their Europa League fixtures piling up) and automatically switched from their trademark 4-2-3-1 to a more defensive 3-4-3.\n\nWhat's remarkable is that their AI didn't just look at fitness data - it actually analyzed player interviews, social media sentiment, and even training ground body language through their video analysis system. The AI concluded that the players were mentally fatigued from constant high-press tactics and needed a system that would allow them to 'breathe' more in games.\n\nThey've won 3 out of 4 since the switch. The AI is learning and adapting in real-time. This is exactly the kind of intelligence we're seeing across football now - systems that think beyond just numbers.\n\nThought you'd find this as fascinating as I do. The future is here.\n\nCheers,\nPhil\n\nP.S. - Their AI also automatically adjusted training intensity and even changed the pre-match meal timing. Incredible stuff.",
    timestamp: "2 hours ago",
    isRead: false,
    isStarred: true,
    hasAttachments: true,
    attachments: [
      { name: "brighton_ai_analysis.pdf", size: "2.8 MB", type: "pdf" },
      { name: "tactical_evolution_video.mp4", size: "45 MB", type: "video" }
    ]
  },
  {
    id: "2",
    from: "Marcus Rodriguez",
    fromEmail: "m.rodriguez@agent.com",
    avatar: "/people/playerrejectstransfer.png",
    subject: "RE: Al-Hilal Transfer Offer - Decision Made",
    preview: "Thank you for the opportunity, but I must decline the offer from Al-Hilal. While the financial package is extraordinary, it doesn't align with my personal values and career aspirations.",
    content: "Dear Chelsea Football Club,\n\nI hope this message finds you well. I wanted to personally reach out regarding the transfer offer from Al-Hilal that was forwarded to me yesterday.\n\nAfter careful consideration with my family and advisors, I have decided to respectfully decline their offer. While I understand the financial package of £350,000 per week is substantial, there are factors beyond money that guide my decisions.\n\nMy personal values center around playing at the highest competitive level in Europe, where I can continue to grow as a player and compete for major trophies like the Champions League and Premier League. The Saudi Pro League, while growing, doesn't currently offer the same competitive environment that drives me as a footballer.\n\nAdditionally, my family has strong ties to European culture and education systems. Moving to Saudi Arabia, despite the generous offer, would require compromises on lifestyle and values that we're not prepared to make.\n\nI remain committed to Chelsea and excited about our project. Sometimes the right decision isn't the most lucrative one.\n\nThank you for understanding.\n\nBest regards,\nMarcus Rodriguez\n\n\"Football isn't just about money - it's about legacy, competition, and staying true to who you are.\"",
    timestamp: "Yesterday",
    isRead: true,
    isStarred: false,
    hasAttachments: false
  },
  {
    id: "3",
    from: "Kai Sterling",
    fromEmail: "k.sterling@chelseafc.com",
    avatar: "/people/starplayer.png",
    subject: "Leeds United Offer - My Decision to Stay",
    preview: "Boss, got that crazy offer from Leeds but there's no way I'm leaving this project. You're building something special here and I want to be part of Chelsea's renaissance!",
    content: "Boss!\n\nHad to write this myself because my agent thinks I've lost my mind! 😂\n\nSo Leeds came in with an absolutely mental offer - £400k a week, captaincy, and they're apparently a 'bigger club' (their words, not mine). My agent nearly fainted when I said no.\n\nBut here's the thing - money isn't everything. When I joined Chelsea, you told me we were going to rebuild this club from the ground up and challenge for everything. Two years later, look where we are! From mid-table to Champions League football, and I've been part of that journey.\n\nLeeds might have history, but WE are making history right now. Plus, and I hope this doesn't sound too cheesy, but you're genuinely the best manager I've worked with. The way you've developed my game, trusted me with responsibility, and created this family atmosphere - that's worth more than any pay rise.\n\nThe lads were joking that Leeds must be desperate to offer that much to steal me from the 'little club' Chelsea. Little do they know we're about to show everyone what this 'little club' can do! \n\nI'm all in, boss. Let's bring some silverware home to Stamford Bridge!\n\nKTBFFH! 💙\nKai\n\nP.S. - The agent is still sulking. Might need to buy him a drink! 🍺",
    timestamp: "3 days ago",
    isRead: false,
    isStarred: true,
    hasAttachments: false
  }
]

export function SoccerInbox() {
  const [selectedMessage, setSelectedMessage] = React.useState<InboxMessage | null>(mockMessages[0])
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredMessages = mockMessages.filter(message =>
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-full bg-background">
      {/* Message List */}
      <div className="flex-1 flex">
        <div className="w-96 border-r bg-card/50 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Inbox</h2>
              <div className="flex items-center gap-2">
                <Button size="sm">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Compose
                </Button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              {filteredMessages.filter(m => !m.isRead).length} unread messages
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search messages..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-auto">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={cn(
                  "p-4 border-b cursor-pointer transition-colors",
                  selectedMessage?.id === message.id 
                    ? "bg-muted/50 border-l-2 border-l-primary" 
                    : "hover:bg-muted/30",
                  !message.isRead && "bg-accent/30"
                )}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10 shrink-0">
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback>{message.from.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn(
                        "font-medium truncate",
                        !message.isRead && "font-semibold"
                      )}>
                        {message.from}
                      </span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {message.timestamp}
                      </span>
                    </div>
                    <div className={cn(
                      "text-sm mb-1 truncate",
                      !message.isRead && "font-medium"
                    )}>
                      {message.subject}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {message.preview}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {message.isStarred && <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />}
                      {message.hasAttachments && <Paperclip className="w-3 h-3 text-muted-foreground" />}
                      {!message.isRead && <div className="w-2 h-2 bg-primary rounded-full" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-1 flex flex-col">
          {selectedMessage ? (
            <>
              {/* Message Header */}
              <div className="p-6 border-b">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={selectedMessage.avatar} />
                      <AvatarFallback>{selectedMessage.from.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{selectedMessage.subject}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>{selectedMessage.from}</span>
                        <span>•</span>
                        <span>{selectedMessage.timestamp}</span>
                        {selectedMessage.participants && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              {selectedMessage.participants.map((participant, index) => (
                                <span key={index} className="text-xs">{participant.name}</span>
                              )).reduce((prev, curr, index) => [prev, index < selectedMessage.participants!.length - 1 ? ", " : "", curr] as any)}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost">
                      <Star className={cn(
                        "w-4 h-4",
                        selectedMessage.isStarred && "fill-yellow-400 text-yellow-400"
                      )} />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {selectedMessage.hasAttachments && selectedMessage.attachments && (
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">
                      Attachments ({selectedMessage.attachments.length})
                    </div>
                    <div className="flex gap-2">
                      {selectedMessage.attachments.map((attachment, index) => (
                        <Card key={index} className="p-3">
                          <div className="flex items-center gap-2">
                            <Paperclip className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="text-sm font-medium">{attachment.name}</div>
                              <div className="text-xs text-muted-foreground">{attachment.size}</div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1 p-6 overflow-auto">
                <div className="prose max-w-none">
                  <p className="text-sm leading-relaxed">{selectedMessage.content}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 border-t">
                <div className="flex items-center gap-2">
                  <Button size="sm">
                    <Reply className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                  <Button size="sm" variant="outline">
                    <Forward className="w-4 h-4 mr-2" />
                    Forward
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-12 h-12 mx-auto mb-4 opacity-50 flex items-center justify-center">
                  <Send className="w-8 h-8" />
                </div>
                <p>Select a message to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}