"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
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
  Info,
  Upload,
  Plane,
  FileCheck,
  Eye,
  Download,
  ClipboardList,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import {
  AIAssistantPanel,
  AIChecklistItem,
  AISuggestion,
  AIReminder,
} from "@/components/ai/ai-assistant-panel"

// ============ 离校手续数据 ============
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

// ============ 派出材料数据 ============
interface Material {
  id: string
  name: string
  description: string
  required: boolean
  status: "uploaded" | "pending" | "not_started"
  fileName: string | null
  uploadTime: string | null
  aiVerified: boolean
}

const materialTypes: Material[] = [
  {
    id: "enrollment",
    name: "保留学籍证明",
    description: "由学校教务处开具的保留学籍证明文件",
    required: true,
    status: "uploaded",
    fileName: "保留学籍证明_张三_2026.pdf",
    uploadTime: "2026-03-15 14:30",
    aiVerified: true,
  },
  {
    id: "admission",
    name: "境外录取通知书",
    description: "被境外学校录取或接受交换的正式通知书",
    required: true,
    status: "uploaded",
    fileName: "Admission_Letter_A_University.pdf",
    uploadTime: "2026-03-16 09:20",
    aiVerified: true,
  },
  {
    id: "visa",
    name: "签证材料",
    description: "有效签证页面复印件或电子签证",
    required: true,
    status: "pending",
    fileName: null,
    uploadTime: null,
    aiVerified: false,
  },
  {
    id: "insurance",
    name: "境外保险证明",
    description: "涵盖留学期间的医疗及意外保险",
    required: true,
    status: "pending",
    fileName: null,
    uploadTime: null,
    aiVerified: false,
  },
  {
    id: "itinerary",
    name: "行程单",
    description: "往返机票订单或行程安排",
    required: false,
    status: "not_started",
    fileName: null,
    uploadTime: null,
    aiVerified: false,
  },
  {
    id: "emergency",
    name: "紧急联系人确认书",
    description: "境外紧急联系人信息确认",
    required: true,
    status: "uploaded",
    fileName: "紧急联系人确认书_张三.pdf",
    uploadTime: "2026-03-14 16:45",
    aiVerified: true,
  },
]

