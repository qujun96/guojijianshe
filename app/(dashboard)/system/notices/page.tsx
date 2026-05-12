"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { 
  Search, 
  RotateCcw, 
  Plus, 
  Edit,
  Trash2,
  Bell,
  Megaphone,
  AlertCircle,
  Info,
  Eye,
  Send,
} from "lucide-react"

// 模拟公告数据
const mockNotices = [
  {
    id: "1",
    title: "2024年暑期交流项目申请通知",
    type: "notice",
    content: "各位老师、同学：\n\n2024年暑期国际交流项目现已开始接受申请，请有意向的同学于4月30日前完成线上报名。\n\n具体项目信息请查看项目列表。",
    status: "published",
    author: "国际合作处",
    createTime: "2024-03-15 10:00:00",
    publishTime: "2024-03-15 10:30:00",
    readCount: 1256,
  },
  {
    id: "2",
    title: "系统维护公告",
    type: "announcement",
    content: "尊敬的用户：\n\n系统将于2024年3月25日凌晨2:00-6:00进行例行维护升级，届时系统将暂停服务。请提前做好相关工作安排。\n\n给您带来不便，敬请谅解。",
    status: "published",
    author: "信息中心",
    createTime: "2024-03-20 09:00:00",
    publishTime: "2024-03-20 09:30:00",
    readCount: 892,
  },
  {
    id: "3",
    title: "关于提交签证材料的紧急通知",
    type: "urgent",
    content: "各位已确认参加2024春季交换项目的同学：\n\n请于本周五（3月22日）下午5点前，将签证申请所需材料提交至国际合作处。逾期未提交将影响签证办理进度。",
    status: "published",
    author: "国际合作处",
    createTime: "2024-03-18 14:00:00",
    publishTime: "2024-03-18 14:00:00",
    readCount: 456,
  },
  {
    id: "4",
    title: "新功能上线：在线成绩兑换申请",
    type: "notice",
    content: "为方便同学们办理海外学习成绩兑换，系统新增在线成绩兑换申请功能。\n\n请登录系统后，在「派出后」模块中使用该功能。",
    status: "draft",
    author: "信息中心",
    createTime: "2024-03-19 16:00:00",
    publishTime: null,
    readCount: 0,
  },
  {
    id: "5",
    title: "2024年秋季学期交换项目说明会",
    type: "notice",
    content: "定于2024年4月10日下午2:00在主楼报告厅举行2024年秋季学期交换项目说明会，届时将详细介绍各合作院校项目情况，欢迎有意向的同学参加。",
    status: "published",
    author: "国际合作处",
    createTime: "2024-03-10 11:00:00",
    publishTime: "2024-03-10 11:30:00",
    readCount: 2341,
  },
]

const typeOptions = [
  { value: "all", label: "全部类型" },
  { value: "notice", label: "通知" },
  { value: "announcement", label: "公告" },
  { value: "urgent", label: "紧急通知" },
]

const statusOptions = [
  { value: "all", label: "全部状态" },
  { value: "draft", label: "草稿" },
  { value: "published", label: "已发布" },
]

const typeLabels: Record<string, {label: string, icon: React.ReactNode, className: string}> = {
  notice: { label: "通知", icon: <Info className="h-3.5 w-3.5" />, className: "bg-blue-100 text-blue-600" },
  announcement: { label: "公告", icon: <Megaphone className="h-3.5 w-3.5" />, className: "bg-green-100 text-green-600" },
  urgent: { label: "紧急", icon: <AlertCircle className="h-3.5 w-3.5" />, className: "bg-red-100 text-red-600" },
}

