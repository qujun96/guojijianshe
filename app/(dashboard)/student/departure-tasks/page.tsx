"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  FileText,
  UserCog,
  CreditCard,
  Building2,
  BookOpen,
  Sparkles,
  ExternalLink,
  Upload,
  Plane,
  Eye,
  Download,
  ClipboardList,
  AlertCircle,
  Search,
  X,
  FileCheck,
  CheckSquare,
  Plus,
  Trash2,
  MapPin
} from "lucide-react"
import {
  AIAssistantPanel,
  AISuggestion,
  AIReminder,
} from "@/components/ai/ai-assistant-panel"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

// ============ 离校手续数据 ============
interface Task {
  id: string
  name: string
  description: string
  status: "completed" | "in_progress" | "pending"
  department: string
  icon: React.ReactNode
  required: boolean
  type: "auto" | "upload" | "dual" // auto=自动完成, upload=仅上传, dual=双方式
  externalSystem?: string
  externalUrl?: string
  uploadedFile?: {
    name: string
    time: string
  }
  queryStatus?: "completed" | "pending" | null // 查询方式的状态
}

const initialTasks: Task[] = [
  {
    id: "1",
    name: "项目申请审批",
    description: "完成国际化项目申请并通过审批",
    status: "completed",
    department: "国际处",
    icon: <FileText className="h-5 w-5" />,
    required: true,
    type: "auto",
  },
  {
    id: "2",
    name: "辅导员/导师签字确认",
    description: "上传导师签字同意的派出学习确认书",
    status: "pending",
    department: "所在学院",
    icon: <BookOpen className="h-5 w-5" />,
    required: true,
    type: "upload",
  },
  {
    id: "3",
    name: "学籍异动办理",
    description: "办理保留学籍/休学等学籍异动手续",
    status: "pending",
    department: "本科生院/研究生院",
    icon: <UserCog className="h-5 w-5" />,
    required: true,
    type: "dual",
    externalSystem: "学籍管理系统",
    externalUrl: "#",
    queryStatus: null,
  },
  {
    id: "4",
    name: "财务结算确认",
    description: "确认学费、住宿费等财务事项已结清",
    status: "pending",
    department: "财务处",
    icon: <CreditCard className="h-5 w-5" />,
    required: true,
    type: "dual",
    externalSystem: "财务管理系统",
    externalUrl: "#",
    queryStatus: null,
  },
  {
    id: "5",
    name: "宿舍退宿办理",
    description: "办理宿舍退宿或保留床位手续",
    status: "pending",
    department: "后勤集团",
    icon: <Building2 className="h-5 w-5" />,
    required: true,
    type: "dual",
    externalSystem: "宿舍管理系统",
    externalUrl: "#",
    queryStatus: null,
  },
  {
    id: "6",
    name: "图书馆结清",
    description: "确认图书馆借阅书籍已归还、无欠款",
    status: "pending",
    department: "图书馆",
    icon: <BookOpen className="h-5 w-5" />,
    required: false,
    type: "dual",
    externalSystem: "图书馆管理系统",
    externalUrl: "#",
    queryStatus: null,
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
  type?: "file" | "itinerary" // file=文件上传, itinerary=行程信息表格
}

// ============ 行程信息数据 ============
interface ItineraryItem {
  id: string
  date: string
  country: string
  city: string
  transport: string
  flightNo: string
  departureTime: string
  arrivalTime: string
  details: string
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
    type: "file",
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
    type: "file",
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
    type: "file",
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
    type: "file",
  },
  {
    id: "itinerary",
    name: "行程信息",
    description: "填写往返行程安排，包括日期、交通方式、航班信息等",
    required: false,
    status: "not_started",
    fileName: null,
    uploadTime: null,
    aiVerified: false,
    type: "itinerary",
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
    type: "file",
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
  const [tasks, setTasks] = useState(initialTasks)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [currentUploadTask, setCurrentUploadTask] = useState<Task | null>(null)
  
  // 行程信息状态
  const [showItineraryDialog, setShowItineraryDialog] = useState(false)
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>([
    {
      id: "1",
      date: "2026-07-15",
      country: "中国",
      city: "北京",
      transport: "飞机",
      flightNo: "CA981",
      departureTime: "08:30",
      arrivalTime: "12:45",
      details: "首都机场T3航站楼出发，前往A国X市",
    },
    {
      id: "2",
      date: "2026-07-15",
      country: "A国",
      city: "X市",
      transport: "大巴",
      flightNo: "-",
      departureTime: "14:00",
      arrivalTime: "15:30",
      details: "机场大巴前往学校",
    },
  ])
  const [editingItinerary, setEditingItinerary] = useState<ItineraryItem | null>(null)
  const [newItinerary, setNewItinerary] = useState<Partial<ItineraryItem>>({
    date: "",
    country: "",
    city: "",
    transport: "",
    flightNo: "",
    departureTime: "",
    arrivalTime: "",
    details: "",
  })

  // 判断任务是否完成（双方式任务只需完成任意一种）
  const isTaskCompleted = (task: Task) => {
    if (task.status === "completed") return true
    if (task.type === "dual") {
      return task.queryStatus === "completed" || task.uploadedFile !== undefined
    }
    if (task.type === "upload") {
      return task.uploadedFile !== undefined
    }
    return false
  }

  // 离校手续进度计算
  const completedTasksCount = tasks.filter(t => isTaskCompleted(t)).length
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

  // 模拟查询外部系统状态
  const handleQueryStatus = (taskId: string) => {
    // 模拟查询返回已完成
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, queryStatus: "completed" as const } : t
    ))
  }

  // 打开上传弹窗
  const handleOpenUpload = (task: Task) => {
    setCurrentUploadTask(task)
    setShowUploadDialog(true)
  }

  // 模拟上传文件
  const handleUploadFile = () => {
    if (!currentUploadTask) return
    setTasks(prev => prev.map(t => 
      t.id === currentUploadTask.id ? { 
        ...t, 
        uploadedFile: { 
          name: `${t.name}佐证材料_张三.pdf`, 
          time: new Date().toLocaleString() 
        } 
      } : t
    ))
    setShowUploadDialog(false)
    setCurrentUploadTask(null)
  }

  // 删除上传的文件
  const handleRemoveFile = (taskId: string) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, uploadedFile: undefined } : t
    ))
  }

  // 行程信息操作
  const handleAddItinerary = () => {
    if (!newItinerary.date || !newItinerary.country || !newItinerary.city) return
    const newItem: ItineraryItem = {
      id: Date.now().toString(),
      date: newItinerary.date || "",
      country: newItinerary.country || "",
      city: newItinerary.city || "",
      transport: newItinerary.transport || "",
      flightNo: newItinerary.flightNo || "-",
      departureTime: newItinerary.departureTime || "",
      arrivalTime: newItinerary.arrivalTime || "",
      details: newItinerary.details || "",
    }
    setItineraryItems(prev => [...prev, newItem])
    setNewItinerary({
      date: "",
      country: "",
      city: "",
      transport: "",
      flightNo: "",
      departureTime: "",
      arrivalTime: "",
      details: "",
    })
  }

  const handleDeleteItinerary = (id: string) => {
    setItineraryItems(prev => prev.filter(item => item.id !== id))
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

        {/* Tab切��� - 优化样式 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="bg-muted/50 p-1 rounded-xl">
            <TabsList className="grid w-full grid-cols-2 h-14 bg-transparent gap-1">
              <TabsTrigger 
                value="tasks" 
                className="flex items-center gap-3 text-sm h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground transition-all"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 data-[state=active]:bg-blue-500">
                  <ClipboardList className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">离校手续办理</div>
                  <div className="text-xs text-muted-foreground">{completedTasksCount}/{tasks.length} 已完成</div>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="materials" 
                className="flex items-center gap-3 text-sm h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground transition-all"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100">
                  <Plane className="h-4 w-4 text-amber-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">派出材料准备</div>
                  <div className="text-xs text-muted-foreground">{uploadedMaterialsCount}/{materialTypes.length} 已上传</div>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* 离校手续办理 Tab */}
          <TabsContent value="tasks" className="space-y-3 mt-4">
            {tasks.map((task, index) => {
              const statusConfig = getTaskStatusConfig(isTaskCompleted(task) ? "completed" : task.status)
              const completed = isTaskCompleted(task)
              
              return (
                <Card 
                  key={task.id} 
                  className={`border-l-4 ${completed ? "border-l-green-500" : statusConfig.borderColor} transition-all hover:shadow-md`}
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
                          <Badge className={`text-xs h-5 ${completed ? "bg-green-100 text-green-700" : statusConfig.color}`}>
                            {completed ? "已完成" : statusConfig.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                        <div className="text-xs text-muted-foreground mb-3">
                          办理部门: {task.department}
                        </div>

                        {/* 根据类型显示不同的操作区域 */}
                        {task.type === "auto" && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>系统自动确认完成</span>
                          </div>
                        )}

                        {task.type === "upload" && (
                          <div className="space-y-2">
                            {task.uploadedFile ? (
                              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center gap-2">
                                  <FileCheck className="h-4 w-4 text-green-600" />
                                  <span className="text-sm font-medium">{task.uploadedFile.name}</span>
                                  <span className="text-xs text-muted-foreground">({task.uploadedFile.time})</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="sm" className="h-7 px-2">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-7 px-2 text-red-500 hover:text-red-600" onClick={() => handleRemoveFile(task.id)}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <Button variant="outline" size="sm" className="gap-2" onClick={() => handleOpenUpload(task)}>
                                <Upload className="h-4 w-4" />
                                上传签字确认书
                              </Button>
                            )}
                          </div>
                        )}

                        {task.type === "dual" && (
                          <div className="space-y-3">
                            <div className="text-xs text-muted-foreground font-medium">完成以下任意一种方式即可：</div>
                            <div className="grid grid-cols-2 gap-3">
                              {/* 方式一：查询状态 */}
                              <div className={`p-3 rounded-lg border ${task.queryStatus === "completed" ? "bg-green-50 border-green-200" : "bg-muted/30 border-dashed"}`}>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${task.queryStatus === "completed" ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}>
                                    {task.queryStatus === "completed" ? <CheckCircle2 className="h-3 w-3" /> : "1"}
                                  </div>
                                  <span className="text-sm font-medium">查询办理状态</span>
                                </div>
                                {task.queryStatus === "completed" ? (
                                  <div className="flex items-center gap-2 text-sm text-green-600">
                                    <CheckSquare className="h-4 w-4" />
                                    <span>已确认办理完成</span>
                                  </div>
                                ) : (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full gap-2"
                                    onClick={() => handleQueryStatus(task.id)}
                                  >
                                    <Search className="h-4 w-4" />
                                    查询{task.externalSystem}
                                    <ExternalLink className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>

                              {/* 方式二：上传佐证 */}
                              <div className={`p-3 rounded-lg border ${task.uploadedFile ? "bg-green-50 border-green-200" : "bg-muted/30 border-dashed"}`}>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${task.uploadedFile ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}>
                                    {task.uploadedFile ? <CheckCircle2 className="h-3 w-3" /> : "2"}
                                  </div>
                                  <span className="text-sm font-medium">上传办理佐证</span>
                                </div>
                                {task.uploadedFile ? (
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-sm text-green-600 truncate">
                                      <FileCheck className="h-4 w-4 flex-shrink-0" />
                                      <span className="truncate">{task.uploadedFile.name}</span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-6 px-1 text-red-500 hover:text-red-600" onClick={() => handleRemoveFile(task.id)}>
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ) : (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full gap-2"
                                    onClick={() => handleOpenUpload(task)}
                                  >
                                    <Upload className="h-4 w-4" />
                                    上传佐证材料
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        {completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          statusConfig.icon
                        )}
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
              {materialTypes.filter(m => m.type !== "itinerary").map((material) => (
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

            {/* 行程信息卡片 - 在线填写 */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">行程信息</CardTitle>
                    <Badge variant="outline" className="text-xs">选填</Badge>
                    {itineraryItems.length > 0 && (
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        已填写 {itineraryItems.length} 条
                      </Badge>
                    )}
                  </div>
                  <Button size="sm" onClick={() => setShowItineraryDialog(true)}>
                    <Plus className="h-4 w-4 mr-1" />
                    添加行程
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">填写往返行程安排，包括日期、交通方式、航班信息等</p>
              </CardHeader>
              <CardContent>
                {itineraryItems.length === 0 ? (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Plane className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-3">暂无行程信息</p>
                    <p className="text-xs text-muted-foreground">点击上方"添加行程"按钮填写行程安排</p>
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="w-[100px]">日期</TableHead>
                          <TableHead className="w-[90px]">国家(地区)</TableHead>
                          <TableHead className="w-[80px]">城市</TableHead>
                          <TableHead className="w-[80px]">交通工具</TableHead>
                          <TableHead className="w-[90px]">航班/班次</TableHead>
                          <TableHead className="w-[120px]">出发-到达时间</TableHead>
                          <TableHead>详细内容</TableHead>
                          <TableHead className="w-[60px]">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {itineraryItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.date}</TableCell>
                            <TableCell>{item.country}</TableCell>
                            <TableCell>{item.city}</TableCell>
                            <TableCell>{item.transport}</TableCell>
                            <TableCell>{item.flightNo}</TableCell>
                            <TableCell>{item.departureTime} - {item.arrivalTime}</TableCell>
                            <TableCell className="max-w-[200px] truncate" title={item.details}>{item.details}</TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0 text-red-500 hover:text-red-600"
                                onClick={() => handleDeleteItinerary(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

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
        </div>

        {activeTab === "tasks" ? (
          <>
            <AISuggestion title="办理建议">
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>1. 导师签字确认书需要导师手写签名</li>
                <li>2. 学籍异动可通过系统查询或上传办理凭证完成</li>
                <li>3. 财务、宿舍等手续建议提前1周办理</li>
              </ul>
            </AISuggestion>
            <AIReminder 
              title="温馨提示"
              items={[
                "每项任务支持两种完成方式，任选其一即可",
                "上传的佐证材料需清晰可辨认",
                "如有疑问请联系相关办理部门"
              ]}
            />
          </>
        ) : (
          <>
            <AISuggestion title="材料要求">
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>1. 所有材料需清晰可辨认</li>
                <li>2. 签证材料请上传有效期内的签证页</li>
                <li>3. 保险需覆盖整个派出期间</li>
              </ul>
            </AISuggestion>
            <AIReminder 
              title="截止提醒"
              items={[
                `材料提交截止日期：${currentStudent.deadline}`,
                "请确保所���必需材料按时提交",
                "提交后将进入管理员审核流程"
              ]}
            />
          </>
        )}
      </AIAssistantPanel>

      {/* 上传文件弹窗 */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              上传{currentUploadTask?.name}材料
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground mt-3">点击或拖拽文件到此处上传</p>
              <p className="text-xs text-muted-foreground mt-1">支持 PDF/JPG/PNG 格式，最大 10MB</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">提示：</span>
                {currentUploadTask?.type === "upload" 
                  ? "请上传导师签字确认的派出学习确认书扫描件或照片"
                  : "请上传办理完成的凭证、回执单或相关证明材料"
                }
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>取消</Button>
              <Button onClick={handleUploadFile}>确认上传</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 添加行程信息弹窗 */}
      <Dialog open={showItineraryDialog} onOpenChange={setShowItineraryDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              添加行程信息
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>日期 <span className="text-destructive">*</span></Label>
                <Input 
                  type="date" 
                  value={newItinerary.date || ""}
                  onChange={(e) => setNewItinerary(prev => ({...prev, date: e.target.value}))}
                />
              </div>
              <div className="space-y-2">
                <Label>国家(地区) <span className="text-destructive">*</span></Label>
                <Input 
                  placeholder="如：中国、A国" 
                  value={newItinerary.country || ""}
                  onChange={(e) => setNewItinerary(prev => ({...prev, country: e.target.value}))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>城市 <span className="text-destructive">*</span></Label>
                <Input 
                  placeholder="如：北京、X市" 
                  value={newItinerary.city || ""}
                  onChange={(e) => setNewItinerary(prev => ({...prev, city: e.target.value}))}
                />
              </div>
              <div className="space-y-2">
                <Label>交通工具</Label>
                <Select 
                  value={newItinerary.transport || ""}
                  onValueChange={(v) => setNewItinerary(prev => ({...prev, transport: v}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="飞机">飞机</SelectItem>
                    <SelectItem value="火车">火车</SelectItem>
                    <SelectItem value="大巴">大巴</SelectItem>
                    <SelectItem value="轮船">轮船</SelectItem>
                    <SelectItem value="地铁">地铁</SelectItem>
                    <SelectItem value="出租车">出租车</SelectItem>
                    <SelectItem value="其他">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>航班/班次</Label>
                <Input 
                  placeholder="如：CA981" 
                  value={newItinerary.flightNo || ""}
                  onChange={(e) => setNewItinerary(prev => ({...prev, flightNo: e.target.value}))}
                />
              </div>
              <div className="space-y-2">
                <Label>出发时间</Label>
                <Input 
                  type="time" 
                  value={newItinerary.departureTime || ""}
                  onChange={(e) => setNewItinerary(prev => ({...prev, departureTime: e.target.value}))}
                />
              </div>
              <div className="space-y-2">
                <Label>到达时间</Label>
                <Input 
                  type="time" 
                  value={newItinerary.arrivalTime || ""}
                  onChange={(e) => setNewItinerary(prev => ({...prev, arrivalTime: e.target.value}))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>详细内容</Label>
              <Textarea 
                placeholder="填写行程详细说明，如出发地点、到达地点、注意事项等..."
                rows={3}
                value={newItinerary.details || ""}
                onChange={(e) => setNewItinerary(prev => ({...prev, details: e.target.value}))}
              />
            </div>
            <div className="flex justify-end gap-3 pt-2 border-t">
              <Button variant="outline" onClick={() => setShowItineraryDialog(false)}>取消</Button>
              <Button onClick={() => { handleAddItinerary(); setShowItineraryDialog(false); }}>
                <Plus className="h-4 w-4 mr-1" />
                添加行程
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
