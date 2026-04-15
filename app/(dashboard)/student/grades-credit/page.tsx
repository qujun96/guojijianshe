"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
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
  Calculator,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Lightbulb,
  Check
} from "lucide-react"

// 步骤配置
const steps = [
  { id: 1, title: "上传成绩单", description: "上传官方成绩单" },
  { id: 2, title: "确认课程信息", description: "核对成绩明细" },
  { id: 3, title: "学分兑换匹配", description: "匹配本校课程" },
  { id: 4, title: "提交申请", description: "上传材料并提交" },
]

// 课程数据
const initialCourses = [
  {
    id: 1,
    courseName: "Advanced Computer Science",
    courseNameCn: "高级计算机科学",
    credits: 4,
    grade: "A",
    score: 92,
    aiRecognized: true,
    localCourse: "高级程序设计",
    localCourseCode: "CS3001",
    localCredits: 3,
    matchScore: 95,
  },
  {
    id: 2,
    courseName: "Data Structures and Algorithms",
    courseNameCn: "数据结构与算法",
    credits: 3,
    grade: "A-",
    score: 88,
    aiRecognized: true,
    localCourse: "数据结构",
    localCourseCode: "CS2002",
    localCredits: 3,
    matchScore: 92,
  },
  {
    id: 3,
    courseName: "Machine Learning Fundamentals",
    courseNameCn: "机器学习基础",
    credits: 3,
    grade: "B+",
    score: 85,
    aiRecognized: true,
    localCourse: null,
    localCourseCode: null,
    localCredits: null,
    matchScore: 0,
  },
]

const localCourses = [
  { code: "CS4001", name: "机器学习", credits: 3 },
  { code: "CS4002", name: "人工智能导论", credits: 2 },
  { code: "CS4003", name: "深度学习", credits: 3 },
]

