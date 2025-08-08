// src/components/dashboard/employee-dashboard.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StatsCard } from "@/components/tasks/stats-card"
import { TaskCard } from "@/components/tasks/task-card"
import { 
  ClipboardList, 
  Clock,
  CheckCircle,
  Calendar,
  Bell,
  TrendingUp,
  AlertCircle,
  User,
  Building,
  Target
} from "lucide-react"

export function EmployeeDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("week")

  // Mock data - จะถูกแทนที่ด้วย API calls
  const stats = [
    {
      title: "งานทั้งหมด",
      value: "16",
      description: "งานที่ได้รับมอบหมาย",
      icon: ClipboardList,
      trend: { value: 2, isPositive: true },
      color: "blue" as const
    },
    {
      title: "งานที่เสร็จสิ้น",
      value: "12",
      description: "75% ของงานทั้งหมด",
      icon: CheckCircle,
      trend: { value: 15, isPositive: true },
      color: "green" as const
    },
    {
      title: "งานที่กำลังทำ",
      value: "3",
      description: "งานที่อยู่ระหว่างดำเนินการ",
      icon: Clock,
      color: "yellow" as const
    },
    {
      title: "งานใหม่",
      value: "1",
      description: "งานที่ยังไม่ได้รับทราบ",
      icon: Bell,
      color: "red" as const
    }
  ]

  const myTasks = [
    {
      id: "1",
      title: "จัดทำรายงานการขาย",
      description: "รายงานสรุปยอดขายประจำเดือน มกราคม 2025 พร้อมกราฟและการวิเคราะห์",
      due_date: "2025-02-15",
      assignment_status: "in_progress",
      time_status: "on_time",
      priority: "high",
      progress: 65,
      creator: { name: "หัวหน้าฝ่าย", email: "header@company.com" },
      assignee: { name: "พนักงาน", email: "employee@company.com" },
      department: { name: "ฝ่ายการตลาด" },
      created_at: "2025-01-25",
      assigned_at: "2025-01-25"
    },
    {
      id: "2",
      title: "อัพเดตข้อมูลลูกค้า",
      description: "ปรับปรุงข้อมูลลูกค้าในระบบ CRM ให้เป็นปัจจุบัน",
      due_date: "2025-02-12",
      assignment_status: "submitted",
      time_status: "on_time",
      priority: "medium",
      progress: 100,
      creator: { name: "หัวหน้าฝ่าย", email: "header@company.com" },
      assignee: { name: "พนักงาน", email: "employee@company.com" },
      department: { name: "ฝ่ายการตลาด" },
      created_at: "2025-01-20",
      assigned_at: "2025-01-20"
    },
    {
      id: "3",
      title: "เตรียมเอกสารประชุม",
      description: "จัดเตรียมเอกสารและข้อมูลสำหรับการประชุมรายเดือน",
      due_date: "2025-02-08",
      assignment_status: "assigned",
      time_status: "on_time",
      priority: "medium",
      progress: 0,
      creator: { name: "ผู้อำนวยการ", email: "director@company.com" },
      assignee: { name: "พนักงาน", email: "employee@company.com" },
      department: { name: "ฝ่ายบริหาร" },
      created_at: "2025-02-05",
      assigned_at: "2025-02-05"
    }
  ]

  const todaySchedule = [
    { time: "09:00", title: "ประชุมทีม", type: "meeting" },
    { time: "11:00", title: "ส่งรายงานขาย", type: "deadline" },
    { time: "14:00", title: "ติดตามลูกค้า", type: "task" },
    { time: "16:00", title: "อัพเดตข้อมูล", type: "task" }
  ]

  const recentActivities = [
    { action: "ส่งงาน", task: "รายงานการขาย", time: "2 ชั่วโมงที่แล้ว" },
    { action: "อัพเดตความคืบหน้า", task: "อัพเดตข้อมูลลูกค้า", time: "5 ชั่วโมงที่แล้ว" },
    { action: "รับทราบงาน", task: "เตรียมเอกสารประชุม", time: "1 วันที่แล้ว" },
    { action: "เสร็จสิ้น", task: "จัดทำรายงานเดือน", time: "2 วันที่แล้ว" }
  ]

  const handleTaskAction = (action: string, taskId: string) => {
    console.log(`Action: ${action} for task: ${taskId}`)
    // จะเพิ่ม logic สำหรับจัดการ actions ต่อไป
  }

  const getScheduleIcon = (type: string) => {
    switch (type) {
      case "meeting": return "👥"
      case "deadline": return "⏰"
      case "task": return "📝"
      default: return "📅"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard พนักงาน
          </h1>
          <p className="text-gray-600 mt-1">
            จัดการงานและติดตามความคืบหน้าของตัวเอง
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            ปฏิทิน
          </Button>
          <Button variant="outline" className="gap-2">
            <Bell className="h-4 w-4" />
            การแจ้งเตือน
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {["day", "week", "month"].map((range) => (
          <Button
            key={range}
            variant={selectedTimeRange === range ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTimeRange(range)}
          >
            {range === "day" && "วันนี้"}
            {range === "week" && "สัปดาห์นี้"}
            {range === "month" && "เดือนนี้"}
          </Button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        {/* Tasks Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Tasks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>งานของฉัน</CardTitle>
                  <CardDescription>งานที่ได้รับมอบหมายและสถานะปัจจุบัน</CardDescription>
                </div>
                <Badge variant="outline">{myTasks.length} งาน</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {myTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onAction={handleTaskAction}
                  showActions={true}
                  userRole="employee"
                />
              ))}
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle>ภาพรวมความคืบหน้า</CardTitle>
              <CardDescription>สถิติการทำงานของฉันในเดือนนี้</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-green-50">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-green-700">งานเสร็จสิ้น</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-blue-50">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-blue-700">งานกำลังทำ</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-orange-50">
                  <div className="text-2xl font-bold text-orange-600">1</div>
                  <div className="text-sm text-orange-700">งานใหม่</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">ความคืบหน้ารวม</span>
                  <span className="text-sm font-semibold text-green-600">75%</span>
                </div>
                <Progress value={75} className="h-3" />
                <p className="text-xs text-gray-500">
                  คุณทำงานได้เสร็จ 12 จาก 16 งาน ในเดือนนี้
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                กำหนดการวันนี้
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaySchedule.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="text-lg">{getScheduleIcon(item.type)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                ผลงานของฉัน
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">งานตรงเวลา</span>
                  <span className="text-sm font-semibold text-green-600">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }} />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">คุณภาพงาน</span>
                  <span className="text-sm font-semibold text-blue-600">88%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "88%" }} />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">คะแนนรวม</span>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-green-600">4.4</span>
                    <span className="text-sm text-gray-500">/5.0</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>กิจกรรมล่าสุด</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.action}</span>: {activity.task}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>การดำเนินการด่วน</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-3" variant="outline">
                <Clock className="h-4 w-4" />
                อัพเดตความคืบหน้า
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <CheckCircle className="h-4 w-4" />
                ส่งงานที่เสร็จแล้ว
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <Calendar className="h-4 w-4" />
                ดูปฏิทินงาน
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <Bell className="h-4 w-4" />
                ดูการแจ้งเตือน
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}