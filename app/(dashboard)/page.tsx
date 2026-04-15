"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RootPage() {
  const router = useRouter()
  
  useEffect(() => {
    // 检查登录状态，未登录跳转到登录页
    const isLoggedIn = typeof window !== "undefined" && sessionStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.replace("/login")
    } else {
      router.replace("/home")
    }
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">正在跳转...</p>
      </div>
    </div>
  )
}
