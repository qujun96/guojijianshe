"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  PieChart,
  BarChart3,
  TrendingUp,
  Download,
  FileSpreadsheet,
  Users,
  Globe,
  GraduationCap,
  Award,
  Clock,
  CheckCircle2,
  Sparkles,
  Filter,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Calendar,
  MapPin,
} from "lucide-react"


// 项目申报量数据（按类型）
const projectTypeStats = [
  { name: "交换生项目", count: 156, approved: 132, rate: 85 },
  { name: "短期课程项目", count: 89, approved: 82, rate: 92 },
  { name: "国际竞赛", count: 45, approved: 35, rate: 78 },
  { name: "海外实习", count: 32, approved: 28, rate: 88 },
]

// 学科分布数据
const disciplineData = [
  { name: "工学", count: 128, percentage: 35, color: "bg-blue-500" },
  { name: "理学", count: 85, percentage: 23, color: "bg-green-500" },
  { name: "经济学", count: 62, percentage: 17, color: "bg-amber-500" },
  { name: "管理学", count: 48, percentage: 13, color: "bg-purple-500" },
  { name: "文学", count: 25, percentage: 7, color: "bg-pink-500" },
  { name: "其他", count: 18, percentage: 5, color: "bg-gray-500" },
]

// 国家/地区分布 TOP 6
const regionData = [
  { name: "A国", count: 89, percentage: 24 },
  { name: "G国", count: 76, percentage: 21 },
  { name: "K国", count: 45, percentage: 12 },
  { name: "C国", count: 38, percentage: 10 },
  { name: "A国", count: 35, percentage: 10 },
  { name: "R国", count: 28, percentage: 8 },
]

// 停留时长分布
const durationData = [
  { name: "1个月以内", count: 45, percentage: 12 },
  { name: "1-3个月", count: 98, percentage: 27 },
  { name: "3-6个月", count: 125, percentage: 34 },
  { name: "6个月-1年", count: 68, percentage: 19 },
  { name: "1年以上", count: 30, percentage: 8 },
]

// 月度趋势数据
const monthlyTrend = [
  { month: "1月", apply: 45, approved: 38, dispatched: 32 },
  { month: "2月", apply: 52, approved: 45, dispatched: 38 },
  { month: "3月", apply: 78, approved: 65, dispatched: 55 },
  { month: "4月", apply: 92, approved: 78, dispatched: 65 },
  { month: "5月", apply: 85, approved: 72, dispatched: 60 },
  { month: "6月", apply: 110, approved: 95, dispatched: 82 },
]

// 学分认定数据（按学院）
const creditByCollege = [
  { college: "计算机学院", submitted: 45, approved: 42, rate: 93, avgCredits: 18.5 },
  { college: "新闻传播学院", submitted: 38, approved: 35, rate: 92, avgCredits: 16.2 },
  { college: "管理学院", submitted: 32, approved: 29, rate: 91, avgCredits: 15.8 },
  { college: "法学院", submitted: 28, approved: 25, rate: 89, avgCredits: 14.5 },
  { college: "经济学院", submitted: 25, approved: 23, rate: 92, avgCredits: 17.0 },
]

// 年度对比数据
const yearComparison = {
  currentYear: { total: 366, approved: 312, dispatched: 285, creditDone: 260 },
  lastYear: { total: 298, approved: 248, dispatched: 228, creditDone: 205 },
}

