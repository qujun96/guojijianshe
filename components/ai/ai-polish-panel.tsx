"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Sparkles, StopCircle, RefreshCcw, Check, ArrowDown, Replace, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIPolishPanelProps {
  originalText: string
  fieldType?: string
  onReplace: (text: string) => void
  onAppend: (text: string) => void
  onClose: () => void
  isOpen: boolean
}

// 内置的真实润色内容
const presetPolishedContent: Record<string, { original: string; polished: string }[]> = {
  // 健康状况
  healthStatus: [
    {
      original: "身体健康",
      polished: "本人身体健康状况良好，无重大疾病史，无传染性疾病，无药物过敏史。近三年体检结果均显示各项指标正常，能够适应出国学习和生活的身体需求。心理健康状况稳定，具备良好的环境适应能力和抗压能力。"
    },
    {
      original: "健康良好，无疾病",
      polished: "本人身体健康状况优良，经校医院体检各项生理指标均在正常范围内。无心脏病、高血压、糖尿病等慢性疾病，无精神类疾病史，无传染病史。具备良好的身体素质，能够承受出国交流期间的学习和生活压力。"
    }
  ],
  // 出国经历
  overseasExperience: [
    {
      original: "去过C国旅游",
      polished: "2024年8月，本人随家人前往C国进行为期10天的文化交流之旅，期间游览了C国主要城市，深入了解了C国的历史文化和现代社会发展。此次经历培养了本人的跨文化交际能力，增强了独立生活的信心，为今后的海外学习奠定了良好基础。"
    },
    {
      original: "没有出国经历",
      polished: "本人近三年暂无出国（境）经历。但通过学校组织的国际交流活动、线上国际学术会议以及与外国留学生的日常交流，本人已具备基本的跨文化沟通能力和国际视野。同时，本人积极学习目标国家的语言和文化，为即将到来的海外学习做好充分准备。"
    }
  ],
  // 获奖情况
  awards: [
    {
      original: "获得过奖学金",
      polished: "1. 2024-2025学年荣获校级一等奖学金（专业排名前5%）；\n2. 2023年全国大学生英语竞赛二等奖；\n3. 2024年校级优秀学生干部荣誉称号；\n4. 2023年暑期社会实践优秀个人。\n以上奖项充分体现了本人在学业成绩、英语能力和综合素质方面的突出表现。"
    },
    {
      original: "比赛获奖",
      polished: "1. 2024年\"挑战杯\"全国大学生课外学术科技作品竞赛省级三等奖；\n2. 2024年全国大学生数学建模竞赛省级二等奖；\n3. 2023年校级创新创业大赛一等奖；\n4. 连续两年获得校级学业优秀奖学金。\n上述获奖经历展示了本人扎实的专业基础和较强的科研创新能力。"
    }
  ],
  // 政治表现
  politicalPerformance: [
    {
      original: "思想积极向上",
      polished: "一、理论学习方面：本人认真学习习近平新时代中国特色社会主义思想，积极参加党团组织的政治理论学习活动，阅读《习近平谈治国理政》等重要著作，不断提升政治理论素养。\n\n二、政治立场方面：本人坚定拥护中国共产党的领导，坚持正确的政治方向，自觉维护国家利益和民族尊严，在大是大非问题上立场坚定、态度鲜明。\n\n三、实践行动方面：本人积极参与志愿服务和社会实践活动，将爱国情怀转化为实际行动，在学习生活中发挥模范带头作用，展现新时代大学生的责任担当。"
    }
  ],
  // 研修计划
  studyPlan: [
    {
      original: "想学习专业课程",
      polished: "一、学习目标：\n通过本次交换学习，系统学习目标院校的优势学科课程，拓展国际学术视野，提升专业英语应用能力，为今后的学术研究和职业发展奠定坚实基础。\n\n二、课程安排：\n1. 核心专业课程（9学分）：选修与本专业相关的2-3门核心课程；\n2. 跨学科选修（3学分）：选择1门跨学科课程拓展知识面；\n3. 语言文化课程（3学分）：加强学术英语写作与口语表达能力。\n\n三、预期成果：\n1. 完成不少于15学分的课程学习，成绩达到良好以上；\n2. 完成一篇英文学术论文或研究报告；\n3. 建立与海外导师和同学的学术联系网络；\n4. 深入了解当地文化，提升跨文化交际能力。"
    }
  ],
  // 申请人申明
  declaration: [
    {
      original: "保证信息真实",
      polished: "本人郑重声明：\n\n1. 本申请表中所填写的全部信息真实、准确、完整，所提交的证明材料均为原件或经核实的复印件；\n\n2. 本人充分了解并同意遵守国家、学校关于出国（境）交流的各项规定和要求；\n\n3. 本人承诺在交流期间遵守所在国家（地区）法律法规，尊重当地风俗习惯，维护国家和学校声誉；\n\n4. 本人承诺按时完成学习任务，定期向学校报告学习和生活情况，按期返校；\n\n5. 如有违反上述承诺的行为，本人愿意承担相应的法律责任和处分。\n\n申请人签名：___________\n日期：___________"
    }
  ],
  // 学习内容总结
  learningContent: [
    {
      original: "这个月学了很多课程",
      polished: "本月学习内容总结如下：\n\n一、课程学习：\n本月共完成3门核心课程的学习，包括《高级商务分析》《国际市场营销》《跨文化管理》。通过案例分析、小组讨论和课堂展示等多种教学形式，系统掌握了相关理论知识，并能够结合实际案例进行分析应用。\n\n二、学术活动：\n参加了学院组织的2场学术讲座，主题分别涉及\"数字化转型趋势\"和\"可持续发展战略\"，拓展了学术视野，了解了行业前沿动态。\n\n三、实践项目：\n作为小组核心成员参与了一项企业咨询项目，负责市场调研和数据分析工作，锻炼了团队协作和项目管理能力。"
    }
  ],
  // 学习收获与体会
  learningGains: [
    {
      original: "收获很大",
      polished: "本月的海外学习经历让我收获颇丰：\n\n一、学术能力提升：\n通过全英文授课环境的浸润，我的专业英语听说读写能力得到显著提升，能够更加自信地参与课堂讨论和学术交流。同时，接触到了不同的教学方法和学术思维方式，拓展了分析问题和解决问题的视角。\n\n二、跨文化交流：\n与来自不同国家的同学共同学习和生活，让我深刻体会到文化差异带来的思维碰撞。学会了以更开放和包容的心态理解和尊重不同文化，提升了跨文化沟通能力。\n\n三、个人成长：\n独立应对海外学习生活中的各种挑战，增强了自我管理能力和心理韧性。这段经历将成为我人生中宝贵的财富，激励我在未来的学习和工作中不断追求卓越。"
    }
  ],
  // 项目介绍
  projectIntro: [
    {
      original: "交换生项目",
      polished: "本项目是我校与A国B大学联合开展的学期交换生项目，旨在为优秀本科生提供赴海外知名高校学习交流的宝贵机会。\n\n项目特色：\n1. 学分互认：交换期间所修学分可按规定转换为本校学分；\n2. 奖学金支持：提供学费减免和生活补贴，减轻学生经济负担；\n3. 语言培训：提供出发前韩语基础培训和到校后的语言支持；\n4. 全程指导：配备专属导师，提供学业和生活指导服务。\n\n申请条件：GPA 3.0以上，通过英语CET-4或具备相应韩语能力。"
    }
  ],
  // 默认通用润色
  default: [
    {
      original: "",
      polished: "根据您提供的内容，AI为您进行了专业润色和优化：\n\n1. 优化了语言表达，使内容更加规范、专业；\n2. 完善了逻辑结构，使叙述更加条理清晰；\n3. 丰富了细节描述，使内容更加充实具体；\n4. 调整了格式排版，使呈现更加美观整洁。\n\n以上优化建议仅供参考，您可根据实际情况进行调整。"
    }
  ]
}

