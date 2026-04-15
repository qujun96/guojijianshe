"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { AIAssistantPanel } from "@/components/ai/ai-assistant-panel"
import { ArrowLeft, Search, Users, Download, RotateCcw, UserCheck, UserX, Eye, TrendingUp } from "lucide-react"

const students = [
  {
    id: 1,
    name: "王家强",
    studentId: "2022010001",
    college: "美视电影学院",
    major: "广播电视编导",
    grade: "2022级",
    gpa: 3.85,
    cet: "CET-6 580分",
    status: "待审核",
    applyTime: "2026-03-15 14:30",
    aiScore: 92,
    aiSuggestion: "推荐通过，综合素质优秀"
  },
  {
    id: 2,
    name: "李明月",
    studentId: "2022010002",
    college: "计算机学院",
    major: "软件工程",
    grade: "2022级",
    gpa: 3.72,
    cet: "CET-6 545分",
    status: "已通过",
    applyTime: "2026-03-14 10:20",
    aiScore: 88,
    aiSuggestion: "推荐通过"
  },
  {
    id: 3,
    name: "张伟",
    studentId: "2022010003",
    college: "外国语学院",
    major: "英语",
    grade: "2022级",
    gpa: 3.45,
    cet: "CET-6 520分",
    status: "已拒绝",
    applyTime: "2026-03-13 16:45",
    aiScore: 65,
    aiSuggestion: "GPA略低于平均水平，建议人工复核"
  },
  {
    id: 4,
    name: "刘芳",
    studentId: "2022010004",
    college: "经济管理学院",
    major: "国际经济与贸易",
    grade: "2022级",
    gpa: 3.91,
    cet: "IELTS 7.0",
    status: "已确认派出",
    applyTime: "2026-03-12 09:15",
    aiScore: 95,
    aiSuggestion: "综合素质优秀，强烈推荐"
  },
  {
    id: 5,
    name: "陈志远",
    studentId: "2022010005",
    college: "美视电影学院",
    major: "戏剧影视导演",
    grade: "2022级",
    gpa: 3.68,
    cet: "CET-4 510分",
    status: "待审核",
    applyTime: "2026-03-16 11:30",
    aiScore: 78,
    aiSuggestion: "语言成绩偏低，建议关注"
  }
]

