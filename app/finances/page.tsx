import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { FinancialOverviewCards } from "@/components/financial-overview-cards"
import { FinancialCharts } from "@/components/financial-charts"
import { FinancialBreakdownTables } from "@/components/financial-breakdown-tables"
import { BudgetManagement } from "@/components/budget-management"
import { FinancialFairPlayProgress } from "@/components/financial-fair-play-progress"
import { SiteHeader } from "@/components/site-header"
import { ProtectedRoute } from "@/components/protected-route"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { IconDatabase } from "@tabler/icons-react"
import Image from "next/image"

export default function FinancesPage() {
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
            <div className="@container/main flex flex-1 flex-col gap-2 overflow-auto">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <FinancialOverviewCards />
                
                <Tabs defaultValue="summary" className="w-full px-4 lg:px-6">
                  <TabsList className="grid w-full grid-cols-5 mb-2">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="income">Income</TabsTrigger>
                    <TabsTrigger value="expenditure">Expenditure</TabsTrigger>
                    <TabsTrigger value="budgets">Budgets</TabsTrigger>
                    <TabsTrigger value="compliance">FFP</TabsTrigger>
                  </TabsList>
                  
                  {/* Export Tools */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b">
                    <span className="text-sm font-medium text-muted-foreground">Tools</span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8">
                        <Image 
                          src="/logos/googlesheets.png" 
                          alt="Google Sheets" 
                          width={16} 
                          height={16}
                          className="mr-2"
                        />
                        Export to Google Sheets
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        <Image 
                          src="/logos/excellogo.png" 
                          alt="Excel" 
                          width={16} 
                          height={16}
                          className="mr-2"
                        />
                        Export to Excel
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        <Image 
                          src="/logos/quickbookslogo.png" 
                          alt="QuickBooks" 
                          width={16} 
                          height={16}
                          className="mr-2"
                        />
                        Export to QuickBooks
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        <IconDatabase className="size-4 mr-2" />
                        Export Raw Data (SQL)
                      </Button>
                    </div>
                  </div>
                  
                  <TabsContent value="summary" className="mt-4">
                    <div className="grid gap-6">
                      <FinancialCharts />
                      <div className="grid gap-6 lg:grid-cols-2">
                        <FinancialBreakdownTables type="income" />
                        <FinancialBreakdownTables type="expenditure" />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="income" className="mt-4">
                    <FinancialBreakdownTables type="income" detailed={true} />
                  </TabsContent>
                  
                  <TabsContent value="expenditure" className="mt-4">
                    <FinancialBreakdownTables type="expenditure" detailed={true} />
                  </TabsContent>
                  
                  <TabsContent value="budgets" className="mt-4">
                    <BudgetManagement />
                  </TabsContent>
                  
                  <TabsContent value="compliance" className="mt-4">
                    <FinancialFairPlayProgress />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
} 