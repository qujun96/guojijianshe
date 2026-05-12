"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AIAssistantPanel } from "@/components/ai/ai-assistant-panel"
import { 
  Search, 
  RotateCcw, 
  Plus, 
  Calendar, 
  FileSignature, 
  BarChart3,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  Undo2
} from "lucide-react"

// 模拟数据
const applications = [
  {
    id: "PA202403001",
    projectName: "G国H大学工程学暑期交流项目",
    applyUnit: "电气工程学院",
    applicant: "张伟教授",
    applyTime: "2024-03-15",
    projectType: "暑期学校项目",
    budget: 975000,
    status: "待审核",
  },
  {
    id: "PA202403002",
    projectName: "G国I大学人工智能研修班",
    applyUnit: "信息工程学院",
    applicant: "陈明教授",
    applyTime: "2024-03-14",
    projectType: "短期课程项目",
    budget: 850000,
    status: "草稿",
  },
  {
    id: "PA202403003",
    projectName: "A国J大学经济管理项目",
    applyUnit: "管理学院",
    applicant: "刘芳副教授",
    applyTime: "2024-03-13",
    projectType: "交换生项目",
    budget: 1200000,
    status: "已通过",
  },
  {
    id: "PA202403004",
    projectName: "K国L大学交换项目",
    applyUnit: "机械工程学院",
    applicant: "王磊教授",
    applyTime: "2024-03-12",
    projectType: "交换生项目",
    budget: 680000,
    status: "已驳回",
  },
  {
    id: "PA202403005",
    projectName: "C国M大学联合培养",
    applyUnit: "土木工程学院",
    applicant: "李强教授",
    applyTime: "2024-03-11",
    projectType: "联合培养项目",
    budget: 920000,
    status: "待审核",
  },
  {
    id: "PA202403006",
    projectName: "A国N大学联合培养计划",
    applyUnit: "机械工程学院",
    applicant: "王芳副教授",
    applyTime: "2024-03-10",
    projectType: "联合培养项目",
    budget: 1500000,
    status: "已撤回",
  },
]

const statusConfig: Record<string, { color: string; bgColor: string }> = {
  "草稿": { color: "text-gray-600", bgColor: "bg-gray-100" },
  "待审核": { color: "text-amber-600", bgColor: "bg-amber-100" },
  "审核中": { color: "text-blue-600", bgColor: "bg-blue-100" },
  "已通过": { color: "text-green-600", bgColor: "bg-green-100" },
  "已驳回": { color: "text-red-600", bgColor: "bg-red-100" },
  "已撤回": { color: "text-gray-500", bgColor: "bg-gray-100" },
}

const projectTypes = [
  "全部类别",
  "交换生项目",
  "短期课程项目",
  "暑期学校项目",
  "联合培养项目",
  "国际竞赛",
]

