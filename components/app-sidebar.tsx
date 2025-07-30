"use client"

import * as React from "react"
import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconHelp,
  IconNews,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconUserSearch,
  IconClipboardList,
  IconMail,
  IconCoins,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Inbox",
      url: "/inbox",
      icon: IconMail,
    },
    {
      title: "Squad Management",
      url: "/squad",
      icon: IconUsers,
    },
    {
      title: "Finances",
      url: "/finances",
      icon: IconCoins,
    },
    {
      title: "Match Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Transfers",
      url: "#",
      icon: IconClipboardList,
    },
    {
      title: "Coaching Staff",
      url: "/coaching-staff",
      icon: IconUserSearch,
    },
  ],
  navClouds: [
    {
      title: "Scouting",
      icon: IconUserSearch,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Scouts",
          url: "#",
        },
        {
          title: "Scout Reports",
          url: "#",
        },
      ],
    },
    {
      title: "Transfer Bids",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Bids",
          url: "#",
        },
        {
          title: "Completed Deals",
          url: "#",
        },
      ],
    },
    {
      title: "Tactics",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Formation Setup",
          url: "#",
        },
        {
          title: "Match Strategies",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Player Database",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Match Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Press Releases",
      url: "#",
      icon: IconNews,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
