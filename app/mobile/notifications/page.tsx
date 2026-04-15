"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Bell,
  ClipboardCheck,
  AlertCircle,
  CheckCircle2,
  Clock,
  Trash2,
  Settings
} from "lucide-react"

// 通知数据
const notifications = [
  {
    id: 1,
    type: "task",
    title: "新的审批任务",
    content: "您有3个新的申请待审核，来自韩国忠南大学交换项目",
    time: "10分钟前",
    unread: true,
    link: "/mobile/tasks"
  },
  {
    id: 2,
    type: "reminder",
    title: "审批超时提醒",
    content: "赵六的派出材料已等待审核3天，请尽快处理",
    time: "30分钟前",
    unread: true,
    link: "/mobile/tasks/4"
  },
  {
    id: 3,
    type: "system",
    title: "系统通知",
    content: "2026年春季学期交流项目申请已开放",
    time: "2小时前",
    unread: false,
  },
  {
    id: 4,
    type: "task",
    title: "审批任务完成",
    content: "李明的申请审核已由您通过",
    time: "3小时前",
    unread: false,
  },
  {
    id: 5,
    type: "reminder",
    title: "材料截止提醒",
    content: "韩国忠南大学项目材料提交截止日期还有7天",
    time: "昨天",
    unread: false,
  },
  {
    id: 6,
    type: "system",
    title: "系统更新",
    content: "移动端审批功能已上线，支持语音输入审批意见",
    time: "2天前",
    unread: false,
  },
]

export default function MobileNotificationsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [notificationList, setNotificationList] = useState(notifications)

  const filteredNotifications = notificationList.filter(n => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return n.unread
    return n.type === activeTab
  })

  const unreadCount = notificationList.filter(n => n.unread).length

  const markAllRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, unread: false })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "task": return <ClipboardCheck className="h-5 w-5 text-primary" />
      case "reminder": return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "system": return <Bell className="h-5 w-5 text-slate-500" />
      default: return <Bell className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold">消息通知</h1>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="h-5 px-1.5">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllRead}>
                全部已读
              </Button>
            )}
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 pb-3">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="unread">未读</TabsTrigger>
            <TabsTrigger value="task">任务</TabsTrigger>
            <TabsTrigger value="reminder">提醒</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Notification List */}
      <div className="px-4 py-4 space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>暂无{activeTab === "unread" ? "未读" : ""}消息</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <Card 
              key={notification.id}
              className={`cursor-pointer transition-colors hover:bg-slate-50 ${
                notification.unread ? "border-l-4 border-l-primary" : ""
              }`}
              onClick={() => {
                if (notification.link) {
                  router.push(notification.link)
                }
                setNotificationList(prev => 
                  prev.map(n => n.id === notification.id ? { ...n, unread: false } : n)
                )
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notification.type === "task" ? "bg-primary/10" :
                    notification.type === "reminder" ? "bg-amber-100" :
                    "bg-slate-100"
                  }`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`font-medium text-sm ${notification.unread ? "" : "text-muted-foreground"}`}>
                        {notification.title}
                      </p>
                      {notification.unread && (
                        <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notification.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {notification.time}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
