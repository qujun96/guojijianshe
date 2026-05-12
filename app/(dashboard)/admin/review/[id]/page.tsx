"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AIAssistantPanel,
  AIScoreCard,
} from "@/components/ai/ai-assistant-panel"
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  User,
  FileText,
  Languages,
  GraduationCap,
  Award,
  Eye,
  Download,
  ThumbsUp,
  ThumbsDown,
  MessageSquare
} from "lucide-react"
import { Label } from "@/components/ui/label"
import Link from "next/link"

// 所有申请者数据
const applicationsData: Record<string, {
  id: number
  studentName: string
  studentId: string
  department: string
  major: string
  grade: string
  phone: string
  email: string
  projectName: string
  projectType: string
  dispatchTime: string
  targetSchool: string
  aiScore: number
  gpa: number
  ranking: string
  cet4: number | null
  cet6: number | null
  toefl: number | null
  ielts: number | null
  hasOverseasExp: boolean
  overseasExp: string
  awards: string[]
  studyPlan: string
  materials: { name: string; status: string }[]
  aiAnalysis: {
    strengths: string[]
    concerns: string[]
    recommendation: string
    confidence: number
  }
}> = {
  "1": {
    id: 1,
    studentName: "王家琪",
    studentId: "20220101001",
    department: "美视电影学院",
    major: "广播电视编导",
    grade: "大三",
    phone: "13800138000",
    email: "wangjiaqi@example.com",
    projectName: "(亚洲地区) 2026年秋季学期第三批交换生项目",
    projectType: "交换生项目",
    dispatchTime: "2026-08-25 00:00 至 2026-12-24 23:59",
    targetSchool: "C国Y大学",
    aiScore: 86,
    gpa: 3.85,
    ranking: "5/120",
    cet4: 560,
    cet6: 520,
    toefl: null,
    ielts: 6.5,
    hasOverseasExp: true,
    overseasExp: "2024年暑假参加C国T大学短期交流项目，为期4周",
    awards: [
      "2023年校级优秀学生一等奖学金",
      "2024年全国大学生英语竞赛二等奖",
      "2023年省级创新创业大赛银奖"
    ],
    studyPlan: "本次交换学习，我计划深入学习C国传媒行业的发展现状，选修媒体研究、跨文化传播等课程。同时，我将积极参与校内社团活动，增进与C国同学的交流，提升跨文化沟通能力。预期通过本次交换，拓宽国际视野，为未来从事国际传媒工作奠定基础。",
    materials: [
      { name: "成绩单.pdf", status: "verified" },
      { name: "语言成绩证明.pdf", status: "verified" },
      { name: "获奖证书汇总.pdf", status: "verified" },
      { name: "个人陈述.pdf", status: "pending" },
    ],
    aiAnalysis: {
      strengths: [
        "GPA成绩优秀，排名前5%",
        "语言能力达标，雅思6.5分",
        "有海外交流经历",
        "获奖经历丰富"
      ],
      concerns: [
        "个人陈述材料需人工审核",
      ],
      recommendation: "推荐通过",
      confidence: 92,
    }
  },
  "2": {
    id: 2,
    studentName: "王小明",
    studentId: "20220101002",
    department: "美视电影学院",
    major: "影视摄影与制作",
    grade: "大三",
    phone: "13800138001",
    email: "dongjingquan@example.com",
    projectName: "(亚洲地区) 2026年秋季学期第三批交换生项目",
    projectType: "国际竞赛",
    dispatchTime: "2026-08-25 00:00 至 2026-12-24 23:59",
    targetSchool: "A国中央大学",
    aiScore: 75,
    gpa: 3.45,
    ranking: "28/120",
    cet4: 410,
    cet6: null,
    toefl: null,
    ielts: null,
    hasOverseasExp: false,
    overseasExp: "",
    awards: [
      "2024年校级优秀学生三等奖学金",
      "2023年院级摄影大赛一等奖"
    ],
    studyPlan: "希望通过本次国际竞赛项目，学习A国影视制作的先进理念和技术，参与国际影视创作交流，提升专业实践能力。",
    materials: [
      { name: "成绩单.pdf", status: "verified" },
      { name: "语言成绩证明.pdf", status: "pending" },
      { name: "获奖证书汇总.pdf", status: "verified" },
      { name: "个人陈述.pdf", status: "verified" },
    ],
    aiAnalysis: {
      strengths: [
        "专业成绩良好",
        "有院级获奖经历",
        "研修计划清晰"
      ],
      concerns: [
        "近三年无出国（境）经历",
        "CET-4成绩410分，未达到425分及格线",
        "未提供CET-6或其他语言成绩证明"
      ],
      recommendation: "建议人工复核",
      confidence: 68,
    }
  },
  "3": {
    id: 3,
    studentName: "F市",
    studentId: "20220101003",
    department: "美视电影学院",
    major: "戏剧影视文学",
    grade: "大三",
    phone: "13800138002",
    email: "bulisituo@example.com",
    projectName: "(亚洲地区) 2026年秋季学期第三批交换生项目",
    projectType: "交换生项目",
    dispatchTime: "2026-08-25 00:00 至 2026-12-24 23:59",
    targetSchool: "C国T大学",
    aiScore: 86,
    gpa: 2.95,
    ranking: "65/120",
    cet4: 580,
    cet6: 545,
    toefl: null,
    ielts: 7.0,
    hasOverseasExp: true,
    overseasExp: "2023年暑假参加G国艺术大学短期交流项目",
    awards: [
      "2023年全国大学生剧本创作大赛三等奖",
      "2024年校级文学创作比赛一等奖"
    ],
    studyPlan: "计划在C国T大学学习C国戏剧文化和剧本创作技法，深入了解C国传统能剧与现代戏剧的融合发展。",
    materials: [
      { name: "成绩单.pdf", status: "verified" },
      { name: "语言成绩证明.pdf", status: "verified" },
      { name: "获奖证书汇总.pdf", status: "verified" },
      { name: "个人陈述.pdf", status: "verified" },
    ],
    aiAnalysis: {
      strengths: [
        "语言能力优秀，雅思7.0",
        "有海外交流经历",
        "有国家级获奖经历"
      ],
      concerns: [
        "GPA为2.95，未达到项目要求的3.0标准"
      ],
      recommendation: "建议人工复核",
      confidence: 72,
    }
  },
  "4": {
    id: 4,
    studentName: "陈明明",
    studentId: "20220101004",
    department: "美视电影学院",
    major: "动画",
    grade: "大二",
    phone: "13800138003",
    email: "chenmingming@example.com",
    projectName: "(亚洲地区) 2026年秋季学期第三批交换生项目",
    projectType: "短期课程项目",
    dispatchTime: "2026-08-25 00:00 至 2026-12-24 23:59",
    targetSchool: "C国精华大学",
    aiScore: 75,
    gpa: 3.65,
    ranking: "12/95",
    cet4: 520,
    cet6: 480,
    toefl: null,
    ielts: null,
    hasOverseasExp: false,
    overseasExp: "",
    awards: [
      "2024年校级动画短片大赛金奖"
    ],
    studyPlan: "希望学习C国动画制作的精髓，了解宫崎骏等大师的创作理念，提升动画创作能力。",
    materials: [
      { name: "成绩单.pdf", status: "verified" },
      { name: "语言成绩证明.pdf", status: "pending" },
      { name: "获奖证书汇总.pdf", status: "verified" },
      { name: "个人陈述.pdf", status: "verified" },
    ],
    aiAnalysis: {
      strengths: [
        "GPA成绩优秀",
        "专业排名靠前",
        "有校级获奖经历"
      ],
      concerns: [
        "外语水平证明文件未通过AI验证",
        "无海外交流经历"
      ],
      recommendation: "建议人工复核",
      confidence: 70,
    }
  },
  "5": {
    id: 5,
    studentName: "张卫健",
    studentId: "20220101005",
    department: "美视电影学院",
    major: "表演",
    grade: "大三",
    phone: "13800138004",
    email: "zhangweijian@example.com",
    projectName: "(亚洲地区) 2026年秋季学期第三批交换生项目",
    projectType: "短期课程项目",
    dispatchTime: "2026-08-25 00:00 至 2026-12-24 23:59",
    targetSchool: "A国中央大学",
    aiScore: 86,
    gpa: 3.78,
    ranking: "8/85",
    cet4: 545,
    cet6: 510,
    toefl: null,
    ielts: 6.5,
    hasOverseasExp: true,
    overseasExp: "2024年寒假参加A国首都艺术大学短期交流",
    awards: [
      "2023年省级大学生戏剧节最佳男演员",
      "2024年校级话剧大赛一等奖"
    ],
    studyPlan: "计划学习A国影视表演技法，了解A国流行文化产业运作模式，为未来职业发展打下基础。",
    materials: [
      { name: "成绩单.pdf", status: "verified" },
      { name: "语言成绩证明.pdf", status: "verified" },
      { name: "获奖证书汇总.pdf", status: "verified" },
      { name: "个人陈述.pdf", status: "verified" },
    ],
    aiAnalysis: {
      strengths: [
        "GPA成绩优秀",
        "语言能力达标",
        "有海外交流经历",
        "有省级获奖经历"
      ],
      concerns: [
        "存在未解除的违纪处分记录"
      ],
      recommendation: "建议人工复核",
      confidence: 75,
    }
  }
}

