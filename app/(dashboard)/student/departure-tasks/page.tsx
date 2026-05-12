"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertTriangle,
  FileText,
  UserCog,
  CreditCard,
  Building2,
  BookOpen,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Info
} from "lucide-react"
import Link from "next/link"

interface Task {
  id: string
  name: string
  description: string
  status: "completed" | "in_progress" | "pending" | "blocked"
  department: string
  icon: React.ReactNode
  action?: string
  actionLink?: string
  externalSystem?: string
  required: boolean
}

const tasks: Task[] = [
  {
    id: "1",
    name: "项目申请审批",
    description: "完成国际化项目申请并通过审批",
    status: "completed",
    department: "国际处",
    icon: <FileText className="h-5 w-5" />,
    required: true,
  },
  {
    id: "2",
    name: "导师签字确认",
    description: "获取校内导师对派出学习的书面同意",
    status: "completed",
    department: "所在学院",
    icon: <BookOpen className="h-5 w-5" />,
    required: true,
  },
  {
    id: "3",
    name: "学籍异动办理",
    description: "办理保留学籍/休学等学籍异动手续",
    status: "in_progress",
    department: "本科生院/研究生院",
    icon: <UserCog className="h-5 w-5" />,
    action: "办理学籍异动",
    actionLink: "/student/enrollment-change",
    required: true,
  },
  {
    id: "4",
    name: "财务结算确认",
    description: "确认学费、住宿费等财务事项已结清",
    status: "pending",
    department: "财务处",
    icon: <CreditCard className="h-5 w-5" />,
    action: "前往办理",
    externalSystem: "财务管理系统",
    required: true,
  },
  {
    id: "5",
    name: "宿舍退宿办理",
    description: "办理宿舍退宿或保留床位手续",
    status: "pending",
    department: "后勤集团",
    icon: <Building2 className="h-5 w-5" />,
    action: "前往办理",
    externalSystem: "宿舍管理系统",
    required: true,
  },
  {
    id: "6",
    name: "图书馆结清",
    description: "确认图书馆借阅书籍已归还、无欠款",
    status: "completed",
    department: "图书馆",
    icon: <BookOpen className="h-5 w-5" />,
    required: false,
  },
]

function getStatusConfig(status: Task["status"]) {
  switch (status) {
    case "completed":
      return { 
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, 
        label: "已完成", 
        color: "bg-green-100 text-green-700",
        borderColor: "border-l-green-500"
      }
    case "in_progress":
      return { 
        icon: <Clock className="h-5 w-5 text-amber-500" />, 
        label: "进行中", 
        color: "bg-amber-100 text-amber-700",
        borderColor: "border-l-amber-500"
      }
    case "pending":
      return { 
        icon: <Circle className="h-5 w-5 text-muted-foreground" />, 
        label: "待办理", 
        color: "bg-muted text-muted-foreground",
        borderColor: "border-l-muted-foreground"
      }
    case "blocked":
      return { 
        icon: <AlertTriangle className="h-5 w-5 text-red-500" />, 
        label: "受阻", 
        color: "bg-red-100 text-red-700",
        borderColor: "border-l-red-500"
      }
  }
}

