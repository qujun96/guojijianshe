"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Calendar, 
  Users, 
  Link2,
  Building2,
  Wallet,
  Search,
  X,
  ChevronRight
} from "lucide-react"

// 模拟历史项目数据
const historyProjects = [
  {
    id: "HP001",
    name: "剑桥大学工程学暑期交流项目",
    leader: "张伟教授",
    applyTime: "2023-03-10",
    students: 25,
    status: "已完成",
  },
  {
    id: "HP002",
    name: "麻省理工联合培养计划",
    leader: "王芳副教授",
    applyTime: "2023-05-20",
    students: 15,
    status: "已完成",
  },
  {
    id: "HP003",
    name: "新加坡国立大学短期交流项目",
    leader: "李强教授",
    applyTime: "2023-09-15",
    students: 20,
    status: "进行中",
  },
]

export default function NewProjectApplicationPage() {
  const router = useRouter()
  
  // 基本信息
  const [projectName, setProjectName] = useState("")
  const [projectType, setProjectType] = useState("")
  const [projectLevel, setProjectLevel] = useState("部处/学院级项目")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [duration, setDuration] = useState(0)
  
  // 学生人数
  const [totalStudents, setTotalStudents] = useState("")
  const [undergraduateCount, setUndergraduateCount] = useState("")
  const [masterCount, setMasterCount] = useState("")
  const [doctorCount, setDoctorCount] = useState("")
  const [studentsUncertain, setStudentsUncertain] = useState(false)
  
  // 延续项目
  const [isContinuation, setIsContinuation] = useState(false)
  const [relatedProject, setRelatedProject] = useState<typeof historyProjects[0] | null>(null)
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false)
  const [historySearchKey, setHistorySearchKey] = useState("")
  
  // 项目概述
  const [background, setBackground] = useState("")
  const [partnerInfo, setPartnerInfo] = useState("")
  const [expectedOutcome, setExpectedOutcome] = useState("")
  const [completionStandard, setCompletionStandard] = useState("")
  
  // 联合申报单位
  const [hasJointUnit, setHasJointUnit] = useState(false)
  const [jointUnitName, setJointUnitName] = useState("")
  const [jointContactPerson, setJointContactPerson] = useState("")
  const [jointContactPosition, setJointContactPosition] = useState("")
  const [jointContactPhone, setJointContactPhone] = useState("")
  const [jointCooperationDesc, setJointCooperationDesc] = useState("")
  
  // 经费预算
  const [costPerStudent, setCostPerStudent] = useState("")
  const [budgetStudentCount, setBudgetStudentCount] = useState("") // 基础预算学生人数
  const [schoolFundPerStudent, setSchoolFundPerStudent] = useState("")
  const [schoolFundStudentCount, setSchoolFundStudentCount] = useState("") // 学校经费学生人数
  const [unitFundPerStudent, setUnitFundPerStudent] = useState("")
  const [unitFundStudentCount, setUnitFundStudentCount] = useState("") // 单位配套学生人数
  const [selfFundPerStudent, setSelfFundPerStudent] = useState("")
  const [selfFundStudentCount, setSelfFundStudentCount] = useState("") // 学生自筹人数
  const [expenseIncludes, setExpenseIncludes] = useState("1. 国际旅费：往返机票及境外市内交通\n2. 住宿费：项目期间的住宿费用\n3. 生活费：餐饮、交通等日常开销\n4. 注册费：项目注册及相关学费\n5. 保险费：境外意外医疗保险")
  const [expenseExcludes, setExpenseExcludes] = useState("1. 护照办理及签证申请费用\n2. 学生从所在地至出发口岸的往返交通费用\n3. 学生个人消费（如购物、娱乐等）\n4. 因个人原因导致的额外费用\n5. 行李超重费用")

  // 计算项目周期
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDuration(diffDays)
    }
  }, [startDate, endDate])

  // 计算费用 - 每个预算项使用各自独立的学生人数
  const budgetCount = parseInt(budgetStudentCount) || 0
  const schoolCount = parseInt(schoolFundStudentCount) || 0
  const unitCount = parseInt(unitFundStudentCount) || 0
  const selfCount = parseInt(selfFundStudentCount) || 0
  
  const totalCost = (parseFloat(costPerStudent) || 0) * budgetCount
  const schoolFundTotal = (parseFloat(schoolFundPerStudent) || 0) * schoolCount
  const unitFundTotal = (parseFloat(unitFundPerStudent) || 0) * unitCount
  const selfFundTotal = (parseFloat(selfFundPerStudent) || 0) * selfCount
  const publicFundTotal = schoolFundTotal + unitFundTotal
  const schoolFundPercent = publicFundTotal > 0 ? Math.round((schoolFundTotal / publicFundTotal) * 100) : 0
  const unitFundPercent = publicFundTotal > 0 ? 100 - schoolFundPercent : 0

  const handleSelectHistoryProject = (project: typeof historyProjects[0]) => {
    setRelatedProject(project)
    setHistoryDialogOpen(false)
  }

  const handleCancelRelation = () => {
    setRelatedProject(null)
    setIsContinuation(false)
  }

  const filteredHistoryProjects = historyProjects.filter(p => 
    p.name.toLowerCase().includes(historySearchKey.toLowerCase())
  )

  const handleSaveDraft = () => {
    // 保存草稿逻辑
    router.push("/admin/project-application")
  }

  const handleSubmit = () => {
    // 提交申报逻辑
    router.push("/admin/project-application")
  }

  return (
    <div className="space-y-4 pb-24">
      {/* 面包屑导航 */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>首页</span>
        <ChevronRight className="h-4 w-4" />
        <span>申报管理</span>
        <ChevronRight className="h-4 w-4" />
        <span>立项申报</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">新建申报</span>
      </div>

      <h1 className="text-xl font-semibold">新建项目立项申报</h1>

      {/* 模块1：项目基本信息 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              1
            </div>
            <h2 className="text-base font-semibold">项目基本信息</h2>
          </div>
          <div className="h-px bg-primary mb-6" />

          {/* 项目基础信息 */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary mb-4">
              <div className="w-1 h-4 bg-primary rounded" />
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">项目基础信息</span>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-primary">项目名称 <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="请输入项目名称" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-primary">项目类别 <span className="text-red-500">*</span></Label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择项目类别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exchange">交换生项目</SelectItem>
                    <SelectItem value="short">短期课程项目</SelectItem>
                    <SelectItem value="summer">暑期学校项目</SelectItem>
                    <SelectItem value="joint">联合培养项目</SelectItem>
                    <SelectItem value="competition">国际竞赛</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-primary">项目级别 <span className="text-red-500">*</span></Label>
                <Input 
                  value={projectLevel} 
                  disabled 
                  className="bg-muted"
                />
              </div>
            </div>

            {/* 项目时间安排 */}
            <div className="flex items-center gap-2 text-primary mt-8 mb-4">
              <div className="w-1 h-4 bg-primary rounded" />
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">项目时间安排</span>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-primary">开始时间 <span className="text-red-500">*</span></Label>
                <Input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-primary">结束时间 <span className="text-red-500">*</span></Label>
                <Input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-primary">项目周期 <span className="text-red-500">*</span></Label>
                <Input 
                  value={duration > 0 ? `${duration}天` : ""} 
                  disabled 
                  className="bg-muted"
                />
              </div>
            </div>

            {/* 拟选派学生人数 */}
            <div className="flex items-center gap-2 text-primary mt-8 mb-4">
              <div className="w-1 h-4 bg-primary rounded" />
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">拟选派学生人数</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-primary">拟选派学生总人数 <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="请输入拟选派学生总人数" 
                  value={totalStudents}
                  onChange={(e) => setTotalStudents(e.target.value)}
                  disabled={studentsUncertain}
                />
              </div>

              <Card className="bg-muted/30">
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">分类人数统计（可选）</p>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-primary">计划本科生人数</Label>
                      <Input 
                        placeholder="本科生人数" 
                        value={undergraduateCount}
                        onChange={(e) => setUndergraduateCount(e.target.value)}
                        disabled={studentsUncertain}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-primary">计划硕研人数</Label>
                      <Input 
                        placeholder="硕研人数" 
                        value={masterCount}
                        onChange={(e) => setMasterCount(e.target.value)}
                        disabled={studentsUncertain}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-primary">计划博研人数</Label>
                      <Input 
                        placeholder="博研人数" 
                        value={doctorCount}
                        onChange={(e) => setDoctorCount(e.target.value)}
                        disabled={studentsUncertain}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="uncertain" 
                  checked={studentsUncertain}
                  onCheckedChange={(checked) => setStudentsUncertain(checked as boolean)}
                />
                <label htmlFor="uncertain" className="text-sm font-medium leading-none">
                  人数完全不确定（无需填写具体人数）
                </label>
              </div>
            </div>

            {/* 延续项目关联 */}
            <div className="flex items-center gap-2 text-primary mt-8 mb-4">
              <div className="w-1 h-4 bg-primary rounded" />
              <Link2 className="h-4 w-4" />
              <span className="text-sm font-medium">延续项目关联</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-primary">是否为延续项目 <span className="text-red-500">*</span></Label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="continuation" 
                      checked={!isContinuation}
                      onChange={() => setIsContinuation(false)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm">否 - 新建项目</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="continuation" 
                      checked={isContinuation}
                      onChange={() => {
                        setIsContinuation(true)
                        setHistoryDialogOpen(true)
                      }}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm">是 - 延续已有项目</span>
                  </label>
                </div>
              </div>

              {isContinuation && relatedProject && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 text-primary mb-4">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm font-medium">已关联历史项目信息</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-primary mb-1">历史项目名称</p>
                        <p className="text-sm font-medium">{relatedProject.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-primary mb-1">原项目负责人</p>
                        <p className="text-sm font-medium">{relatedProject.leader}</p>
                      </div>
                      <div>
                        <p className="text-xs text-primary mb-1">原申报时间</p>
                        <p className="text-sm font-medium">{relatedProject.applyTime}</p>
                      </div>
                      <div>
                        <p className="text-xs text-primary mb-1">原项目���生人数</p>
                        <p className="text-sm font-medium">{relatedProject.students}人</p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" onClick={handleCancelRelation}>
                        <X className="h-4 w-4 mr-1" />
                        取消关联
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 模块2：联合申报单位信息 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              2
            </div>
            <h2 className="text-base font-semibold">联合申报单位信息</h2>
          </div>
          <div className="h-px bg-primary mb-6" />

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-foreground font-medium">是否有联合申报单位</Label>
              <Select value={hasJointUnit ? "yes" : "no"} onValueChange={(v) => setHasJointUnit(v === "yes")}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">否</SelectItem>
                  <SelectItem value="yes">是</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hasJointUnit && (
              <Card className="bg-muted/30">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Building2 className="h-4 w-4" />
                      <span className="text-sm font-medium">联合申报单位信息填写</span>
                    </div>
                    <span className="text-xs text-muted-foreground">必填</span>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-primary">联合申报单位名称 <span className="text-red-500">*</span></Label>
                      <Input 
                        placeholder="请输入联合申报单位全称" 
                        value={jointUnitName}
                        onChange={(e) => setJointUnitName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-primary">单位联系人 <span className="text-red-500">*</span></Label>
                      <Input 
                        placeholder="请输入联系人姓名" 
                        value={jointContactPerson}
                        onChange={(e) => setJointContactPerson(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-primary">联系人职务 <span className="text-red-500">*</span></Label>
                      <Input 
                        placeholder="请输入联系人职务" 
                        value={jointContactPosition}
                        onChange={(e) => setJointContactPosition(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-primary">联系电话 <span className="text-red-500">*</span></Label>
                      <Input 
                        placeholder="请输入联系电话" 
                        value={jointContactPhone}
                        onChange={(e) => setJointContactPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label className="text-primary">合作内容/分工说明 <span className="text-red-500">*</span></Label>
                    <Textarea 
                      placeholder="请描述合作内容及分工" 
                      rows={3}
                      value={jointCooperationDesc}
                      onChange={(e) => setJointCooperationDesc(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 模块3：项目概述 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              3
            </div>
            <h2 className="text-base font-semibold">项目概述</h2>
          </div>
          <div className="h-px bg-primary mb-6" />

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-foreground font-medium">立项背景</Label>
              <Textarea 
                placeholder="请详细描述项目立项的背景、意义和必要性" 
                rows={4}
                value={background}
                onChange={(e) => setBackground(e.target.value)}
              />
              <p className="text-xs text-primary">包括项目的政策背景、国内外现状、实施的必要性等</p>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-medium">拟合作方基本情况</Label>
              <Textarea 
                placeholder="请详细描述拟合作单位的基本情况及合作优势" 
                rows={4}
                value={partnerInfo}
                onChange={(e) => setPartnerInfo(e.target.value)}
              />
              <p className="text-xs text-primary">包括合作方的学术地位、研究实力、合作历史、合作优势等</p>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-medium">预期成果与目标</Label>
              <Textarea 
                placeholder="请描述项目预期达成的成果和目标" 
                rows={4}
                value={expectedOutcome}
                onChange={(e) => setExpectedOutcome(e.target.value)}
              />
              <p className="text-xs text-primary">包括人才培养目标、学术成果预期、合作交流目标等可量化指标</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 模块4：项目完成标准 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              4
            </div>
            <h2 className="text-base font-semibold">项目完成标准</h2>
          </div>
          <div className="h-px bg-primary mb-6" />

          <div className="space-y-2">
            <Label className="text-foreground font-medium">完成标准</Label>
            <Textarea 
              placeholder="请明确项目完成的考核标准和指标" 
              rows={4}
              value={completionStandard}
              onChange={(e) => setCompletionStandard(e.target.value)}
            />
            <p className="text-xs text-primary">请量化完成指标，如：发表论文数量、参与人数、培训人次等</p>
          </div>
        </CardContent>
      </Card>

      {/* 模块5：经费预算 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              5
            </div>
            <h2 className="text-base font-semibold">经费预算、申请单位承诺、意见</h2>
          </div>
          <div className="h-px bg-primary mb-6" />

          <div className="space-y-6">
            {/* 基础预算 */}
            <div className="flex items-center gap-2 text-primary mb-4">
              <div className="w-1 h-4 bg-primary rounded" />
              <span className="text-sm font-medium">基础预算</span>
            </div>

            <div className="flex items-center gap-4">
              <Label className="text-foreground whitespace-nowrap">项目费用</Label>
              <Input 
                className="w-32" 
                type="number"
                placeholder="20000"
                value={costPerStudent}
                onChange={(e) => setCostPerStudent(e.target.value)}
              />
              <span className="text-muted-foreground">元/生</span>
              <span className="text-muted-foreground">，预计</span>
              <Input 
                className="w-24" 
                type="number"
                placeholder="30"
                value={budgetStudentCount}
                onChange={(e) => setBudgetStudentCount(e.target.value)}
              />
              <span className="text-muted-foreground">名学生，共计</span>
              <Input 
                className="w-32 bg-blue-50 text-primary font-medium" 
                value={totalCost.toLocaleString()} 
                disabled 
              />
              <span className="text-muted-foreground">元</span>
            </div>
            <p className="text-xs text-amber-600 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
              项目费用为每位学生的平均费用标准，总费用将根据学生人数自动计算
            </p>

            {/* 费用明细 */}
            <div className="flex items-center gap-2 text-primary mt-8 mb-4">
              <div className="w-1 h-4 bg-primary rounded" />
              <span className="text-sm font-medium">费用明细</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground font-medium">2.1 项目费用包含项</Label>
                <Textarea 
                  rows={5}
                  value={expenseIncludes}
                  onChange={(e) => setExpenseIncludes(e.target.value)}
                  className="bg-muted/30"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground font-medium">2.2 项目费用不包含项</Label>
                <Textarea 
                  rows={5}
                  value={expenseExcludes}
                  onChange={(e) => setExpenseExcludes(e.target.value)}
                  className="bg-muted/30"
                />
              </div>
            </div>

            {/* 经费来源细分 */}
            <div className="flex items-center gap-2 text-primary mt-8 mb-4">
              <div className="w-1 h-4 bg-primary rounded" />
              <span className="text-sm font-medium">经费来源细分</span>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium mb-2">3.1 申请学校经费</p>
                <div className="flex items-center gap-4">
                  <Label className="text-foreground whitespace-nowrap">申请学校经费</Label>
                  <Input 
                    className="w-32" 
                    type="number"
                    placeholder="20000"
                    value={schoolFundPerStudent}
                    onChange={(e) => setSchoolFundPerStudent(e.target.value)}
                  />
                  <span className="text-muted-foreground">元/生</span>
                  <span className="text-muted-foreground">，预计</span>
                  <Input 
                    className="w-24" 
                    type="number"
                    placeholder="30"
                    value={schoolFundStudentCount}
                    onChange={(e) => setSchoolFundStudentCount(e.target.value)}
                  />
                  <span className="text-muted-foreground">名学生，共计</span>
                  <Input 
                    className="w-32 bg-blue-50 text-primary font-medium" 
                    value={schoolFundTotal.toLocaleString()} 
                    disabled 
                  />
                  <span className="text-muted-foreground">元</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">3.2 本单位配套经费</p>
                <div className="flex items-center gap-4">
                  <Label className="text-foreground whitespace-nowrap">本单位配套经费</Label>
                  <Input 
                    className="w-32" 
                    type="number"
                    placeholder="8000"
                    value={unitFundPerStudent}
                    onChange={(e) => setUnitFundPerStudent(e.target.value)}
                  />
                  <span className="text-muted-foreground">元/生</span>
                  <span className="text-muted-foreground">，预计</span>
                  <Input 
                    className="w-24" 
                    type="number"
                    placeholder="30"
                    value={unitFundStudentCount}
                    onChange={(e) => setUnitFundStudentCount(e.target.value)}
                  />
                  <span className="text-muted-foreground">名学生，共计</span>
                  <Input 
                    className="w-32 bg-blue-50 text-primary font-medium" 
                    value={unitFundTotal.toLocaleString()} 
                    disabled 
                  />
                  <span className="text-muted-foreground">元</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">3.3 其他：学生自筹</p>
                <div className="flex items-center gap-4">
                  <Label className="text-foreground whitespace-nowrap">学生自筹</Label>
                  <Input 
                    className="w-32" 
                    type="number"
                    placeholder="4500"
                    value={selfFundPerStudent}
                    onChange={(e) => setSelfFundPerStudent(e.target.value)}
                  />
                  <span className="text-muted-foreground">元/生</span>
                  <span className="text-muted-foreground">，预计</span>
                  <Input 
                    className="w-24" 
                    type="number"
                    placeholder="30"
                    value={selfFundStudentCount}
                    onChange={(e) => setSelfFundStudentCount(e.target.value)}
                  />
                  <span className="text-muted-foreground">名学生，共计</span>
                  <Input 
                    className="w-32 bg-blue-50 text-primary font-medium" 
                    value={selfFundTotal.toLocaleString()} 
                    disabled 
                  />
                  <span className="text-muted-foreground">元</span>
                </div>
                <p className="text-xs text-primary mt-2">备注：学生自筹部分由学生个人承担，用于补充部分费用缺口</p>
              </div>
            </div>

            {/* 费用汇总 */}
            <div className="flex items-center gap-2 text-primary mt-8 mb-4">
              <div className="w-1 h-4 bg-primary rounded" />
              <Wallet className="h-4 w-4" />
              <span className="text-sm font-medium">费用汇总</span>
            </div>

            <Card className="bg-muted/30">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm">学校经费 + 单位配套经费 总计</span>
                  <span className="text-primary font-medium">¥{publicFundTotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm">学生自筹总计</span>
                  <span className="text-primary font-medium">¥{selfFundTotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-dashed mt-2 pt-4">
                  <span className="text-sm font-semibold">项目总经费</span>
                  <span className="text-primary font-bold text-lg">¥{totalCost.toLocaleString()}</span>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-2">经费来源比例（按公费部分）：</p>
                  <div className="h-3 rounded-full bg-muted overflow-hidden flex">
                    <div 
                      className="h-full bg-primary transition-all" 
                      style={{ width: `${schoolFundPercent}%` }}
                    />
                    <div 
                      className="h-full bg-green-500 transition-all" 
                      style={{ width: `${unitFundPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      学校经费：{schoolFundPercent}%
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      单位配套：{unitFundPercent}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-56 right-0 bg-background border-t p-4 flex justify-end gap-3 z-10">
        <Button variant="outline" onClick={() => router.back()}>
          取消
        </Button>
        <Button variant="outline" onClick={handleSaveDraft}>
          保存草稿
        </Button>
        <Button onClick={handleSubmit}>
          提交申报
        </Button>
      </div>

      {/* 历史项目选择弹窗 */}
      <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              查询历史申报项目
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label className="whitespace-nowrap">搜索历史项目</Label>
              <Input 
                placeholder="请输入项目名称关键词..." 
                value={historySearchKey}
                onChange={(e) => setHistorySearchKey(e.target.value)}
                className="flex-1"
              />
              <Button>
                <Search className="h-4 w-4 mr-1" />
                搜索
              </Button>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">可关联的历史项目（点击选择）</p>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {filteredHistoryProjects.map((project) => (
                  <Card key={project.id} className="hover:border-primary cursor-pointer transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h4 className="text-primary font-medium">{project.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              项目负责人：{project.leader}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              申报时间：{project.applyTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              原学生人数：{project.students}人
                            </span>
                          </div>
                          <Badge className={project.status === "已完成" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}>
                            {project.status}
                          </Badge>
                        </div>
                        <Button size="sm" onClick={() => handleSelectHistoryProject(project)}>
                          选择
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setHistoryDialogOpen(false)}>
              取消
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
