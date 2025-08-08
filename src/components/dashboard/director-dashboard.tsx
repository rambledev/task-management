// src/components/dashboard/director-dashboard.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/tasks/stats-card"
import { TaskCard } from "@/components/tasks/task-card"
import { 
  Users, 
  ClipboardList, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  BarChart3,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react"

export function DirectorDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("week")

  // Mock data - จะถูกแทนที่ด้วย API calls
  const stats = [
    {
      title: "งานทั้งหมด",
      value: "124",
      description: "งานในระบบ",
      icon: ClipboardList,
      trend: { value: 12, isPositive: true },
      color: "blue" as const
    },
    {
      title: "งานที่เสร็จสิ้น",
      value: "89",
      description: "71.7% ของงานทั้งหมด",
      icon: CheckCircle,
      trend: { value: 8, isPositive: true },
      color: "green" as const
    },
    {
      title: "งานที่ล่าช้า",
      value: "7",
      description: "ต้องติดตามเร่งด่วน",
      icon: Clock,
      trend: { value: 3, isPositive: false },
      color: "yellow" as const
    },
    {
      title: "งานเกินกำหนด",
      value: "3",
      description: "ต้องดำเนินการทันที",
      icon: AlertTriangle,
      trend: { value: 1, isPositive: false },
      color: "red" as const
    },
    {
      title: "จำนวนพนักงาน",
      value: "47",
      description: "พนักงานในระบบ",
      icon: Users,
      color: "purple" as const
    },
    {
      title: "ฝ่ายงาน",
      value: "8",
      description: "ฝ่ายในองค์กร",
      icon: Building,
      color: "gray" as const
    }
  ]

  const recentTasks = [
    {
      id: "1",
      title: "จัดทำรายงานประจำเดือน",
      description: "รายงานสรุปผลการดำเนินงานประจำเดือน มกราคม 2025",
      due_date: "2025-02-15",
      assignment_status: "in_progress",
      time_status: "on_time",
      priority: "high",
      progress: 60,
      creator: { name: "ผู้อำนวยการ", email: "director@company.com" },
      assignee: { name: "นาย ก สมิท", email: "admin@company.com" },
      department: { name: "ฝ่ายบริหาร" },
      created_at: "2025-01-25",
      assigned_at: "2025-01-25"
    },
    {
      id: "2", 
      title: "ตรวจสอบระบบ IT",
      description: "ตรวจสอบและอัพเกรดระบบเครือข่ายภายในองค์กร",
      due_date: "2025-02-20",
      assignment_status: "submitted",
      time_status: "on_time", 
      priority: "medium",
      progress: 100,
      creator: { name: "ผู้อำนวยการ", email: "director@company.com" },
      assignee: { name: "นาย ข เทคนิค", email: "it@company.com" },
      department: { name: "ฝ่าย IT" },
      created_at: "2025-01-20",
      assigned_at: "2025-01-20"
    }
  ]

  const handleTaskAction = (action: string, taskId: string) => {
    console.log(`Action: ${action} for task: ${taskId}`)
    // จะเพิ่ม logic สำหรับจัดการ actions ต่อไป
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard ผู้อำนวยการ
          </h1>
          <p className="text-gray-600 mt-1">
            ภาพรวมการดำเนินงานและการจัดการงานทั้งหมด
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            รายงาน
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            ปฏิทิน
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            สร้างงานใหม่
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {["day", "week", "month", "quarter"].map((range) => (
          <Button
            key={range}
            variant={selectedTimeRange === range ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTimeRange(range)}
          >
            {range === "day" && "วันนี้"}
            {range === "week" && "สัปดาห์นี้"}
            {range === "month" && "เดือนนี้"}
            {range === "quarter" && "ไตรมาสนี้"}
          </Button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
            color={stat.color}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>งานล่าสุด</CardTitle>
                  <CardDescription>งานที่ต้องติดตามและดำเนินการ</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  ดูทั้งหมด
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onAction={handleTaskAction}
                  showActions={true}
                  userRole="director"
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>การดำเนินการด่วน</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-3" variant="outline">
                <Plus className="h-4 w-4" />
                สร้างงานใหม่
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <Users className="h-4 w-4" />
                จัดการผู้ใช้
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <Building className="h-4 w-4" />
                จัดการฝ่าย
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <BarChart3 className="h-4 w-4" />
                ดูรายงาน
              </Button>
            </CardContent>
          </Card>

          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>ประสิทธิภาพฝ่าย</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "ฝ่ายบริหาร", completion: 92, tasks: 15 },
                { name: "ฝ่าย IT", completion: 88, tasks: 12 },
                { name: "ฝ่ายการเงิน", completion: 85, tasks: 18 },
                { name: "ฝ่ายบุคคล", completion: 79, tasks: 9 }
              ].map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{dept.name}</span>
                      <span className="text-sm text-gray-500">{dept.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                        style={{ width: `${dept.completion}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {dept.tasks} งาน
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Urgent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                แจ้งเตือนด่วน
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm font-medium text-red-800">
                  งานเกินกำหนด 3 งาน
                </p>
                <p className="text-xs text-red-600 mt-1">
                  ต้องดำเนินการทันที
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <p className="text-sm font-medium text-yellow-800">
                  งานใกล้ครบกำหนด 7 งาน
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  ภายใน 3 วันข้างหน้า
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-sm font-medium text-blue-800">
                  งานรอการอนุมัติ 5 งาน
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  รอการตรวจสอบ
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}