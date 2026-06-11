"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AIAssistantPanel,
  AIRecommendation,
} from "@/components/ai/ai-assistant-panel"
import { 
  ArrowLeft, 
  User, 
  GraduationCap, 
  Building2, 
  Calendar,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Eye,
  Sparkles,
  AlertTriangle,
  MapPin,
  Plane,
  Shield,
  FileCheck,
  ClipboardCheck,
  ExternalLink,
  Upload
} from "lucide-react"

// 模拟学生派出准备数据
const studentData = {
  id: 1,
  name: "张五",
  studentId: "2022010001",
  gender: "男",
  department: "计算机学院",
  major: "软件工程",
  grade: "2022级",
  phone: "138****5678",
  email: "zhang***@university.edu.cn",
  project: {
    name: "G国H大学2026寒假短期课程项目",
    type: "短期课程项目",
    country: "G国",
    school: "H大学",
    dispatchTime: "2026-07-15 至 2026-08-30",
    duration: "47天",
  },
  submitTime: "2026-03-20 14:30",
  aiScore: 95,
  aiSuggestion: "材料完整，信息一致性高，建议通过审核",
}

// 离校手续完成情况
const departureTasks = [
  {
    id: "approval",
    name: "项目申请审批",
    status: "completed",
    completeTime: "2026-03-10 09:30",
    method: "系统自动",
  },
  {
    id: "advisor",
    name: "辅导员/导师签字确认",
    status: "completed",
    completeTime: "2026-03-12 14:20",
    method: "附件上传",
    fileName: "导师签字确认书.pdf",
  },
  {
    id: "enrollment",
    name: "学籍异动办理",
    status: "completed",
    completeTime: "2026-03-15 10:45",
    method: "外部查询",
    queryResult: "已办理保留学籍",
  },
  {
    id: "finance",
    name: "财务结算确认",
    status: "completed",
    completeTime: "2026-03-16 16:30",
    method: "附件上传",
    fileName: "财务结算单.pdf",
  },
  {
    id: "dormitory",
    name: "宿舍退宿办理",
    status: "completed",
    completeTime: "2026-03-17 11:00",
    method: "外部查询",
    queryResult: "已办理退宿",
  },
  {
    id: "library",
    name: "图书馆结清",
    status: "completed",
    completeTime: "2026-03-17 15:20",
    method: "外部查询",
    queryResult: "无欠费记录",
  },
]

// 派出材料
const dispatchMaterials = [
  {
    id: "enrollment_cert",
    name: "保留学籍证明",
    required: true,
    status: "uploaded",
    fileName: "保留学籍证明_张五_2026.pdf",
    uploadTime: "2026-03-15 14:30",
    aiVerified: true,
    aiResult: "文件清晰，信息与学生档案一致",
  },
  {
    id: "admission",
    name: "境外录取通知书",
    required: true,
    status: "uploaded",
    fileName: "Admission_Letter_H_University.pdf",
    uploadTime: "2026-03-16 09:20",
    aiVerified: true,
    aiResult: "录取信息与申请项目匹配",
  },
  {
    id: "visa",
    name: "签证材料",
    required: true,
    status: "uploaded",
    fileName: "Visa_G_Country_2026.pdf",
    uploadTime: "2026-03-18 11:45",
    aiVerified: true,
    aiResult: "签证有效期覆盖派出时间",
  },
  {
    id: "insurance",
    name: "境外保险证明",
    required: true,
    status: "uploaded",
    fileName: "Insurance_Certificate_2026.pdf",
    uploadTime: "2026-03-19 09:10",
    aiVerified: true,
    aiResult: "保险期限及保额符合要求",
  },
  {
    id: "emergency",
    name: "紧急联系人确认书",
    required: true,
    status: "uploaded",
    fileName: "紧急联系人确认书_张五.pdf",
    uploadTime: "2026-03-14 16:45",
    aiVerified: true,
    aiResult: "联系人信息完整",
  },
]

