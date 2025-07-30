"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProtectedRoute } from "@/components/protected-route"
import { ArrowLeft, Send, Lock, Plus, Minus, ChevronLeft, ChevronRight, X, RotateCcw, UserX, Check } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  avatar: string
}

export default function InteractionsPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isThinking, setIsThinking] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState("")
  const [messageCounter, setMessageCounter] = useState(0)
  const hasInitialized = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Predefined responses for the player contract negotiation demo
  const agentResponses = [
    "Good morning! I'm here representing my client regarding his potential contract with your club. He's very interested in joining, but we need to discuss terms that reflect his market value and ambitions. What's your initial offer?",
  
    "That's a reasonable starting point, but we were hoping for something more competitive. My client has offers from other top clubs. Can we discuss the wage structure and any performance bonuses you might include?",
  
    "The wages are getting closer to what we had in mind. Now, let's talk about contract length and release clauses. My client wants security but also flexibility for future opportunities. What are your thoughts on a 4-year deal?",
  
    "Excellent! I think we have the framework for a deal that works for everyone. My client is excited about this opportunity and your ambitions for the club. Let's get the paperwork started!"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingText])

  // Initialize with agent's first message on component mount
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      setTimeout(() => {
        simulateAgentResponse(0)
      }, 1000)
    }
  }, [])

  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const simulateAgentResponse = async (responseIndex: number) => {
    if (responseIndex >= agentResponses.length) return

    // Show thinking animation
    setIsThinking(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsThinking(false)

    // Start streaming animation
    setIsStreaming(true)
    setStreamingText("")
    
    const response = agentResponses[responseIndex]
    const words = response.split(' ')
    
    for (let i = 0; i <= words.length; i++) {
      const currentText = words.slice(0, i).join(' ')
      setStreamingText(currentText)
      await new Promise(resolve => setTimeout(resolve, 80)) // Adjust speed here
    }

    // Add the complete message to the chat
    const newMessage = {
      id: Date.now(),
      sender: "Player Agent",
      content: response,
      timestamp: getCurrentTime(),
      avatar: "AG"
    }

    setMessages(prev => [...prev, newMessage])
    setIsStreaming(false)
    setStreamingText("")
    setMessageCounter(prev => prev + 1)
  }

  const handleSendMessage = async () => {
    if (message.trim() && !isThinking && !isStreaming) {
      // Add user message
      const userMessage = {
        id: Date.now(),
        sender: "You",
        content: message.trim(),
        timestamp: getCurrentTime(),
        avatar: "👤"
      }
      
      setMessages(prev => [...prev, userMessage])
      setMessage("")

      // Wait a moment, then simulate agent's response
      setTimeout(() => {
        simulateAgentResponse(messageCounter)
      }, 800)
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
          backgroundImage: "url('/tedlassolockerroom.webp')"
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
              Contract Negotiation
            </h1>
          </div>
          
          <div className="text-sm text-white/80">
            {getCurrentDateTime()}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="relative z-10 min-h-[calc(100vh-80px)] p-10">
          <div className="flex gap-4 h-[calc(100vh-160px)]">
            {/* Chat Interface - Left Side */}
            <Card className="w-[45%] bg-white/8 backdrop-blur-md border-white/15 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    AG
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-white">Player Agent</h3>
                  <p className="text-sm text-white/70">Represents Top Player</p>
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
                    {msg.sender === 'Player Agent' ? (
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        AG
                      </AvatarFallback>
                    ) : (
                      <AvatarFallback className={`text-sm ${
                        msg.sender === 'You' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}>
                        {msg.avatar}
                      </AvatarFallback>
                    )}
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

              {/* Thinking Animation */}
              {isThinking && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      AG
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex flex-col max-w-[80%] items-start">
                    <div className="rounded-lg p-3 bg-white/20 text-white mr-12">
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-white/70">Thinking</span>
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-white/70 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                          <div className="w-1 h-1 bg-white/70 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                          <div className="w-1 h-1 bg-white/70 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Streaming Animation */}
              {isStreaming && streamingText && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      AG
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex flex-col max-w-[80%] items-start">
                    <div className="rounded-lg p-3 bg-white/20 text-white mr-12">
                      <p className="text-sm">
                        {streamingText}
                        <span className="inline-block w-2 h-4 bg-white/70 ml-1 animate-pulse"></span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
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
                  disabled={isThinking || isStreaming}
                />
                <Button 
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-primary hover:bg-primary/90"
                  disabled={isThinking || isStreaming || !message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Contract Details Panel - Right Side */}
          <Card className="w-[55%] bg-white/8 backdrop-blur-md border-white/15 flex flex-col">
            {/* Contract Header */}
            <div className="p-3 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-white">Contract Offer</h3>
                  <p className="text-xs text-white/70">Current Terms</p>
                </div>
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs">
                  Use Existing Contract
                </Button>
              </div>
            </div>

            {/* Contract Terms */}
            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              {/* Core Terms */}
              <div className="space-y-2">
                {/* Wage */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-3 w-3 text-white/70" />
                    <span className="text-white/90 text-sm">Wage</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white">
                      <option>£180K p/w</option>
                      <option>£160K p/w</option>
                      <option>£200K p/w</option>
                    </select>
                    <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Loyalty Bonus */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-3 w-3 text-white/70" />
                    <span className="text-white/90 text-sm">Loyalty Bonus</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white">
                      <option>£2.7M</option>
                      <option>£2.5M</option>
                      <option>£3.0M</option>
                    </select>
                    <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Agent Fee */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-3 w-3 text-white/70" />
                    <span className="text-white/90 text-sm">Agent Fee</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white">
                      <option>£450K</option>
                      <option>£400K</option>
                      <option>£500K</option>
                    </select>
                    <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Contract Length */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-3 w-3 text-white/70" />
                    <span className="text-white/90 text-sm">Contract Length</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white">
                      <option>4 years (Jul 2024 - Jun 2028)</option>
                      <option>3 years (Jul 2024 - Jun 2027)</option>
                      <option>5 years (Jul 2024 - Jun 2029)</option>
                    </select>
                    <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <ChevronLeft className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bonuses & Clauses Section */}
              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-blue-400 font-medium text-sm">BONUSES & CLAUSES</h4>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs">
                      <Plus className="h-3 w-3 mr-1" />
                      Add Bonus
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs">
                      <Plus className="h-3 w-3 mr-1" />
                      Add Clause  
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  {/* Appearance Fee */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-3 w-3 text-white/70" />
                      <span className="text-white/90 text-sm">Appearance Fee</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white">
                        <option>£25.5K</option>
                        <option>£20K</option>
                        <option>£30K</option>
                      </select>
                      <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20">
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20">
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Goal Bonus */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-3 w-3 text-white/70" />
                      <span className="text-white/90 text-sm">Goal Bonus</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white">
                        <option>£15.25K</option>
                        <option>£10K</option>
                        <option>£20K</option>
                      </select>
                      <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20">
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20">
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Clean Sheet Bonus */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-3 w-3 text-white/70" />
                      <span className="text-white/90 text-sm">Clean Sheet Bonus</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white">
                        <option>£12.75K</option>
                        <option>£10K</option>
                        <option>£15K</option>
                      </select>
                      <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20">
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20">
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promises Section */}
              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-orange-400 font-medium text-sm">PROMISES</h4>
                  <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Promise
                  </Button>
                </div>

                <div className="space-y-2">
                  {/* Playing Time */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-3 w-3 text-white/70" />
                      <span className="text-white/90 text-sm">Expected Playing Time</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white">
                        <option>Important Player</option>
                        <option>Regular Starter</option>
                        <option>Rotation Player</option>
                        <option>Squad Player</option>
                      </select>
                    </div>
                  </div>

                  {/* Shirt Number */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-3 w-3 text-white/70" />
                      <span className="text-white/90 text-sm">Desired Shirt Number</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white">
                        <option>No. 10</option>
                        <option>No. 7</option>
                        <option>No. 11</option>
                        <option>Any Available</option>
                      </select>
                    </div>
                  </div>

                  {/* Transfer Policy */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-3 w-3 text-white/70" />
                      <span className="text-white/90 text-sm">Transfer Policy</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white">
                        <option>Will not be sold</option>
                        <option>Can leave for right offer</option>
                        <option>No promises made</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contract Actions */}
            <div className="p-3 border-t border-white/10">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs">
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs">
                  <UserX className="h-3 w-3 mr-1" />
                  Walk Away
                </Button>
                <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs" disabled>
                  <Check className="h-3 w-3 mr-1" />
                  Finalise Deal
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      </div>
    </ProtectedRoute>
  )
}