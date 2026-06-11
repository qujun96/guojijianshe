"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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
import {
  AIAssistantPanel,
  AIScoreCard,
} from "@/components/ai/ai-assistant-panel"
import { 
  Search, 
  RotateCcw, 
  Calendar, 
  UserCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Send,
  FileText,
  Users,
  Clock,
  Plane
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const dispatchStudents = [
  {
    id: 1,
    studentName: "王家琪",
    studentId: "20220101001",
    department: "美视电影学院",
    projectName: "(亚洲地区) 2026年秋季学期第三批交换生项目",
    targetSchool: "C国Y大学",
    dispatchTime: "2026-08-25 至 2026-12-24",
    reviewStatus: "已通过",
    confirmStatus: "待确认",
    aiScore: 86,
    deadline: "2026-04-15",
  },
  {
    id: 2,
    studentName: "李明华",
    studentId: "20220101015",
    department: "计算机学院",
    projectName: "2026年《A国B国人才培养计划》1+2+1双学位项目",
    targetSchool: "A国X大学",
    dispatchTime: "2026-09-01 至 2028-06-30",
    reviewStatus: "已通过",
    confirmStatus: "待确认",
    aiScore: 92,
    deadline: "2026-04-20",
  },
  {
    id: 3,
    studentName: "张文静",
    studentId: "20220101028",
    department: "外国语学院",
    projectName: "(欧洲地区)2026年秋季学期第二批交换生项目",
    targetSchool: "G国H大学",
    dispatchTime: "2026-09-15 至 2027-01-15",
    reviewStatus: "已通过",
    confirmStatus: "已确认",
    aiScore: 88,
    deadline: "2026-04-10",
  },
  {
    id: 4,
    studentName: "刘思远",
    studentId: "20220101042",
    department: "经济管理学院",
    projectName: "A国B大学奖学金交换生项目(2026)",
    targetSchool: "A国B大学",
    dispatchTime: "2026-09-01 至 2026-12-31",
    reviewStatus: "已通过",
    confirmStatus: "待确认",
    aiScore: 80,
    deadline: "2026-04-25",
  },
  {
    id: 5,
    studentName: "陈晓燕",
    studentId: "20220101056",
    department: "艺术设计学院",
    projectName: "E国F大学3+1本硕连读",
    targetSchool: "E国F大学",
    dispatchTime: "2026-09-01 至 2027-06-30",
    reviewStatus: "已通过",
    confirmStatus: "已放弃",
    aiScore: 85,
    deadline: "2026-04-05",
  },
]

export default function DispatchConfirmPage() {
  const [tab, setTab] = useState("pending")
  const [selectedStudents, setSelectedStudents] = useState<number[]>([])
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isBatchConfirmDialogOpen, setIsBatchConfirmDialogOpen] = useState(false)
  const [isNotifyDialogOpen, setIsNotifyDialogOpen] = useState(false)
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false)
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false)
  const [transferLeader, setTransferLeader] = useState("")
  const [isBatchMode, setIsBatchMode] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<typeof dispatchStudents[0] | null>(null)

  const filteredStudents = dispatchStudents.filter(student => {
    if (tab === "pending") return student.confirmStatus === "待确认"
    if (tab === "confirmed") return student.confirmStatus === "已确认"
    return true
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(filteredStudents.map(s => s.id))
    } else {
      setSelectedStudents([])
    }
  }

  const handleSelectStudent = (studentId: number, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId])
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId))
    }
  }

  const handleConfirm = (student: typeof dispatchStudents[0]) => {
    setCurrentStudent(student)
    setIsConfirmDialogOpen(true)
  }

  const handleBatchConfirm = () => {
    setIsBatchConfirmDialogOpen(true)
  }

  const handleNotify = () => {
    setIsNotifyDialogOpen(true)
  }

  const handleReturn = (student: typeof dispatchStudents[0]) => {
    setCurrentStudent(student)
    setIsBatchMode(false)
    setIsReturnDialogOpen(true)
  }

  const handleTransfer = (student: typeof dispatchStudents[0]) => {
    setCurrentStudent(student)
    setIsBatchMode(false)
    setTransferLeader("")
    setIsTransferDialogOpen(true)
  }

  const handleBatchReturn = () => {
    setCurrentStudent(null)
    setIsBatchMode(true)
    setIsReturnDialogOpen(true)
  }

  const handleBatchTransfer = () => {
    setCurrentStudent(null)
    setIsBatchMode(true)
    setTransferLeader("")
    setIsTransferDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "待确认":
        return <Badge variant="outline" className="text-amber-600 border-amber-300">待确认</Badge>
      case "已确认":
        return <Badge className="bg-green-500">已确认</Badge>
      case "已放弃":
        return <Badge variant="secondary">已放弃</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {/* Tab Buttons */}
        <div className="flex gap-2">
          <Button 
            variant={tab === "pending" ? "default" : "ghost"}
            onClick={() => setTab("pending")}
          >
            待确认
            <Badge variant="secondary" className="ml-2">
              {dispatchStudents.filter(s => s.confirmStatus === "待确认").length}
            </Badge>
          </Button>
          <Button 
            variant={tab === "confirmed" ? "default" : "ghost"}
            onClick={() => setTab("confirmed")}
          >
            已确认
            <Badge variant="secondary" className="ml-2">
              {dispatchStudents.filter(s => s.confirmStatus === "已确认").length}
            </Badge>
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
            <div className="grid grid-cols-6 gap-3">
              <Input placeholder="学生姓名/学号" />
              <Input placeholder="学院" />
              <Input placeholder="项目名称" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="目标院校" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部院校</SelectItem>
                  <SelectItem value="tokyo">C国Y大学</SelectItem>
                  <SelectItem value="berkeley">A国X大学</SelectItem>
                  <SelectItem value="cambridge">G国H大学</SelectItem>
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
                <UserCheck className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">外派学生列表</CardTitle>
              </div>
              {tab === "pending" && selectedStudents.length > 0 && (
                <div className="flex gap-2">
                  <Button size="sm" className="gap-2" onClick={handleBatchConfirm}>
                    <CheckCircle2 className="h-4 w-4" />
                    批量确认派出
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 text-amber-600" onClick={handleBatchReturn}>
                    <RotateCcw className="h-4 w-4" />
                    批量退回修改信息
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 text-blue-600" onClick={handleBatchTransfer}>
                    <Send className="h-4 w-4" />
                    批量转领导
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {tab === "pending" && (
                    <TableHead className="w-10">
                      <Checkbox 
                        checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                  )}
                  <TableHead>学生信息</TableHead>
                  <TableHead>项目名称</TableHead>
                  <TableHead>目标院校</TableHead>
                  <TableHead>派出时间</TableHead>
                  <TableHead className="text-center">AI评分</TableHead>
                  <TableHead className="text-center">确认状态</TableHead>
                  <TableHead className="text-center">确认截止</TableHead>
                  <TableHead className="text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    {tab === "pending" && (
                      <TableCell>
                        <Checkbox 
                          checked={selectedStudents.includes(student.id)}
                          onCheckedChange={(checked) => handleSelectStudent(student.id, checked as boolean)}
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      <div>
                        <p className="font-medium">{student.studentName}</p>
                        <p className="text-xs text-muted-foreground">{student.studentId} | {student.department}</p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <p className="text-sm truncate text-primary">{student.projectName}</p>
                    </TableCell>
                    <TableCell className="text-sm">{student.targetSchool}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{student.dispatchTime}</TableCell>
                    <TableCell className="text-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mx-auto ${
                        student.aiScore >= 85 ? "bg-green-100 text-green-600" : 
                        student.aiScore >= 75 ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-600"
                      }`}>
                        {student.aiScore}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(student.confirmStatus)}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`text-sm ${
                        new Date(student.deadline) < new Date() ? "text-destructive" : "text-muted-foreground"
                      }`}>
                        {student.deadline}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        {student.confirmStatus === "待确认" && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 text-primary"
                              onClick={() => handleConfirm(student)}
                            >
                              确认派出
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 text-amber-600"
                              onClick={() => handleReturn(student)}
                            >
                              退回修改信息
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 text-blue-600"
                              onClick={() => handleTransfer(student)}
                            >
                              转领导
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm" className="h-7 text-muted-foreground">
                          详情
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
      <AIAssistantPanel title="AI智能助手" subtitle="外派确认辅助">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-center">
            <p className="text-2xl font-bold text-amber-600">
              {dispatchStudents.filter(s => s.confirmStatus === "待确认").length}
            </p>
            <p className="text-xs text-amber-600 mt-1">待确认</p>
          </div>
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-600">
              {dispatchStudents.filter(s => s.confirmStatus === "已确认").length}
            </p>
            <p className="text-xs text-green-600 mt-1">已确认</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI智能提醒
          </h4>
          
          <div className="space-y-2">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-700">确认即将截止</p>
                  <p className="text-xs text-amber-600 mt-1">陈晓燕 的确认截止日期为 2026-04-05，请及时跟进</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-2">
                <Plane className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-primary">派出准备建议</p>
                  <p className="text-xs text-muted-foreground mt-1">3位学生即将派出，建议提前组织行前培训</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            派出统计
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
              <span className="text-sm">亚洲地区</span>
              <Badge variant="secondary">2人</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
              <span className="text-sm">欧洲地区</span>
              <Badge variant="secondary">2人</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
              <span className="text-sm">北美地区</span>
              <Badge variant="secondary">1人</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Button className="w-full gap-2" onClick={handleNotify}>
            <Send className="h-4 w-4" />
            发送确认通知
          </Button>
          <Button variant="outline" className="w-full gap-2">
            <FileText className="h-4 w-4" />
            导出名单
          </Button>
        </div>
      </AIAssistantPanel>

      {/* Confirm Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认派出学生</DialogTitle>
            <DialogDescription>
              确认 {currentStudent?.studentName} 派出至 {currentStudent?.targetSchool}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">学生姓名</span>
                <span className="font-medium">{currentStudent?.studentName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">项目名称</span>
                <span className="font-medium">{currentStudent?.projectName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">派出时间</span>
                <span className="font-medium">{currentStudent?.dispatchTime}</span>
              </div>
            </div>
            <div>
              <Label>备注说明</Label>
              <Textarea 
                placeholder="请输入备注说明（可选）" 
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>取消</Button>
            <Button onClick={() => setIsConfirmDialogOpen(false)} className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              确认派出
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Batch Confirm Dialog */}
      <Dialog open={isBatchConfirmDialogOpen} onOpenChange={setIsBatchConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>批量确认派出</DialogTitle>
            <DialogDescription>
              您即将确认 {selectedStudents.length} 名学生的派出
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">已选择学生：</p>
              <div className="space-y-1">
                {dispatchStudents
                  .filter(s => selectedStudents.includes(s.id))
                  .map(student => (
                    <div key={student.id} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>{student.studentName}</span>
                      <span className="text-muted-foreground">- {student.targetSchool}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBatchConfirmDialogOpen(false)}>取消</Button>
            <Button onClick={() => setIsBatchConfirmDialogOpen(false)} className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              确认派出
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notify Dialog */}
      <Dialog open={isNotifyDialogOpen} onOpenChange={setIsNotifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>发送确认通知</DialogTitle>
            <DialogDescription>
              向选中的学生发送派出确认通知
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label>通知方式</Label>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="email" defaultChecked />
                  <Label htmlFor="email">邮件通知</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sms" />
                  <Label htmlFor="sms">短信通知</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="system" defaultChecked />
                  <Label htmlFor="system">系统消息</Label>
                </div>
              </div>
            </div>
            <div>
              <Label>通知内容</Label>
              <Textarea 
                className="mt-2"
                rows={4}
                defaultValue="您好，您申请的国际化项目已通过审核，请于规定时间内登录系统确认派出信息并提交相关材料。如有疑问，请联系国际交流处。"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNotifyDialogOpen(false)}>取消</Button>
            <Button onClick={() => setIsNotifyDialogOpen(false)} className="gap-2">
              <Send className="h-4 w-4" />
              发送通知
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Return Dialog */}
      <Dialog open={isReturnDialogOpen} onOpenChange={setIsReturnDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isBatchMode ? "批量退回修改信息" : "退回修改信息"}</DialogTitle>
            <DialogDescription>
              {isBatchMode
                ? `将所选 ${selectedStudents.length} 名学生的派出信息退回，由学生修改后重新提交确认`
                : `将 ${currentStudent?.studentName} 的派出信息退回，由学生修改后重新提交确认`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="p-4 bg-muted rounded-lg space-y-2">
              {isBatchMode ? (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">退回学生</span>
                  <span className="font-medium">共 {selectedStudents.length} 名</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">学生姓名</span>
                    <span className="font-medium">{currentStudent?.studentName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">项目名称</span>
                    <span className="font-medium">{currentStudent?.projectName}</span>
                  </div>
                </>
              )}
            </div>
            <div>
              <Label>退回原因<span className="text-destructive"> *</span></Label>
              <Textarea 
                placeholder="请说明需要修改的内容及原因，便于学生准确修改" 
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReturnDialogOpen(false)}>取消</Button>
            <Button variant="destructive" onClick={() => setIsReturnDialogOpen(false)} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              确认退回
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transfer Dialog */}
      <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isBatchMode ? "批量转领导" : "转领导"}</DialogTitle>
            <DialogDescription>
              {isBatchMode
                ? `将所选 ${selectedStudents.length} 名学生的派出确认转交给领导审批`
                : `将 ${currentStudent?.studentName} 的派出确认转交给领导审批`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="p-4 bg-muted rounded-lg space-y-2">
              {isBatchMode ? (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">转交学生</span>
                  <span className="font-medium">共 {selectedStudents.length} 名</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">学生姓名</span>
                    <span className="font-medium">{currentStudent?.studentName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">目标院校</span>
                    <span className="font-medium">{currentStudent?.targetSchool}</span>
                  </div>
                </>
              )}
            </div>
            <div>
              <Label>转交领导<span className="text-destructive"> *</span></Label>
              <Select value={transferLeader} onValueChange={setTransferLeader}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="请选择转交的领导" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zhang">张处长 - 国际交流处</SelectItem>
                  <SelectItem value="li">李副处长 - 国际交流处</SelectItem>
                  <SelectItem value="wang">王主任 - 学院分管领导</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>转交说明</Label>
              <Textarea 
                placeholder="请输入转交说明（可选）" 
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTransferDialogOpen(false)}>取消</Button>
            <Button 
              disabled={!transferLeader}
              onClick={() => setIsTransferDialogOpen(false)} 
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              确认转交
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
