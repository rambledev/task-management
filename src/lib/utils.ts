// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ฟังก์ชันสำหรับคำนวณสถานะเวลา
export function calculateTimeStatus(dueDate: Date | null): 'on_time' | 'delayed' | 'overdue' {
  if (!dueDate) return 'on_time'
  
  const now = new Date()
  const timeDiff = dueDate.getTime() - now.getTime()
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
  
  if (daysDiff < 0) return 'overdue'
  if (daysDiff <= 1) return 'delayed'
  return 'on_time'
}

// ฟังก์ชันสำหรับแปลงสถานะเป็นภาษาไทย
export function getStatusLabel(status: string): string {
  const statusMap: Record<string, string> = {
    draft: "ยังไม่มอบหมาย",
    assigned: "มอบหมายงานแล้ว", 
    acknowledged: "รับทราบงานแล้ว",
    in_progress: "กำลังดำเนินการ",
    submitted: "ส่งงานแล้ว",
    revision_requested: "ต้องแก้ไข",
    revising: "กำลังแก้ไข",
    completed: "สิ้นสุด"
  }
  return statusMap[status] || status
}

export function getTimeStatusLabel(status: string): string {
  const statusMap: Record<string, string> = {
    on_time: "ปกติ",
    delayed: "ล่าช้า",
    overdue: "เกินกำหนด"
  }
  return statusMap[status] || status
}

export function getPriorityLabel(priority: string): string {
  const priorityMap: Record<string, string> = {
    low: "ต่ำ",
    medium: "ปานกลาง", 
    high: "สูง",
    urgent: "เร่งด่วน"
  }
  return priorityMap[priority] || priority
}

// ฟังก์ชันสำหรับสีของสถานะ
export function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    draft: "bg-gray-100 text-gray-800",
    assigned: "bg-blue-100 text-blue-800",
    acknowledged: "bg-purple-100 text-purple-800", 
    in_progress: "bg-yellow-100 text-yellow-800",
    submitted: "bg-orange-100 text-orange-800",
    revision_requested: "bg-red-100 text-red-800",
    revising: "bg-pink-100 text-pink-800",
    completed: "bg-green-100 text-green-800"
  }
  return colorMap[status] || "bg-gray-100 text-gray-800"
}

export function getTimeStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    on_time: "bg-green-100 text-green-800",
    delayed: "bg-yellow-100 text-yellow-800", 
    overdue: "bg-red-100 text-red-800"
  }
  return colorMap[status] || "bg-gray-100 text-gray-800"
}

export function getPriorityColor(priority: string): string {
  const colorMap: Record<string, string> = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-orange-100 text-orange-800", 
    urgent: "bg-red-100 text-red-800"
  }
  return colorMap[priority] || "bg-gray-100 text-gray-800"
}

// ฟังก์ชันสำหรับจัดรูปแบบวันที่
export function formatDate(date: Date | string | null): string {
  if (!date) return "-"
  const d = new Date(date)
  return d.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short', 
    day: 'numeric'
  })
}

export function formatDateTime(date: Date | string | null): string {
  if (!date) return "-"
  const d = new Date(date)
  return d.toLocaleString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}