export default function ProjectApplicationPage() {
  const router = useRouter()
  const [filter, setFilter] = useState("all")
  const [searchName, setSearchName] = useState("")
  const [searchUnit, setSearchUnit] = useState("")
  const [searchType, setSearchType] = useState("全部类别")
  const [searchStatus, setSearchStatus] = useState("全部状态")
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<typeof applications[0] | null>(null)

  const getFilteredApplications = () => {
    let filtered = applications

    // 按状态Tab筛选
    if (filter !== "all") {
      const statusMap: Record<string, string> = {
        "draft": "草稿",
        "pending": "待审核",
        "approved": "已通过",
        "rejected": "已驳回",
        "withdrawn": "已撤回",
      }
      filtered = filtered.filter(app => app.status === statusMap[filter])
    }

    // 按搜索条件筛选
    if (searchName) {
      filtered = filtered.filter(app => 
        app.projectName.toLowerCase().includes(searchName.toLowerCase())
      )
    }
    if (searchUnit) {
      filtered = filtered.filter(app => 
        app.applyUnit.toLowerCase().includes(searchUnit.toLowerCase())
      )
    }
    if (searchType && searchType !== "全部类别") {
      filtered = filtered.filter(app => app.projectType === searchType)
    }
    if (searchStatus && searchStatus !== "全部状态") {
      filtered = filtered.filter(app => app.status === searchStatus)
    }

    return filtered
  }

  const filteredApplications = getFilteredApplications()

  const handleWithdraw = (app: typeof applications[0]) => {
    setSelectedApplication(app)
    setWithdrawDialogOpen(true)
  }

  const handleReset = () => {
    setSearchName("")
    setSearchUnit("")
    setSearchType("全部类别")
    setSearchStatus("全部状态")
  }

  const getStatusCounts = () => {
    return {
      all: applications.length,
      draft: applications.filter(a => a.status === "草稿").length,
      pending: applications.filter(a => a.status === "待审核").length,
      approved: applications.filter(a => a.status === "已通过").length,
      rejected: applications.filter(a => a.status === "已驳回").length,
      withdrawn: applications.filter(a => a.status === "已撤回").length,
    }
  }

  const counts = getStatusCounts()

  const renderOperations = (app: typeof applications[0]) => {
    const operations = []
    
    switch (app.status) {
      case "草稿":
        operations.push(
          <Button key="edit" variant="link" size="sm" className="h-auto p-0" onClick={() => router.push(`/admin/project-application/${app.id}/edit`)}>
            编辑
          </Button>,
          <span key="sep1" className="text-muted-foreground">|</span>,
          <Button key="detail" variant="link" size="sm" className="h-auto p-0" onClick={() => router.push(`/admin/project-application/${app.id}`)}>
            详情
          </Button>,
          <span key="sep2" className="text-muted-foreground">|</span>,
          <Button key="submit" variant="link" size="sm" className="h-auto p-0 text-green-600" onClick={() => router.push(`/admin/project-application/${app.id}/edit`)}>
            提交
          </Button>,
          <span key="sep3" className="text-muted-foreground">|</span>,
          <Button key="delete" variant="link" size="sm" className="h-auto p-0 text-destructive">
            删除
          </Button>
        )
        break
      case "待审核":
        operations.push(
          <Button key="detail" variant="link" size="sm" className="h-auto p-0" onClick={() => router.push(`/admin/project-application/${app.id}`)}>
            详情
          </Button>,
          <span key="sep1" className="text-muted-foreground">|</span>,
          <Button key="withdraw" variant="link" size="sm" className="h-auto p-0 text-amber-600" onClick={() => handleWithdraw(app)}>
            撤回
          </Button>
        )
        break
      case "审核中":
        operations.push(
          <Button key="detail" variant="link" size="sm" className="h-auto p-0" onClick={() => router.push(`/admin/project-application/${app.id}`)}>
            详情
          </Button>
        )
        break
      case "已通过":
        operations.push(
          <Button key="detail" variant="link" size="sm" className="h-auto p-0" onClick={() => router.push(`/admin/project-application/${app.id}`)}>
            详情
          </Button>
        )
        break
      case "已驳回":
        operations.push(
          <Button key="detail" variant="link" size="sm" className="h-auto p-0" onClick={() => router.push(`/admin/project-application/${app.id}`)}>
            详情
          </Button>,
          <span key="sep1" className="text-muted-foreground">|</span>,
          <Button key="reEdit" variant="link" size="sm" className="h-auto p-0 text-primary" onClick={() => router.push(`/admin/project-application/${app.id}/edit`)}>
            重新编辑
          </Button>
        )
        break
      case "已撤回":
        operations.push(
          <Button key="edit" variant="link" size="sm" className="h-auto p-0" onClick={() => router.push(`/admin/project-application/${app.id}/edit`)}>
            编辑
          </Button>,
          <span key="sep1" className="text-muted-foreground">|</span>,
          <Button key="detail" variant="link" size="sm" className="h-auto p-0" onClick={() => router.push(`/admin/project-application/${app.id}`)}>
            详情
          </Button>,
          <span key="sep2" className="text-muted-foreground">|</span>,
          <Button key="delete" variant="link" size="sm" className="h-auto p-0 text-destructive">
            删除
          </Button>
        )
        break
    }

    return <div className="flex items-center gap-1 text-sm">{operations}</div>
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">项目立项申报查询</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filter Tabs */}
            <div className="flex gap-2">
              <Button 
                variant={filter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("all")}
              >
                全部 <Badge variant="secondary" className="ml-1">{counts.all}</Badge>
              </Button>
              <Button 
                variant={filter === "draft" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("draft")}
              >
                草稿 <Badge variant="secondary" className="ml-1">{counts.draft}</Badge>
              </Button>
              <Button 
                variant={filter === "pending" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("pending")}
              >
                待审核 <Badge variant="secondary" className="ml-1">{counts.pending}</Badge>
              </Button>
              <Button 
                variant={filter === "approved" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("approved")}
              >
                已通过 <Badge variant="secondary" className="ml-1">{counts.approved}</Badge>
              </Button>
              <Button 
                variant={filter === "rejected" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("rejected")}
              >
                已驳回 <Badge variant="secondary" className="ml-1">{counts.rejected}</Badge>
              </Button>
              <Button 
                variant={filter === "withdrawn" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("withdrawn")}
              >
                已撤回 <Badge variant="secondary" className="ml-1">{counts.withdrawn}</Badge>
              </Button>
            </div>

            {/* Search Filters */}
            <div className="grid grid-cols-6 gap-3">
              <Input 
                placeholder="请输入项目名称" 
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <Input 
                placeholder="请输入申报单位" 
                value={searchUnit}
                onChange={(e) => setSearchUnit(e.target.value)}
              />
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger>
                  <SelectValue placeholder="项目类别" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Input type="date" placeholder="申报开始时间" />
                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
              <div className="flex items-center gap-2">
                <Input type="date" placeholder="申报结束时间" />
                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
              <Select value={searchStatus} onValueChange={setSearchStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="申报状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="全部状态">全部状态</SelectItem>
                  <SelectItem value="草稿">草稿</SelectItem>
                  <SelectItem value="待审核">待审核</SelectItem>
                  <SelectItem value="已通过">已通过</SelectItem>
                  <SelectItem value="已驳回">已驳回</SelectItem>
                  <SelectItem value="已撤回">已撤回</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button className="gap-2">
                <Search className="h-4 w-4" />
                搜索
              </Button>
              <Button variant="outline" className="gap-2" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
                重置
              </Button>
              <Button 
                variant="default" 
                className="gap-2 ml-auto"
                onClick={() => router.push("/admin/project-application/new")}
              >
                <Plus className="h-4 w-4" />
                新建立项申报
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSignature className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">立项申报列表</CardTitle>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                排序方式：
                <Select defaultValue="applyTime">
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applyTime">申报时间</SelectItem>
                    <SelectItem value="budget">预算金额</SelectItem>
                    <SelectItem value="projectName">项目名称</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>项目名称</TableHead>
                  <TableHead>申报单位</TableHead>
                  <TableHead>申报人</TableHead>
                  <TableHead>申报时间</TableHead>
                  <TableHead>项目类别</TableHead>
                  <TableHead>预算金额</TableHead>
                  <TableHead>申报状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium max-w-[200px]">
                      <button 
                        className="text-primary hover:underline text-left truncate block w-full"
                        onClick={() => router.push(`/admin/project-application/${app.id}`)}
                      >
                        {app.projectName}
                      </button>
                    </TableCell>
                    <TableCell className="text-sm">{app.applyUnit}</TableCell>
                    <TableCell className="text-sm">{app.applicant}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{app.applyTime}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {app.projectType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      ¥{app.budget.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusConfig[app.status]?.bgColor} ${statusConfig[app.status]?.color} border-0`}>
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {renderOperations(app)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>共 {filteredApplications.length} 条</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>上一页</Button>
                <Button variant="default" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">下一页</Button>
                <span className="ml-2">10 条/页</span>
                <span>跳至</span>
                <Input className="w-16 h-8" />
                <span>页</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI智能分析" subtitle="基于立项申报数据的深度洞察">
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            申报状态概览
          </h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="text-sm">待审核</span>
              </div>
              <Badge variant="outline" className="text-amber-600 border-amber-300">{counts.pending}</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm">已通过</span>
              </div>
              <Badge className="bg-green-500">{counts.approved}</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm">已驳回</span>
              </div>
              <span className="font-medium text-sm">{counts.rejected}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Undo2 className="w-4 h-4 text-gray-400" />
                <span className="text-sm">已撤回</span>
              </div>
              <span className="font-medium text-sm">{counts.withdrawn}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            预算分析
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
              <span className="text-sm">本月申报总预算</span>
              <span className="font-medium text-primary">¥6,125,000</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
              <span className="text-sm">平均项目预算</span>
              <span className="font-medium">¥1,020,833</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            待办提醒
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-amber-50 rounded-lg">
              <span className="text-sm text-amber-700">2个申报待审核</span>
              <Button variant="ghost" size="sm" className="h-6 text-xs text-amber-700">查看</Button>
            </div>
            <div className="flex items-center justify-between p-2 bg-amber-50 rounded-lg">
              <span className="text-sm text-amber-700">1个草稿未提交</span>
              <Button variant="ghost" size="sm" className="h-6 text-xs text-amber-700">查看</Button>
            </div>
          </div>
        </div>
      </AIAssistantPanel>

      {/* Withdraw Confirmation Dialog */}
      <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认撤回申报</DialogTitle>
            <DialogDescription>
              您确定要撤回项目 &quot;{selectedApplication?.projectName}&quot; 的立项申报吗？撤回后可以重新编辑并提交。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWithdrawDialogOpen(false)}>取消</Button>
            <Button variant="default" onClick={() => setWithdrawDialogOpen(false)}>确认撤回</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
