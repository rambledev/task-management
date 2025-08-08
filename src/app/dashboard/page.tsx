// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DirectorDashboard } from "@/components/dashboard/director-dashboard"
import { HeaderDashboard } from "@/components/dashboard/header-dashboard"
import { EmployeeDashboard } from "@/components/dashboard/employee-dashboard"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const userRole = session.user?.role

  const renderDashboardByRole = () => {
    switch (userRole) {
      case "director":
        return <DirectorDashboard />
      case "header":
        return <HeaderDashboard />
      case "employee":
        return <EmployeeDashboard />
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ไม่พบบทบาทผู้ใช้
              </h2>
              <p className="text-gray-600">
                กรุณาติดต่อผู้ดูแลระบบเพื่อกำหนดบทบาทให้กับบัญชีของคุณ
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <DashboardLayout>
      {renderDashboardByRole()}
    </DashboardLayout>
  )
}