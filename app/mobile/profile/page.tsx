"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  ArrowLeft,
  User,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Monitor,
  Moon,
  Smartphone,
  CheckCircle2,
  Clock
} from "lucide-react"

// 审批统计
const approvalStats = {
  today: 5,
  week: 23,
  month: 89,
  total: 456
}

export default function MobileProfilePage() {
  const router = useRouter()

  const menuItems = [
    {
      icon: Bell,
      label: "消息通知设置",
      description: "管理推送通知偏好",
      href: "/mobile/profile/notifications"
    },
    {
      icon: Shield,
      label: "账号与安全",
      description: "密码、登录设备管理",
      href: "/mobile/profile/security"
    },
    {
      icon: Monitor,
      label: "同步到PC端",
      description: "查看PC端登录状态",
      badge: "已同步"
    },
    {
      icon: HelpCircle,
      label: "帮助与反馈",
      description: "常见问题、意见反馈",
      href: "/mobile/profile/help"
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white px-4 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16 border-2 border-white/30">
            <AvatarFallback className="bg-white/20 text-white text-xl">张</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold">张老师</h1>
            <p className="text-white/80 text-sm">国际交流处 · 审核专员</p>
            <Badge className="mt-1 bg-white/20 text-white text-xs">
              在线
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <Card className="bg-white/10 backdrop-blur border-0 text-white">
          <CardContent className="p-4">
            <p className="text-white/80 text-sm mb-3">审批统计</p>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{approvalStats.today}</p>
                <p className="text-xs text-white/70">今日</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{approvalStats.week}</p>
                <p className="text-xs text-white/70">本周</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{approvalStats.month}</p>
                <p className="text-xs text-white/70">本月</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{approvalStats.total}</p>
                <p className="text-xs text-white/70">累计</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Cards */}
      <div className="px-4 -mt-4 grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">98%</p>
              <p className="text-xs text-muted-foreground">审批通过率</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">0.5h</p>
              <p className="text-xs text-muted-foreground">平均响应</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Menu List */}
      <div className="px-4 mt-4 space-y-3">
        <Card>
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <div 
                key={item.label}
                className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 ${
                  index !== menuItems.length - 1 ? "border-b" : ""
                }`}
                onClick={() => item.href && router.push(item.href)}
              >
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                {item.badge ? (
                  <Badge variant="secondary" className="text-xs">{item.badge}</Badge>
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Theme Toggle */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <Moon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">深色模式</p>
                  <p className="text-xs text-muted-foreground">减少夜间使用时的眼睛疲劳</p>
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Device Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">当前设备</p>
                <p className="text-xs text-muted-foreground">iPhone · 微信公众号</p>
              </div>
              <Badge className="bg-green-100 text-green-700 text-xs">实时同步</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
          <LogOut className="h-4 w-4 mr-2" />
          退出登录
        </Button>
      </div>

      {/* Version */}
      <div className="text-center py-6 text-xs text-muted-foreground">
        <p>高校出国交流项目管理系统</p>
        <p>移动端 V1.0.0</p>
      </div>
    </div>
  )
}