export default function ReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [reviewResult, setReviewResult] = useState("")
  const [reviewComment, setReviewComment] = useState("")
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)

  // 解析params
  useState(() => {
    params.then(setResolvedParams)
  })

  const applicationData = resolvedParams ? applicationsData[resolvedParams.id] || applicationsData["1"] : applicationsData["1"]

  const handleApprove = () => {
    setIsApproveDialogOpen(false)
    router.push("/admin/review")
  }

  const handleReject = () => {
    setIsRejectDialogOpen(false)
    router.push("/admin/review")
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/review">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                返回列表
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {applicationData.projectType}
                </Badge>
                <Badge variant="secondary">待审批</Badge>
              </div>
              <h1 className="text-lg font-semibold">{applicationData.studentName} - {applicationData.projectName}</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => setIsRejectDialogOpen(true)}>
              <XCircle className="h-4 w-4" />
              驳回
            </Button>
            <Button className="gap-2" onClick={() => setIsApproveDialogOpen(true)}>
              <CheckCircle2 className="h-4 w-4" />
              通过
            </Button>
          </div>
        </div>

        {/* AI Score Banner */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${
                  applicationData.aiScore >= 85 ? "bg-green-100 text-green-600" : 
                  applicationData.aiScore >= 75 ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-600"
                }`}>
                  {applicationData.aiScore}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">AI综合评分</p>
                  <p className={`text-lg font-semibold flex items-center gap-1 ${
                    applicationData.aiAnalysis.recommendation.includes("通过") ? "text-green-600" : "text-amber-600"
                  }`}>
                    <Sparkles className="h-4 w-4" />
                    {applicationData.aiAnalysis.recommendation}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">AI置信度</p>
                <p className="text-2xl font-bold text-primary">{applicationData.aiAnalysis.confidence}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Content */}
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic" className="gap-1">
              <User className="h-4 w-4" />
              基本信息
            </TabsTrigger>
            <TabsTrigger value="academic" className="gap-1">
              <GraduationCap className="h-4 w-4" />
              学业成绩
            </TabsTrigger>
            <TabsTrigger value="language" className="gap-1">
              <Languages className="h-4 w-4" />
              语言能力
            </TabsTrigger>
            <TabsTrigger value="awards" className="gap-1">
              <Award className="h-4 w-4" />
              获奖经历
            </TabsTrigger>
            <TabsTrigger value="materials" className="gap-1">
              <FileText className="h-4 w-4" />
              申请材料
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  学生基本信息
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">姓名</p>
                    <p className="font-medium mt-1">{applicationData.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">学号</p>
                    <p className="font-medium mt-1">{applicationData.studentId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">学院</p>
                    <p className="font-medium mt-1">{applicationData.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">专业</p>
                    <p className="font-medium mt-1">{applicationData.major}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">年级</p>
                    <p className="font-medium mt-1">{applicationData.grade}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">联系电话</p>
                    <p className="font-medium mt-1">{applicationData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">邮箱</p>
                    <p className="font-medium mt-1">{applicationData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">目标院校</p>
                    <p className="font-medium mt-1">{applicationData.targetSchool}</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-muted-foreground mb-2">研修计划</p>
                  <p className="text-sm leading-relaxed">{applicationData.studyPlan}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  学业成绩信息
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">GPA（4分制）</p>
                    <p className="text-3xl font-bold text-primary mt-2">{applicationData.gpa}</p>
                    <Badge className="mt-2 bg-green-500">优秀</Badge>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">专业排名</p>
                    <p className="text-3xl font-bold text-primary mt-2">{applicationData.ranking}</p>
                    <Badge className="mt-2 bg-green-500">前5%</Badge>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">海外经历</p>
                    <p className="text-xl font-bold text-primary mt-2">
                      {applicationData.hasOverseasExp ? "有" : "无"}
                    </p>
                    {applicationData.hasOverseasExp && (
                      <Badge className="mt-2 bg-green-500">加分项</Badge>
                    )}
                  </div>
                </div>
                {applicationData.hasOverseasExp && (
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">海外交流经历</p>
                    <p className="text-sm">{applicationData.overseasExp}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="language">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Languages className="h-5 w-5 text-primary" />
                  语言能力证明
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-6">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">CET-4</p>
                    <p className="text-2xl font-bold text-primary mt-2">{applicationData.cet4 || "-"}</p>
                    {applicationData.cet4 && applicationData.cet4 >= 425 && (
                      <Badge className="mt-2 bg-green-500">已通过</Badge>
                    )}
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">CET-6</p>
                    <p className="text-2xl font-bold text-primary mt-2">{applicationData.cet6 || "-"}</p>
                    {applicationData.cet6 && applicationData.cet6 >= 425 && (
                      <Badge className="mt-2 bg-green-500">已通过</Badge>
                    )}
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">IELTS</p>
                    <p className="text-2xl font-bold text-primary mt-2">{applicationData.ielts || "-"}</p>
                    {applicationData.ielts && applicationData.ielts >= 6.0 && (
                      <Badge className="mt-2 bg-green-500">达标</Badge>
                    )}
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">TOEFL</p>
                    <p className="text-2xl font-bold text-primary mt-2">{applicationData.toefl || "-"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="awards">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  获奖经历
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {applicationData.awards.map((award, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">{award}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  申请材料
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {applicationData.materials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">{material.name}</span>
                        {material.status === "verified" ? (
                          <Badge className="bg-green-500 gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            AI已验证
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="gap-1 text-amber-600 border-amber-300">
                            <AlertCircle className="h-3 w-3" />
                            待人工审核
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <Eye className="h-4 w-4" />
                          预览
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <Download className="h-4 w-4" />
                          下载
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Review Comment */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              审核意见
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="请输入审核意见（可选）" 
              rows={3}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI智能助手" subtitle="智能审核辅助">
        <AIScoreCard score={applicationData.aiScore} label="AI综合评分" color="success" />

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 text-green-500" />
            优势分析
          </h4>
          <div className="space-y-2">
            {applicationData.aiAnalysis.strengths.map((item, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            关注事项
          </h4>
          <div className="space-y-2">
            {applicationData.aiAnalysis.concerns.map((item, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-3 border rounded-lg ${
          applicationData.aiAnalysis.recommendation.includes("通过") 
            ? "bg-green-50 border-green-200" 
            : "bg-amber-50 border-amber-200"
        }`}>
          <div className="flex items-center gap-2">
            <Sparkles className={`h-4 w-4 ${
              applicationData.aiAnalysis.recommendation.includes("通过") ? "text-green-500" : "text-amber-500"
            }`} />
            <span className={`text-sm font-medium ${
              applicationData.aiAnalysis.recommendation.includes("通过") ? "text-green-700" : "text-amber-700"
            }`}>AI建议: {applicationData.aiAnalysis.recommendation}</span>
          </div>
          <p className={`text-sm mt-2 ${
            applicationData.aiAnalysis.recommendation.includes("通过") ? "text-green-600" : "text-amber-600"
          }`}>
            {applicationData.aiAnalysis.recommendation.includes("通过") 
              ? "该申请者综合条件优秀，GPA和语言成绩均达标，有海外交流经历，建议通过审核。"
              : `该申请者存在以下问题需要人工核实：${applicationData.aiAnalysis.concerns.join("；")}。请审核人员仔细核查后做出判断。`
            }
          </p>
        </div>

        <div className="space-y-2">
          <Button className="w-full gap-2" onClick={() => setIsApproveDialogOpen(true)}>
            <CheckCircle2 className="h-4 w-4" />
            通过审核
          </Button>
          <Button variant="outline" className="w-full gap-2" onClick={() => setIsRejectDialogOpen(true)}>
            <XCircle className="h-4 w-4" />
            驳回申请
          </Button>
        </div>
      </AIAssistantPanel>

      {/* Approve Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认通过审核</DialogTitle>
            <DialogDescription>
              您确定要通过 {applicationData.studentName} 的申请吗？
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label>审核意见</Label>
            <Textarea 
              placeholder="请输入审核意见（可选）" 
              className="mt-2"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>取消</Button>
            <Button onClick={handleApprove} className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              确认通过
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认驳回申请</DialogTitle>
            <DialogDescription>
              您确定要驳回 {applicationData.studentName} 的申请吗？
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label>驳回原因 *</Label>
              <RadioGroup defaultValue="materials" className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="materials" id="materials" />
                  <Label htmlFor="materials">材料不完整</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="qualification" id="qualification" />
                  <Label htmlFor="qualification">不符合申请条件</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">其他原因</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label>详细说明 *</Label>
              <Textarea 
                placeholder="请输入详细的驳回说明" 
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>取消</Button>
            <Button variant="destructive" onClick={handleReject} className="gap-2">
              <XCircle className="h-4 w-4" />
              确认驳回
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
