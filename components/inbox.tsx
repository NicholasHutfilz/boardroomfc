"use client"

import * as React from "react"
import { 
  Inbox, 
  Star, 
  Archive, 
  Trash2, 
  Send, 
  Users, 
  Calendar, 
  Trophy, 
  Target, 
  PlusCircle,
  Reply,
  Forward,
  Paperclip,
  Search,
  Bell,
  Settings
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
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
    from: "Manager Analytics",
    fromEmail: "analytics@boardroomfc.com",
    avatar: "/placeholder.svg",
    subject: "Transfer window review - January targets",
    preview: "Latest scouting reports for January transfer window. Key targets identified in midfield and defense positions.",
    content: "Our scouting team has compiled comprehensive reports on potential January signings. The analysis shows strong candidates for our midfield reinforcement needs.",
    timestamp: "Jan 15",
    isRead: false,
    isStarred: true,
    hasAttachments: true,
    attachments: [
      { name: "transfer_targets.pdf", size: "2.1 MB", type: "pdf" },
      { name: "budget_analysis.xlsx", size: "891 KB", type: "excel" }
    ],
    participants: [
      { name: "All", avatar: "/placeholder.svg" },
      { name: "Alex", avatar: "/placeholder.svg" },
      { name: "Sarah", avatar: "/placeholder.svg" }
    ]
  },
  {
    id: "2",
    from: "Team Performance",
    fromEmail: "performance@boardroomfc.com", 
    avatar: "/placeholder.svg",
    subject: "Weekly training data - Player fitness metrics",
    preview: "Comprehensive fitness analysis from last week's training sessions. Notable improvements in stamina and speed metrics.",
    content: "This week's training data shows significant improvements across the squad. Particularly impressive gains in cardiovascular fitness and sprint speeds.",
    timestamp: "Jan 14",
    isRead: true,
    isStarred: false,
    hasAttachments: true,
    attachments: [
      { name: "fitness_report.pdf", size: "1.5 MB", type: "pdf" }
    ]
  },
  {
    id: "3",
    from: "Match Analysis",
    fromEmail: "analysis@boardroomfc.com",
    avatar: "/placeholder.svg", 
    subject: "Post-match report: vs Manchester City",
    preview: "Detailed tactical analysis of yesterday's match. Key areas for improvement identified in defensive transitions.",
    content: "Yesterday's match provided valuable insights into our tactical setup. While we showed improvement in possession play, defensive transitions need attention.",
    timestamp: "Jan 13",
    isRead: true,
    isStarred: true,
    hasAttachments: false
  },
  {
    id: "4",
    from: "Youth Academy",
    fromEmail: "academy@boardroomfc.com",
    avatar: "/placeholder.svg",
    subject: "Promotion candidates - U21 to first team",
    preview: "Three academy players showing exceptional development. Recommendation for first team integration.",
    content: "Our youth development program has produced three standout performers ready for first team consideration. Detailed assessment reports attached.",
    timestamp: "Jan 12", 
    isRead: false,
    isStarred: false,
    hasAttachments: true,
    attachments: [
      { name: "academy_report.pdf", size: "3.2 MB", type: "pdf" },
      { name: "player_videos.zip", size: "125 MB", type: "zip" }
    ]
  },
  {
    id: "5",
    from: "Financial Controller",
    fromEmail: "finance@boardroomfc.com",
    avatar: "/placeholder.svg",
    subject: "Q1 Budget review - Transfer funds allocation",
    preview: "Quarterly financial review complete. Transfer budget confirmed for remaining season activities.",
    content: "Financial review shows healthy position for January activities. Full budget breakdown and recommendations provided.",
    timestamp: "Jan 11",
    isRead: true,
    isStarred: false,
    hasAttachments: true,
    attachments: [
      { name: "q1_budget.pdf", size: "1.8 MB", type: "pdf" }
    ]
  }
]

const sidebarItems = [
  { icon: Inbox, label: "Inbox", count: 23, active: true },
  { icon: Star, label: "Starred", count: 8 },
  { icon: Send, label: "Sent", count: 156 },
  { icon: Archive, label: "Archive", count: 2847 },
  { icon: Trash2, label: "Trash", count: 12 }
]

const categories = [
  { icon: Users, label: "Team Management", count: 12 },
  { icon: Trophy, label: "Match Reports", count: 8 },
  { icon: Target, label: "Scouting", count: 15 },
  { icon: Calendar, label: "Fixtures", count: 6 }
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
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-sidebar/50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Inbox className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">BoardRoom FC</span>
          </div>
          <Button className="w-full" size="sm">
            <PlusCircle className="w-4 h-4 mr-2" />
            Compose
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b">
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

        {/* Main folders */}
        <div className="flex-1 overflow-auto">
          <div className="p-2">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  item.active 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.count > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {item.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>

          <Separator className="mx-4 my-2" />

          {/* Categories */}
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Categories
            </div>
            {categories.map((category) => (
              <button
                key={category.label}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-sidebar-accent/50 transition-colors"
              >
                <category.icon className="w-4 h-4" />
                <span className="flex-1 text-left">{category.label}</span>
                {category.count > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {category.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="p-4 border-t">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-sidebar-accent/50 transition-colors">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 flex">
        <div className="w-96 border-r bg-card/50 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">Inbox</h2>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  <Bell className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredMessages.filter(m => !m.isRead).length} unread messages
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
                <Inbox className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a message to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}