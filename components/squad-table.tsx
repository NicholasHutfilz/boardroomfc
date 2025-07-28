"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconLayoutColumns,
  IconFilter,
  IconSearch,
} from "@tabler/icons-react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Player {
  id: string
  name: string
  position: string
  positionGroup: string
  age: number
  nationality: string
  currentAbility: number
  potentialAbility: number
  value: string
  wage: string
  contract: string
  morale: string
  condition: number
  ability: string
  // Technical attributes
  corners: number
  crossing: number
  dribbling: number
  finishing: number
  firstTouch: number
  freeKicks: number
  heading: number
  longShots: number
  longThrows: number
  marking: number
  passing: number
  penaltyTaking: number
  tackling: number
  technique: number
  // Mental attributes
  aggression: number
  anticipation: number
  bravery: number
  composure: number
  concentration: number
  decisions: number
  determination: number
  flair: number
  leadership: number
  offTheBall: number
  positioning: number
  teamwork: number
  vision: number
  workRate: number
  // Physical attributes
  acceleration: number
  agility: number
  balance: number
  jumpingReach: number
  naturalFitness: number
  pace: number
  stamina: number
  strength: number
}

// Mock data - in a real app this would come from your database
const mockPlayers: Player[] = [
  {
    id: "1",
    name: "Michael Zetterer",
    position: "GK",
    positionGroup: "Goalkeeper",
    age: 26,
    nationality: "GER",
    currentAbility: 140,
    potentialAbility: 150,
    value: "€104,000",
    wage: "€5,500",
    contract: "2025",
    morale: "Excellent",
    condition: 95,
    ability: "Very Good",
    corners: 7, crossing: 5, dribbling: 8, finishing: 4, firstTouch: 10, freeKicks: 7,
    heading: 13, longShots: 4, longThrows: 8, marking: 5, passing: 11, penaltyTaking: 7,
    tackling: 5, technique: 12, aggression: 14, anticipation: 15, bravery: 13,
    composure: 12, concentration: 10, decisions: 12, determination: 15, flair: 10,
    leadership: 6, offTheBall: 5, positioning: 14, teamwork: 14, vision: 10,
    workRate: 15, acceleration: 12, agility: 15, balance: 12, jumpingReach: 9,
    naturalFitness: 13, pace: 11, stamina: 14, strength: 15
  },
  {
    id: "2",
    name: "Mitchell Weiser",
    position: "DR",
    positionGroup: "Defender",
    age: 27,
    nationality: "GER",
    currentAbility: 145,
    potentialAbility: 145,
    value: "€1,500,000",
    wage: "€8,500",
    contract: "2024",
    morale: "Excellent",
    condition: 89,
    ability: "Good",
    corners: 11, crossing: 16, dribbling: 12, finishing: 8, firstTouch: 13, freeKicks: 9,
    heading: 11, longShots: 9, longThrows: 11, marking: 14, passing: 13, penaltyTaking: 5,
    tackling: 14, technique: 12, aggression: 14, anticipation: 15, bravery: 13,
    composure: 12, concentration: 14, decisions: 13, determination: 15, flair: 10,
    leadership: 12, offTheBall: 13, positioning: 14, teamwork: 15, vision: 12,
    workRate: 16, acceleration: 13, agility: 14, balance: 13, jumpingReach: 11,
    naturalFitness: 15, pace: 14, stamina: 15, strength: 12
  },
  {
    id: "3",
    name: "Niklas Moisander",
    position: "DCR",
    positionGroup: "Defender",
    age: 32,
    nationality: "FIN",
    currentAbility: 155,
    potentialAbility: 155,
    value: "€500,000",
    wage: "€12,000",
    contract: "2023",
    morale: "Excellent",
    condition: 92,
    ability: "Good",
    corners: 7, crossing: 8, dribbling: 9, finishing: 6, firstTouch: 12, freeKicks: 8,
    heading: 15, longShots: 7, longThrows: 12, marking: 16, passing: 13, penaltyTaking: 5,
    tackling: 15, technique: 11, aggression: 15, anticipation: 16, bravery: 17,
    composure: 15, concentration: 16, decisions: 16, determination: 16, flair: 8,
    leadership: 17, offTheBall: 9, positioning: 16, teamwork: 15, vision: 12,
    workRate: 14, acceleration: 10, agility: 11, balance: 12, jumpingReach: 14,
    naturalFitness: 13, pace: 9, stamina: 13, strength: 15
  },
  {
    id: "4",
    name: "Ömer Toprak",
    position: "DCL",
    positionGroup: "Defender",
    age: 32,
    nationality: "TUR",
    currentAbility: 160,
    potentialAbility: 160,
    value: "€2,275,000",
    wage: "€18,000",
    contract: "2024",
    morale: "Very Good",
    condition: 88,
    ability: "Very Good",
    corners: 8, crossing: 7, dribbling: 10, finishing: 6, firstTouch: 13, freeKicks: 9,
    heading: 16, longShots: 8, longThrows: 13, marking: 16, passing: 14, penaltyTaking: 6,
    tackling: 16, technique: 12, aggression: 15, anticipation: 16, bravery: 16,
    composure: 15, concentration: 15, decisions: 16, determination: 15, flair: 9,
    leadership: 16, offTheBall: 10, positioning: 16, teamwork: 15, vision: 13,
    workRate: 15, acceleration: 11, agility: 12, balance: 13, jumpingReach: 15,
    naturalFitness: 14, pace: 10, stamina: 14, strength: 16
  },
  {
    id: "5",
    name: "Anthony Jung",
    position: "DL",
    positionGroup: "Defender",
    age: 29,
    nationality: "GER",
    currentAbility: 138,
    potentialAbility: 140,
    value: "€494,000",
    wage: "€7,200",
    contract: "2024",
    morale: "Very Good",
    condition: 91,
    ability: "Decent",
    corners: 9, crossing: 13, dribbling: 11, finishing: 7, firstTouch: 12, freeKicks: 10,
    heading: 12, longShots: 8, longThrows: 12, marking: 13, passing: 12, penaltyTaking: 6,
    tackling: 14, technique: 11, aggression: 13, anticipation: 14, bravery: 14,
    composure: 12, concentration: 13, decisions: 13, determination: 14, flair: 9,
    leadership: 11, offTheBall: 11, positioning: 14, teamwork: 14, vision: 11,
    workRate: 15, acceleration: 12, agility: 13, balance: 12, jumpingReach: 12,
    naturalFitness: 14, pace: 12, stamina: 14, strength: 13
  },
  {
    id: "6",
    name: "Christian Groß",
    position: "MCR",
    positionGroup: "Midfielder",
    age: 32,
    nationality: "GER",
    currentAbility: 150,
    potentialAbility: 150,
    value: "€130,000",
    wage: "€6,800",
    contract: "2024",
    morale: "Very Good",
    condition: 88,
    ability: "Good",
    corners: 8, crossing: 9, dribbling: 10, finishing: 8, firstTouch: 13, freeKicks: 12,
    heading: 11, longShots: 10, longThrows: 10, marking: 13, passing: 14, penaltyTaking: 8,
    tackling: 15, technique: 12, aggression: 15, anticipation: 15, bravery: 15,
    composure: 14, concentration: 16, decisions: 15, determination: 16, flair: 9,
    leadership: 15, offTheBall: 10, positioning: 15, teamwork: 16, vision: 13,
    workRate: 16, acceleration: 10, agility: 11, balance: 12, jumpingReach: 11,
    naturalFitness: 14, pace: 9, stamina: 15, strength: 14
  },
  {
    id: "7",
    name: "Niklas Schmidt",
    position: "MCL",
    positionGroup: "Midfielder",
    age: 23,
    nationality: "GER",
    currentAbility: 135,
    potentialAbility: 160,
    value: "€240,000",
    wage: "€3,600",
    contract: "2025",
    morale: "Excellent",
    condition: 94,
    ability: "Good",
    corners: 10, crossing: 11, dribbling: 13, finishing: 10, firstTouch: 14, freeKicks: 11,
    heading: 9, longShots: 12, longThrows: 8, marking: 10, passing: 15, penaltyTaking: 9,
    tackling: 11, technique: 14, aggression: 12, anticipation: 13, bravery: 12,
    composure: 13, concentration: 14, decisions: 14, determination: 15, flair: 12,
    leadership: 8, offTheBall: 12, positioning: 13, teamwork: 15, vision: 14,
    workRate: 16, acceleration: 13, agility: 14, balance: 13, jumpingReach: 9,
    naturalFitness: 15, pace: 12, stamina: 15, strength: 11
  },
  {
    id: "8",
    name: "Romano Schmid",
    position: "AMR",
    positionGroup: "Midfielder",
    age: 21,
    nationality: "AUT",
    currentAbility: 142,
    potentialAbility: 170,
    value: "€1,625,000",
    wage: "€4,400",
    contract: "2024",
    morale: "Excellent",
    condition: 92,
    ability: "Good",
    corners: 12, crossing: 13, dribbling: 15, finishing: 12, firstTouch: 15, freeKicks: 13,
    heading: 8, longShots: 13, longThrows: 7, marking: 8, passing: 14, penaltyTaking: 11,
    tackling: 9, technique: 15, aggression: 11, anticipation: 13, bravery: 12,
    composure: 13, concentration: 13, decisions: 13, determination: 15, flair: 14,
    leadership: 7, offTheBall: 14, positioning: 12, teamwork: 14, vision: 14,
    workRate: 15, acceleration: 14, agility: 15, balance: 14, jumpingReach: 8,
    naturalFitness: 16, pace: 13, stamina: 15, strength: 10
  },
  {
    id: "9",
    name: "Roger Assalé",
    position: "AML",
    positionGroup: "Forward",
    age: 27,
    nationality: "CIV",
    currentAbility: 145,
    potentialAbility: 145,
    value: "€1,087,000",
    wage: "€8,700",
    contract: "2023",
    morale: "Really Good",
    condition: 89,
    ability: "Good",
    corners: 8, crossing: 12, dribbling: 16, finishing: 14, firstTouch: 14, freeKicks: 9,
    heading: 11, longShots: 12, longThrows: 6, marking: 6, passing: 12, penaltyTaking: 10,
    tackling: 8, technique: 15, aggression: 12, anticipation: 14, bravery: 13,
    composure: 13, concentration: 12, decisions: 13, determination: 14, flair: 15,
    leadership: 9, offTheBall: 15, positioning: 13, teamwork: 12, vision: 12,
    workRate: 14, acceleration: 16, agility: 16, balance: 15, jumpingReach: 12,
    naturalFitness: 15, pace: 15, stamina: 14, strength: 12
  },
  {
    id: "10",
    name: "Niclas Füllkrug",
    position: "STCR",
    positionGroup: "Forward",
    age: 28,
    nationality: "GER",
    currentAbility: 155,
    potentialAbility: 155,
    value: "€1,625,000",
    wage: "€13,000",
    contract: "2024",
    morale: "Excellent",
    condition: 87,
    ability: "Good",
    corners: 6, crossing: 8, dribbling: 11, finishing: 16, firstTouch: 13, freeKicks: 11,
    heading: 17, longShots: 14, longThrows: 8, marking: 7, passing: 11, penaltyTaking: 13,
    tackling: 7, technique: 12, aggression: 14, anticipation: 16, bravery: 16,
    composure: 14, concentration: 13, decisions: 14, determination: 16, flair: 11,
    leadership: 12, offTheBall: 16, positioning: 15, teamwork: 13, vision: 11,
    workRate: 15, acceleration: 11, agility: 12, balance: 13, jumpingReach: 17,
    naturalFitness: 14, pace: 11, stamina: 14, strength: 17
  },
  {
    id: "11",
    name: "Marvin Ducksch",
    position: "STCL",
    positionGroup: "Forward",
    age: 27,
    nationality: "GER",
    currentAbility: 148,
    potentialAbility: 150,
    value: "€1,200,000",
    wage: "€9,200",
    contract: "2025",
    morale: "Excellent",
    condition: 91,
    ability: "Good",
    corners: 11, crossing: 10, dribbling: 13, finishing: 15, firstTouch: 14, freeKicks: 14,
    heading: 12, longShots: 14, longThrows: 7, marking: 6, passing: 13, penaltyTaking: 13,
    tackling: 8, technique: 14, aggression: 12, anticipation: 15, bravery: 13,
    composure: 14, concentration: 13, decisions: 14, determination: 15, flair: 13,
    leadership: 11, offTheBall: 15, positioning: 14, teamwork: 14, vision: 13,
    workRate: 15, acceleration: 12, agility: 13, balance: 13, jumpingReach: 12,
    naturalFitness: 15, pace: 12, stamina: 15, strength: 13
  }
]

