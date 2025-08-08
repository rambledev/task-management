// src/components/tasks/task-card.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  getStatusLabel, 
  getTimeStatusLabel, 
  getPriorityLabel,
  getStatusColor,
  getTimeStatusColor,
  getPriorityColor,
  formatDate,
  formatDateTime
} from "@/lib/utils"
import { Calendar, Clock, User, Building } from "lucide-react"

interface TaskCardProps {
  task: {
    id: string
    title: string
    description?: string | null
    due_date?: Date | string | null
    assignment_status: string
    time_status: string
    priority: string
    progress: number
    assignee?: {
      name?: string | null
      email: string
    } | null
    creator: {
      name?: string | null
      email: string
    }
    department?: {
      name: string
    } | null
    created_at: Date | string
    assigned_at?: Date | string | null
  }
  onAction?: (action: string, taskId: string) => void
  showActions?: boolean
  userRole?: string
}

export function TaskCard({ task, onAction, showActions = false, userRole }: TaskCardProps) {
  const handleAction = (action: string) => {
    onAction?.(action, task.id)
  }

  return (
    <Card className="hover:shadow-xl transition-all duration-200 border border-white/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
              {task.title}
            </CardTitle>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge 
                variant="default" 
                className={getStatusColor(task.assignment_status)}
              >
                {getStatusLabel(task.assignment_status)}
              </Badge>
              <Badge 
                variant="secondary" 
                className={getTimeStatusColor(task.time_status)}
              >
                {getTimeStatusLabel(task.time_status)}
              </Badge>
              <Badge 
                variant="outline" 
                className={getPriorityColor(task.priority)}
              >
                {getPriorityLabel(task.priority)}
              </Badge>
            </div>
          </div>
        </div>
        
        {task.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {task.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">ความคืบหน้า</span>
            <span className="text-sm font-semibold text-green-600">{task.progress}%</span>
          </div>
          <Progress value={task.progress} className="h-2" />
        </div>

        {/* Task Info */}
        <div className="grid grid-cols-1 gap-3 text-sm">
          {task.due_date && (
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>ครบกำหนด: {formatDate(task.due_date)}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-gray-600">
            <User className="h-4 w-4" />
            <span>ผู้สั่ง: {task.creator.name || task.creator.email}</span>
          </div>

          {task.assignee && (
            <div className="flex items-center gap-2 text-gray-600">
              <User className="h-4 w-4" />
              <span>ผู้รับ: {task.assignee.name || task.assignee.email}</span>
            </div>
          )}

          {task.department && (
            <div className="flex items-center gap-2 text-gray-600">
              <Building className="h-4 w-4" />
              <span>ฝ่าย: {task.department.name}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>สร้างเมื่อ: {formatDateTime(task.created_at)}</span>
          </div>

          {task.assigned_at && (
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span>มอบหมายเมื่อ: {formatDateTime(task.assigned_at)}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
            {task.assignment_status === 'assigned' && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleAction('acknowledge')}
              >
                รับทราบ
              </Button>
            )}
            
            {task.assignment_status === 'in_progress' && (
              <>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleAction('update_progress')}
                >
                  อัปเดตความคืบหน้า
                </Button>
                <Button 
                  size="sm" 
                  variant="default"
                  onClick={() => handleAction('submit')}
                >
                  ส่งงาน
                </Button>
              </>
            )}

            {task.assignment_status === 'submitted' && userRole !== 'employee' && (
              <>
                <Button 
                  size="sm" 
                  variant="default"
                  onClick={() => handleAction('approve')}
                >
                  อนุมัติ
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleAction('request_revision')}
                >
                  ส่งกลับแก้ไข
                </Button>
              </>
            )}

            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => handleAction('view_details')}
            >
              ดูรายละเอียด
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}