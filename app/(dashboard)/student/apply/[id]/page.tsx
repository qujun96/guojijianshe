"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AIAssistantPanel } from "@/components/ai/ai-assistant-panel"
import { AIPolishButton } from "@/components/ai/ai-polish-panel"
import { 
  ArrowLeft, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  User,
  FileText,
  Languages,
  Award,
  GraduationCap,
  Briefcase,
  FileCheck
} from "lucide-react"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function ApplicationFormPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formProgress, setFormProgress] = useState(15)
  const [isGeneratingStudyPlan, setIsGeneratingStudyPlan] = useState(false)
  
  // 文本输入状态
  const [healthStatus, setHealthStatus] = useState("")
  const [overseasExperience, setOverseasExperience] = useState("")
  const [awards, setAwards] = useState("")
  const [politicalPerformance, setPoliticalPerformance] = useState("")
  const [studyPlan, setStudyPlan] = useState("")
  const [declaration, setDeclaration] = useState("")

  const handlePolishComplete = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    currentValue: string
  ) => (newText: string, mode: "replace" | "append") => {
    if (mode === "replace") {
      setter(newText)
    } else {
      setter(currentValue + "\n\n" + newText)
    }
  }

  const steps = [
    { id: 1, label: "基础信息", icon: User },
    { id: 2, label: "证件信息", icon: FileText },
    { id: 3, label: "外语水平", icon: Languages },
    { id: 4, label: "学术成绩", icon: GraduationCap },
    { id: 5, label: "研究成果", icon: Award },
    { id: 6, label: "研修计划", icon: Briefcase },
    { id: 7, label: "附件材料", icon: FileCheck },
  ]

  const handleGenerateStudyPlan = () => {
    setIsGeneratingStudyPlan(true)
    setTimeout(() => {
      setIsGeneratingStudyPlan(false)
    }, 2000)
  }

  const handleAutoFill = () => {
    // Simulate auto-fill
  }

  const completionStatus = [
    { label: "基础信息", status: "completed" },
    { label: "外语证明", status: "verified" },
    { label: "研修计划", status: "pending" },
    { label: "课程学分", status: "pending" },
    { label: "附件材料", status: "pending" },
  ]

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/student/apply">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              返回
            </Button>
          </Link>
          <div className="flex-1">
            <Badge variant="outline" className="mb-2">项目申请</Badge>
            <h1 className="text-lg font-semibold">2026年《中美人才培养计划》1+2+1双学位项目</h1>
          </div>
        </div>

        {/* Step Progress */}
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = step.id === currentStep
                const isCompleted = step.id < currentStep
                return (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => setCurrentStep(step.id)}
                      className={`flex flex-col items-center gap-1 transition-colors ${
                        isActive ? "text-primary" : isCompleted ? "text-green-500" : "text-muted-foreground"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isActive ? "bg-primary text-white" : 
                        isCompleted ? "bg-green-100 text-green-600" : "bg-muted"
                      }`}>
                        {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                      </div>
                      <span className="text-xs">{step.label}</span>
                    </button>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-0.5 mx-2 ${
                        step.id < currentStep ? "bg-green-500" : "bg-muted"
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card>
          <CardContent className="py-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-base font-medium flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  1. 基础信息
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>姓名 *</Label>
                    <Input defaultValue="张五" disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>性别 *</Label>
                    <Select defaultValue="male">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">男</SelectItem>
                        <SelectItem value="female">女</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>出生日期 *</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>学院 *</Label>
                    <Input defaultValue="美视电影学院" disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>学号 *</Label>
                    <Input defaultValue="20220101001" disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>学生类别 *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="undergraduate">本科生</SelectItem>
                        <SelectItem value="master">硕士研究生</SelectItem>
                        <SelectItem value="phd">博士研究生</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>年级 *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">大一/研一</SelectItem>
                        <SelectItem value="2">大二/研二</SelectItem>
                        <SelectItem value="3">大三/研三</SelectItem>
                        <SelectItem value="4">大四</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>政治面貌 *</Label>
                    <Input placeholder="请输入政治面貌" />
                  </div>
                  <div className="space-y-2">
                    <Label>联系电话 *</Label>
                    <Input placeholder="请输入联系电话" />
                  </div>
                  <div className="space-y-2">
                    <Label>邮箱 *</Label>
                    <Input type="email" placeholder="请输入邮箱" />
                  </div>
                  <div className="space-y-2">
                    <Label>专业 *</Label>
                    <Input placeholder="请输入专业" />
                  </div>
                  <div className="space-y-2">
                    <Label>校内导师 *</Label>
                    <Input placeholder="请输入导师姓名" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>国（境）外院系及专业 *</Label>
                    <Input placeholder="请输入" />
                  </div>
                  <div className="space-y-2">
                    <Label>拟选国（境）外学校导师</Label>
                    <Input placeholder="请输入" />
                  </div>
                </div>

                <h3 className="text-base font-medium flex items-center gap-2 pt-4 border-t">
                  <FileText className="h-5 w-5 text-primary" />
                  2. 健康与证件信息
                </h3>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    健康状况 *
                    <AIPolishButton
                      text={healthStatus}
                      fieldType="healthStatus"
                      onPolishComplete={handlePolishComplete(setHealthStatus, healthStatus)}
                    />
                  </Label>
                  <Textarea 
                    placeholder="请描述您的健康状况" 
                    rows={3}
                    value={healthStatus}
                    onChange={(e) => setHealthStatus(e.target.value)}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-base font-medium flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  证件信息
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>身份证号码 *</Label>
                    <Input placeholder="请输入" />
                  </div>
                  <div className="space-y-2">
                    <Label>签发地 *</Label>
                    <Input placeholder="请输入" />
                  </div>
                  <div className="space-y-2">
                    <Label>有效期 *</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>港澳台通行证号码</Label>
                    <Input placeholder="请输入" />
                  </div>
                  <div className="space-y-2">
                    <Label>签发地</Label>
                    <Input placeholder="请输入" />
                  </div>
                  <div className="space-y-2">
                    <Label>有效期</Label>
                    <Input type="date" />
                  </div>
                </div>

                <h4 className="text-sm font-medium pt-4">紧急联系人信息</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>紧急联系人1 *</Label>
                    <Input placeholder="请输入" />
                  </div>
                  <div className="space-y-2">
                    <Label>与本人关系 *</Label>
                    <Input placeholder="请输入" />
                  </div>
                  <div className="space-y-2">
                    <Label>联系电话 *</Label>
                    <Input placeholder="请输入" />
                  </div>
                  <div className="space-y-2">
                    <Label>紧急联系人2</Label>
                    <Input placeholder="请输入" />
                  </div>
                  <div className="space-y-2">
                    <Label>与本人关系</Label>
                    <Input placeholder="请输入" />
                  </div>
                  <div className="space-y-2">
                    <Label>联系电话</Label>
                    <Input placeholder="请输入" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-base font-medium flex items-center gap-2">
                  <Languages className="h-5 w-5 text-primary" />
                  外语水平与证明
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>CET-4</Label>
                    <Input placeholder="请输入分数" />
                  </div>
                  <div className="space-y-2">
                    <Label>CET-6</Label>
                    <Input placeholder="请输入分数" />
                  </div>
                  <div className="space-y-2">
                    <Label>TOEFL</Label>
                    <Input placeholder="请输入分数" />
                  </div>
                  <div className="space-y-2">
                    <Label>IELTS</Label>
                    <Input placeholder="请输入分数" />
                  </div>
                  <div className="space-y-2">
                    <Label>GRE</Label>
                    <Input placeholder="请输入分数" />
                  </div>
                  <div className="space-y-2">
                    <Label>其他</Label>
                    <Input placeholder="请输入" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>外语水平证明材料</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">点击或拖拽文件上传</p>
                    <p className="text-xs text-muted-foreground mt-1">支持 PDF、JPG、PNG 格式，单个文件不超过 10MB</p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-base font-medium flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  学术成绩
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>是否同意调剂 *</Label>
                    <RadioGroup defaultValue="yes" className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes">是</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no">否</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label>GPA（4分制）*</Label>
                    <Input placeholder="请输入" />
                  </div>
                  <div className="space-y-2">
                    <Label>专业成绩排名 *</Label>
                    <Input placeholder="请输入排名/人数" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>专业成绩排名 *</Label>
                  <Input placeholder="请输入排名/人数" className="w-1/3" />
                </div>

                <h4 className="text-sm font-medium pt-4">项目信息</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>项目起止日期 *</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>申请地区 *</Label>
                    <Input placeholder="请输入" />
                  </div>
                  <div className="space-y-2">
                    <Label>学校/组织 *</Label>
                    <Input placeholder="请输入" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    近三年是否有出国（境）经历 *
                    <AIPolishButton
                      text={overseasExperience}
                      fieldType="overseasExperience"
                      onPolishComplete={handlePolishComplete(setOverseasExperience, overseasExperience)}
                    />
                  </Label>
                  <Textarea 
                    placeholder="请描述您的出国经历（如有）" 
                    rows={3}
                    value={overseasExperience}
                    onChange={(e) => setOverseasExperience(e.target.value)}
                  />
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <h3 className="text-base font-medium flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  研究成果与获奖情况
                </h3>
                <div className="space-y-2">
                  <Label>研究成果</Label>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sci" />
                      <Label htmlFor="sci">SCI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ssci" />
                      <Label htmlFor="ssci">SSCI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ei" />
                      <Label htmlFor="ei">EI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="highlevel" />
                      <Label htmlFor="highlevel">高水平期刊</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="conference" />
                      <Label htmlFor="conference">国际会议</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="patent" />
                      <Label htmlFor="patent">专利</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="award" />
                      <Label htmlFor="award">国家/省部级奖项</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="other" />
                      <Label htmlFor="other">其他高水平成果</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>研究成果证明材料</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">点击或拖拽文件上传</p>
                    <p className="text-xs text-muted-foreground mt-1">支持 PDF、JPG、PNG 格式，单个文件不超过 10MB</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  1.发表论文（含录用）情况：发表刊物名称（注明年、期、卷、页码）、刊物（论文）检索类别（SCI/EI/ISTP等）、排名
                  <br />
                  2.专利及排名，公开或授权/注明取得时间
                </p>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    获奖情况
                    <AIPolishButton
                      text={awards}
                      fieldType="awards"
                      onPolishComplete={handlePolishComplete(setAwards, awards)}
                    />
                  </Label>
                  <Textarea 
                    placeholder="请描述您的获奖情况" 
                    rows={3}
                    value={awards}
                    onChange={(e) => setAwards(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>获奖情况文件</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">点击或拖拽文件上传</p>
                    <p className="text-xs text-muted-foreground">获奖文件上传为："姓名-申请院校-证明材料.PDF" 命名的PDF文件</p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6">
                <h3 className="text-base font-medium flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  政治表现与研修计划
                </h3>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    政治表现
                    <AIPolishButton
                      text={politicalPerformance}
                      fieldType="politicalPerformance"
                      onPolishComplete={handlePolishComplete(setPoliticalPerformance, politicalPerformance)}
                    />
                  </Label>
                  <Textarea 
                    placeholder="请从理论学习、政治表态、结合学习生活三方面论述" 
                    rows={4}
                    value={politicalPerformance}
                    onChange={(e) => setPoliticalPerformance(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    研修计划 *
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-6 gap-1 text-xs"
                      onClick={handleGenerateStudyPlan}
                      disabled={isGeneratingStudyPlan}
                    >
                      <Sparkles className="h-3 w-3" />
                      {isGeneratingStudyPlan ? "AI生成中..." : "AI生成"}
                    </Button>
                    <AIPolishButton
                      text={studyPlan}
                      fieldType="studyPlan"
                      onPolishComplete={handlePolishComplete(setStudyPlan, studyPlan)}
                    />
                  </Label>
                  <Textarea 
                    placeholder="请详细描述您的研修计划，包括学习目标、课程安排、预期成果等" 
                    rows={6}
                    value={studyPlan}
                    onChange={(e) => setStudyPlan(e.target.value)}
                  />
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="space-y-6">
                <h3 className="text-base font-medium flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-primary" />
                  申请人申明与附件
                </h3>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    申请人申明
                    <AIPolishButton
                      text={declaration}
                      fieldType="declaration"
                      onPolishComplete={handlePolishComplete(setDeclaration, declaration)}
                    />
                  </Label>
                  <Textarea 
                    placeholder="请输入申请人申明" 
                    rows={4}
                    value={declaration}
                    onChange={(e) => setDeclaration(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>附件上传</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">点击或拖拽文件上传</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      交换项目所有申请材料须同时提交电子版，电子版请扫描成一个PDF文档。
                    </p>
                    <p className="text-xs text-muted-foreground">
                      以"派出年份学期_境外学校名称_姓名_所在学院" 命名 （如：2024秋季_隆德大学_张三_材料科学与工程学院.pdf），文件大小不得超过10MB。
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t mt-6">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                上一步
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">保存</Button>
                {currentStep === 7 ? (
                  <Button onClick={() => router.push("/student/my-projects")}>提交</Button>
                ) : (
                  <Button onClick={() => setCurrentStep(Math.min(7, currentStep + 1))}>下一步</Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI智能助手" subtitle="实时指导您的申请填写">
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            填写进度
            <span className="ml-auto text-muted-foreground">{formProgress}%</span>
          </h4>
          <Progress value={formProgress} className="h-2" />
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI填写建议
          </h4>
          
          <div className="space-y-2">
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">基础信息自动填充</span>
                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={handleAutoFill}>
                  填充
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">从学生系统同步，无需手动输入</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">填写完整性检查</h4>
          <div className="space-y-2">
            {completionStatus.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                {item.status === "completed" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : item.status === "verified" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                )}
                <span className={item.status === "pending" ? "text-amber-600" : "text-green-600"}>
                  {item.label}
                </span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {item.status === "completed" ? "（已填写）" : 
                   item.status === "verified" ? "（已验证）" : "（待填写）"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-amber-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-700">提醒</p>
              <p className="text-xs text-amber-600 mt-1">
                报名即将截止：2026-04-10 09:55
                <br />
                请确保所有申请材料齐全，缺少材料可能导致申请被驳回
              </p>
            </div>
          </div>
        </div>
      </AIAssistantPanel>
    </div>
  )
}
