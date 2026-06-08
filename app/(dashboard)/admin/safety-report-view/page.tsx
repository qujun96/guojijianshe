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
  History,
  Globe,
  ChevronRight,
  UserRound,
} from "lucide-react"

interface SafetyRecord {
  id: string
  studentName: string
  studentId: string
  college: string
  projectId: string
  location: string
  status: "safe" | "attention" | "emergency" | "overdue"
  lastReport: string
  week: string
  note: string
  continuousWeeks: number
  // 境外紧急联系方式
  overseasPhone: string
  overseasAddress: string
  // 紧急联系人
  emergencyContactName: string
  emergencyContactRelation: string
  emergencyContactPhone: string
}

interface Project {
  id: string
  name: string
  region: string
  country: string
  period: string
}

const projects: Project[] = [
  {
    id: "p1",
    name: "（亚洲地区）2026年秋季学期交换生项目",
    region: "亚洲",
    country: "A国 / C国",
    period: "2026.09 - 2027.01",
  },
  {
    id: "p2",
    name: "2026年A国B国人才培养计划",
    region: "亚洲",
    country: "A国",
    period: "2026.07 - 2026.12",
  },
  {
    id: "p3",
    name: "（欧洲地区）2026年春季学期交换生项目",
    region: "欧洲",
    country: "F国",
    period: "2026.02 - 2026.07",
  },
  {
    id: "p4",
    name: "2026年G国H大学暑期课程项目",
    region: "欧洲",
    country: "G国",
    period: "2026.07 - 2026.08",
  },
]

const safetyRecords: SafetyRecord[] = [
  {
    id: "1",
    studentName: "王家瑶",
    studentId: "2021001001",
    college: "美视电影学院",
    projectId: "p1",
    location: "A国D大学校区",
    status: "safe",
    lastReport: "2026-07-26 09:15",
    week: "第3周",
    note: "本周学习生活一切正常，已适应当地环境。",
    continuousWeeks: 3,
    overseasPhone: "+81 90-1234-5678",
    overseasAddress: "A国D市D大学国际学生宿舍 3栋 502室",
    emergencyContactName: "王建国",
    emergencyContactRelation: "父亲",
    emergencyContactPhone: "+86 138-0000-1111",
  },
  {
    id: "5",
    studentName: "刘思雨",
    studentId: "2021005019",
    college: "艺术学院",
    projectId: "p1",
    location: "C国艺术大学",
    status: "safe",
    lastReport: "2026-07-26 20:05",
    week: "第3周",
    note: "一切顺利，参加了学校组织的文化交流活动。",
    continuousWeeks: 3,
    overseasPhone: "+82 10-9876-5432",
    overseasAddress: "C国S市艺术大学留学生公寓 A座 1208室",
    emergencyContactName: "刘海涛",
    emergencyContactRelation: "父亲",
    emergencyContactPhone: "+86 139-2222-3333",
  },
  {
    id: "2",
    studentName: "李明远",
    studentId: "2021002015",
    college: "计算机学院",
    projectId: "p2",
    location: "A国某大学",
    status: "attention",
    lastReport: "2026-07-25 18:40",
    week: "第3周",
    note: "近期感冒发烧，已就医，状态在恢复中，暂不影响课程。",
    continuousWeeks: 3,
    overseasPhone: "+81 80-5555-6666",
    overseasAddress: "A国T市某大学校外公寓 2栋 301室",
    emergencyContactName: "李红梅",
    emergencyContactRelation: "母亲",
    emergencyContactPhone: "+86 137-4444-5555",
  },
  {
    id: "3",
    studentName: "张晓梅",
    studentId: "2021003022",
    college: "外国语学院",
    projectId: "p3",
    location: "F国某大学",
    status: "emergency",
    lastReport: "2026-07-27 02:10",
    week: "第3周",
    note: "钱包护照丢失，已报警，急需协助联系使领馆补办证件。",
    continuousWeeks: 3,
    overseasPhone: "+33 6-1122-3344",
    overseasAddress: "F国P市某大学国际处宿舍 B栋 405室",
    emergencyContactName: "张为民",
    emergencyContactRelation: "父亲",
    emergencyContactPhone: "+86 135-6666-7777",
  },
  {
    id: "4",
    studentName: "陈浩然",
    studentId: "2021004008",
    college: "经济管理学院",
    projectId: "p4",
    location: "G国H大学",
    status: "overdue",
    lastReport: "2026-07-18 11:20",
    week: "第2周",
    note: "上次汇报正常，本周已超期未汇报。",
    continuousWeeks: 2,
    overseasPhone: "+44 7700-900123",
    overseasAddress: "G国L市H大学学生公寓 C座 210室",
    emergencyContactName: "陈立群",
    emergencyContactRelation: "母亲",
    emergencyContactPhone: "+86 136-8888-9999",
  },
]

