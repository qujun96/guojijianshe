"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Users, 
  Link2,
  Wallet,
  Building2,
  ArrowLeft,
  Edit,
  Send,
  RotateCcw
} from "lucide-react"

// 模拟项目详情数据
const projectDetail = {
  id: "PA202403001",
  projectName: "剑桥大学工程学暑期交流项目",
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
    name: "2023年剑桥大学工程学暑期交流项目",
    leader: "张伟教授",
    applyTime: "2023-03-10",
    students: 25,
  },

  // 联合申报单位
  hasJointUnit: true,
  jointUnit: {
    name: "机械工程学院",
    contactPerson: "王芳副教授",
    contactPosition: "国际交流负责人",
    contactPhone: "13800138001",
    cooperationDesc: "负责机械工程相关课程的对接与学生选拔工作",
  },
  
  // 项目概述
  background: "为响应国家「双一流」建设号召，提升电气工程学科国际化水平，培养具有国际视野的创新型人才，特申请本暑期交流项目。项目旨在依托剑桥大学在电气工程领域的领先优势，组织我校优秀学生进行深度学习与交流，提升学生的专业素养和跨文化交流能力。",
  partnerInfo: "剑桥大学（University of Cambridge）成立于1209年，是世界顶尖公立研究型大学，在多个世界大学排名中稳居前三位。剑桥大学工程学院在电力系统、智能电网、新能源技术等领域具有世界级的研究实力和教学水平，与我校电气工程学科有着长期的合作基础。",
  expectedOutcome: "1. 学生获得剑桥大学官方结业证书\n2. 每位学生完成一份项目学习报告，优秀报告推荐发表\n3. 建立两校工程学院长期稳定的合作交流机制\n4. 培养学生国际化视野和跨文化交流能力\n5. 引进国外先进课程体系，推动我校相关课程改革",
  completionStandard: "1. 学生出勤率达到95%以上\n2. 所有学生完成课程学习并获得结业证书\n3. 每位学生提交一份不少于3000字的学习总结报告\n4. 项目满意度调查达到85%以上",
  
  // 经费预算
  costPerStudent: 32500,
  budgetStudentCount: 30,
  totalCost: 975000,
  schoolFundPerStudent: 20000,
  schoolFundStudentCount: 30,
  schoolFundTotal: 600000,
  unitFundPerStudent: 8000,
  unitFundStudentCount: 30,
  unitFundTotal: 240000,
  selfFundPerStudent: 4500,
  selfFundStudentCount: 30,
  selfFundTotal: 135000,
  expenseIncludes: "1. 国际旅费：往返机票及境外市内交通\n2. 住宿费：项目期间的住宿费用\n3. 生活费：餐饮、交通等日常开销\n4. 注册费：项目注册及相关学费\n5. 保险费：境外意外医疗保险",
  expenseExcludes: "1. 护照办理及签证申请费用\n2. 学生从所在地至出发口岸的往返交通费用\n3. 学生个人消费（如购物、娱乐等）\n4. 因个人原因导致的额外费用\n5. 行李超重费用",
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  "草稿": { label: "草稿", variant: "secondary" },
  "待审核": { label: "待审核", variant: "default" },
  "审核中": { label: "审核中", variant: "default" },
  "已通过": { label: "已通过", variant: "outline" },
  "已驳回": { label: "已驳回", variant: "destructive" },
  "已撤回": { label: "已撤回", variant: "secondary" },
}