export default function AnalyticsDashboardPage() {
  const [timeRange, setTimeRange] = useState("year")
  const [projectType, setProjectType] = useState("")
  const [college, setCollege] = useState("")

  const calcGrowth = (current: number, last: number) => {
    return ((current - last) / last * 100).toFixed(1)
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <PieChart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">多维度数据统计分析</h1>
              <p className="text-sm text-muted-foreground">基于学生出国（境）主题数据库的可视化报表</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              导出Excel
            </Button>
            <Button size="sm" className="gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              生成PDF报告
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">数据范围：</span>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-28 h-9">
                  <SelectValue placeholder="时间" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quarter">本季度</SelectItem>
                  <SelectItem value="year">本年度</SelectItem>
                  <SelectItem value="all">历史全部</SelectItem>
                </SelectContent>
              </Select>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger className="w-36 h-9">
                  <SelectValue placeholder="项目类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="exchange">交换生项目</SelectItem>
                  <SelectItem value="short">短期课程</SelectItem>
                  <SelectItem value="competition">国际竞赛</SelectItem>
                </SelectContent>
              </Select>
              <Select value={college} onValueChange={setCollege}>
                <SelectTrigger className="w-36 h-9">
                  <SelectValue placeholder="学院" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部学院</SelectItem>
                  <SelectItem value="cs">计算机学院</SelectItem>
                  <SelectItem value="news">新闻传播学院</SelectItem>
                  <SelectItem value="mgmt">管理学院</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="gap-2 ml-auto">
                <RefreshCw className="h-4 w-4" />
                刷新数据
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics - 年度数据汇总 */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">累计派出人数</p>
                <Users className="h-5 w-5 text-primary/50" />
              </div>
              <p className="text-3xl font-bold">{yearComparison.currentYear.dispatched}</p>
              <div className="flex items-center gap-1 text-xs mt-2">
                <ArrowUp className="h-3 w-3 text-green-500" />
                <span className="text-green-600">同比增长 {calcGrowth(yearComparison.currentYear.dispatched, yearComparison.lastYear.dispatched)}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">审批通过率</p>
                <CheckCircle2 className="h-5 w-5 text-green-500/50" />
              </div>
              <p className="text-3xl font-bold">85.2<span className="text-lg">%</span></p>
              <div className="flex items-center gap-1 text-xs mt-2">
                <ArrowUp className="h-3 w-3 text-green-500" />
                <span className="text-green-600">较上年 +2.1%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">平均停留时长</p>
                <Clock className="h-5 w-5 text-amber-500/50" />
              </div>
              <p className="text-3xl font-bold">4.2<span className="text-lg">月</span></p>
              <div className="flex items-center gap-1 text-xs mt-2">
                <span className="text-muted-foreground">长期项目占比 42%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">学分认定完成率</p>
                <GraduationCap className="h-5 w-5 text-purple-500/50" />
              </div>
              <p className="text-3xl font-bold">91.5<span className="text-lg">%</span></p>
              <div className="flex items-center gap-1 text-xs mt-2">
                <ArrowUp className="h-3 w-3 text-green-500" />
                <span className="text-green-600">较上月 +1.5%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          {/* Project Type Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                项目类型申报统计
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectTypeStats.map((stat) => (
                  <div key={stat.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{stat.name}</span>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <span>申请 {stat.count}</span>
                        <span>通过 {stat.approved}</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                          {stat.rate}%
                        </Badge>
                      </div>
                    </div>
                    <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="absolute left-0 top-0 h-full bg-primary/30 rounded-full"
                        style={{ width: `${(stat.count / 160) * 100}%` }}
                      />
                      <div 
                        className="absolute left-0 top-0 h-full bg-primary rounded-full"
                        style={{ width: `${(stat.approved / 160) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Discipline Distribution */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                学科分布统计
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6">
                {/* Donut Chart */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {disciplineData.reduce((acc, item, index) => {
                      const colors = ["#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#ec4899", "#6b7280"]
                      const prevPercentage = acc.prevPercentage
                      const dashArray = `${item.percentage} ${100 - item.percentage}`
                      const dashOffset = -prevPercentage
                      acc.elements.push(
                        <circle
                          key={item.name}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={colors[index]}
                          strokeWidth="20"
                          strokeDasharray={dashArray}
                          strokeDashoffset={dashOffset}
                        />
                      )
                      acc.prevPercentage = prevPercentage + item.percentage
                      return acc
                    }, { elements: [] as JSX.Element[], prevPercentage: 0 }).elements}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xl font-bold">{disciplineData.reduce((sum, d) => sum + d.count, 0)}</p>
                      <p className="text-xs text-muted-foreground">总人数</p>
                    </div>
                  </div>
                </div>
                {/* Legend */}
                <div className="flex-1 grid grid-cols-2 gap-2 content-center">
                  {disciplineData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          {/* Region Distribution */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                派出国家/地区 TOP6
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {regionData.map((region, index) => (
                  <div key={region.name} className="flex items-center gap-3">
                    <span className="w-5 text-center text-sm font-medium text-muted-foreground">{index + 1}</span>
                    <span className="font-medium w-20">{region.name}</span>
                    <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                        style={{ width: `${region.percentage * 3}%` }}
                      />
                    </div>
                    <span className="text-sm w-16 text-right">{region.count}人 ({region.percentage}%)</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Duration Distribution */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                境外停留时长分布
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {durationData.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <span className="text-sm w-24">{item.name}</span>
                    <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                        style={{ width: `${item.percentage * 2.5}%` }}
                      />
                    </div>
                    <span className="text-sm w-20 text-right">{item.count}人 ({item.percentage}%)</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Credit Recognition by College */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              各学院学分认定情况
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>学院</TableHead>
                  <TableHead className="text-center">提交申请</TableHead>
                  <TableHead className="text-center">已认定</TableHead>
                  <TableHead className="text-center">认定率</TableHead>
                  <TableHead className="text-center">平均学分</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creditByCollege.map((item) => (
                  <TableRow key={item.college}>
                    <TableCell className="font-medium">{item.college}</TableCell>
                    <TableCell className="text-center">{item.submitted}</TableCell>
                    <TableCell className="text-center text-green-600">{item.approved}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                        {item.rate}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{item.avgCredits}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              月度趋势分析
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>申请人数</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span>通过人数</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500" />
                  <span>派出人数</span>
                </div>
              </div>
              <div className="flex items-end gap-4 h-40 pt-4">
                {monthlyTrend.map((data) => (
                  <div key={data.month} className="flex-1 flex items-end gap-1">
                    <div className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-muted-foreground">{data.apply}</span>
                      <div 
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${(data.apply / 120) * 120}px` }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-muted-foreground">{data.approved}</span>
                      <div 
                        className="w-full bg-green-500 rounded-t"
                        style={{ height: `${(data.approved / 120) * 120}px` }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-muted-foreground">{data.dispatched}</span>
                      <div 
                        className="w-full bg-purple-500 rounded-t"
                        style={{ height: `${(data.dispatched / 120) * 120}px` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 border-t pt-2">
                {monthlyTrend.map((data) => (
                  <div key={data.month} className="flex-1 text-center text-sm text-muted-foreground">
                    {data.month}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      
    </div>
  )
}
