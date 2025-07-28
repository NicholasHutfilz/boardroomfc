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
import { mockPlayerData, type Player } from "@/lib/mock-data"



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
    accessorKey: "positionGroup",
    header: "Position Group",
    cell: ({ row }) => row.original.positionGroup,
    enableHiding: true,
  },
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
  const [data] = React.useState(() => Object.values(mockPlayerData))
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    // Hide positionGroup column (used for filtering only)
    positionGroup: false,
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
            value={
              typeof table.getColumn("positionGroup")?.getFilterValue() === "string" &&
              table.getColumn("positionGroup")?.getFilterValue() !== ""
                ? (table.getColumn("positionGroup")?.getFilterValue() as string)
                : "all"
            }
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