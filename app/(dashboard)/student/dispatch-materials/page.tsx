"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import {
  AIAssistantPanel,
  AIChecklistItem,
  AISuggestion,
  AIReminder,
} from "@/components/ai/ai-assistant-panel"
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Plane,
  FileCheck,
  BookOpen,
  Sparkles,
  Eye,
  Download
} from "lucide-react"

const materialTypes = [
  {
    id: "enrollment",
    name: "保留学籍证明",
    description: "由学校教务处开具的保留学籍证明文件",
    required: true,
    status: "uploaded",
    fileName: "保留学籍证明_张五_2026.pdf",
    uploadTime: "2026-03-15 14:30",
    aiVerified: true,
  },
  {
    id: "admission",
    name: "境外录取通知书",
    description: "被境外学校录取或接受交换的正式通知书",
    required: true,
    status: "uploaded",
    fileName: "Admission_Letter_University_of_Cambridge.pdf",
    uploadTime: "2026-03-16 09:20",
    aiVerified: true,
  },
  {
    id: "visa",
    name: "签证材料",
    description: "有效签证页面复印件或电子签证",
    required: true,
    status: "pending",
    fileName: null,
    uploadTime: null,
    aiVerified: false,
  },
  {
    id: "insurance",
    name: "境外保险证明",
    description: "涵盖留学期间的医疗及意外保险",
    required: true,
    status: "pending",
    fileName: null,
    uploadTime: null,
    aiVerified: false,
  },
  {
    id: "itinerary",
    name: "行程单",
    description: "往返机票订单或行程安排",
    required: false,
    status: "not_started",
    fileName: null,
    uploadTime: null,
    aiVerified: false,
  },
  {
    id: "emergency",
    name: "紧急联系人确认书",
    description: "境外紧急联系人信息确认",
    required: true,
    status: "uploaded",
    fileName: "紧急联系人确认书_张五.pdf",
    uploadTime: "2026-03-14 16:45",
    aiVerified: true,
  },
]

function getStatusIcon(status: string) {
  switch (status) {
    case "uploaded":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case "pending":
      return <Clock className="h-5 w-5 text-amber-500" />
    case "not_started":
      return <AlertCircle className="h-5 w-5 text-muted-foreground" />
    default:
      return null
  }
}

function getStatusText(status: string) {
  switch (status) {
    case "uploaded":
      return "已上传"
    case "pending":
      return "待上传"
    case "not_started":
      return "未开始"
    default:
      return ""
  }
}

export default function DispatchMaterialsPage() {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  
  const uploadedCount = materialTypes.filter(m => m.status === "uploaded").length
  const requiredCount = materialTypes.filter(m => m.required).length
  const progress = Math.round((uploadedCount / materialTypes.length) * 100)

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Plane className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <CardTitle className="text-lg">派出材料提交</CardTitle>
                <CardDescription>
                  请在出发前完成所有必需材料的提交，经学院审核后方可确认派出
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6 p-4 bg-muted rounded-lg">
              <div>
                <div className="text-sm text-muted-foreground">当前项目</div>
                <div className="font-medium mt-1">剑桥大学2026寒假短期课程项目</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">派出时间</div>
                <div className="font-medium mt-1">2026-07-15 至 2026-08-30</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">材料截止</div>
                <div className="font-medium mt-1 text-amber-600">2026-06-30</div>
                <div className="text-xs text-muted-foreground mt-0.5">距截止还有 87 天</div>
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                材料收集中
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          {materialTypes.map((material) => (
            <Card 
              key={material.id} 
              className={`cursor-pointer transition-all ${
                selectedMaterial === material.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedMaterial(material.id)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(material.status)}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{material.name}</h3>
                        {material.required && (
                          <Badge variant="destructive" className="text-xs">必需</Badge>
                        )}
                        {material.aiVerified && (
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-600 border-green-200">
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI已验证
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{material.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {getStatusText(material.status)}
                  </Badge>
                </div>

                {material.status === "uploaded" && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">{material.fileName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-7">
                          <Eye className="h-4 w-4 mr-1" />
                          预览
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7">
                          <Download className="h-4 w-4 mr-1" />
                          下载
                        </Button>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      上传时间：{material.uploadTime}
                    </div>
                  </div>
                )}

                {material.status !== "uploaded" && (
                  <div className="mt-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">点击或拖拽文件上传</p>
                      <p className="text-xs text-muted-foreground mt-1">支持 PDF、JPG、PNG，单个文件不超过10MB</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              补充说明
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="如有需要补充说明的情况，请在此处填写..."
              className="min-h-[100px]"
            />
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline">保存草稿</Button>
              <Button>提交审核</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI智能助手" subtitle="协助您完成派出材料准备">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>材料提交进度</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            已上传 {uploadedCount}/{materialTypes.length} 项材料
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            材料完整性检查
          </h4>
          <div className="space-y-2">
            <AIChecklistItem label="保留学籍证明" status="completed" detail="已验证" />
            <AIChecklistItem label="境外录取通知书" status="completed" detail="已验证" />
            <AIChecklistItem label="签证材料" status="pending" detail="待上传" />
            <AIChecklistItem label="境外保险证明" status="pending" detail="待上传" />
            <AIChecklistItem label="紧急联系人确认书" status="completed" detail="已验证" />
          </div>
        </div>

        <AISuggestion
          title="AI文档识别"
          description="上传材料后，AI将自动识别文档类型并验证内容完整性"
          type="info"
        />

        <AISuggestion
          title="签证材料提醒"
          description="建议尽快申请签证，预计办理时间约2-4周"
          type="action"
          onApply={() => {}}
        />

        <AIReminder
          title="材料提交截止"
          deadline="2026-06-30 23:59"
          description="距离截止还有87天，请尽快完成所有必需材料的上传"
        />

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <h4 className="text-sm font-medium mb-2">AI智能提示</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>- 录取通知书需包含学生姓名和入学日期</li>
            <li>- 签证有效期需覆盖整个派出期间</li>
            <li>- 保险需包含医疗和意外险种</li>
          </ul>
        </div>
      </AIAssistantPanel>
    </div>
  )
}
