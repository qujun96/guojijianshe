"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AIAssistantPanel } from "@/components/ai/ai-assistant-panel"
import { 
  Search, 
  RotateCcw, 
  Eye, 
  Sparkles, 
  FileArchive, 
  Download, 
  CheckCircle, 
  XCircle,
  FolderOpen, 
  FileText, 
  Image, 
  File,
  Clock,
  AlertCircle
} from "lucide-react"

// 项目类型定义 - 不同类型有不同的归档材料要求
const projectTypeConfig: Record<string, {
  label: string
  requiredMaterials: string[]
  optionalMaterials: string[]
  hasGrades: boolean
  hasCreditTransfer: boolean
}> = {
  "long_term": {
    label: "长期交换项目（3个月以上）",
    requiredMaterials: ["护照扫描件", "签证复印件", "境外成绩单", "学习证明", "总结报告"],
    optionalMaterials: ["学分兑换证明", "留学照片"],
    hasGrades: true,
    hasCreditTransfer: true,
  },
  "short_term": {
    label: "短期交流项目（3个月以下）",
    requiredMaterials: ["护照扫描件", "参与证明", "总结报告"],
    optionalMaterials: ["活动照片"],
    hasGrades: false,
    hasCreditTransfer: false,
  },
  "summer_program": {
    label: "暑期项目",
    requiredMaterials: ["护照扫描件", "结业证书", "总结报告"],
    optionalMaterials: ["课程证明", "活动照片"],
    hasGrades: false,
    hasCreditTransfer: false,
  },
  "joint_training": {
    label: "联合培养项目",
    requiredMaterials: ["护照扫描件", "签证复印件", "境外成绩单", "学习证明", "导师评语", "总结报告"],
    optionalMaterials: ["学分兑换证明", "科研成果", "留学照片"],
    hasGrades: true,
    hasCreditTransfer: true,
  },
  "competition": {
    label: "国际竞赛/会议",
    requiredMaterials: ["护照扫描件", "参赛/参会证明", "总结报告"],
    optionalMaterials: ["获奖证书", "活动照片"],
    hasGrades: false,
    hasCreditTransfer: false,
  },
}

const archiveData = [
  {
    id: "1",
    studentName: "李明辉",
    studentId: "2020030002",
    college: "计算机学院",
    studentType: "研究生",
    project: "英国剑桥大学联合培养项目",
    projectType: "joint_training",
    archiveDate: "2027-02-01",
    status: "complete",
    materials: [
      { name: "护照扫描件", type: "pdf", size: "2.3MB", required: true },
      { name: "签证复印件", type: "pdf", size: "1.2MB", required: true },
      { name: "境外成绩单", type: "pdf", size: "1.8MB", required: true },
      { name: "学习证明", type: "pdf", size: "0.9MB", required: true },
      { name: "导师评语", type: "pdf", size: "0.5MB", required: true },
      { name: "总结报告", type: "pdf", size: "3.2MB", required: true },
      { name: "学分兑换证明", type: "pdf", size: "0.8MB", required: false },
      { name: "留学照片", type: "image", size: "15.6MB", required: false },
    ],
    totalSize: "26.3MB",
  },
  {
    id: "2",
    studentName: "张晓雯",
    studentId: "2021020003",
    college: "外国语学院",
    studentType: "本科生",
    project: "日本早稻田大学交换项目",
    projectType: "long_term",
    archiveDate: "2027-01-28",
    status: "pending",
    materials: [
      { name: "护照扫描件", type: "pdf", size: "2.1MB", required: true },
      { name: "境外成绩单", type: "pdf", size: "1.5MB", required: true },
    ],
    totalSize: "3.6MB",
  },
  {
    id: "3",
    studentName: "王家璇",
    studentId: "2021010001",
    college: "美视电影学院",
    studentType: "本科生",
    project: "韩国文化体验夏令营",
    projectType: "summer_program",
    archiveDate: "",
    status: "incomplete",
    materials: [],
    totalSize: "0MB",
  },
  {
    id: "4",
    studentName: "陈思远",
    studentId: "2022040005",
    college: "经济管理学院",
    studentType: "本科生",
    project: "新加坡商业研习短期项目",
    projectType: "short_term",
    archiveDate: "2027-01-15",
    status: "complete",
    materials: [
      { name: "护照扫描件", type: "pdf", size: "2.0MB", required: true },
      { name: "参与证明", type: "pdf", size: "0.5MB", required: true },
      { name: "总结报告", type: "pdf", size: "1.8MB", required: true },
      { name: "活动照片", type: "image", size: "8.2MB", required: false },
    ],
    totalSize: "12.5MB",
  },
  {
    id: "5",
    studentName: "刘雨桐",
    studentId: "2021050008",
    college: "数学与统计学院",
    studentType: "本科生",
    project: "国际数学建模竞赛(MCM/ICM)",
    projectType: "competition",
    archiveDate: "2027-02-05",
    status: "complete",
    materials: [
      { name: "护照扫描件", type: "pdf", size: "2.1MB", required: true },
      { name: "参赛证明", type: "pdf", size: "0.4MB", required: true },
      { name: "总结报告", type: "pdf", size: "1.2MB", required: true },
      { name: "获奖证书", type: "pdf", size: "0.6MB", required: false },
    ],
    totalSize: "4.3MB",
  },
]

