"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
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
  ArrowLeft, Calendar, Sparkles, FileText, Settings, CheckCircle2, 
  ChevronRight, ChevronLeft, Plus, X, Eye, Cog
} from "lucide-react"

// 判断字段选项（来源于学生申请时填写的信息）
const fieldOptions = [
  { value: "gpa", label: "GPA成绩", type: "number" },
  { value: "cet4", label: "CET-4成绩", type: "number" },
  { value: "cet6", label: "CET-6成绩", type: "number" },
  { value: "ielts", label: "雅思成绩", type: "number" },
  { value: "toefl", label: "托福成绩", type: "number" },
  { value: "ranking", label: "专业排名", type: "percent" },
  { value: "research", label: "科研经历", type: "boolean" },
  { value: "internship", label: "实习经历", type: "boolean" },
  { value: "award", label: "竞赛获奖", type: "boolean" },
  { value: "certificate", label: "资格证书", type: "boolean" },
  { value: "enrollment", label: "学籍状态", type: "select" },
  { value: "discipline", label: "违纪处分", type: "select" },
  { value: "custom", label: "自定义字段", type: "custom" },
]

// 运算符选项
const operatorOptions = [
  { value: "eq", label: "=" },
  { value: "neq", label: "≠" },
  { value: "gt", label: ">" },
  { value: "gte", label: "≥" },
  { value: "lt", label: "<" },
  { value: "lte", label: "≤" },
  { value: "contains", label: "包含" },
  { value: "exists", label: "存在" },
]

// 规则模板
const ruleTemplates = [
  {
    id: "exchange",
    name: "交换生项目标准模板",
    description: "适用于学期交换项目，包含GPA、语言、学籍等基础要求",
    conditions: [
      { id: "1", logic: "AND", field: "gpa", operator: "gte", value: "3.0" },
      { id: "2", logic: "AND", field: "cet4", operator: "gte", value: "425" },
      { id: "3", logic: "AND", field: "enrollment", operator: "eq", value: "在籍在校" },
      { id: "4", logic: "AND", field: "discipline", operator: "eq", value: "无处分" },
    ],
    weight: 70,
  },
  {
    id: "shortterm",
    name: "短期项目轻量模板",
    description: "适用于暑期/寒假短期项目，要求相对宽松",
    conditions: [
      { id: "1", logic: "AND", field: "gpa", operator: "gte", value: "2.5" },
      { id: "2", logic: "AND", field: "enrollment", operator: "eq", value: "在籍在校" },
    ],
    weight: 50,
  },
  {
    id: "competition",
    name: "国际竞赛模板",
    description: "适用于国际竞赛项目，侧重学术能力",
    conditions: [
      { id: "1", logic: "AND", field: "gpa", operator: "gte", value: "3.2" },
      { id: "2", logic: "AND", field: "ranking", operator: "lte", value: "30%" },
      { id: "3", logic: "OR", field: "ielts", operator: "gte", value: "6.0" },
      { id: "4", logic: "OR", field: "toefl", operator: "gte", value: "80" },
    ],
    weight: 80,
  },
  {
    id: "empty",
    name: "空白模板",
    description: "不预设任何规则，完全自定义配置",
    conditions: [],
    weight: 50,
  }
]

interface RuleCondition {
  id: string
  logic: "AND" | "OR"
  field: string
  operator: string
  value: string
}

