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
  AIRecommendation,
} from "@/components/ai/ai-assistant-panel"
import { Search, RotateCcw, Calendar, ClipboardCheck, Sparkles, Zap, FileSearch, Target } from "lucide-react"
import Link from "next/link"

const applications = [
  {
    id: 1,
    studentName: "王家琪",
    department: "美视电影学院",
    projectName: "(亚洲地区) 2026年秋季学期第三批交换生项目",
    projectType: "交换生项目",
    dispatchTime: "2026-08-25 00:00 至 2026-12-24 23:59",
    aiScore: 86,
    aiSuggestion: "推荐通过",
    status: "待审批",
  },
  {
    id: 2,
    studentName: "东京全",
    department: "美视电影学院",
    projectName: "(亚洲地区) 2026年秋季学期第三批交换生项目",
    projectType: "国际竞赛",
    dispatchTime: "2026-08-25 00:00 至 2026-12-24 23:59",
    aiScore: 75,
    aiSuggestion: "近三年无出国（境）经历、CET-4，未达设定标准，建议人工复核",
    status: "待审批",
  },
  {
    id: 3,
    studentName: "布里斯托",
    department: "美视电影学院",
    projectName: "(亚洲地区) 2026年秋季学期第三批交换生项目",
    projectType: "交换生项目",
    dispatchTime: "2026-08-25 00:00 至 2026-12-24 23:59",
    aiScore: 86,
    aiSuggestion: "GPA未达设定标准，建议人工复核",
    status: "待审批",
  },
  {
    id: 4,
    studentName: "陈明明",
    department: "美视电影学院",
    projectName: "(亚洲地区) 2026年秋季学期第三批交换生项目",
    projectType: "短期课程项目",
    dispatchTime: "2026-08-25 00:00 至 2026-12-24 23:59",
    aiScore: 75,
    aiSuggestion: "外语水平证明文件未通过AI验证，建议人工复核",
    status: "待审批",
  },
  {
    id: 5,
    studentName: "张卫健",
    department: "美视电影学院",
    projectName: "(亚洲地区) 2026年秋季学期第三批交换生项目",
    projectType: "短期课程项目",
    dispatchTime: "2026-08-25 00:00 至 2026-12-24 23:59",
    aiScore: 86,
    aiSuggestion: "存在未解除的违纪处分，建议人工复核",
    status: "待审批",
  },
]

export default function ReviewPage() {
  const [tab, setTab] = useState("pending")

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {/* Tab Buttons */}
        <div className="flex gap-2">
          <Button 
            variant={tab === "pending" ? "outline" : "ghost"}
            className={tab === "pending" ? "border-primary text-primary" : ""}
            onClick={() => setTab("pending")}
          >
            待审批
          </Button>
          <Button 
            variant={tab === "approved" ? "default" : "ghost"}
            onClick={() => setTab("approved")}
          >
            已审批
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
              <Input placeholder="项目名称" />
              <Input placeholder="学校/组织" />
              <div className="flex items-center gap-2">
                <Input type="date" placeholder="请选择开始时间" />
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-2">
                <Input type="date" placeholder="请选择结束时间" />
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input placeholder="请输入项目类别" />
              <div className="flex gap-2">
                <Button className="gap-2 flex-1">
                  <Search className="h-4 w-4" />
                  搜索
                </Button>
                <Button variant="outline" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  重置
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">申请列表</CardTitle>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                排序方式：
                <Select defaultValue="created">
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created">项目创建时间</SelectItem>
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
                  <TableHead>归属单位</TableHead>
                  <TableHead>项目名称</TableHead>
                  <TableHead>项目类别</TableHead>
                  <TableHead>派出时间</TableHead>
                  <TableHead>AI评分</TableHead>
                  <TableHead>AI建议</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.studentName}</TableCell>
                    <TableCell className="text-sm">{app.department}</TableCell>
                    <TableCell className="text-sm max-w-[200px] truncate text-primary">
                      {app.projectName}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {app.projectType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{app.dispatchTime}</TableCell>
                    <TableCell>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        app.aiScore >= 85 ? "bg-green-100 text-green-600" : 
                        app.aiScore >= 75 ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-600"
                      }`}>
                        {app.aiScore}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs ${
                        app.aiSuggestion.includes("推荐通过") ? "text-green-600" : "text-amber-600"
                      }`}>
                        {app.aiSuggestion}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link href={`/admin/review/${app.id}`}>
                        <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                          审批
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI智能助手" subtitle="实时评估与筛选建议">
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            AI批量处理
          </h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                自动评分
              </span>
              <Button size="sm" variant="outline" className="h-7 text-xs text-primary">一键评分</Button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <FileSearch className="h-4 w-4" />
                材料完整性检查
              </span>
              <Button size="sm" variant="outline" className="h-7 text-xs text-primary">自动识别</Button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                参项指标核对
              </span>
              <Button size="sm" variant="outline" className="h-7 text-xs text-primary">自动对照</Button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI审核建议
          </h4>
          
          <AIRecommendation
            title="(亚洲地区) 2026年秋季学期第三批交换生项目"
            stats={[
              { label: "项目即将截止，请尽快完成审批", value: "" }
            ]}
          />
          <Button size="sm" variant="outline" className="w-full text-xs text-primary">
            应用
          </Button>

          <AIRecommendation
            title="(亚洲地区) 2026年秋季学期第三批交换生项目"
            stats={[
              { label: "项目即将截止，请尽快完成审批", value: "" }
            ]}
          />
          <Button size="sm" variant="outline" className="w-full text-xs text-primary">
            应用
          </Button>
        </div>
      </AIAssistantPanel>
    </div>
  )
}