export default function ArchiveManagePage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [projectTypeFilter, setProjectTypeFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<typeof archiveData[0] | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  const filteredData = archiveData.filter(item => {
    const matchesSearch = item.studentName.includes(searchTerm) || item.studentId.includes(searchTerm)
    const matchesTab = activeTab === "all" || item.status === activeTab
    const matchesType = projectTypeFilter === "all" || item.projectType === projectTypeFilter
    return matchesSearch && matchesTab && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">已归档</Badge>
      case "pending":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">归档中</Badge>
      case "incomplete":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">未归档</Badge>
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  const getProjectTypeBadge = (type: string) => {
    const config = projectTypeConfig[type]
    if (!config) return null
    
    const colorClass = config.hasGrades 
      ? "bg-blue-50 text-blue-700 border-blue-200" 
      : "bg-purple-50 text-purple-700 border-purple-200"
    
    return (
      <Badge variant="outline" className={colorClass}>
        {config.hasGrades ? "需成绩" : "无成绩"}
      </Badge>
    )
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "image":
        return <Image className="h-4 w-4 text-blue-500" />
      default:
        return <File className="h-4 w-4 text-gray-500" />
    }
  }

  // 检查材料完整性
  const checkMaterialCompleteness = (student: typeof archiveData[0]) => {
    const config = projectTypeConfig[student.projectType]
    if (!config) return { complete: 0, total: 0, missing: [] as string[] }
    
    const requiredMaterials = config.requiredMaterials
    const submittedNames = student.materials.map(m => m.name)
    const missing = requiredMaterials.filter(m => !submittedNames.includes(m))
    
    return {
      complete: requiredMaterials.length - missing.length,
      total: requiredMaterials.length,
      missing
    }
  }

  const stats = {
    total: archiveData.length,
    complete: archiveData.filter(d => d.status === "complete").length,
    pending: archiveData.filter(d => d.status === "pending").length,
    incomplete: archiveData.filter(d => d.status === "incomplete").length,
  }

  // 获取待处理的提醒
  const getReminders = () => {
    const reminders: { type: "warning" | "error", message: string }[] = []
    archiveData.forEach(student => {
      if (student.status === "incomplete") {
        reminders.push({
          type: "error",
          message: `${student.studentName}同学尚未开始归档流程`
        })
      } else if (student.status === "pending") {
        const { missing } = checkMaterialCompleteness(student)
        if (missing.length > 0) {
          reminders.push({
            type: "warning",
            message: `${student.studentName}同学缺少：${missing.slice(0, 2).join("、")}${missing.length > 2 ? "等" : ""}`
          })
        }
      }
    })
    return reminders.slice(0, 4)
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              <FileArchive className="h-6 w-6" />
              归档材料管理
            </h1>
            <p className="text-muted-foreground mt-1">管理学生留学全流程电子档案，不同项目类型有不同的材料要求</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            批量导出
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-muted-foreground">总档案数</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.complete}</div>
                <div className="text-sm text-muted-foreground">已归档</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
                <div className="text-sm text-muted-foreground">归档中</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{stats.incomplete}</div>
                <div className="text-sm text-muted-foreground">未归档</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="complete">已归档</TabsTrigger>
                <TabsTrigger value="pending">归档中</TabsTrigger>
                <TabsTrigger value="incomplete">未归档</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索学生姓名或学号..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={projectTypeFilter} onValueChange={setProjectTypeFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="项目类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部项目类型</SelectItem>
                  {Object.entries(projectTypeConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={() => { setSearchTerm(""); setProjectTypeFilter("all") }}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>学生信息</TableHead>
                  <TableHead>派出项目</TableHead>
                  <TableHead>项目类型</TableHead>
                  <TableHead>材料进度</TableHead>
                  <TableHead>档案大小</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => {
                  const { complete, total, missing } = checkMaterialCompleteness(item)
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.studentName}</div>
                          <div className="text-xs text-muted-foreground">{item.studentId}</div>
                          <div className="text-xs text-muted-foreground">{item.college}</div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[180px]">
                        <div className="truncate" title={item.project}>{item.project}</div>
                      </TableCell>
                      <TableCell>
                        {getProjectTypeBadge(item.projectType)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${complete === total ? "bg-green-500" : "bg-amber-500"}`}
                              style={{ width: `${(complete / total) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{complete}/{total}</span>
                        </div>
                        {missing.length > 0 && (
                          <div className="text-xs text-red-500 mt-1">
                            缺: {missing.slice(0, 2).join("、")}{missing.length > 2 ? "..." : ""}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{item.totalSize}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedStudent(item)
                              setShowDetailDialog(true)
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            查看
                          </Button>
                          {item.status === "complete" && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              下载
                            </Button>
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
      <AIAssistantPanel title="AI归档助手" subtitle="智能材料管理与提醒">
        <div className="text-center py-2">
          <div className="text-3xl font-bold text-green-600">
            {Math.round((stats.complete / stats.total) * 100)}%
          </div>
          <div className="text-sm text-muted-foreground">归档完成率</div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            存储统计
          </h4>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs p-2 bg-muted rounded">
              <span>已用空间</span>
              <span className="font-medium">
                {archiveData.reduce((acc, d) => acc + parseFloat(d.totalSize), 0).toFixed(1)} MB
              </span>
            </div>
            <div className="flex items-center justify-between text-xs p-2 bg-muted rounded">
              <span>文件总数</span>
              <span className="font-medium">
                {archiveData.reduce((acc, d) => acc + d.materials.length, 0)} 份
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            待处理提醒
          </h4>
          <div className="space-y-1.5">
            {getReminders().map((reminder, index) => (
              <div 
                key={index}
                className={`p-2 rounded text-xs ${
                  reminder.type === "error" 
                    ? "bg-red-50 text-red-700" 
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {reminder.message}
              </div>
            ))}
            {getReminders().length === 0 && (
              <div className="p-2 bg-green-50 rounded text-xs text-green-700">
                所有档案状态良好
              </div>
            )}
          </div>
        </div>
      </AIAssistantPanel>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileArchive className="h-5 w-5" />
              档案详情
            </DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="flex-1 overflow-y-auto space-y-4">
              {/* Student Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">学生姓名</Label>
                  <div className="font-medium">{selectedStudent.studentName}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">学号</Label>
                  <div className="font-medium">{selectedStudent.studentId}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">学院</Label>
                  <div className="font-medium">{selectedStudent.college}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">派出项目</Label>
                  <div className="font-medium">{selectedStudent.project}</div>
                </div>
              </div>

              {/* Project Type Info */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">项目类型</span>
                  {getProjectTypeBadge(selectedStudent.projectType)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {projectTypeConfig[selectedStudent.projectType]?.label}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <span className={projectTypeConfig[selectedStudent.projectType]?.hasGrades ? "text-blue-600" : "text-muted-foreground"}>
                    {projectTypeConfig[selectedStudent.projectType]?.hasGrades ? "需要成绩单" : "无需成绩单"}
                  </span>
                  <span className={projectTypeConfig[selectedStudent.projectType]?.hasCreditTransfer ? "text-blue-600" : "text-muted-foreground"}>
                    {projectTypeConfig[selectedStudent.projectType]?.hasCreditTransfer ? "可申请学分兑换" : "无学分兑换"}
                  </span>
                </div>
              </div>

              {/* Required Materials */}
              <div>
                <Label className="text-muted-foreground mb-2 block">必需材料</Label>
                <div className="space-y-2">
                  {projectTypeConfig[selectedStudent.projectType]?.requiredMaterials.map((materialName, index) => {
                    const submitted = selectedStudent.materials.find(m => m.name === materialName)
                    return (
                      <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${submitted ? "bg-green-50" : "bg-red-50"}`}>
                        <div className="flex items-center gap-3">
                          {submitted ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className={`font-medium ${submitted ? "text-green-700" : "text-red-700"}`}>
                            {materialName}
                          </span>
                          <Badge variant="outline" className="text-xs">必需</Badge>
                        </div>
                        {submitted ? (
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{submitted.size}</span>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-red-500">未提交</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Optional Materials */}
              {projectTypeConfig[selectedStudent.projectType]?.optionalMaterials.length > 0 && (
                <div>
                  <Label className="text-muted-foreground mb-2 block">可选材料</Label>
                  <div className="space-y-2">
                    {projectTypeConfig[selectedStudent.projectType]?.optionalMaterials.map((materialName, index) => {
                      const submitted = selectedStudent.materials.find(m => m.name === materialName)
                      return (
                        <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${submitted ? "bg-blue-50" : "bg-muted/50"}`}>
                          <div className="flex items-center gap-3">
                            {submitted ? (
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                            ) : (
                              <Clock className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className={submitted ? "text-blue-700 font-medium" : "text-muted-foreground"}>
                              {materialName}
                            </span>
                            <Badge variant="outline" className="text-xs text-muted-foreground">可选</Badge>
                          </div>
                          {submitted ? (
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-muted-foreground">{submitted.size}</span>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">未提交</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Archive Summary */}
              <div className="p-3 bg-muted/50 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">档案状态</span>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(selectedStudent.status)}
                    {selectedStudent.archiveDate && (
                      <span className="text-xs text-muted-foreground">
                        归档日期: {selectedStudent.archiveDate}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground">档案大小</span>
                  <div className="font-medium">{selectedStudent.totalSize}</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
