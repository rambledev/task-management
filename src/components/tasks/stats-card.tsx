// src/components/dashboard/stats-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: "green" | "red" | "blue" | "yellow" | "purple" | "gray"
  className?: string
}

const colorClasses = {
  green: {
    icon: "text-green-600 bg-green-100",
    trend: "text-green-600",
  },
  red: {
    icon: "text-red-600 bg-red-100", 
    trend: "text-red-600",
  },
  blue: {
    icon: "text-blue-600 bg-blue-100",
    trend: "text-blue-600", 
  },
  yellow: {
    icon: "text-yellow-600 bg-yellow-100",
    trend: "text-yellow-600",
  },
  purple: {
    icon: "text-purple-600 bg-purple-100",
    trend: "text-purple-600",
  },
  gray: {
    icon: "text-gray-600 bg-gray-100",
    trend: "text-gray-600",
  }
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  color = "green",
  className 
}: StatsCardProps) {
  const colors = colorClasses[color]

  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-lg", colors.icon)}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {value}
        </div>
        {description && (
          <p className="text-xs text-gray-600 mb-1">
            {description}
          </p>
        )}
        {trend && (
          <p className={cn(
            "text-xs flex items-center gap-1",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}>
            <span>{trend.isPositive ? "↗" : "↘"}</span>
            {Math.abs(trend.value)}% จากเดือนที่แล้ว
          </p>
        )}
      </CardContent>
    </Card>
  )
}