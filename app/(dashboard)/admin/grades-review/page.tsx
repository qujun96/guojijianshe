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
} from "@/components/ai/ai-assistant-panel"
import { Search, RotateCcw, ClipboardCheck, Sparkles, FileCheck, Award, Eye } from "lucide-react"

const gradesSubmissions = [
  {
    id: 1,
    studentName: "张五",
    studentId: "2022010001",
    department: "计算机学院",
    projectName: "G国H大学2026寒假短期课程项目",
    courseCount: 3,
    totalCredits: 10,
    avgScore: 88,
    submitTime: "2026-09-15 10:30",
    aiVerified: true,
    aiScore: 95,
    status: "待审核",
  },
  {
    id: 2,
    studentName: "李明",
    studentId: "2022010002",
    department: "外国语学院",
    projectName: "2026年秋季学期第三批交换生项目",
    courseCount: 5,
    totalCredits: 15,
    avgScore: 82,
    submitTime: "2026-09-18 14:20",
    aiVerified: true,
    aiScore: 88,
    status: "待审核",
  },
  {
    id: 3,
    studentName: "王芳",
    studentId: "2022010003",
    department: "管理学院",
    projectName: "E国F大学3+1本硕连读",
    courseCount: 8,
    totalCredits: 24,
    avgScore: 91,
    submitTime: "2026-09-20 09:15",
    aiVerified: false,
    aiScore: 72,
    status: "待审核",
  },
]

export default function GradesReviewPage() {
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
            <div className="grid grid-cols-5 gap-3">
              <Input placeholder="学生姓名/学号" />
              <Input placeholder="项目名称" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="AI验证状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="verified">已验证</SelectItem>
                  <SelectItem value="pending">待验证</SelectItem>
                  <SelectItem value="failed">验证异常</SelectItem>
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
                <Award className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">成绩审核列表</CardTitle>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI批量验证
                </Button>
                <Select defaultValue="time">
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="time">提交时间</SelectItem>
                    <SelectItem value="score">AI评分</SelectItem>
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
                  <TableHead>项目名称</TableHead>
                  <TableHead>课程数</TableHead>
                  <TableHead>总学分</TableHead>
                  <TableHead>平均分</TableHead>
                  <TableHead>提交时间</TableHead>
                  <TableHead>AI验证</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gradesSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.studentName}</TableCell>
                    <TableCell className="text-sm">{submission.studentId}</TableCell>
                    <TableCell className="text-sm">{submission.department}</TableCell>
                    <TableCell className="text-sm max-w-[180px] truncate text-primary">
                      {submission.projectName}
                    </TableCell>
                    <TableCell>{submission.courseCount}门</TableCell>
                    <TableCell>{submission.totalCredits}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${
                        submission.avgScore >= 90 ? "text-green-600" : 
                        submission.avgScore >= 80 ? "text-primary" : "text-amber-600"
                      }`}>
                        {submission.avgScore}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{submission.submitTime}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          submission.aiScore >= 90 ? "bg-green-100 text-green-600" : 
                          submission.aiScore >= 80 ? "bg-primary/10 text-primary" : "bg-amber-100 text-amber-600"
                        }`}>
                          {submission.aiScore}
                        </div>
                        {submission.aiVerified ? (
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-600 border-green-200">
                            已验证
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs bg-amber-50 text-amber-600 border-amber-200">
                            待核实
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                          <Eye className="h-4 w-4 mr-1" />
                          查看
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
      <AIAssistantPanel title="AI智能助手" subtitle="成绩单智能验证与分析">
        <AIScoreCard score={3} label="待审核提交" color="warning" />

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-primary" />
            AI验证统计
          </h4>
          <div className="space-y-2">
            <AIChecklistItem label="成绩单验证通过" status="completed" detail="2份" />
            <AIChecklistItem label="待人工核实" status="warning" detail="1份" />
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI智能功能
          </h4>
          <div className="space-y-2 text-sm">
            <Button variant="outline" size="sm" className="w-full justify-between">
              <span>成绩单OCR识别</span>
              <Badge variant="secondary">智能提取</Badge>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-between">
              <span>成绩真实性验证</span>
              <Badge variant="secondary">自动核验</Badge>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-between">
              <span>成绩换算校验</span>
              <Badge variant="secondary">自动计算</Badge>
            </Button>
          </div>
        </div>

        <AIRecommendation
          title="需要关注"
          stats={[
            { label: "王芳的成绩单部分信息模糊", value: "建议人工核实" }
          ]}
        />

        <div className="bg-muted rounded-lg p-3">
          <h4 className="text-sm font-medium mb-2">成绩分布统计</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">优秀 (90+)</span>
              <span className="font-medium">1人</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">良好 (80-89)</span>
              <span className="font-medium">2人</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">平均分</span>
              <span className="font-medium">87分</span>
            </div>
          </div>
        </div>
      </AIAssistantPanel>
    </div>
  )
}
