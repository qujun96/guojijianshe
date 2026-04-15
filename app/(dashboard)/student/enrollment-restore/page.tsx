"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  RefreshCcw,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function EnrollmentRestorePage() {
  const [showExternalDialog, setShowExternalDialog] = useState(false)
  const [restoreStatus, setRestoreStatus] = useState<"pending" | "processing" | "completed">("pending")
  
  const studentInfo = {
    name: "张三",
    studentId: "2022010001",
    type: "本科生",
    college: "计算机科学与技术学院",
    major: "计算机科学与技术",
    enrollmentStatus: "保留学籍",
    targetSystem: "本科生院学籍管理系统"
  }

  const handleSubmit = () => {
    setShowExternalDialog(true)
  }

  const handleConfirmExternal = () => {
    setShowExternalDialog(false)
    setRestoreStatus("processing")
    // 模拟状态同步
    setTimeout(() => {
      setRestoreStatus("completed")
    }, 2000)
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-6">
        {/* 返回和标题 */}
        <div className="flex items-center gap-4">
          <Link href="/student/return-register">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              返回
            </Button>
          </Link>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground">恢复学籍办理</h1>
          <p className="text-muted-foreground mt-1">完成学籍恢复手续，恢复正常学业</p>
        </div>

        {/* 学生身份和当前学籍状态 */}
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
                  {studentInfo.college} · {studentInfo.major}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">当前学籍状态</div>
                <Badge variant="outline" className="text-amber-600 border-amber-600">
                  {studentInfo.enrollmentStatus}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 恢复学籍状态 */}
        {restoreStatus === "completed" ? (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900 text-lg">学籍恢复已完成</h3>
                  <p className="text-green-700 mt-1">您的学籍状态已恢复为"正常注册"，可以继续后续流程</p>
                  <div className="mt-3">
                    <Badge className="bg-green-500">学籍状态: 正常注册</Badge>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-green-200">
                <Link href="/student/credit-transfer">
                  <Button className="w-full gap-2">
                    继续申请学分兑换
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : restoreStatus === "processing" ? (
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center animate-pulse">
                  <Clock className="h-8 w-8 text-amber-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-900 text-lg">学籍恢复办理中</h3>
                  <p className="text-amber-700 mt-1">正在与{studentInfo.targetSystem}同步状态，请稍候...</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                    <span className="text-sm text-amber-600">状态同步中</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* 办理说明 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <RefreshCcw className="h-4 w-4" />
                  学籍恢复说明
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">系统自动识别</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        根据您的学生身份（{studentInfo.type}），您的学籍恢复申请将提交至
                        <span className="font-semibold">{studentInfo.targetSystem}</span>
                        进行办理。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">办理流程</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">1</span>
                      <span className="text-sm">在本平台提交学籍恢复申请</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center">2</span>
                      <span className="text-sm">跳转至{studentInfo.targetSystem}完成手续</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center">3</span>
                      <span className="text-sm">学籍状态自动同步回本平台</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 申请材料 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">申请材料上传</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>学籍恢复申请表 <span className="text-destructive">*</span></Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">点击或拖拽上传申请表</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>境外学习证明 <span className="text-destructive">*</span></Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">上传境外学校出具的学习证明</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>其他材料</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">上传其他补充材料（选填）</p>
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
                  placeholder="如有特殊情况需要说明，请在此填写（选填）"
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>

            {/* 提交按钮 */}
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="min-w-[120px]">保存草稿</Button>
              <Button className="min-w-[180px] gap-2" onClick={handleSubmit}>
                提交至{studentInfo.type === "本科生" ? "本科生院" : "研究生院"}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>

      {/* 右侧AI助手面板 */}
      <div className="w-72 shrink-0">
        <Card className="sticky top-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-white">AI学籍助手</CardTitle>
                <p className="text-xs text-slate-400">智能指导学籍恢复</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 身份识别 */}
            <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-blue-300 font-medium">身份识别完成</span>
              </div>
              <div className="text-sm text-white">
                您是<span className="font-bold text-cyan-400">本科生</span>，学籍恢复将在<span className="font-bold text-cyan-400">本科生院</span>系统办理
              </div>
            </div>

            {/* 状态追踪 */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400">办理状态</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-white/10 rounded">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-slate-300">回国报到已完成</span>
                </div>
                <div className={`flex items-center gap-2 p-2 rounded ${
                  restoreStatus === "completed" 
                    ? "bg-green-500/20 border border-green-500/30" 
                    : restoreStatus === "processing"
                    ? "bg-amber-500/20 border border-amber-500/30"
                    : "bg-white/10"
                }`}>
                  {restoreStatus === "completed" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  ) : restoreStatus === "processing" ? (
                    <Clock className="h-4 w-4 text-amber-400 animate-pulse" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    </div>
                  )}
                  <span className={`text-xs ${
                    restoreStatus === "pending" ? "text-white font-medium" : "text-slate-300"
                  }`}>
                    {restoreStatus === "completed" ? "学籍恢复已完成" : 
                     restoreStatus === "processing" ? "学籍恢复处理中" : "学籍恢复办理"}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white/5 rounded opacity-60">
                  <div className="w-4 h-4 rounded-full border border-slate-500" />
                  <span className="text-xs text-slate-500">学分兑换申请</span>
                </div>
              </div>
            </div>

            {/* 提示信息 */}
            <div className="p-3 bg-amber-500/20 rounded-lg border border-amber-500/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <div className="text-xs text-amber-200">
                  请在回国报到后30日内完成学籍恢复，逾期可能影响正常注册
                </div>
              </div>
            </div>

            {/* 材料检查 */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400">材料完整性</div>
              <div className="space-y-1">
                <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span className="text-xs text-slate-300">学籍恢复申请表</span>
                  <Badge variant="outline" className="text-xs border-amber-500 text-amber-400">待上传</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span className="text-xs text-slate-300">境外学习证明</span>
                  <Badge variant="outline" className="text-xs border-amber-500 text-amber-400">待上传</Badge>
                </div>
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
              您的学籍恢复申请将提交至 <span className="font-semibold text-primary">{studentInfo.targetSystem}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">跳转后请完成以下操作：</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>1. 使用统一身份认证登录</li>
                <li>2. 在学籍管理模块提交恢复申请</li>
                <li>3. 等待学院和教务处审批</li>
                <li>4. 审批完成后状态将自动同步</li>
              </ul>
            </div>
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-700">
                办理完成后，学籍状态将自动同步回本平台
              </span>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowExternalDialog(false)}>取消</Button>
            <Button className="gap-2" onClick={handleConfirmExternal}>
              前往{studentInfo.targetSystem}
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
