"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIAssistantPanel } from "@/components/ai/ai-assistant-panel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ArrowLeft, FileText, Calendar, Users, MapPin, Building, Clock, Edit2, AlertCircle, CheckCircle2 } from "lucide-react"

const projectDetails = {
  id: 1,
  name: "韩国忠南大学奖学金交换生项目(2026)",
  type: "交换生项目",
  school: "韩国忠南大学",
  country: "韩国",
  target: "本科生、研究生",
  duration: "三个月及以上",
  applicants: 15,
  deadline: "2026-05-10 09:55",
  created: "2026-03-10 09:55",
  startDate: "2026-09-01",
  endDate: "2027-01-15",
  materialDeadline: "2026-06-30",
  status: "开放报名",
  applyMethod: "线上",
  isTop200: true,
  intro: "韩国忠南大学奖学金交换生项目是我校与韩国忠南大学合作开展的交换生项目。该项目为期一个学期，学生可在韩国忠南大学选修课程，获得的学分可按规定进行转换。项目提供部分奖学金资助，包括学费减免和生活补贴。",
  requirements: [
    "GPA不低于3.0（4分制）",
    "通过CET-4或CET-6考试",
    "专业成绩排名前30%",
    "无违纪处分记录"
  ],
  contact: {
    name: "张老师",
    phone: "010-12345678",
    email: "zhang@university.edu.cn"
  }
}