export default function ProjectApplicationDetailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const data = projectDetail
  const statusInfo = statusConfig[data.status] || statusConfig["草稿"]

  const publicFundTotal = data.schoolFundTotal + data.unitFundTotal
  const schoolFundPercent = publicFundTotal > 0 ? Math.round((data.schoolFundTotal / publicFundTotal) * 100) : 0
  const unitFundPercent = publicFundTotal > 0 ? 100 - schoolFundPercent : 0

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* 面包屑 */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>首页</span>
        <span>/</span>
        <span>项目管理</span>
        <span>/</span>
        <span>项目立项申报</span>
        <span>/</span>
        <span className="text-foreground">申报详情</span>
      </div>

      {/* 标题 */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">申报详情</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Button>
          {(data.status === "草稿" || data.status === "已驳回" || data.status === "已撤回") && (
            <>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                编辑
              </Button>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                提交申报
              </Button>
            </>
          )}
          {data.status === "待审核" && (
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              撤回
            </Button>
          )}
        </div>
      </div>

      {/* 项目概况卡片 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">{data.projectName}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                申报单位：{data.applyUnit}　　申报人：{data.applicant}　　申报时间：{data.applyTime}
              </p>
            </div>
            <Badge 
              variant={statusInfo.variant}
              className={
                data.status === "待审核" ? "bg-orange-100 text-orange-600 hover:bg-orange-100" :
                data.status === "已通过" ? "bg-green-100 text-green-600 hover:bg-green-100" :
                data.status === "已驳回" ? "bg-red-100 text-red-600 hover:bg-red-100" :
                ""
              }
            >
              {statusInfo.label}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 项目详情 */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-base font-semibold mb-6">项目详情</h3>

          {/* 项目基本信息 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-primary mb-4">
              <FileText className="h-4 w-4" />
              <span className="font-medium">项目基本信息</span>
            </div>
            <div className="grid grid-cols-4 gap-y-4">
              <div>
                <p className="text-sm text-muted-foreground">项目名称</p>
                <p className="text-sm font-medium mt-1">{data.projectName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">项目类别</p>
                <p className="text-sm font-medium mt-1">{data.projectType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">项目级别</p>
                <p className="text-sm font-medium mt-1">{data.projectLevel}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">开始时间</p>
                <p className="text-sm font-medium mt-1 text-primary">{data.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">结束时间</p>
                <p className="text-sm font-medium mt-1 text-primary">{data.endDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">项目周期</p>
                <p className="text-sm font-medium mt-1">{data.duration}天</p>
              </div>
            </div>
          </div>

          {/* 学生人数信息 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Users className="h-4 w-4" />
              <span className="font-medium">学生人数信息</span>
            </div>
            <div className="grid grid-cols-4 gap-y-4">
              <div>
                <p className="text-sm text-muted-foreground">拟选派学生总人数</p>
                <p className="text-sm font-medium mt-1">{data.totalStudents}人</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">计划本科生人数</p>
                <p className="text-sm font-medium mt-1">{data.undergraduateCount}人</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">计划硕研人数</p>
                <p className="text-sm font-medium mt-1">{data.masterCount}人</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">计划博研人数</p>
                <p className="text-sm font-medium mt-1">{data.doctorCount}人</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">人数完全不确定</p>
                <p className="text-sm font-medium mt-1">{data.studentsUncertain ? "是" : "否"}</p>
              </div>
            </div>
          </div>

          {/* 延续项目信息 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Link2 className="h-4 w-4" />
              <span className="font-medium">延续项目信息</span>
            </div>
            <div className="grid grid-cols-4 gap-y-4">
              <div>
                <p className="text-sm text-muted-foreground">是否为延续项目</p>
                <p className="text-sm font-medium mt-1">{data.isContinuation ? "是" : "否"}</p>
              </div>
              {data.isContinuation && data.relatedProject && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">关联的历史项目名称</p>
                    <p className="text-sm font-medium mt-1">{data.relatedProject.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">历史项目负责人</p>
                    <p className="text-sm font-medium mt-1">{data.relatedProject.leader}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">历史申报时间</p>
                    <p className="text-sm font-medium mt-1 text-primary">{data.relatedProject.applyTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">历史原学生人数</p>
                    <p className="text-sm font-medium mt-1">{data.relatedProject.students}人</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 联合申报单位信息 */}
          {data.hasJointUnit && data.jointUnit && (
            <div className="mb-8">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Building2 className="h-4 w-4" />
                <span className="font-medium">联合申报单位信息</span>
              </div>
              <div className="grid grid-cols-4 gap-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">联合申报单位名称</p>
                  <p className="text-sm font-medium mt-1">{data.jointUnit.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">单位联系人</p>
                  <p className="text-sm font-medium mt-1">{data.jointUnit.contactPerson}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">联系人职务</p>
                  <p className="text-sm font-medium mt-1">{data.jointUnit.contactPosition}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">联系电话</p>
                  <p className="text-sm font-medium mt-1">{data.jointUnit.contactPhone}</p>
                </div>
                <div className="col-span-4">
                  <p className="text-sm text-muted-foreground">合作内容/分工说明</p>
                  <p className="text-sm font-medium mt-1">{data.jointUnit.cooperationDesc}</p>
                </div>
              </div>
            </div>
          )}

          {/* 项目概述 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-primary mb-4">
              <FileText className="h-4 w-4" />
              <span className="font-medium">项目概述</span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">立项背景</p>
                <div className="mt-2 p-4 bg-amber-50 rounded-lg">
                  <p className="text-sm">{data.background}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">拟合作方基本情况</p>
                <div className="mt-2 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm">{data.partnerInfo}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">预期成果与目标</p>
                <div className="mt-2 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm whitespace-pre-line">{data.expectedOutcome}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 项目完成标准 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-primary mb-4">
              <FileText className="h-4 w-4" />
              <span className="font-medium">项目完成标准</span>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm whitespace-pre-line">{data.completionStandard}</p>
            </div>
          </div>

          {/* 经费预算 */}
          <div>
            <div className="flex items-center gap-2 text-primary mb-4">
              <Wallet className="h-4 w-4" />
              <span className="font-medium">经费预算</span>
            </div>

            {/* 基础预算 */}
            <div className="mb-6">
              <p className="text-sm font-medium text-primary mb-3">1. 基础预算</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">项目费用（元/生）</p>
                    <p className="text-sm font-medium mt-1">¥{data.costPerStudent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">预计学生人数</p>
                    <p className="text-sm font-medium mt-1">{data.budgetStudentCount}人</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">项目费用合计</p>
                    <p className="text-sm font-medium mt-1 text-primary">¥{data.totalCost.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 费用明细 */}
            <div className="mb-6">
              <p className="text-sm font-medium text-primary mb-3">2. 费用明细</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">2.1 项目费用包含项</p>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm whitespace-pre-line">{data.expenseIncludes}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">2.2 项目费用不包含项</p>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm whitespace-pre-line">{data.expenseExcludes}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 经费来源细分 */}
            <div className="mb-6">
              <p className="text-sm font-medium text-primary mb-3">3. 经费来源细分</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">3.1 申请学校经费</p>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">经费标准（元/生）</p>
                        <p className="text-sm font-medium mt-1">¥{data.schoolFundPerStudent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">人数</p>
                        <p className="text-sm font-medium mt-1">{data.schoolFundStudentCount}人</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">小计</p>
                        <p className="text-sm font-medium mt-1 text-primary">¥{data.schoolFundTotal.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">3.2 本单位配套经费</p>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">经费标准（元/生）</p>
                        <p className="text-sm font-medium mt-1">¥{data.unitFundPerStudent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">人数</p>
                        <p className="text-sm font-medium mt-1">{data.unitFundStudentCount}人</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">小计</p>
                        <p className="text-sm font-medium mt-1 text-primary">¥{data.unitFundTotal.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">3.3 学生自筹</p>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">经费标准（元/生）</p>
                        <p className="text-sm font-medium mt-1">¥{data.selfFundPerStudent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">人数</p>
                        <p className="text-sm font-medium mt-1">{data.selfFundStudentCount}人</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">小计</p>
                        <p className="text-sm font-medium mt-1 text-primary">¥{data.selfFundTotal.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">备注</p>
                        <p className="text-sm font-medium mt-1">学生个人承担，补充部分费用缺口</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 经费来源汇总 */}
            <div>
              <div className="flex items-center gap-2 text-primary mb-3">
                <Wallet className="h-4 w-4" />
                <span className="text-sm font-medium">经费来源汇总</span>
              </div>
              <div className="rounded-lg p-6 text-white" style={{ background: "linear-gradient(to right, #667eea, #764ba2)" }}>
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <p className="text-sm opacity-80">学校经费 + 单位配套 总计</p>
                    <p className="text-xl font-semibold mt-1">¥{publicFundTotal.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">学生自筹总计</p>
                    <p className="text-xl font-semibold mt-1">¥{data.selfFundTotal.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">项目总经费</p>
                    <p className="text-2xl font-bold mt-1">¥{data.totalCost.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* 经费来源比例 */}
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">经费来源比例（按公费部分）：</p>
                <div className="h-3 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-primary h-full" 
                    style={{ width: `${schoolFundPercent}%` }}
                  />
                  <div 
                    className="bg-green-500 h-full" 
                    style={{ width: `${unitFundPercent}%` }}
                  />
                </div>
                <div className="flex items-center gap-6 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-primary" />
                    <span className="text-xs text-muted-foreground">学校经费：{schoolFundPercent}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-green-500" />
                    <span className="text-xs text-muted-foreground">单位配套：{unitFundPercent}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
