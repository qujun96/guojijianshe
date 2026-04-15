"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
} from "@/components/ui/dialog"
import { 
  ArrowLeft,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Info,
  Upload,
  GraduationCap,
  FileText,
  Building2
} from "lucide-react"
import Link from "next/link"

export default function EnrollmentChangePage() {
  const [changeType, setChangeType] = useState("retain")
  const [showExternalDialog, setShowExternalDialog] = useState(false)
  const [externalSystem, setExternalSystem] = useState("")
  
  const studentInfo = {
    name: "张三",
    studentId: "2022010001",
    type: "本科生",
    college: "计算机科学与技术学院",
    major: "计算机科学与技术",
    grade: "大三",
    project: "2026年《中美人才培养计划》1+2+1双学位项目",
    targetSchool: "美国特洛伊大学",
    duration: "2026-09-01 至 2028-06-30"
  }

  const handleSubmitToExternal = () => {
    setExternalSystem(studentInfo.type === "本科生" ? "本科生院学籍管理系统" : "研究生院学籍管理系统")
    setShowExternalDialog(true)
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-6">
        {/* 返回和标题 */}
        <div className="flex items-center gap-4">
          <Link href="/student/departure-tasks">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              返回任务清单
            </Button>
          </Link>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground">学籍异动办理</h1>
          <p className="text-muted-foreground mt-1">办理出国（境）学习期间的学籍异动手续</p>
        </div>

        {/* 学生身份识别 */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{studentInfo.name}</span>
                  <Badge variant="outline">{studentInfo.studentId}</Badge>
                  <Badge className="bg-blue-500">{studentInfo.type}</Badge>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {studentInfo.college} · {studentInfo.major} · {studentInfo.grade}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">办理系统</div>
                <div className="font-medium text-primary">
                  {studentInfo.type === "本科生" ? "本科生院" : "研究生院"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 派出项目信息 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              派出项目信息
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground text-sm">项目名称</Label>
                <div className="font-medium">{studentInfo.project}</div>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">目标学校</Label>
                <div className="font-medium">{studentInfo.targetSchool}</div>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">派出时间</Label>
                <div className="font-medium">{studentInfo.duration}</div>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">派出时长</Label>
                <div className="font-medium">22个月</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 学籍异动类型选择 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              学籍异动类型
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={changeType} onValueChange={setChangeType} className="space-y-3">
              <div className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${changeType === 'retain' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}>
                <RadioGroupItem value="retain" id="retain" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="retain" className="font-medium cursor-pointer">保留学籍</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    适用于短期交换（一学期至一学年）项目，保留在校学籍，派出期间不计入学习年限
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">推荐</Badge>
                    <span className="text-xs text-muted-foreground">适用时长: 3个月至1年</span>
                  </div>
                </div>
              </div>
              
              <div className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${changeType === 'suspend' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}>
                <RadioGroupItem value="suspend" id="suspend" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="suspend" className="font-medium cursor-pointer">休学</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    适用于长期项目（超过一学年），休学期间保留学籍但暂停学业
                  </p>
                  <span className="text-xs text-muted-foreground">适用时长: 1年以上</span>
                </div>
              </div>

              <div className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${changeType === 'joint' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}>
                <RadioGroupItem value="joint" id="joint" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="joint" className="font-medium cursor-pointer">联合培养</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    适用于双学位、联合培养项目，在两校同时注册学籍
                  </p>
                  <span className="text-xs text-muted-foreground">适用项目: 双学位项目</span>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* 申请材料 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">申请材料上传</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>学籍异动申请表 <span className="text-destructive">*</span></Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">点击或拖拽上传申请表</p>
                <p className="text-xs text-muted-foreground mt-1">支持 PDF、JPG、PNG 格式</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>导师同意书 <span className="text-destructive">*</span></Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">点击或拖拽上传导师同意书</p>
                <p className="text-xs text-muted-foreground mt-1">需导师签字并加盖学院公章</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>境外学校录取通知书 <span className="text-destructive">*</span></Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">点击或拖拽上传录取通知书</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>其他证明材料</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">点击或拖拽上传其他材料</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 申请说明 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">申请说明</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="请简要说明学籍异动申请原因（选填）"
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        {/* 提交按钮 */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="min-w-[120px]">保存草稿</Button>
          <Button className="min-w-[160px] gap-2" onClick={handleSubmitToExternal}>
            提交至{studentInfo.type === "本科生" ? "本科生院" : "研究生院"}
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 右侧AI助手面板 */}
      <div className="w-72 shrink-0">
        <Card className="sticky top-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-white">AI学籍助手</CardTitle>
                <p className="text-xs text-slate-400">智能指导学籍异动</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 身份识别结果 */}
            <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-blue-300 font-medium">身份识别完成</span>
              </div>
              <div className="text-sm text-white">
                您是<span className="font-bold text-cyan-400">本科生</span>，学籍异动将提交至<span className="font-bold text-cyan-400">本科生院</span>系统办理
              </div>
            </div>

            {/* AI建议 */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400">AI建议</div>
              <div className="p-3 bg-white/10 rounded-lg">
                <div className="text-sm text-white mb-2">推荐选择: 联合培养</div>
                <p className="text-xs text-slate-300">
                  根据您参与的双学位项目特点，建议选择"联合培养"类型，可在两校同时注册学籍，便于学分互认
                </p>
              </div>
            </div>

            {/* 材料检查 */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400">材料完整性检查</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span className="text-xs text-slate-300">学籍异动申请表</span>
                  <Badge variant="outline" className="text-xs border-amber-500 text-amber-400">待上传</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span className="text-xs text-slate-300">导师同意书</span>
                  <Badge variant="outline" className="text-xs border-amber-500 text-amber-400">待上传</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span className="text-xs text-slate-300">录取通知书</span>
                  <Badge variant="outline" className="text-xs border-amber-500 text-amber-400">待上传</Badge>
                </div>
              </div>
            </div>

            {/* 流程说明 */}
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="text-xs text-slate-400 mb-2">办理流程</div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-primary text-white text-xs flex items-center justify-center">1</span>
                  <span>提交申请至本科生院</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center">2</span>
                  <span>学院审核</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center">3</span>
                  <span>本科生院审批</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center">4</span>
                  <span>状态同步回平台</span>
                </div>
              </div>
            </div>

            {/* 预计时间 */}
            <div className="p-3 bg-amber-500/20 rounded-lg border border-amber-500/30">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-400" />
                <span className="text-xs text-amber-300">预计办理时间: 3-5个工作日</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 外部系统跳转确认对话框 */}
      <Dialog open={showExternalDialog} onOpenChange={setShowExternalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>即将跳转至外部系统</DialogTitle>
            <DialogDescription>
              您的学籍异动申请将提交至 <span className="font-semibold text-primary">{externalSystem}</span> 进行办理
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">跳转后请完成以下操作：</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>1. 使用统一身份认证登录</li>
                <li>2. 在学籍管理模块提交异动申请</li>
                <li>3. 等待学院和教务处审批</li>
                <li>4. 审批完成后状态将自动同步</li>
              </ul>
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <Info className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-blue-700">
                办理完成后，学籍状态将自动同步回本平台
              </span>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowExternalDialog(false)}>取消</Button>
            <Button className="gap-2">
              前往{externalSystem}
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
