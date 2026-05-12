"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft,
  Sparkles,
  FileText,
  Upload,
  CheckCircle2,
  Wand2,
  BookOpen,
  Target,
  Users,
  Globe,
  Lightbulb
} from "lucide-react"
import Link from "next/link"

export default function SummaryReportPage() {
  const [isAIGenerating, setIsAIGenerating] = useState(false)
  const [reportContent, setReportContent] = useState({
    background: "",
    learning: "",
    experience: "",
    achievement: "",
    reflection: "",
    suggestion: ""
  })

  const handleAIGenerate = (field: string) => {
    setIsAIGenerating(true)
    setTimeout(() => {
      const aiContent: Record<string, string> = {
        background: "本人于2026年9月至2028年6月参加了《A国B国人才培养计划》1+2+1双学位项目，赴A国某大学进行为期22个月的学习交流。该项目旨在培养具有国际视野的复合型人才，通过中美两校联合培养的模式，让学生获得两校学位证书。",
        learning: "在留学期间，我修读了计算机科学专业的核心课程，包括高级算法、机器学习、软件工程等。通过全英文的教学环境，我的专业英语能力得到了显著提升。同时，我也积极参与了导师的科研项目，完成了一篇关于深度学习的研究论文。",
        experience: "在特洛伊大学学习期间，我积极参与校园活动，加入了国际学生联合会，并担任中国学生学者联合会的副主席。通过组织文化交流活动，我结识了来自世界各地的朋友，拓宽了国际视野。",
        achievement: "1. 获得A国某大学计算机科学学士学位\n2. 发表SCI论文1篇，EI论文1篇\n3. 获得校级优秀国际学生奖学金\n4. 通过AWS云计算认证考试",
        reflection: "这段留学经历让我深刻体会到了中外教育体系的差异，A国高校更注重实践能力和创新思维的培养。我学会了独立思考和解决问题的能力，也更加珍惜国内的教育资源。",
        suggestion: "建议后续参加该项目的同学提前做好语言准备，积极融入当地文化，充分利用学校的各类资源。同时建议学校能够增加行前培训的内容，帮助学生更好地适应海外生活。"
      }
      setReportContent(prev => ({ ...prev, [field]: aiContent[field] }))
      setIsAIGenerating(false)
    }, 1500)
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
          <h1 className="text-2xl font-bold text-foreground">总结报告提交</h1>
          <p className="text-muted-foreground mt-1">撰写留学总结报告，分享您的留学经历与收获</p>
        </div>

        {/* 报告基本信息 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              报告基本信息
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>报告标题 <span className="text-destructive">*</span></Label>
                <Input placeholder="如：我的A国留学之旅" />
              </div>
              <div className="space-y-2">
                <Label>项目名称</Label>
                <Input value="2026年《A国B国人才培养计划》1+2+1双学位项目" disabled />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 项目背景 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="h-4 w-4" />
                项目背景
              </CardTitle>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-7 gap-1 text-xs"
                onClick={() => handleAIGenerate("background")}
                disabled={isAIGenerating}
              >
                <Wand2 className="h-3 w-3" />
                AI生成
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="请简要介绍您参加的项目背景、目的和意义"
              className="min-h-[120px]"
              value={reportContent.background}
              onChange={(e) => setReportContent(prev => ({ ...prev, background: e.target.value }))}
            />
          </CardContent>
        </Card>

        {/* 学习情况 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                学习情况
              </CardTitle>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-7 gap-1 text-xs"
                onClick={() => handleAIGenerate("learning")}
                disabled={isAIGenerating}
              >
                <Wand2 className="h-3 w-3" />
                AI生成
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="请描述您在境外的学习情况，包括修读课程、学习方式、学业成果等"
              className="min-h-[150px]"
              value={reportContent.learning}
              onChange={(e) => setReportContent(prev => ({ ...prev, learning: e.target.value }))}
            />
          </CardContent>
        </Card>

        {/* 生活体验 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                生活体验与文化交流
              </CardTitle>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-7 gap-1 text-xs"
                onClick={() => handleAIGenerate("experience")}
                disabled={isAIGenerating}
              >
                <Wand2 className="h-3 w-3" />
                AI生成
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="请分享您在境外的生活体验、文化交流活动、人际交往等"
              className="min-h-[150px]"
              value={reportContent.experience}
              onChange={(e) => setReportContent(prev => ({ ...prev, experience: e.target.value }))}
            />
          </CardContent>
        </Card>

        {/* 主要成果 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4" />
                主要收获与成果
              </CardTitle>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-7 gap-1 text-xs"
                onClick={() => handleAIGenerate("achievement")}
                disabled={isAIGenerating}
              >
                <Wand2 className="h-3 w-3" />
                AI生成
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="请总结您的主要收获和成果，如学位证书、论文发表、获奖情况等"
              className="min-h-[150px]"
              value={reportContent.achievement}
              onChange={(e) => setReportContent(prev => ({ ...prev, achievement: e.target.value }))}
            />
          </CardContent>
        </Card>

        {/* 心得体会 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                心得体会与反思
              </CardTitle>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-7 gap-1 text-xs"
                onClick={() => handleAIGenerate("reflection")}
                disabled={isAIGenerating}
              >
                <Wand2 className="h-3 w-3" />
                AI生成
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="请分享您的心得体会、成长感悟和反思"
              className="min-h-[150px]"
              value={reportContent.reflection}
              onChange={(e) => setReportContent(prev => ({ ...prev, reflection: e.target.value }))}
            />
          </CardContent>
        </Card>

        {/* 意见建议 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">对项目的意见建议</CardTitle>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-7 gap-1 text-xs"
                onClick={() => handleAIGenerate("suggestion")}
                disabled={isAIGenerating}
              >
                <Wand2 className="h-3 w-3" />
                AI生成
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="请提出对该项目的意见和建议，帮助改进后续项目"
              className="min-h-[120px]"
              value={reportContent.suggestion}
              onChange={(e) => setReportContent(prev => ({ ...prev, suggestion: e.target.value }))}
            />
          </CardContent>
        </Card>

        {/* 附件上传 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">相关附件</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>留学照片（选填）</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">上传留学期间的照片（最多10张）</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>其他附件（选填）</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">上传证书、获奖证明等材料</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 提交按钮 */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="min-w-[120px]">保存草稿</Button>
          <Button variant="outline" className="min-w-[120px]">预览报告</Button>
          <Button className="min-w-[120px]">提交报告</Button>
        </div>
      </div>

      {/* 右侧AI助手面板 */}
      <div className="w-72 shrink-0">
        <Card className="sticky top-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-white">AI写作助手</CardTitle>
                <p className="text-xs text-slate-400">智能辅助报告撰写</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 撰写进度 */}
            <div className="p-3 bg-white/10 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">撰写进度</span>
                <span className="text-sm font-medium text-white">
                  {Object.values(reportContent).filter(v => v.length > 0).length}/6 项
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5">
                <div 
                  className="bg-purple-400 h-1.5 rounded-full transition-all" 
                  style={{ width: `${(Object.values(reportContent).filter(v => v.length > 0).length / 6) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* AI功能说明 */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400">AI辅助功能</div>
              <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
                <p className="text-xs text-purple-200">
                  点击各模块的"AI生成"按钮，AI将根据您的项目信息和历史数据，智能生成参考内容
                </p>
              </div>
            </div>

            {/* 写作建议 */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400">写作建议</div>
              <div className="space-y-2">
                <div className="p-2 bg-white/10 rounded-lg">
                  <p className="text-xs text-slate-300">
                    学习情况建议包含：修读课程、学习方法、学术成果
                  </p>
                </div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <p className="text-xs text-slate-300">
                    生活体验可分享：文化差异、社交活动、难忘经历
                  </p>
                </div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <p className="text-xs text-slate-300">
                    心得体会注重：个人成长、能力提升、价值观变化
                  </p>
                </div>
              </div>
            </div>

            {/* 字数统计 */}
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="text-xs text-slate-400 mb-2">当前字数</div>
              <div className="text-lg font-semibold text-white">
                {Object.values(reportContent).join("").length} 字
              </div>
              <p className="text-xs text-slate-400 mt-1">建议总字数: 2000-5000字</p>
            </div>

            {/* 完成状态 */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400">模块完成状态</div>
              <div className="space-y-1">
                {[
                  { key: "background", label: "项目背景" },
                  { key: "learning", label: "学习情况" },
                  { key: "experience", label: "生活体验" },
                  { key: "achievement", label: "主要成果" },
                  { key: "reflection", label: "心得体会" },
                  { key: "suggestion", label: "意见建议" }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-2 bg-white/5 rounded">
                    <span className="text-xs text-slate-300">{item.label}</span>
                    {reportContent[item.key as keyof typeof reportContent].length > 0 ? (
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    ) : (
                      <Badge variant="outline" className="text-xs border-slate-500 text-slate-400">待填写</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
