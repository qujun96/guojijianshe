"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Search, 
  RotateCcw, 
  Calendar, 
  Eye, 
  Download,
  FileText,
  Sparkles,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  BarChart3,
} from "lucide-react"

const reports = [
  {
    id: "1",
    studentName: "王家瑶",
    studentId: "2021001001",
    college: "美视电影学院",
    project: "（亚洲地区）2026年秋季学期第三批交换生项目",
    school: "A国D大学",
    month: "2026年3月",
    submitTime: "2026-03-28 14:30",
    status: "已提交",
    wordCount: 2350,
    hasImages: true,
    aiScore: 88,
  },
  {
    id: "2",
    studentName: "李明远",
    studentId: "2021002015",
    college: "计算机学院",
    project: "2026年《A国B国人才培养计划》1+2+1双学位项目",
    school: "A国某大学",
    month: "2026年3月",
    submitTime: "2026-03-25 09:15",
    status: "已提交",
    wordCount: 1890,
    hasImages: false,
    aiScore: 75,
  },
  {
    id: "3",
    studentName: "张晓梅",
    studentId: "2021003022",
    college: "外国语学院",
    project: "（欧洲地区）2026年春季学期交换生项目",
    school: "F国某大学",
    month: "2026年3月",
    submitTime: "2026-03-30 16:45",
    status: "已提交",
    wordCount: 2680,
    hasImages: true,
    aiScore: 92,
  },
  {
    id: "4",
    studentName: "陈浩然",
    studentId: "2021004008",
    college: "经济管理学院",
    project: "2026年G国H大学暑期课程项目",
    school: "G国H大学",
    month: "2026年2月",
    submitTime: "2026-02-28 11:20",
    status: "已提交",
    wordCount: 1560,
    hasImages: true,
    aiScore: 82,
  },
  {
    id: "5",
    studentName: "刘思雨",
    studentId: "2021005019",
    college: "艺术学院",
    project: "（亚洲地区）2026年秋季学期第三批交换生项目",
    school: "C国艺术大学",
    month: "2026年3月",
    submitTime: "",
    status: "未提交",
    wordCount: 0,
    hasImages: false,
    aiScore: 0,
  },
]

const sampleReportContent = `
# 2026年3月学习总结报告

## 一、学习情况

本月我在A国D大学继续深入学习传媒相关课程。主要修读了《跨文化传播学》和《数字媒体制作》两门核心课程。

在《跨文化传播学》课程中，我们深入探讨了不同文化背景下的信息传播方式和规律。通过与来自世界各地的同学进行小组讨论和案例分析，我对东西方媒体报道的差异有了更深刻的理解。

## 二、科研进展

在导师的指导下，我开始参与一项关于社交媒体对青年群体文化认同影响的研究项目。目前已完成文献综述部分，正在设计调查问卷。

## 三、文化体验

本月参加了学校组织的A国传统文化体验活动，学习了传统礼仪和传统茶道。这些活动让我更好地融入当地生活，也为我的跨文化研究提供了一手素材。

## 四、下月计划

1. 完成《跨文化传播学》期中论文
2. 开展问卷调查数据收集
3. 参加学院组织的学术研讨会
`

