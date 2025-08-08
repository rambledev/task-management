// src/components/dashboard/header-dashboard.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/tasks/stats-card"
import { TaskCard } from "@/components/tasks/task-card"
import { 
  ClipboardList, 
  Users, 
  Clock,
  CheckCircle,
  Plus,
  UserPlus,
  BarChart3,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Target,
  FileText,
  Send,
  Timer,
  Eye
} from "lucide-react"

export function HeaderDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("week")

  // Mock data - จะถูกแทนที่ด้วย API calls
  const stats = [
    {
      title: "งานในฝ่าย",
      value: "28",
      description: "งานทั้งหมดในฝ่าย",
      icon: ClipboardList,
      trend: { value: 5, isPositive: true },
      color: "blue" as const
    },
    {
      title: "งานที่มอบหมาย",
      value: "15",
      description: "งานที่มอบหมายให้ลูกน้อง",
      icon: UserPlus,
      trend: { value: 3, isPositive: true },
      color: "green" as const
    },
    {
      title: "งานที่ได้รับ",
      value: "13",
      description: "งานจากผู้บริหาร",
      icon: Users,
      trend: { value: 2, isPositive: true },
      color: "purple" as const
    },
    {
      title: "งานที่เสร็จสิ้น",
      value: "22",
      description: "78.6% ของงานทั้งหมด",
      icon: CheckCircle,
      trend: { value: 12, isPositive: true },
      color: "green" as const
    },
    {
      title: "งานที่ล่าช้า",
      value: "3",
      description: "ต้องติดตามเร่งด่วน",
      icon: Clock,
      trend: { value: 1, isPositive: false },
      color: "yellow" as const
    },
    {
      title: "ทีมงาน",
      value: "8",
      description: "สมาชิกในฝ่าย",
      icon: Users,
      color: "gray" as const
    }
  ]

  const myTasks = [
    {
      id: "1",
      title: "จัดทำแผนกลยุทธ์ฝ่าย",
      description: "วางแผนกลยุทธ์และเป้าหมายฝ่ายสำหรับไตรมาสที่ 2 รวมถึงการวิเคราะห์ตลาดและคู่แข่ง",
      due_date: "2025-02-28",
      assignment_status: "in_progress",
      time_status: "on_time",
      priority: "high",
      progress: 45,
      creator: { name: "ผู้อำนวยการ", email: "director@company.com" },
      assignee: { name: "หัวหน้าฝ่าย", email: "header@company.com" },
      department: { name: "ฝ่ายบริหาร" },
      created_at: "2025-01-20",
      assigned_at: "2025-01-20"
    },
    {
      id: "7",
      title: "ประเมินผลการทำงานทีม",
      description: "ประเมินผลการทำงานของสมาชิกในทีมประจำไตรมาส และวางแผนพัฒนา",
      due_date: "2025-02-25",
      assignment_status: "assigned",
      time_status: "on_time",
      priority: "medium",
      progress: 0,
      creator: { name: "ผู้อำนวยการ", email: "director@company.com" },
      assignee: { name: "หัวหน้าฝ่าย", email: "header@company.com" },
      department: { name: "ฝ่ายบริหาร" },
      created_at: "2025-02-01",
      assigned_at: "2025-02-01"
    }
  ]

  const assignedTasks = [
    {
      id: "2",
      title: "อัพเดตฐานข้อมูลลูกค้า",
      description: "ปรับปรุงข้อมูลลูกค้าให้เป็นปัจจุบัน รวมถึงข้อมูลการติดต่อและประวัติการซื้อ",
      due_date: "2025-02-18",
      assignment_status: "submitted",
      time_status: "on_time",
      priority: "medium",
      progress: 100,
      creator: { name: "หัวหน้าฝ่าย", email: "header@company.com" },
      assignee: { name: "นาย ค พนักงาน", email: "employee1@company.com" },
      department: { name: "ฝ่ายการตลาด" },
      created_at: "2025-01-25",
      assigned_at: "2025-01-25"
    },
    {
      id: "3",
      title: "จัดทำรายงานยอดขาย",
      description: "สรุปยอดขายประจำเดือน มกราคม 2025 พร้อมกราฟและการวิเคราะห์แนวโน้ม",
      due_date: "2025-02-10",
      assignment_status: "in_progress",
      time_status: "delayed",
      priority: "high",
      progress: 70,
      creator: { name: "หัวหน้าฝ่าย", email: "header@company.com" },
      assignee: { name: "นาง ง พนักงาน", email: "employee2@company.com" },
      department: { name: "ฝ่ายการตลาด" },
      created_at: "2025-01-15",
      assigned_at: "2025-01-15"
    },
    {
      id: "8",
      title: "วิเคราะห์ข้อมูลลูกค้า",
      description: "วิเคราะห์พฤติกรรมการซื้อของลูกค้าและจัดทำรายงานเชิงลึก",
      due_date: "2025-02-22",
      assignment_status: "acknowledged",
      time_status: "on_time",
      priority: "medium",
      progress: 20,
      creator: { name: "หัวหน้าฝ่าย", email: "header@company.com" },
      assignee: { name: "นาย จ นักวิเคราะห์", email: "analyst@company.com" },
      department: { name: "ฝ่ายการตลาด" },
      created_at: "2025-02-01",
      assigned_at: "2025-02-01"
    },
    {
      id: "9",
      title: "จัดงานเปิดตัวสินค้า",
      description: "วางแผนและจัดงานเปิดตัวสินค้าใหม่สำหรับไตรมาสที่ 2",
      due_date: "2025-03-15",
      assignment_status: "assigned",
      time_status: "on_time",
      priority: "high",
      progress: 0,
      creator: { name: "หัวหน้าฝ่าย", email: "header@company.com" },
      assignee: { name: "นาง ช ประชาสัมพันธ์", email: "pr@company.com" },
      department: { name: "ฝ่ายการตลาด" },
      created_at: "2025-02-05",
      assigned_at: "2025-02-05"
    }
  ]

  const teamMembers = [
    { 
      name: "นาย ก พนักงาน", 
      position: "พนักงานการตลาด", 
      tasks: 5, 
      completion: 80,
      status: "online"
    },
    { 
      name: "นาง ข พนักงาน", 
      position: "พนักงานขาย", 
      tasks: 7, 
      completion: 92,
      status: "online"
    },
    { 
      name: "นาย ค พนักงาน", 
      position: "พนักงานวิเคราะห์", 
      tasks: 4, 
      completion: 75,
      status: "offline"
    },
    { 
      name: "นาง ง พนักงาน", 
      position: "พนักงานสนับสนุน", 
      tasks: 6, 
      completion: 85,
      status: "online"
    },
    { 
      name: "นาย จ นักวิเคราะห์", 
      position: "นักวิเคราะห์ข้อมูล", 
      tasks: 3, 
      completion: 67,
      status: "online"
    },
    { 
      name: "นาง ช ประชาสัมพันธ์", 
      position: "เจ้าหน้าที่ PR", 
      tasks: 4, 
      completion: 90,
      status: "offline"
    }
  ]

  const recentActivities = [
    {
      type: "task_completed",
      message: "นาย ค พนักงาน ส่งงาน 'อัพเดตฐานข้อมูลลูกค้า'",
      time: "30 นาทีที่แล้ว",
      user: "นาย ค พนักงาน"
    },
    {
      type: "progress_update", 
      message: "นาง ง พนักงาน อัพเดตความคืบหน้า 'รายงานยอดขาย' เป็น 70%",
      time: "2 ชั่วโมงที่แล้ว",
      user: "นาง ง พนักงาน"
    },
    {
      type: "task_acknowledged",
      message: "นาย จ นักวิเคราะห์ รับทราบงาน 'วิเคราะห์ข้อมูลลูกค้า'",
      time: "4 ชั่วโมงที่แล้ว", 
      user: "นาย จ นักวิเคราะห์"
    },
    {
      type: "task_assigned",
      message: "คุณมอบหมายงาน 'จัดงานเปิดตัวสินค้า' ให้ นาง ช ประชาสัมพันธ์",
      time: "6 ชั่วโมงที่แล้ว",
      user: "คุณ"
    }
  ]

  const handleTaskAction = (action: string, taskId: string) => {
    console.log(`Action: ${action} for task: ${taskId}`)
    // จะเพิ่ม logic สำหรับจัดการ actions ต่อไป
    switch (action) {
      case "acknowledge":
        // รับทราบงาน
        break
      case "update_progress":
        // อัปเดตความคืบหน้า
        break
      case "submit":
        // ส่งงาน
        break
      case "approve":
        // อนุมัติงาน
        break
      case "request_revision":
        // ส่งกลับแก้ไข
        break
      case "view_details":
        // ดูรายละเอียด
        break
      default:
        break
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "task_completed":
        return "✅"
      case "progress_update":
        return "📊"
      case "task_acknowledged":
        return "👁️"
      case "task_assigned":
        return "📋"
      default:
        return "📝"
    }
  }

  const getStatusBadge = (status: string) => {
    return status === "online" ? (
      <Badge variant="success" className="text-xs">
        Online
      </Badge>
    ) : (
      <Badge variant="secondary" className="text-xs">
        Offline
      </Badge>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard หัวหน้าฝ่าย
          </h1>
          <p className="text-gray-600 mt-1">
            จัดการงานในฝ่ายและติดตามความคืบหน้าของทีม
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            รายงานฝ่าย
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            ปฏิทิน
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            มอบหมายงาน
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
        {/* Tasks Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Tasks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    งานของฉัน
                  </CardTitle>
                  <CardDescription>งานที่ได้รับมอบหมายจากผู้บริหาร</CardDescription>
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
                  userRole="header"
                />
              ))}
              {myTasks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <ClipboardList className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>ยังไม่มีงานที่ได้รับมอบหมาย</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Assigned Tasks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-green-500" />
                    งานที่มอบหมาย
                  </CardTitle>
                  <CardDescription>งานที่มอบหมายให้สมาชิกในทีม</CardDescription>
                </div>
                <Badge variant="outline">{assignedTasks.length} งาน</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onAction={handleTaskAction}
                  showActions={true}
                  userRole="header"
                />
              ))}
              {assignedTasks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Send className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>ยังไม่มีงานที่มอบหมาย</p>
                </div>
              )}
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
                มอบหมายงานใหม่
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <BarChart3 className="h-4 w-4" />
                รายงานฝ่าย
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <Users className="h-4 w-4" />
                จัดการทีม
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <Calendar className="h-4 w-4" />
                ดูปฏิทิน
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <FileText className="h-4 w-4" />
                สร้างรายงาน
              </Button>
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  ประสิทธิภาพทีม
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="space-y-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{member.name}</p>
                        {getStatusBadge(member.status)}
                      </div>
                      <p className="text-xs text-gray-500">{member.position}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">{member.completion}%</p>
                      <p className="text-xs text-gray-500">{member.tasks} งาน</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${member.completion}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-blue-500" />
                กิจกรรมล่าสุด
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-lg mt-0.5">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                การแจ้งเตือน
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <p className="text-sm font-medium text-orange-800">
                    งานล่าช้า 3 งาน
                  </p>
                </div>
                <p className="text-xs text-orange-600">
                  ต้องติดตามทีมงาน: รายงานยอดขาย, วิเคราะห์ตลาด, สำรวจลูกค้า
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-medium text-blue-800">
                    งานรอการอนุมัติ 2 งาน
                  </p>
                </div>
                <p className="text-xs text-blue-600">
                  จากผู้บริหาร: แผนกลยุทธ์ฝ่าย, ประเมินผลทีม
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <p className="text-sm font-medium text-green-800">
                    งานเสร็จสิ้น 5 งาน
                  </p>
                </div>
                <p className="text-xs text-green-600">
                  ในสัปดาห์นี้: อัพเดตฐานข้อมูล, รายงานลูกค้า, วิเคราะห์ยอดขาย
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <p className="text-sm font-medium text-purple-800">
                    ประสิทธิภาพทีม +15%
                  </p>
                </div>
                <p className="text-xs text-purple-600">
                  เทียบกับเดือนที่แล้ว: ทีมทำงานได้ดีขึ้น
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}