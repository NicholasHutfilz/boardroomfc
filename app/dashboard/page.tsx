"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { ProtectedRoute } from "@/components/protected-route"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IconMapPin, IconCloud, IconCalendar, IconNews, IconMicrophone, IconUsers } from "@tabler/icons-react"
import Image from "next/image"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

// Sample data for the income vs expenditure chart
const financeData = [
  { month: "Jul", income: 40.1, expenditure: 22.5 },
  { month: "Aug", income: 46.8, expenditure: 25.1 },
  { month: "Sep", income: 49.6, expenditure: 26.9 },
  { month: "Oct", income: 43.8, expenditure: 24.6 },
  { month: "Nov", income: 51.2, expenditure: 28.5 },
  { month: "Dec", income: 48.8, expenditure: 24.7 },
]

// Upcoming fixtures data
const upcomingFixtures = [
  { opponent: "Liverpool", home: false, date: "Dec 18", competition: "Premier League" },
  { opponent: "Everton", home: true, date: "Dec 22", competition: "Premier League" },
  { opponent: "Fulham", home: false, date: "Dec 26", competition: "Premier League" },
  { opponent: "Ipswich Town", home: true, date: "Dec 30", competition: "Premier League" },
  { opponent: "Crystal Palace", home: false, date: "Jan 4", competition: "Premier League" },
]

// Recent inbox items
const recentInboxItems = [
  {
    id: "1",
    from: "Phil Murphy",
    avatar: "/people/philmurphy.png",
    subject: "Brighton Tactical Shift - Mid-Season Analysis",
    timestamp: "2 hours ago",
    isRead: false
  },
  {
    id: "2", 
    from: "Marcus Rodriguez",
    avatar: "/people/playerrejectstransfer.png",
    subject: "RE: Al-Hilal Transfer Offer - Decision Made",
    timestamp: "Yesterday",
    isRead: false
  },
  {
    id: "3",
    from: "Kai Sterling", 
    avatar: "/people/starplayer.png",
    subject: "Leeds United Offer - Staying Put!",
    timestamp: "3 days ago",
    isRead: true
  }
]

export default function Page() {
  return (
    <ProtectedRoute>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="@container/main flex flex-1 flex-col gap-6 overflow-auto p-4 md:p-6">
              
              {/* Top Section - Two Columns */}
              <div className="grid gap-6 lg:grid-cols-2">
                
                {/* Upcoming Match */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconCalendar className="h-5 w-5" />
                      Next Match
                    </CardTitle>
                    <CardDescription>Matchday 16</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-center">
                      <Badge variant="secondary">
                        Premier League
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Image
                          src="/Chelsea_FC.png"
                          alt="Chelsea FC"
                          width={40}
                          height={40}
                          className="rounded-full flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-semibold truncate">Chelsea FC</div>
                          <div className="text-sm text-muted-foreground">Home</div>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-muted-foreground px-4 flex-shrink-0">VS</div>
                      <div className="flex items-center gap-3 min-w-0 flex-1 justify-end">
                        <div className="text-right min-w-0">
                          <div className="font-semibold truncate">Arsenal FC</div>
                          <div className="text-sm text-muted-foreground">Away</div>
                        </div>
                        <Image
                          src="/Arsenal_FC.png"
                          alt="Arsenal FC"
                          width={40}
                          height={40}
                          className="rounded-full flex-shrink-0"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <IconMapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">Stamford Bridge</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <IconCloud className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">16°C, Cloudy</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <IconCalendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">Dec 15, 3:00 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Fixtures */}
                <Card className="lg:col-span-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Upcoming Fixtures</CardTitle>
                    <CardDescription>Next 5 matches</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1">
                      {upcomingFixtures.map((fixture, index) => (
                        <div key={index} className="flex items-center justify-between py-1.5 border-b last:border-b-0">
                          <div className="flex items-center gap-2">
                            <Badge variant={fixture.home ? "default" : "outline"} className="text-xs w-6 h-5 justify-center">
                              {fixture.home ? "H" : "A"}
                            </Badge>
                            <span className="font-medium text-sm">{fixture.opponent}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-medium">{fixture.date}</div>
                            <div className="text-xs text-muted-foreground">{fixture.competition}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Bottom Section - Three Columns */}
              <div className="grid gap-6 lg:grid-cols-3">
                
                {/* Finance Glance */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Finance Overview</CardTitle>
                    <CardDescription>Income vs Expenditure (6 months)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={financeData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis 
                            dataKey="month" 
                            tickLine={false} 
                            axisLine={false}
                            className="text-xs"
                          />
                          <YAxis 
                            tickLine={false} 
                            axisLine={false}
                            className="text-xs"
                            tickFormatter={(value) => `£${value}M`}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="income" 
                            stroke="hsl(142, 76%, 36%)" 
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="expenditure" 
                            stroke="hsl(0, 84%, 60%)" 
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between text-sm mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        <span>Income</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Expenditure</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Inbox */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                    <CardDescription>Latest inbox activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentInboxItems.map((item) => (
                        <div key={item.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="relative">
                            <Avatar className="w-8 h-8 shrink-0">
                              <AvatarImage src={item.avatar} />
                              <AvatarFallback>{item.from.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            {!item.isRead && (
                              <div
                                className="absolute w-2 h-2 bg-primary rounded-full"
                                style={{
                                  bottom: "-2px",
                                  right: "-2px",
                                  border: "2px solid white"
                                }}
                              ></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-medium text-sm truncate">{item.from}</span>
                              <span className="text-xs text-muted-foreground shrink-0">{item.timestamp}</span>
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                              {item.subject}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Manager activities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <IconMicrophone className="h-4 w-4 mr-2" />
                      Hold Press Conference
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <IconNews className="h-4 w-4 mr-2" />
                      Read Newspapers
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <IconUsers className="h-4 w-4 mr-2" />
                      Meet with Chairman
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
