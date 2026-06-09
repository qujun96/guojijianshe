"use client"

import { useState, useRef } from "react"
import { useRouter, useSearchParams, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { 
  FileText, 
  Users, 
  Link2,
  Wallet,
  Check,
  X,
  RotateCcw,
  ChevronRight,
  CalendarClock,
  Building2,
  ClipboardList,
  Upload,
  ImageIcon
} from "lucide-react"

// 模拟项目详情数据
const projectDetail = {
  id: "PA202403001",
  projectName: "G国H大学工程学暑期交流项目",
  applyUnit: "电气工程学院",
  applicant: "张伟教授",
  applyTime: "2024-03-15",
  status: "待审核",
  
  // 基本信息
  projectType: "暑期学校项目",
  projectLevel: "部处/学院级项目",
  startDate: "2024-07-01",
  endDate: "2024-07-30",
  duration: 30,
  
  // 学生人数
  totalStudents: 30,
  undergraduateCount: 18,
  masterCount: 8,
  doctorCount: 4,
  
  // 延续项目信息
  isContinuation: true,
  relatedProject: {
    name: "2023年G国H大学工程学暑期交流项目",
    leader: "张伟教授",
    applyTime: "2023-03-10",
    students: 25,
  },
  
  // 项目概述
  background: "为响应国家「双一流」建设号召，提升电气工程学科国际化水平，培养具有国际视野的创新型人才，特申请本暑期交流项目。项目旨在依托G国H大学在电气工程领域的领先优势，组织我校优秀学生进行深度学习与交流，提升学生的专业素养和跨文化交流能力。",
  partnerInfo: "G国H大学（University of Cambridge）成立于1209年，是世界顶尖公立研究型大学，在多个世界大学排名中稳居前三位。G国H大学工程学院在电力系统、智能电网、新能源技术等领域具有世界级的研究实力和教学水平，与我校电气工程学科有着长期的合作基础。本次合作方为G国H大学工程学院国际交流部，联系人：Dr. John Smith，联系邮箱：international@eng.cam.ac.uk。",
  expectedOutcome: "1. 学生获得G国H大学官方结业证书\n2. 每位学生完成一份项目学习报告，优秀报告推荐发表\n3. 建立两校工程学院长期稳定的合作交流机制\n4. 培养学生国际化视野和跨文化交流能力\n5. 引进国外先进课程体系，推动我校相关课程改革",
  completionStandard: "1. 学生出勤率达到95%以上\n2. 所有学生完成课程学习并获得结业证书\n3. 每位学生提交一份不少于3000字的学习总结报告\n4. 项目满意度调查达到85%以上",
  
  // 经费预算
  costPerStudent: 32500,
  totalCost: 975000,
  schoolFundPerStudent: 20000,
  schoolFundTotal: 600000,
  unitFundPerStudent: 8000,
  unitFundTotal: 240000,
  selfFundPerStudent: 4500,
  selfFundTotal: 135000,
  expenseIncludes: "1. 国际旅费：往返机票及境外市内交通\n2. 住宿费：项目期间的住宿费用\n3. 生活费：餐饮、交通等日常开销\n4. 注册费：项目注册及相关学费\n5. 保险费：境外意外医疗保险",
  expenseExcludes: "1. 护照办理及签证申请费用\n2. 学生从所在地至出发口岸的往返交通费用\n3. 学生个人消费（如购物、娱乐等）\n4. 因个人原因导致的额外费用\n5. 行李超重费用",

  // 是否联合申报
  isJoint: false,

  // 具体安排及进度
  schedule:
    "1. 准备阶段（2024年4-5月）：完成项目宣讲、学生选拔与资格审核，签订相关协议。\n2. 行前培训（2024年6月）：组织行前安全教育、跨文化适应培训，签署责任书。\n3. 项目实施（2024年7月）：学生赴G国H大学开展为期30天的课程学习与实践交流。\n4. 总结验收（2024年8月）：收集学习报告、开展项目满意度调查、形成项目总结。",

  // 项目组成员情况（非联合申报）
  leadMembers: {
    leader: { name: "李建国", email: "lijg@cqu.edu.cn", phone: "023-65111001 / 138****0001" },
    contact: { name: "王晓敏", email: "wangxm@cqu.edu.cn", phone: "023-65111002 / 138****0002" },
  },
  otherMembers: [
    { name: "张伟", work: "项目总负责、课程对接", email: "zhangw@cqu.edu.cn", phone: "023-65111003 / 138****0003" },
    { name: "刘洋", work: "学生管理、行前培训", email: "liuy@cqu.edu.cn", phone: "023-65111004 / 138****0004" },
    { name: "陈静", work: "经费管理、后勤保障", email: "chenj@cqu.edu.cn", phone: "023-65111005 / 138****0005" },
  ],

  // 申请单位承诺及意见
  commitment:
    "我单位将遵照《重庆大学学生出国（境）交流资助经费管理办法》（重大校发〔2025〕44号）等相关工作文件及学校财务等相关工作制度开展相关工作。我单位将为学生组织行前培训，做好行前培训会议记录并组织学生签署《重庆大学出国（境）学习交流责任书》，学生签署完毕后组织在本单位存档。若有违反，本单位将承担相应责任。",

  // 审核流程
  reviewFlow: [
    {
      step: 1,
      name: "单位审批",
      status: "completed",
      reviewer: "李院长",
      reviewerUnit: "电气工程学院",
      reviewTime: "2024-03-15 14:30",
      opinion: "同意该项目立项申报，同意推荐。",
    },
    {
      step: 2,
      name: "学校审批",
      status: "pending",
      reviewer: "",
      reviewerUnit: "国际合作处",
      reviewTime: "",
      opinion: "",
    },
  ],
}

// 联合申报版项目详情（覆盖部分字段）
const jointProjectDetail = {
  ...projectDetail,
  id: "PA202403003",
  projectName: "A国J大学经济管理联合培养项目",
  applyUnit: "管理学院",
  applicant: "刘芳副教授",
  applyTime: "2024-03-13",
  isJoint: true,

  // 联合申报单位信息
  jointUnits: [
    {
      role: "主办单位",
      unitName: "重庆大学管理学院",
      leader: { name: "刘芳", email: "liuf@cqu.edu.cn", phone: "023-65222001 / 139****0001" },
      contact: { name: "周文", email: "zhouw@cqu.edu.cn", phone: "023-65222002 / 139****0002" },
    },
    {
      role: "参与单位",
      unitName: "重庆大学经济学院",
      leader: { name: "孙强", email: "sunq@cqu.edu.cn", phone: "023-65222003 / 139****0003" },
      contact: { name: "赵敏", email: "zhaom@cqu.edu.cn", phone: "023-65222004 / 139****0004" },
    },
  ],
}

export default function ProjectApplicationReviewDetailPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const isViewMode = searchParams.get("mode") === "view"

  // 根据路由 id 判断是否为联合申报项目，分别展示对应详情
  const routeId = String(params?.id ?? "")
  const detail = routeId === jointProjectDetail.id ? jointProjectDetail : projectDetail

  const [fundPerStudent, setFundPerStudent] = useState("")
  const [maxStudentCount, setMaxStudentCount] = useState("")
  const [reviewRemark, setReviewRemark] = useState("")
  const [selectedAction, setSelectedAction] = useState<"approve" | "reject" | "return" | null>(null)

  // 审核附件（图片）
  const [attachments, setAttachments] = useState<{ id: string; name: string; url: string }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newAttachments = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: file.name,
        url: URL.createObjectURL(file),
      }))
    setAttachments((prev) => [...prev, ...newAttachments])
    // 重置 input 以便可重复选择同一文件
    e.target.value = ""
  }

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => {
      const target = prev.find((a) => a.id === id)
      if (target) URL.revokeObjectURL(target.url)
      return prev.filter((a) => a.id !== id)
    })
  }

  // 驳回理由弹窗
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  const handleReviewAction = (action: "approve" | "return") => {
    setSelectedAction(action)
    // 实际提交逻辑
    router.push("/admin/project-application-review")
  }

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) return
    setSelectedAction("reject")
    // 实际提交逻辑（携带驳回理由 rejectReason）
    setRejectDialogOpen(false)
    router.push("/admin/project-application-review")
  }

  const publicFundTotal = detail.schoolFundTotal + detail.unitFundTotal
  const schoolFundPercent = Math.round((detail.schoolFundTotal / publicFundTotal) * 100)
  const unitFundPercent = 100 - schoolFundPercent

  return (
    <div className="space-y-4 pb-8">
      {/* 面包屑导航 */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>首页</span>
        <ChevronRight className="h-4 w-4" />
        <span>审核管理</span>
        <ChevronRight className="h-4 w-4" />
        <span>待审核</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">审核详情</span>
      </div>

      <h1 className="text-xl font-semibold">立项申报审核详情</h1>

      {/* 项目头部信息 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{detail.projectName}</h2>
                <Badge
                  variant="outline"
                  className={
                    detail.isJoint
                      ? "bg-blue-50 text-blue-600 border-blue-200"
                      : "bg-muted text-muted-foreground border-transparent"
                  }
                >
                  联合申报：{detail.isJoint ? "是" : "否"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                申报单位：{detail.applyUnit}　　申报人：{detail.applicant}　　申报时间：{detail.applyTime}
              </p>
            </div>
            <Badge className="bg-amber-100 text-amber-600 border-0">
              {detail.status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 审核流程 */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-6">审核流程</h3>
          
          <div className="relative">
            {detail.reviewFlow.map((step, index) => (
              <div key={step.step} className="flex gap-4 mb-6 last:mb-0">
                {/* 左侧时间线 */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.status === "completed" 
                      ? "bg-green-500 text-white" 
                      : "bg-amber-500 text-white"
                  }`}>
                    {step.status === "completed" ? <Check className="h-4 w-4" /> : step.step}
                  </div>
                  {index < detail.reviewFlow.length - 1 && (
                    <div className={`w-0.5 flex-1 mt-2 ${
                      step.status === "completed" ? "bg-green-500" : "bg-amber-300"
                    }`} />
                  )}
                </div>
                
                {/* 右侧内容 */}
                <div className="flex-1 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{step.name}</h4>
                      {step.status === "completed" ? (
                        <p className="text-xs text-muted-foreground">{step.reviewTime}</p>
                      ) : (
                        <p className="text-xs text-amber-600">待审核</p>
                      )}
                    </div>
                    <span className="text-sm text-primary">
                      {step.reviewer ? `${step.reviewer} · ${step.reviewerUnit}` : step.reviewerUnit}
                    </span>
                  </div>
                  
                  {step.opinion && (
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg border-l-4 border-green-500">
                      <p className="text-sm text-muted-foreground">{step.opinion}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 项目详情 */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-6">项目详情</h3>
          
          {/* 项目基本信息 */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary mb-4">
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">项目基本信息</span>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-primary mb-1">项目名称</p>
                <p className="text-sm font-medium">{detail.projectName}</p>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">项目类别</p>
                <p className="text-sm font-medium">{detail.projectType}</p>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">项目级别</p>
                <p className="text-sm font-medium">{detail.projectLevel}</p>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">开始时间</p>
                <p className="text-sm font-medium">{detail.startDate}</p>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">结束时间</p>
                <p className="text-sm font-medium">{detail.endDate}</p>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">项目周期</p>
                <p className="text-sm font-medium">{detail.duration}天</p>
              </div>
            </div>

            {/* 学生人数信息 */}
            <div className="flex items-center gap-2 text-primary mt-8 mb-4">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">学生人数信息</span>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-primary mb-1">拟选派学生总人数</p>
                <p className="text-sm font-medium">{detail.totalStudents}人</p>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">计划本科生人数</p>
                <p className="text-sm font-medium">{detail.undergraduateCount}人</p>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">计划硕研人数</p>
                <p className="text-sm font-medium">{detail.masterCount}人</p>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">计划博研人数</p>
                <p className="text-sm font-medium">{detail.doctorCount}人</p>
              </div>
            </div>

            {/* 延续项目信息 */}
            {detail.isContinuation && detail.relatedProject && (
              <>
                <div className="flex items-center gap-2 text-primary mt-8 mb-4">
                  <Link2 className="h-4 w-4" />
                  <span className="text-sm font-medium">延续项目信息</span>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <p className="text-xs text-primary mb-1">是否为延续项目</p>
                    <p className="text-sm font-medium">是</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary mb-1">关联的历史项目名称</p>
                    <p className="text-sm font-medium">{detail.relatedProject.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary mb-1">历史项目��责人</p>
                    <p className="text-sm font-medium">{detail.relatedProject.leader}</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary mb-1">历史申报时间</p>
                    <p className="text-sm font-medium">{detail.relatedProject.applyTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary mb-1">历史原学生人数</p>
                    <p className="text-sm font-medium">{detail.relatedProject.students}人</p>
                  </div>
                </div>
              </>
            )}

            {/* 项目概述 */}
            <div className="flex items-center gap-2 text-primary mt-8 mb-4">
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">项目概述</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-primary mb-1">立项背景</p>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{detail.background}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">拟合作方基本情况</p>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{detail.partnerInfo}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">预期成果与目标</p>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{detail.expectedOutcome}</p>
                </div>
              </div>
            </div>

            {/* 具体安排及进度 */}
            <div className="flex items-center gap-2 text-primary mt-8 mb-4">
              <CalendarClock className="h-4 w-4" />
              <span className="text-sm font-medium">具体安排及进度</span>
            </div>

            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{detail.schedule}</p>
            </div>

            {/* 经费预算 */}
            <div className="flex items-center gap-2 text-primary mt-8 mb-4">
              <Wallet className="h-4 w-4" />
              <span className="text-sm font-medium">经费预算</span>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-primary mb-2">1. 经费预算</p>
                <Card className="bg-muted/30">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-xs text-primary mb-1">项目费用（元/生）</p>
                        <p className="text-sm font-medium">¥{detail.costPerStudent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-primary mb-1">预计学生人数</p>
                        <p className="text-sm font-medium">{detail.totalStudents}人</p>
                      </div>
                      <div>
                        <p className="text-xs text-primary mb-1">项目费用合计</p>
                        <p className="text-sm font-medium text-primary">¥{detail.totalCost.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <p className="text-sm font-medium text-primary mb-2">2. 费用明细</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">2.1 项目费用包含项</p>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{detail.expenseIncludes}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">2.2 项目费用不包含项</p>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{detail.expenseExcludes}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-primary mb-2">3. 经费来源细分</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">3.1 申请学校经费</p>
                    <Card className="bg-blue-50/50">
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-3 gap-6">
                          <div>
                            <p className="text-xs text-primary mb-1">经费标准（元/生）</p>
                            <p className="text-sm font-medium">¥{detail.schoolFundPerStudent.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-primary mb-1">人数</p>
                            <p className="text-sm font-medium">{detail.totalStudents}人</p>
                          </div>
                          <div>
                            <p className="text-xs text-primary mb-1">小计</p>
                            <p className="text-sm font-medium text-primary">¥{detail.schoolFundTotal.toLocaleString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">3.2 本单位配套经费</p>
                    <Card className="bg-green-50/50">
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-3 gap-6">
                          <div>
                            <p className="text-xs text-primary mb-1">经费标准（元/生）</p>
                            <p className="text-sm font-medium">¥{detail.unitFundPerStudent.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-primary mb-1">人数</p>
                            <p className="text-sm font-medium">{detail.totalStudents}人</p>
                          </div>
                          <div>
                            <p className="text-xs text-primary mb-1">小计</p>
                            <p className="text-sm font-medium text-primary">¥{detail.unitFundTotal.toLocaleString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">3.3 学生自筹</p>
                    <Card className="bg-amber-50/50">
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-3 gap-6">
                          <div>
                            <p className="text-xs text-primary mb-1">经费标准（元/生）</p>
                            <p className="text-sm font-medium">¥{detail.selfFundPerStudent.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-primary mb-1">小计</p>
                            <p className="text-sm font-medium text-primary">¥{detail.selfFundTotal.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-primary mb-1">备注</p>
                            <p className="text-sm">学生个人承担，补充部分费用缺口</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* 经费来源汇总 */}
              <div className="flex items-center gap-2 text-primary mb-4">
                <Wallet className="h-4 w-4" />
                <span className="text-sm font-medium">经费来源汇总</span>
              </div>

              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 rounded-lg p-6 text-white">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-white/80 mb-1">学校经费 + 单位配套 总计</p>
                    <p className="text-xl font-bold">¥{publicFundTotal.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/80 mb-1">学生自筹总计</p>
                    <p className="text-xl font-bold">¥{detail.selfFundTotal.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/80 mb-1">项目总经费</p>
                    <p className="text-2xl font-bold">¥{detail.totalCost.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 项目组成员情况 */}
            <div className="flex items-center gap-2 text-primary mt-8 mb-4">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">项目组成员情况</span>
            </div>

            {detail.isJoint ? (
              <div className="space-y-4">
                {(detail as typeof jointProjectDetail).jointUnits.map((unit, idx) => (
                  <Card key={idx} className="bg-muted/30">
                    <CardContent className="pt-4 space-y-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                          {unit.role}
                        </Badge>
                        <span className="text-sm font-medium">{unit.unitName}</span>
                      </div>
                      <div className="overflow-x-auto rounded-md border bg-background">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="border-b border-r p-2 text-center font-medium text-primary w-32">类别</th>
                              <th className="border-b border-r p-2 text-center font-medium text-primary">姓名</th>
                              <th className="border-b border-r p-2 text-center font-medium text-primary">工作邮箱</th>
                              <th className="border-b p-2 text-center font-medium text-primary">座机电话及手机电话</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border-b border-r p-2 text-center font-medium bg-muted/30">主要负责领导</td>
                              <td className="border-b border-r p-2 text-center">{unit.leader.name}</td>
                              <td className="border-b border-r p-2 text-center">{unit.leader.email}</td>
                              <td className="border-b p-2 text-center">{unit.leader.phone}</td>
                            </tr>
                            <tr>
                              <td className="border-r p-2 text-center font-medium bg-muted/30">主要经办及联络人</td>
                              <td className="border-r p-2 text-center">{unit.contact.name}</td>
                              <td className="border-r p-2 text-center">{unit.contact.email}</td>
                              <td className="p-2 text-center">{unit.contact.phone}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {/* 项目组主要成员情况 */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">项目组主要成员情况</p>
                  <div className="overflow-x-auto rounded-md border bg-background">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="border-b border-r p-2 text-center font-medium text-primary w-32" />
                          <th className="border-b border-r p-2 text-center font-medium text-primary">姓名</th>
                          <th className="border-b border-r p-2 text-center font-medium text-primary">工作邮箱</th>
                          <th className="border-b p-2 text-center font-medium text-primary">座机电话及手机电话</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border-b border-r p-2 text-center font-medium bg-muted/30">主要负责领导</td>
                          <td className="border-b border-r p-2 text-center">{detail.leadMembers.leader.name}</td>
                          <td className="border-b border-r p-2 text-center">{detail.leadMembers.leader.email}</td>
                          <td className="border-b p-2 text-center">{detail.leadMembers.leader.phone}</td>
                        </tr>
                        <tr>
                          <td className="border-r p-2 text-center font-medium bg-muted/30">主要经办及联络人</td>
                          <td className="border-r p-2 text-center">{detail.leadMembers.contact.name}</td>
                          <td className="border-r p-2 text-center">{detail.leadMembers.contact.email}</td>
                          <td className="p-2 text-center">{detail.leadMembers.contact.phone}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 项目其他成员情况 */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">项目其他成员情况</p>
                  <div className="overflow-x-auto rounded-md border bg-background">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="border-b border-r p-2 text-center font-medium text-primary">姓名</th>
                          <th className="border-b border-r p-2 text-center font-medium text-primary">承担工作</th>
                          <th className="border-b border-r p-2 text-center font-medium text-primary">工作邮箱</th>
                          <th className="border-b p-2 text-center font-medium text-primary">办公室座机及手机</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detail.otherMembers.map((m, idx) => (
                          <tr key={idx}>
                            <td className="border-b border-r p-2 text-center">{m.name}</td>
                            <td className="border-b border-r p-2 text-center">{m.work}</td>
                            <td className="border-b border-r p-2 text-center">{m.email}</td>
                            <td className="border-b p-2 text-center">{m.phone}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 申请单位承诺及意见 */}
            <div className="flex items-center gap-2 text-primary mt-8 mb-4">
              <ClipboardList className="h-4 w-4" />
              <span className="text-sm font-medium">申请单位承诺及意见</span>
            </div>

            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{detail.commitment}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 审核操作 - 只在非查看模式下显示 */}
      {!isViewMode && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-6">审核操作</h3>
            <div className="h-px bg-border mb-6" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Button 
                  className="bg-green-500 hover:bg-green-600 gap-2"
                  onClick={() => handleReviewAction("approve")}
                >
                  <Check className="h-4 w-4" />
                  通过
                </Button>
                <Button 
                  variant="destructive"
                  className="gap-2"
                  onClick={() => setRejectDialogOpen(true)}
                >
                  <X className="h-4 w-4" />
                  驳回
                </Button>
                <Button 
                  className="bg-amber-500 hover:bg-amber-600 gap-2"
                  onClick={() => handleReviewAction("return")}
                >
                  <RotateCcw className="h-4 w-4" />
                  退回修改
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium">批复及资助意见</p>
                <Card className="bg-muted/30">
                  <CardContent className="pt-5 space-y-5">
                    {/* 拟资助标准 */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-sm">
                      <span className="text-foreground">拟资助</span>
                      <Input
                        type="number"
                        placeholder="0"
                        value={fundPerStudent}
                        onChange={(e) => setFundPerStudent(e.target.value)}
                        className="w-32 bg-background text-center"
                      />
                      <span className="text-foreground">元/生，资助人数上限为</span>
                      <Input
                        type="number"
                        placeholder="0"
                        value={maxStudentCount}
                        onChange={(e) => setMaxStudentCount(e.target.value)}
                        className="w-28 bg-background text-center"
                      />
                      <span className="text-foreground">人次。</span>
                    </div>

                    {/* 资助总额上限预览 */}
                    {fundPerStudent && maxStudentCount && (
                      <div className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-sm">
                        <span className="text-muted-foreground">资助总额上限：</span>
                        <span className="font-semibold text-primary">
                          ¥{(Number(fundPerStudent) * Number(maxStudentCount)).toLocaleString()}
                        </span>
                      </div>
                    )}

                    {/* 固定说明 */}
                    <p className="text-sm text-muted-foreground">
                      实际划拨金额按照实际出团人数及项目效果结算。
                    </p>

                    {/* 补充意见 */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">补充说明（选填）</p>
                      <Textarea
                        placeholder="请填写其他批复意见或补充说明..."
                        rows={3}
                        value={reviewRemark}
                        onChange={(e) => setReviewRemark(e.target.value)}
                        className="bg-background"
                      />
                    </div>

                    {/* 附件（图片）上传 */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">附件（图片，选填）</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFilesSelected}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background py-6 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        <Upload className="h-5 w-5" />
                        <span className="text-sm">点击上传图片附件</span>
                        <span className="text-xs text-muted-foreground">支持 JPG、PNG 等图片格式，可多选</span>
                      </button>

                      {attachments.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                          {attachments.map((file) => (
                            <div
                              key={file.id}
                              className="group relative overflow-hidden rounded-lg border bg-background"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={file.url || "/placeholder.svg"}
                                alt={file.name}
                                className="h-24 w-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveAttachment(file.id)}
                                className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                aria-label={`移除 ${file.name}`}
                              >
                                <X className="h-3 w-3" />
                              </button>
                              <div className="flex items-center gap-1 px-2 py-1">
                                <ImageIcon className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
                                <span className="truncate text-xs text-muted-foreground">{file.name}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 底部操作栏 */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => router.back()}>
          返回列表
        </Button>
      </div>

      {/* 驳回理由弹窗 */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>驳回申报</DialogTitle>
            <DialogDescription>
              驳回后将退回给申报单位，请填写驳回理由，便于申报单位了解原因并进行修改。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              驳回理由 <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="请输入驳回理由..."
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            {rejectDialogOpen && !rejectReason.trim() && (
              <p className="text-xs text-red-500">驳回理由不能为空</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              取消
            </Button>
            <Button
              variant="destructive"
              disabled={!rejectReason.trim()}
              onClick={handleConfirmReject}
            >
              确认驳回
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
