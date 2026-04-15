"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Search, 
  Filter,
  Clock,
  ChevronRight,
  CheckSquare,
  X,
  CheckCircle2,
  XCircle,
  Sparkles
} from "lucide-react"

// 待办任务数据
const allTasks = [
  {
    id: 1,
    studentName: "李明",
    studentId: "2022001",
    avatar: "李明",
    type: "application",
    typeLabel: "申请审核",
    project: "韩国忠南大学奖学金交换生项目(2026)",
    submitTime: "2026-04-08 14:30",
    waitDays: 1,
    aiScore: 92,
    aiSuggestion: "建议通过",
    priority: "normal"
  },
  {
    id: 2,
    studentName: "王芳",
    studentId: "2022015",
    avatar: "王芳",
    type: "application",
    typeLabel: "申请审核",
    project: "日本早稻田大学暑期项目(2026)",
    submitTime: "2026-04-07 09:20",
    waitDays: 2,
    aiScore: 78,
    aiSuggestion: "建议人工复核",
    priority: "high"
  },
  {
    id: 3,
    studentName: "张伟",
    studentId: "2022023",
    avatar: "张伟",
    type: "application",
    typeLabel: "申请审核",
    project: "美国UCLA交换项目(2026)",
    submitTime: "2026-04-08 16:45",
    waitDays: 1,
    aiScore: 88,
    aiSuggestion: "建议通过",
    priority: "normal"
  },
  {
    id: 4,
    studentName: "赵六",
    studentId: "2022031",
    avatar: "赵六",
    type: "material",
    typeLabel: "材料审核",
    project: "韩国忠南大学奖学金交换生项目(2026)",
    submitTime: "2026-04-06 10:00",
    waitDays: 3,
    aiScore: 95,
    aiSuggestion: "材料完整",
    priority: "urgent"
  },
  {
    id: 5,
    studentName: "陈静",
    studentId: "2022042",
    avatar: "陈静",
    type: "credit",
    typeLabel: "学分审核",
    project: "德国慕尼黑工大交换项目(2025)",
    submitTime: "2026-04-08 11:30",
    waitDays: 1,
    aiScore: 100,
    aiSuggestion: "成绩已审核通过",
    priority: "normal"
  },
]

const filterTabs = [
  { value: "all", label: "全部", count: 5 },
  { value: "application", label: "申请", count: 3 },
  { value: "material", label: "材料", count: 1 },
  { value: "credit", label: "学分", count: 1 },
  { value: "report", label: "报告", count: 0 },
]

export default function MobileTasksPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [batchMode, setBatchMode] = useState(false)
  const [selectedTasks, setSelectedTasks] = useState<number[]>([])

  const filteredTasks = allTasks.filter(task => {
    const matchesTab = activeTab === "all" || task.type === activeTab
    const matchesSearch = task.studentName.includes(searchQuery) || 
                          task.project.includes(searchQuery) ||
                          task.studentId.includes(searchQuery)
    return matchesTab && matchesSearch
  })

  const toggleTaskSelection = (taskId: number) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }

  const selectAllFiltered = () => {
    if (selectedTasks.length === filteredTasks.length) {
      setSelectedTasks([])
    } else {
      setSelectedTasks(filteredTasks.map(t => t.id))
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "border-l-red-500"
      case "high": return "border-l-amber-500"
      default: return "border-l-transparent"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-semibold">待办事项</h1>
            <Button 
              variant={batchMode ? "default" : "outline"} 
              size="sm"
              onClick={() => {
                setBatchMode(!batchMode)
                setSelectedTasks([])
              }}
            >
              {batchMode ? (
                <>
                  <X className="h-4 w-4 mr-1" />
                  取消
                </>
              ) : (
                <>
                  <CheckSquare className="h-4 w-4 mr-1" />
                  批量
                </>
              )}
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="搜索学生姓名、学号或项目名称"
              className="pl-9 bg-slate-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 px-4 pb-3 overflow-x-auto">
          {filterTabs.map((tab) => (
            <Button
              key={tab.value}
              variant={activeTab === tab.value ? "default" : "outline"}
              size="sm"
              className="flex-shrink-0"
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
              {tab.count > 0 && (
                <Badge 
                  variant="secondary" 
                  className={`ml-1.5 h-5 px-1.5 ${activeTab === tab.value ? "bg-white/20 text-white" : ""}`}
                >
                  {tab.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Batch Select All */}
      {batchMode && filteredTasks.length > 0 && (
        <div className="bg-white px-4 py-2 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox 
              checked={selectedTasks.length === filteredTasks.length}
              onCheckedChange={selectAllFiltered}
            />
            <span className="text-sm text-muted-foreground">
              已选择 {selectedTasks.length} 项
            </span>
          </div>
          {selectedTasks.length > 0 && (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                <XCircle className="h-4 w-4 mr-1" />
                批量退回
              </Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                批量通过
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Task List */}
      <div className="px-4 py-4 space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <CheckSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>暂无待办事项</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <Card 
              key={task.id} 
              className={`border-l-4 ${getPriorityColor(task.priority)} ${
                selectedTasks.includes(task.id) ? "ring-2 ring-primary" : ""
              }`}
            >
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  {batchMode && (
                    <Checkbox 
                      className="mt-1"
                      checked={selectedTasks.includes(task.id)}
                      onCheckedChange={() => toggleTaskSelection(task.id)}
                    />
                  )}
                  
                  <Link href={`/mobile/tasks/${task.id}`} className="flex-1 min-w-0">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {task.studentName.slice(-2)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{task.studentName}</span>
                          <span className="text-xs text-muted-foreground">{task.studentId}</span>
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            {task.typeLabel}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground truncate mb-2">
                          {task.project}
                        </p>
                        
                        <div className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            等待 {task.waitDays} 天
                          </span>
                          <span className="flex items-center gap-1 text-primary">
                            <Sparkles className="h-3 w-3" />
                            AI {task.aiScore}分 · {task.aiSuggestion}
                          </span>
                        </div>
                      </div>
                      
                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
