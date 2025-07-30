"use client"

import * as React from "react"
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface FinancialBreakdownTablesProps {
  type: "income" | "expenditure"
  detailed?: boolean
}

const incomeData = [
  { category: "Gate Receipts", amount: 4167153, percentage: 8.5, trend: "up" },
  { category: "Season Tickets", amount: 10574100, percentage: 21.6, trend: "up" },
  { category: "TV Revenue", amount: 7631986, percentage: 15.6, trend: "up" },
  { category: "Merchandising", amount: 4871443, percentage: 10.0, trend: "down" },
  { category: "Prize Money", amount: 16549068, percentage: 33.9, trend: "up" },
  { category: "Player Sales", amount: 0, percentage: 0, trend: "neutral" },
  { category: "Sponsorship", amount: 3200000, percentage: 6.6, trend: "up" },
  { category: "Other Income", amount: 1846680, percentage: 3.8, trend: "up" },
]

const expenditureData = [
  { category: "Player Wages", amount: 10030102, percentage: 40.6, trend: "up" },
  { category: "Bonuses", amount: 3066444, percentage: 12.4, trend: "down" },
  { category: "Loyalty Bonuses", amount: 1643260, percentage: 6.7, trend: "up" },
  { category: "Staff Wages", amount: 2331840, percentage: 9.4, trend: "up" },
  { category: "Non Football Costs", amount: 1366008, percentage: 5.5, trend: "down" },
  { category: "Director Emoluments", amount: 200000, percentage: 0.8, trend: "neutral" },
  { category: "Transfer Fees", amount: 5800000, percentage: 23.5, trend: "up" },
  { category: "Agent Fees", amount: 297738, percentage: 1.2, trend: "down" },
]

export function FinancialBreakdownTables({ type, detailed = false }: FinancialBreakdownTablesProps) {
  const data = type === "income" ? incomeData : expenditureData
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0)
  const isIncome = type === "income"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isIncome ? "Income This Month" : "Expenditure This Month"}
          <Badge variant="outline" className={isIncome ? "text-green-600" : "text-red-600"}>
            £{(totalAmount / 1000000).toFixed(1)}M
          </Badge>
        </CardTitle>
        <CardDescription>
          Breakdown by category for current reporting period
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              {detailed && <TableHead className="text-right">%</TableHead>}
              <TableHead className="text-right">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.category}>
                <TableCell className="font-medium">{item.category}</TableCell>
                <TableCell className="text-right font-mono">
                  £{item.amount.toLocaleString()}
                </TableCell>
                {detailed && (
                  <TableCell className="text-right text-muted-foreground">
                    {item.percentage.toFixed(1)}%
                  </TableCell>
                )}
                <TableCell className="text-right">
                  {item.trend === "up" && (
                    <Badge variant="outline" className="text-green-600">
                      <IconTrendingUp className="size-3" />
                    </Badge>
                  )}
                  {item.trend === "down" && (
                    <Badge variant="outline" className="text-red-600">
                      <IconTrendingDown className="size-3" />
                    </Badge>
                  )}
                  {item.trend === "neutral" && (
                    <Badge variant="outline" className="text-muted-foreground">
                      -
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="border-t-2 font-semibold">
              <TableCell>Total {isIncome ? "Income" : "Expenditure"}</TableCell>
              <TableCell className="text-right font-mono">
                £{totalAmount.toLocaleString()}
              </TableCell>
              {detailed && <TableCell className="text-right">100.0%</TableCell>}
              <TableCell className="text-right">
                <Badge variant="outline" className={isIncome ? "text-green-600" : "text-red-600"}>
                  <IconTrendingUp className="size-3" />
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        {detailed && (
          <div className="mt-6 space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Breakdown Analysis</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                {isIncome ? (
                  <>
                    <p>• Prize Money represents the largest income source (33.9%)</p>
                    <p>• Season Tickets showing strong growth (+21.6%)</p>
                    <p>• Gate Receipts trending upward with improved attendance</p>
                    <p>• No player sales recorded this period</p>
                  </>
                ) : (
                  <>
                    <p>• Player wages account for 40.6% of total expenditure</p>
                    <p>• Transfer activity increased significantly (+23.5%)</p>
                    <p>• Staff costs remain within budget parameters</p>
                    <p>• Agent fees showing positive reduction trends</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 