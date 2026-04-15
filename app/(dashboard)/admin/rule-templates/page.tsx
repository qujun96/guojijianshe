"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { 
  ArrowLeft, Plus, Edit2, Trash2, Copy, Sparkles, Settings, 
  FileText, X, CheckCircle2, Eye
} from "lucide-react"

// 判断字段选项
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

interface RuleCondition {
  id: string
  logic: "AND" | "OR"
  field: string
  operator: string
  value: string
}

interface RuleTemplate {
  id: string
  name: string
  description: string
  conditions: RuleCondition[]
  weight: number
  isSystem: boolean
  usageCount: number
  createdAt: string
}

const initialTemplates: RuleTemplate[] = [
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
    isSystem: true,
    usageCount: 15,
    createdAt: "2025-09-01",
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
    isSystem: true,
    usageCount: 23,
    createdAt: "2025-09-01",
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
    isSystem: true,
    usageCount: 8,
    createdAt: "2025-09-01",
  },
  {
    id: "custom1",
    name: "工科专项模板",
    description: "针对工科学生的定制化审核规则",
    conditions: [
      { id: "1", logic: "AND", field: "gpa", operator: "gte", value: "3.0" },
      { id: "2", logic: "AND", field: "research", operator: "exists", value: "true" },
      { id: "3", logic: "OR", field: "award", operator: "exists", value: "true" },
    ],
    weight: 75,
    isSystem: false,
    usageCount: 5,
    createdAt: "2026-01-15",
  },
]

