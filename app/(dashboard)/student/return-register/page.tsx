"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { 
  Sparkles,
  Plane,
  CheckCircle2,
  Clock,
  Calendar as CalendarIcon,
  Upload,
  Home,
  ArrowRight,
  FileText,
  RefreshCcw,
  GraduationCap,
  FileArchive
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

interface ReturnTask {
  id: string
  name: string
  description: string
  status: "completed" | "current" | "pending"
  href: string
  icon: React.ReactNode
}

const returnTasks: ReturnTask[] = [
  {
    id: "1",
    name: "回国线上报到",
    description: "确认已安全回国并登记相关信息",
    status: "current",
    href: "/student/return-register",
    icon: <Home className="h-5 w-5" />
  },
  {
    id: "2",
    name: "恢复学籍办理",
    description: "在本科生院/研究生院办理学籍恢复手续",
    status: "pending",
    href: "/student/enrollment-restore",
    icon: <RefreshCcw className="h-5 w-5" />
  },
  {
    id: "3",
    name: "学分兑换申请",
    description: "上传境外成绩单，申请课程学分兑换",
    status: "pending",
    href: "/student/credit-transfer",
    icon: <GraduationCap className="h-5 w-5" />
  },
  {
    id: "4",
    name: "总结报告提交",
    description: "撰写并提交留学总结报告",
    status: "pending",
    href: "/student/summary-report",
    icon: <FileText className="h-5 w-5" />
  },
  {
    id: "5",
    name: "电子归档",
    description: "完成材料归档，结束留学流程",
    status: "pending",
    href: "/student/archive",
    icon: <FileArchive className="h-5 w-5" />
  }
]

export default function ReturnRegisterPage() {
  const [returnDate, setReturnDate] = useState<Date>()
  const [submitted, setSubmitted] = useState(false)

  const completedCount = returnTasks.filter(t => t.status === "completed").length
  const progress = ((completedCount + 0.5) / returnTasks.length) * 100

  const projectInfo = {
    name: "2026年《中美人才培养计划》1+2+1双学位项目",
    targetSchool: "美国特洛伊大学",
    departureDate: "2026-09-01",
    returnDate: "2028-06-30",
    duration: "22个月"
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-6">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">回国线上报到</h1>
          <p className="text-muted-foreground mt-1">欢迎回国！请完成回国报到登记</p>
        </div>

        {/* 回国事务办理进度 */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-green-900">回国事务办理进度</h3>
                <p className="text-sm text-green-700">完成所有任务后即可正式复学</p>
              </div>
              <Badge className="bg-green-500">派出后阶段</Badge>
            </div>
            <Progress value={progress} className="h-2 mb-4" />
            
            {/* 流程步骤 */}
            <div className="flex justify-between">
              {returnTasks.map((task, index) => (
                <div key={task.id} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    task.status === "completed" ? "bg-green-500 text-white" :
                    task.status === "current" ? "bg-green-500 text-white ring-4 ring-green-200" :
                    "bg-gray-200 text-gray-500"
                  }`}>
                    {task.status === "completed" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  <span className={`text-xs mt-1 max-w-[60px] text-center ${
                    task.status === "current" ? "text-green-700 font-medium" : "text-gray-500"
                  }`}>
                    {task.name.substring(0, 4)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 项目信息 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Plane className="h-4 w-4" />
              派出项目信息
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground text-sm">项目名称</Label>
                <div className="font-medium">{projectInfo.name}</div>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">留学学校</Label>
                <div className="font-medium">{projectInfo.targetSchool}</div>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">派出日期</Label>
                <div className="font-medium">{projectInfo.departureDate}</div>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">计划回国日期</Label>
                <div className="font-medium">{projectInfo.returnDate}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 回国信息填写 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">回国信息登记</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>实际回国日期 <span className="text-destructive">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "PPP", { locale: zhCN }) : "选择日期"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>入境口岸 <span className="text-destructive">*</span></Label>
                <Input placeholder="如：北京首都国际机场" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>当前联系电话 <span className="text-destructive">*</span></Label>
                <Input placeholder="请输入国内手机号" />
              </div>
              <div className="space-y-2">
                <Label>当前住址 <span className="text-destructive">*</span></Label>
                <Input placeholder="请输入当前住址" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>健康状况 <span className="text-destructive">*</span></Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="health" className="accent-primary" defaultChecked />
                  <span>健康良好</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="health" className="accent-primary" />
                  <span>需要关注</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 留学完成情况 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">留学完成情况</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>是否按计划完成学业 <span className="text-destructive">*</span></Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="completed" className="accent-primary" defaultChecked />
                    <span>是</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="completed" className="accent-primary" />
                    <span>否</span>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>是否获得相关证书/学位</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="certificate" className="accent-primary" />
                    <span>是</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="certificate" className="accent-primary" defaultChecked />
                    <span>否（待发放）</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>留学情况简述</Label>
              <Textarea placeholder="请简要描述您的留学学习情况" className="min-h-[100px]" />
            </div>
          </CardContent>
        </Card>

        {/* 材料上传 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">相关材料上传</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>护照入境章照片</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">上传入境章照片</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 提交按钮 */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="min-w-[120px]">保存草稿</Button>
          <Button className="min-w-[160px] gap-2" onClick={() => setSubmitted(true)}>
            提交报到信息
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* 下一步提示 */}
        {submitted && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                <div className="flex-1">
                  <h4 className="font-medium text-green-900">报到信息已提交</h4>
                  <p className="text-sm text-green-700">请继续办理学籍恢复手续</p>
                </div>
                <Link href="/student/enrollment-restore">
                  <Button className="gap-2">
                    办理学籍恢复
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 右侧AI助手面板 */}
      <div className="w-72 shrink-0">
        <Card className="sticky top-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-white">AI回国助手</CardTitle>
                <p className="text-xs text-slate-400">引导回国事务办理</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 欢迎信息 */}
            <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
              <div className="text-sm text-green-300">
                欢迎回国！您在海外学习了 <span className="font-bold text-white">{projectInfo.duration}</span>，接下来请完成回国事务办理
              </div>
            </div>

            {/* 待办事项 */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400">待办事项</div>
              <div className="space-y-2">
                {returnTasks.map(task => (
                  <Link key={task.id} href={task.href}>
                    <div className={`p-2 rounded-lg flex items-center gap-2 transition-colors ${
                      task.status === "current" 
                        ? "bg-green-500/20 border border-green-500/30" 
                        : task.status === "completed"
                        ? "bg-white/5"
                        : "bg-white/5 opacity-60"
                    }`}>
                      {task.status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                      ) : task.status === "current" ? (
                        <Clock className="h-4 w-4 text-green-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-500" />
                      )}
                      <span className={`text-xs ${
                        task.status === "current" ? "text-white font-medium" : "text-slate-400"
                      }`}>
                        {task.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 温馨提示 */}
            <div className="p-3 bg-white/10 rounded-lg">
              <div className="text-xs text-slate-400 mb-2">温馨提示</div>
              <ul className="text-xs text-slate-300 space-y-1">
                <li>• 学籍恢复需在报到后30日内办理</li>
                <li>• 学分兑换需提供境外成绩单原件</li>
                <li>• 总结报告建议提前准备</li>
              </ul>
            </div>

            {/* 预计完成时间 */}
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="text-xs text-slate-400 mb-1">预计全部完成时间</div>
              <div className="text-lg font-semibold text-white">2-3 周</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