export default function ProjectPublishPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  
  // Step 1: Basic Info
  const [projectName, setProjectName] = useState("")
  const [projectIntro, setProjectIntro] = useState("")
  const [projectType, setProjectType] = useState("")
  const [duration, setDuration] = useState("short")
  const [applyMethod, setApplyMethod] = useState("online")
  const [isTop200, setIsTop200] = useState<string>("")
  const [applyTarget, setApplyTarget] = useState("")
  const [materialDeadline, setMaterialDeadline] = useState("")
  
  // Step 2: Pre-review Rules
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [conditions, setConditions] = useState<RuleCondition[]>([])
  const [ruleWeight, setRuleWeight] = useState([50])
  const [ruleType, setRuleType] = useState<"filter" | "score">("filter")

  const steps = [
    { id: 1, label: "项目基础信息", icon: FileText },
    { id: 2, label: "预审规则配置", icon: Settings, optional: true },
  ]

  const calculateProgress = () => {
    if (currentStep === 1) {
      let filled = 0
      if (projectName) filled++
      if (projectType) filled++
      if (applyTarget) filled++
      return Math.round((filled / 3) * 50)
    }
    return 50 + (selectedTemplate ? 50 : 25)
  }

  const handleAIPolish = (field: string) => {
    if (field === "intro" && projectIntro) {
      setProjectIntro(projectIntro + "\n\n【AI优化建议】本项目旨在培养具有国际视野的高素质人才，通过海外学习经历拓宽学术视野，提升跨文化交流能力。")
    }
  }

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = ruleTemplates.find(t => t.id === templateId)
    if (template) {
      setConditions(template.conditions.map(c => ({ ...c })))
      setRuleWeight([template.weight])
    }
  }

  const addCondition = () => {
    const newId = String(conditions.length + 1)
    setConditions([...conditions, {
      id: newId,
      logic: conditions.length === 0 ? "AND" : "OR",
      field: "",
      operator: "eq",
      value: ""
    }])
  }

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id))
  }

  const updateCondition = (id: string, field: keyof RuleCondition, value: string) => {
    setConditions(conditions.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ))
  }

  const getFieldLabel = (fieldValue: string) => {
    return fieldOptions.find(f => f.value === fieldValue)?.label || fieldValue
  }

  const getOperatorLabel = (operatorValue: string) => {
    return operatorOptions.find(o => o.value === operatorValue)?.label || operatorValue
  }

  const generateRulePreview = () => {
    if (conditions.length === 0) return "暂无规则条件"
    
    return conditions.map((c, index) => {
      const fieldLabel = getFieldLabel(c.field)
      const operatorLabel = getOperatorLabel(c.operator)
      const prefix = index === 0 ? "" : ` ${c.logic} `
      return `${prefix}(${fieldLabel} ${operatorLabel} ${c.value})`
    }).join("")
  }

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    router.push("/admin/projects")
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
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h1 className="text-lg font-semibold">项目发布</h1>
              </div>
            </div>

            {/* Step Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = step.id === currentStep
                  const isCompleted = step.id < currentStep
                  return (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          isActive ? "bg-primary text-white" : 
                          isCompleted ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"
                        }`}>
                          {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                        </div>
                        <div>
                          <div className={`text-sm font-medium ${isActive ? "text-primary" : isCompleted ? "text-green-600" : "text-muted-foreground"}`}>
                            {step.label}
                          </div>
                          {step.optional && (
                            <Badge variant="outline" className="text-xs mt-1">选填</Badge>
                          )}
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? "bg-green-500" : "bg-muted"}`} />
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center gap-2">
                <Progress value={calculateProgress()} className="h-2 flex-1" />
                <span className="text-sm text-muted-foreground">{calculateProgress()}%</span>
              </div>
            </div>

            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <section className="space-y-4">
                  <h2 className="font-medium text-sm text-muted-foreground">项目基础信息</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="projectName">
                      <span className="text-destructive">*</span> 项目名称
                    </Label>
                    <Input 
                      id="projectName"
                      placeholder="请输入项目名称"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">建议包含年份、学期、学校名称等关键信息</p>
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
                      placeholder="请输入项目介绍"
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
                          <SelectValue placeholder="请选择项目类别" />
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
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>
                        <span className="text-destructive">*</span> 派出时间
                      </Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Input type="date" placeholder="开始时间" />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                        <div className="relative flex-1">
                          <Input type="date" placeholder="结束时间" />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>
                        <span className="text-destructive">*</span> 报名截止时间
                      </Label>
                      <div className="relative">
                        <Input type="datetime-local" placeholder="请选择报名截止时间" />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>
                        材料提交截止时间
                      </Label>
                      <div className="relative">
                        <Input 
                          type="date" 
                          placeholder="请选择材料提交截止时间" 
                          value={materialDeadline}
                          onChange={(e) => setMaterialDeadline(e.target.value)}
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                      <p className="text-xs text-muted-foreground">学生需在此日期前提交派出材料</p>
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
                        <SelectValue placeholder="请选择申请对象" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="undergrad">本科生</SelectItem>
                        <SelectItem value="grad">研究生</SelectItem>
                        <SelectItem value="both">本科生、研究生</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="font-medium text-sm text-muted-foreground">地理位置与学校</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>
                        <span className="text-destructive">*</span> 国家/地区
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="请选择国家/地区" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uk">英国</SelectItem>
                          <SelectItem value="us">美国</SelectItem>
                          <SelectItem value="de">德国</SelectItem>
                          <SelectItem value="jp">日本</SelectItem>
                          <SelectItem value="kr">韩国</SelectItem>
                          <SelectItem value="au">澳大利亚</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>
                        <span className="text-destructive">*</span> 学校/组织
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="请选择学校/组织" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cambridge">剑桥大学</SelectItem>
                          <SelectItem value="oxford">牛津大学</SelectItem>
                          <SelectItem value="mit">麻省理工学院</SelectItem>
                          <SelectItem value="tum">慕尼黑工业大学</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </section>

                <div className="flex justify-center gap-4 pt-4 border-t">
                  <Button variant="outline" className="min-w-[120px]" onClick={() => router.back()}>取消</Button>
                  <Button className="min-w-[120px] gap-2" onClick={handleNext}>
                    下一步
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Pre-review Rules */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Quick Rule Template Selection */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <h2 className="font-medium">快速规则模板</h2>
                      <Badge variant="outline" className="text-xs">推荐</Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => router.push("/admin/rule-templates")}
                    >
                      <Cog className="h-4 w-4" />
                      模板管理
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">选择预设模板快速配置审核规则，也可以在下方��定义修改</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {ruleTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedTemplate === template.id 
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        <div className="flex items-center gap-2">
                          {selectedTemplate === template.id && (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          )}
                          <h3 className="font-medium text-sm">{template.name}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Rule Conditions Configuration */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Cog className="h-4 w-4 text-primary" />
                    <h2 className="font-medium">规则条件配置</h2>
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-600 border-amber-200">核心部分</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">配置审核规则条件，数据来源于学生申请时填写提交的信息。AND表示必须同时满足，OR表示满足其一即可。</p>
                  
                  <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                    {conditions.map((condition, index) => (
                      <div key={condition.id} className="flex items-center gap-2 flex-wrap">
                        {/* Logic Label/Select */}
                        {index === 0 ? (
                          <div className="w-16 h-9 rounded flex items-center justify-center text-sm font-medium bg-amber-100 text-amber-700">
                            条件{index + 1}
                          </div>
                        ) : (
                          <Select 
                            value={condition.logic} 
                            onValueChange={(value) => updateCondition(condition.id, "logic", value as "AND" | "OR")}
                          >
                            <SelectTrigger className={`w-16 h-9 text-sm font-medium border-0 ${
                              condition.logic === "AND" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                            }`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="AND">AND</SelectItem>
                              <SelectItem value="OR">OR</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                        
                        <span className="text-sm text-muted-foreground">判断字段</span>
                        
                        {/* Field Select */}
                        <Select 
                          value={condition.field} 
                          onValueChange={(value) => updateCondition(condition.id, "field", value)}
                        >
                          <SelectTrigger className="w-36 h-9 bg-white">
                            <SelectValue placeholder="请选择判断字段" />
                          </SelectTrigger>
                          <SelectContent>
                            <div className="px-2 py-1.5 text-sm font-medium text-primary bg-primary/10">
                              请选择判断字段
                            </div>
                            {fieldOptions.map((field) => (
                              <SelectItem key={field.value} value={field.value}>
                                {field.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <span className="text-sm text-muted-foreground">运算符</span>
                        
                        {/* Operator Select */}
                        <Select 
                          value={condition.operator} 
                          onValueChange={(value) => updateCondition(condition.id, "operator", value)}
                        >
                          <SelectTrigger className="w-16 h-9 bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {operatorOptions.map((op) => (
                              <SelectItem key={op.value} value={op.value}>
                                {op.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <span className="text-sm text-muted-foreground">比较值</span>
                        
                        {/* Value Input - same row */}
                        <Input 
                          className="w-24 h-9 bg-white"
                          placeholder="输入值"
                          value={condition.value}
                          onChange={(e) => updateCondition(condition.id, "value", e.target.value)}
                        />
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => removeCondition(condition.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    {/* Add Condition Button */}
                    <div className="flex justify-center pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1 border-dashed border-primary text-primary hover:bg-primary/5"
                        onClick={addCondition}
                      >
                        <Plus className="h-4 w-4" />
                        添加条件
                      </Button>
                    </div>
                  </div>
                </section>

                {/* Rule Type & Weight */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-primary" />
                    <h2 className="font-medium">规则类型与权重</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Rule Type Selection */}
                    <div className="grid grid-cols-2 gap-4">
                      <div 
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          ruleType === "filter" ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50"
                        }`}
                        onClick={() => setRuleType("filter")}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            ruleType === "filter" ? "border-primary" : "border-muted-foreground"
                          }`}>
                            {ruleType === "filter" && <div className="w-2 h-2 rounded-full bg-primary" />}
                          </div>
                          <span className="font-medium">筛选规则</span>
                          <Badge variant="outline" className="text-xs">推荐</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          硬性条件，满足条件=通过，不满足=不通过。适用于基本资格审核。
                        </p>
                      </div>
                      <div 
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          ruleType === "score" ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50"
                        }`}
                        onClick={() => setRuleType("score")}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            ruleType === "score" ? "border-primary" : "border-muted-foreground"
                          }`}>
                            {ruleType === "score" && <div className="w-2 h-2 rounded-full bg-primary" />}
                          </div>
                          <span className="font-medium">评分规则</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          软性条件，根据满足程度计算分数。适用于竞争性排序。
                        </p>
                      </div>
                    </div>

                    {/* Weight - only for score type */}
                    {ruleType === "score" && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium w-16">规则权重</span>
                          <Slider
                            value={ruleWeight}
                            onValueChange={setRuleWeight}
                            max={100}
                            step={5}
                            className="flex-1"
                          />
                          <span className="text-lg font-semibold text-primary w-16 text-right">{ruleWeight[0]}%</span>
                        </div>
                        
                        <div className="space-y-2 text-sm text-muted-foreground border-t pt-3">
                          <p><span className="font-medium text-foreground">权重说明：</span>当项目配置多个评分规则时，每个规则的权重决定其在总评分中的占比</p>
                          <p><span className="font-medium text-foreground">评分计算：</span>该规则得分 = 100 × (满足条件数 / 总条件数) × (权重 / 100)</p>
                          <p><span className="font-medium text-foreground">举例：</span>若3个条件满足2个，权重80%，则得分 = 100 × (2/3) × 0.8 = 53.3分</p>
                        </div>
                      </div>
                    )}

                    {/* Filter type explanation */}
                    {ruleType === "filter" && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2">
                        <p className="text-sm font-medium text-amber-700">筛选规则说明</p>
                        <div className="space-y-1 text-sm text-amber-600">
                          <p>判定逻辑：满足所有AND条件 + 满足任一OR条件组 = 通过预审</p>
                          <p>不满足条件的申请将被标记为"预审不通过"，需要人工复核决定</p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Rule Preview */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <h2 className="font-medium">规则预览</h2>
                  </div>
                  
                  <div className="bg-white border rounded-lg p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">预审规则配置</span>
                      <Badge variant="outline" className={`text-xs ${ruleType === "filter" ? "text-amber-600 border-amber-300" : "text-primary border-primary"}`}>
                        {ruleType === "filter" ? "筛选规则" : "评分规则"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">规则类型：</span>{ruleType === "filter" ? "筛选规则（通过/不通过）" : "评分规则（计算分数）"}</p>
                      <p><span className="font-medium">应用范围：</span>所有申请学生</p>
                      <p><span className="font-medium">判断条件：</span>{generateRulePreview()}</p>
                      {ruleType === "score" && <p><span className="font-medium">规则权重：</span>{ruleWeight[0]}%</p>}
                      <p><span className="font-medium">生效逻辑：</span>
                        {ruleType === "filter" 
                          ? (conditions.some(c => c.logic === "OR") 
                              ? "AND条件必须全部满足，OR条件满足其一即可" 
                              : "满足所有条件则通过预审，否则不通过")
                          : "根据满足条件的数量计算得分，用于申请排序"
                        }
                      </p>
                    </div>
                    
                    {conditions.length > 0 && (
                      <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">条件解读：</p>
                        <div className="text-xs space-y-1">
                          {conditions.map((c, index) => {
                            const fieldLabel = getFieldLabel(c.field)
                            const operatorLabel = getOperatorLabel(c.operator)
                            return (
                              <p key={c.id} className="flex items-center gap-2">
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                  index === 0 ? "bg-amber-100 text-amber-700" : 
                                  c.logic === "AND" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                                }`}>
                                  {index === 0 ? "条件" : c.logic}
                                </span>
                                <span>{fieldLabel} {operatorLabel} {c.value}</span>
                              </p>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                <div className="flex justify-center gap-4 pt-4 border-t">
                  <Button variant="outline" className="min-w-[120px] gap-2" onClick={handlePrev}>
                    <ChevronLeft className="h-4 w-4" />
                    上一步
                  </Button>
                  <Button className="min-w-[120px]" onClick={handleSubmit}>
                    提交发布
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI智能助手" subtitle="辅助您创建高质量项目">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">项目质量评估</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">信息完整度</span>
              <Badge variant={calculateProgress() >= 50 ? "default" : "outline"} className={calculateProgress() < 50 ? "text-amber-600 border-amber-300" : ""}>
                {calculateProgress()}%
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">当前步骤</span>
              <Badge variant="outline">{currentStep}/2</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">类似历史项目</h4>
          <div className="border rounded-lg p-3 space-y-2">
            <h4 className="font-medium text-sm">2025寒假汉阳大学短期项目</h4>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>报名: <span className="font-medium text-foreground">47人</span></span>
              <span>通过率: <span className="font-medium text-foreground">89%</span></span>
            </div>
          </div>
          <div className="border rounded-lg p-3 space-y-2">
            <h4 className="font-medium text-sm">2025寒假韩国建国大学项目</h4>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>报名: <span className="font-medium text-foreground">47人</span></span>
              <span>通过率: <span className="font-medium text-foreground">81%</span></span>
            </div>
          </div>
        </div>
      </AIAssistantPanel>
    </div>
  )
}
