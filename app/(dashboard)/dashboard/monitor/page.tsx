"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Monitor,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Users,
  FileText,
  ArrowRight,
  Search,
  Filter,
  RefreshCw,
  Sparkles,
  Bell,
  TrendingUp,
  Calendar,
  Building2,
  Plane,
  GraduationCap,
  Send,
  Timer,
} from "lucide-react"
import { AIAssistantPanel } from "@/components/ai/ai-assistant-panel"

// 待办事项数据 - 按阶段分类
const todoItems = [
  { id: "1", type: "review", title: "王家瑞 - (亚洲地区)2026年秋季学期第三批交换生项目", department: "美视电影学院", status: "pending", deadline: "2026-04-05", daysLeft: 3, overdue: false, phase: "pre", handler: "李老师" },
  { id: "2", type: "review", title: "李明 - 剑桥大学2026寒假项目", department: "计算机学院", status: "pending", deadline: "2026-04-03", daysLeft: -1, overdue: true, phase: "pre", handler: "王老师" },
  { id: "3", type: "dispatch", title: "张三 - 保留学籍材料审核", department: "新闻传播学院", status: "pending", deadline: "2026-04-06", daysLeft: 4, overdue: false, phase: "during", handler: "张老师" },
  { id: "4", type: "report", title: "赵六 - 3月学习报告待查看", department: "管理学院", status: "pending", deadline: "2026-04-08", daysLeft: 6, overdue: false, phase: "during", handler: "刘老师" },
  { id: "5", type: "grades", title: "王五 - 海外成绩单审核", department: "法学院", status: "pending", deadline: "2026-04-04", daysLeft: -2, overdue: true, phase: "post", handler: "陈老师" },
  { id: "6", type: "credit", title: "周八 - 学分兑换申请审核", department: "经济学院", status: "pending", deadline: "2026-04-07", daysLeft: 5, overdue: false, phase: "post", handler: "李老师" },
]

// 超时节点统计
const timeoutStats = [
  { stage: "派出前-申请审核", count: 2, avgDelay: "1.5天", handler: "国际处" },
  { stage: "派出中-材料审核", count: 1, avgDelay: "2天", handler: "学院" },
  { stage: "派出后-成绩审核", count: 1, avgDelay: "3天", handler: "教务处" },
]

// 部门待办分布
const departmentTodos = [
  { name: "国际处", pre: 8, during: 5, post: 3, total: 16 },
  { name: "本科生院", pre: 4, during: 2, post: 5, total: 11 },
  { name: "研究生院", pre: 3, during: 3, post: 2, total: 8 },
  { name: "计算机学院", pre: 5, during: 2, post: 1, total: 8 },
  { name: "新闻传播学院", pre: 3, during: 4, post: 2, total: 9 },
]

// 审批效率趋势（按阶段）
const efficiencyByPhase = [
  { phase: "派出前", avgDays: 2.1, target: 3, status: "good" },
  { phase: "派出中", avgDays: 1.5, target: 2, status: "good" },
  { phase: "派出后", avgDays: 3.2, target: 3, status: "warning" },
]

