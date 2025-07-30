"use client"

import * as React from "react"
import { IconTarget, IconUsers, IconCreditCard, IconTrendingUp, IconTrendingDown, IconSettings } from "@tabler/icons-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const budgetData = {
  transfer: {
    total: 35800000,
    spent: 10200000,
    committed: 5800000,
    available: 19800000,
    nextSeason: 42000000,
  },
  wages: {
    total: 780309648,
    current: 109300000,
    nextSeasonMin: 118000000,
    available: 671009648,
    utilizationPercent: 87.2,
  },
  scouting: {
    total: 2500000,
    spent: 850000,
    available: 1650000,
  },
  youth: {
    total: 8000000,
    spent: 3200000,
    available: 4800000,
  },
}

export function BudgetManagement() {
  return (
    <div className="grid gap-6">
      {/* Budget Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <IconCreditCard className="size-4" />
              Transfer Budget
            </CardDescription>
            <CardTitle className="text-2xl">£{(budgetData.transfer.available / 1000000).toFixed(1)}M</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress 
              value={(budgetData.transfer.spent / budgetData.transfer.total) * 100} 
              className="mb-2" 
            />
            <div className="text-sm text-muted-foreground">
              £{(budgetData.transfer.spent / 1000000).toFixed(1)}M spent of £{(budgetData.transfer.total / 1000000).toFixed(1)}M
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <IconUsers className="size-4" />
              Wage Budget
            </CardDescription>
            <CardTitle className="text-2xl">{budgetData.wages.utilizationPercent}%</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress 
              value={budgetData.wages.utilizationPercent} 
              className="mb-2" 
            />
            <div className="text-sm text-muted-foreground">
              £{(budgetData.wages.current / 1000000).toFixed(1)}M p/a utilized
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <IconTarget className="size-4" />
              Scouting Budget
            </CardDescription>
            <CardTitle className="text-2xl">£{(budgetData.scouting.available / 1000).toFixed(0)}K</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress 
              value={(budgetData.scouting.spent / budgetData.scouting.total) * 100} 
              className="mb-2" 
            />
            <div className="text-sm text-muted-foreground">
              £{(budgetData.scouting.spent / 1000).toFixed(0)}K of £{(budgetData.scouting.total / 1000).toFixed(0)}K used
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <IconUsers className="size-4" />
              Youth Development
            </CardDescription>
            <CardTitle className="text-2xl">£{(budgetData.youth.available / 1000000).toFixed(1)}M</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress 
              value={(budgetData.youth.spent / budgetData.youth.total) * 100} 
              className="mb-2" 
            />
            <div className="text-sm text-muted-foreground">
              £{(budgetData.youth.spent / 1000000).toFixed(1)}M of £{(budgetData.youth.total / 1000000).toFixed(1)}M allocated
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Budget Management */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Transfer Budget Details
              <Button variant="outline" size="sm">
                <IconSettings className="size-4" />
                Adjust Budget
              </Button>
            </CardTitle>
            <CardDescription>
              Manage transfer spending and allocation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Total Budget</span>
                <span className="text-sm font-mono">£{budgetData.transfer.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Spent (Completed)</span>
                <span className="text-sm font-mono text-red-600">-£{budgetData.transfer.spent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Committed (Pending)</span>
                <span className="text-sm font-mono text-orange-600">-£{budgetData.transfer.committed.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-sm">Available</span>
                  <span className="text-sm font-mono text-green-600">£{budgetData.transfer.available.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-3 bg-muted/50">
              <div className="text-sm font-medium mb-2">Next Season Projection</div>
              <div className="flex justify-between text-sm">
                <span>Projected Budget</span>
                <span className="font-mono">£{budgetData.transfer.nextSeason.toLocaleString()}</span>
              </div>
              <Badge variant="outline" className="mt-2 text-green-600">
                <IconTrendingUp className="size-3" />
                +17.3% increase projected
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Wage Budget Management
              <Button variant="outline" size="sm">
                <IconSettings className="size-4" />
                Request Increase
              </Button>
            </CardTitle>
            <CardDescription>
              Current wage expenditure and projections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Total Budget</span>
                <span className="text-sm font-mono">£{budgetData.wages.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Current Utilization</span>
                <span className="text-sm font-mono">£{budgetData.wages.current.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Utilization Rate</span>
                <span className="text-sm font-mono">{budgetData.wages.utilizationPercent}%</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-sm">Available</span>
                  <span className="text-sm font-mono text-green-600">£{budgetData.wages.available.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-3 bg-muted/50">
              <div className="text-sm font-medium mb-2">Contract Commitments</div>
              <div className="flex justify-between text-sm">
                <span>Next Season Minimum</span>
                <span className="font-mono">£{budgetData.wages.nextSeasonMin.toLocaleString()}</span>
              </div>
              <Badge variant="outline" className="mt-2 text-orange-600">
                <IconTrendingUp className="size-3" />
                +8.0% committed increase
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Adjustment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Adjustment Request</CardTitle>
          <CardDescription>
            Submit a request to the board for budget modifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="budget-type">Budget Category</Label>
                <Select>
                  <SelectTrigger id="budget-type">
                    <SelectValue placeholder="Select budget type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transfer">Transfer Budget</SelectItem>
                    <SelectItem value="wages">Wage Budget</SelectItem>
                    <SelectItem value="scouting">Scouting Budget</SelectItem>
                    <SelectItem value="youth">Youth Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="adjustment-amount">Adjustment Amount (£)</Label>
                <Input 
                  id="adjustment-amount" 
                  type="number" 
                  placeholder="5000000"
                  className="font-mono"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="justification">Justification</Label>
              <Input 
                id="justification" 
                placeholder="Describe the reason for this budget adjustment..."
              />
            </div>
            <Button className="w-full">Submit Budget Request</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 