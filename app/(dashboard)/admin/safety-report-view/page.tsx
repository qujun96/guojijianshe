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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
  CheckCircle2,
  MessageSquare,
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

const remindChannels = [
  { id: "sms", label: "短信" },
  { id: "email", label: "邮件" },
  { id: "wechat", label: "微信" },
  { id: "app", label: "App推送" },
]

export default function SafetyReportViewPage() {
  const [searchName, setSearchName] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedProject, setSelectedProject] = useState("all")
  const [selectedRecord, setSelectedRecord] = useState<SafetyRecord | null>(null)
  const [showDialog, setShowDialog] = useState(false)

  // 催报弹窗
  const [showRemindDialog, setShowRemindDialog] = useState(false)
  const [remindTarget, setRemindTarget] = useState<SafetyRecord | null>(null)
  const [remindBatch, setRemindBatch] = useState(false)
  const [remindChannelSel, setRemindChannelSel] = useState<string[]>(["sms", "app"])
  const [remindMessage, setRemindMessage] = useState(
    "您好，您本周的安全汇报已超过截止时间，请尽快登录系统完成汇报，确保我们能及时掌握您的安全状况。"
  )

  // 响应弹窗
  const [showRespondDialog, setShowRespondDialog] = useState(false)
  const [respondTarget, setRespondTarget] = useState<SafetyRecord | null>(null)
  const [respondLevel, setRespondLevel] = useState("urgent")
  const [respondNote, setRespondNote] = useState("")

  // 已处理状态记录
  const [remindedIds, setRemindedIds] = useState<string[]>([])
  const [respondedIds, setRespondedIds] = useState<string[]>([])

  // 操作反馈提示
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

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

  // 打开催报弹窗（单个）
  const handleOpenRemind = (record: SafetyRecord) => {
    setRemindTarget(record)
    setRemindBatch(false)
    setShowRemindDialog(true)
  }

  // 打开一键催报弹窗（批量）
  const handleOpenBatchRemind = () => {
    setRemindTarget(null)
    setRemindBatch(true)
    setShowRemindDialog(true)
  }

  // 确认催报
  const handleConfirmRemind = () => {
    if (remindBatch) {
      const ids = safetyRecords.filter((r) => r.status === "overdue").map((r) => r.id)
      setRemindedIds((prev) => Array.from(new Set([...prev, ...ids])))
      showToast(`已通过${getChannelLabels()}向 ${ids.length} 名超期学生发送催报通知`)
    } else if (remindTarget) {
      setRemindedIds((prev) => Array.from(new Set([...prev, remindTarget.id])))
      showToast(`已通过${getChannelLabels()}向 ${remindTarget.studentName} 发送催报通知`)
    }
    setShowRemindDialog(false)
  }

  const getChannelLabels = () =>
    remindChannels
      .filter((c) => remindChannelSel.includes(c.id))
      .map((c) => c.label)
      .join("、") || "系统"

  const toggleChannel = (id: string) => {
    setRemindChannelSel((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  // 打开响应弹窗
  const handleOpenRespond = (record: SafetyRecord) => {
    setRespondTarget(record)
    setRespondLevel("urgent")
    setRespondNote("")
    setShowRespondDialog(true)
  }

  // 确认响应
  const handleConfirmRespond = () => {
    if (respondTarget) {
      setRespondedIds((prev) => Array.from(new Set([...prev, respondTarget.id])))
      showToast(`已响应 ${respondTarget.studentName} 的紧急求助，处理记录已生成`)
    }
    setShowRespondDialog(false)
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
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    const emergency = safetyRecords.find((r) => r.status === "emergency")
                    if (emergency) {
                      handleOpenRespond(emergency)
                    } else {
                      handleOpenBatchRemind()
                    }
                  }}
                >
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
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenBatchRemind}
                disabled={overdueCount === 0}
              >
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
                          {record.status === "emergency" && (
                            <>
                              <span className="text-muted-foreground">|</span>
                              {respondedIds.includes(record.id) ? (
                                <span className="text-xs text-green-600 flex items-center gap-0.5">
                                  <ShieldCheck className="h-3.5 w-3.5" />
                                  已响应
                                </span>
                              ) : (
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="h-auto p-0 text-red-600"
                                  onClick={() => handleOpenRespond(record)}
                                >
                                  <Siren className="h-3.5 w-3.5 mr-0.5" />
                                  响应
                                </Button>
                              )}
                            </>
                          )}
                          {record.status === "overdue" && (
                            <>
                              <span className="text-muted-foreground">|</span>
                              {remindedIds.includes(record.id) ? (
                                <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                                  <Bell className="h-3.5 w-3.5" />
                                  已催报
                                </span>
                              ) : (
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="h-auto p-0 text-amber-600"
                                  onClick={() => handleOpenRemind(record)}
                                >
                                  <Bell className="h-3.5 w-3.5 mr-0.5" />
                                  催报
                                </Button>
                              )}
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
              AI安全监测助���
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
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 gap-1"
                      onClick={() => showToast(`正在呼叫 ${selectedRecord.studentName}...`)}
                    >
                      <Phone className="h-3.5 w-3.5 mr-1" />
                      联系学生
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                      onClick={() => {
                        setShowDialog(false)
                        handleOpenRespond(selectedRecord)
                      }}
                    >
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
                <Button
                  className="gap-2"
                  onClick={() => {
                    showToast(`已向 ${selectedRecord.studentName} 发送关怀消息`)
                    setShowDialog(false)
                  }}
                >
                  <Send className="h-4 w-4" />
                  发送关怀消息
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 催报弹窗 */}
      <Dialog open={showRemindDialog} onOpenChange={setShowRemindDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-amber-600" />
              {remindBatch ? "一键催报" : "发送催报通知"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">
              {remindBatch ? (
                <p className="text-amber-700">
                  将向当前 <span className="font-semibold">{overdueCount}</span> 名超期未汇报的学生统一发送催报通知。
                </p>
              ) : (
                <p className="text-amber-700">
                  将向 <span className="font-semibold">{remindTarget?.studentName}</span>（{remindTarget?.studentId}）发送催报通知，上次汇报时间：{remindTarget?.lastReport}。
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm">通知渠道</Label>
              <div className="flex flex-wrap gap-2">
                {remindChannels.map((channel) => (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => toggleChannel(channel.id)}
                    className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
                      remindChannelSel.includes(channel.id)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-input hover:bg-muted"
                    }`}
                  >
                    {remindChannelSel.includes(channel.id) && (
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1 inline" />
                    )}
                    {channel.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">催报内容</Label>
              <Textarea
                rows={4}
                value={remindMessage}
                onChange={(e) => setRemindMessage(e.target.value)}
                placeholder="请输入催报通知内容"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t">
              <Button variant="outline" onClick={() => setShowRemindDialog(false)}>
                取消
              </Button>
              <Button
                className="gap-1"
                onClick={handleConfirmRemind}
                disabled={remindChannelSel.length === 0}
              >
                <Send className="h-4 w-4" />
                确认发送
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 响应弹窗 */}
      <Dialog open={showRespondDialog} onOpenChange={setShowRespondDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Siren className="h-5 w-5 text-red-600" />
              紧急求助响应
            </DialogTitle>
          </DialogHeader>
          {respondTarget && (
            <div className="space-y-4">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg space-y-1">
                <p className="text-sm font-medium text-red-700">
                  {respondTarget.studentName} · {respondTarget.location}
                </p>
                <p className="text-xs text-red-600">{respondTarget.note}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">处理级别</Label>
                <Select value={respondLevel} onValueChange={setRespondLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">紧急处理（立即介入）</SelectItem>
                    <SelectItem value="high">高优先级（24小时内）</SelectItem>
                    <SelectItem value="normal">常规跟进</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">处理措施记录</Label>
                <Textarea
                  rows={4}
                  value={respondNote}
                  onChange={(e) => setRespondNote(e.target.value)}
                  placeholder="请记录已采取或计划采取的处理措施，如已联系学生、协助联系使领馆、通知家长等"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  onClick={() => showToast(`正在呼叫 ${respondTarget.studentName}...`)}
                >
                  <Phone className="h-3.5 w-3.5" />
                  联系学生
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  onClick={() => showToast("已发起家长/紧急联系人通知")}
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  通知紧急联系人
                </Button>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t">
                <Button variant="outline" onClick={() => setShowRespondDialog(false)}>
                  取消
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700 gap-1"
                  onClick={handleConfirmRespond}
                  disabled={!respondNote.trim()}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  确认响应并记录
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 操作反馈提示 */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-foreground px-4 py-3 text-sm text-background shadow-lg">
          <CheckCircle2 className="h-4 w-4 text-green-400" />
          {toast}
        </div>
      )}
    </div>
  )
}
