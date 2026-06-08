"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AIAssistantPanel,
  AISuggestion,
  AIReminder,
  AIInsight,
} from "@/components/ai/ai-assistant-panel"
import {
  ShieldCheck,
  ShieldAlert,
  Siren,
  MapPin,
  Clock,
  CheckCircle2,
  History,
  Send,
  Sparkles,
  Phone,
  CalendarClock,
  TrendingUp,
  ImageIcon,
  Upload,
} from "lucide-react"

// 安全状态选项
const safetyStatusOptions = [
  {
    value: "safe",
    label: "一切平安",
    description: "身体健康，生活学习正常",
    icon: ShieldCheck,
    activeClass: "border-green-500 bg-green-50 text-green-700",
    iconClass: "text-green-500",
  },
  {
    value: "attention",
    label: "需要关注",
    description: "遇到一些困难，需要协助",
    icon: ShieldAlert,
    activeClass: "border-amber-500 bg-amber-50 text-amber-700",
    iconClass: "text-amber-500",
  },
  {
    value: "emergency",
    label: "紧急求助",
    description: "遇到紧急情况，需要立即联系",
    icon: Siren,
    activeClass: "border-red-500 bg-red-50 text-red-700",
    iconClass: "text-red-500",
  },
]

// 历史汇报记录
const reportHistory = [
  {
    id: 1,
    date: "2026-07-26 09:15",
    status: "safe",
    location: "G国伦敦市·H大学校区",
    note: "本周学习生活一切正常，已适应当地环境。",
    week: "第3周",
  },
  {
    id: 2,
    date: "2026-07-19 10:30",
    status: "safe",
    location: "G国伦敦市·H大学校区",
    note: "课程顺利进行，认识了几位当地同学。",
    week: "第2周",
  },
  {
    id: 3,
    date: "2026-07-12 14:20",
    status: "attention",
    location: "G国伦敦市·H大学校区",
    note: "初到当地有些不适应，时差和饮食在调整中，已逐步好转。",
    week: "第1周",
  },
]

function getStatusMeta(status: string) {
  return safetyStatusOptions.find((s) => s.value === status) || safetyStatusOptions[0]
}