// 根据字段类型和原文获取润色内容
const getPolishedText = (fieldType: string, originalText: string): string => {
  const presets = presetPolishedContent[fieldType] || presetPolishedContent.default
  
  // 查找匹配的预设内容
  const matched = presets.find(p => 
    originalText.toLowerCase().includes(p.original.toLowerCase()) ||
    p.original.toLowerCase().includes(originalText.toLowerCase().substring(0, 4))
  )
  
  if (matched) {
    return matched.polished
  }
  
  // 如果没有匹配，返回通用润色内容或第一个预设
  return presets[0]?.polished || presetPolishedContent.default[0].polished
}

export function AIPolishPanel({
  originalText,
  fieldType = "default",
  onReplace,
  onAppend,
  onClose,
  isOpen,
}: AIPolishPanelProps) {
  const [status, setStatus] = useState<"polishing" | "completed" | "stopped">("polishing")
  const [displayedText, setDisplayedText] = useState("")
  const [fullText, setFullText] = useState("")
  const [charIndex, setCharIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // 重置状态当打开时
  useEffect(() => {
    if (isOpen) {
      setStatus("polishing")
      setDisplayedText("")
      setCharIndex(0)
      const polished = getPolishedText(fieldType, originalText)
      setFullText(polished)
    }
  }, [isOpen, originalText, fieldType])

  // 打字机效果 - 调慢速度到80ms
  useEffect(() => {
    if (status === "polishing" && fullText && charIndex < fullText.length) {
      intervalRef.current = setInterval(() => {
        setCharIndex(prev => {
          if (prev >= fullText.length - 1) {
            setStatus("completed")
            if (intervalRef.current) clearInterval(intervalRef.current)
            return prev
          }
          return prev + 1
        })
      }, 80) // 从30ms调整到80ms，更慢的打字速度
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [status, fullText, charIndex])

  // 更新显示文本
  useEffect(() => {
    setDisplayedText(fullText.slice(0, charIndex + 1))
  }, [charIndex, fullText])

  const handleStop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setStatus("stopped")
  }

  const handleRepolish = () => {
    setCharIndex(0)
    setDisplayedText("")
    setStatus("polishing")
  }

  const handleReplace = () => {
    onReplace(fullText)
    onClose()
  }

  const handleAppend = () => {
    onAppend(fullText)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            {status === "polishing" && (
              <>
                <span className="text-sm font-medium text-blue-600">内容润色中，请稍后</span>
                <span className="flex gap-1 ml-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              </>
            )}
            {status === "completed" && (
              <>
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">内容润色成功</span>
              </>
            )}
            {status === "stopped" && (
              <span className="text-sm font-medium text-amber-600">润色已停止</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Original Text */}
        <div className="px-4 pt-4">
          <div className="text-xs text-muted-foreground mb-2">原始内容：</div>
          <div className="bg-muted/50 rounded-lg p-3 max-h-24 overflow-y-auto">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {originalText || "（无内容）"}
            </p>
          </div>
        </div>

        {/* Polished Content */}
        <div className="p-4">
          <div className="text-xs text-muted-foreground mb-2">润色后内容：</div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 min-h-32 max-h-64 overflow-y-auto">
            <p className="text-sm text-blue-800 whitespace-pre-wrap leading-relaxed">
              {displayedText}
              {status === "polishing" && (
                <span className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5 animate-pulse" />
              )}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t">
          <div>
            {status === "polishing" && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-1.5"
                onClick={handleStop}
              >
                <StopCircle className="h-4 w-4" />
                停止润色
              </Button>
            )}
            {(status === "completed" || status === "stopped") && (
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 gap-1.5"
                onClick={handleRepolish}
              >
                <RefreshCcw className="h-4 w-4" />
                重新润色
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground mr-2">内容由AI生成，仅供参考</span>
            {(status === "completed" || status === "stopped") && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={handleAppend}
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                  补充到内容下方
                </Button>
                <Button
                  size="sm"
                  className="gap-1.5 bg-blue-500 hover:bg-blue-600"
                  onClick={handleReplace}
                >
                  <Replace className="h-3.5 w-3.5" />
                  替换为此内容
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// AI润色按钮组件
interface AIPolishButtonProps {
  text: string
  fieldType?: string
  onPolishComplete: (text: string, mode: "replace" | "append") => void
  disabled?: boolean
  className?: string
}

export function AIPolishButton({
  text,
  fieldType = "default",
  onPolishComplete,
  disabled = false,
  className,
}: AIPolishButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        disabled={disabled}
        className={cn(
          "h-6 text-xs gap-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-200 text-purple-700 hover:bg-purple-100",
          className
        )}
        onClick={() => setIsOpen(true)}
      >
        <Sparkles className="h-3 w-3" />
        AI润色
      </Button>

      <AIPolishPanel
        isOpen={isOpen}
        originalText={text}
        fieldType={fieldType}
        onReplace={(newText) => onPolishComplete(newText, "replace")}
        onAppend={(newText) => onPolishComplete(newText, "append")}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
