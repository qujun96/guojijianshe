"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, ClipboardList, Bell, User } from "lucide-react"

export default function MobileLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { href: "/mobile", icon: Home, label: "工作台" },
    { href: "/mobile/tasks", icon: ClipboardList, label: "待办" },
    { href: "/mobile/notifications", icon: Bell, label: "消息" },
    { href: "/mobile/profile", icon: User, label: "我的" },
  ]

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Main Content */}
      <main className="max-w-lg mx-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/mobile" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
                {item.label === "待办" && (
                  <span className="absolute top-2 right-1/2 translate-x-6 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    5
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
