"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AIAssistantPanel,
  AIRecommendation,
  AIChecklistItem,
  AIInsight,
} from "@/components/ai/ai-assistant-panel"
import { 
  Search, 
  RotateCcw, 
  Sparkles, 
  Award, 
  Eye, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  FileText,
  RefreshCw,
  GraduationCap,
  AlertCircle,
  Clock
} from "lucide-react"

// 合并后的申请数据
const applications = [
  {
    id: 1,
    studentName: "张五",
    studentId: "2022010001",
    department: "计算机学院",
    major: "计算机科学与技术",
    projectName: "剑桥大学2026寒假短期课程项目",
    // 成绩信息
    courseCount: 3,
    totalForeignCredits: 10,
    avgScore: 88,
    // 学分兑换信息
    localCourses: 3,
    totalLocalCredits: 9,
    matchRate: 95,
    // 时间和状态
    submitTime: "2026-10-01 14:30",
    aiScore: 95,
    aiVerified: true,
    aiSuggestion: "成绩验证通过，学分匹配度高，建议通过",
    gradesStatus: "已通过" as const,
    creditStatus: "待审核" as const,
  },
  {
    id: 2,
    studentName: "李明",
    studentId: "2022010002",
    department: "外国语学院",
    major: "英语",
    projectName: "(亚洲地区)2026年秋季学期第三批交换生项目",
    courseCount: 5,
    totalForeignCredits: 15,
    avgScore: 82,
    localCourses: 4,
    totalLocalCredits: 12,
    matchRate: 88,
    submitTime: "2026-10-05 09:20",
    aiScore: 88,
    aiVerified: true,
    aiSuggestion: "1门课程匹配度较低，建议人工核实",
    gradesStatus: "待审核" as const,
    creditStatus: "待审核" as const,
  },
  {
    id: 3,
    studentName: "王芳",
    studentId: "2022010003",
    department: "管理学院",
    major: "工商管理",
    projectName: "布里斯托3+1本硕连读",
    courseCount: 8,
    totalForeignCredits: 24,
    avgScore: 91,
    localCourses: 7,
    totalLocalCredits: 21,
    matchRate: 92,
    submitTime: "2026-10-08 16:45",
    aiScore: 72,
    aiVerified: false,
    aiSuggestion: "成绩单部分信息模糊，建议人工核实",
    gradesStatus: "待审核" as const,
    creditStatus: "待审核" as const,
  },
]

// 详情弹窗的课程数据
const courseDetails = [
  {
    id: 1,
    foreignCourse: "Advanced Computer Science",
    foreignCredits: 4,
    foreignGrade: "A",
    foreignScore: 92,
    localCourse: "高级程序设计",
    localCourseCode: "CS3001",
    localCredits: 3,
    matchScore: 95,
  },
  {
    id: 2,
    foreignCourse: "Data Structures and Algorithms",
    foreignCredits: 3,
    foreignGrade: "A-",
    foreignScore: 88,
    localCourse: "数据结构",
    localCourseCode: "CS2002",
    localCredits: 3,
    matchScore: 92,
  },
  {
    id: 3,
    foreignCourse: "Machine Learning Fundamentals",
    foreignCredits: 3,
    foreignGrade: "B+",
    foreignScore: 85,
    localCourse: "机器学习",
    localCourseCode: "CS4001",
    localCredits: 3,
    matchScore: 85,
  },
]

type StatusType = "待审核" | "已通过" | "已退回"

