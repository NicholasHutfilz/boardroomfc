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
    subject: "Brighton Tactical Shift - Mid-Season Analysis",
    preview: "Brighton's manager has switched to a 3-4-3 formation mid-season, responding to injuries and a dip in squad morale.",
    content: "Boss,\n\nBrighton's manager just pulled off a bold tactical shift mid-season. With a string of injuries piling up and squad morale dropping, he abandoned their usual 4-2-3-1 and switched to a 3-4-3.\n\nApparently, the decision came after a tough run of fixtures and some key players voicing concerns about fatigue. The new system gives them more flexibility at the back and lets their wing-backs push higher up the pitch.\n\nSince the change, they've won 3 out of 4 and look revitalized. Shows how much impact a manager can have when reading the room and adapting.\n\nCheers,\nPhil",
    timestamp: "2 hours ago",
    isRead: false,
    isStarred: true,
    hasAttachments: true,
    attachments: [
      { name: "brighton_tactical_shift.pdf", size: "2.8 MB", type: "pdf" },
      { name: "tactical_evolution_video.mp4", size: "45 MB", type: "video" }
    ]
  },
  {
    id: "2",
    from: "Marcus Rodriguez",
    fromEmail: "m.rodriguez@agent.com",
    avatar: "/people/playerrejectstransfer.png",
    subject: "RE: Al-Hilal Transfer Offer - Decision Made",
    preview: "Thanks for the opportunity, but I'm declining Al-Hilal. The money's great but doesn't align with my career goals.",
    content: "Hey boss,\n\nDecided to turn down that Al-Hilal offer. £350k/week is crazy money but I want to stay in Europe and compete at the highest level.\n\nFamily's settled here and I'm not ready to give up on the Champions League dream. Plus, we've got something special building at Chelsea.\n\nSometimes it's not about the money.\n\nBest,\nMarcus",
    timestamp: "Yesterday",
    isRead: false,
    isStarred: false,
    hasAttachments: false
  },
  {
    id: "3",
    from: "Kai Sterling",
    fromEmail: "k.sterling@chelseafc.com",
    avatar: "/people/starplayer.png",
    subject: "Leeds United Offer - Staying Put!",
    preview: "Boss, got that crazy offer from Leeds but no way I'm leaving! You're building something special here.",
    content: "Boss!\n\nLeeds came in with £400k/week + captaincy. Agent nearly fainted when I said no! 😂\n\nBut honestly? Money isn't everything. We're making history here and I want to be part of it. Plus you're the best gaffer I've worked with.\n\nLet's bring some silverware home!\n\nKTBFFH! 💙\nKai\n\nP.S. - Agent's still sulking lol",
    timestamp: "3 days ago",
    isRead: true,
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
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">{selectedMessage.content}</div>
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