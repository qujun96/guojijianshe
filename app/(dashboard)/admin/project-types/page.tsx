"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, RotateCcw, Plus, FileText, Sparkles, Edit2, Trash2 } from "lucide-react"
import { Label } from "@/components/ui/label"

const projectTypes = [
  {
    id: 1,
    code: "JH001",
    name: "交换生项目",
    category: "学位项目",
    description: "与海外高校合作的学期或学年交换学习项目",
    duration: "一学期至一学年",
    enabled: true,
    projectCount: 23,
    applicantCount: 156,
    createTime: "2024-01-15",
  },
  {
    id: 2,
    code: "DQ001",
    name: "短期课程项目",
    category: "非学位项目",
    description: "暑期或寒假期间的短期海外学习项目",
    duration: "2-8周",
    enabled: true,
    projectCount: 15,
    applicantCount: 89,
    createTime: "2024-01-20",
  },
  {
    id: 3,
    code: "SX001",
    name: "双学位项目",
    category: "学位项目",
    description: "可获得本校与海外合作院校双学位的联合培养项目",
    duration: "2-3年",
    enabled: true,
    projectCount: 8,
    applicantCount: 42,
    createTime: "2024-02-01",
  },
  {
    id: 4,
    code: "JS001",
    name: "国际竞赛",
    category: "竞赛项目",
    description: "参与国际性学术或专业竞赛活动",
    duration: "1-4周",
    enabled: true,
    projectCount: 12,
    applicantCount: 67,
    createTime: "2024-02-15",
  },
  {
    id: 5,
    code: "SX002",
    name: "实习项目",
    category: "实践项目",
    description: "海外企业或机构的实习交流项目",
    duration: "1-6个月",
    enabled: false,
    projectCount: 5,
    applicantCount: 18,
    createTime: "2024-03-01",
  },
]

export default function ProjectTypesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingType, setEditingType] = useState<typeof projectTypes[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTypes = projectTypes.filter(type => 
    type.name.includes(searchTerm) || type.code.includes(searchTerm)
  )

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">项目类型查询</CardTitle>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    新增类型
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>新增项目类型</DialogTitle>
                    <DialogDescription>
                      创建新的国际化项目类型分类
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>类型编码</Label>
                        <Input placeholder="如 JH002" />
                      </div>
                      <div className="space-y-2">
                        <Label>类型名称</Label>
                        <Input placeholder="请输入类型名称" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>所属分类</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="请选择分类" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="degree">学位项目</SelectItem>
                            <SelectItem value="non-degree">非学位项目</SelectItem>
                            <SelectItem value="competition">竞赛项目</SelectItem>
                            <SelectItem value="practice">实践项目</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>建议时长</Label>
                        <Input placeholder="如 1-2学期" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>类型描述</Label>
                      <div className="flex items-center gap-2">
                        <Textarea placeholder="请输入项目类型的详细描述" rows={3} className="flex-1" />
                        <Button variant="outline" size="sm" className="h-8 gap-1 shrink-0">
                          <Sparkles className="h-3 w-3" />
                          AI生成
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="enabled" defaultChecked />
                      <Label htmlFor="enabled">启用该类型</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>取消</Button>
                    <Button onClick={() => setIsAddDialogOpen(false)}>确认创建</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-5 gap-3">
              <Input 
                placeholder="请输入类型编码" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Input placeholder="请输入类型名称" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="请选择所属分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部分类</SelectItem>
                  <SelectItem value="degree">学位项目</SelectItem>
                  <SelectItem value="non-degree">非学位项目</SelectItem>
                  <SelectItem value="competition">竞赛项目</SelectItem>
                  <SelectItem value="practice">实践项目</SelectItem>
                </SelectContent>
              </Select>
              <Button className="gap-2">
                <Search className="h-4 w-4" />
                搜索
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => setSearchTerm("")}>
                <RotateCcw className="h-4 w-4" />
                重置
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">类型列表</CardTitle>
              <Badge variant="secondary" className="ml-2">{filteredTypes.length} 条</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">类型编码</TableHead>
                  <TableHead>类型名称</TableHead>
                  <TableHead>所属分类</TableHead>
                  <TableHead>类型描述</TableHead>
                  <TableHead className="text-center">建议时长</TableHead>
                  <TableHead className="text-center">关联项目</TableHead>
                  <TableHead className="text-center">申请人数</TableHead>
                  <TableHead className="text-center">状态</TableHead>
                  <TableHead className="text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTypes.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell className="font-mono text-sm">{type.code}</TableCell>
                    <TableCell className="font-medium">{type.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/5">
                        {type.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                      {type.description}
                    </TableCell>
                    <TableCell className="text-center text-sm">{type.duration}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{type.projectCount}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{type.applicantCount}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={type.enabled ? "default" : "secondary"} className={type.enabled ? "bg-green-500" : ""}>
                        {type.enabled ? "已启用" : "已禁用"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 gap-1 text-primary" onClick={() => setEditingType(type)}>
                              <Edit2 className="h-3 w-3" />
                              编辑
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle>编辑项目类型</DialogTitle>
                              <DialogDescription>
                                修改项目类型的基本信息
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>类型编码</Label>
                                  <Input defaultValue={type.code} />
                                </div>
                                <div className="space-y-2">
                                  <Label>类型名称</Label>
                                  <Input defaultValue={type.name} />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>所属分类</Label>
                                  <Select defaultValue={type.category}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="学位项目">学位项目</SelectItem>
                                      <SelectItem value="非学位项目">非学位项目</SelectItem>
                                      <SelectItem value="竞赛项目">竞赛项目</SelectItem>
                                      <SelectItem value="实践项目">实践项目</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>建议时长</Label>
                                  <Input defaultValue={type.duration} />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>类型描述</Label>
                                <Textarea defaultValue={type.description} rows={3} />
                              </div>
                              <div className="flex items-center gap-2">
                                <Switch id="edit-enabled" defaultChecked={type.enabled} />
                                <Label htmlFor="edit-enabled">启用该类型</Label>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">取消</Button>
                              <Button>保存修改</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm" className="h-7 gap-1 text-destructive">
                          <Trash2 className="h-3 w-3" />
                          删除
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      
    </div>
  )
}