const getAbilityColor = (ability: string) => {
  switch (ability) {
    case "Excellent":
      return "bg-green-500"
    case "Very Good":
      return "bg-green-400"
    case "Good":
      return "bg-yellow-400"
    case "Decent":
      return "bg-orange-400"
    default:
      return "bg-gray-400"
  }
}

const getMoraleColor = (morale: string) => {
  switch (morale) {
    case "Excellent":
      return "text-green-600"
    case "Very Good":
      return "text-green-500"
    case "Good":
      return "text-yellow-500"
    case "Poor":
      return "text-red-500"
    default:
      return "text-gray-500"
  }
}

const columns: ColumnDef<Player>[] = [
  {
    accessorKey: "position",
    header: "Pos",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-xs font-mono min-w-[40px] justify-center">
        {row.original.position}
      </Badge>
    ),
    size: 60,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link 
        href={`/squad/${row.original.id}`}
        className="font-medium hover:underline text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
      >
        {row.original.name}
      </Link>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => row.original.age,
    size: 60,
  },
  {
    accessorKey: "nationality",
    header: "Nat",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-xs">
        {row.original.nationality}
      </Badge>
    ),
    size: 60,
  },
  {
    accessorKey: "currentAbility",
    header: "CA",
    cell: ({ row }) => row.original.currentAbility,
    size: 60,
  },
  {
    accessorKey: "potentialAbility", 
    header: "PA",
    cell: ({ row }) => row.original.potentialAbility,
    size: 60,
  },
  {
    accessorKey: "ability",
    header: "Ability",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${getAbilityColor(row.original.ability)}`} />
        <span className="text-sm">{row.original.ability}</span>
      </div>
    ),
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => row.original.value,
  },
  {
    accessorKey: "wage",
    header: "Wage",
    cell: ({ row }) => row.original.wage,
  },
  {
    accessorKey: "contract",
    header: "Contract",
    cell: ({ row }) => row.original.contract,
    size: 80,
  },
  {
    accessorKey: "morale",
    header: "Morale",
    cell: ({ row }) => (
      <span className={`text-sm font-medium ${getMoraleColor(row.original.morale)}`}>
        {row.original.morale}
      </span>
    ),
  },
  {
    accessorKey: "condition",
    header: "Cond",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <div className="w-12 bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
          <div 
            className="bg-green-600 h-1.5 rounded-full transition-all duration-300" 
            style={{ width: `${row.original.condition}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">{row.original.condition}%</span>
      </div>
    ),
    size: 80,
  },
  // Technical attributes - hidden by default
  {
    accessorKey: "technique",
    header: "Tec",
    cell: ({ row }) => row.original.technique,
    size: 50,
  },
  {
    accessorKey: "passing",
    header: "Pas",
    cell: ({ row }) => row.original.passing,
    size: 50,
  },
  {
    accessorKey: "dribbling",
    header: "Dri",
    cell: ({ row }) => row.original.dribbling,
    size: 50,
  },
  {
    accessorKey: "finishing",
    header: "Fin",
    cell: ({ row }) => row.original.finishing,
    size: 50,
  },
  // Mental attributes - hidden by default
  {
    accessorKey: "determination",
    header: "Det",
    cell: ({ row }) => row.original.determination,
    size: 50,
  },
  {
    accessorKey: "decisions",
    header: "Dec",
    cell: ({ row }) => row.original.decisions,
    size: 50,
  },
  {
    accessorKey: "positioning",
    header: "Pos",
    cell: ({ row }) => row.original.positioning,
    size: 50,
  },
  // Physical attributes - hidden by default  
  {
    accessorKey: "pace",
    header: "Pac",
    cell: ({ row }) => row.original.pace,
    size: 50,
  },
  {
    accessorKey: "acceleration",
    header: "Acc",
    cell: ({ row }) => row.original.acceleration,
    size: 50,
  },
  {
    accessorKey: "strength",
    header: "Str",
    cell: ({ row }) => row.original.strength,
    size: 50,
  },
]

