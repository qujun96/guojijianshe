"use client"

import { useState, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { 
  ArrowLeft,
  User,
  GraduationCap,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  Mic,
  MicOff,
  Send,
  History,
  AlertCircle,
  ArrowRightLeft,
  Building
} from "lucide-react"

// 模拟任务详情数据
const taskDetail = {
  id: 1,
  type: "application",
  typeLabel: "申请审核",
  studentName: "李明",
  studentId: "2022001",
  college: "计算机科学与技术学院",
  major: "软件工程",
  grade: "2022级本科",
  phone: "138****5678",
  email: "liming@university.edu.cn",
  project: {
    name: "A国B大学奖学金交换生项目(2026)",
    school: "A国B大学",
    country: "A国",
    duration: "2026-09-01 至 2027-01-15",
    type: "交换生项目"
  },
  academic: {
    gpa: "3.72",
    rank: "15/120 (前12.5%)",
    cet4: "568",
    cet6: "512",
    ielts: "6.5"
  },
  submitTime: "2026-04-08 14:30",
  aiAnalysis: {
    score: 92,
    suggestion: "建议通过",
    details: [
      { label: "GPA符合要求", status: "pass", detail: "3.72 ≥ 3.0" },
      { label: "语言成绩达标", status: "pass", detail: "CET-6: 512 ≥ 425" },
      { label: "专业排名优秀", status: "pass", detail: "前12.5% ≤ 30%" },
      { label: "无违纪记录", status: "pass", detail: "已核实" },
    ]
  },
  history: [
    { time: "2026-04-08 14:30", action: "提交申请", operator: "李明(学生)" },
    { time: "2026-04-08 14:31", action: "AI预审通过", operator: "系统", detail: "评分92分" },
  ]
}

// 常用审批意见
const quickComments = [
  "材料完整，符合申请条件，同意通过。",
  "申请材料审核无误，同意推荐。",
  "经审核，该生符合项目要求，建议通过。",
]

const rejectComments = [
  "GPA未达到项目最低要求，建议补充说明或选择其他项目。",
  "语言成绩证明材料缺失，请补充后重新提交。",
  "申请材料不完整，请补充相关证明文件。",
]

export default function MobileTaskDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState("info")
  const [comment, setComment] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [showActionSheet, setShowActionSheet] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "reject" | "transfer">("approve")
  const [showQuickComments, setShowQuickComments] = useState(false)

  const handleApprove = () => {
    setActionType("approve")
    setShowActionSheet(true)
  }

  const handleReject = () => {
    setActionType("reject")
    setShowActionSheet(true)
  }

  const handleTransfer = () => {
    setActionType("transfer")
    setShowActionSheet(true)
  }

  const handleSubmit = () => {
    // 提交审批
    console.log("[v0] Submit approval:", { actionType, comment })
    setShowActionSheet(false)
    router.push("/mobile/tasks")
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // 模拟语音识别
      setTimeout(() => {
        setComment(prev => prev + "经审核，该生材料完整，符合申请条件。")
        setIsRecording(false)
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold">{taskDetail.typeLabel}</h1>
            <p className="text-xs text-muted-foreground">{taskDetail.studentName} · {taskDetail.studentId}</p>
          </div>
          <Badge className="bg-blue-100 text-blue-700">待审核</Badge>
        </div>
      </div>

      {/* AI Analysis Card */}
      <div className="px-4 py-3">
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">AI智能评分</p>
                <p className="text-2xl font-bold text-primary">{taskDetail.aiAnalysis.score}分</p>
              </div>
              <Badge className="ml-auto bg-green-100 text-green-700">
                {taskDetail.aiAnalysis.suggestion}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {taskDetail.aiAnalysis.details.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="info">学生信息</TabsTrigger>
            <TabsTrigger value="project">项目信息</TabsTrigger>
            <TabsTrigger value="materials">申请材料</TabsTrigger>
            <TabsTrigger value="history">审批记录</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-4 space-y-4">
            {/* Basic Info */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  基本信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {taskDetail.studentName.slice(-2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-lg">{taskDetail.studentName}</p>
                    <p className="text-sm text-muted-foreground">{taskDetail.studentId}</p>
                    <p className="text-sm text-muted-foreground">{taskDetail.grade}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">学院</p>
                    <p className="text-sm">{taskDetail.college}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">专业</p>
                    <p className="text-sm">{taskDetail.major}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">联系电话</p>
                    <p className="text-sm">{taskDetail.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">电子邮箱</p>
                    <p className="text-sm truncate">{taskDetail.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Info */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  学业信息
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-muted-foreground">GPA</p>
                    <p className="text-lg font-semibold text-primary">{taskDetail.academic.gpa}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-muted-foreground">专业排名</p>
                    <p className="text-lg font-semibold text-primary">{taskDetail.academic.rank.split(" ")[0]}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-muted-foreground">CET-4</p>
                    <p className="text-lg font-semibold">{taskDetail.academic.cet4}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-muted-foreground">CET-6</p>
                    <p className="text-lg font-semibold">{taskDetail.academic.cet6}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="project" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Building className="h-4 w-4 text-primary" />
                  申请项目
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{taskDetail.project.name}</p>
                  <Badge variant="outline" className="mt-1">{taskDetail.project.type}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">目标院校</p>
                    <p className="text-sm">{taskDetail.project.school}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">目标国家</p>
                    <p className="text-sm">{taskDetail.project.country}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">派出时间</p>
                    <p className="text-sm">{taskDetail.project.duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  申请材料
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { name: "个人陈述", status: "uploaded" },
                  { name: "研修计划", status: "uploaded" },
                  { name: "成绩单", status: "uploaded" },
                  { name: "语言成绩证明", status: "uploaded" },
                  { name: "导师推荐信", status: "uploaded" },
                ].map((material, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{material.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700 text-xs">已上传</Badge>
                      <Button variant="ghost" size="sm" className="text-primary h-7">
                        查看
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <History className="h-4 w-4 text-primary" />
                  审批记录
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-slate-200" />
                  <div className="space-y-4">
                    {taskDetail.history.map((record, index) => (
                      <div key={index} className="relative flex gap-4 pl-8">
                        <div className={`absolute left-1.5 w-3 h-3 rounded-full ${
                          index === taskDetail.history.length - 1 ? "bg-primary" : "bg-slate-300"
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">{record.action}</p>
                            <p className="text-xs text-muted-foreground">{record.time}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {record.operator}
                            {record.detail && ` · ${record.detail}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 z-40">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Button 
            variant="outline" 
            className="flex-1 text-muted-foreground"
            onClick={handleTransfer}
          >
            <ArrowRightLeft className="h-4 w-4 mr-1" />
            转办
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
            onClick={handleReject}
          >
            <XCircle className="h-4 w-4 mr-1" />
            退回
          </Button>
          <Button 
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={handleApprove}
          >
            <CheckCircle2 className="h-4 w-4 mr-1" />
            通过
          </Button>
        </div>
      </div>

      {/* Action Sheet */}
      <Sheet open={showActionSheet} onOpenChange={setShowActionSheet}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b">
            <SheetTitle className="flex items-center gap-2">
              {actionType === "approve" && <CheckCircle2 className="h-5 w-5 text-green-600" />}
              {actionType === "reject" && <XCircle className="h-5 w-5 text-red-600" />}
              {actionType === "transfer" && <ArrowRightLeft className="h-5 w-5 text-blue-600" />}
              {actionType === "approve" && "确认通过"}
              {actionType === "reject" && "确认退回"}
              {actionType === "transfer" && "转办审批"}
            </SheetTitle>
          </SheetHeader>

          <div className="py-4 space-y-4 overflow-y-auto h-[calc(100%-140px)]">
            {/* Quick Comments */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">快捷意见</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary h-7"
                  onClick={() => setShowQuickComments(!showQuickComments)}
                >
                  {showQuickComments ? "收起" : "展开"}
                </Button>
              </div>
              {showQuickComments && (
                <div className="space-y-2">
                  {(actionType === "approve" ? quickComments : rejectComments).map((text, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2 px-3"
                      onClick={() => setComment(text)}
                    >
                      <span className="text-sm line-clamp-2">{text}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Comment Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">审批意见</p>
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  className="gap-1 h-7"
                  onClick={toggleRecording}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="h-3 w-3" />
                      停止录音
                    </>
                  ) : (
                    <>
                      <Mic className="h-3 w-3" />
                      语音输入
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                placeholder={actionType === "approve" ? "请输入审批意见（可选）" : "请输入退回原因"}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px]"
              />
              {isRecording && (
                <div className="flex items-center justify-center gap-2 mt-2 text-red-500">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm">正在录音...</span>
                </div>
              )}
            </div>

            {/* Transfer Target (only for transfer action) */}
            {actionType === "transfer" && (
              <div>
                <p className="text-sm font-medium mb-2">选择转办人</p>
                <div className="space-y-2">
                  {["王主任", "李老师", "张老师"].map((name, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarFallback className="text-xs">{name.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      {name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
            <Button 
              className={`w-full ${
                actionType === "approve" ? "bg-green-600 hover:bg-green-700" :
                actionType === "reject" ? "bg-red-600 hover:bg-red-700" :
                ""
              }`}
              onClick={handleSubmit}
            >
              <Send className="h-4 w-4 mr-2" />
              确认提交
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