export default function GradesCreditPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [courses, setCourses] = useState(initialCourses)
  const [transcriptUploaded, setTranscriptUploaded] = useState(false)
  const [certificateUploaded, setCertificateUploaded] = useState(false)

  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0)
  const avgScore = Math.round(courses.reduce((sum, c) => sum + c.score, 0) / courses.length)
  const matchedCount = courses.filter(c => c.localCourse).length
  const localTotalCredits = courses.filter(c => c.localCredits).reduce((sum, c) => sum + (c.localCredits || 0), 0)

  const progress = (currentStep / steps.length) * 100

  const handleFileUpload = () => {
    setUploadedFile("Transcript_Cambridge_2026.pdf")
  }

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateCourseLocalMatch = (courseId: number, localCourseCode: string) => {
    const localCourse = localCourses.find(c => c.code === localCourseCode)
    if (localCourse) {
      setCourses(courses.map(c => 
        c.id === courseId 
          ? { ...c, localCourse: localCourse.name, localCourseCode: localCourse.code, localCredits: localCourse.credits, matchScore: 85 }
          : c
      ))
    }
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {/* Header Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Award className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">成绩与学分兑换</CardTitle>
                <CardDescription>
                  上传海外成绩单，完成课程学分兑换申请
                </CardDescription>
              </div>
              <Badge className="bg-green-500">进行中</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4 p-4 bg-muted rounded-lg">
              <div>
                <div className="text-sm text-muted-foreground">完成项目</div>
                <div className="font-medium mt-1">剑桥大学2026寒假短期课程项目</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">学习期间</div>
                <div className="font-medium mt-1">2026-07-15 至 2026-08-30</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">提交截止</div>
                <div className="font-medium mt-1 text-amber-600">2026-10-30</div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">申请进度</span>
                <span className="font-medium">{currentStep}/{steps.length} 步</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between">
                {steps.map((step) => (
                  <div 
                    key={step.id} 
                    className={`flex flex-col items-center gap-1 ${
                      step.id === currentStep ? "text-primary" : 
                      step.id < currentStep ? "text-green-600" : "text-muted-foreground"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
                      step.id === currentStep ? "border-primary bg-primary text-white" : 
                      step.id < currentStep ? "border-green-500 bg-green-500 text-white" : "border-muted-foreground"
                    }`}>
                      {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
                    </div>
                    <span className="text-xs font-medium">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Upload Transcript */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-5 w-5" />
                上传成绩单
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!uploadedFile ? (
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
                  onClick={handleFileUpload}
                >
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-base font-medium mt-4">点击或拖拽上传官方成绩单</p>
                  <p className="text-sm text-muted-foreground mt-2">支持 PDF 格式，文件大小不超过20MB</p>
                  <p className="text-sm text-muted-foreground mt-1">AI将自动识别课程名称、学分和成绩信息</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{uploadedFile}</p>
                          <p className="text-xs text-muted-foreground">上传于 2026-09-15 10:30</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          <Sparkles className="h-3 w-3 mr-1" />
                          AI已识别
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          预览
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setUploadedFile(null)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          删除
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="font-medium">AI识别完成</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      已自动识别 <span className="font-bold text-foreground">3</span> 门课程，
                      共 <span className="font-bold text-foreground">10</span> 学分，
                      平均分 <span className="font-bold text-green-600">{avgScore}</span>
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Confirm Course Info */}
        {currentStep === 2 && (
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
                    <TableHead>状态</TableHead>
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
                <Button variant="outline" size="sm">保存修改</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Credit Mapping */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  学分兑换匹配
                </CardTitle>
                <Button variant="outline" size="sm" className="gap-1">
                  <Sparkles className="h-4 w-4" />
                  AI重新匹配
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div 
                    key={course.id} 
                    className={`border rounded-lg p-4 ${
                      course.localCourse ? "border-green-200 bg-green-50/50" : "border-amber-200 bg-amber-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Foreign Course */}
                      <div className="flex-1 p-3 bg-white rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground">境外课程</span>
                          <Badge variant="outline" className="text-xs">{course.grade}</Badge>
                        </div>
                        <p className="font-medium text-sm">{course.courseName}</p>
                        <p className="text-xs text-muted-foreground mt-1">{course.courseNameCn} · {course.credits} 学分</p>
                      </div>

                      {/* Arrow */}
                      <div className="flex flex-col items-center gap-1">
                        <ArrowRight className="h-5 w-5 text-primary" />
                        {course.matchScore > 0 && (
                          <Badge className="bg-green-500 text-xs">{course.matchScore}%</Badge>
                        )}
                      </div>

                      {/* Local Course */}
                      <div className="flex-1 p-3 bg-white rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground">本校课程</span>
                          {course.localCourse && (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        {course.localCourse ? (
                          <>
                            <p className="font-medium text-sm">{course.localCourse}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {course.localCourseCode} · {course.localCredits} 学分
                            </p>
                          </>
                        ) : (
                          <Select onValueChange={(value) => updateCourseLocalMatch(course.id, value)}>
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue placeholder="请选择匹配课程" />
                            </SelectTrigger>
                            <SelectContent>
                              {localCourses.map((lc) => (
                                <SelectItem key={lc.code} value={lc.code}>
                                  {lc.name} ({lc.credits}学分)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>

                      {/* Actions */}
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        修改
                      </Button>
                    </div>

                    {!course.localCourse && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-amber-600">
                        <Lightbulb className="h-4 w-4" />
                        <span>AI建议：建议手动选择《机器学习》或《人工智能导论》</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">已匹配：</span>
                    <span className="font-bold text-lg ml-1">{matchedCount}/{courses.length}</span>
                    <span className="text-muted-foreground ml-1">门</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">可兑换学分：</span>
                    <span className="font-bold text-lg ml-1 text-primary">{localTotalCredits}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Submit Application */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-5 w-5" />
                提交申请材料
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Summary */}
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-medium mb-3">申请摘要</h3>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">境外课程</span>
                    <p className="font-bold text-lg mt-1">{courses.length} 门</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">境外学分</span>
                    <p className="font-bold text-lg mt-1">{totalCredits}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">已匹配课程</span>
                    <p className="font-bold text-lg mt-1">{matchedCount} 门</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">可兑换学分</span>
                    <p className="font-bold text-lg mt-1 text-primary">{localTotalCredits}</p>
                  </div>
                </div>
              </div>

              {/* File Uploads */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>境外成绩单 <span className="text-destructive">*</span></Label>
                  {transcriptUploaded ? (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Transcript_Cambridge_2026.pdf</span>
                      <Button variant="ghost" size="sm" className="ml-auto h-7" onClick={() => setTranscriptUploaded(false)}>
                        更换
                      </Button>
                    </div>
                  ) : (
                    <div 
                      className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer"
                      onClick={() => setTranscriptUploaded(true)}
                    >
                      <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">上传境外学校官方成绩单</p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>学习证明 <span className="text-destructive">*</span></Label>
                  {certificateUploaded ? (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Certificate_Cambridge_2026.pdf</span>
                      <Button variant="ghost" size="sm" className="ml-auto h-7" onClick={() => setCertificateUploaded(false)}>
                        更换
                      </Button>
                    </div>
                  ) : (
                    <div 
                      className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer"
                      onClick={() => setCertificateUploaded(true)}
                    >
                      <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">上传境外学校学习证明</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>课程大纲（选填）</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mt-2">上传课程大纲等补充材料</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>申请说明（选填）</Label>
                <Textarea 
                  placeholder="如有特殊情况需要说明，请在此处填写..."
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            上一步
          </Button>
          <div className="flex gap-3">
            <Button variant="outline">保存草稿</Button>
            {currentStep < steps.length ? (
              <Button 
                onClick={handleNextStep}
                disabled={currentStep === 1 && !uploadedFile}
                className="gap-2"
              >
                下一步
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                className="gap-2"
                disabled={!transcriptUploaded || !certificateUploaded}
              >
                <CheckCircle2 className="h-4 w-4" />
                提交申请
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI成绩助手" subtitle="智能识别与学分兑换">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-500">{avgScore}</div>
            <div className="text-xs text-muted-foreground mt-1">平均成绩</div>
          </div>
          <div className="bg-muted rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-primary">{localTotalCredits}</div>
            <div className="text-xs text-muted-foreground mt-1">可兑换学分</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            进度统计
          </h4>
          <div className="space-y-2">
            <AIChecklistItem 
              label="上传成绩单" 
              status={uploadedFile ? "completed" : currentStep === 1 ? "pending" : "warning"} 
              detail={uploadedFile ? "已上传" : "待上传"} 
            />
            <AIChecklistItem 
              label="确认课程信息" 
              status={currentStep > 2 ? "completed" : currentStep === 2 ? "pending" : "warning"} 
              detail={`${courses.length}门课程`} 
            />
            <AIChecklistItem 
              label="学分兑换匹配" 
              status={currentStep > 3 ? "completed" : currentStep === 3 ? "pending" : "warning"} 
              detail={`${matchedCount}/${courses.length}已匹配`} 
            />
            <AIChecklistItem 
              label="提交申请" 
              status={currentStep === 4 ? "pending" : "warning"} 
              detail="待提交" 
            />
          </div>
        </div>

        {currentStep === 3 && matchedCount < courses.length && (
          <AISuggestion
            title="一键优化匹配"
            description="AI可根据课程大纲自动优化匹配方案，提高兑换成功率"
            type="action"
            onApply={() => {}}
          />
        )}

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
          </div>
        </div>

        <AIReminder
          title="提交截止时间"
          deadline="2026-10-30 23:59"
          description="请在截止日期前完成成绩提交与学分兑换申请"
        />

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <h4 className="text-sm font-medium mb-2">AI提示</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>- 成绩单需为官方出具的正式文件</li>
            <li>- 境外课程学分可按1:1或0.8:1比例兑换</li>
            <li>- 成绩需达到C及以上方可兑换</li>
          </ul>
        </div>
      </AIAssistantPanel>
    </div>
  )
}
