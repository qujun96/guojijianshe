"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AIAssistantPanel,
  AIScoreCard,
  AIRecommendation,
  AISuggestion,
} from "@/components/ai/ai-assistant-panel"
import { AIPolishButton } from "@/components/ai/ai-polish-panel"
import { ArrowLeft, Calendar, Sparkles, FileText, Settings, ChevronDown, Save, Search, Users, Building2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// 已通过审核的立项申报项目（模拟数据）
const approvedApplications = [
  {
    id: "PA202403001",
    projectName: "剑桥大学工程学暑期交流项目",
    applyUnit: "电气工程学院",
    applicant: "张伟教授",
    applyTime: "2024-03-15",
    startDate: "2024-07-01",
    endDate: "2024-07-30",
    totalStudents: 30,
    totalCost: 975000,
  },
  {
    id: "PA202403002",
    projectName: "牛津大学人工智能研修班",
    applyUnit: "信息工程学院",
    applicant: "陈明教授",
    applyTime: "2024-03-14",
    startDate: "2024-08-01",
    endDate: "2024-08-25",
    totalStudents: 25,
    totalCost: 850000,
  },
  {
    id: "PA202403003",
    projectName: "哈佛大学经济管理项目",
    applyUnit: "管理学院",
    applicant: "刘芳副教授",
    applyTime: "2024-03-13",
    startDate: "2024-07-15",
    endDate: "2024-08-15",
    totalStudents: 20,
    totalCost: 720000,
  },
]
export default function ProjectEditPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState<"basic" | "rules">("basic")
  
  // 预填充现有数据
  const [projectName, setProjectName] = useState("韩国忠南大学奖学金交换生项目(2026)")
  const [projectIntro, setProjectIntro] = useState("韩国忠南大学奖学金交换生项目是我校与韩国忠南大学合作开展的交换生项目。该项目为期一个学期，学生可在韩国忠南大学选修课程，获得的学分可按规定进行转换。项目提供部分奖学金资助，包括学费减免和生活补贴。")
  const [projectType, setProjectType] = useState("exchange")
  const [projectLevel, setProjectLevel] = useState("national") // 项目级别
  const [duration, setDuration] = useState("long")
  const [applyMethod, setApplyMethod] = useState("online")
  const [isTop200, setIsTop200] = useState("yes")
  const [applyTarget, setApplyTarget] = useState("both")
  
  // 时间安排
  const [startDate, setStartDate] = useState("2026-09-01")
  const [endDate, setEndDate] = useState("2027-01-15")
  const [applyDeadline, setApplyDeadline] = useState("2026-05-10T09:55")
  
  // 关联立项申报弹窗
  const [showApplicationDialog, setShowApplicationDialog] = useState(false)
  const [applicationSearchKeyword, setApplicationSearchKeyword] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<typeof approvedApplications[0] | null>(null)
  
  // 筛选已通过审核的立项申报
  const filteredApplications = approvedApplications.filter(app => 
    app.projectName.includes(applicationSearchKeyword) || 
    app.applyUnit.includes(applicationSearchKeyword)
  )
  
  // 选择立项申报项目
  const handleSelectApplication = (app: typeof approvedApplications[0]) => {
    setSelectedApplication(app)
    setProjectName(app.projectName)
    setStartDate(app.startDate)
    setEndDate(app.endDate)
    setShowApplicationDialog(false)
  }
  
  // 处理项目级别变化
  const handleProjectLevelChange = (value: string) => {
    setProjectLevel(value)
    if (value === "department") {
      setShowApplicationDialog(true)
    } else {
      setSelectedApplication(null)
    }
  }
  
  const [gpaEnabled, setGpaEnabled] = useState(true)
  const [gpaThreshold, setGpaThreshold] = useState("3.0")
  const [rankEnabled, setRankEnabled] = useState(true)
  const [rankThreshold, setRankThreshold] = useState("30")
  const [cet4Enabled, setCet4Enabled] = useState(true)
  const [cetLevel, setCetLevel] = useState("4")

  const handleAIPolish = () => {
    setProjectIntro(projectIntro + "\n\n【AI优化】参与本项目的学生将有机会深入体验韩国文化，提升国际视野，为未来职业发展奠定坚实基础。")
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        <Card>
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2 flex-1">
                <FileText className="h-5 w-5 text-primary" />
                <h1 className="text-lg font-semibold">编辑项目</h1>
                <span className="text-sm text-muted-foreground">PRJ-{params.id}-2026</span>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b mb-6">
              <div className="flex gap-8">
                <button
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === "basic" 
                      ? "border-primary text-primary" 
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveTab("basic")}
                >
                  <FileText className="h-4 w-4" />
                  项目基础信息
                </button>
                <button
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === "rules" 
                      ? "border-primary text-primary" 
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveTab("rules")}
                >
                  <Settings className="h-4 w-4" />
                  预审规则配置
                </button>
              </div>
            </div>

            {activeTab === "basic" && (
              <div className="space-y-6">
                <section className="space-y-4">
                  <h2 className="font-medium text-sm text-muted-foreground">项目基础信息</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="projectName">
                      <span className="text-destructive">*</span> 项目名称
                    </Label>
                    <Input 
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="projectIntro">项目介绍</Label>
                      <AIPolishButton
                        text={projectIntro}
                        fieldType="projectIntro"
                        onPolishComplete={(newText, mode) => {
                          if (mode === "replace") {
                            setProjectIntro(newText)
                          } else {
                            setProjectIntro(projectIntro + "\n\n" + newText)
                          }
                        }}
                      />
                    </div>
                    <Textarea 
                      id="projectIntro"
                      className="min-h-[120px]"
                      value={projectIntro}
                      onChange={(e) => setProjectIntro(e.target.value)}
                    />
                    <div className="text-right text-xs text-muted-foreground">{projectIntro.length}/1000</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>
                        <span className="text-destructive">*</span> 项目类别
                      </Label>
                      <Select value={projectType} onValueChange={setProjectType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="exchange">交换生项目</SelectItem>
                          <SelectItem value="shortterm">短期课程项目</SelectItem>
                          <SelectItem value="competition">国际竞赛</SelectItem>
                          <SelectItem value="internship">海外实习</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>
                        <span className="text-destructive">*</span> 项目级别
                      </Label>
                      <Select value={projectLevel} onValueChange={handleProjectLevelChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="请选择项目级别" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="department">处部/学院级项目</SelectItem>
                          <SelectItem value="national">国家/校级项目</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* 已关联的立项申报信息 */}
                  {selectedApplication && projectLevel === "department" && (
                    <Card className="bg-blue-50/50 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-primary">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm font-medium">已关联立项申报</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs"
                            onClick={() => setShowApplicationDialog(true)}
                          >
                            更换
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">项目名称：</span>
                            <span className="text-primary font-medium">{selectedApplication.projectName}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">申报单位：</span>
                            <span>{selectedApplication.applyUnit}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">申报人：</span>
                            <span>{selectedApplication.applicant}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">预算金额：</span>
                            <span className="text-primary">¥{selectedApplication.totalCost.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>
                        <span className="text-destructive">*</span> 项目时长
                      </Label>
                      <div className="flex gap-2">
                        <Button 
                          variant={duration === "short" ? "default" : "outline"}
                          onClick={() => setDuration("short")}
                          className="flex-1"
                        >
                          小于三个月
                        </Button>
                        <Button 
                          variant={duration === "long" ? "default" : "outline"}
                          onClick={() => setDuration("long")}
                          className="flex-1"
                        >
                          三个月及以上
                        </Button>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="font-medium text-sm text-muted-foreground">时间安排</h2>
                  {selectedApplication && projectLevel === "department" && (
                    <p className="text-xs text-primary">* 已从关联的立项申报中自动填充时间信息</p>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>
                        <span className="text-destructive">*</span> 派出时间
                      </Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Input 
                            type="date" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                        <div className="relative flex-1">
                          <Input 
                            type="date" 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>
                        <span className="text-destructive">*</span> 报名截止时间
                      </Label>
                      <div className="relative">
                        <Input 
                          type="datetime-local" 
                          value={applyDeadline}
                          onChange={(e) => setApplyDeadline(e.target.value)}
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="font-medium text-sm text-muted-foreground">申请设置</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>
                        <span className="text-destructive">*</span> 申请方式
                      </Label>
                      <div className="flex gap-2">
                        <Button 
                          variant={applyMethod === "online" ? "default" : "outline"}
                          onClick={() => setApplyMethod("online")}
                          className="flex-1"
                        >
                          线上
                        </Button>
                        <Button 
                          variant={applyMethod === "offline" ? "default" : "outline"}
                          onClick={() => setApplyMethod("offline")}
                          className="flex-1"
                        >
                          线下
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>是否为200强院校</Label>
                      <div className="flex gap-2">
                        <Button 
                          variant={isTop200 === "yes" ? "default" : "outline"}
                          onClick={() => setIsTop200("yes")}
                          className="flex-1"
                        >
                          是
                        </Button>
                        <Button 
                          variant={isTop200 === "no" ? "default" : "outline"}
                          onClick={() => setIsTop200("no")}
                          className="flex-1"
                        >
                          否
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>
                      <span className="text-destructive">*</span> 申请对象
                    </Label>
                    <Select value={applyTarget} onValueChange={setApplyTarget}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="undergrad">本科生</SelectItem>
                        <SelectItem value="grad">研究生</SelectItem>
                        <SelectItem value="both">本科生、研究生</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </section>

                <div className="flex justify-center gap-4 pt-4">
                  <Button className="min-w-[120px] gap-2">
                    <Save className="h-4 w-4" />
                    保存修改
                  </Button>
                  <Button variant="outline" className="min-w-[120px]" onClick={() => router.back()}>取消</Button>
                </div>
              </div>
            )}

            {activeTab === "rules" && (
              <div className="space-y-6">
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <h2 className="font-medium">学业成绩要求</h2>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div className="space-y-4 pl-2 border-l-2 border-muted">
                    <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          id="gpa" 
                          checked={gpaEnabled}
                          onCheckedChange={(checked) => setGpaEnabled(checked === true)}
                        />
                        <div className="space-y-1 flex-1">
                          <Label htmlFor="gpa" className="font-medium cursor-pointer">GPA门槛要求</Label>
                          <p className="text-xs text-muted-foreground">学生平均学分绩点必须达到指定标准</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm">GPA ≥</span>
                            <Input 
                              className="w-20 h-8" 
                              value={gpaThreshold}
                              onChange={(e) => setGpaThreshold(e.target.value)}
                              disabled={!gpaEnabled}
                            />
                            <span className="text-sm text-muted-foreground">(4分制)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          id="rank"
                          checked={rankEnabled}
                          onCheckedChange={(checked) => setRankEnabled(checked === true)}
                        />
                        <div className="space-y-1 flex-1">
                          <Label htmlFor="rank" className="font-medium cursor-pointer">专业成绩排名要求</Label>
                          <p className="text-xs text-muted-foreground">限制综合排名前百分之多少的学生可以申请</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm">排名前</span>
                            <Input 
                              className="w-20 h-8"
                              value={rankThreshold}
                              onChange={(e) => setRankThreshold(e.target.value)}
                              disabled={!rankEnabled}
                            />
                            <span className="text-sm">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <h2 className="font-medium">语言成绩要求</h2>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div className="space-y-4 pl-2 border-l-2 border-muted">
                    <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          id="cet"
                          checked={cet4Enabled}
                          onCheckedChange={(checked) => setCet4Enabled(checked === true)}
                        />
                        <div className="space-y-1 flex-1">
                          <Label htmlFor="cet" className="font-medium cursor-pointer">CET-4/6级要求</Label>
                          <p className="text-xs text-muted-foreground">必须通过英语4级或6级考试</p>
                          <Select value={cetLevel} onValueChange={setCetLevel} disabled={!cet4Enabled}>
                            <SelectTrigger className="w-40 h-8 mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="4">必须通过4级</SelectItem>
                              <SelectItem value="6">必须通过6级</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="flex justify-center gap-4 pt-4">
                  <Button className="min-w-[120px] gap-2">
                    <Save className="h-4 w-4" />
                    保存配置
                  </Button>
                  <Button variant="outline" className="min-w-[120px]" onClick={() => setActiveTab("basic")}>返回基础信息</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI智能助手" subtitle="辅助您优化项目信息">
        <AIScoreCard score={85} label="信息完整度" color="success" />
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium">修改建议</h4>
          <AISuggestion
            title="项目介绍优化"
            description="建议增加更多关于奖学金金额和申请条件的详细说明"
            onApply={handleAIPolish}
          />
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">类似项目参考</h4>
          <AIRecommendation
            title="2025韩国延世大学项目"
            stats={[
              { label: "报名", value: "45人" },
              { label: "通过率", value: "82%" }
            ]}
          />
        </div>
      </AIAssistantPanel>

      {/* 选择立项申报弹窗 */}
      <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              查询已通过审核的立项申报
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="请输入项目名称或申报单位关键词..."
                  className="pl-9"
                  value={applicationSearchKeyword}
                  onChange={(e) => setApplicationSearchKeyword(e.target.value)}
                />
              </div>
              <Button>
                <Search className="h-4 w-4 mr-1" />
                搜索
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              可关联的立项申报（点击选择）
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {filteredApplications.map((app) => (
                <Card 
                  key={app.id} 
                  className={`cursor-pointer transition-colors hover:border-primary ${
                    selectedApplication?.id === app.id ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => handleSelectApplication(app)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-primary">{app.projectName}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3.5 w-3.5" />
                            {app.applyUnit}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {app.applicant}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            申报时间：{app.applyTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span>
                            派出时间：<span className="text-primary">{app.startDate}</span> 至 <span className="text-primary">{app.endDate}</span>
                          </span>
                          <span>
                            预计人数：<span className="font-medium">{app.totalStudents}人</span>
                          </span>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        variant={selectedApplication?.id === app.id ? "default" : "outline"}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectApplication(app)
                        }}
                      >
                        选择
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredApplications.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  没有找到匹配的立项申报项目
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <Button variant="outline" onClick={() => setShowApplicationDialog(false)}>
                取消
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
