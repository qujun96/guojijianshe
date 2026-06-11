"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  Search,
  RotateCcw,
  Sparkles,
  UserCog,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye
} from "lucide-react"
import Link from "next/link"

interface EnrollmentApplication {
  id: string
  studentName: string
  studentId: string
  studentType: "本科生" | "研究生"
  college: string
  project: string
  changeType: string
  applyDate: string
  status: "pending" | "approved" | "rejected" | "syncing"
}

const applications: EnrollmentApplication[] = [
  {
    id: "1",
    studentName: "张三",
    studentId: "2022010001",
    studentType: "本科生",
    college: "计算机科学与技术学院",
    project: "A国B国人才培养计划",
    changeType: "保留学籍",
    applyDate: "2026-08-15",
    status: "pending"
  },
  {
    id: "2",
    studentName: "李四",
    studentId: "2022010002",
    studentType: "研究生",
    college: "电子信息学院",
    project: "欧盟交换项目",
    changeType: "休学",
    applyDate: "2026-08-14",
    status: "approved"
  },
  {
    id: "3",
    studentName: "王五",
    studentId: "2022010003",
    studentType: "本科生",
    college: "经济管理学院",
    project: "A国交换项目",
    changeType: "联合培养",
    applyDate: "2026-08-13",
    status: "syncing"
  },
]

function getStatusBadge(status: EnrollmentApplication["status"]) {
  switch (status) {
    case "pending":
      return <Badge className="bg-amber-500">待审核</Badge>
    case "approved":
      return <Badge className="bg-green-500">已通过</Badge>
    case "rejected":
      return <Badge className="bg-red-500">已驳回</Badge>
    case "syncing":
      return <Badge className="bg-blue-500">同步中</Badge>
  }
}

export default function EnrollmentReviewPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const pendingCount = applications.filter(a => a.status === "pending").length

  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-6">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">学籍异动审核</h1>
          <p className="text-muted-foreground mt-1">审核学生的学籍异动申请</p>
        </div>

        {/* Tab切换 */}
        <div className="flex gap-2">
          <Button 
            variant={activeTab === "pending" ? "default" : "outline"}
            onClick={() => setActiveTab("pending")}
            className="gap-2"
          >
            待审核
            {pendingCount > 0 && (
              <Badge variant="secondary" className="bg-white/20">{pendingCount}</Badge>
            )}
          </Button>
          <Button 
            variant={activeTab === "approved" ? "default" : "outline"}
            onClick={() => setActiveTab("approved")}
          >
            已审核
          </Button>
        </div>

        {/* 搜索筛选 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Input placeholder="搜索学生姓名/学号" className="w-full" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="学生类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="undergraduate">本科生</SelectItem>
                  <SelectItem value="graduate">研究生</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="异动类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="retain">保留学籍</SelectItem>
                  <SelectItem value="suspend">休学</SelectItem>
                  <SelectItem value="joint">联合培养</SelectItem>
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

        {/* 申请列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              申请列表
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>学生信息</TableHead>
                  <TableHead>学生类型</TableHead>
                  <TableHead>所在学院</TableHead>
                  <TableHead>参与项目</TableHead>
                  <TableHead>异动类型</TableHead>
                  <TableHead>申请日期</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications
                  .filter(a => activeTab === "pending" ? a.status === "pending" : a.status !== "pending")
                  .map(app => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{app.studentName}</div>
                        <div className="text-xs text-muted-foreground">{app.studentId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        app.studentType === "本科生" ? "border-blue-500 text-blue-500" : "border-purple-500 text-purple-500"
                      }>
                        {app.studentType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{app.college}</TableCell>
                    <TableCell className="text-sm max-w-[150px] truncate">{app.project}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{app.changeType}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{app.applyDate}</TableCell>
                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {app.status === "pending" && (
                          <Button size="sm" className="h-8">审核</Button>
                        )}
                        {app.status === "syncing" && (
                          <Button variant="outline" size="sm" className="h-8 gap-1">
                            <ExternalLink className="h-3 w-3" />
                            查看外部状态
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* 右侧AI助手面板 */}
      <div className="w-72 shrink-0">
        <Card className="sticky top-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-white">AI审核助手</CardTitle>
                <p className="text-xs text-slate-400">智能辅助学籍审核</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 统计概览 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-amber-500/20 rounded-lg text-center">
                <div className="text-2xl font-bold text-amber-400">{pendingCount}</div>
                <div className="text-xs text-slate-400">待审核</div>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-400">
                  {applications.filter(a => a.status === "approved").length}
                </div>
                <div className="text-xs text-slate-400">已通过</div>
              </div>
            </div>

            {/* 状态同步说明 */}
            <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-blue-300 font-medium">状态同步机制</span>
              </div>
              <p className="text-xs text-blue-200">
                学籍异动审批在本科生院/研究生院系统完成后，状态将自动同步回本平台
              </p>
            </div>

            {/* AI建议 */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400">AI审核建议</div>
              <div className="p-3 bg-white/10 rounded-lg">
                <p className="text-xs text-slate-300">
                  张三的申请材料完整，建议通过审核并同步至本科生院系统
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
