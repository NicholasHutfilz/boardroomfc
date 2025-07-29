"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProtectedRoute } from "@/components/protected-route"
import { ArrowLeft, Send } from "lucide-react"
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
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Predefined Todd Boehly responses for the demo
  const toddResponses = [
    "Welcome! I'm Todd Boehly, Chairman of Chelsea FC. Thank you for applying for the Football Manager position. I've been looking forward to this interview. Tell me, what attracted you to Chelsea?",
    "Excellent! I like what I'm hearing. Now, let's talk tactics. How would you approach managing our current squad? We've made significant investments and I want to see results.",
    "That's the kind of thinking we need at Stamford Bridge. One more question - how do you handle pressure? The Premier League is unforgiving, and our fans expect nothing but the best.",
    "Outstanding answers! I'm impressed with your vision and approach. You clearly understand what Chelsea is about. We'll be in touch very soon with our decision. Thank you for your time today."
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingText])

  // Initialize with Todd's first message on component mount
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        simulateToddResponse(0)
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

  const simulateToddResponse = async (responseIndex: number) => {
    if (responseIndex >= toddResponses.length) return

    // Show thinking animation
    setIsThinking(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsThinking(false)

    // Start streaming animation
    setIsStreaming(true)
    setStreamingText("")
    
    const response = toddResponses[responseIndex]
    const words = response.split(' ')
    
    for (let i = 0; i <= words.length; i++) {
      const currentText = words.slice(0, i).join(' ')
      setStreamingText(currentText)
      await new Promise(resolve => setTimeout(resolve, 80)) // Adjust speed here
    }

    // Add the complete message to the chat
    const newMessage = {
      id: Date.now(),
      sender: "Todd Boehly",
      content: response,
      timestamp: getCurrentTime(),
      avatar: "/Todd_Boehly.jpg"
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

      // Wait a moment, then simulate Todd's response
      setTimeout(() => {
        simulateToddResponse(messageCounter)
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
              Job Interview
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
                  <AvatarImage src="/Todd_Boehly.jpg" alt="Todd Boehly" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    TB
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-white">Todd Boehly</h3>
                  <p className="text-sm text-white/70">Chairman, Chelsea FC</p>
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
                    {msg.sender === 'Todd Boehly' ? (
                      <>
                        <AvatarImage src="/Todd_Boehly.jpg" alt="Todd Boehly" />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          TB
                        </AvatarFallback>
                      </>
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
                    <AvatarImage src="/Todd_Boehly.jpg" alt="Todd Boehly" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      TB
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
                    <AvatarImage src="/Todd_Boehly.jpg" alt="Todd Boehly" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      TB
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
        </div>
      </div>
    </ProtectedRoute>
  )
}