// 行程信息
const itineraryItems = [
  {
    id: "1",
    date: "2026-07-15",
    country: "中国",
    city: "北京",
    transport: "飞机",
    flightNo: "CA981",
    departureTime: "08:30",
    arrivalTime: "14:45",
    details: "首都机场T3航站楼出发，前往G国X市",
  },
  {
    id: "2",
    date: "2026-07-15",
    country: "G国",
    city: "X市",
    transport: "大巴",
    flightNo: "-",
    departureTime: "16:00",
    arrivalTime: "17:30",
    details: "机场大巴前往H大学",
  },
  {
    id: "3",
    date: "2026-08-30",
    country: "G国",
    city: "X市",
    transport: "飞机",
    flightNo: "CA982",
    departureTime: "10:00",
    arrivalTime: "06:30+1",
    details: "返程航班，X市机场出发",
  },
]

export default function DispatchReviewDetailPage() {
  const router = useRouter()
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [reviewOpinion, setReviewOpinion] = useState("")
  const [previewFile, setPreviewFile] = useState<string | null>(null)

  const handleApprove = () => {
    // 处理通过逻辑
    setShowApproveDialog(false)
    router.push("/admin/dispatch-review")
  }

  const handleReject = () => {
    // 处理退回逻辑
    setShowRejectDialog(false)
    router.push("/admin/dispatch-review")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />
      default:
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {/* 顶部返回和操作 */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push("/admin/dispatch-review")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            返回列表
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
              待审核
            </Badge>
            <span className="text-sm text-muted-foreground">
              提交时间：{studentData.submitTime}
            </span>
          </div>
        </div>

        {/* 学生基本信息 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">学生信息</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">AI评分：</span>
                <span className={`text-lg font-bold ${
                  studentData.aiScore >= 90 ? "text-green-600" : 
                  studentData.aiScore >= 80 ? "text-primary" : "text-amber-600"
                }`}>
                  {studentData.aiScore}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">姓名</p>
                <p className="font-medium">{studentData.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">学号</p>
                <p className="font-medium">{studentData.studentId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">性别</p>
                <p className="font-medium">{studentData.gender}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">年级</p>
                <p className="font-medium">{studentData.grade}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">院系</p>
                <p className="font-medium">{studentData.department}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">专业</p>
                <p className="font-medium">{studentData.major}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">联系电话</p>
                <p className="font-medium">{studentData.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">邮箱</p>
                <p className="font-medium">{studentData.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 项目信息 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">项目信息</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-1">
                <p className="text-xs text-muted-foreground">项目名称</p>
                <p className="font-medium text-primary">{studentData.project.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">项目类型</p>
                <p className="font-medium">{studentData.project.type}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">目的地国家</p>
                <p className="font-medium">{studentData.project.country}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">目标院校</p>
                <p className="font-medium">{studentData.project.school}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">派出时长</p>
                <p className="font-medium">{studentData.project.duration}</p>
              </div>
              <div className="col-span-3 space-y-1">
                <p className="text-xs text-muted-foreground">派出时间</p>
                <p className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {studentData.project.dispatchTime}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 离校手续完成情况 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">离校手续完成情况</CardTitle>
              </div>
              <Badge className="bg-green-100 text-green-700">6/6 已完成</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">状态</TableHead>
                  <TableHead>事项名称</TableHead>
                  <TableHead>完成方式</TableHead>
                  <TableHead>完成时间</TableHead>
                  <TableHead>详情/附件</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departureTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{getStatusIcon(task.status)}</TableCell>
                    <TableCell className="font-medium">{task.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {task.method}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {task.completeTime}
                    </TableCell>
                    <TableCell>
                      {task.fileName ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-primary truncate max-w-[150px]">
                            {task.fileName}
                          </span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ) : task.queryResult ? (
                        <span className="text-sm text-green-600">{task.queryResult}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 派出材料 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">派出材料</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-700">5/5 已上传</Badge>
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI已验证
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>材料名称</TableHead>
                  <TableHead>是否必需</TableHead>
                  <TableHead>文件名</TableHead>
                  <TableHead>上传时间</TableHead>
                  <TableHead>AI验证结果</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dispatchMaterials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell className="font-medium">{material.name}</TableCell>
                    <TableCell>
                      {material.required ? (
                        <Badge variant="destructive" className="text-xs">必需</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">选填</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-primary">{material.fileName}</span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {material.uploadTime}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {material.aiVerified ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-amber-500" />
                        )}
                        <span className="text-xs text-muted-foreground max-w-[150px] truncate" title={material.aiResult}>
                          {material.aiResult}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 行程信息 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">行程信息</CardTitle>
              <Badge variant="outline" className="text-xs">已填写 {itineraryItems.length} 条</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[100px]">日期</TableHead>
                  <TableHead className="w-[90px]">国家(地区)</TableHead>
                  <TableHead className="w-[80px]">城市</TableHead>
                  <TableHead className="w-[80px]">交通工具</TableHead>
                  <TableHead className="w-[90px]">航班/班次</TableHead>
                  <TableHead className="w-[120px]">出发-到达时间</TableHead>
                  <TableHead>详细内容</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itineraryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.date}</TableCell>
                    <TableCell>{item.country}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Plane className="h-3.5 w-3.5 text-muted-foreground" />
                        {item.transport}
                      </div>
                    </TableCell>
                    <TableCell>{item.flightNo}</TableCell>
                    <TableCell>{item.departureTime} - {item.arrivalTime}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={item.details}>
                      {item.details}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 补充说明 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">补充说明及附件</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">补充说明：</p>
              <p className="text-sm bg-muted/50 p-3 rounded-lg">
                本次交流项目已与导师充分沟通，课题研究将通过线上方式继续推进。感谢学校提供的宝贵交流机会。
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">补充附件：</p>
              <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg w-fit">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm">导师同意函.pdf</span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Eye className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 审核操作 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">审核操作</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-700">AI审核建议</p>
                  <p className="text-sm text-green-600 mt-1">{studentData.aiSuggestion}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">审核意见</p>
              <Textarea 
                placeholder="请填写审核意见（可选）..."
                rows={3}
                value={reviewOpinion}
                onChange={(e) => setReviewOpinion(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => router.push("/admin/dispatch-review")}>
                返回
              </Button>
              <Button variant="destructive" onClick={() => setShowRejectDialog(true)}>
                <XCircle className="h-4 w-4 mr-1" />
                退回修改
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowApproveDialog(true)}>
                <CheckCircle2 className="h-4 w-4 mr-1" />
                审核通过
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI智能助手" subtitle="材料审核分析">
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI分析报告
          </h4>
          <div className="space-y-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">离校手续完整</span>
              </div>
              <p className="text-xs text-green-600 mt-1 ml-6">6项手续全部完成</p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">派出材料齐全</span>
              </div>
              <p className="text-xs text-green-600 mt-1 ml-6">5项必需材料已验证</p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">签证有效期正常</span>
              </div>
              <p className="text-xs text-green-600 mt-1 ml-6">覆盖全部派出时间</p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">行程信息完整</span>
              </div>
              <p className="text-xs text-green-600 mt-1 ml-6">包含往返行程安排</p>
            </div>
          </div>
        </div>

        <AIRecommendation
          title="综合评估"
          stats={[
            { label: "材料完整度", value: "100%" },
            { label: "信息一致性", value: "98%" },
            { label: "风险等级", value: "低" },
          ]}
        />
      </AIAssistantPanel>

      {/* 通过确认弹窗 */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              确认审核通过
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              确认通过学生 <span className="font-medium text-foreground">{studentData.name}</span> 的派出准备审核？
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              通过后，学生将可以按计划进行派出。
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>取消</Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleApprove}>
              确认通过
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 退回确认弹窗 */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              退回修改
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              确认退回学生 <span className="font-medium text-foreground">{studentData.name}</span> 的派出准备申请？
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium">退回原因 <span className="text-destructive">*</span></p>
              <Textarea 
                placeholder="请填写退回原因，以便学生了解需要修改的内容..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>取消</Button>
            <Button variant="destructive" onClick={handleReject}>
              确认退回
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
