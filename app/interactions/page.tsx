"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/protected-route"
import { ArrowLeft, Users, UserCheck, Play } from "lucide-react"
import Link from "next/link"

export default function InteractionsPage() {
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
              Interactions Demo
            </h1>
          </div>
          
          <div className="text-sm text-white/80">
            {getCurrentDateTime()}
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-8">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Choose Your Demo
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Experience different types of AI-powered conversations in our football management simulation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Job Interview Demo */}
              <Link href="/interactions/job-interview">
                <Card className="group bg-white/10 backdrop-blur-md border-white/20 p-8 cursor-pointer hover:bg-white/15 transition-all duration-300 h-full">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                      <UserCheck className="h-10 w-10 text-blue-400" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        Job Interview
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        Participate in a realistic job interview with Chelsea FC Chairman Todd Boehly. 
                        Experience an authentic football manager interview with strategic questions about tactics, 
                        squad management, and handling pressure.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors">
                      <Play className="h-4 w-4" />
                      <span className="font-medium">Start Interview</span>
                    </div>
                  </div>
                </Card>
              </Link>

              {/* Player Contract Negotiation Demo */}
              <Link href="/interactions/player-contract-negotiation">
                <Card className="group bg-white/10 backdrop-blur-md border-white/20 p-8 cursor-pointer hover:bg-white/15 transition-all duration-300 h-full">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center group-hover:bg-green-600/30 transition-colors">
                      <Users className="h-10 w-10 text-green-400" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        Player Contract Negotiation
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        Navigate complex contract negotiations with a top player and their agent. 
                        Discuss wages, contract length, performance bonuses, and other critical terms 
                        to secure your target signing.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-green-400 group-hover:text-green-300 transition-colors">
                      <Play className="h-4 w-4" />
                      <span className="font-medium">Start Negotiation</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>

            <div className="text-center mt-12">
              <p className="text-white/60 text-sm">
                Both demos feature realistic AI-powered conversations with streaming responses and thinking animations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}