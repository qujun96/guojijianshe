"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  ClipboardCheck, 
  FileText, 
  GraduationCap, 
  BookOpen,
  ChevronRight,
  Bell,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

// 待办统计数据
const todoStats = [
  { label: "申请审核", count: 3, icon: ClipboardCheck, color: "bg-blue-500", href: "/mobile/tasks?type=application" },
  { label: "材料审核", count: 1, icon: FileText, color: "bg-amber-500", href: "/mobile/tasks?type=material" },
  { label: "学分审核", count: 1, icon: GraduationCap, color: "bg-green-500", href: "/mobile/tasks?type=credit" },
  { label: "报告审核", count: 0, icon: BookOpen, color: "bg-purple-500", href: "/mobile/tasks?type=report" },
]

// 最近审批记录
const recentApprovals = [
  { 
    id: 1, 
    studentName: "张三", 
    type: "申请审核",
    project: "A国B大学交换项目",
    status: "approved",
    time: "10分钟前"
  },
  { 
    id: 2, 
    studentName: "李四", 
    type: "材料审核",
    project: "C国T大学暑期项目",
    status: "rejected",
    time: "1小时前"
  },
  { 
    id: 3, 
    studentName: "王五", 
    type: "学分审核",
    project: "A国某大学交换项目",
    status: "approved",
    time: "2小时前"
  },
]

// 系统通知
const notifications = [
  { id: 1, title: "新的审批任务", content: "您有3个新的申请待审核", time: "刚刚", unread: true },
  { id: 2, title: "审批提醒", content: "赵六的派出材料已超时2天未审核", time: "30分钟前", unread: true },
]

export default function MobileHomePage() {
  const totalTodo = todoStats.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white px-4 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm">下午好</p>
            <h1 className="text-xl font-semibold">管理员</h1>
          </div>
          <Link href="/mobile/notifications" className="relative">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[10px] rounded-full flex items-center justify-center">
              2
            </span>
          </Link>
        </div>

        {/* 待办总览卡片 */}
        <Card className="bg-white/10 backdrop-blur border-0 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">待处理事项</p>
                <p className="text-3xl font-bold mt-1">{totalTodo}</p>
              </div>
              <Link 
                href="/mobile/tasks"
                className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1.5 rounded-full"
              >
                查看全部
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 快捷入口 */}
      <div className="px-4 -mt-4">
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-4">
              {todoStats.map((item) => (
                <Link 
                  key={item.label}
                  href={item.href}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center relative`}>
                    <item.icon className="h-6 w-6 text-white" />
                    {item.count > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                        {item.count}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 系统通知 */}
      {notifications.filter(n => n.unread).length > 0 && (
        <div className="px-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium">系统通知</h2>
            <Link href="/mobile/notifications" className="text-xs text-primary">
              查看全部
            </Link>
          </div>
          <div className="space-y-2">
            {notifications.filter(n => n.unread).map((notification) => (
              <Card key={notification.id} className="border-l-4 border-l-primary">
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{notification.content}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground flex-shrink-0">{notification.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 最近审批 */}
      <div className="px-4 mt-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium">最近审批</h2>
          <span className="text-xs text-muted-foreground">今日已处理 5 项</span>
        </div>
        <div className="space-y-2">
          {recentApprovals.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {item.studentName.slice(-2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{item.studentName}</span>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        {item.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {item.project}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {item.status === "approved" ? (
                      <Badge className="bg-green-100 text-green-700 text-[10px] gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        已通过
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 text-[10px] gap-1">
                        <AlertCircle className="h-3 w-3" />
                        已退回
                      </Badge>
                    )}
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.time}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
