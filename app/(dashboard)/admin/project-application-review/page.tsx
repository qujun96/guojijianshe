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
import { AIAssistantPanel } from "@/components/ai/ai-assistant-panel"
import { 
  Search, 
  RotateCcw, 
  Calendar, 
  ClipboardCheck,
  BarChart3,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  FileSearch,
  Target,
  Zap
} from "lucide-react"

// 模拟数据
const applications = [
  {
    id: "PA202403001",
    projectName: "剑桥大学工程学暑期交流项目",
    applyUnit: "电气工程学院",
    applicant: "张伟教授",
    applyTime: "2024-03-15",
    budget: 150000,
    reviewStatus: "待审核",
  },
  {
    id: "PA202403002",
    projectName: "牛津大学人工智能研修班",
    applyUnit: "信息工程学院",
    applicant: "陈明教授",
    applyTime: "2024-03-14",
    budget: 180000,
    reviewStatus: "待审核",
  },
  {
    id: "PA202403003",
    projectName: "哈佛大学经济管理项目",
    applyUnit: "管理学院",
    applicant: "刘芳副教授",
    applyTime: "2024-03-13",
    budget: 200000,
    reviewStatus: "待审核",
  },
  {
    id: "PA202403004",
    projectName: "慕尼黑工业大学交换项目",
    applyUnit: "机械工程学院",
    applicant: "王磊教授",
    applyTime: "2024-03-12",
    budget: 160000,
    reviewStatus: "待审核",
  },
  {
    id: "PA202403005",
    projectName: "东京工业大学联合培养",
    applyUnit: "土木工程学院",
    applicant: "李强教授",
    applyTime: "2024-03-11",
    budget: 220000,
    reviewStatus: "待审核",
  },
  {
    id: "PA202403006",
    projectName: "麻省理工联合培养计划",
    applyUnit: "机械工程学院",
    applicant: "王芳副教授",
    applyTime: "2024-03-10",
    budget: 200000,
    reviewStatus: "已通过",
  },
  {
    id: "PA202403007",
    projectName: "斯坦福大学创新创业项目",
    applyUnit: "经济学院",
    applicant: "赵强教授",
    applyTime: "2024-03-09",
    budget: 180000,
    reviewStatus: "已通过",
  },
  {
    id: "PA202403008",
    projectName: "新加坡国立大学交流项目",
    applyUnit: "计算机学院",
    applicant: "周明副教授",
    applyTime: "2024-03-08",
    budget: 150000,
    reviewStatus: "已通过",
  },
  {
    id: "PA202403009",
    projectName: "墨尔本大学研修班",
    applyUnit: "外国语学院",
    applicant: "孙丽教授",
    applyTime: "2024-03-07",
    budget: 140000,
    reviewStatus: "已通过",
  },
  {
    id: "PA202403010",
    projectName: "早稻田大学短期项目",
    applyUnit: "法学院",
    applicant: "钱伟教授",
    applyTime: "2024-03-06",
    budget: 120000,
    reviewStatus: "已驳回",
  },
  {
    id: "PA202403011",
    projectName: "柏林工业大学实习项目",
    applyUnit: "建筑学院",
    applicant: "吴敏副教授",
    applyTime: "2024-03-05",
    budget: 160000,
    reviewStatus: "已驳回",
  },
  {
    id: "PA202403012",
    projectName: "多伦多大学联合培养项目",
    applyUnit: "医学院",
    applicant: "郑华教授",
    applyTime: "2024-03-04",
    budget: 250000,
    reviewStatus: "已驳回",
  },
]

const statusConfig: Record<string, { color: string; bgColor: string; dotColor: string }> = {
  "待审核": { color: "text-amber-600", bgColor: "bg-amber-100", dotColor: "bg-amber-500" },
  "已通过": { color: "text-green-600", bgColor: "bg-green-100", dotColor: "bg-green-500" },
  "已驳回": { color: "text-red-600", bgColor: "bg-red-100", dotColor: "bg-red-500" },
}

const units = [
  "全部单位",
  "电气工程学院",
  "信息工程学院",
  "管理学院",
  "机械工程学院",
  "土木工程学院",
  "经济学院",
  "计算机学院",
  "外国语学院",
  "法学院",
  "建筑学院",
  "医学院",
]

