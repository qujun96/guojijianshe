"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AIAssistantPanel,
  AIScoreCard,
  AISuggestion,
  AIReminder,
  AIChecklistItem,
} from "@/components/ai/ai-assistant-panel"
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Award,
  Sparkles,
  Plus,
  Trash2,
  Eye,
  GraduationCap,
  Calculator
} from "lucide-react"

const courses = [
  {
    id: 1,
    courseName: "Advanced Computer Science",
    courseNameCn: "高级计算机科学",
    credits: 4,
    grade: "A",
    score: 92,
    aiRecognized: true,
  },
  {
    id: 2,
    courseName: "Data Structures and Algorithms",
    courseNameCn: "数据结构与算法",
    credits: 3,
    grade: "A-",
    score: 88,
    aiRecognized: true,
  },
  {
    id: 3,
    courseName: "Machine Learning Fundamentals",
    courseNameCn: "机器学习基础",
    credits: 3,
    grade: "B+",
    score: 85,
    aiRecognized: true,
  },
]

export default function GradesSubmitPage() {
  const [uploadedFile, setUploadedFile] = useState<string | null>("Transcript_Cambridge_2026.pdf")

  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0)
  const avgScore = Math.round(courses.reduce((sum, c) => sum + c.score, 0) / courses.length)

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Award className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">海外成绩提交</CardTitle>
                <CardDescription>
                  请上传境外学校出具的官方成绩单，系统将自动识别课程信息
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
                <div className="text-sm text-muted-foreground">学习期间</div>
                <div className="font-medium mt-1">2026-07-15 至 2026-08-30</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">成绩提交截止</div>
                <div className="font-medium mt-1 text-green-600">2026-10-30</div>
              </div>
              <Badge className="bg-green-500">
                待提交成绩
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-5 w-5" />
                成绩单上传
              </CardTitle>
              {uploadedFile && (
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI已识别
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!uploadedFile ? (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="text-sm font-medium mt-3">点击或拖拽上传官方成绩单</p>
                <p className="text-xs text-muted-foreground mt-2">支持 PDF 格式，文件大小不超过20MB</p>
                <p className="text-xs text-muted-foreground mt-1">AI将自动识别课程名称、学分和成绩信息</p>
              </div>
            ) : (
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{uploadedFile}</p>
                      <p className="text-xs text-muted-foreground">上传于 2026-09-15 10:30</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      预览
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-1" />
                      删除
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                课程成绩明细
              </CardTitle>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-1">
                  <Sparkles className="h-4 w-4" />
                  重新识别
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  手动添加
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>课程名称（英文）</TableHead>
                  <TableHead>课程名称（中文）</TableHead>
                  <TableHead>学分</TableHead>
                  <TableHead>等级</TableHead>
                  <TableHead>分数</TableHead>
                  <TableHead>识别状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.courseName}</TableCell>
                    <TableCell>
                      <Input 
                        defaultValue={course.courseNameCn} 
                        className="h-8 w-40"
                      />
                    </TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        {course.grade}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{course.score}</TableCell>
                    <TableCell>
                      {course.aiRecognized && (
                        <div className="flex items-center gap-1 text-green-600 text-sm">
                          <CheckCircle2 className="h-4 w-4" />
                          已识别
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-7 text-primary">
                        编辑
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">总学分：</span>
                  <span className="font-bold text-lg ml-1">{totalCredits}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">平均分：</span>
                  <span className="font-bold text-lg ml-1 text-green-600">{avgScore}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">保存草稿</Button>
                <Button>提交审核</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI成绩助手" subtitle="智能识别与分析您的海外成绩">
        <AIScoreCard score={avgScore} label="平均成绩" color="success" />

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            成绩识别统计
          </h4>
          <div className="space-y-2">
            <AIChecklistItem label="课程识别" status="completed" detail="3门" />
            <AIChecklistItem label="学分识别" status="completed" detail="10学分" />
            <AIChecklistItem label="成绩转换" status="completed" detail="已完成" />
          </div>
        </div>

        <AISuggestion
          title="AI智能翻译"
          description="点击可自动将英文课程名称翻译为中文，便于后续学分兑换"
          type="action"
          onApply={() => {}}
        />

        <div className="space-y-2">
          <h4 className="text-sm font-medium">成绩换算说明</h4>
          <div className="bg-muted rounded-lg p-3 text-xs space-y-1">
            <div className="flex justify-between">
              <span>A / A+</span>
              <span>90-100分</span>
            </div>
            <div className="flex justify-between">
              <span>A-</span>
              <span>85-89分</span>
            </div>
            <div className="flex justify-between">
              <span>B+ / B</span>
              <span>80-84分</span>
            </div>
            <div className="flex justify-between">
              <span>B- / C+</span>
              <span>70-79分</span>
            </div>
          </div>
        </div>

        <AIReminder
          title="成绩提交截止"
          deadline="2026-10-30 23:59"
          description="请在截止日期前完成成绩提交，逾期将影响学分兑换申请"
        />

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <h4 className="text-sm font-medium mb-2">AI提示</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>- 成绩单需为官方出具的正式文件</li>
            <li>- 如有成绩复议，请上传最终成绩单</li>
            <li>- 中文课程名称将用于学分兑换匹配</li>
          </ul>
        </div>
      </AIAssistantPanel>
    </div>
  )
}