// ============ 辅助函数 ============
function getTaskStatusConfig(status: Task["status"]) {
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

function getMaterialStatusIcon(status: Material["status"]) {
  switch (status) {
    case "uploaded":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case "pending":
      return <Clock className="h-5 w-5 text-amber-500" />
    case "not_started":
      return <AlertCircle className="h-5 w-5 text-muted-foreground" />
  }
}

function getMaterialStatusText(status: Material["status"]) {
  switch (status) {
    case "uploaded":
      return "已上传"
    case "pending":
      return "待上传"
    case "not_started":
      return "未开始"
  }
}

export default function DeparturePreparationPage() {
  const [activeTab, setActiveTab] = useState("tasks")
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)

  // 离校手续进度计算
  const completedTasksCount = tasks.filter(t => t.status === "completed").length
  const tasksProgress = (completedTasksCount / tasks.length) * 100

  // 派出材料进度计算
  const uploadedMaterialsCount = materialTypes.filter(m => m.status === "uploaded").length
  const materialsProgress = (uploadedMaterialsCount / materialTypes.length) * 100

  // 总体进度
  const overallProgress = Math.round((tasksProgress + materialsProgress) / 2)

  const currentStudent = {
    name: "张三",
    studentId: "2022010001",
    type: "本科生",
    college: "计算机科学与技术学院",
    project: "2026年《A国B国人才培养计划》1+2+1双学位项目",
    dispatchTime: "2026-07-15 至 2026-08-30",
    deadline: "2026-06-30"
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {/* 页面标题和总体进度 */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">派出准备</h1>
            <p className="text-muted-foreground mt-1">完成离校手续办理和派出材料准备后方可正式派出</p>
          </div>
          <Badge 
            variant="outline" 
            className={overallProgress === 100 ? "bg-green-50 text-green-600 border-green-200" : "bg-amber-50 text-amber-600 border-amber-200"}
          >
            {overallProgress === 100 ? "准备完成" : "准备中"}
          </Badge>
        </div>

        {/* 总体进度卡片 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">派出准备总进度</h3>
                  <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
                </div>
                <Progress value={overallProgress} className="h-3" />
                <div className="flex justify-between mt-3 text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-muted-foreground">离校手续 {Math.round(tasksProgress)}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="text-muted-foreground">派出材料 {Math.round(materialsProgress)}%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-px h-16 bg-border" />
              <div className="text-center">
                <div className="text-sm text-muted-foreground">材料截止日期</div>
                <div className="text-lg font-semibold text-amber-600 mt-1">{currentStudent.deadline}</div>
                <div className="text-xs text-muted-foreground">距截止还有 87 天</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 学生与项目信息 */}
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
              <div className="text-right">
                <div className="text-sm text-muted-foreground">派出时间</div>
                <div className="font-medium">{currentStudent.dispatchTime}</div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground">参与项目</div>
              <div className="font-medium">{currentStudent.project}</div>
            </div>
          </CardContent>
        </Card>

        {/* Tab切换 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="tasks" className="flex items-center gap-2 text-sm">
              <ClipboardList className="h-4 w-4" />
              离校手续办理
              <Badge variant="secondary" className="ml-1 h-5 text-xs">
                {completedTasksCount}/{tasks.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2 text-sm">
              <Plane className="h-4 w-4" />
              派出材料准备
              <Badge variant="secondary" className="ml-1 h-5 text-xs">
                {uploadedMaterialsCount}/{materialTypes.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* 离校手续办理 Tab */}
          <TabsContent value="tasks" className="space-y-3 mt-4">
            {tasks.map((task, index) => {
              const statusConfig = getTaskStatusConfig(task.status)
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

            {/* 完成离校按钮 */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">确认离校手续</h4>
                    <p className="text-sm text-muted-foreground">
                      {tasksProgress === 100 
                        ? "所有离校手续已完成" 
                        : "请完成所有必办任务"}
                    </p>
                  </div>
                  <Button disabled={tasksProgress < 100} variant={tasksProgress === 100 ? "default" : "outline"}>
                    {tasksProgress === 100 ? "已完成" : "待完成"}
                    {tasksProgress === 100 && <CheckCircle2 className="h-4 w-4 ml-2" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 派出材料准备 Tab */}
          <TabsContent value="materials" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              {materialTypes.map((material) => (
                <Card 
                  key={material.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedMaterial === material.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedMaterial(material.id)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getMaterialStatusIcon(material.status)}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{material.name}</h3>
                            {material.required && (
                              <Badge variant="destructive" className="text-xs">必需</Badge>
                            )}
                            {material.aiVerified && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-600 border-green-200">
                                <Sparkles className="h-3 w-3 mr-1" />
                                AI已验证
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{material.description}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {getMaterialStatusText(material.status)}
                      </Badge>
                    </div>

                    {material.status === "uploaded" && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="font-medium truncate max-w-[180px]">{material.fileName}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-7 px-2">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          上传时间：{material.uploadTime}
                        </div>
                      </div>
                    )}

                    {material.status !== "uploaded" && (
                      <div className="mt-4">
                        <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors">
                          <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                          <p className="text-xs text-muted-foreground mt-2">点击或拖拽上传</p>
                          <p className="text-xs text-muted-foreground">PDF/JPG/PNG，最大10MB</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 补充说明 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  补充说明
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="如有需要补充说明的情况，请在此处填写..."
                  className="min-h-[80px]"
                />
                <div className="flex justify-end gap-3 mt-4">
                  <Button variant="outline">保存草稿</Button>
                  <Button disabled={materialsProgress < 100}>提交审核</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI助手面板 */}
      <AIAssistantPanel 
        title="AI派出助手" 
        subtitle={activeTab === "tasks" ? "智能引导离校流程" : "协助您完成材料准备"}
      >
        {/* 当前进度 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>{activeTab === "tasks" ? "离校手续进度" : "材料提交进度"}</span>
            <span className="font-medium">
              {activeTab === "tasks" ? Math.round(tasksProgress) : Math.round(materialsProgress)}%
            </span>
          </div>
          <Progress 
            value={activeTab === "tasks" ? tasksProgress : materialsProgress} 
            className="h-2" 
          />
          <p className="text-xs text-muted-foreground">
            {activeTab === "tasks" 
              ? `已完成 ${completedTasksCount}/${tasks.length} 项手续`
              : `已上传 ${uploadedMaterialsCount}/${materialTypes.length} 项材料`
            }
          </p>
        </div>

        {/* 根据Tab显示不同内容 */}
        {activeTab === "tasks" ? (
          <>
            {/* 当前任务提示 */}
            <div className="p-3 bg-primary/10 rounded-lg">
              <div className="text-xs text-primary mb-1">当前任务</div>
              <div className="text-sm font-medium">学籍异动办理</div>
              <p className="text-xs text-muted-foreground mt-1">
                根据您的学生身份（本科生），请前往本科生院系统办理保留学籍手续
              </p>
            </div>

            {/* 智能提醒 */}
            <div className="space-y-2">
              <AISuggestion
                title="学籍异动提醒"
                description="学籍异动办理需要导师签字，请提前联系导师确认"
                type="warning"
              />
              <AISuggestion
                title="财务结算提示"
                description="财务结算可能需要2-3个工作日，建议尽早办理"
                type="info"
              />
            </div>
          </>
        ) : (
          <>
            {/* 材料完整性检查 */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <FileCheck className="h-4 w-4" />
                材料完整性检查
              </h4>
              <div className="space-y-2">
                <AIChecklistItem label="保留学籍证明" status="completed" detail="已验证" />
                <AIChecklistItem label="境外录取通知书" status="completed" detail="已验证" />
                <AIChecklistItem label="签证材料" status="pending" detail="待上传" />
                <AIChecklistItem label="境外保险证明" status="pending" detail="待上传" />
                <AIChecklistItem label="紧急联系人确认书" status="completed" detail="已验证" />
              </div>
            </div>

            <AISuggestion
              title="签证材料提醒"
              description="建议尽快申请签证，预计办理时间约2-4周"
              type="action"
              onApply={() => {}}
            />
          </>
        )}

        {/* 截止时间提醒 */}
        <AIReminder
          title="材料提交截止"
          deadline="2026-06-30 23:59"
          description="距离截止还有87天，请尽快完成所有准备工作"
        />

        {/* 流程预览 */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground font-medium">流程预览</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-xs">查看派出准备清单</span>
            </div>
            <div className="flex items-center gap-2">
              {tasksProgress === 100 
                ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                : <Clock className="h-4 w-4 text-amber-500" />
              }
              <span className={`text-xs ${tasksProgress < 100 ? "font-medium" : ""}`}>
                完成离校手续办理
              </span>
            </div>
            <div className="flex items-center gap-2">
              {materialsProgress === 100 
                ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                : tasksProgress === 100 
                  ? <Clock className="h-4 w-4 text-amber-500" />
                  : <Circle className="h-4 w-4 text-muted-foreground" />
              }
              <span className={`text-xs ${tasksProgress === 100 && materialsProgress < 100 ? "font-medium" : ""}`}>
                完成派出材料准备
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">等待审核确认派出</span>
            </div>
          </div>
        </div>

        {/* 预计完成时间 */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">预计完成时间</div>
          <div className="text-lg font-semibold">3-5 个工作日</div>
          <p className="text-xs text-muted-foreground mt-1">
            基于历史数据智能预估
          </p>
        </div>
      </AIAssistantPanel>
    </div>
  )
}
