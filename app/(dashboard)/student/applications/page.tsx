"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AIAssistantPanel,
  AIScoreCard,
} from "@/components/ai/ai-assistant-panel"
import { 
  Search, 
  RotateCcw, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  XCircle,
  Eye,
  Edit2,
  Trash2,
  Calendar,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

const applications = [
  {
    id: 1,
    projectName: "2026年《中美人才培养计划》1+2+1双学位项目和YES非学位项目",
    projectType: "双学位项目",
    targetSchool: "加州大学伯克利分校",
    applyTime: "2026-03-15 14:30",
    dispatchTime: "2026-09-01 至 2028-06-30",
    status: "审核中",
    progress: 60,
    aiScore: 90,
    currentStep: "学院审核",
    estimatedTime: "预计3个工作日内完成",
  },
  {
    id: 2,
    projectName: "(亚洲地区)2026年秋季学期第三批交换生项目",
    projectType: "交换生项目",
    targetSchool: "东京大学",
    applyTime: "2026-03-10 09:15",
    dispatchTime: "2026-08-25 至 2026-12-24",
    status: "已通过",
    progress: 100,
    aiScore: 86,
    currentStep: "审核完成",
    estimatedTime: "",
  },
  {
    id: 3,
    projectName: "韩国忠南大学奖学金交换生项目(2026)",
    projectType: "交换生项目",
    targetSchool: "韩国忠南大学",
    applyTime: "2026-02-28 16:45",
    dispatchTime: "2026-09-01 至 2026-12-31",
    status: "已驳回",
    progress: 0,
    aiScore: 75,
    currentStep: "审核未通过",
    rejectReason: "GPA未达到项目最低要求（3.5/4.0）",
  },
  {
    id: 4,
    projectName: "布里斯托3+1本硕连读",
    projectType: "本硕连读",
    targetSchool: "英国布里斯托大学",
    applyTime: "2026-03-20 11:20",
    dispatchTime: "2026-09-01 至 2027-06-30",
    status: "草稿",
    progress: 45,
    aiScore: null,
    currentStep: "未提交",
    estimatedTime: "",
  },
]

export default function StudentApplicationsPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedApp, setSelectedApp] = useState<typeof applications[0] | null>(null)
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false)

  const filteredApplications = applications.filter(app => {
    if (statusFilter === "all") return true
    return app.status === statusFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "审核中":
        return <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">审核中</Badge>
      case "已通过":
        return <Badge className="bg-green-500">已通过</Badge>
      case "已驳回":
        return <Badge variant="destructive">已驳回</Badge>
      case "草稿":
        return <Badge variant="secondary">草稿</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleViewDetail = (app: typeof applications[0]) => {
    setSelectedApp(app)
    setIsDetailDialogOpen(true)
  }

  const handleWithdraw = (app: typeof applications[0]) => {
    setSelectedApp(app)
    setIsWithdrawDialogOpen(true)
  }

  const statusCounts = {
    all: applications.length,
    "审核中": applications.filter(a => a.status === "审核中").length,
    "已通过": applications.filter(a => a.status === "已通过").length,
    "已驳回": applications.filter(a => a.status === "已驳回").length,
    "草稿": applications.filter(a => a.status === "草稿").length,
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {/* Status Tabs */}
        <div className="flex gap-2">
          <Button 
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            全部申请 <Badge variant="secondary" className="ml-1">{statusCounts.all}</Badge>
          </Button>
          <Button 
            variant={statusFilter === "审核中" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("审核中")}
          >
            审核中 <Badge variant="secondary" className="ml-1">{statusCounts["审核中"]}</Badge>
          </Button>
          <Button 
            variant={statusFilter === "已通过" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("已通过")}
          >
            已通过 <Badge variant="secondary" className="ml-1">{statusCounts["已通过"]}</Badge>
          </Button>
          <Button 
            variant={statusFilter === "已驳回" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("已驳回")}
          >
            已驳回 <Badge variant="secondary" className="ml-1">{statusCounts["已驳回"]}</Badge>
          </Button>
          <Button 
            variant={statusFilter === "草稿" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("草稿")}
          >
            草稿 <Badge variant="secondary" className="ml-1">{statusCounts["草稿"]}</Badge>
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">申请查询</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-5 gap-3">
              <Input placeholder="项目名称" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="项目类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="exchange">交换生项目</SelectItem>
                  <SelectItem value="dual-degree">双学位项目</SelectItem>
                  <SelectItem value="short-term">短期课程</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Input type="date" placeholder="申请时间" />
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <Button className="gap-2">
                <Search className="h-4 w-4" />
                搜索
              </Button>
              <Button variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                重置
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">我的申请列表</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[280px]">项目名称</TableHead>
                  <TableHead>项目类型</TableHead>
                  <TableHead>目标院校</TableHead>
                  <TableHead>申请时间</TableHead>
                  <TableHead className="text-center">审核进度</TableHead>
                  <TableHead className="text-center">状态</TableHead>
                  <TableHead className="text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <p className="font-medium text-sm truncate max-w-[260px]">{app.projectName}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/5">{app.projectType}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{app.targetSchool}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{app.applyTime}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={app.progress} className="w-20 h-2" />
                        <span className="text-xs text-muted-foreground">{app.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(app.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 gap-1 text-primary"
                          onClick={() => handleViewDetail(app)}
                        >
                          <Eye className="h-3 w-3" />
                          查看
                        </Button>
                        {app.status === "草稿" && (
                          <Link href={`/student/apply/${app.id}`}>
                            <Button variant="ghost" size="sm" className="h-7 gap-1 text-primary">
                              <Edit2 className="h-3 w-3" />
                              编辑
                            </Button>
                          </Link>
                        )}
                        {(app.status === "审核中" || app.status === "草稿") && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 gap-1 text-destructive"
                            onClick={() => handleWithdraw(app)}
                          >
                            <Trash2 className="h-3 w-3" />
                            {app.status === "草稿" ? "删除" : "撤回"}
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI智能助手" subtitle="申请进度跟踪">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-600">{statusCounts["审核中"]}</p>
            <p className="text-xs text-blue-600 mt-1">审核中</p>
          </div>
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-600">{statusCounts["已通过"]}</p>
            <p className="text-xs text-green-600 mt-1">已通过</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            申请进度追踪
          </h4>
          
          <div className="space-y-2">
            {applications.filter(a => a.status === "审核中").map(app => (
              <div key={app.id} className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium truncate">{app.projectName.slice(0, 20)}...</p>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={app.progress} className="flex-1 h-2" />
                  <span className="text-xs text-muted-foreground">{app.progress}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  当前步骤：{app.currentStep}
                </p>
                {app.estimatedTime && (
                  <p className="text-xs text-primary mt-1">{app.estimatedTime}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            待办事项
          </h4>
          <div className="space-y-2">
            {applications.filter(a => a.status === "草稿").length > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-700">草稿待提交</p>
                    <p className="text-xs text-amber-600 mt-1">
                      您有 {applications.filter(a => a.status === "草稿").length} 份申请草稿未提交
                    </p>
                  </div>
                </div>
              </div>
            )}
            {applications.filter(a => a.status === "已通过").length > 0 && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-700">可确认派出</p>
                    <p className="text-xs text-green-600 mt-1">
                      您有 {applications.filter(a => a.status === "已通过").length} 个项目已通过审核，请尽快确认派出
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Link href="/student/apply">
          <Button className="w-full gap-2">
            <ArrowRight className="h-4 w-4" />
            浏览更多项目
          </Button>
        </Link>
      </AIAssistantPanel>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>申请详情</DialogTitle>
            <DialogDescription>
              {selectedApp?.projectName}
            </DialogDescription>
          </DialogHeader>
          {selectedApp && (
            <div className="py-4">
              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">基本信息</TabsTrigger>
                  <TabsTrigger value="progress">审核进度</TabsTrigger>
                  <TabsTrigger value="result">审核结果</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">项目类型</p>
                      <p className="font-medium mt-1">{selectedApp.projectType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">目标院校</p>
                      <p className="font-medium mt-1">{selectedApp.targetSchool}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">申请时间</p>
                      <p className="font-medium mt-1">{selectedApp.applyTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">派出时间</p>
                      <p className="font-medium mt-1">{selectedApp.dispatchTime}</p>
                    </div>
                  </div>
                  {selectedApp.aiScore && (
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">AI预测成功率</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="text-3xl font-bold text-primary">{selectedApp.aiScore}%</div>
                        <Progress value={selectedApp.aiScore} className="flex-1 h-3" />
                      </div>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="progress" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">提交申请</p>
                        <p className="text-sm text-muted-foreground">{selectedApp.applyTime}</p>
                      </div>
                    </div>
                    <div className="ml-4 w-0.5 h-6 bg-muted" />
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedApp.progress >= 50 ? "bg-green-100" : "bg-muted"
                      }`}>
                        {selectedApp.progress >= 50 ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">学院初审</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedApp.progress >= 50 ? "审核通过" : "等待审核"}
                        </p>
                      </div>
                    </div>
                    <div className="ml-4 w-0.5 h-6 bg-muted" />
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedApp.progress >= 100 ? "bg-green-100" : "bg-muted"
                      }`}>
                        {selectedApp.progress >= 100 ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">学校终审</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedApp.progress >= 100 ? "审核通过" : "等待审核"}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="result" className="pt-4">
                  {selectedApp.status === "已通过" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <p className="font-medium text-green-700">申请已通过</p>
                      </div>
                      <p className="text-sm text-green-600 mt-2">
                        恭喜您的申请已通过审核！请及时确认派出并提交相关材料。
                      </p>
                    </div>
                  )}
                  {selectedApp.status === "已驳回" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <p className="font-medium text-red-700">申请未通过</p>
                      </div>
                      <p className="text-sm text-red-600 mt-2">
                        驳回原因：{selectedApp.rejectReason}
                      </p>
                    </div>
                  )}
                  {selectedApp.status === "审核中" && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <p className="font-medium text-blue-700">审核进行中</p>
                      </div>
                      <p className="text-sm text-blue-600 mt-2">
                        当前步骤：{selectedApp.currentStep}
                        <br />
                        {selectedApp.estimatedTime}
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>关闭</Button>
            {selectedApp?.status === "已通过" && (
              <Link href="/student/dispatch-materials">
                <Button>确认派出</Button>
              </Link>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedApp?.status === "草稿" ? "删除申请" : "撤回申请"}
            </DialogTitle>
            <DialogDescription>
              {selectedApp?.status === "草稿" 
                ? "确定要删除这份申请草稿吗？此操作不可恢复。"
                : "确定要撤回这份申请吗？撤回后需要重新提交。"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium">{selectedApp?.projectName}</p>
              <p className="text-xs text-muted-foreground mt-1">目标院校：{selectedApp?.targetSchool}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWithdrawDialogOpen(false)}>取消</Button>
            <Button variant="destructive" onClick={() => setIsWithdrawDialogOpen(false)}>
              {selectedApp?.status === "草稿" ? "确认删除" : "确认撤回"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
