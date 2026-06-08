"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
} from "@/components/ui/dialog"
import {
  Search,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  Siren,
  Users,
  Bell,
  MapPin,
  Clock,
  Eye,
  Send,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Phone,
} from "lucide-react"

interface SafetyRecord {
  id: string
  studentName: string
  studentId: string
  college: string
  project: string
  location: string
  status: "safe" | "attention" | "emergency" | "overdue"
  lastReport: string
  week: string
  note: string
  continuousWeeks: number
}

const safetyRecords: SafetyRecord[] = [
  {
    id: "1",
    studentName: "王家瑶",
    studentId: "2021001001",
    college: "美视电影学院",
    project: "（亚洲地区）2026年秋季学期交换生项目",
    location: "A国D大学校区",
    status: "safe",
    lastReport: "2026-07-26 09:15",
    week: "第3周",
    note: "本周学习生活一切正常，已适应当地环境。",
    continuousWeeks: 3,
  },
  {
    id: "2",
    studentName: "李明远",
    studentId: "2021002015",
    college: "计算机学院",
    project: "2026年A国B国人才培养计划",
    location: "A国某大学",
    status: "attention",
    lastReport: "2026-07-25 18:40",
    week: "第3周",
    note: "近期感冒发烧，已就医，状态在恢复中，暂不影响课程。",
    continuousWeeks: 3,
  },
  {
    id: "3",
    studentName: "张晓梅",
    studentId: "2021003022",
    college: "外国语学院",
    project: "（欧洲地区）2026年春季学期交换生项目",
    location: "F国某大学",
    status: "emergency",
    lastReport: "2026-07-27 02:10",
    week: "第3周",
    note: "钱包护照丢失，已报警，急需协助联系使领馆补办证件。",
    continuousWeeks: 3,
  },
  {
    id: "4",
    studentName: "陈浩然",
    studentId: "2021004008",
    college: "经济管理学院",
    project: "2026年G国H大学暑期课程项目",
    location: "G国H大学",
    status: "overdue",
    lastReport: "2026-07-18 11:20",
    week: "第2周",
    note: "上次汇报正常，本周已超期未汇报。",
    continuousWeeks: 2,
  },
  {
    id: "5",
    studentName: "刘思雨",
    studentId: "2021005019",
    college: "艺术学院",
    project: "（亚洲地区）2026年秋季学期交换生项目",
    location: "C国艺术大学",
    status: "safe",
    lastReport: "2026-07-26 20:05",
    week: "第3周",
    note: "一切顺利，参加了学校组织的文化交流活动。",
    continuousWeeks: 3,
  },
]

const statusConfig = {
  safe: { label: "平安", icon: ShieldCheck, className: "text-green-600 border-green-200 bg-green-50" },
  attention: { label: "需关注", icon: ShieldAlert, className: "text-amber-600 border-amber-200 bg-amber-50" },
  emergency: { label: "紧急", icon: Siren, className: "text-red-600 border-red-200 bg-red-50" },
  overdue: { label: "超期未报", icon: AlertTriangle, className: "text-gray-600 border-gray-200 bg-gray-50" },
}

