"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  AIAssistantPanel,
  AIScoreCard,
  AIRecommendation,
  AIChecklistItem,
  AIInsight,
} from "@/components/ai/ai-assistant-panel"
import { Search, RotateCcw, RefreshCw, Sparkles, CheckCircle2, AlertCircle, Eye, ArrowRight } from "lucide-react"

const creditApplications = [
  {
    id: 1,
    studentName: "张五",
    studentId: "2022010001",
    department: "计算机学院",
    major: "计算机科学与技术",
    projectName: "剑桥大学2026寒假短期课程项目",
    foreignCourses: 3,
    localCourses: 3,
    totalCredits: 9,
    matchRate: 95,
    submitTime: "2026-10-01 14:30",
    aiSuggestion: "匹配度高，建议通过",
    status: "待审核",
  },
  {
    id: 2,
    studentName: "李明",
    studentId: "2022010002",
    department: "外国语学院",
    major: "英语",
    projectName: "(亚洲地区)2026年秋季学期第三批交换生项目",
    foreignCourses: 5,
    localCourses: 4,
    totalCredits: 12,
    matchRate: 88,
    submitTime: "2026-10-05 09:20",
    aiSuggestion: "1门课程匹配度较低，建议人工核实",
    status: "待审核",
  },
  {
    id: 3,
    studentName: "王芳",
    studentId: "2022010003",
    department: "管理学院",
    major: "工商管理",
    projectName: "布里斯托3+1本硕连读",
    foreignCourses: 8,
    localCourses: 7,
    totalCredits: 21,
    matchRate: 92,
    submitTime: "2026-10-08 16:45",
    aiSuggestion: "课程内容匹配良好，建议通过",
    status: "待审核",
  },
]

export default function CreditReviewPage() {
  const [tab, setTab] = useState("pending")

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        <div className="flex gap-2">
          <Button 
            variant={tab === "pending" ? "outline" : "ghost"}
            className={tab === "pending" ? "border-primary text-primary" : ""}
            onClick={() => setTab("pending")}
          >
            待审核
          </Button>
          <Button 
            variant={tab === "approved" ? "default" : "ghost"}
            onClick={() => setTab("approved")}
          >
            已审核
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
              <Input placeholder="项目名称" />
              <Input placeholder="专业" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="匹配度" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">高 (90%+)</SelectItem>
                  <SelectItem value="medium">中 (80-89%)</SelectItem>
                  <SelectItem value="low">低 (&lt;80%)</SelectItem>
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
                <RefreshCw className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">学分兑换审核列表</CardTitle>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI辅助审核
                </Button>
                <Select defaultValue="time">
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="time">提交时间</SelectItem>
                    <SelectItem value="match">匹配度</SelectItem>
                    <SelectItem value="credits">学分数</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>学生姓名</TableHead>
                  <TableHead>学号</TableHead>
                  <TableHead>归属单位</TableHead>
                  <TableHead>专业</TableHead>
                  <TableHead>项目名称</TableHead>
                  <TableHead>课程映射</TableHead>
                  <TableHead>兑换学分</TableHead>
                  <TableHead>匹配度</TableHead>
                  <TableHead>AI建议</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creditApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.studentName}</TableCell>
                    <TableCell className="text-sm">{app.studentId}</TableCell>
                    <TableCell className="text-sm">{app.department}</TableCell>
                    <TableCell className="text-sm">{app.major}</TableCell>
                    <TableCell className="text-sm max-w-[150px] truncate text-primary">
                      {app.projectName}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <span>{app.foreignCourses}门</span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        <span>{app.localCourses}门</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{app.totalCredits}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          app.matchRate >= 90 ? "bg-green-100 text-green-600" : 
                          app.matchRate >= 80 ? "bg-primary/10 text-primary" : "bg-amber-100 text-amber-600"
                        }`}>
                          {app.matchRate}%
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs ${
                        app.aiSuggestion.includes("通过") ? "text-green-600" : "text-amber-600"
                      }`}>
                        {app.aiSuggestion}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                          <Eye className="h-4 w-4 mr-1" />
                          详情
                        </Button>
                        <span className="text-muted-foreground">|</span>
                        <Button variant="link" size="sm" className="h-auto p-0 text-green-600">
                          通过
                        </Button>
                        <span className="text-muted-foreground">|</span>
                        <Button variant="link" size="sm" className="h-auto p-0 text-destructive">
                          退回
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
      <AIAssistantPanel title="AI智能助手" subtitle="学分兑换智能审核">
        <AIScoreCard score={3} label="待审核申请" color="warning" />

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            匹配度统计
          </h4>
          <div className="space-y-2">
            <AIChecklistItem label="高匹配度 (90%+)" status="completed" detail="2份" />
            <AIChecklistItem label="中匹配度 (80-89%)" status="pending" detail="1份" />
            <AIChecklistItem label="低匹配度 (<80%)" status="warning" detail="0份" />
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI智能功能
          </h4>
          <div className="space-y-2 text-sm">
            <Button variant="outline" size="sm" className="w-full justify-between">
              <span>课程大纲对比</span>
              <Badge variant="secondary">智能分析</Badge>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-between">
              <span>学分换算验证</span>
              <Badge variant="secondary">自动计算</Badge>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-between">
              <span>历史兑换参考</span>
              <Badge variant="secondary">智能推荐</Badge>
            </Button>
          </div>
        </div>

        <AIRecommendation
          title="李明的申请"
          stats={[
            { label: "《跨文化交际》课程匹配度较低", value: "建议与学生确认" }
          ]}
        />

        <AIInsight>
          <p className="text-sm font-medium mb-1">历史数据参考</p>
          <p className="text-xs">
            相似项目历史兑换通过率：<span className="font-bold text-green-600">94%</span>
          </p>
          <p className="text-xs mt-1">
            平均兑换学分：<span className="font-bold">12学分</span>
          </p>
        </AIInsight>

        <div className="bg-muted rounded-lg p-3">
          <h4 className="text-sm font-medium mb-2">本批次统计</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">申请人数</span>
              <span className="font-medium">3人</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">申请课程</span>
              <span className="font-medium">16门</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">申请学分</span>
              <span className="font-medium">42学分</span>
            </div>
          </div>
        </div>
      </AIAssistantPanel>
    </div>
  )
}
