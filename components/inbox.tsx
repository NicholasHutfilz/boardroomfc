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
    fromEmail: "p.murphy@scouts.boardroomfc.com",
    avatar: "/people/philmurphy.png",
    subject: "🚨 URGENT: Brighton's tactical shift affecting our January strategy",
    preview: "Brighton have switched to a back-three system due to mounting fixture congestion and player morale concerns. This impacts our scouting targets significantly.",
    content: `Manager,

    I need to brief you on a significant development that's affecting our January transfer strategy.

    Brighton have just implemented a tactical overhaul - switching from their traditional 4-3-3 to a back-three system. Their AI analysis shows this was triggered by two key factors:

    1. **Fixture Congestion**: With 7 games in 3 weeks, their fitness data indicated players were struggling with the high-pressing demands of their previous system
    
    2. **Squad Morale**: Their sentiment analysis picked up growing frustration from defenders about being exposed in 1v1 situations
    
    This change has major implications for us:
    
    • **Our target RCB (Webster)**: Now playing as the central CB in their new system - they're unlikely to sell their most adaptable defender mid-transition
    
    • **Their wing-backs**: Are now crucial to their new identity. Lamptey and Cucurella types will be in even higher demand
    
    • **Market shift**: Other clubs are likely analyzing the same data - expect tactical evolution across the league
    
    The AI systems are learning from each other faster than ever. What starts as one club's solution quickly becomes league-wide adaptation.
    
    Recommend we pivot our scouting focus to clubs still using traditional systems - they'll have players more suited to our tactical needs.
    
    Let me know if you want the full tactical breakdown report.
    
    Regards,
    Phil Murphy
    Chief Scouting Officer`,
    timestamp: "2 hours ago",
    isRead: false,
    isStarred: true,
    hasAttachments: true,
    attachments: [
      { name: "brighton_tactical_analysis.pdf", size: "3.4 MB", type: "pdf" },
      { name: "market_impact_report.xlsx", size: "1.2 MB", type: "excel" }
    ]
  },
  {
    id: "2",
    from: "Marcus Rodriguez",
    fromEmail: "m.rodriguez@agent.global",
    avatar: "/people/playerrejectstransfer.png",
    subject: "Re: Al-Hilal Transfer Offer - DECLINED",
    preview: "Thank you for the generous offer from Al-Hilal, but I must respectfully decline. This move doesn't align with my personal values and career aspirations.",
    content: `Dear Manager and Board,

    I hope this message finds you well. I wanted to personally respond to the transfer offer from Al-Hilal that was presented to my representatives yesterday.

    While I am incredibly honored by their interest and the substantial financial package they've offered (€120M transfer fee + €500k/week wages), I must respectfully decline this opportunity.

    This decision comes down to my core values and long-term vision:

    **Personal Values**: I've always been committed to playing in leagues where I can inspire young players from my community. The Premier League's global reach and diverse fanbase aligns with my mission to be a positive role model.

    **Sporting Ambition**: At 26, I'm entering my prime years. I want to test myself against the world's best week in, week out. The Champions League and Premier League provide that consistent elite-level competition that drives me.

    **Career Legacy**: Money isn't everything. I want to be remembered for what I achieved on the pitch, not just my salary. Building something special here at the club means more to me than any paycheck.

    **Family Considerations**: My family has built a life here. My children are settled in school, my wife loves the community we've become part of. Football is my profession, but family comes first.

    I know this might surprise some people - turning down that kind of money. But I've seen too many talented players chase quick riches and lose their edge. That's not the legacy I want to leave.

    I'm committed to giving everything for this club and helping us achieve our ambitious goals. Sometimes the best decision isn't the most profitable one.

    Thank you for understanding my position.

    Best regards,
    Marcus Rodriguez`,
    timestamp: "6 hours ago",
    isRead: true,
    isStarred: true,
    hasAttachments: false
  },
  {
    id: "3",
    from: "Kai Sterling",
    fromEmail: "k.sterling@chelseafc.com",
    avatar: "/people/starplayer.png",
    subject: "RE: Leeds United Offer - Thanks, but I'm staying put! 💙",
    preview: "Boss, Leeds offered 3x my wages and Champions League football, but honestly? I'd rather build something legendary with you here at Chelsea. This is just the beginning!",
    content: `Boss!

    Hope you're doing well! Had to drop you a quick message about this Leeds situation before the media gets hold of it.

    So... Leeds United came in with an absolutely mental offer yesterday. We're talking:
    • €200M transfer fee (apparently I'm worth more than Neymar now? 😅)
    • €800k per week wages (that's nearly 3x what I'm on here)
    • Guaranteed Champions League football
    • Captain's armband from day one
    • Their entire marketing budget built around me

    My agent was practically doing backflips. My accountant called it "generational wealth." Even my mum asked if I'd lost my mind for considering turning it down.

    But here's the thing...

    **You're my favorite manager I've ever worked with.** The way you've developed my game, trusted me in big moments, and actually listened to my ideas about tactics - I've never had that before. Remember when you let me suggest that inverted winger role last season? That changed everything for me.

    **This Chelsea project is just getting started.** We've gone from relegation candidates to European contenders in 18 months. I want to be part of writing that complete story, not jumping ship right when it gets exciting.

    **Leeds might be bigger historically**, but they're living in the past. We're building the future. Plus, have you seen their training ground? Our facilities here are literally 20 years ahead!

    **The team chemistry we've built is special.** You can't buy what we have in the dressing room. Half these lads have become my best mates. Why would I leave that for a bigger paycheck?

    I've already told my agent to politely decline. Leeds can keep their money - I want to lift the Premier League trophy wearing a Chelsea shirt, with you on the touchline celebrating.

    Let's make history together, Boss. This is our time.

    Your loyal star player (and biggest fan),
    Kai ⭐

    P.S. - The lads are planning a celebration dinner for turning down "stupid money." You're invited! 🍾`,
    timestamp: "Yesterday",
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