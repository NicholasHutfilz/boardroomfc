"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProtectedRoute } from "@/components/protected-route"
import { ArrowLeft, Send } from "lucide-react"
import { useState } from "react"

export default function InteractionsPage() {
  const [message, setMessage] = useState("")
  
  // Mock conversation data
  const messages = [
    {
      id: 1,
      sender: "AI",
      content: "Hello! I'm here to help you with any football management questions you might have. What would you like to discuss?",
      timestamp: "10:30 AM",
      avatar: "🤖"
    },
    {
      id: 2,
      sender: "You",
      content: "I'm having trouble deciding on my starting lineup for this weekend's match. Can you help me analyze my squad?",
      timestamp: "10:32 AM",
      avatar: "👤"
    },
    {
      id: 3,
      sender: "AI",
      content: "Absolutely! I'd be happy to help you with your lineup decisions. Let me analyze your current squad and recent player performances. What formation are you considering?",
      timestamp: "10:32 AM",
      avatar: "🤖"
    },
    {
      id: 4,
      sender: "You",
      content: "I was thinking about switching to a 4-3-3 formation. My striker has been in great form lately.",
      timestamp: "10:35 AM",
      avatar: "👤"
    },
    {
      id: 5,
      sender: "AI",
      content: "Excellent choice! The 4-3-3 is a versatile formation that can provide good attacking width while maintaining defensive stability. With your striker in form, this formation will give him the support he needs. Let's look at your midfield options to complement this setup.",
      timestamp: "10:36 AM",
      avatar: "🤖"
    }
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message logic here
      setMessage("")
    }
  }

  const getCurrentDateTime = () => {
    const now = new Date()
    return now.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <ProtectedRoute>
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: "url('/firstframe.png')"
        }}
      >
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Custom Navbar */}
        <div className="relative z-10 flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white">
              Football Strategy Advisor
            </h1>
          </div>
          
          <div className="text-sm text-white/80">
            {getCurrentDateTime()}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
          <Card className="w-full max-w-2xl h-[600px] bg-white/10 backdrop-blur-md border-white/20 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    🤖
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-white">AI Assistant</h3>
                  <p className="text-sm text-white/70">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'You' ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className={`text-sm ${
                      msg.sender === 'You' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}>
                      {msg.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`flex flex-col max-w-[80%] ${
                    msg.sender === 'You' ? 'items-end' : 'items-start'
                  }`}>
                    <div className={`rounded-lg p-3 ${
                      msg.sender === 'You' 
                        ? 'bg-primary text-primary-foreground ml-12' 
                        : 'bg-white/20 text-white mr-12'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    <span className="text-xs text-white/60 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                />
                <Button 
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}