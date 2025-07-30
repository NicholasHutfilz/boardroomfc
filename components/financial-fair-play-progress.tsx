"use client"

import * as React from "react"
import { IconShield, IconCheck, IconAlertTriangle, IconCalendar, IconTrendingUp } from "@tabler/icons-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const ffpData = {
  siLeague: {
    name: "League 24/25",
    status: "compliant",
    description: "The club is on course to pass League FFP regulations for the current period.",
    progress: 95,
  },
  siCup: {
    name: "Cup 2024/25", 
    status: "compliant",
    description: "The club is on course to pass Cup FFP regulations for the current period.",
    progress: 92,
  },
  // Additional compliance metrics
  breakEvenTest: {
    currentPeriod: 28450000,
    allowableDeviation: 30000000,
    compliance: "pass",
    nextAssessment: "June 2025",
  },
  squadCostRule: {
    currentCost: 185000000,
    limit: 200000000,
    compliance: "pass",
    utilizationPercent: 92.5,
  },
}

const complianceHistory = [
  { period: "2020/21", league: "Pass", cup: "Pass", status: "compliant" },
  { period: "2021/22", league: "Pass", cup: "Pass", status: "compliant" },
  { period: "2022/23", league: "Pass", cup: "Pass", status: "compliant" },
  { period: "2023/24", league: "Projected Pass", cup: "Projected Pass", status: "on-track" },
  { period: "2024/25", league: "Monitoring", cup: "Monitoring", status: "monitoring" },
]

export function FinancialFairPlayProgress() {
  return (
    <div className="grid gap-6">
      {/* Current FFP Status */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <IconShield className="size-5" />
              SI League 2023/24
            </CardTitle>
            <CardDescription>
              Financial Fair Play compliance status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Compliance Progress</span>
                <Badge variant="outline" className="text-green-600">
                  <IconCheck className="size-3" />
                  On Track
                </Badge>
              </div>
              <Progress value={ffpData.siLeague.progress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {ffpData.siLeague.description}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <IconShield className="size-5" />
              SI Cup 2023/24
            </CardTitle>
            <CardDescription>
              Cup competition FFP requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Compliance Progress</span>
                <Badge variant="outline" className="text-green-600">
                  <IconCheck className="size-3" />
                  On Track
                </Badge>
              </div>
              <Progress value={ffpData.siCup.progress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {ffpData.siCup.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Compliance Metrics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Break-Even Test</CardTitle>
            <CardDescription>
              Three-year rolling assessment period compliance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Current Period Result</span>
                <span className="text-sm font-mono text-green-600">+£{ffpData.breakEvenTest.currentPeriod.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Allowable Deviation</span>
                <span className="text-sm font-mono">£{ffpData.breakEvenTest.allowableDeviation.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Next Assessment</span>
                <span className="text-sm">{ffpData.breakEvenTest.nextAssessment}</span>
              </div>
            </div>

            <div className="border rounded-lg p-3 bg-green-50 dark:bg-green-950/20">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <IconCheck className="size-4" />
                <span className="text-sm font-medium">Compliant</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                Club is well within allowable parameters
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Squad Cost Rule</CardTitle>
            <CardDescription>
              Annual squad cost monitoring and limits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Current Squad Cost</span>
                <span className="text-sm font-mono">£{ffpData.squadCostRule.currentCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Annual Limit</span>
                <span className="text-sm font-mono">£{ffpData.squadCostRule.limit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Utilization</span>
                <span className="text-sm font-mono">{ffpData.squadCostRule.utilizationPercent}%</span>
              </div>
            </div>

            <Progress value={ffpData.squadCostRule.utilizationPercent} className="h-2" />

            <div className="border rounded-lg p-3 bg-orange-50 dark:bg-orange-950/20">
              <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                <IconAlertTriangle className="size-4" />
                <span className="text-sm font-medium">Monitor Closely</span>
              </div>
              <p className="text-sm text-orange-600 dark:text-orange-500 mt-1">
                Approaching threshold - careful planning required
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconCalendar className="size-5" />
            FFP Compliance History
          </CardTitle>
          <CardDescription>
            Historical compliance record across all competitions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>League Compliance</TableHead>
                <TableHead>Cup Compliance</TableHead>
                <TableHead>Overall Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceHistory.map((record) => (
                <TableRow key={record.period}>
                  <TableCell className="font-medium">{record.period}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={record.league.includes("Pass") ? "text-green-600" : "text-orange-600"}
                    >
                      {record.league}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={record.cup.includes("Pass") ? "text-green-600" : "text-orange-600"}
                    >
                      {record.cup}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        record.status === "compliant" 
                          ? "text-green-600" 
                          : record.status === "on-track" 
                          ? "text-blue-600" 
                          : "text-orange-600"
                      }
                    >
                      {record.status === "compliant" && <IconCheck className="size-3" />}
                      {record.status === "on-track" && <IconTrendingUp className="size-3" />}
                      {record.status === "monitoring" && <IconAlertTriangle className="size-3" />}
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1).replace("-", " ")}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Key Regulations Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Key FFP Regulations</CardTitle>
          <CardDescription>
            Understanding the financial rules and requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Break-Even Requirement</h4>
              <p className="text-sm text-muted-foreground">
                Clubs must not exceed a total deficit of £30 million over any three-year period, 
                with allowable deviations for youth development and infrastructure investments.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Squad Cost Rule</h4>
              <p className="text-sm text-muted-foreground">
                Annual squad costs (wages, amortization, agent fees) cannot exceed £200 million 
                per season without specific revenue justifications.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Transfer Spending Limits</h4>
              <p className="text-sm text-muted-foreground">
                Net transfer spending is limited to percentage of revenue, with additional 
                restrictions during assessment periods.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Monitoring Periods</h4>
              <p className="text-sm text-muted-foreground">
                Assessment occurs annually with three-year rolling calculations. 
                Sanctions apply for repeated violations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 