export default function GradesCreditReviewPage() {
  const [reviewTab, setReviewTab] = useState("pending")
  const [viewTab, setViewTab] = useState("all")
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedApp, setSelectedApp] = useState<typeof applications[0] | null>(null)
  const [detailTab, setDetailTab] = useState("grades")
  const [rejectReason, setRejectReason] = useState("")

  const pendingGrades = applications.filter(a => a.gradesStatus === "待审核").length
  const pendingCredits = applications.filter(a => a.creditStatus === "待审核").length

  const handleViewDetail = (app: typeof applications[0]) => {
    setSelectedApp(app)
    setDetailOpen(true)
    // 根据状态自动切换到需要审核的标签
    if (app.gradesStatus === "待审核") {
      setDetailTab("grades")
    } else if (app.creditStatus === "待审核") {
      setDetailTab("credits")
    }
  }

  const filteredApps = viewTab === "all" 
    ? applications 
    : viewTab === "grades" 
      ? applications.filter(a => a.gradesStatus === "待审核")
      : applications.filter(a => a.creditStatus === "待审核")

  const getStatusBadge = (status: StatusType) => {
    switch (status) {
      case "已通过":
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">{status}</Badge>
      case "已退回":
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">{status}</Badge>
      default:
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">{status}</Badge>
    }
  }

  // 获取当前可执行的操作
  const getAvailableActions = (app: typeof applications[0]) => {
    const actions: string[] = []
    if (app.gradesStatus === "待审核") actions.push("grades")
    if (app.creditStatus === "待审核" && app.gradesStatus === "已通过") actions.push("credits")
    return actions
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {/* 审核状态标签 */}
        <div className="flex gap-2">
          <Button 
            variant={reviewTab === "pending" ? "outline" : "ghost"}
            className={reviewTab === "pending" ? "border-primary text-primary" : ""}
            onClick={() => setReviewTab("pending")}
          >
            待审核
            <Badge variant="secondary" className="ml-2">{pendingGrades + pendingCredits}</Badge>
          </Button>
          <Button 
            variant={reviewTab === "approved" ? "default" : "ghost"}
            onClick={() => setReviewTab("approved")}
          >
            已审核
          </Button>
        </div>

        {/* 审核流程说明 */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-3">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</div>
                <span className="font-medium">成绩审核</span>
                <span className="text-muted-foreground">（验证成绩单真实性）</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold">2</div>
                <span className="font-medium">学分审核</span>
                <span className="text-muted-foreground">（确认学分兑换映射）</span>
              </div>
              <div className="ml-auto text-xs text-muted-foreground">
                提示：成绩审核通过后方可进行学分审核
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 搜索筛选 */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">信息查询</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-6 gap-3">
              <Input placeholder="学生姓名/学号" />
              <Input placeholder="项目名称" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="归属单位" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs">计算机学院</SelectItem>
                  <SelectItem value="fl">外国语学院</SelectItem>
                  <SelectItem value="mgmt">管理学院</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="审核阶段" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grades-pending">成绩待审核</SelectItem>
                  <SelectItem value="credits-pending">学分待审核</SelectItem>
                  <SelectItem value="all-done">全部通过</SelectItem>
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

        {/* 审核列表 */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">成绩与学分审核</CardTitle>
              </div>
              <div className="flex items-center gap-3">
                <Tabs value={viewTab} onValueChange={setViewTab}>
                  <TabsList>
                    <TabsTrigger value="all">全部</TabsTrigger>
                    <TabsTrigger value="grades">
                      成绩待审
                      {pendingGrades > 0 && <Badge variant="secondary" className="ml-1">{pendingGrades}</Badge>}
                    </TabsTrigger>
                    <TabsTrigger value="credits">
                      学分待审
                      {pendingCredits > 0 && <Badge variant="secondary" className="ml-1">{pendingCredits}</Badge>}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button variant="outline" size="sm" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI批量审核
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>学生信息</TableHead>
                  <TableHead>项目名称</TableHead>
                  <TableHead>成绩概况</TableHead>
                  <TableHead>学分兑换</TableHead>
                  <TableHead>成绩审核</TableHead>
                  <TableHead>学分审核</TableHead>
                  <TableHead>当前操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApps.map((app) => {
                  const availableActions = getAvailableActions(app)
                  return (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{app.studentName}</p>
                          <p className="text-xs text-muted-foreground">{app.studentId} · {app.department}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm max-w-[150px] truncate text-primary">
                        {app.projectName}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <span className="text-muted-foreground">{app.courseCount}门 · </span>
                          <span className={`font-medium ${
                            app.avgScore >= 90 ? "text-green-600" : 
                            app.avgScore >= 80 ? "text-primary" : "text-amber-600"
                          }`}>
                            均分{app.avgScore}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <span>{app.localCourses}门</span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium text-primary">{app.totalLocalCredits}学分</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(app.gradesStatus)}
                      </TableCell>
                      <TableCell>
                        {app.gradesStatus === "已通过" ? (
                          getStatusBadge(app.creditStatus)
                        ) : (
                          <Badge variant="outline" className="bg-muted text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            等待成绩审核
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8"
                            onClick={() => handleViewDetail(app)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            详情
                          </Button>
                          {availableActions.includes("grades") && (
                            <Button 
                              size="sm" 
                              className="h-8 bg-amber-500 hover:bg-amber-600"
                              onClick={() => handleViewDetail(app)}
                            >
                              审核成绩
                            </Button>
                          )}
                          {availableActions.includes("credits") && (
                            <Button 
                              size="sm" 
                              className="h-8"
                              onClick={() => handleViewDetail(app)}
                            >
                              审核学分
                            </Button>
                          )}
                          {availableActions.length === 0 && app.gradesStatus === "已通过" && app.creditStatus === "已通过" && (
                            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              已完成
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI智能助手" subtitle="成绩与学分智能审核">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-amber-600">{pendingGrades}</div>
            <div className="text-xs text-amber-600 mt-1">成绩待审核</div>
          </div>
          <div className="bg-primary/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-primary">{pendingCredits}</div>
            <div className="text-xs text-muted-foreground mt-1">学分待审核</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            AI验证统计
          </h4>
          <div className="space-y-2">
            <AIChecklistItem label="成绩验证通过" status="completed" detail="2份" />
            <AIChecklistItem label="待人工核实" status="warning" detail="1份" />
            <AIChecklistItem label="高匹配度 (90%+)" status="completed" detail="2份" />
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI智能功能
          </h4>
          <div className="space-y-2 text-sm">
            <Button variant="outline" size="sm" className="w-full justify-between">
              <span>成绩单OCR验证</span>
              <Badge variant="secondary">智能识别</Badge>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-between">
              <span>课程大纲对比</span>
              <Badge variant="secondary">智能分析</Badge>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-between">
              <span>学分换算校验</span>
              <Badge variant="secondary">自动计算</Badge>
            </Button>
          </div>
        </div>

        <AIRecommendation
          title="需要关注"
          stats={[
            { label: "王芳的成绩单部分信息模糊", value: "建议人工核实" }
          ]}
        />

        <AIInsight>
          <p className="text-sm font-medium mb-1">审核流程说明</p>
          <div className="text-xs space-y-1">
            <p>1. 先审核成绩（验证成绩单）</p>
            <p>2. 成绩通过后再审核学分兑换</p>
            <p>3. 两项均通过后完成审核</p>
          </div>
        </AIInsight>
      </AIAssistantPanel>

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-3">
              申请详情 - {selectedApp?.studentName}
              <div className="flex items-center gap-2 ml-4">
                <span className="text-sm font-normal text-muted-foreground">成绩:</span>
                {selectedApp && getStatusBadge(selectedApp.gradesStatus)}
                <span className="text-sm font-normal text-muted-foreground ml-2">学分:</span>
                {selectedApp && (selectedApp.gradesStatus === "已通过" 
                  ? getStatusBadge(selectedApp.creditStatus)
                  : <Badge variant="outline" className="bg-muted text-muted-foreground">等待成绩审核</Badge>
                )}
              </div>
            </DialogTitle>
            <DialogDescription>
              {selectedApp?.studentId} · {selectedApp?.department} · {selectedApp?.major}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4 py-4">
            {/* 项目信息 */}
            <div className="bg-muted rounded-lg p-4">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">项目名称</span>
                  <p className="font-medium mt-1">{selectedApp?.projectName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">提交时间</span>
                  <p className="font-medium mt-1">{selectedApp?.submitTime}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">AI评分</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-lg text-primary">{selectedApp?.aiScore}</span>
                    {selectedApp?.aiVerified ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">AI建议</span>
                  <p className="font-medium mt-1 text-sm">{selectedApp?.aiSuggestion}</p>
                </div>
              </div>
            </div>

            {/* 审核区域 - 分Tab显示 */}
            <Tabs value={detailTab} onValueChange={setDetailTab}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="grades" className="gap-2">
                  <GraduationCap className="h-4 w-4" />
                  成绩审核
                  {selectedApp?.gradesStatus === "待审核" && (
                    <Badge className="bg-amber-500 ml-1">待审</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="credits" 
                  className="gap-2"
                  disabled={selectedApp?.gradesStatus !== "已通过"}
                >
                  <RefreshCw className="h-4 w-4" />
                  学分审核
                  {selectedApp?.gradesStatus === "已通过" && selectedApp?.creditStatus === "待审核" && (
                    <Badge className="bg-primary ml-1">待审</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="files" className="gap-2">
                  <FileText className="h-4 w-4" />
                  申请材料
                </TabsTrigger>
              </TabsList>

              {/* 成绩审核 Tab */}
              <TabsContent value="grades" className="mt-4 space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span>课程成绩明细</span>
                      <div className="flex items-center gap-4 text-sm font-normal">
                        <span>总学分: <strong>{selectedApp?.totalForeignCredits}</strong></span>
                        <span>平均分: <strong className="text-green-600">{selectedApp?.avgScore}</strong></span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>课程名称</TableHead>
                          <TableHead>学分</TableHead>
                          <TableHead>等级</TableHead>
                          <TableHead>分数</TableHead>
                          <TableHead>AI验证</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courseDetails.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell className="font-medium">{course.foreignCourse}</TableCell>
                            <TableCell>{course.foreignCredits}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                {course.foreignGrade}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">{course.foreignScore}</TableCell>
                            <TableCell>
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* 成绩审核操作区 */}
                {selectedApp?.gradesStatus === "待审核" && (
                  <Card className="border-2 border-amber-200 bg-amber-50/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2 text-amber-700">
                        <AlertCircle className="h-4 w-4" />
                        成绩审核操作
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>审核意见（可选）</Label>
                        <Textarea 
                          placeholder="请输入审核意见，如退回请说明原因..."
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Button className="gap-2 bg-green-600 hover:bg-green-700">
                          <CheckCircle2 className="h-4 w-4" />
                          成绩审核通过
                        </Button>
                        <Button variant="destructive" className="gap-2">
                          <XCircle className="h-4 w-4" />
                          退回修改
                        </Button>
                        <p className="text-xs text-muted-foreground ml-auto">
                          通过后将进入学分兑换审核阶段
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedApp?.gradesStatus === "已通过" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-700">成绩审核已通过</p>
                      <p className="text-sm text-green-600">请切换到"学分审核"标签页继续审核学分兑换申请</p>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* 学分审核 Tab */}
              <TabsContent value="credits" className="mt-4 space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span>学分兑换映射</span>
                      <div className="flex items-center gap-4 text-sm font-normal">
                        <span>匹配度: <strong className="text-green-600">{selectedApp?.matchRate}%</strong></span>
                        <span>可兑换: <strong className="text-primary">{selectedApp?.totalLocalCredits}学分</strong></span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {courseDetails.map((course) => (
                        <div key={course.id} className="border rounded-lg p-3 bg-green-50/50 border-green-200">
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{course.foreignCourse}</p>
                              <p className="text-xs text-muted-foreground">{course.foreignCredits} 学分 · {course.foreignGrade}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-primary" />
                            <Badge className="bg-green-500">{course.matchScore}%</Badge>
                            <div className="flex-1 text-right">
                              <p className="font-medium text-sm">{course.localCourse}</p>
                              <p className="text-xs text-muted-foreground">{course.localCourseCode} · {course.localCredits} 学分</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 学分审核操作区 */}
                {selectedApp?.creditStatus === "待审核" && selectedApp?.gradesStatus === "已通过" && (
                  <Card className="border-2 border-primary bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2 text-primary">
                        <RefreshCw className="h-4 w-4" />
                        学分兑换审核操作
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>审核意见（可选）</Label>
                        <Textarea 
                          placeholder="请输入审核意见，如退回请说明原因..."
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Button className="gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          学分兑换通过
                        </Button>
                        <Button variant="destructive" className="gap-2">
                          <XCircle className="h-4 w-4" />
                          退回修改
                        </Button>
                        <p className="text-xs text-muted-foreground ml-auto">
                          通过后学分将计入学生成绩系统
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedApp?.creditStatus === "已通过" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-700">学分兑换审核已通过</p>
                      <p className="text-sm text-green-600">该学生的成绩与学分审核已全部完成</p>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* 材料 Tab */}
              <TabsContent value="files" className="mt-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="font-medium text-sm">境外成绩单</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">Transcript_Cambridge_2026.pdf</p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="h-4 w-4 mr-1" />
                          查看
                        </Button>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="font-medium text-sm">学习证明</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">Certificate_Cambridge_2026.pdf</p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="h-4 w-4 mr-1" />
                          查看
                        </Button>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="font-medium text-sm">课程大纲</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">Syllabus_Cambridge_2026.pdf</p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="h-4 w-4 mr-1" />
                          查看
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
