"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Users, 
  Link2,
  Wallet,
  Check,
  X,
  RotateCcw,
  ChevronRight
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
  studentsUncertain: false,
  
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

export default function ProjectApplicationReviewDetailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isViewMode = searchParams.get("mode") === "view"
  
  const [reviewOpinion, setReviewOpinion] = useState(`批复及资助意见：
拟资助______元/生，资助人数上限为______人次。
实际划拨金额按照实际出团人数及项目效果结算。`)
  const [selectedAction, setSelectedAction] = useState<"approve" | "reject" | "return" | null>(null)

  const handleReviewAction = (action: "approve" | "reject" | "return") => {
    setSelectedAction(action)
    // 实际提交逻辑
    router.push("/admin/project-application-review")
  }

  const publicFundTotal = projectDetail.schoolFundTotal + projectDetail.unitFundTotal
  const schoolFundPercent = Math.round((projectDetail.schoolFundTotal / publicFundTotal) * 100)
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
              <h2 className="text-lg font-semibold">{projectDetail.projectName}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                申报单位：{projectDetail.applyUnit}　　申报人：{projectDetail.applicant}　　申报时间：{projectDetail.applyTime}
              </p>
            </div>
            <Badge className="bg-amber-100 text-amber-600 border-0">
              {projectDetail.status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 审核流程 */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-6">审核流程</h3>
          
          <div className="relative">
            {projectDetail.reviewFlow.map((step, index) => (
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
                  {index < projectDetail.reviewFlow.length - 1 && (
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
                <p className="text-sm font-medium">{projectDetail.projectName}</p>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">项目类别</p>
                <p className="text-sm font-medium">{projectDetail.projectType}</p>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">项目级别</p>
                <p className="text-sm font-medium">{projectDetail.projectLevel}</p>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">开始时间</p>
                <p className="text-sm font-medium">{projectDetail.startDate}</p>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">结束时间</p>
                <p className="text-sm font-medium">{projectDetail.endDate}</p>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">项目周期</p>
                <p className="text-sm font-medium">{projectDetail.duration}天</p>
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
                <p className="text-sm font-medium">{projectDetail.totalStudents}人</p>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">计划本科生人数</p>
                <p className="text-sm font-medium">{projectDetail.undergraduateCount}人</p>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">计划硕研人数</p>
                <p className="text-sm font-medium">{projectDetail.masterCount}人</p>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">计划博研人数</p>
                <p className="text-sm font-medium">{projectDetail.doctorCount}人</p>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">人数完全不确定</p>
                <p className="text-sm font-medium">{projectDetail.studentsUncertain ? "是" : "否"}</p>
              </div>
            </div>

            {/* 延续项目信息 */}
            {projectDetail.isContinuation && projectDetail.relatedProject && (
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
                    <p className="text-sm font-medium">{projectDetail.relatedProject.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary mb-1">历史项目负责人</p>
                    <p className="text-sm font-medium">{projectDetail.relatedProject.leader}</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary mb-1">历史申报时间</p>
                    <p className="text-sm font-medium">{projectDetail.relatedProject.applyTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary mb-1">历史原学生人数</p>
                    <p className="text-sm font-medium">{projectDetail.relatedProject.students}人</p>
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
                  <p className="text-sm whitespace-pre-wrap">{projectDetail.background}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">拟合作方基本情况</p>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{projectDetail.partnerInfo}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-primary mb-1">预期成果与目标</p>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{projectDetail.expectedOutcome}</p>
                </div>
              </div>
            </div>

            {/* 经费预算 */}
            <div className="flex items-center gap-2 text-primary mt-8 mb-4">
              <Wallet className="h-4 w-4" />
              <span className="text-sm font-medium">经费预算</span>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-primary mb-2">1. 基础预算</p>
                <Card className="bg-muted/30">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-xs text-primary mb-1">项目费用（元/生）</p>
                        <p className="text-sm font-medium">¥{projectDetail.costPerStudent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-primary mb-1">预计学生人数</p>
                        <p className="text-sm font-medium">{projectDetail.totalStudents}人</p>
                      </div>
                      <div>
                        <p className="text-xs text-primary mb-1">项目费用合计</p>
                        <p className="text-sm font-medium text-primary">¥{projectDetail.totalCost.toLocaleString()}</p>
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
                      <p className="text-sm whitespace-pre-wrap">{projectDetail.expenseIncludes}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">2.2 项目费用不包含项</p>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{projectDetail.expenseExcludes}</p>
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
                            <p className="text-sm font-medium">¥{projectDetail.schoolFundPerStudent.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-primary mb-1">人数</p>
                            <p className="text-sm font-medium">{projectDetail.totalStudents}人</p>
                          </div>
                          <div>
                            <p className="text-xs text-primary mb-1">小计</p>
                            <p className="text-sm font-medium text-primary">¥{projectDetail.schoolFundTotal.toLocaleString()}</p>
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
                            <p className="text-sm font-medium">¥{projectDetail.unitFundPerStudent.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-primary mb-1">人数</p>
                            <p className="text-sm font-medium">{projectDetail.totalStudents}人</p>
                          </div>
                          <div>
                            <p className="text-xs text-primary mb-1">小计</p>
                            <p className="text-sm font-medium text-primary">¥{projectDetail.unitFundTotal.toLocaleString()}</p>
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
                            <p className="text-sm font-medium">¥{projectDetail.selfFundPerStudent.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-primary mb-1">小计</p>
                            <p className="text-sm font-medium text-primary">¥{projectDetail.selfFundTotal.toLocaleString()}</p>
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
                    <p className="text-xl font-bold">¥{projectDetail.selfFundTotal.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/80 mb-1">项目总经费</p>
                    <p className="text-2xl font-bold">¥{projectDetail.totalCost.toLocaleString()}</p>
                  </div>
                </div>
              </div>
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
                  onClick={() => handleReviewAction("reject")}
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

              <div className="space-y-2">
                <p className="text-sm font-medium">批复及资助意见</p>
                <Textarea 
                  placeholder="请填写批复及资助意见..." 
                  rows={4}
                  value={reviewOpinion}
                  onChange={(e) => setReviewOpinion(e.target.value)}
                />
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
    </div>
  )
}