export function SquadTable() {
  const [data] = React.useState(() => mockPlayers)
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    // Hide detailed attributes by default
    technique: false,
    passing: false,
    dribbling: false,
    finishing: false,
    determination: false,
    decisions: false,
    positioning: false,
    pace: false,
    acceleration: false,
    strength: false,
  })
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 25,
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <IconSearch className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search players..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="pl-8 w-64"
            />
          </div>
          <Select
            value={(table.getColumn("positionGroup")?.getFilterValue() as string) ?? "all"}
            onValueChange={(value) =>
              table.getColumn("positionGroup")?.setFilterValue(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All positions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All positions</SelectItem>
              <SelectItem value="Goalkeeper">Goalkeepers</SelectItem>
              <SelectItem value="Defender">Defenders</SelectItem>
              <SelectItem value="Midfielder">Midfielders</SelectItem>
              <SelectItem value="Forward">Forwards</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns className="h-4 w-4" />
                Columns
                <IconChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2 font-medium text-sm">Toggle columns</div>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="px-4 lg:px-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead 
                      key={header.id}
                      className="h-10 text-xs font-medium bg-muted/50"
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:bg-muted/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id} 
                        className="py-2 text-sm"
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No players found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} players
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Label className="text-sm">Rows per page</Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 25, 50, 100].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <IconChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <IconChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <IconChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <IconChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}