export default function RuleTemplatesPage() {
  const router = useRouter()
  const [templates, setTemplates] = useState<RuleTemplate[]>(initialTemplates)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<RuleTemplate | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [templateToDelete, setTemplateToDelete] = useState<RuleTemplate | null>(null)

  // Form states
  const [formName, setFormName] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [formConditions, setFormConditions] = useState<RuleCondition[]>([])
  const [formWeight, setFormWeight] = useState([50])

  const getFieldLabel = (fieldValue: string) => {
    return fieldOptions.find(f => f.value === fieldValue)?.label || fieldValue
  }

  const getOperatorLabel = (operatorValue: string) => {
    return operatorOptions.find(o => o.value === operatorValue)?.label || operatorValue
  }

  const openCreateDialog = () => {
    setEditingTemplate(null)
    setFormName("")
    setFormDescription("")
    setFormConditions([{ id: "1", logic: "AND", field: "", operator: "eq", value: "" }])
    setFormWeight([50])
    setIsDialogOpen(true)
  }

  const openEditDialog = (template: RuleTemplate) => {
    setEditingTemplate(template)
    setFormName(template.name)
    setFormDescription(template.description)
    setFormConditions([...template.conditions])
    setFormWeight([template.weight])
    setIsDialogOpen(true)
  }

  const handleDuplicate = (template: RuleTemplate) => {
    const newTemplate: RuleTemplate = {
      ...template,
      id: `custom_${Date.now()}`,
      name: `${template.name} (副本)`,
      isSystem: false,
      usageCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setTemplates([...templates, newTemplate])
  }

  const handleDelete = (template: RuleTemplate) => {
    setTemplateToDelete(template)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (templateToDelete) {
      setTemplates(templates.filter(t => t.id !== templateToDelete.id))
      setIsDeleteDialogOpen(false)
      setTemplateToDelete(null)
    }
  }

  const addCondition = () => {
    const newId = String(formConditions.length + 1)
    setFormConditions([...formConditions, {
      id: newId,
      logic: formConditions.length === 0 ? "AND" : "OR",
      field: "",
      operator: "eq",
      value: ""
    }])
  }

  const removeCondition = (id: string) => {
    setFormConditions(formConditions.filter(c => c.id !== id))
  }

  const updateCondition = (id: string, field: keyof RuleCondition, value: string) => {
    setFormConditions(formConditions.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ))
  }

  const handleSave = () => {
    if (editingTemplate) {
      // Update existing
      setTemplates(templates.map(t => 
        t.id === editingTemplate.id 
          ? { ...t, name: formName, description: formDescription, conditions: formConditions, weight: formWeight[0] }
          : t
      ))
    } else {
      // Create new
      const newTemplate: RuleTemplate = {
        id: `custom_${Date.now()}`,
        name: formName,
        description: formDescription,
        conditions: formConditions,
        weight: formWeight[0],
        isSystem: false,
        usageCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setTemplates([...templates, newTemplate])
    }
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <h1 className="text-lg font-semibold">规则模板管理</h1>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  管理项目预审规则模板，可用于快速配置项目审核条件
                </p>
              </div>
            </div>
            <Button className="gap-2" onClick={openCreateDialog}>
              <Plus className="h-4 w-4" />
              新建模板
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    {template.isSystem && (
                      <Badge variant="secondary" className="text-xs">系统模板</Badge>
                    )}
                  </div>
                  <CardDescription className="text-xs">{template.description}</CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => openEditDialog(template)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleDuplicate(template)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  {!template.isSystem && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(template)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <div className="text-xs font-medium text-muted-foreground">规则条件：</div>
                  {template.conditions.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {template.conditions.map((c, index) => (
                        <Badge key={c.id} variant="outline" className="text-xs">
                          {index > 0 && <span className="mr-1 text-primary">{c.logic}</span>}
                          {getFieldLabel(c.field)} {getOperatorLabel(c.operator)} {c.value}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">无预设条件（空白模板）</p>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">权重: <span className="font-medium text-foreground">{template.weight}%</span></span>
                    <span className="text-muted-foreground">使用次数: <span className="font-medium text-foreground">{template.usageCount}</span></span>
                  </div>
                  <span className="text-muted-foreground">创建于 {template.createdAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>{editingTemplate ? "编辑规则模板" : "新建规则模板"}</DialogTitle>
            <DialogDescription>
              配置预审规则模板，可用于项目发布时快速应用
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-6 py-4 pr-2">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">基本信息</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>模板名称 <span className="text-destructive">*</span></Label>
                  <Input 
                    placeholder="请输入模板名称"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>模板描述</Label>
                  <Input 
                    placeholder="请输入模板描述"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Conditions */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-medium">规则条件配置</h3>
                <Badge variant="outline" className="text-xs bg-amber-50 text-amber-600 border-amber-200">核心部分</Badge>
              </div>
              <p className="text-xs text-muted-foreground">配置审核规则条件，数据来源于学生申请时填写提交的信息</p>

              <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                {formConditions.map((condition, index) => (
                  <div key={condition.id} className="flex items-center gap-2 flex-wrap">
                    {/* Logic Label/Select */}
                    {index === 0 ? (
                      <div className="w-16 h-9 rounded flex items-center justify-center text-xs font-medium bg-amber-100 text-amber-700">
                        条件{index + 1}
                      </div>
                    ) : (
                      <Select 
                        value={condition.logic} 
                        onValueChange={(value) => updateCondition(condition.id, "logic", value as "AND" | "OR")}
                      >
                        <SelectTrigger className={`w-16 h-9 text-xs font-medium border-0 ${
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
                    
                    <span className="text-xs text-muted-foreground">判断字段</span>
                    
                    {/* Field Select */}
                    <Select 
                      value={condition.field} 
                      onValueChange={(value) => updateCondition(condition.id, "field", value)}
                    >
                      <SelectTrigger className="w-32 h-9 bg-white">
                        <SelectValue placeholder="选择字段" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="px-2 py-1.5 text-xs font-medium text-primary bg-primary/10">
                          请选择判断字段
                        </div>
                        {fieldOptions.map((field) => (
                          <SelectItem key={field.value} value={field.value}>
                            {field.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <span className="text-xs text-muted-foreground">运算符</span>
                    
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
                    
                    <span className="text-xs text-muted-foreground">比较值</span>
                    
                    {/* Value Input */}
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
            </div>

            {/* Weight */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">规则权重</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm w-16">规则权重</span>
                  <Slider
                    value={formWeight}
                    onValueChange={setFormWeight}
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-lg font-semibold text-primary w-16 text-right">{formWeight[0]}%</span>
                </div>
                <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                  <p><span className="font-medium text-foreground">权重说明：</span>规则权重决定了该规则在预审评分中的重要性</p>
                  <p><span className="font-medium text-foreground">建议：</span>核心规则建议权重≥70%，辅助规则建议权重30-50%</p>
                </div>
              </div>
            </div>

            {/* Rule Preview */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Eye className="h-4 w-4" />
                规则预览
              </h3>
              <div className="bg-white border rounded-lg p-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{formName || "未命名模板"}</span>
                  <Badge variant="outline" className="text-xs text-primary border-primary">筛选规则</Badge>
                </div>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">判断条件：</span>
                  {formConditions.length > 0 
                    ? formConditions.map((c, i) => {
                        const prefix = i === 0 ? "" : ` ${c.logic} `
                        return `${prefix}(${getFieldLabel(c.field)} ${getOperatorLabel(c.operator)} ${c.value})`
                      }).join("")
                    : "暂无条件"
                  }
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">规则权重：</span>{formWeight[0]}%
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-shrink-0 border-t pt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>取消</Button>
            <Button onClick={handleSave} disabled={!formName}>保存模板</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              确定要删除模板"{templateToDelete?.name}"吗？此操作不可撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>取消</Button>
            <Button variant="destructive" onClick={confirmDelete}>确认删除</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