export default function MonitorDashboardPage() {
  const [department, setDepartment] = useState("")
  const [projectType, setProjectType] = useState("")
  const [timeRange, setTimeRange] = useState("month")
  const [phase, setPhase] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "pre": return "bg-blue-100 text-blue-700 border-blue-300"
      case "during": return "bg-amber-100 text-amber-700 border-amber-300"
      case "post": return "bg-green-100 text-green-700 border-green-300"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case "pre": return "派出前"
      case "during": return "派出中"
      case "post": return "派出后"
      default: return ""
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "review": return "申请审核"
      case "dispatch": return "派出材料"
      case "report": return "学习报告"
      case "grades": return "成绩审核"
      case "credit": return "学分兑换"
      default: return "待处理"
    }
  }

  const getActionLink = (item: typeof todoItems[0]) => {
    switch (item.type) {
      case "review": return `/admin/review/${item.id}`
      case "dispatch": return `/admin/dispatch-review`
      case "report": return `/admin/reports-view`
      case "grades": return `/admin/grades-review`
      case "credit": return `/admin/credit-review`
      default: return "#"
    }
  }

  const pendingCount = todoItems.filter(i => !i.overdue).length
  const overdueCount = todoItems.filter(i => i.overdue).length

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Monitor className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">全流程监控看板</h1>
              <p className="text-sm text-muted-foreground">实时监控审批进度，一站式督办管理</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              刷新
            </Button>
            <Button size="sm" className="gap-2 bg-red-500 hover:bg-red-600" disabled={selectedItems.length === 0}>
              <Send className="h-4 w-4" />
              批量催办 ({selectedItems.length})
            </Button>
          </div>
        </div>

        {/* Summary Cards - 聚焦待办和超时 */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">待处理事项</p>
                  <p className="text-3xl font-bold text-amber-600">{pendingCount + overdueCount}</p>
                </div>
                <Clock className="h-8 w-8 text-amber-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">已超时</p>
                  <p className="text-3xl font-bold text-red-600">{overdueCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500/50" />
              </div>
              <p className="text-xs text-red-500 mt-1">需紧急处理</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">今日新增</p>
                  <p className="text-3xl font-bold text-blue-600">8</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">今日完成</p>
                  <p className="text-3xl font-bold text-green-600">12</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500/50" />
              </div>
              <p className="text-xs text-green-500 mt-1">完成率 92%</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">筛选：</span>
              </div>
              <Select value={phase} onValueChange={setPhase}>
                <SelectTrigger className="w-28 h-9">
                  <SelectValue placeholder="阶段" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部阶段</SelectItem>
                  <SelectItem value="pre">派出前</SelectItem>
                  <SelectItem value="during">派出中</SelectItem>
                  <SelectItem value="post">派出后</SelectItem>
                </SelectContent>
              </Select>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-36 h-9">
                  <SelectValue placeholder="责任部门" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部部门</SelectItem>
                  <SelectItem value="international">国际处</SelectItem>
                  <SelectItem value="undergrad">本科生院</SelectItem>
                  <SelectItem value="grad">研究生院</SelectItem>
                  <SelectItem value="college">学院</SelectItem>
                </SelectContent>
              </Select>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-28 h-9">
                  <SelectValue placeholder="时间" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">今日</SelectItem>
                  <SelectItem value="week">本周</SelectItem>
                  <SelectItem value="month">本月</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索学生姓名、项目名称..." className="pl-9 h-9" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Todo List - Core Function */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                待办事项清单
                <Badge variant="secondary" className="ml-2">{todoItems.length} 项</Badge>
              </CardTitle>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> 派出前</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> 派出中</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> 派出后</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      checked={selectedItems.length === todoItems.length}
                      onCheckedChange={(checked) => {
                        setSelectedItems(checked ? todoItems.map(i => i.id) : [])
                      }}
                    />
                  </TableHead>
                  <TableHead>阶段</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead className="w-[35%]">事项内容</TableHead>
                  <TableHead>责任人</TableHead>
                  <TableHead>剩余时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todoItems.map((item) => (
                  <TableRow key={item.id} className={item.overdue ? "bg-red-50/50" : ""}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => {
                          setSelectedItems(checked 
                            ? [...selectedItems, item.id]
                            : selectedItems.filter(id => id !== item.id)
                          )
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPhaseColor(item.phase)}>
                        {getPhaseLabel(item.phase)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{getTypeLabel(item.type)}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Building2 className="h-3 w-3" />
                          {item.department}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{item.handler}</span>
                    </TableCell>
                    <TableCell>
                      {item.overdue ? (
                        <div className="flex items-center gap-1 text-red-600">
                          <AlertTriangle className="h-3 w-3" />
                          <span className="text-sm font-medium">超时{Math.abs(item.daysLeft)}天</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Timer className="h-3 w-3 text-muted-foreground" />
                          <span className={`text-sm ${item.daysLeft <= 2 ? "text-amber-600 font-medium" : ""}`}>
                            {item.daysLeft}天
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={getActionLink(item)}>
                        <Button size="sm" variant={item.overdue ? "destructive" : "default"} className="gap-1">
                          去处理
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-4">
          {/* Timeout Alert */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                超时节点分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {timeoutStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{stat.stage}</p>
                      <p className="text-xs text-muted-foreground">责任部门：{stat.handler}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive">{stat.count}项超时</Badge>
                      <p className="text-xs text-red-600 mt-1">平均延迟 {stat.avgDelay}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Department Distribution */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                部门待办分布
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {departmentTodos.slice(0, 4).map((dept) => (
                  <div key={dept.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{dept.name}</span>
                      <span className="text-muted-foreground">{dept.total}项待办</span>
                    </div>
                    <div className="flex gap-0.5 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500" style={{ width: `${(dept.pre / dept.total) * 100}%` }} />
                      <div className="bg-amber-500" style={{ width: `${(dept.during / dept.total) * 100}%` }} />
                      <div className="bg-green-500" style={{ width: `${(dept.post / dept.total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> 派出前</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> 派出中</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> 派出后</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Efficiency by Phase */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              各阶段审批效率
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              {efficiencyByPhase.map((item) => (
                <div key={item.phase} className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">{item.phase}</p>
                  <p className={`text-3xl font-bold ${item.status === "good" ? "text-green-600" : "text-amber-600"}`}>
                    {item.avgDays}<span className="text-sm font-normal">天</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">目标: {item.target}天内</p>
                  {item.status === "good" ? (
                    <Badge className="mt-2 bg-green-100 text-green-700">达标</Badge>
                  ) : (
                    <Badge className="mt-2 bg-amber-100 text-amber-700">需改进</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI督办助手" subtitle="智能催办与效率分析">
        <div className="bg-muted rounded-lg p-3">
          <h4 className="text-sm font-medium mb-2">本周效率趋势</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">平均处理时间</span>
              <span className="font-medium text-green-600">1.8天 (-0.3)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">按时完成率</span>
              <span className="font-medium">92%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">超时事项数</span>
              <span className="font-medium text-red-600">7项</span>
            </div>
          </div>
        </div>
      </AIAssistantPanel>
    </div>
  )
}
