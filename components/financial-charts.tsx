"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, Line, LineChart, ResponsiveContainer } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

// Financial data for the last 12 months
const profitLossData = [
  { month: "Jan 2024", profit: 15200000, income: 44778217, expenditure: 24735392 },
  { month: "Feb 2024", profit: 18500000, income: 42890345, expenditure: 26890123 },
  { month: "Mar 2024", profit: 22100000, income: 48945621, expenditure: 28234567 },
  { month: "Apr 2024", profit: 19800000, income: 45632189, expenditure: 25987432 },
  { month: "May 2024", profit: 21300000, income: 47891234, expenditure: 24623145 },
  { month: "Jun 2024", profit: 25600000, income: 52145789, expenditure: 27891456 },
  { month: "Jul 2024", profit: 16900000, income: 40123456, expenditure: 22456789 },
  { month: "Aug 2024", profit: 20500000, income: 46789123, expenditure: 25123467 },
  { month: "Sep 2024", profit: 23200000, income: 49567890, expenditure: 26891234 },
  { month: "Oct 2024", profit: 18700000, income: 43789012, expenditure: 24567123 },
  { month: "Nov 2024", profit: 24100000, income: 51234567, expenditure: 28456789 },
  { month: "Dec 2024", profit: 20042825, income: 48840430, expenditure: 24735392 },
]

const chartConfig = {
  profit: {
    label: "Profit/Loss",
    color: "var(--primary)",
  },
  income: {
    label: "Income",
    color: "hsl(142, 76%, 36%)",
  },
  expenditure: {
    label: "Expenditure",
    color: "hsl(0, 84%, 60%)",
  },
} satisfies ChartConfig

export function FinancialCharts() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("12m")
  const [chartType, setChartType] = React.useState("profit")

  const filteredData = React.useMemo(() => {
    let months = 12
    if (timeRange === "6m") months = 6
    if (timeRange === "3m") months = 3
    return profitLossData.slice(-months)
  }, [timeRange])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Profit/Loss Chart */}
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Profit & Loss Trend</CardTitle>
          <CardDescription>
            Monthly profit/loss for the last {timeRange === "12m" ? "12" : timeRange === "6m" ? "6" : "3"} months
          </CardDescription>
          <CardAction>
            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={setTimeRange}
              variant="outline"
              className="hidden *:data-[slot=toggle-group-item]:!px-3 @[400px]/card:flex"
            >
              <ToggleGroupItem value="12m">12M</ToggleGroupItem>
              <ToggleGroupItem value="6m">6M</ToggleGroupItem>
              <ToggleGroupItem value="3m">3M</ToggleGroupItem>
            </ToggleGroup>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="flex w-24 @[400px]/card:hidden"
                size="sm"
                aria-label="Select timeframe"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12m">12M</SelectItem>
                <SelectItem value="6m">6M</SelectItem>
                <SelectItem value="3m">3M</SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-profit)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-profit)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.split(" ")[0]}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => value}
                    formatter={(value, name) => [
                      `£${(Number(value) / 1000000).toFixed(1)}M`,
                      name
                    ]}
                  />
                }
              />
              <Area
                dataKey="profit"
                type="monotone"
                fill="url(#fillProfit)"
                stroke="var(--color-profit)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Income vs Expenditure Chart */}
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Income vs Expenditure</CardTitle>
          <CardDescription>
            Monthly breakdown of income and spending
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.split(" ")[0]}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => value}
                    formatter={(value, name) => [
                      `£${(Number(value) / 1000000).toFixed(1)}M`,
                      name
                    ]}
                  />
                }
              />
              <Line
                dataKey="income"
                type="monotone"
                stroke="var(--color-income)"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                dataKey="expenditure"
                type="monotone"
                stroke="var(--color-expenditure)"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
} 