export default function ProjectApplicationReviewPage() {
  const router = useRouter()
  const [filter, setFilter] = useState("all")
  const [searchName, setSearchName] = useState("")
  const [searchUnit, setSearchUnit] = useState("全部单位")
  const [searchStatus, setSearchStatus] = useState("全部状态")

  const getFilteredApplications = () => {
    let filtered = applications

    // 按状态Tab筛选
    if (filter !== "all") {
      const statusMap: Record<string, string> = {
        "pending": "待审核",
        "approved": "已通过",
        "rejected": "已驳回",
      }
      filtered = filtered.filter(app => app.reviewStatus === statusMap[filter])
    }

    // 按搜索条件筛选
    if (searchName) {
      filtered = filtered.filter(app => 
        app.projectName.toLowerCase().includes(searchName.toLowerCase())
      )
    }
    if (searchUnit && searchUnit !== "全部单位") {
      filtered = filtered.filter(app => app.applyUnit === searchUnit)
    }
    if (searchStatus && searchStatus !== "全部状态") {
      filtered = filtered.filter(app => app.reviewStatus === searchStatus)
    }

    return filtered
  }

  const filteredApplications = getFilteredApplications()

  const handleReset = () => {
    setSearchName("")
    setSearchUnit("全部单位")
    setSearchStatus("全部状态")
  }

  const getStatusCounts = () => {
    return {
      all: applications.length,
      pending: applications.filter(a => a.reviewStatus === "待审核").length,
      approved: applications.filter(a => a.reviewStatus === "已通过").length,
      rejected: applications.filter(a => a.reviewStatus === "已驳回").length,
    }
  }

  const counts = getStatusCounts()

  const renderOperations = (app: typeof applications[0]) => {
    if (app.reviewStatus === "待审核") {
      return (
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            className="h-7 px-3"
            onClick={() => router.push(`/admin/project-application-review/${app.id}`)}
          >
            审核
          </Button>
          <Button 
            variant="link" 
            size="sm" 
            className="h-auto p-0"
            onClick={() => router.push(`/admin/project-application-review/${app.id}?mode=view`)}
          >
            查看
          </Button>
        </div>
      )
    }
    
    return (
      <div className="flex items-center gap-2">
        <Button 
          variant="link" 
          size="sm" 
          className="h-auto p-0"
          onClick={() => router.push(`/admin/project-application-review/${app.id}?mode=view`)}
        >
          查看
        </Button>
        <span className="text-muted-foreground">|</span>
        <Button 
          variant="link" 
          size="sm" 
          className="h-auto p-0"
          onClick={() => router.push(`/admin/project-application-review/${app.id}?mode=view`)}
        >
          详情
        </Button>
      </div>
    )
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {/* 页面标题和面包屑 */}
        <div>
          <h1 className="text-xl font-semibold">立项申报审核</h1>
          <p className="text-sm text-muted-foreground mt-1">首页 / 审核管理 / 待审核</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b pb-2">
          <button 
            className={`px-4 py-2 text-sm font-medium relative ${filter === "all" ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setFilter("all")}
          >
            全部 ({counts.all})
            {filter === "all" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium relative ${filter === "pending" ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setFilter("pending")}
          >
            待审核 ({counts.pending})
            {filter === "pending" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium relative ${filter === "approved" ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setFilter("approved")}
          >
            已通过 ({counts.approved})
            {filter === "approved" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium relative ${filter === "rejected" ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setFilter("rejected")}
          >
            已驳回 ({counts.rejected})
            {filter === "rejected" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
          </button>
        </div>

        <Card>
          <CardContent className="pt-6">
            {/* Search Filters */}
            <div className="grid grid-cols-5 gap-3">
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">项目名称</label>
                <Input 
                  placeholder="请输入项目名称" 
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">申报单位</label>
                <Select value={searchUnit} onValueChange={setSearchUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="全部单位" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map(unit => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">审核状态</label>
                <Select value={searchStatus} onValueChange={setSearchStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="全部状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="全部状态">全部状态</SelectItem>
                    <SelectItem value="待审核">待审核</SelectItem>
                    <SelectItem value="已通过">已通过</SelectItem>
                    <SelectItem value="已驳回">已驳回</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">申报时间</label>
                <div className="flex items-center gap-2">
                  <Input type="date" />
                  <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
              </div>
              <div className="flex items-end gap-2">
                <Button className="gap-2">
                  <Search className="h-4 w-4" />
                  查询
                </Button>
                <Button variant="outline" className="gap-2" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4" />
                  重置
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>项目名称</TableHead>
                  <TableHead>申报单位</TableHead>
                  <TableHead>申报人</TableHead>
                  <TableHead>申报时间</TableHead>
                  <TableHead>预算金额</TableHead>
                  <TableHead>审核状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium max-w-[250px]">
                      <button 
                        className="text-primary hover:underline text-left truncate block w-full"
                        onClick={() => router.push(`/admin/project-application-review/${app.id}?mode=view`)}
                      >
                        {app.projectName}
                      </button>
                    </TableCell>
                    <TableCell className="text-sm">{app.applyUnit}</TableCell>
                    <TableCell className="text-sm">{app.applicant}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{app.applyTime}</TableCell>
                    <TableCell className="text-sm font-medium">
                      ¥{app.budget.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 ${statusConfig[app.reviewStatus]?.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[app.reviewStatus]?.dotColor}`} />
                        {app.reviewStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      {renderOperations(app)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>共 {filteredApplications.length} 条记录，每页 <Select defaultValue="10">
                <SelectTrigger className="w-16 h-7 inline-flex">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select> 条</span>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0">
                  &lt;&lt;
                </Button>
                <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0">
                  &lt;
                </Button>
                <Button variant="default" size="sm" className="h-8 w-8 p-0">
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  &gt;
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  &gt;&gt;
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI智能助手" subtitle="实时评估与筛选建议">
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            审核状态概览
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
          </div>
        </div>

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
                预算合规核对
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
          
          <div className="p-3 border border-border rounded-lg space-y-2">
            <h5 className="text-sm font-medium">剑桥大学工程学暑期交流项目</h5>
            <p className="text-xs text-muted-foreground">预算合理，材料完整，建议通过</p>
          </div>

          <div className="p-3 border border-amber-200 bg-amber-50 rounded-lg space-y-2">
            <h5 className="text-sm font-medium text-amber-700">牛津大学人工智能研修班</h5>
            <p className="text-xs text-amber-600">单位配套经费占比偏低，建议核实</p>
          </div>
        </div>
      </AIAssistantPanel>
    </div>
  )
}
