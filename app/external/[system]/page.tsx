"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Loader2, BookOpen, GraduationCap, Shield } from "lucide-react"

const systemInfo: Record<string, {
  name: string
  description: string
  icon: React.ReactNode
  color: string
  features: string[]
}> = {
  undergraduate: {
    name: "本科生院教务系统",
    description: "本科生教务管理、学籍管理、课程选修、成绩查询等服务",
    icon: <BookOpen className="h-8 w-8" />,
    color: "from-emerald-500 to-teal-600",
    features: ["学籍管理", "选课系统", "成绩查询", "培养方案", "学业预警"],
  },
  graduate: {
    name: "研究生院管理系统",
    description: "研究生培养、学位申请、论文管理、导师管理等服务",
    icon: <GraduationCap className="h-8 w-8" />,
    color: "from-purple-500 to-indigo-600",
    features: ["培养管理", "学位申请", "论文系统", "导师互选", "开题答辩"],
  },
  unified: {
    name: "统一身份认证系统",
    description: "校园一卡通服务、单点登录、身份验证、权限管理等",
    icon: <Shield className="h-8 w-8" />,
    color: "from-amber-500 to-orange-600",
    features: ["身份认证", "单点登录", "一卡通服务", "权限管理", "安全设置"],
  },
}

export default function ExternalSystemPage() {
  const params = useParams()
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const systemKey = params.system as string
  const system = systemInfo[systemKey]

  useEffect(() => {
    if (!system) {
      router.push("/login")
      return
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsRedirecting(true)
          // In real scenario, redirect to actual external system
          // window.location.href = "https://external-system-url.edu.cn"
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [system, router])

  if (!system) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
          {/* Header */}
          <div className={`bg-gradient-to-r ${system.color} p-8 text-white`}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                {system.icon}
              </div>
              <div>
                <h1 className="text-xl font-bold">{system.name}</h1>
                <p className="text-sm text-white/80 mt-1">{system.description}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Redirect Status */}
            <div className="text-center mb-8">
              {isRedirecting ? (
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-12 w-12 text-primary animate-spin" />
                  <p className="text-lg font-medium text-slate-900">正在跳转至外部系统...</p>
                  <p className="text-sm text-muted-foreground">
                    请稍候，系统正在为您建立安全连接
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">{countdown}</span>
                  </div>
                  <p className="text-lg font-medium text-slate-900">
                    即将跳转至 {system.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {countdown} 秒后自动跳转，或点击下方按钮立即前往
                  </p>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              <p className="text-sm font-medium text-slate-700 mb-3">该系统提供以下服务：</p>
              <div className="flex flex-wrap gap-2">
                {system.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-card rounded-full text-xs font-medium text-slate-600 border border-border"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-11"
                onClick={() => router.push("/login")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回登录
              </Button>
              <Button
                className="flex-1 h-11"
                onClick={() => setIsRedirecting(true)}
                disabled={isRedirecting}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                立即前往
              </Button>
            </div>

            {/* Notice */}
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-xs text-amber-800">
                <strong>温馨提示：</strong>您即将离开统一服务门户，跳转至独立业务系统。
                如需返回，请使用浏览器后退按钮或重新访问门户首页。
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>高校统一服务门户 - 安全跳转服务</p>
        </div>
      </div>
    </div>
  )
}
