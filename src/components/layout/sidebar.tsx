// src/components/layout/sidebar.tsx
"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Plus,
  BarChart3,
  Settings,
  Building,
  Calendar,
  FileText,
  Bell,
  Search,
  Folder,
  CheckSquare,
  Clock,
  AlertCircle,
  TrendingUp
} from "lucide-react"

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const userRole = session?.user?.role

  // Navigation items based on role
  const navigationItems = [
    {
      title: "หน้าหลัก",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["director", "header", "employee"]
    },
    {
      title: "งานของฉัน",
      href: "/dashboard/my-tasks",
      icon: ClipboardList,
      roles: ["director", "header", "employee"],
      badge: "5" // จำนวนงานที่รอดำเนินการ
    },
    {
      title: "สร้างงานใหม่",
      href: "/dashboard/create-task",
      icon: Plus,
      roles: ["director", "header"]
    },
    {
      title: "งานที่มอบหมาย",
      href: "/dashboard/assigned-tasks",
      icon: Users,
      roles: ["director", "header"]
    },
    {
      title: "การจัดการผู้ใช้",
      href: "/dashboard/users",
      icon: Users,
      roles: ["director"]
    },
    {
      title: "การจัดการฝ่าย",
      href: "/dashboard/departments",
      icon: Building,
      roles: ["director"]
    },
    {
      title: "รายงาน",
      href: "/dashboard/reports",
      icon: BarChart3,
      roles: ["director", "header"]
    }
  ]

  const quickActions = [
    {
      title: "งานใหม่",
      href: "/dashboard/create-task",
      icon: Plus,
      color: "bg-green-500",
      roles: ["director", "header"]
    },
    {
      title: "รายงานสถานะ",
      href: "/dashboard/reports",
      icon: FileText,
      color: "bg-blue-500",
      roles: ["director", "header"]
    },
    {
      title: "ปฏิทินงาน",
      href: "/dashboard/calendar",
      icon: Calendar,
      color: "bg-purple-500",
      roles: ["director", "header", "employee"]
    }
  ]

  const taskStats = [
    {
      title: "รอดำเนินการ",
      count: 8,
      icon: Clock,
      color: "text-yellow-600"
    },
    {
      title: "ใกล้ครบกำหนด",
      count: 3,
      icon: AlertCircle,
      color: "text-orange-600"
    },
    {
      title: "เกินกำหนด",
      count: 1,
      icon: AlertCircle,
      color: "text-red-600"
    }
  ]

  const filteredNavigation = navigationItems.filter(item => 
    item.roles.includes(userRole as string)
  )

  const filteredQuickActions = quickActions.filter(item =>
    item.roles.includes(userRole as string)
  )

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform border-r border-white/20 bg-white/95 backdrop-blur-md transition-transform duration-300 ease-in-out md:relative md:top-0 md:z-auto md:h-screen md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Search Bar - Mobile */}
          <div className="p-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="ค้นหางาน..."
                className="w-full rounded-xl border border-gray-200 bg-white/90 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <div className="space-y-1">
              {filteredNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start rounded-xl",
                        isActive 
                          ? "bg-green-500 text-white shadow-lg hover:bg-green-600" 
                          : "hover:bg-green-50 hover:text-green-900"
                      )}
                      onClick={onClose}
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className="ml-auto bg-white/20 text-current"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                )
              })}
            </div>

            {/* Quick Actions */}
            {filteredQuickActions.length > 0 && (
              <div className="pt-6">
                <h3 className="mb-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  การดำเนินการด่วน
                </h3>
                <div className="space-y-1">
                  {filteredQuickActions.map((action) => (
                    <Link key={action.href} href={action.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start rounded-xl hover:bg-gray-50"
                        onClick={onClose}
                      >
                        <div className={cn(
                          "mr-3 rounded-lg p-1",
                          action.color
                        )}>
                          <action.icon className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm">{action.title}</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Task Statistics */}
            <div className="pt-6">
              <h3 className="mb-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                สถิติงาน
              </h3>
              <div className="space-y-2">
                {taskStats.map((stat) => (
                  <div 
                    key={stat.title}
                    className="flex items-center justify-between rounded-xl bg-gray-50 p-3"
                  >
                    <div className="flex items-center gap-2">
                      <stat.icon className={cn("h-4 w-4", stat.color)} />
                      <span className="text-sm text-gray-700">{stat.title}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {stat.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <Link href="/dashboard/settings">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-xl text-gray-600 hover:bg-gray-50"
                onClick={onClose}
              >
                <Settings className="mr-3 h-4 w-4" />
                <span>ตั้งค่า</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}