"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AIAssistantPanel } from "@/components/ai/ai-assistant-panel"
import { Search, RotateCcw, Plus, Calendar, Users, AlertTriangle, Sparkles, BarChart3 } from "lucide-react"

const projects = [
  {
    id: 1,
    name: "A国B大学奖学金交换生项目(2026)",
    type: "交换生项目",
    school: "A国B大学",
    target: "本科生、研究生",
    duration: "三个月及以上",
    applicants: 0,
    deadline: "2026-05-10 09:55",
    created: "2026-03-10 09:55",
    status: "开放报名",
    aiSuggestion: "报名人数过低，关注报名人数",
  },
  {
    id: 2,
    name: "C国全球创新挑战赛",
    type: "国际竞赛",
    school: "C国D大学",
    target: "本科生",
    duration: "三个月及以上",
    applicants: 1,
    deadline: "2026-04-10 09:55",
    created: "2026-03-09 09:55",
    status: "开放报名",
    aiSuggestion: "建议优化描述",
  },
  {
    id: 3,
    name: "E国F大学3+1本硕连读",
    type: "交换生项目",
    school: "E国F大学",
    target: "研究生",
    duration: "三个月及以上",
    applicants: 15,
    deadline: "2026-04-10 09:55",
    created: "2026-03-08 09:55",
    status: "开放报名",
    aiSuggestion: "报名人数过低，关注报名人数",
  },
  {
    id: 4,
    name: "G国H大学2026寒假项目",
    type: "短期课程项目",
    school: "G国H大学",
    target: "本科生、研究生",
    duration: "三个月及以上",
    applicants: 1,
    deadline: "2026-02-10 09:55",
    created: "2026-03-07 09:55",
    status: "开放报名",
    aiSuggestion: "报名人数过低，关注报名人数",
  },
  {
    id: 5,
    name: "G国H大学2025寒假项目",
    type: "短期课程项目",
    school: "G国H大学",
    target: "本科生、研究生",
    duration: "三个月及以上",
    applicants: 1,
    deadline: "2026-02-10 09:55",
    created: "2026-03-07 09:55",
    status: "报名截止",
    aiSuggestion: null,
  },
]

export default function ProjectsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const filteredProjects = filter === "all" 
    ? projects 
    : filter === "open" 
      ? projects.filter(p => p.status === "开放报名")
      : projects.filter(p => p.status === "报名截止")

  const handleDelete = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">项目信息查询</CardTitle>
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
                全部项目 <Badge variant="secondary" className="ml-1">23</Badge>
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
                报名截止 <Badge variant="secondary" className="ml-1">20</Badge>
              </Button>
            </div>

            {/* Search Filters */}
            <div className="grid grid-cols-7 gap-3">
              <Input placeholder="请输入项目名称" className="col-span-1" />
              <div className="flex items-center gap-2">
                <Input type="date" placeholder="请选择开始时间" />
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-2">
                <Input type="date" placeholder="请选择结束时间" />
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input placeholder="请输入项目类别" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="请选择申请对象" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="undergrad">本科生</SelectItem>
                  <SelectItem value="grad">研究生</SelectItem>
                  <SelectItem value="both">本科生、研究生</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="请输入学校/组织" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="项目时长" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">小于三个月</SelectItem>
                  <SelectItem value="long">三个月及以上</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button className="gap-2">
                <Search className="h-4 w-4" />
                搜索
              </Button>
              <Button variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                重置
              </Button>
              <Button 
                variant="default" 
                className="gap-2 ml-auto"
                onClick={() => router.push("/admin/projects/publish")}
              >
                <Plus className="h-4 w-4" />
                项目发布
              </Button>
              <Button variant="outline" className="gap-2">
                <Sparkles className="h-4 w-4" />
                AI优化建议
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">项目信息列表</CardTitle>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                排序方式：
                <Select defaultValue="created">
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created">项目创建时间</SelectItem>
                    <SelectItem value="deadline">报名截止时间</SelectItem>
                    <SelectItem value="applicants">报名人数</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>项目名称</TableHead>
                  <TableHead>项目类别</TableHead>
                  <TableHead>学校/组织</TableHead>
                  <TableHead>申请对象</TableHead>
                  <TableHead>项目时长</TableHead>
                  <TableHead>报名人数</TableHead>
                  <TableHead>报名截止时间</TableHead>
                  <TableHead>项目创建时间</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>AI建议</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      <button 
                        className="text-primary hover:underline text-left"
                        onClick={() => router.push(`/admin/projects/${project.id}`)}
                      >
                        {project.name}
                      </button>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {project.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{project.school}</TableCell>
                    <TableCell className="text-sm">{project.target}</TableCell>
                    <TableCell className="text-sm">{project.duration}</TableCell>
                    <TableCell>
                      <span className={project.applicants < 5 ? "text-amber-600" : "text-foreground"}>
                        {project.applicants}人
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{project.deadline}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{project.created}</TableCell>
                    <TableCell>
                      <Badge variant={project.status === "开放报名" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {project.aiSuggestion && (
                        <span className="text-xs text-amber-600">{project.aiSuggestion}</span>
                      )}
                      {!project.aiSuggestion && <span className="text-muted-foreground">--</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-primary">
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="h-auto p-0"
                          onClick={() => router.push(`/admin/projects/${project.id}/edit`)}
                        >
                          编辑
                        </Button>
                        <span className="text-muted-foreground">|</span>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="h-auto p-0"
                          onClick={() => router.push(`/admin/projects/${project.id}`)}
                        >
                          详情
                        </Button>
                        <span className="text-muted-foreground">|</span>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="h-auto p-0"
                          onClick={() => router.push(`/admin/projects/${project.id}/students`)}
                        >
                          学生名单
                        </Button>
                        <span className="text-muted-foreground">|</span>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="h-auto p-0 text-destructive"
                          onClick={() => handleDelete(project)}
                        >
                          删除
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>共 92 条</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>上一页</Button>
                <Button variant="default" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">下一页</Button>
                <span className="ml-2">50 条/页</span>
                <span>跳至</span>
                <Input className="w-16 h-8" />
                <span>页</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI智能分析" subtitle="基于23个项目数据的深度洞察">
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            项目状态概览
          </h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm">开放报名</span>
              </div>
              <Badge variant="default" className="bg-green-500">3</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-sm">即将截止</span>
              </div>
              <Badge variant="outline" className="text-amber-600 border-amber-300">2</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-400" />
                <span className="text-sm">报名截止</span>
              </div>
              <span className="font-medium text-sm">20</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            需要关注
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-amber-50 rounded-lg">
              <span className="text-sm text-amber-700">2个项目报名人数不足</span>
              <Button variant="ghost" size="sm" className="h-6 text-xs text-amber-700">查看</Button>
            </div>
            <div className="flex items-center justify-between p-2 bg-amber-50 rounded-lg">
              <span className="text-sm text-amber-700">2个项目即将截止</span>
              <Button variant="ghost" size="sm" className="h-6 text-xs text-amber-700">查看</Button>
            </div>
          </div>
        </div>
      </AIAssistantPanel>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除项目</DialogTitle>
            <DialogDescription>
              您确定要删除项目 "{selectedProject?.name}" 吗？此操作不可撤销，所有相关的学生申请数据也将被删除。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>取消</Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(false)}>确认删除</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