export default function NoticesManagementPage() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [selectedNotice, setSelectedNotice] = useState<typeof mockNotices[0] | null>(null)
  
  // 表单状态
  const [formData, setFormData] = useState({
    title: "",
    type: "notice",
    content: "",
  })

  const filteredNotices = mockNotices.filter(notice => {
    const matchSearch = !searchKeyword || 
      notice.title.includes(searchKeyword) || 
      notice.content.includes(searchKeyword)
    const matchType = typeFilter === "all" || notice.type === typeFilter
    const matchStatus = statusFilter === "all" || notice.status === statusFilter
    return matchSearch && matchType && matchStatus
  })

  const handleReset = () => {
    setSearchKeyword("")
    setTypeFilter("all")
    setStatusFilter("all")
  }

  const handleView = (notice: typeof mockNotices[0]) => {
    setSelectedNotice(notice)
    setShowViewDialog(true)
  }

  const handleEdit = (notice: typeof mockNotices[0]) => {
    setFormData({
      title: notice.title,
      type: notice.type,
      content: notice.content,
    })
    setShowAddDialog(true)
  }

  // 统计数据
  const totalNotices = mockNotices.length
  const publishedNotices = mockNotices.filter(n => n.status === "published").length
  const draftNotices = mockNotices.filter(n => n.status === "draft").length

  return (
    <div className="flex-1 flex flex-col min-h-0 p-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">通知公告</h1>
        <p className="text-sm text-muted-foreground mt-1">发布和管理系统通知、公告消息</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">公告总数</p>
                <p className="text-2xl font-semibold mt-1">{totalNotices}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Bell className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">已发布</p>
                <p className="text-2xl font-semibold mt-1 text-green-600">{publishedNotices}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Send className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">草稿</p>
                <p className="text-2xl font-semibold mt-1 text-amber-600">{draftNotices}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Edit className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground mb-1.5 block">关键词搜索</Label>
              <Input
                placeholder="搜索标题或内容"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="w-32">
              <Label className="text-xs text-muted-foreground mb-1.5 block">公告类型</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-32">
              <Label className="text-xs text-muted-foreground mb-1.5 block">状态</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="h-9" onClick={() => {}}>
              <Search className="h-4 w-4 mr-1" />
              查询
            </Button>
            <Button variant="outline" className="h-9" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-1" />
              重置
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 操作按钮 */}
      <div className="flex items-center justify-between mb-4">
        <Button onClick={() => {
          setFormData({ title: "", type: "notice", content: "" })
          setShowAddDialog(true)
        }}>
          <Plus className="h-4 w-4 mr-1" />
          发布公告
        </Button>
        <div className="text-sm text-muted-foreground">
          共 {filteredNotices.length} 条记录
        </div>
      </div>

      {/* 公告列表 */}
      <Card className="flex-1">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">标题</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground w-24">类型</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground w-24">状态</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground w-24">发布人</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground w-20">阅读量</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground w-40">发布时间</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground w-32">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotices.map((notice) => (
                <tr key={notice.id} className="border-b hover:bg-muted/20">
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium hover:text-primary cursor-pointer" onClick={() => handleView(notice)}>
                        {notice.title}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-sm">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${typeLabels[notice.type]?.className}`}>
                      {typeLabels[notice.type]?.icon}
                      {typeLabels[notice.type]?.label}
                    </span>
                  </td>
                  <td className="p-3 text-sm">
                    <Badge 
                      variant="outline"
                      className={notice.status === "published" 
                        ? "text-green-600 border-green-300 bg-green-50" 
                        : "text-amber-600 border-amber-300 bg-amber-50"
                      }
                    >
                      {notice.status === "published" ? "已发布" : "草稿"}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">{notice.author}</td>
                  <td className="p-3 text-sm text-muted-foreground">{notice.readCount}</td>
                  <td className="p-3 text-sm text-muted-foreground">
                    {notice.publishTime || "-"}
                  </td>
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleView(notice)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEdit(notice)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* 分页 */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          共 {filteredNotices.length} 条记录，每页 10 条
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>上一页</Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm" disabled>下一页</Button>
        </div>
      </div>

      {/* 发布/编辑公告弹窗 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>发布公告</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>公告标题 <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="请输入公告标题" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>公告类型 <span className="text-red-500">*</span></Label>
              <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="notice">通知</SelectItem>
                  <SelectItem value="announcement">公告</SelectItem>
                  <SelectItem value="urgent">紧急通知</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>公告内容 <span className="text-red-500">*</span></Label>
              <Textarea 
                placeholder="请输入公告内容"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows={8}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>取消</Button>
            <Button variant="outline">保存草稿</Button>
            <Button>
              <Send className="h-4 w-4 mr-1" />
              立即发布
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 查看公告弹窗 */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedNotice && typeLabels[selectedNotice.type] && (
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${typeLabels[selectedNotice.type].className}`}>
                  {typeLabels[selectedNotice.type].icon}
                  {typeLabels[selectedNotice.type].label}
                </span>
              )}
              {selectedNotice?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedNotice && (
            <div className="py-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b">
                <span>发布人：{selectedNotice.author}</span>
                <span>发布时间：{selectedNotice.publishTime || "未发布"}</span>
                <span>阅读量：{selectedNotice.readCount}</span>
              </div>
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {selectedNotice.content}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