export default function SafetyReportViewPage() {
  const [searchName, setSearchName] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedProject, setSelectedProject] = useState("all")
  const [selectedRecord, setSelectedRecord] = useState<SafetyRecord | null>(null)
  const [showDialog, setShowDialog] = useState(false)

  const filteredRecords = safetyRecords.filter((record) => {
    if (
      searchName &&
      !record.studentName.includes(searchName) &&
      !record.studentId.includes(searchName)
    ) {
      return false
    }
    if (selectedStatus !== "all" && record.status !== selectedStatus) {
      return false
    }
    return true
  })

  const handleViewRecord = (record: SafetyRecord) => {
    setSelectedRecord(record)
    setShowDialog(true)
  }

  const emergencyCount = safetyRecords.filter((r) => r.status === "emergency").length
  const attentionCount = safetyRecords.filter((r) => r.status === "attention").length
  const overdueCount = safetyRecords.filter((r) => r.status === "overdue").length
  const safeCount = safetyRecords.filter((r) => r.status === "safe").length

  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-6">
        {/* 预警横幅 */}
        {(emergencyCount > 0 || overdueCount > 0) && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Siren className="h-5 w-5 text-red-500 shrink-0" />
                <div className="flex-1 text-sm">
                  <span className="font-medium text-red-700">安全预警：</span>
                  <span className="text-red-600">
                    当前有 {emergencyCount} 名学生发起紧急求助，{overdueCount} 名学生超期未汇报，请及时处理。
                  </span>
                </div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  立即处理
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 统计卡片 */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">本周平安</p>
                  <p className="text-2xl font-bold text-green-600">{safeCount}</p>
                </div>
                <ShieldCheck className="h-8 w-8 text-green-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">需要关注</p>
                  <p className="text-2xl font-bold text-amber-600">{attentionCount}</p>
                </div>
                <ShieldAlert className="h-8 w-8 text-amber-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-50 to-red-100/50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">紧急求助</p>
                  <p className="text-2xl font-bold text-red-600">{emergencyCount}</p>
                </div>
                <Siren className="h-8 w-8 text-red-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100/50 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">超期未报</p>
                  <p className="text-2xl font-bold text-gray-600">{overdueCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-gray-400/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 筛选区域 */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Search className="h-4 w-4" />
              汇报查询
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <Input
                placeholder="学生姓名/学号"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="安全状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="safe">平安</SelectItem>
                  <SelectItem value="attention">需关注</SelectItem>
                  <SelectItem value="emergency">紧急</SelectItem>
                  <SelectItem value="overdue">超期未报</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue placeholder="选择项目" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部项目</SelectItem>
                  <SelectItem value="asia">亚洲地区交换生项目</SelectItem>
                  <SelectItem value="europe">欧洲地区交换生项目</SelectItem>
                  <SelectItem value="america">A国B国人才培养计划</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Search className="h-4 w-4 mr-1" />
                  搜索
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchName("")
                    setSelectedStatus("all")
                    setSelectedProject("all")
                  }}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 汇报列表 */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                安全汇报列表
              </CardTitle>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-1" />
                一键催报
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>学生信息</TableHead>
                  <TableHead>所在项目</TableHead>
                  <TableHead>当前位置</TableHead>
                  <TableHead>安全状态</TableHead>
                  <TableHead>最近汇报</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => {
                  const config = statusConfig[record.status]
                  const StatusIcon = config.icon
                  return (
                    <TableRow
                      key={record.id}
                      className={record.status === "emergency" ? "bg-red-50/50" : ""}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {record.studentName.slice(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{record.studentName}</p>
                            <p className="text-xs text-muted-foreground">
                              {record.studentId} · {record.college}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm max-w-[180px] truncate">{record.project}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {record.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={config.className}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {config.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {record.lastReport}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 text-primary"
                            onClick={() => handleViewRecord(record)}
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            查看
                          </Button>
                          {(record.status === "overdue" || record.status === "emergency") && (
                            <>
                              <span className="text-muted-foreground">|</span>
                              <Button
                                variant="link"
                                size="sm"
                                className="h-auto p-0 text-amber-600"
                              >
                                {record.status === "emergency" ? "响应" : "催报"}
                              </Button>
                            </>
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

      {/* 右侧AI面板 */}
      <div className="w-72 shrink-0 space-y-4">
        <Card className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              AI安全监测助手
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm opacity-90">
            <p>实时监测在外学生安全状态，智能识别风险并预警</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              本周汇报概况
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">汇报率</span>
              <span className="font-semibold text-green-600">80%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "80%" }} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">在外学生总数</span>
              <span className="font-semibold">{safetyRecords.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">待处理事项</span>
              <span className="font-semibold text-red-500">{emergencyCount + overdueCount}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              风险预警
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-red-50 rounded border border-red-200">
              <p className="text-red-700 font-medium">张晓梅 - 紧急求助</p>
              <p className="text-xs text-red-600 mt-1">护照丢失，需立即协助处理</p>
            </div>
            <div className="p-2 bg-gray-50 rounded border border-gray-200">
              <p className="text-gray-700 font-medium">陈浩然 - 超期未报</p>
              <p className="text-xs text-gray-600 mt-1">已超过汇报截止时间，建议催报</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              AI洞察
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-green-50 rounded border border-green-200">
              <p className="text-green-700">整体安全状况良好，汇报及时率较上周提升3%</p>
            </div>
            <div className="p-2 bg-amber-50 rounded border border-amber-200">
              <p className="text-amber-700">欧洲地区学生需重点关注，本周出现1起紧急情况</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 详情对话框 */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {selectedRecord?.studentName.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p>{selectedRecord?.studentName}的安全汇报</p>
                <p className="text-sm font-normal text-muted-foreground">
                  {selectedRecord?.studentId} · {selectedRecord?.college}
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>

          {selectedRecord && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">安全状态</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {(() => {
                      const config = statusConfig[selectedRecord.status]
                      const Icon = config.icon
                      return (
                        <Badge variant="outline" className={config.className}>
                          <Icon className="h-3 w-3 mr-1" />
                          {config.label}
                        </Badge>
                      )
                    })()}
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">连续汇报</p>
                  <p className="font-medium mt-1">{selectedRecord.continuousWeeks} 周</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">当前位置</p>
                  <p className="font-medium mt-1 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    {selectedRecord.location}
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">汇报时间</p>
                  <p className="font-medium mt-1 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    {selectedRecord.lastReport}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">情况说明</p>
                <p className="text-sm p-3 bg-muted rounded-lg">{selectedRecord.note}</p>
              </div>

              {selectedRecord.status === "emergency" && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg space-y-2">
                  <p className="text-sm font-medium text-red-700 flex items-center gap-2">
                    <Siren className="h-4 w-4" />
                    紧急情况处理
                  </p>
                  <p className="text-xs text-red-600">该学生发起紧急求助，请尽快联系并协助处理。</p>
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 gap-1">
                      <Phone className="h-3.5 w-3.5 mr-1" />
                      联系学生
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Send className="h-3.5 w-3.5 mr-1" />
                      上报处理
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2 border-t">
                <Button variant="outline" onClick={() => setShowDialog(false)}>
                  关闭
                </Button>
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  发送关怀消息
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