export default function StudentsListPage() {
  const router = useRouter()
  const params = useParams()
  const [filter, setFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<"approve" | "reject" | "view">("view")

  const filteredStudents = filter === "all" 
    ? students 
    : students.filter(s => {
        if (filter === "pending") return s.status === "待审核"
        if (filter === "approved") return s.status === "已通过"
        if (filter === "rejected") return s.status === "已拒绝"
        if (filter === "dispatched") return s.status === "已确认派出"
        return true
      })

  const handleAction = (student: typeof students[0], type: "approve" | "reject" | "view") => {
    setSelectedStudent(student)
    setDialogType(type)
    setDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "待审核":
        return <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">待审核</Badge>
      case "已通过":
        return <Badge variant="default" className="bg-green-500">已通过</Badge>
      case "已拒绝":
        return <Badge variant="destructive">已拒绝</Badge>
      case "已确认派出":
        return <Badge variant="default" className="bg-primary">已确认派出</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {/* Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <h1 className="text-lg font-semibold">学生名单管理</h1>
                <p className="text-sm text-muted-foreground">
                  韩国忠南大学奖学金交换生项目(2026) - 项目编号：PRJ-{params.id}-2026
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                导出名单
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">报名学生列表</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filter Tabs */}
            <div className="flex gap-2">
              <Button 
                variant={filter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("all")}
              >
                全部 <Badge variant="secondary" className="ml-1">{students.length}</Badge>
              </Button>
              <Button 
                variant={filter === "pending" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("pending")}
              >
                待审核 <Badge variant="secondary" className="ml-1">{students.filter(s => s.status === "待审核").length}</Badge>
              </Button>
              <Button 
                variant={filter === "approved" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("approved")}
              >
                已通过 <Badge variant="secondary" className="ml-1">{students.filter(s => s.status === "已通过").length}</Badge>
              </Button>
              <Button 
                variant={filter === "dispatched" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("dispatched")}
              >
                已确认派出 <Badge variant="secondary" className="ml-1">{students.filter(s => s.status === "已确认派出").length}</Badge>
              </Button>
              <Button 
                variant={filter === "rejected" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("rejected")}
              >
                已拒绝 <Badge variant="secondary" className="ml-1">{students.filter(s => s.status === "已拒绝").length}</Badge>
              </Button>
            </div>

            {/* Search */}
            <div className="flex gap-3">
              <Input placeholder="搜索学生姓名/学号" className="max-w-xs" />
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="选择学院" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部学院</SelectItem>
                  <SelectItem value="film">美视电影学院</SelectItem>
                  <SelectItem value="cs">计算机学院</SelectItem>
                  <SelectItem value="foreign">外国语学院</SelectItem>
                  <SelectItem value="econ">经济管理学院</SelectItem>
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

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>学生姓名</TableHead>
                  <TableHead>学号</TableHead>
                  <TableHead>学院</TableHead>
                  <TableHead>专业</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>语言成绩</TableHead>
                  <TableHead>AI评分</TableHead>
                  <TableHead>申请时间</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>{student.college}</TableCell>
                    <TableCell>{student.major}</TableCell>
                    <TableCell>
                      <span className={student.gpa >= 3.7 ? "text-green-600 font-medium" : ""}>
                        {student.gpa}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">{student.cet}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          student.aiScore >= 90 ? "text-green-600 border-green-300 bg-green-50" :
                          student.aiScore >= 75 ? "text-primary border-primary/30 bg-primary/10" :
                          "text-amber-600 border-amber-300 bg-amber-50"
                        }
                      >
                        {student.aiScore}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{student.applyTime}</TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => router.push(`/admin/review/${student.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {student.status === "待审核" && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleAction(student, "approve")}
                            >
                              <UserCheck className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleAction(student, "reject")}
                            >
                              <UserX className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>共 {filteredStudents.length} 条</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>上一页</Button>
                <Button variant="default" size="sm">1</Button>
                <Button variant="outline" size="sm">下一页</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI智能分析" subtitle="学生数据洞察">
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            AI审核建议
          </h4>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-1">
            <p className="text-sm font-medium text-green-700">推荐优先审核</p>
            <p className="text-xs text-green-600">王家强、刘芳 - AI评分90+</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-1">
            <p className="text-sm font-medium text-amber-700">建议人工复核</p>
            <p className="text-xs text-amber-600">张伟 - GPA略低于要求</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">学院分布</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">美视电影学院</span>
              <span className="font-medium">2人</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">计算机学院</span>
              <span className="font-medium">1人</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">外国语学院</span>
              <span className="font-medium">1人</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">经济管理学院</span>
              <span className="font-medium">1人</span>
            </div>
          </div>
        </div>
      </AIAssistantPanel>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === "view" && "学生信息详情"}
              {dialogType === "approve" && "确认通过审核"}
              {dialogType === "reject" && "确认拒绝申请"}
            </DialogTitle>
            <DialogDescription>
              {selectedStudent && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">学生姓名</p>
                      <p className="font-medium text-foreground">{selectedStudent.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">学号</p>
                      <p className="font-medium text-foreground">{selectedStudent.studentId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">学院</p>
                      <p className="font-medium text-foreground">{selectedStudent.college}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">专业</p>
                      <p className="font-medium text-foreground">{selectedStudent.major}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">GPA</p>
                      <p className="font-medium text-foreground">{selectedStudent.gpa}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">语言成绩</p>
                      <p className="font-medium text-foreground">{selectedStudent.cet}</p>
                    </div>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                    <p className="text-sm font-medium text-primary">AI建议</p>
                    <p className="text-sm text-foreground mt-1">{selectedStudent.aiSuggestion}</p>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
            {dialogType === "approve" && (
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => setDialogOpen(false)}>
                确认通过
              </Button>
            )}
            {dialogType === "reject" && (
              <Button variant="destructive" onClick={() => setDialogOpen(false)}>
                确认拒绝
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
