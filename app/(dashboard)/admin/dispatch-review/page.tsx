"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AIAssistantPanel,
  AIRecommendation,
} from "@/components/ai/ai-assistant-panel"
import { 
  Search, 
  RotateCcw, 
  ClipboardCheck, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2,
  XCircle,
  Eye,
  FileText,
  Users
} from "lucide-react"

const dispatchApplications = [
  {
    id: 1,
    studentName: "张五",
    studentId: "2022010001",
    department: "计算机学院",
    projectName: "G国H大学2026寒假短期课程项目",
    dispatchTime: "2026-07-15 至 2026-08-30",
    materialStatus: "完整",
    materialCount: "6/6",
    aiScore: 95,
    aiSuggestion: "材料完整，建议通过",
    status: "待审核",
  },
  {
    id: 2,
    studentName: "李明",
    studentId: "2022010002",
    department: "外国语学院",
    projectName: "2026年秋季学期第三批交换生项目",
    dispatchTime: "2026-09-01 至 2026-12-31",
    materialStatus: "部分缺失",
    materialCount: "4/6",
    aiScore: 72,
    aiSuggestion: "签证材料和保险证明缺失，建议退回补充",
    status: "待审核",
  },
  {
    id: 3,
    studentName: "王芳",
    studentId: "2022010003",
    department: "管理学院",
    projectName: "E国F大学3+1本硕连读",
    dispatchTime: "2026-09-01 至 2027-06-30",
    materialStatus: "完整",
    materialCount: "6/6",
    aiScore: 88,
    aiSuggestion: "录取通知书日期与申请时间略有出入，建议人工核实",
    status: "待审核",
  },
  {
    id: 4,
    studentName: "赵强",
    studentId: "2022010004",
    department: "机械学院",
    projectName: "K国L大学交换项目",
    dispatchTime: "2026-10-01 至 2027-03-31",
    materialStatus: "审核中",
    materialCount: "5/6",
    aiScore: 80,
    aiSuggestion: "行程单待上传（非必需），其他材料已验证通过",
    status: "待审核",
  },
]

