"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Bot, Sparkles, CheckCircle2, AlertCircle, Clock, Lightbulb, TrendingUp, FileText, MessageSquare, Send, User, Loader2 } from "lucide-react"

interface AIAssistantPanelProps {
  title?: string
  subtitle?: string
  children?: React.ReactNode
  className?: string
  showChat?: boolean
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const FAQ_SUGGESTIONS = [
  "出国交换需要准备什么材料?",
  "如何办理保留学籍?",
  "学分兑换的流程是什么?",
  "回国后需要办理哪些手续?",
]

const AI_RESPONSES: Record<string, string> = {
  "出国交换需要准备什么材料": "出国交换需要准备以下材料:\n\n1. 基础材料\n   - 有效护照(有效期超过6个月)\n   - 身份证复印件\n   - 学生证复印件\n\n2. 学业材料\n   - 中英文成绩单\n   - 在读证明\n   - GPA证明\n\n3. 语言证明\n   - 托福/雅思成绩单\n   - 或四六级成绩单\n\n4. 申请材料\n   - 个人陈述\n   - 研修计划\n   - 导师推荐信\n\n5. 其他材料\n   - 健康证明\n   - 保险证明\n   - 资金证明\n\n具体要求可能因项目不同而有所差异，建议查看具体项目的材料清单。",
  "如何办理保留学籍": "保留学籍办理流程:\n\n1. 登录统一服务平台\n   - 进入派出前学籍处理模块\n   - 点击学籍异动办理\n\n2. 系统自动识别身份\n   - 本科生跳转本科生院系统\n   - 研究生跳转研究生院系统\n\n3. 提交申请材料\n   - 填写保留学籍申请表\n   - 上传录取通知书\n   - 上传派出证明\n\n4. 审批流程\n   - 学院初审\n   - 教务处/研究生院复审\n   - 审批通过后状态自动同步\n\n5. 注意事项\n   - 保留学籍一般不超过2年\n   - 需在派出前完成办理\n\n如有疑问，可联系学院教务办公室。",
  "学分兑换的流程是什么": "学分兑换流程:\n\n1. 准备材料\n   - 境外学校官方成绩单(需认证)\n   - 学习证明/完成证书\n   - 课程大纲(中英文)\n   - 课程描述\n\n2. 在线申请\n   - 登录回国事务办理模块\n   - 点击学分兑换申请\n   - 填写课程对照信息\n   - 上传证明材料\n\n3. AI智能匹配\n   - 系统自动分析课程相似度\n   - 推荐可兑换的本校课程\n   - 预估兑换学分\n\n4. 审批流程\n   - 专业导师审核\n   - 学院教务审批\n   - 可能需要补充材料\n\n5. 结果确认\n   - 审批通过后学分自动录入\n   - 可在成绩单中查看\n\n建议保留所有原始材料备查。",
  "回国后需要办理哪些手续": "回国后需要办理的手续:\n\n1. 回国报到(7天内)\n   - 登录回国事务办理模块\n   - 完成回国线上报到\n   - 填写实际回国日期和健康状况\n\n2. 恢复学籍\n   - 点击恢复学籍办理\n   - 系统根据身份跳转对应院系系统\n   - 提交恢复申请，等待审批\n\n3. 学分兑换\n   - 准备境外成绩单、学习证明\n   - 申请课程学分兑换\n   - 等待专业审核\n\n4. 提交总结报告\n   - 撰写留学总结报告\n   - 可使用AI辅助写作\n   - 分享学习收获和建议\n\n5. 完成电子归档\n   - 确认所有材料完整\n   - 完成电子档案归档\n   - 获取留学完成证明\n\n重要提醒: 请在规定时间内完成各项手续，逾期可能影响学籍状态。",
  "default": "感谢您的咨询!\n\n我是国际化项目管理平台的AI助手，可以为您解答以下问题:\n\n- 出国交换申请流程和材料要求\n- 学籍异动(保留/恢复)办理指南\n- 学分兑换政策和操作方法\n- 回国报到和归档流程\n- 各类政策文件查询\n\n请问您具体想了解什么内容?您可以直接输入问题，或点击上方的常见问题快速查询。"
}

function getAIResponse(question: string): string {
  const normalizedQuestion = question.toLowerCase()
  
  if (normalizedQuestion.includes("材料") || normalizedQuestion.includes("准备")) {
    return AI_RESPONSES["出国交换需要准备什么材料"]
  }
  if (normalizedQuestion.includes("保留学籍") || normalizedQuestion.includes("学籍异动")) {
    return AI_RESPONSES["如何办理保留学籍"]
  }
  if (normalizedQuestion.includes("学分") || normalizedQuestion.includes("兑换")) {
    return AI_RESPONSES["学分兑换的流程是什么"]
  }
  if (normalizedQuestion.includes("回国") || normalizedQuestion.includes("手续") || normalizedQuestion.includes("报到")) {
    return AI_RESPONSES["回国后需要办理哪些手续"]
  }
  
  return AI_RESPONSES["default"]
}

// 聊天组件
function ChatSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700))

    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getAIResponse(content),
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, aiResponse])
    setIsTyping(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  return (
    <div className="flex flex-col border-t border-border">
      <div className="px-3 py-2 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium">智能问答</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 min-h-[250px] max-h-[350px]" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground text-center">
              咨询出国境相关政策、流程、材料要求
            </p>
            <div className="space-y-1.5">
              {FAQ_SUGGESTIONS.map((faq, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(faq)}
                  className="w-full text-left text-xs bg-muted hover:bg-muted/80 rounded px-2 py-1.5 transition-colors truncate"
                >
                  {faq}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                  message.role === "user" ? "bg-primary" : "bg-gradient-to-br from-purple-500 to-pink-500"
                )}>
                  {message.role === "user" ? (
                    <User className="h-3 w-3 text-primary-foreground" />
                  ) : (
                    <Bot className="h-3 w-3 text-white" />
                  )}
                </div>
                <div className={cn(
                  "max-w-[85%] rounded-lg px-2 py-1.5",
                  message.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                )}>
                  <div className="whitespace-pre-wrap text-xs leading-relaxed">
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Bot className="h-3 w-3 text-white" />
                </div>
                <div className="bg-muted rounded-lg px-2 py-1.5">
                  <div className="flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">输入中...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="p-2 border-t border-border">
        <div className="flex gap-1.5">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入问题..."
            className="flex-1 h-8 text-xs"
            disabled={isTyping}
          />
          <Button 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
          >
            <Send className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export function AIAssistantPanel({ 
  title = "AI智能助手", 
  subtitle = "实时指导您的操作",
  children,
  className,
  showChat = true
}: AIAssistantPanelProps) {
  return (
    <div className={cn("w-80 flex-shrink-0", className)}>
      <div className="bg-gradient-to-br from-[hsl(280,60%,55%)] to-[hsl(320,55%,50%)] rounded-lg overflow-hidden shadow-lg">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-sm">{title}</h3>
              <p className="text-white/70 text-xs">{subtitle}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-t-lg flex flex-col max-h-[calc(100vh-120px)]">
          {children && (
            <div className="p-4 space-y-4 overflow-y-auto flex-shrink-0 max-h-[250px]">
              {children}
            </div>
          )}
          
          {showChat && <ChatSection />}
        </div>
      </div>
    </div>
  )
}

interface AIScoreCardProps {
  score: number
  label: string
  color?: "primary" | "success" | "warning" | "destructive"
}

export function AIScoreCard({ score, label, color = "primary" }: AIScoreCardProps) {
  const colorClasses = {
    primary: "text-primary",
    success: "text-green-500",
    warning: "text-amber-500",
    destructive: "text-destructive",
  }

  return (
    <div className="bg-muted rounded-lg p-4 text-center">
      <div className={cn("text-3xl font-bold", colorClasses[color])}>
        {score}%
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  )
}

interface AIProgressItemProps {
  label: string
  progress: number
}

export function AIProgressItem({ label, progress }: AIProgressItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground flex items-center gap-2">
          <FileText className="h-4 w-4" />
          {label}
        </span>
        <span className="font-medium">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}

interface AISuggestionProps {
  title: string
  description: string
  onApply?: () => void
  type?: "info" | "action" | "warning"
}

export function AISuggestion({ title, description, onApply, type = "info" }: AISuggestionProps) {
  return (
    <div className="bg-muted/50 border border-border rounded-lg p-3 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-sm">{title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
        {onApply && (
          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={onApply}>
            {type === "action" ? "生成" : "填充"}
          </Button>
        )}
      </div>
    </div>
  )
}

interface AIChecklistItemProps {
  label: string
  status: "completed" | "pending" | "warning"
  detail?: string
}

export function AIChecklistItem({ label, status, detail }: AIChecklistItemProps) {
  const icons = {
    completed: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    pending: <Clock className="h-4 w-4 text-amber-500" />,
    warning: <AlertCircle className="h-4 w-4 text-destructive" />,
  }

  const colors = {
    completed: "text-green-600",
    pending: "text-amber-600",
    warning: "text-destructive",
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      {icons[status]}
      <span className={cn(colors[status])}>{label}</span>
      {detail && <span className="text-muted-foreground text-xs">({detail})</span>}
    </div>
  )
}

interface AIRecommendationProps {
  title: string
  stats?: { label: string; value: string }[]
  highlight?: boolean
}

export function AIRecommendation({ title, stats, highlight }: AIRecommendationProps) {
  return (
    <div className={cn(
      "border rounded-lg p-3 space-y-2",
      highlight ? "border-primary bg-primary/5" : "border-border"
    )}>
      <h4 className={cn(
        "font-medium text-sm",
        highlight && "text-primary"
      )}>{title}</h4>
      {stats && (
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {stats.map((stat, index) => (
            <span key={index} className="flex items-center gap-1">
              {stat.label}: <span className="font-medium text-foreground">{stat.value}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

interface AIReminderProps {
  title: string
  deadline: string
  description: string
  urgent?: boolean
}

export function AIReminder({ title, deadline, description, urgent }: AIReminderProps) {
  return (
    <div className={cn(
      "border-l-4 rounded-r-lg p-3",
      urgent ? "border-l-destructive bg-destructive/5" : "border-l-amber-500 bg-amber-500/5"
    )}>
      <div className={cn(
        "text-xs font-medium",
        urgent ? "text-destructive" : "text-amber-600"
      )}>{title}</div>
      <div className="text-sm font-medium mt-1">{deadline}</div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  )
}

interface AIAnalysisItemProps {
  label: string
  value: string | number
  trend?: "up" | "down" | "neutral"
  comparison?: string
}

export function AIAnalysisItem({ label, value, trend, comparison }: AIAnalysisItemProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-medium">{value}</span>
        {trend && (
          <TrendingUp className={cn(
            "h-3 w-3",
            trend === "up" && "text-green-500",
            trend === "down" && "text-destructive rotate-180",
            trend === "neutral" && "text-muted-foreground rotate-90"
          )} />
        )}
        {comparison && <span className="text-xs text-muted-foreground">{comparison}</span>}
      </div>
    </div>
  )
}

interface AIInsightProps {
  icon?: React.ReactNode
  children: React.ReactNode
}

export function AIInsight({ icon, children }: AIInsightProps) {
  return (
    <div className="flex items-start gap-2 text-sm bg-primary/5 border border-primary/20 rounded-lg p-3">
      {icon || <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />}
      <div className="text-foreground">{children}</div>
    </div>
  )
}