export default function ReportsViewPage() {
  const [searchName, setSearchName] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("all")
  const [selectedProject, setSelectedProject] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedReport, setSelectedReport] = useState<typeof reports[0] | null>(null)
  const [showDialog, setShowDialog] = useState(false)

  const filteredReports = reports.filter(report => {
    if (searchName && !report.studentName.includes(searchName) && !report.studentId.includes(searchName)) {
      return false
    }
    if (selectedMonth !== "all" && report.month !== selectedMonth) {
      return false
    }
    if (selectedStatus !== "all" && report.status !== selectedStatus) {
      return false
    }
    return true
  })

  const handleViewReport = (report: typeof reports[0]) => {
    setSelectedReport(report)
    setShowDialog(true)
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-6">
        {/* 统计卡片 */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">在外学生总数</p>
                  <p className="text-2xl font-bold text-blue-600">156</p>
                </div>
                <Users className="h-8 w-8 text-blue-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">本月已提交</p>
                  <p className="text-2xl font-bold text-green-600">142</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">待提交</p>
                  <p className="text-2xl font-bold text-amber-600">14</p>
                </div>
                <Clock className="h-8 w-8 text-amber-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">平均AI评分</p>
                  <p className="text-2xl font-bold text-purple-600">84.5</p>
                </div>
                <Sparkles className="h-8 w-8 text-purple-500/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 筛选区域 */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Search className="h-4 w-4" />
              报告查询
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              <Input
                placeholder="学生姓名/学号"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="选择月份" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部月份</SelectItem>
                  <SelectItem value="2026年3月">2026年3月</SelectItem>
                  <SelectItem value="2026年2月">2026年2月</SelectItem>
                  <SelectItem value="2026年1月">2026年1月</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue placeholder="选择项目" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部项目</SelectItem>
                  <SelectItem value="asia">亚洲地区交换生项目</SelectItem>
                  <SelectItem value="europe">欧洲地区交换生项目</SelectItem>
                  <SelectItem value="america">A国B国人才培养计划</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="提交状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="已提交">已提交</SelectItem>
                  <SelectItem value="未提交">未提交</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Search className="h-4 w-4 mr-1" />
                  搜索
                </Button>
                <Button variant="outline" onClick={() => {
                  setSearchName("")
                  setSelectedMonth("all")
                  setSelectedProject("all")
                  setSelectedStatus("all")
                }}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 报告列表 */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" />
                学习报告列表
              </CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                批量导出
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>学生信息</TableHead>
                  <TableHead>所在项目/学校</TableHead>
                  <TableHead>报告月份</TableHead>
                  <TableHead>提交时间</TableHead>
                  <TableHead>字数</TableHead>
                  <TableHead>AI评分</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {report.studentName.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{report.studentName}</p>
                          <p className="text-xs text-muted-foreground">{report.studentId} · {report.college}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        <p className="text-sm truncate">{report.project}</p>
                        <p className="text-xs text-muted-foreground">{report.school}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.month}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {report.submitTime || "-"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {report.wordCount > 0 ? (
                        <span className="text-sm">{report.wordCount}字</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {report.aiScore > 0 ? (
                        <div className="flex items-center gap-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            report.aiScore >= 90 ? 'bg-green-100 text-green-600' :
                            report.aiScore >= 80 ? 'bg-blue-100 text-blue-600' :
                            report.aiScore >= 70 ? 'bg-amber-100 text-amber-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {report.aiScore}
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={report.status === "已提交" ? "default" : "secondary"}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {report.status === "已提交" ? (
                        <div className="flex gap-1">
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="h-auto p-0 text-primary"
                            onClick={() => handleViewReport(report)}
                          >
                            查看
                          </Button>
                          <span className="text-muted-foreground">|</span>
                          <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                            下载
                          </Button>
                        </div>
                      ) : (
                        <Button variant="link" size="sm" className="h-auto p-0 text-amber-600">
                          催交
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* 右侧AI面板 */}
      <div className="w-72 shrink-0 space-y-4">
        <Card className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              AI报告分析助手
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm opacity-90">
            <p>智能分析学生学习报告质量与内容</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              本月报告概况
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">提交率</span>
              <span className="font-semibold text-green-600">91%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '91%' }} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">平均字数</span>
              <span className="font-semibold">2,120字</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">优秀报告</span>
              <span className="font-semibold text-primary">38篇</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500" />
              优秀报告推荐
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-2 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">张晓梅</p>
              <p className="text-xs text-muted-foreground">F国某大学 · 92分</p>
              <p className="text-xs text-primary mt-1">内容丰富，结构清晰，有深度思考</p>
            </div>
            <div className="p-2 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">王家瑶</p>
              <p className="text-xs text-muted-foreground">A国D大学 · 88分</p>
              <p className="text-xs text-primary mt-1">学习计划明确，执行力强</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              AI洞察
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-2 bg-green-50 rounded border border-green-200">
              <p className="text-green-700">本月报告质量整体提升5%，学生学习状态良好</p>
            </div>
            <div className="p-2 bg-amber-50 rounded border border-amber-200">
              <p className="text-amber-700">14名学生尚未提交报告，建议发送催交提醒</p>
            </div>
            <div className="p-2 bg-blue-50 rounded border border-blue-200">
              <p className="text-blue-700">艺术学院学生报告提交率较低，可重点关注</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 报告详情对话框 */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {selectedReport?.studentName.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p>{selectedReport?.studentName}的学习报告</p>
                  <p className="text-sm font-normal text-muted-foreground">
                    {selectedReport?.month} · {selectedReport?.school}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedReport && selectedReport.aiScore > 0 && (
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedReport.aiScore >= 90 ? 'bg-green-100 text-green-600' :
                    selectedReport.aiScore >= 80 ? 'bg-blue-100 text-blue-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    <Sparkles className="h-3 w-3 inline mr-1" />
                    AI评分: {selectedReport.aiScore}
                  </div>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* AI分析摘要 */}
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div className="space-y-2">
                    <p className="font-medium text-purple-700">AI智能分析</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">内容完整度</p>
                        <p className="font-semibold text-purple-600">优秀</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">学习态度</p>
                        <p className="font-semibold text-purple-600">积极</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">规划清晰度</p>
                        <p className="font-semibold text-purple-600">良好</p>
                      </div>
                    </div>
                    <p className="text-sm text-purple-600">
                      该报告内容丰富，学习计划明确，展现了良好的跨文化适应能力。建议可进一步深化学术研究方向的思考。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 报告正文 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  报告正文
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {sampleReportContent}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 操作按钮 */}
            <div className="flex justify-end gap-3">
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                添加评语
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                下载报告
              </Button>
              <Button onClick={() => setShowDialog(false)}>
                关闭
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
