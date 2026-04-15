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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, RotateCcw, Calendar, CheckCircle, XCircle, Eye, Sparkles, Clock, AlertTriangle, Plane } from "lucide-react"

const returnData = [
  {
    id: "1",
    studentName: "王家璇",
    studentId: "2021010001",
    college: "美视电影学院",
    studentType: "本科生",
    project: "2026年秋季学期第三批交换生项目",
    destination: "韩国首尔国立大学",
    departureDate: "2026-09-01",
    returnDate: "2027-01-15",
    registerDate: "2027-01-16",
    status: "pending",
    healthStatus: "健康",
    quarantineRequired: false,
  },
  {
    id: "2",
    studentName: "李明辉",
    studentId: "2020030002",
    college: "计算机学院",
    studentType: "研究生",
    project: "英国剑桥大学联合培养项目",
    destination: "英国剑桥大学",
    departureDate: "2026-03-01",
    returnDate: "2027-01-10",
    registerDate: "2027-01-12",
    status: "approved",
    healthStatus: "健康",
    quarantineRequired: false,
  },
  {
    id: "3",
    studentName: "张晓雯",
    studentId: "2021020003",
    college: "外国语学院",
    studentType: "本科生",
    project: "日本早稻田大学交换项目",
    destination: "日本早稻田大学",
    departureDate: "2026-04-01",
    returnDate: "2027-01-08",
    registerDate: "2027-01-09",
    status: "rejected",
    healthStatus: "健康",
    quarantineRequired: false,
    rejectReason: "回国日期与护照入境章不符",
  },
]

export default function ReturnReviewPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<typeof returnData[0] | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  const filteredData = returnData.filter(item => {
    const matchesSearch = item.studentName.includes(searchTerm) || item.studentId.includes(searchTerm)
    const matchesTab = activeTab === "all" || item.status === activeTab
    return matchesSearch && matchesTab
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">待审核</Badge>
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">已通过</Badge>
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">已驳回</Badge>
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  const handleApprove = () => {
    setShowApproveDialog(false)
    setSelectedStudent(null)
  }

  const handleReject = () => {
    setShowRejectDialog(false)
    setRejectReason("")
    setSelectedStudent(null)
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              <Plane className="h-6 w-6" />
              回国报到审核
            </h1>
            <p className="text-muted-foreground mt-1">审核学生回国报到信息</p>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">全部</TabsTrigger>
                  <TabsTrigger value="pending" className="gap-1">
                    待审核
                    <Badge variant="secondary" className="ml-1 h-5 px-1.5">1</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="approved">已通过</TabsTrigger>
                  <TabsTrigger value="rejected">已驳回</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
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
              <Button variant="outline" size="icon" onClick={() => setSearchTerm("")}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>学生信息</TableHead>
                  <TableHead>学生类型</TableHead>
                  <TableHead>派出项目</TableHead>
                  <TableHead>目的地</TableHead>
                  <TableHead>回国日期</TableHead>
                  <TableHead>报到日期</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.studentName}</div>
                        <div className="text-xs text-muted-foreground">{item.studentId}</div>
                        <div className="text-xs text-muted-foreground">{item.college}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.studentType === "本科生" ? "default" : "secondary"}>
                        {item.studentType}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{item.project}</TableCell>
                    <TableCell>{item.destination}</TableCell>
                    <TableCell>{item.returnDate}</TableCell>
                    <TableCell>{item.registerDate}</TableCell>
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
                        {item.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => {
                                setSelectedStudent(item)
                                setShowApproveDialog(true)
                              }}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              通过
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setSelectedStudent(item)
                                setShowRejectDialog(true)
                              }}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              驳回
                            </Button>
                          </>
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

      {/* AI助手面板 */}
      <div className="w-72 space-y-4">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              AI审核助手
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-3">
              <div className="text-3xl font-bold text-primary">1</div>
              <div className="text-sm text-muted-foreground">待审核报到</div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium">智能检查项</div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs p-2 bg-background rounded">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    回国日期核验
                  </span>
                  <span className="text-green-600">正常</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2 bg-background rounded">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    健康状态确认
                  </span>
                  <span className="text-green-600">健康</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2 bg-background rounded">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-amber-500" />
                    报到时效
                  </span>
                  <span className="text-amber-600">1天内</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium">审核建议</div>
              <div className="p-2 bg-green-50 rounded text-xs text-green-700">
                王家璇同学回国报到信息完整，建议通过审核
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              注意事项
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <p>1. 核实回国日期与护照入境章是否一致</p>
            <p>2. 确认学生健康状态申报</p>
            <p>3. 检查报到是否在规定时间内</p>
          </CardContent>
        </Card>
      </div>

      {/* 详情对话框 */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>回国报到详情</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
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
                  <Label className="text-muted-foreground">学生类型</Label>
                  <div className="font-medium">{selectedStudent.studentType}</div>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">派出项目</Label>
                  <div className="font-medium">{selectedStudent.project}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">目的地</Label>
                  <div className="font-medium">{selectedStudent.destination}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">派出日期</Label>
                  <div className="font-medium">{selectedStudent.departureDate}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">回国日期</Label>
                  <div className="font-medium">{selectedStudent.returnDate}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">报到日期</Label>
                  <div className="font-medium">{selectedStudent.registerDate}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">健康状态</Label>
                  <div className="font-medium text-green-600">{selectedStudent.healthStatus}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">审核状态</Label>
                  <div>{getStatusBadge(selectedStudent.status)}</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 通过确认对话框 */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认通过</DialogTitle>
            <DialogDescription>
              确认通过 {selectedStudent?.studentName} 的回国报到申请？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>取消</Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleApprove}>确认通过</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 驳回对话框 */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>驳回申请</DialogTitle>
            <DialogDescription>
              请填写驳回 {selectedStudent?.studentName} 回国报到申请的原因
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>驳回原因</Label>
              <Textarea
                placeholder="请输入驳回原因..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>取消</Button>
            <Button variant="destructive" onClick={handleReject}>确认驳回</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