export default function ProjectDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [isTimeDialogOpen, setIsTimeDialogOpen] = useState(false)
  const [materialDeadline, setMaterialDeadline] = useState(projectDetails.materialDeadline)
  const [editingDeadline, setEditingDeadline] = useState(projectDetails.materialDeadline)

  const handleSaveDeadline = () => {
    setMaterialDeadline(editingDeadline)
    setIsTimeDialogOpen(false)
  }

  const calculateDaysRemaining = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysRemaining = calculateDaysRemaining(materialDeadline)

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {/* Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg font-semibold">{projectDetails.name}</h1>
                  <Badge variant="default">{projectDetails.status}</Badge>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {projectDetails.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  项目编号：PRJ-{params.id}-2026 | 创建时间：{projectDetails.created}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => router.push(`/admin/projects/${params.id}/edit`)}>
                  编辑项目
                </Button>
                <Button onClick={() => router.push(`/admin/projects/${params.id}/students`)}>
                  查看学生名单
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">基础信息</TabsTrigger>
            <TabsTrigger value="time">时间设置</TabsTrigger>
            <TabsTrigger value="requirements">申请要求</TabsTrigger>
            <TabsTrigger value="contact">联系方式</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  基础信息
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">合作院校</p>
                        <p className="font-medium">{projectDetails.school}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">国家/地区</p>
                        <p className="font-medium">{projectDetails.country}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">申请对象</p>
                        <p className="font-medium">{projectDetails.target}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">项目时长</p>
                        <p className="font-medium">{projectDetails.duration}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">派出时间</p>
                        <p className="font-medium">{projectDetails.startDate} 至 {projectDetails.endDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">报名截止</p>
                        <p className="font-medium text-amber-600">{projectDetails.deadline}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  项目介绍
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{projectDetails.intro}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time" className="space-y-4">
            {/* Time Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    时间设置
                  </CardTitle>
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => {
                    setEditingDeadline(materialDeadline)
                    setIsTimeDialogOpen(true)
                  }}>
                    <Edit2 className="h-4 w-4" />
                    编辑时间
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        派出开始时间
                      </div>
                      <p className="font-medium text-lg">{projectDetails.startDate}</p>
                    </div>
                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        派出结束时间
                      </div>
                      <p className="font-medium text-lg">{projectDetails.endDate}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        报名截止时间
                      </div>
                      <p className="font-medium text-lg text-amber-600">{projectDetails.deadline}</p>
                    </div>
                    <div className={`p-4 border rounded-lg space-y-2 ${daysRemaining <= 30 ? "border-red-200 bg-red-50" : daysRemaining <= 60 ? "border-amber-200 bg-amber-50" : "border-green-200 bg-green-50"}`}>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertCircle className="h-4 w-4" />
                        材料提交截止时间
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-lg">{materialDeadline}</p>
                        <Badge variant={daysRemaining <= 30 ? "destructive" : daysRemaining <= 60 ? "outline" : "secondary"} className={daysRemaining <= 60 && daysRemaining > 30 ? "bg-amber-100 text-amber-700 border-amber-300" : ""}>
                          {daysRemaining > 0 ? `剩余 ${daysRemaining} 天` : "已截止"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">学生需在此日期前提交所有派出材料</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time Line */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  时间线
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted" />
                  <div className="space-y-6">
                    <div className="relative flex items-start gap-4 pl-10">
                      <div className="absolute left-2.5 w-3 h-3 rounded-full bg-green-500" />
                      <div>
                        <p className="font-medium">项目创建</p>
                        <p className="text-sm text-muted-foreground">{projectDetails.created}</p>
                      </div>
                    </div>
                    <div className="relative flex items-start gap-4 pl-10">
                      <div className="absolute left-2.5 w-3 h-3 rounded-full bg-amber-500" />
                      <div>
                        <p className="font-medium">报名截止</p>
                        <p className="text-sm text-muted-foreground">{projectDetails.deadline}</p>
                      </div>
                    </div>
                    <div className="relative flex items-start gap-4 pl-10">
                      <div className="absolute left-2.5 w-3 h-3 rounded-full bg-blue-500" />
                      <div>
                        <p className="font-medium">材料提交截止</p>
                        <p className="text-sm text-muted-foreground">{materialDeadline}</p>
                      </div>
                    </div>
                    <div className="relative flex items-start gap-4 pl-10">
                      <div className="absolute left-2.5 w-3 h-3 rounded-full bg-primary" />
                      <div>
                        <p className="font-medium">项目开始</p>
                        <p className="text-sm text-muted-foreground">{projectDetails.startDate}</p>
                      </div>
                    </div>
                    <div className="relative flex items-start gap-4 pl-10">
                      <div className="absolute left-2.5 w-3 h-3 rounded-full bg-muted-foreground" />
                      <div>
                        <p className="font-medium">项目结束</p>
                        <p className="text-sm text-muted-foreground">{projectDetails.endDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-4">
            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  申请要求
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {projectDetails.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  联系方式
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-8">
                  <div>
                    <p className="text-sm text-muted-foreground">联系人</p>
                    <p className="font-medium">{projectDetails.contact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">联系电话</p>
                    <p className="font-medium">{projectDetails.contact.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">电子邮箱</p>
                    <p className="font-medium">{projectDetails.contact.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Time Dialog */}
        <Dialog open={isTimeDialogOpen} onOpenChange={setIsTimeDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>编辑时间设置</DialogTitle>
              <DialogDescription>
                修改项目的关键时间节点
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>材料提交截止时间</Label>
                <Input 
                  type="date" 
                  value={editingDeadline}
                  onChange={(e) => setEditingDeadline(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">学生需在此日期前提交所有派出材料，此时间将显示在学生的派出材料提交页面</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsTimeDialogOpen(false)}>取消</Button>
              <Button onClick={handleSaveDeadline}>保存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI智能分析" subtitle="项目数据洞察">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">类似项目参考</h4>
          <div className="border rounded-lg p-3 space-y-2 border-border">
            <h4 className="font-medium text-sm">2025韩国成均馆大学项目</h4>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                报名: <span className="font-medium text-foreground">32人</span>
              </span>
              <span className="flex items-center gap-1">
                通过率: <span className="font-medium text-foreground">78%</span>
              </span>
            </div>
          </div>
          <div className="border rounded-lg p-3 space-y-2 border-border">
            <h4 className="font-medium text-sm">2025韩国延世大学项目</h4>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                报名: <span className="font-medium text-foreground">45人</span>
              </span>
              <span className="flex items-center gap-1">
                通过率: <span className="font-medium text-foreground">82%</span>
              </span>
            </div>
          </div>
        </div>
      </AIAssistantPanel>
    </div>
  )
}