const statusConfig = {
  safe: { label: "平安", icon: ShieldCheck, className: "text-green-600 border-green-200 bg-green-50" },
  attention: { label: "需关注", icon: ShieldAlert, className: "text-amber-600 border-amber-200 bg-amber-50" },
  emergency: { label: "紧急", icon: Siren, className: "text-red-600 border-red-200 bg-red-50" },
  overdue: { label: "超期未报", icon: AlertTriangle, className: "text-gray-600 border-gray-200 bg-gray-50" },
  }

// 生成学生历史汇报记录（按时间倒序）
function getStudentHistory(record: SafetyRecord) {
  return [
    {
      id: `${record.id}-h1`,
      week: record.week,
      date: record.lastReport,
      status: record.status,
      location: record.location,
      note: record.note,
    },
    {
      id: `${record.id}-h2`,
      week: "上周",
      date: "2026-07-19 10:30",
      status: "safe" as const,
      location: record.location,
      note: "课程顺利进行，生活作息正常，已逐步适应当地环境。",
    },
    {
      id: `${record.id}-h3`,
      week: "前一周",
      date: "2026-07-12 14:20",
      status: "attention" as const,
      location: record.location,
      note: "初到当地有些不适应，时差和饮食在调整中，已联系带队老师协助。",
    },
    {
      id: `${record.id}-h4`,
      week: "首周",
      date: "2026-07-05 09:00",
      status: "safe" as const,
      location: record.location,
      note: "已顺利抵达并完成入学注册，住宿安排妥当。",
    },
  ]
}

  export default function SafetyReportViewPage() {
  const [searchProject, setSearchProject] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")

  // 项目详情弹窗
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [showProjectDialog, setShowProjectDialog] = useState(false)

  // 学生详情弹窗
  const [selectedRecord, setSelectedRecord] = useState<SafetyRecord | null>(null)
  const [showDialog, setShowDialog] = useState(false)

  // 催报弹窗
  const [showRemindDialog, setShowRemindDialog] = useState(false)
  const [remindTarget, setRemindTarget] = useState<SafetyRecord | null>(null)
  const [remindBatch, setRemindBatch] = useState(false)
  const [remindMessage, setRemindMessage] = useState(
    "您好，您本周的安全汇报已超过截止时间，请尽快登录系统完成汇报，确保我们能及时掌握您的安全状况。"
  )

  // 响应弹窗
  const [showRespondDialog, setShowRespondDialog] = useState(false)
  const [respondTarget, setRespondTarget] = useState<SafetyRecord | null>(null)
  const [respondNote, setRespondNote] = useState("")

  // 已处理状态记录
  const [remindedIds, setRemindedIds] = useState<string[]>([])
  const [respondedIds, setRespondedIds] = useState<string[]>([])

  // 操作记录
  type ActionLog = {
    id: string
    type: "remind" | "respond"
    target: string
    detail: string
    operator: string
    time: string
  }
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([
    {
      id: "log-init-1",
      type: "respond",
      target: "李思琪",
      detail: "紧急处理（立即介入）· 已联系学生并协助联系当地使领馆",
      operator: "管理员·王老师",
      time: "2025-06-07 14:32",
    },
    {
      id: "log-init-2",
      type: "remind",
      target: "赵敏（超期 3 天）",
      detail: "通过系统消息发送催报通知",
      operator: "管理员·王老师",
      time: "2025-06-06 09:15",
    },
  ])
  const [showLogDialog, setShowLogDialog] = useState(false)

  const addActionLog = (log: Omit<ActionLog, "id" | "operator" | "time">) => {
    const now = new Date()
    const time = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
    setActionLogs((prev) => [
      { ...log, id: `log-${Date.now()}`, operator: "管理员·王老师", time },
      ...prev,
    ])
  }

  // 操作反馈提示
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  // 按项目统计
  const getProjectRecords = (projectId: string) =>
    safetyRecords.filter((r) => r.projectId === projectId)

  const getProjectStats = (projectId: string) => {
    const records = getProjectRecords(projectId)
    return {
      total: records.length,
      safe: records.filter((r) => r.status === "safe").length,
      attention: records.filter((r) => r.status === "attention").length,
      emergency: records.filter((r) => r.status === "emergency").length,
      overdue: records.filter((r) => r.status === "overdue").length,
      reportRate:
        records.length === 0
          ? 0
          : Math.round(
              (records.filter((r) => r.status !== "overdue").length / records.length) * 100
            ),
    }
  }

  const filteredProjects = projects.filter((p) => {
    if (searchProject && !p.name.includes(searchProject)) return false
    if (selectedRegion !== "all" && p.region !== selectedRegion) return false
    return true
  })

  const handleOpenProject = (project: Project) => {
    setActiveProject(project)
    setShowProjectDialog(true)
  }

  const handleViewRecord = (record: SafetyRecord) => {
    setSelectedRecord(record)
    setShowDialog(true)
  }

  // 催报
  const handleOpenRemind = (record: SafetyRecord) => {
    setRemindTarget(record)
    setRemindBatch(false)
    setShowRemindDialog(true)
  }

  const handleOpenBatchRemind = () => {
    setRemindTarget(null)
    setRemindBatch(true)
    setShowRemindDialog(true)
  }

  const handleConfirmRemind = () => {
    if (remindBatch) {
      const ids = safetyRecords.filter((r) => r.status === "overdue").map((r) => r.id)
      setRemindedIds((prev) => Array.from(new Set([...prev, ...ids])))
      addActionLog({
        type: "remind",
        target: `${ids.length} 名超期学生（批量）`,
        detail: "通过系统消息发送催报通知",
      })
      showToast(`已通过系统消息向 ${ids.length} 名超期学生发送催报通知`)
    } else if (remindTarget) {
      setRemindedIds((prev) => Array.from(new Set([...prev, remindTarget.id])))
      addActionLog({
        type: "remind",
        target: `${remindTarget.studentName}（${remindTarget.studentId}）`,
        detail: "通过系统消息发送催报通知",
      })
      showToast(`已通过系统消息向 ${remindTarget.studentName} 发送催报通知`)
    }
    setShowRemindDialog(false)
  }

  // 响应
  const handleOpenRespond = (record: SafetyRecord) => {
  setRespondTarget(record)
  setRespondNote("")
  setShowRespondDialog(true)
  }

  const handleConfirmRespond = () => {
    if (respondTarget) {
      setRespondedIds((prev) => Array.from(new Set([...prev, respondTarget.id])))
      addActionLog({
        type: "respond",
        target: `${respondTarget.studentName}（${respondTarget.location}）`,
        detail: respondNote || "已响应紧急求助",
      })
      showToast(`已响应 ${respondTarget.studentName} 的紧急求助，处理记录已生成`)
    }
    setShowRespondDialog(false)
  }

  const emergencyCount = safetyRecords.filter((r) => r.status === "emergency").length
  const attentionCount = safetyRecords.filter((r) => r.status === "attention").length
  const overdueCount = safetyRecords.filter((r) => r.status === "overdue").length
  const safeCount = safetyRecords.filter((r) => r.status === "safe").length

  // 渲染单条学生操作按钮
  const renderRecordActions = (record: SafetyRecord) => (
    <div className="flex items-center justify-end gap-1 whitespace-nowrap">
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
  )

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
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Search className="h-4 w-4" />
                项目查询
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowLogDialog(true)}>
                  <History className="h-4 w-4 mr-1" />
                  操作记录
                  {actionLogs.length > 0 && (
                    <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs text-primary-foreground">
                      {actionLogs.length}
                    </span>
                  )}
                </Button>
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
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <Input
                className="col-span-2"
                placeholder="项目名称"
                value={searchProject}
                onChange={(e) => setSearchProject(e.target.value)}
              />
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="所在地区" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部地区</SelectItem>
                  <SelectItem value="亚洲">亚洲</SelectItem>
                  <SelectItem value="欧洲">欧洲</SelectItem>
                  <SelectItem value="北美洲">北美洲</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchProject("")
                  setSelectedRegion("all")
                }}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                重置
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 项目卡片网格 */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProjects.map((project) => {
            const stats = getProjectStats(project.id)
            const hasAlert = stats.emergency > 0 || stats.overdue > 0
            return (
              <Card
                key={project.id}
                className={`cursor-pointer transition-all hover:shadow-md hover:border-primary/40 ${
                  hasAlert ? "border-red-200" : ""
                }`}
                onClick={() => handleOpenProject(project)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <CardTitle className="text-base leading-snug text-pretty">
                        {project.name}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {project.region} · {project.country}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {project.period}
                        </span>
                      </div>
                    </div>
                    {hasAlert && (
                      <Badge variant="outline" className="shrink-0 text-red-600 border-red-200 bg-red-50">
                        待处理
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      派出 {stats.total} 人
                    </span>
                    <span className="text-muted-foreground">
                      本周汇报率
                      <span className={`ml-1 font-semibold ${stats.reportRate >= 80 ? "text-green-600" : "text-amber-600"}`}>
                        {stats.reportRate}%
                      </span>
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="rounded-md bg-green-50 p-2 text-center">
                      <p className="text-base font-semibold text-green-600">{stats.safe}</p>
                      <p className="text-[11px] text-muted-foreground">平安</p>
                    </div>
                    <div className="rounded-md bg-amber-50 p-2 text-center">
                      <p className="text-base font-semibold text-amber-600">{stats.attention}</p>
                      <p className="text-[11px] text-muted-foreground">需关注</p>
                    </div>
                    <div className="rounded-md bg-red-50 p-2 text-center">
                      <p className="text-base font-semibold text-red-600">{stats.emergency}</p>
                      <p className="text-[11px] text-muted-foreground">紧急</p>
                    </div>
                    <div className="rounded-md bg-gray-100 p-2 text-center">
                      <p className="text-base font-semibold text-gray-600">{stats.overdue}</p>
                      <p className="text-[11px] text-muted-foreground">超期</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end text-sm text-primary">
                    查看汇报详情
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
          {filteredProjects.length === 0 && (
            <div className="col-span-2 py-12 text-center text-sm text-muted-foreground">
              未找到匹配的项目
            </div>
          )}
        </div>
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
              <span className="text-sm text-muted-foreground">在外项目数</span>
              <span className="font-semibold">{projects.length}</span>
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

      {/* 项目详情弹窗：该项目下学生汇报列表 */}
      <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
        <DialogContent className="max-w-4xl sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 pr-6">
              <Globe className="h-5 w-5 text-primary shrink-0" />
              <span className="text-pretty">{activeProject?.name}</span>
            </DialogTitle>
          </DialogHeader>
          {activeProject && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {activeProject.region} · {activeProject.country}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {activeProject.period}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  派出 {getProjectStats(activeProject.id).total} 人
                </span>
              </div>
              <div className="max-h-[55vh] overflow-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[180px]">学生信息</TableHead>
                      <TableHead className="min-w-[120px]">当前位置</TableHead>
                      <TableHead className="min-w-[90px]">安全状态</TableHead>
                      <TableHead className="min-w-[150px]">最近汇报</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getProjectRecords(activeProject.id).map((record) => {
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
                          <TableCell className="text-right">{renderRecordActions(record)}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 学生详情对话框 */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl sm:max-w-2xl">
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

              {/* 历史汇报记录（按时间倒序，可追溯） */}
              <div>
                <p className="text-sm font-medium mb-3 flex items-center gap-2">
                  <History className="h-4 w-4 text-primary" />
                  历史汇报记录
                  <span className="text-xs font-normal text-muted-foreground">
                    所有汇报均可追溯，按时间倒序排列
                  </span>
                </p>
                <div className="relative max-h-[280px] overflow-y-auto pr-1 space-y-5 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-border">
                  {getStudentHistory(selectedRecord).map((item) => {
                    const config = statusConfig[item.status]
                    const Icon = config.icon
                    return (
                      <div key={item.id} className="relative flex gap-4">
                        <div className="relative z-10 w-8 h-8 rounded-full bg-card border-2 border-border flex items-center justify-center shrink-0">
                          <Icon className={`h-4 w-4 ${config.className.split(" ")[0]}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-sm">{item.week}安全汇报</span>
                            <Badge variant="outline" className={config.className}>
                              {config.label}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.date}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {item.location}
                          </div>
                          <p className="text-sm mt-2 p-3 bg-muted rounded-lg">{item.note}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
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
              <div className="flex items-center gap-2 rounded-md border border-input bg-muted/40 px-3 py-2 text-sm">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span className="font-medium">系统消息</span>
                <span className="text-xs text-muted-foreground">（站内 / App 推送）</span>
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
              <Button className="gap-1" onClick={handleConfirmRemind}>
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

              {/* 学生境外紧急联系方式 */}
              <div className="rounded-lg border p-3 space-y-2">
                <p className="text-sm font-medium flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-primary" />
                  学生境外联系方式
                </p>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" />
                      境外电话
                    </span>
                    <span className="font-medium">{respondTarget.overseasPhone}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-muted-foreground shrink-0">
                      <MapPin className="h-3.5 w-3.5" />
                      境外住址
                    </span>
                    <span className="font-medium text-right">{respondTarget.overseasAddress}</span>
                  </div>
                </div>
              </div>

              {/* 紧急联系人 */}
              <div className="rounded-lg border p-3 space-y-2">
                <p className="text-sm font-medium flex items-center gap-1.5">
                  <UserRound className="h-4 w-4 text-primary" />
                  紧急联系人
                </p>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground">姓名 / 关系</span>
                    <span className="font-medium">
                      {respondTarget.emergencyContactName}（{respondTarget.emergencyContactRelation}）
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" />
                      联系电话
                    </span>
                    <span className="font-medium">{respondTarget.emergencyContactPhone}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">处理措施记录</Label>
                <Textarea
                  rows={3}
                  value={respondNote}
                  onChange={(e) => setRespondNote(e.target.value)}
                  placeholder="请记录已采取或计划采取的处理措施，如已联系学生、协助联系使领馆、通知家长等"
                />
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

      {/* 操作记录弹窗 */}
      <Dialog open={showLogDialog} onOpenChange={setShowLogDialog}>
        <DialogContent className="max-w-2xl sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              操作记录
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {actionLogs.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                暂无催报 / 响应操作记录
              </div>
            ) : (
              actionLogs.map((log) => {
                const isRemind = log.type === "remind"
                return (
                  <div key={log.id} className="flex gap-3 rounded-lg border p-3">
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        isRemind ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                      }`}
                    >
                      {isRemind ? <Bell className="h-4 w-4" /> : <Siren className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded px-1.5 py-0.5 text-xs ${
                              isRemind ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                            }`}
                          >
                            {isRemind ? "催报" : "紧急响应"}
                          </span>
                          <span className="text-sm font-medium">{log.target}</span>
                        </div>
                        <span className="shrink-0 text-xs text-muted-foreground">{log.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.detail}</p>
                      <p className="text-xs text-muted-foreground">操作人：{log.operator}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
          <div className="flex justify-end border-t pt-3">
            <Button variant="outline" onClick={() => setShowLogDialog(false)}>
              关闭
            </Button>
          </div>
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