export default function SafetyReportPage() {
  const [activeTab, setActiveTab] = useState("report")
  const [selectedStatus, setSelectedStatus] = useState("safe")
  const [location, setLocation] = useState("G国伦敦市·H大学校区")
  const [note, setNote] = useState("")

  const currentStatus = getStatusMeta(selectedStatus)

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {/* 顶部状态概览 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">安全汇报</CardTitle>
                <CardDescription>
                  请按周定期报平安，让学校及时掌握您在外的安全状况
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">当前安全状态</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span className="font-medium text-green-600">平安</span>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">连续汇报</div>
                <div className="font-medium mt-1">3 周</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">上次汇报</div>
                <div className="font-medium mt-1">2026-07-26</div>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="text-sm text-amber-600">下次汇报截止</div>
                <div className="font-medium mt-1 text-amber-700">2026-08-02</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="report" className="gap-2">
              <Send className="h-4 w-4" />
              报平安
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              汇报记录
            </TabsTrigger>
          </TabsList>

          {/* 报平安 Tab */}
          <TabsContent value="report" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">选择当前安全状态</CardTitle>
                <CardDescription>请如实选择您当前的状态，紧急情况将第一时间通知管理人员</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 安全状态快速选择 */}
                <div className="grid grid-cols-3 gap-3">
                  {safetyStatusOptions.map((option) => {
                    const Icon = option.icon
                    const isActive = selectedStatus === option.value
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setSelectedStatus(option.value)}
                        className={`flex flex-col items-center text-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          isActive ? option.activeClass : "border-border hover:border-muted-foreground/30"
                        }`}
                      >
                        <Icon className={`h-7 w-7 ${isActive ? "" : option.iconClass}`} />
                        <span className="font-medium text-sm">{option.label}</span>
                        <span className="text-xs text-muted-foreground">{option.description}</span>
                      </button>
                    )
                  })}
                </div>

                {/* 紧急求助提示 */}
                {selectedStatus === "emergency" && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <Siren className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-red-700">紧急情况已启动快速响应</p>
                      <p className="text-red-600 mt-1">
                        提交后将立即通知带队老师与学校管理人员。如有生命危险，请优先拨打当地紧急电话或中国驻当地使领馆电话。
                      </p>
                    </div>
                  </div>
                )}

                {/* 当前位置 */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    当前所在位置
                    <Badge variant="destructive" className="text-xs">必填</Badge>
                  </Label>
                  <Input
                    placeholder="请输入您当前的城市、学校或具体位置"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                {/* 情况说明 */}
                <div className="space-y-2">
                  <Label>情况说明</Label>
                  <Textarea
                    placeholder="简要描述您本周的学习生活情况，如有困难或需要协助也可在此说明..."
                    className="min-h-[120px]"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div className="text-xs text-muted-foreground text-right">{note.length}/500</div>
                </div>

                {/* 附件 */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    现场照片（选填）
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-5 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-7 w-7 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">上传现场照片以佐证当前状态</p>
                    <p className="text-xs text-muted-foreground mt-1">支持 JPG、PNG，最多3张</p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline">保存草稿</Button>
                  <Button
                    className={`gap-2 ${
                      selectedStatus === "emergency" ? "bg-red-600 hover:bg-red-700" : ""
                    }`}
                  >
                    <Send className="h-4 w-4" />
                    {selectedStatus === "emergency" ? "立即提交紧急求助" : "提交安全汇报"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 汇报记录 Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <History className="h-4 w-4" />
                  历史汇报记录
                </CardTitle>
                <CardDescription>所有汇报记录均可追溯，按时间倒序排列</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-6 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-border">
                  {reportHistory.map((record) => {
                    const meta = getStatusMeta(record.status)
                    const Icon = meta.icon
                    return (
                      <div key={record.id} className="relative flex gap-4 pl-0">
                        <div className="relative z-10 w-8 h-8 rounded-full bg-card border-2 border-border flex items-center justify-center shrink-0">
                          <Icon className={`h-4 w-4 ${meta.iconClass}`} />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-sm">{record.week}安全汇报</span>
                            <Badge
                              variant="outline"
                              className={
                                record.status === "safe"
                                  ? "text-green-600 border-green-200 bg-green-50"
                                  : record.status === "attention"
                                  ? "text-amber-600 border-amber-200 bg-amber-50"
                                  : "text-red-600 border-red-200 bg-red-50"
                              }
                            >
                              {meta.label}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {record.date}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {record.location}
                          </div>
                          <p className="text-sm mt-2 p-3 bg-muted rounded-lg">{record.note}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI 助手面板 */}
      <AIAssistantPanel title="安全助手" subtitle="守护您的在外安全">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>本月汇报进度</span>
            <span className="font-medium">3/4</span>
          </div>
          <Progress value={75} className="h-2" />
          <p className="text-xs text-muted-foreground">本周尚未汇报，请及时报平安</p>
        </div>

        <AIReminder
          title="下次汇报截止"
          deadline="2026-08-02 23:59"
          description="建议每周日前完成报平安，避免触发超期预警"
          urgent
        />

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            安全提示
          </h4>
          <AISuggestion
            title="保管好重要证件"
            description="护照、签证、保险单等请妥善保管，并备份电子版"
            type="info"
          />
          <AISuggestion
            title="保持通讯畅通"
            description="确保紧急联系人能随时联系到您"
            type="info"
          />
        </div>

        <AIInsight icon={<Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" />}>
          <p className="text-sm font-medium">紧急联系方式</p>
          <ul className="text-xs mt-2 space-y-1">
            <li>· 带队老师：李老师 +86 138-xxxx-xxxx</li>
            <li>· 学校24h值班：+86 010-xxxx-xxxx</li>
            <li>· 中国驻当地使领馆：+44 20-xxxx-xxxx</li>
          </ul>
        </AIInsight>

        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            安全状态分析
          </h4>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">汇报及时率</span>
            <span className="font-medium text-green-500">100%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">整体安全评估</span>
            <span className="font-medium text-green-500">良好</span>
          </div>
        </div>
      </AIAssistantPanel>
    </div>
  )
}