export default function DepartureTasksPage() {
  const completedCount = tasks.filter(t => t.status === "completed").length
  const progress = (completedCount / tasks.length) * 100
  const currentStudent = {
    name: "张三",
    studentId: "2022010001",
    type: "本科生",
    college: "计算机科学与技术学院",
    project: "2026年《A国B国人才培养计划》1+2+1双学位项目"
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-6">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">离校任务清单</h1>
          <p className="text-muted-foreground mt-1">完成以下任务后方可正式派出</p>
        </div>

        {/* 进度概览 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">离校办理进度</h3>
                <p className="text-sm text-muted-foreground">已完成 {completedCount}/{tasks.length} 项任务</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">{Math.round(progress)}%</span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>开始办理</span>
              <span>完成离校</span>
            </div>
          </CardContent>
        </Card>

        {/* 学生信息 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">{currentStudent.name[0]}</span>
                </div>
                <div>
                  <div className="font-medium">{currentStudent.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {currentStudent.studentId} | {currentStudent.type} | {currentStudent.college}
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="text-primary border-primary">
                {currentStudent.type === "本科生" ? "本科生院" : "研究生院"}
              </Badge>
            </div>
            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground">参与项目</div>
              <div className="font-medium">{currentStudent.project}</div>
            </div>
          </CardContent>
        </Card>

        {/* 任务列表 */}
        <div className="space-y-3">
          {tasks.map((task, index) => {
            const statusConfig = getStatusConfig(task.status)
            return (
              <Card 
                key={task.id} 
                className={`border-l-4 ${statusConfig.borderColor} transition-all hover:shadow-md`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {task.icon}
                        <h4 className="font-medium">{task.name}</h4>
                        {task.required && (
                          <Badge variant="destructive" className="text-xs h-5">必办</Badge>
                        )}
                        <Badge className={`text-xs h-5 ${statusConfig.color}`}>
                          {statusConfig.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          办理部门: {task.department}
                        </span>
                        {task.action && (
                          task.actionLink ? (
                            <Link href={task.actionLink}>
                              <Button size="sm" className="h-7 gap-1">
                                {task.action}
                                <ArrowRight className="h-3 w-3" />
                              </Button>
                            </Link>
                          ) : (
                            <Button size="sm" variant="outline" className="h-7 gap-1">
                              {task.action}
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          )
                        )}
                      </div>
                      {task.externalSystem && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                          <Info className="h-3 w-3" />
                          <span>将跳转至: {task.externalSystem}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      {statusConfig.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 完成离校按钮 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">完成离校派出</h4>
                <p className="text-sm text-muted-foreground">
                  {progress === 100 
                    ? "所有任务已完成，可以提交离校确认" 
                    : "请完成所有必办任务后提交"}
                </p>
              </div>
              <Button disabled={progress < 100} className="gap-2">
                提交离校确认
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 右侧AI助手面板 */}
      <div className="w-72 shrink-0">
        <Card className="sticky top-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-white">AI离校助手</CardTitle>
                <p className="text-xs text-slate-400">智能引导离校流程</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 当前步骤提示 */}
            <div className="p-3 bg-white/10 rounded-lg">
              <div className="text-xs text-cyan-400 mb-1">当前任务</div>
              <div className="text-sm font-medium">学籍异动办理</div>
              <p className="text-xs text-slate-300 mt-1">
                根据您的学生身份（本科生），请前往本科生院系统办理保留学籍手续
              </p>
            </div>

            {/* 智能提醒 */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400">智能提醒</div>
              <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <div className="text-xs text-amber-200">
                    学籍异动办理需要导师签字，请提前联系导师确认
                  </div>
                </div>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                  <div className="text-xs text-blue-200">
                    财务结算可能需要2-3个工作日，建议尽早办理
                  </div>
                </div>
              </div>
            </div>

            {/* 流程时间轴 */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400">流程预览</div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-slate-300">查看离校清单</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-400" />
                  <span className="text-xs text-white font-medium">办理学籍异动</span>
                </div>
                <div className="flex items-center gap-2">
                  <Circle className="h-4 w-4 text-slate-500" />
                  <span className="text-xs text-slate-400">完成离校任务</span>
                </div>
                <div className="flex items-center gap-2">
                  <Circle className="h-4 w-4 text-slate-500" />
                  <span className="text-xs text-slate-400">填写在外情况</span>
                </div>
              </div>
            </div>

            {/* 预计完成时间 */}
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="text-xs text-slate-400 mb-1">预计完成时间</div>
              <div className="text-lg font-semibold text-white">3-5 个工作日</div>
              <p className="text-xs text-slate-400 mt-1">
                基于历史数据智能预估
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
