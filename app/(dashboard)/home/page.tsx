"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AIAssistantPanel } from "@/components/ai/ai-assistant-panel"
import {
  Globe,
  Users,
  FileText,
  CheckCircle2,
  Clock,
  TrendingUp,
  Plane,
  GraduationCap,
  Award,
  ArrowRight,
  Sparkles,
  Calendar,
  Bell,
  LayoutDashboard,
  Monitor,
  PieChart,
  ClipboardCheck,
  AlertCircle,
  Smartphone,
} from "lucide-react"
import Link from "next/link"

// 我的待办事项（个人视角）
const myTasks = [
  { task: "待审核申请", count: 5, link: "/admin/review", urgent: true },
  { task: "待审核派出材料", count: 3, link: "/admin/dispatch-review", urgent: false },
  { task: "待审核学分兑换", count: 2, link: "/admin/credit-review", urgent: false },
]

// 近期项目动态
const recentActivities = [
  { time: "10分钟前", content: "王家瑞提交了C国交换生项目申请", type: "apply" },
  { time: "30分钟前", content: "G国H大学2026寒假项目新增2名报名学生", type: "register" },
  { time: "1小时前", content: "李明的派出材料已通过审核", type: "approve" },
  { time: "2小时前", content: "张三提交了3月学习报告", type: "report" },
]

// 快捷功能入口
const quickActions = [
  { label: "发布项目", icon: FileText, href: "/admin/projects/publish", color: "bg-blue-500" },
  { label: "参项审核", icon: ClipboardCheck, href: "/admin/review", color: "bg-green-500" },
  { label: "监控看板", icon: Monitor, href: "/dashboard/monitor", color: "bg-amber-500" },
  { label: "移动端预览", icon: Smartphone, href: "/mobile", color: "bg-rose-500" },
]

// 项目阶段概览
const phaseOverview = [
  { phase: "派出前", desc: "申请审核中", count: 45, color: "bg-blue-500", textColor: "text-blue-600" },
  { phase: "派出中", desc: "境外学习中", count: 42, color: "bg-amber-500", textColor: "text-amber-600" },
  { phase: "派出后", desc: "学分认定中", count: 28, color: "bg-green-500", textColor: "text-green-600" },
]

export default function DashboardPage() {
  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-none overflow-hidden relative">
          <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/4" />
          <CardContent className="pt-6 pb-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <LayoutDashboard className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary">首页工作台</span>
                </div>
                <h1 className="text-2xl font-bold text-foreground">欢迎回来，张五</h1>
                <p className="text-muted-foreground mt-1">
                  今日有 <span className="font-medium text-primary">10</span> 项待办事项需要处理
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">今日</p>
                  <p className="text-lg font-semibold">2026年4月2日</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{action.label}</p>
                    <p className="text-xs text-muted-foreground">点击进入</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* My Tasks & Phase Overview */}
        <div className="grid grid-cols-2 gap-4">
          {/* My Tasks */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                我的待办
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {myTasks.map((task, index) => (
                <Link key={index} href={task.link}>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-sm">{task.task}</span>
                      {task.urgent && (
                        <Badge variant="destructive" className="text-xs">紧急</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-sm font-bold">
                        {task.count}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              ))}
              <Link href="/dashboard/monitor">
                <Button variant="outline" className="w-full mt-2 gap-2">
                  <Monitor className="h-4 w-4" />
                  查看全部待办
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Phase Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                项目阶段概览
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {phaseOverview.map((phase, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-1 h-12 rounded-full ${phase.color}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-medium ${phase.textColor}`}>{phase.phase}</p>
                          <p className="text-xs text-muted-foreground">{phase.desc}</p>
                        </div>
                        <p className="text-2xl font-bold">{phase.count}<span className="text-sm font-normal text-muted-foreground ml-1">人</span></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">学生总数</span>
                  <span className="font-bold text-lg">115人</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                最近动态
              </CardTitle>
              <Button variant="ghost" size="sm">查看全部</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === "apply" ? "bg-blue-500" :
                    activity.type === "register" ? "bg-green-500" :
                    activity.type === "approve" ? "bg-purple-500" :
                    "bg-amber-500"
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">{activity.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Navigation Hint */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">系统导航提示</p>
                <p className="text-xs text-muted-foreground">
                  使用左侧菜单可快速访问各功能模块，点击"全流程监控看板"查看所有待办，点击"数据统计分析"查看报表
                </p>
              </div>
              <div className="flex gap-2">
                <Link href="/dashboard/monitor">
                  <Button size="sm" variant="outline">监控看板</Button>
                </Link>
                <Link href="/dashboard/analytics">
                  <Button size="sm" variant="outline">数据分析</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI工作助手" subtitle="个性化智能辅助">
        <div className="bg-muted rounded-lg p-3">
          <h4 className="text-sm font-medium mb-2">个人工作统计</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">本周审核数量</span>
              <span className="font-medium">28份</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">平均处理时间</span>
              <span className="font-medium">1.2天</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">按时完成率</span>
              <span className="font-medium text-green-600">96%</span>
            </div>
          </div>
        </div>
      </AIAssistantPanel>
    </div>
  )
}