export default function DispatchReviewPage() {
  const router = useRouter()
  const [tab, setTab] = useState("pending")
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<typeof dispatchApplications[0] | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  const handleViewDetail = (id: number) => {
    router.push(`/admin/dispatch-review/${id}`)
  }

  const handleApproveClick = (app: typeof dispatchApplications[0]) => {
    setSelectedStudent(app)
    setShowApproveDialog(true)
  }

  const handleRejectClick = (app: typeof dispatchApplications[0]) => {
    setSelectedStudent(app)
    setShowRejectDialog(true)
  }

  const handleApprove = () => {
    // 处理通过逻辑
    setShowApproveDialog(false)
    setSelectedStudent(null)
  }

  const handleReject = () => {
    // 处理退回逻辑
    setShowRejectDialog(false)
    setSelectedStudent(null)
    setRejectReason("")
  }

  // 统计数据
  const pendingCount = dispatchApplications.filter(a => a.status === "待审核").length
  const approvedCount = dispatchApplications.filter(a => a.status === "已通过").length

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {/* 统计卡片 */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">待审核</p>
                  <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <ClipboardCheck className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">已通过</p>
                  <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">材料完整率</p>
                  <p className="text-2xl font-bold text-primary">75%</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">本月派出人数</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <Users className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2">
          <Button 
            variant={tab === "pending" ? "outline" : "ghost"}
            className={tab === "pending" ? "border-primary text-primary" : ""}
            onClick={() => setTab("pending")}
          >
            待审核
          </Button>
          <Button 
            variant={tab === "approved" ? "default" : "ghost"}
            onClick={() => setTab("approved")}
          >
            已审核
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">信息查询</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-5 gap-3">
              <Input placeholder="学生姓名/学号" />
              <Input placeholder="项目名称" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="材料状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complete">完整</SelectItem>
                  <SelectItem value="partial">部分缺失</SelectItem>
                  <SelectItem value="reviewing">审核中</SelectItem>
                </SelectContent>
              </Select>
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">派出准备审核列表</CardTitle>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI批量审核
                </Button>
                <Select defaultValue="time">
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="time">提交时间</SelectItem>
                    <SelectItem value="score">AI评分</SelectItem>
                    <SelectItem value="status">材料状态</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>学生姓名</TableHead>
                  <TableHead>学号</TableHead>
                  <TableHead>归属单位</TableHead>
                  <TableHead>项目名称</TableHead>
                  <TableHead>派出时间</TableHead>
                  <TableHead>材料状态</TableHead>
                  <TableHead>AI评分</TableHead>
                  <TableHead>AI建议</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dispatchApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.studentName}</TableCell>
                    <TableCell className="text-sm">{app.studentId}</TableCell>
                    <TableCell className="text-sm">{app.department}</TableCell>
                    <TableCell className="text-sm max-w-[180px] truncate text-primary">
                      {app.projectName}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{app.dispatchTime}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {app.materialStatus === "完整" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        )}
                        <span className={app.materialStatus === "完整" ? "text-green-600" : "text-amber-600"}>
                          {app.materialStatus}
                        </span>
                        <span className="text-xs text-muted-foreground">({app.materialCount})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        app.aiScore >= 90 ? "bg-green-100 text-green-600" : 
                        app.aiScore >= 80 ? "bg-primary/10 text-primary" : "bg-amber-100 text-amber-600"
                      }`}>
                        {app.aiScore}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs ${
                        app.aiSuggestion.includes("通过") ? "text-green-600" : "text-amber-600"
                      }`}>
                        {app.aiSuggestion}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="h-auto p-0 text-primary"
                          onClick={() => handleViewDetail(app.id)}
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          查看
                        </Button>
                        <span className="text-muted-foreground">|</span>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="h-auto p-0 text-green-600"
                          onClick={() => handleApproveClick(app)}
                        >
                          通过
                        </Button>
                        <span className="text-muted-foreground">|</span>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="h-auto p-0 text-destructive"
                          onClick={() => handleRejectClick(app)}
                        >
                          退回
                        </Button>
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
      <AIAssistantPanel title="AI智能助手" subtitle="派出材料智能审核">
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI智能审核
          </h4>
          <div className="space-y-2 text-sm">
            <Button variant="outline" size="sm" className="w-full justify-between">
              <span>材料自动验证</span>
              <Badge variant="secondary">一键执行</Badge>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-between">
              <span>签证有效期检查</span>
              <Badge variant="secondary">自动检测</Badge>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-between">
              <span>文档OCR识别</span>
              <Badge variant="secondary">智能提取</Badge>
            </Button>
          </div>
        </div>

        <AIRecommendation
          title="紧急处理提醒"
          stats={[
            { label: "张五的派出时间临近", value: "建议优先审核" }
          ]}
          highlight
        />
      </AIAssistantPanel>

      {/* 通过确认弹窗 */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              确认审核通过
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              确认通过学生 <span className="font-medium text-foreground">{selectedStudent?.studentName}</span> 的派出准备审核？
            </p>
            <div className="mt-3 p-3 bg-muted/50 rounded-lg space-y-1">
              <p className="text-sm"><span className="text-muted-foreground">项目：</span>{selectedStudent?.projectName}</p>
              <p className="text-sm"><span className="text-muted-foreground">派出时间：</span>{selectedStudent?.dispatchTime}</p>
              <p className="text-sm"><span className="text-muted-foreground">材料状态：</span>
                <span className={selectedStudent?.materialStatus === "完整" ? "text-green-600" : "text-amber-600"}>
                  {selectedStudent?.materialStatus} ({selectedStudent?.materialCount})
                </span>
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              通过后，学生将可以按计划进行派出。
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>取消</Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleApprove}>
              确认通过
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 退回确认弹窗 */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              退回修改
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              确认退回学生 <span className="font-medium text-foreground">{selectedStudent?.studentName}</span> 的派出准备申请？
            </p>
            <div className="p-3 bg-muted/50 rounded-lg space-y-1">
              <p className="text-sm"><span className="text-muted-foreground">项目：</span>{selectedStudent?.projectName}</p>
              <p className="text-sm"><span className="text-muted-foreground">AI建议：</span>
                <span className="text-amber-600">{selectedStudent?.aiSuggestion}</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">退回原因 <span className="text-destructive">*</span></p>
              <Textarea 
                placeholder="请填写退回原因，以便学生了解需要修改的内容..."
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>取消</Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectReason.trim()}>
              确认退回
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
