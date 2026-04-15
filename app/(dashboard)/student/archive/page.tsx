"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ArrowLeft,
  Sparkles,
  FileArchive,
  CheckCircle2,
  FileText,
  Download,
  Eye,
  Clock,
  AlertTriangle,
  Award,
  PartyPopper
} from "lucide-react"
import Link from "next/link"

interface ArchiveDocument {
  id: string
  name: string
  type: string
  status: "completed" | "pending" | "missing"
  uploadDate?: string
  required: boolean
}

const archiveDocuments: ArchiveDocument[] = [
  { id: "1", name: "项目申请表", type: "申请材料", status: "completed", uploadDate: "2026-03-15", required: true },
  { id: "2", name: "学籍异动审批表", type: "学籍材料", status: "completed", uploadDate: "2026-08-20", required: true },
  { id: "3", name: "境外学校录取通知书", type: "录取材料", status: "completed", uploadDate: "2026-06-10", required: true },
  { id: "4", name: "签证复印件", type: "证件材料", status: "completed", uploadDate: "2026-08-01", required: true },
  { id: "5", name: "在外情况登记表", type: "在外材料", status: "completed", uploadDate: "2026-09-15", required: true },
  { id: "6", name: "学习报告（月度）", type: "学习材料", status: "completed", uploadDate: "2028-05-30", required: true },
  { id: "7", name: "境外成绩单", type: "成绩材料", status: "completed", uploadDate: "2028-06-20", required: true },
  { id: "8", name: "学分兑换审批表", type: "学分材料", status: "completed", uploadDate: "2028-07-05", required: true },
  { id: "9", name: "学籍恢复审批表", type: "学籍材料", status: "completed", uploadDate: "2028-07-01", required: true },
  { id: "10", name: "留学总结报告", type: "总结材料", status: "completed", uploadDate: "2028-07-10", required: true },
  { id: "11", name: "境外学位证书", type: "证书材料", status: "pending", required: false },
  { id: "12", name: "获奖证明", type: "荣誉材料", status: "pending", required: false },
]

export default function ArchivePage() {
  const [confirmArchive, setConfirmArchive] = useState(false)
  const [isArchived, setIsArchived] = useState(false)

  const completedCount = archiveDocuments.filter(d => d.status === "completed").length
  const requiredCount = archiveDocuments.filter(d => d.required).length
  const completedRequiredCount = archiveDocuments.filter(d => d.required && d.status === "completed").length
  const progress = (completedRequiredCount / requiredCount) * 100

  const handleArchive = () => {
    setIsArchived(true)
  }

  if (isArchived) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="max-w-lg w-full border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <PartyPopper className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-green-900 mb-2">恭喜您！留学流程已全部完成</h2>
            <p className="text-green-700 mb-6">
              您的所有留学材料已成功归档，留学流程正式结束。感谢您参与国际化项目，祝您学业有成！
            </p>
            <div className="p-4 bg-white rounded-lg mb-6">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <div className="text-sm text-muted-foreground">项目名称</div>
                  <div className="font-medium">中美人才培养计划</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">留学时长</div>
                  <div className="font-medium">22个月</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">归档文件</div>
                  <div className="font-medium">{completedCount} 份</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">归档日期</div>
                  <div className="font-medium">2028-07-15</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                下载归档证明
              </Button>
              <Link href="/">
                <Button className="gap-2">
                  返回首页
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
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
          <h1 className="text-2xl font-bold text-foreground">电子归档</h1>
          <p className="text-muted-foreground mt-1">确认并归档您的全部留学材料，完成留学流程</p>
        </div>

        {/* 归档进度 */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-blue-900">材料归档进度</h3>
                <p className="text-sm text-blue-700">必要材料已完成 {completedRequiredCount}/{requiredCount} 项</p>
              </div>
              <Badge className={progress === 100 ? "bg-green-500" : "bg-blue-500"}>
                {progress === 100 ? "可以归档" : "材料收集中"}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* 材料清单 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileArchive className="h-4 w-4" />
              归档材料清单
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {archiveDocuments.map(doc => (
                <div 
                  key={doc.id} 
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    doc.status === "completed" ? "bg-green-50 border-green-200" :
                    doc.status === "missing" ? "bg-red-50 border-red-200" :
                    "bg-muted/50 border-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {doc.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : doc.status === "missing" ? (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{doc.name}</span>
                        {doc.required && (
                          <Badge variant="outline" className="text-xs">必需</Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {doc.type} {doc.uploadDate && `· 上传于 ${doc.uploadDate}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.status === "completed" && (
                      <>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Badge className={
                      doc.status === "completed" ? "bg-green-500" :
                      doc.status === "missing" ? "bg-red-500" :
                      "bg-muted text-muted-foreground"
                    }>
                      {doc.status === "completed" ? "已完成" :
                       doc.status === "missing" ? "缺失" : "待提交"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 确认归档 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">确认归档</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900">注意事项</h4>
                  <ul className="text-sm text-amber-700 mt-1 space-y-1">
                    <li>• 归档后材料将永久保存，无法修改</li>
                    <li>• 请确保所有材料信息准确无误</li>
                    <li>• 归档完成后您可以随时下载材料副本</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <Checkbox 
                id="confirm" 
                checked={confirmArchive}
                onCheckedChange={(checked) => setConfirmArchive(checked === true)}
              />
              <label htmlFor="confirm" className="text-sm cursor-pointer">
                我已确认以上所有材料信息准确无误，同意进行电子归档。归档后，我的留学流程将正式结束。
              </label>
            </div>
          </CardContent>
        </Card>

        {/* 提交按钮 */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="min-w-[160px] gap-2">
            <Download className="h-4 w-4" />
            下载全部材料
          </Button>
          <Button 
            className="min-w-[160px] gap-2" 
            disabled={!confirmArchive || progress < 100}
            onClick={handleArchive}
          >
            <FileArchive className="h-4 w-4" />
            确认归档
          </Button>
        </div>
      </div>

      {/* 右侧AI助手面板 */}
      <div className="w-72 shrink-0">
        <Card className="sticky top-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-white">AI归档助手</CardTitle>
                <p className="text-xs text-slate-400">智能检查材料完整性</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 材料统计 */}
            <div className="p-3 bg-white/10 rounded-lg">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{completedCount}</div>
                  <div className="text-xs text-slate-400">已完成</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{archiveDocuments.length - completedCount}</div>
                  <div className="text-xs text-slate-400">待完成</div>
                </div>
              </div>
            </div>

            {/* 完整性检查 */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400">材料完整性检查</div>
              {progress === 100 ? (
                <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-green-300">所有必需材料已完成</span>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-amber-500/20 rounded-lg border border-amber-500/30">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-amber-300">部分必需材料待完成</span>
                  </div>
                </div>
              )}
            </div>

            {/* 留学成果汇总 */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400">留学成果汇总</div>
              <div className="p-3 bg-white/10 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-400" />
                  <span className="text-xs text-slate-300">获得双学位证书</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-400" />
                  <span className="text-xs text-slate-300">兑换学分: 45学分</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-slate-300">提交学习报告: 22份</span>
                </div>
              </div>
            </div>

            {/* 流程完成提示 */}
            <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
              <p className="text-xs text-purple-200">
                归档完成后，您的整个留学流程将正式结束。感谢您参与国际化项目！
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
