"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AIAssistantPanel,
  AIScoreCard,
  AIRecommendation,
  AIReminder,
  AIChecklistItem,
} from "@/components/ai/ai-assistant-panel"
import {
  Globe,
  Clock,
  CheckCircle2,
  ArrowRight,
  FileText,
  Plane,
  BookOpen,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  Building2,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

const myProjects = [
  {
    id: 1,
    name: "G国H大学2026寒假短期课程项目",
    type: "短期课程项目",
    school: "G国H大学",
    location: "G国H市",
    duration: "2026-07-15 至 2026-08-30",
    phase: "派出中",
    status: "正在进行",
    progress: 60,
    tasks: [
      { name: "申请提交", status: "completed" },
      { name: "材料审核", status: "completed" },
      { name: "派出材料", status: "completed" },
      { name: "学习报告", status: "current" },
      { name: "成绩提交", status: "pending" },
      { name: "学分兑换", status: "pending" },
    ],
  },
]

const completedProjects = [
  {
    id: 2,
    name: "(亚洲地区)2025年春季学期交换生项目",
    type: "交换生项目",
    school: "A国D大学",
    location: "A国首都",
    duration: "2025-02-01 至 2025-06-30",
    phase: "已完成",
    status: "学分已兑换",
    credits: 15,
    grade: "A",
  },
]

export default function MyProjectsPage() {
  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">我的参与项目</CardTitle>
                <CardDescription>
                  查看您参与的所有国际化项目及进度
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active" className="gap-2">
              <Clock className="h-4 w-4" />
              进行中项目
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              已完成项目
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {myProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center">
                        <Globe className="h-7 w-7 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {project.school}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {project.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {project.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        className={
                          project.phase === "派出前" ? "bg-blue-500" :
                          project.phase === "派出中" ? "bg-amber-500" :
                          "bg-green-500"
                        }
                      >
                        {project.phase}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">{project.status}</p>
                    </div>
                  </div>

                  {/* Progress Timeline */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>项目进度</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2 mb-4" />
                    
                    <div className="flex items-center justify-between">
                      {project.tasks.map((task, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                            task.status === "completed" ? "bg-green-500 text-white" :
                            task.status === "current" ? "bg-primary text-white" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {task.status === "completed" ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <span className={`text-xs text-center ${
                            task.status === "current" ? "text-primary font-medium" : "text-muted-foreground"
                          }`}>
                            {task.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-4 gap-3 pt-4 border-t">
                    <Link href="/student/dispatch-materials">
                      <Button variant="outline" className="w-full h-16 flex-col gap-1">
                        <FileText className="h-5 w-5" />
                        <span className="text-xs">派出材料</span>
                      </Button>
                    </Link>
                    <Link href="/student/learning-reports">
                      <Button variant="default" className="w-full h-16 flex-col gap-1">
                        <BookOpen className="h-5 w-5" />
                        <span className="text-xs">学习报告</span>
                      </Button>
                    </Link>
                    <Link href="/student/grades-submit">
                      <Button variant="outline" className="w-full h-16 flex-col gap-1">
                        <Award className="h-5 w-5" />
                        <span className="text-xs">成绩提交</span>
                      </Button>
                    </Link>
                    <Link href="/student/credit-transfer">
                      <Button variant="outline" className="w-full h-16 flex-col gap-1">
                        <GraduationCap className="h-5 w-5" />
                        <span className="text-xs">学分兑换</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="h-7 w-7 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {project.school}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {project.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {project.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                            {project.status}
                          </Badge>
                          <span className="text-sm">
                            获得学分: <span className="font-bold">{project.credits}</span>
                          </span>
                          <span className="text-sm">
                            综合成绩: <span className="font-bold text-green-600">{project.grade}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">查看详情</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI项目助手" subtitle="智能跟踪您的项目进度">
        <AIScoreCard score={60} label="当前项目进度" color="primary" />

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            当前任务
          </h4>
          <div className="space-y-2">
            <AIChecklistItem label="派出材料提交" status="completed" detail="已完成" />
            <AIChecklistItem label="7月学习报告" status="completed" detail="已审核" />
            <AIChecklistItem label="8月学习报告" status="pending" detail="待提交" />
            <AIChecklistItem label="成绩提交" status="pending" detail="未开始" />
          </div>
        </div>

        <AIRecommendation
          title="下一步行动"
          stats={[
            { label: "建议尽快提交8月学习报告", value: "" }
          ]}
          highlight
        />

        <AIReminder
          title="8月学习报告截止"
          deadline="2026-08-28 23:59"
          description="请在月底前提交本月学习报告，还有27天"
        />

        <div className="bg-muted rounded-lg p-3">
          <h4 className="text-sm font-medium mb-2">项目统计</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">已参与项目</span>
              <span className="font-medium">2个</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">已获学分</span>
              <span className="font-medium">15学分</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">出境天数</span>
              <span className="font-medium">195天</span>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <h4 className="text-sm font-medium mb-2">AI温馨提示</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>- 学习报告建议每周记录一次</li>
            <li>- 保留好所有纸质材料原件</li>
            <li>- 遇到问题及时联系学院</li>
          </ul>
        </div>
      </AIAssistantPanel>
    </div>
  )
}
