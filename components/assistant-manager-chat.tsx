"use client"

import { useState, useEffect, useRef } from "react"
import { Send, Search, FileText, Brain, Target, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  avatar: string
  tool?: "thinking" | "scouting-task" | "drafting-tactic"
}

interface ToolState {
  active: boolean
  progress: number
  description: string
}

export function AssistantManagerChat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isThinking, setIsThinking] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState("")
  const [messageCounter, setMessageCounter] = useState(0)
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [toolState, setToolState] = useState<ToolState>({ active: false, progress: 0, description: "" })
  const hasInitialized = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Assistant manager responses
  const assistantResponses = [
    "Hello Coach! I'm your assistant manager, ready to help with whatever you need. Whether it's analyzing our squad, preparing tactics, or managing scouting operations, I'm here to support your decisions. What would you like to work on today?",
    "Excellent point, Coach. Let me analyze our current squad situation and identify some key areas where we can improve. I'll also set up some scouting tasks to find players that fit our tactical system.",
    "I understand your tactical concerns. Let me draft a new formation that addresses those weaknesses while maximizing our players' strengths. I'll also prepare a detailed tactical briefing for the next match.",
    "That's a great strategic approach, Coach. I'll coordinate with our scouting network to identify players who match those criteria. I'll also analyze our upcoming fixtures to determine the best tactical approach for each match."
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingText])

  // Initialize with assistant's first message
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      setTimeout(() => {
        simulateAssistantResponse(0)
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

  const simulateToolUsage = async (toolType: "scouting-task" | "drafting-tactic") => {
    setActiveTool(toolType)
    setToolState({ active: true, progress: 0, description: getToolDescription(toolType) })

    // Simulate progress
    for (let i = 0; i <= 100; i += 5) {
      setToolState(prev => ({ ...prev, progress: i }))
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    await new Promise(resolve => setTimeout(resolve, 500))
    setActiveTool(null)
    setToolState({ active: false, progress: 0, description: "" })
  }

  const getToolDescription = (toolType: string) => {
    switch (toolType) {
      case "scouting-task":
        return "Creating comprehensive scouting assignments for our target positions..."
      case "drafting-tactic":
        return "Analyzing opponent weaknesses and drafting tactical adjustments..."
      default:
        return "Processing..."
    }
  }

  const getToolIcon = (toolType: string) => {
    switch (toolType) {
      case "scouting-task":
        return <Search className="h-4 w-4" />
      case "drafting-tactic":
        return <FileText className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const simulateAssistantResponse = async (responseIndex: number) => {
    if (responseIndex >= assistantResponses.length) return

    // Show thinking animation
    setIsThinking(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsThinking(false)

    // Randomly use tools for demo (skip for first message)
    if (responseIndex > 0) {
      const shouldUseTool = Math.random() > 0.3
      if (shouldUseTool) {
        const tools = ["scouting-task", "drafting-tactic"]
        const randomTool = tools[Math.floor(Math.random() * tools.length)] as "scouting-task" | "drafting-tactic"
        await simulateToolUsage(randomTool)
      }
    }

    // Start streaming animation
    setIsStreaming(true)
    setStreamingText("")
    
    const response = assistantResponses[responseIndex]
    const words = response.split(' ')
    
    for (let i = 0; i <= words.length; i++) {
      const currentText = words.slice(0, i).join(' ')
      setStreamingText(currentText)
      await new Promise(resolve => setTimeout(resolve, 80))
    }

    // Add the complete message to the chat
    const newMessage = {
      id: Date.now(),
      sender: "Assistant Manager",
      content: response,
      timestamp: getCurrentTime(),
      avatar: "AM"
    }

    setMessages(prev => [...prev, newMessage])
    setIsStreaming(false)
    setStreamingText("")
    setMessageCounter(prev => prev + 1)
  }

  const handleSendMessage = async () => {
    if (message.trim() && !isThinking && !isStreaming && !activeTool) {
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

      // Wait a moment, then simulate assistant's response
      setTimeout(() => {
        simulateAssistantResponse(messageCounter)
      }, 800)
    }
  }

  return (
    <Card className="h-[calc(100vh-200px)] flex flex-col bg-background border">
      {/* Chat Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Users className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Assistant Manager</h3>
            <p className="text-sm text-muted-foreground">Your tactical and operational support</p>
          </div>
          <div className="ml-auto">
            <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400">
              Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.sender === "You" ? "justify-end" : ""}`}>
            {msg.sender !== "You" && (
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {msg.avatar}
                </AvatarFallback>
              </Avatar>
            )}
            
            <div className={`flex flex-col max-w-[80%] ${msg.sender === "You" ? "items-end" : "items-start"}`}>
              <div className={`rounded-lg p-3 ${
                msg.sender === "You" 
                  ? "bg-primary text-primary-foreground ml-12" 
                  : "bg-muted mr-12"
              }`}>
                <p className="text-sm">{msg.content}</p>
              </div>
              <span className="text-xs text-muted-foreground mt-1">{msg.timestamp}</span>
            </div>

            {msg.sender === "You" && (
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-muted text-xs">
                  {msg.avatar}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {/* Thinking Animation */}
        {isThinking && (
          <div className="flex gap-3">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Brain className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            
            <div className="flex flex-col max-w-[80%] items-start">
              <div className="rounded-lg p-3 bg-muted mr-12">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tool Usage Animation */}
        {activeTool && (
          <div className="flex gap-3">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getToolIcon(activeTool)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex flex-col max-w-[80%] items-start">
              <div className="rounded-lg p-3 bg-muted border border-border mr-12 min-w-[300px]">
                <div className="flex items-center gap-2 mb-2">
                  {getToolIcon(activeTool)}
                  <span className="text-sm font-medium text-foreground">
                    {activeTool === "scouting-task" ? "Creating Scouting Task" : "Drafting New Tactic"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{toolState.description}</p>
                <Progress value={toolState.progress} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">{toolState.progress}% complete</div>
              </div>
            </div>
          </div>
        )}

        {/* Streaming Animation */}
        {isStreaming && streamingText && (
          <div className="flex gap-3">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground">
                AM
              </AvatarFallback>
            </Avatar>
            
            <div className="flex flex-col max-w-[80%] items-start">
              <div className="rounded-lg p-3 bg-muted mr-12">
                <p className="text-sm">
                  {streamingText}
                  <span className="inline-block w-2 h-4 bg-muted-foreground ml-1 animate-pulse"></span>
                </p>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Delegate tasks, ask for advice, or discuss tactics..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isThinking || isStreaming || !!activeTool}
          />
          <Button 
            onClick={handleSendMessage}
            size="icon"
            disabled={isThinking || isStreaming || !!activeTool || !message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}