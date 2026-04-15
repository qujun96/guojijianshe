import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppHeader } from "@/components/layout/app-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="ml-56">
        <AppHeader />
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  )
}
