"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  AISuggestion,
  AIReminder,
  AIRecommendation,
  AIInsight,
} from "@/components/ai/ai-assistant-panel"
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Plus,
  GraduationCap,
  RefreshCw,
  AlertCircle,
  Lightbulb
} from "lucide-react"

const creditMappings = [
  {
    id: 1,
    foreignCourse: "Advanced Computer Science",
    foreignCredits: 4,
    foreignGrade: "A",
    localCourse: "高级程序设计",
    localCredits: 3,
    localCourseCode: "CS3001",
    matchScore: 95,
    aiSuggestion: "高度匹配",
    status: "auto_matched",
  },
  {
    id: 2,
    foreignCourse: "Data Structures and Algorithms",
    foreignCredits: 3,
    foreignGrade: "A-",
    localCourse: "数据结构",
    localCredits: 3,
    localCourseCode: "CS2002",
    matchScore: 92,
    aiSuggestion: "推荐匹配",
    status: "auto_matched",
  },
  {
    id: 3,
    foreignCourse: "Machine Learning Fundamentals",
    foreignCredits: 3,
    foreignGrade: "B+",
    localCourse: null,
    localCredits: null,
    localCourseCode: null,
    matchScore: 0,
    aiSuggestion: "建议手动选择：《机器学习》或《人工智能导论》",
    status: "pending",
  },
]

const localCourses = [
  { code: "CS4001", name: "机器学习", credits: 3 },
  { code: "CS4002", name: "人工智能导论", credits: 2 },
  { code: "CS4003", name: "深度学习", credits: 3 },
]

export default function CreditTransferPage() {
  const [mappings, setMappings] = useState(creditMappings)

  const matchedCount = mappings.filter(m => m.status === "auto_matched").length
  const totalCredits = mappings.filter(m => m.localCredits).reduce((sum, m) => sum + (m.localCredits || 0), 0)

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <RefreshCw className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">学分兑换申请</CardTitle>
                <CardDescription>
                  将海外课程学分兑换为本校专业课程学分，AI将智能推荐匹配方案
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6 p-4 bg-muted rounded-lg">
              <div>
                <div className="text-sm text-muted-foreground">完成项目</div>
                <div className="font-medium mt-1">剑桥大学2026寒假短期课程项目</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">海外课程</div>
                <div className="font-medium mt-1">3门 / 10学分</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">可兑换学分</div>
                <div className="font-medium mt-1 text-primary">{totalCredits}学分</div>
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                待提交申请
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                课程学分兑换映射
              </CardTitle>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-1">
                  <Sparkles className="h-4 w-4" />
                  AI重新匹配
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  手动添加
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mappings.map((mapping) => (
                <div 
                  key={mapping.id} 
                  className={`border rounded-lg p-4 ${
                    mapping.status === "auto_matched" ? "border-green-200 bg-green-50/50" : "border-amber-200 bg-amber-50/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Foreign Course */}
                    <div className="flex-1 p-3 bg-white rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">境外课程</span>
                        <Badge variant="outline" className="text-xs">{mapping.foreignGrade}</Badge>
                      </div>
                      <p className="font-medium text-sm">{mapping.foreignCourse}</p>
                      <p className="text-xs text-muted-foreground mt-1">{mapping.foreignCredits} 学分</p>
                    </div>

                    {/* Arrow */}
                    <div className="flex flex-col items-center gap-1">
                      <ArrowRight className="h-5 w-5 text-primary" />
                      {mapping.status === "auto_matched" && (
                        <Badge className="bg-green-500 text-xs">{mapping.matchScore}%</Badge>
                      )}
                    </div>

                    {/* Local Course */}
                    <div className="flex-1 p-3 bg-white rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">本校课程</span>
                        {mapping.status === "auto_matched" && (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      {mapping.localCourse ? (
                        <>
                          <p className="font-medium text-sm">{mapping.localCourse}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {mapping.localCourseCode} · {mapping.localCredits} 学分
                          </p>
                        </>
                      ) : (
                        <Select>
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue placeholder="请选择匹配课程" />
                          </SelectTrigger>
                          <SelectContent>
                            {localCourses.map((course) => (
                              <SelectItem key={course.code} value={course.code}>
                                {course.name} ({course.credits}学分)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        修改匹配
                      </Button>
                      {mapping.status !== "auto_matched" && (
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive">
                          删除
                        </Button>
                      )}
                    </div>
                  </div>

                  {mapping.status !== "auto_matched" && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-amber-600">
                      <Lightbulb className="h-4 w-4" />
                      <span>AI建议：{mapping.aiSuggestion}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t space-y-4">
              <div className="space-y-2">
                <Label>申请说明（选填）</Label>
                <Textarea 
                  placeholder="如有特殊情况需要说明，请在此处填写..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>境外成绩单 <span className="text-destructive">*</span></Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">上传境外学校官方成绩单</p>
                    <p className="text-xs text-muted-foreground">支持PDF、JPG格式</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>学习证明 <span className="text-destructive">*</span></Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">上传境外学校学习证明</p>
                    <p className="text-xs text-muted-foreground">需包含学习时间和课程信息</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>课程大纲（选填）</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mt-2">上传课程大纲等补充材料</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline">保存草稿</Button>
                <Button>提交学分兑换申请</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI学分助手" subtitle="智能匹配课程学分兑换方案">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-500">{matchedCount}/{mappings.length}</div>
            <div className="text-xs text-muted-foreground mt-1">已匹配课程</div>
          </div>
          <div className="bg-muted rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-primary">{totalCredits}</div>
            <div className="text-xs text-muted-foreground mt-1">可兑换学分</div>
          </div>
        </div>

        <AIScoreCard score={93} label="平均匹配度" color="success" />

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI匹配建议
          </h4>
          
          <AIRecommendation
            title="Machine Learning Fundamentals"
            stats={[
              { label: "推荐匹配", value: "《机器学习》(CS4001)" }
            ]}
            highlight
          />
          <p className="text-xs text-muted-foreground">
            课程内容相似度92%，学分数一致，建议选择此匹配
          </p>
        </div>

        <AIInsight>
          <p className="text-sm font-medium mb-1">兑换预估</p>
          <p className="text-xs">
            根据历史数据分析，您的学分兑换申请通过率约为 <span className="font-bold text-green-600">95%</span>
          </p>
        </AIInsight>

        <AISuggestion
          title="一键优化匹配"
          description="AI可根据课程大纲自动优化匹配方案，提高兑换成功率"
          type="action"
          onApply={() => {}}
        />

        <div className="space-y-2">
          <h4 className="text-sm font-medium">兑换规则说明</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>- 境外课程学分可按1:1或0.8:1比例兑换</li>
            <li>- 专业核心课程需教务处审批</li>
            <li>- 成绩需达到C及以上方可兑换</li>
          </ul>
        </div>

        <AIReminder
          title="申请提交截止"
          deadline="2026-11-30 23:59"
          description="请在下学期选课前完成学分兑换申请"
        />
      </AIAssistantPanel>
    </div>
  )
}
