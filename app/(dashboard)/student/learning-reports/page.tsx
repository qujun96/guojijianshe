"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AIAssistantPanel,
  AISuggestion,
  AIReminder,
  AIInsight,
} from "@/components/ai/ai-assistant-panel"
import { AIPolishButton } from "@/components/ai/ai-polish-panel"
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Clock, 
  BookOpen,
  Sparkles,
  Calendar,
  PenLine,
  ImageIcon,
  Send,
  History,
  TrendingUp,
  MessageSquare
} from "lucide-react"

const submittedReports = [
  {
    id: 1,
    month: "2026年7月",
    title: "第一个月学习总结",
    submitTime: "2026-07-28 15:30",
    status: "approved",
    aiScore: 92,
    feedback: "报告内容详实，学习目标明确，继续保持！",
  },
  {
    id: 2,
    month: "2026年8月",
    title: "第二个月学习总结",
    submitTime: "2026-08-25 10:20",
    status: "reviewing",
    aiScore: 88,
    feedback: null,
  },
]

export default function LearningReportsPage() {
  const [activeTab, setActiveTab] = useState("submit")
  const [reportContent, setReportContent] = useState("")
  const [learningGains, setLearningGains] = useState("")

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

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">学习报告提交</CardTitle>
                <CardDescription>
                  请每月定期提交学习总结报告，记录您的学习进展和收获
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6 p-4 bg-muted rounded-lg">
              <div>
                <div className="text-sm text-muted-foreground">当前项目</div>
                <div className="font-medium mt-1">G国H大学2026寒假短期课程项目</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">派出期间</div>
                <div className="font-medium mt-1">2026-07-15 至 2026-08-30</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">已提交报告</div>
                <div className="font-medium mt-1">2 / 2 份</div>
              </div>
              <Badge className="bg-green-500">
                报告正常
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="submit" className="gap-2">
              <PenLine className="h-4 w-4" />
              提交报告
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              历史报告
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submit" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">新建学习报告</CardTitle>
                  <Select defaultValue="sep">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="选择月份" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jul">2026年7月</SelectItem>
                      <SelectItem value="aug">2026年8月</SelectItem>
                      <SelectItem value="sep">2026年9月</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    报告标题
                    <Badge variant="destructive" className="text-xs">必填</Badge>
                  </Label>
                  <Input placeholder="请输入报告标题，如：9月份学习总结" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      学习内容总结
                      <Badge variant="destructive" className="text-xs">必填</Badge>
                    </Label>
                    <AIPolishButton
                      text={reportContent}
                      fieldType="learningContent"
                      onPolishComplete={handlePolishComplete(setReportContent, reportContent)}
                    />
                  </div>
                  <Textarea 
                    placeholder="请详细描述本月的学习内容、参加的课程和活动等..."
                    className="min-h-[150px]"
                    value={reportContent}
                    onChange={(e) => setReportContent(e.target.value)}
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {reportContent.length}/2000
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      学习收获与体会
                      <Badge variant="destructive" className="text-xs">必填</Badge>
                    </Label>
                    <AIPolishButton
                      text={learningGains}
                      fieldType="learningGains"
                      onPolishComplete={handlePolishComplete(setLearningGains, learningGains)}
                    />
                  </div>
                  <Textarea 
                    placeholder="请分享您的学习心得、技能提升、文化交流体验等..."
                    className="min-h-[120px]"
                    value={learningGains}
                    onChange={(e) => setLearningGains(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>遇到的困难与解决方案</Label>
                  <Textarea 
                    placeholder="如有��到困难，请描述具体情况及您的解决方式..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>下月学习计划</Label>
                  <Textarea 
                    placeholder="请简述您下个月的学习目标和计划安排..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    图片/附件上传
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">上传学习相关照片或附件</p>
                    <p className="text-xs text-muted-foreground mt-1">支持 JPG、PNG、PDF，最多5个文件</p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline">保存草稿</Button>
                  <Button className="gap-2">
                    <Send className="h-4 w-4" />
                    提交报告
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {submittedReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{report.title}</h3>
                          <Badge variant="secondary">{report.month}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          提交时间：{report.submitTime}
                        </p>
                        {report.feedback && (
                          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <MessageSquare className="h-4 w-4" />
                              导师反馈
                            </div>
                            <p className="text-sm mt-1">{report.feedback}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">AI评分</div>
                        <div className={`text-xl font-bold ${
                          report.aiScore >= 90 ? "text-green-500" : "text-primary"
                        }`}>
                          {report.aiScore}
                        </div>
                      </div>
                      <Badge variant={report.status === "approved" ? "default" : "secondary"}>
                        {report.status === "approved" ? "已审核" : "审核中"}
                      </Badge>
                      <Button variant="outline" size="sm">查看详情</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI写作助手" subtitle="帮助您撰写高质量的学习报告">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>报告提交进度</span>
            <span className="font-medium">2/2</span>
          </div>
          <Progress value={100} className="h-2" />
          <p className="text-xs text-muted-foreground">
            本月报告已提交
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI写作建议
          </h4>
          
          <AISuggestion
            title="内容结构优化"
            description="建议按照 学习概述 -> 具体收获 -> 困难与解决 -> 未来计划 的结构撰写"
            type="info"
          />

          <AISuggestion
            title="一键生成框架"
            description="AI可根据您填写的关键词自动生成报告框架"
            type="action"
            onApply={() => {}}
          />
        </div>

        <AIInsight>
          <p className="text-sm">
            根据您的学习情况，建议重点描述以下内容：
          </p>
          <ul className="text-xs mt-2 space-y-1">
            <li>- 课程参与情况和学习成果</li>
            <li>- 跨文化交流体验</li>
            <li>- 专业技能提升</li>
          </ul>
        </AIInsight>

        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            报告质量分析
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">内容完整度</span>
              <span className="font-medium text-green-500">优秀</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">语言表达</span>
              <span className="font-medium text-green-500">流畅</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">重点突出</span>
              <span className="font-medium text-primary">良好</span>
            </div>
          </div>
        </div>

        <AIReminder
          title="下次提交截止"
          deadline="2026-09-28 23:59"
          description="9月份报告请在月底前提交，建议提前准备"
        />
      </AIAssistantPanel>
    </div>
  )
}
