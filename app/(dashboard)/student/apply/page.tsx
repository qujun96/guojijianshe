"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  AIAssistantPanel,
  AIScoreCard,
  AIRecommendation,
  AIReminder,
  AIAnalysisItem,
} from "@/components/ai/ai-assistant-panel"
import { Search, RotateCcw, Calendar, Sparkles, TrendingUp, Globe, Award } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: 1,
    name: "2026年《中美人才培养计划》1+2+1双学位项目和YES非学位项目",
    type: "热门项目",
    tags: ["强力推荐", "高成功率"],
    matchScore: 95,
    matchDesc: "专业对口，您的GPA和外语成绩超要求",
    startTime: "2026-09-01 00:00",
    endTime: "2028-09-01 23:59",
    duration: "三个月及以上",
    category: "学期访问学习",
    deadline: "2026-04-10 09:55",
    successRate: 90,
    aiRecommend: true,
  },
  {
    id: 2,
    name: "(亚洲地区)2026年秋季学期第三批交换生项目",
    type: "交换生",
    tags: ["强力推荐", "高质量"],
    matchScore: 88,
    matchDesc: "传媒类专业对口，交换机会难得",
    startTime: "2026-09-01 00:00",
    endTime: "2028-09-01 23:59",
    duration: "三个月及以上",
    category: "学期访问学习",
    deadline: "2026-04-10 09:55",
    successRate: 80,
    aiRecommend: true,
  },
  {
    id: 3,
    name: "(欧洲地区)2026年秋季学期第二批交换生项目",
    type: "交换生",
    tags: ["交换生"],
    matchScore: 70,
    matchDesc: "需要法语或德语基础，竞争较激烈",
    startTime: "2026-09-01 00:00",
    endTime: "2028-09-01 23:59",
    duration: "三个月及以上",
    category: "学期访问学习",
    deadline: "2026-04-10 09:55",
    successRate: 65,
    aiRecommend: false,
  },
]

export default function StudentApplyPage() {
  const [filter, setFilter] = useState("all")

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">项目查询</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filter Tabs */}
            <div className="flex gap-2">
              <Button 
                variant={filter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("all")}
              >
                全部项目 <Badge variant="secondary" className="ml-1">4</Badge>
              </Button>
              <Button 
                variant={filter === "open" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("open")}
              >
                开放报名 <Badge variant="secondary" className="ml-1">3</Badge>
              </Button>
              <Button 
                variant={filter === "deadline" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("deadline")}
              >
                即将截止 <Badge variant="secondary" className="ml-1">1</Badge>
              </Button>
            </div>

            {/* Search Filters */}
            <div className="grid grid-cols-5 gap-3">
              <Input placeholder="请输入项目名称" />
              <div className="flex items-center gap-2">
                <Input type="date" placeholder="请选择开始时间" />
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-2">
                <Input type="date" placeholder="请选择结束时间" />
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <Button className="gap-2">
                <Search className="h-4 w-4" />
                搜索
              </Button>
              <Button variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                重置
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">项目查看</h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="relative overflow-hidden">
              {project.aiRecommend && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-gradient-to-r from-[hsl(280,60%,55%)] to-[hsl(320,55%,50%)] text-white border-0">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI推荐
                  </Badge>
                </div>
              )}
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <Globe className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm leading-tight line-clamp-2">{project.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className={`text-2xl font-bold ${
                      project.matchScore >= 90 ? "text-green-500" : 
                      project.matchScore >= 80 ? "text-primary" : "text-amber-500"
                    }`}>
                      {project.matchScore}
                    </div>
                    <div className="text-xs text-muted-foreground">匹配度{project.matchScore}%</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{project.matchDesc}</p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">派出时间</span>
                    <p className="font-medium mt-1">{project.startTime} 至 {project.endTime}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">项目时长</span>
                    <p className="font-medium mt-1">{project.duration}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">类别</span>
                    <p className="font-medium mt-1">{project.category}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">报名截止时间</span>
                    <p className="font-medium mt-1">{project.deadline}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <TrendingUp className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">预计成功率</span>
                    <Progress value={project.successRate} className="w-16 h-2" />
                    <span className="font-medium">{project.successRate}%</span>
                  </div>
                </div>

                <Link href={`/student/apply/${project.id}`} className="w-full">
                  <Button className="w-full">申请</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>共 92 条</span>
          <Button variant="outline" size="sm" disabled>上一页</Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">下一页</Button>
          <span>50 条/页</span>
          <span>跳至</span>
          <Input className="w-16 h-8" />
          <span>页</span>
        </div>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI智能助手" subtitle="实时指导您的申请填写">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-primary">80%</div>
            <div className="text-xs text-muted-foreground mt-1">平均匹配度</div>
          </div>
          <div className="bg-muted rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-500">80%</div>
            <div className="text-xs text-muted-foreground mt-1">平均成功率</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            智能推荐
            <Badge variant="outline" className="ml-auto">推荐1</Badge>
          </h4>
          
          <AIRecommendation
            title="2026年《中美人才培养计划》1+2+1双学位项目和YES非学位项目"
            stats={[
              { label: "双学位项目，含金量高，您的学术背景完全符合", value: "" }
            ]}
            highlight
          />

          <Badge variant="outline" className="w-full justify-center py-1">推荐2</Badge>
          
          <AIRecommendation
            title="(亚洲地区)2026年秋季学期第三批交换生项目"
            stats={[
              { label: "性价比高，传媒资源丰富，适合专业发展", value: "" }
            ]}
          />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Award className="h-4 w-4" />
            竞争力分析
          </h4>
          <div className="space-y-1">
            <AIAnalysisItem label="您的GPA" value="3.97" comparison="平均GPA: 3.12" />
            <AIAnalysisItem label="您的CET-6" value="558" comparison="平均CET-6: 408" />
          </div>
        </div>

        <AIReminder
          title="重要提醒"
          deadline="(欧洲地区)2026年秋季学期第二批交换生项目"
          description="报名即将截止：2026-04-10 09:55，请确保所有申请材料齐全，缺少材料可能导致申请被驳回"
          urgent
        />
      </AIAssistantPanel>
    </div>
  )
}
