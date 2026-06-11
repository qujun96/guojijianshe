"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Search, 
  RotateCcw, 
  Plus, 
  MoreHorizontal,
  Edit,
  Trash2,
  Key,
  Ban,
  CheckCircle,
  Users,
  UserCheck,
  UserX,
  Upload,
  Download,
} from "lucide-react"

// 模拟用户数据
const mockUsers = [
  {
    id: "1",
    username: "admin",
    realName: "系统管理员",
    email: "admin@example.com",
    phone: "13800138000",
    department: "信息中心",
    role: "超级管理员",
    status: "active",
    createTime: "2024-01-01 10:00:00",
    lastLogin: "2024-03-20 14:30:00",
  },
  {
    id: "2",
    username: "zhangwei",
    realName: "张伟",
    email: "zhangwei@example.com",
    phone: "13800138001",
    department: "电气工程学院",
    role: "学院管理员",
    status: "active",
    createTime: "2024-01-15 09:00:00",
    lastLogin: "2024-03-20 10:15:00",
  },
  {
    id: "3",
    username: "chenming",
    realName: "陈明",
    email: "chenming@example.com",
    phone: "13800138002",
    department: "信息工程学院",
    role: "学院管理员",
    status: "active",
    createTime: "2024-01-20 14:00:00",
    lastLogin: "2024-03-19 16:45:00",
  },
  {
    id: "4",
    username: "liufang",
    realName: "刘芳",
    email: "liufang@example.com",
    phone: "13800138003",
    department: "管理学院",
    role: "普通用户",
    status: "active",
    createTime: "2024-02-01 11:00:00",
    lastLogin: "2024-03-18 09:30:00",
  },
  {
    id: "5",
    username: "wanglei",
    realName: "王磊",
    email: "wanglei@example.com",
    phone: "13800138004",
    department: "机械工程学院",
    role: "普通用户",
    status: "inactive",
    createTime: "2024-02-10 16:00:00",
    lastLogin: "2024-02-28 11:20:00",
  },
  {
    id: "6",
    username: "liqiang",
    realName: "李强",
    email: "liqiang@example.com",
    phone: "13800138005",
    department: "土木工程学院",
    role: "学院管理员",
    status: "active",
    createTime: "2024-02-15 10:00:00",
    lastLogin: "2024-03-20 08:00:00",
  },
]

const statusOptions = [
  { value: "all", label: "全部状态" },
  { value: "active", label: "正常" },
  { value: "inactive", label: "禁用" },
]

const roleOptions = [
  { value: "all", label: "全部角色" },
  { value: "超级管理员", label: "超级管理员" },
  { value: "学院管理员", label: "学院管理员" },
  { value: "普通用户", label: "普通用户" },
]

export default function UsersManagementPage() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null)
  
  // 表单状态
  const [formData, setFormData] = useState({
    username: "",
    realName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
  })

  // 筛选用户
  const filteredUsers = mockUsers.filter(user => {
    const matchSearch = !searchKeyword || 
      user.username.includes(searchKeyword) || 
      user.realName.includes(searchKeyword) ||
      user.phone.includes(searchKeyword)
    const matchStatus = statusFilter === "all" || user.status === statusFilter
    const matchRole = roleFilter === "all" || user.role === roleFilter
    return matchSearch && matchStatus && matchRole
  })

  const handleReset = () => {
    setSearchKeyword("")
    setStatusFilter("all")
    setRoleFilter("all")
  }

  const handleEdit = (user: typeof mockUsers[0]) => {
    setSelectedUser(user)
    setFormData({
      username: user.username,
      realName: user.realName,
      email: user.email,
      phone: user.phone,
      department: user.department,
      role: user.role,
    })
    setShowEditDialog(true)
  }

  const handleResetPassword = (user: typeof mockUsers[0]) => {
    setSelectedUser(user)
    setShowResetPasswordDialog(true)
  }

  // 统计数据
  const totalUsers = mockUsers.length
  const activeUsers = mockUsers.filter(u => u.status === "active").length
  const inactiveUsers = mockUsers.filter(u => u.status === "inactive").length

  return (
    <div className="flex-1 flex flex-col min-h-0 p-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">用户管理</h1>
        <p className="text-sm text-muted-foreground mt-1">管理系统用户账号，包括创建、编辑、权限分配等操作</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">用户总数</p>
                <p className="text-2xl font-semibold mt-1">{totalUsers}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">正常用户</p>
                <p className="text-2xl font-semibold mt-1 text-green-600">{activeUsers}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">禁用用户</p>
                <p className="text-2xl font-semibold mt-1 text-red-600">{inactiveUsers}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <UserX className="h-5 w-5 text-red-600" />
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
                placeholder="搜索用户名、姓名、手机号"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="w-40">
              <Label className="text-xs text-muted-foreground mb-1.5 block">用户状态</Label>
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
            <div className="w-40">
              <Label className="text-xs text-muted-foreground mb-1.5 block">用户角色</Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map(opt => (
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
        <div className="flex items-center gap-2">
          <Button onClick={() => {
            setFormData({ username: "", realName: "", email: "", phone: "", department: "", role: "" })
            setShowAddDialog(true)
          }}>
            <Plus className="h-4 w-4 mr-1" />
            新增用户
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-1" />
            批量导入
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-1" />
            导出数据
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          共 {filteredUsers.length} 条记录
        </div>
      </div>

      {/* 用户列表 */}
      <Card className="flex-1">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">用户名</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">姓名</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">部门</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">角色</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">手机号</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">状态</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">最后登录</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-muted/20">
                  <td className="p-3 text-sm font-medium text-primary">{user.username}</td>
                  <td className="p-3 text-sm">{user.realName}</td>
                  <td className="p-3 text-sm text-muted-foreground">{user.department}</td>
                  <td className="p-3 text-sm">
                    <Badge variant={user.role === "超级管理员" ? "default" : "outline"}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">{user.phone}</td>
                  <td className="p-3 text-sm">
                    <Badge 
                      variant="outline"
                      className={user.status === "active" 
                        ? "text-green-600 border-green-300 bg-green-50" 
                        : "text-red-600 border-red-300 bg-red-50"
                      }
                    >
                      {user.status === "active" ? "正常" : "禁用"}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">{user.lastLogin}</td>
                  <td className="p-3 text-sm">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(user)}>
                          <Edit className="h-4 w-4 mr-2" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleResetPassword(user)}>
                          <Key className="h-4 w-4 mr-2" />
                          重置密码
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {user.status === "active" ? (
                            <>
                              <Ban className="h-4 w-4 mr-2" />
                              禁用
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              启用
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
          共 {filteredUsers.length} 条记录，每页 10 条
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>上一页</Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm" disabled>下一页</Button>
        </div>
      </div>

      {/* 新增用户弹窗 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>新增用户</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>用户名 <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="请输入用户名" 
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>姓名 <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="请输入姓名"
                  value={formData.realName}
                  onChange={(e) => setFormData({...formData, realName: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>邮箱</Label>
                <Input 
                  type="email" 
                  placeholder="请输入邮箱"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>手机号 <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="请输入手机号"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>所属部门 <span className="text-red-500">*</span></Label>
                <Select value={formData.department} onValueChange={(v) => setFormData({...formData, department: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择部门" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="信息中心">信息中心</SelectItem>
                    <SelectItem value="电气工程学院">电气工程学院</SelectItem>
                    <SelectItem value="信息工程学院">信息工程学院</SelectItem>
                    <SelectItem value="管理学院">管理学院</SelectItem>
                    <SelectItem value="机械工程学院">机械工程学院</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>角色 <span className="text-red-500">*</span></Label>
                <Select value={formData.role} onValueChange={(v) => setFormData({...formData, role: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择角色" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="超级管理员">超级管理员</SelectItem>
                    <SelectItem value="学院管理员">学院管理员</SelectItem>
                    <SelectItem value="普通用户">普通用户</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              * 新用户默认密码为：123456，请提醒用户首次登录后修改密码
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>取消</Button>
            <Button onClick={() => setShowAddDialog(false)}>确认添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑用户弹窗 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>编辑用户</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>用户名</Label>
                <Input value={formData.username} disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>姓名 <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="请输入姓名"
                  value={formData.realName}
                  onChange={(e) => setFormData({...formData, realName: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>邮箱</Label>
                <Input 
                  type="email" 
                  placeholder="请输入邮箱"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>手机号 <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="请输入手机号"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>所属部门 <span className="text-red-500">*</span></Label>
                <Select value={formData.department} onValueChange={(v) => setFormData({...formData, department: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="信息中心">信息中心</SelectItem>
                    <SelectItem value="电气工程学院">电气工程学院</SelectItem>
                    <SelectItem value="信息工程学院">信息工程学院</SelectItem>
                    <SelectItem value="管理学院">管理学院</SelectItem>
                    <SelectItem value="机械工程学院">机械工程学院</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>角色 <span className="text-red-500">*</span></Label>
                <Select value={formData.role} onValueChange={(v) => setFormData({...formData, role: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="超级管理员">超级管理员</SelectItem>
                    <SelectItem value="学院管理员">学院管理员</SelectItem>
                    <SelectItem value="普通用户">普通用户</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>取消</Button>
            <Button onClick={() => setShowEditDialog(false)}>保存修改</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 重置密码弹窗 */}
      <Dialog open={showResetPasswordDialog} onOpenChange={setShowResetPasswordDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>重置密码</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              确定要重置用户 <span className="font-medium text-foreground">{selectedUser?.realName}</span> 的密码吗？
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              重置后密码将变为：<span className="font-mono font-medium text-primary">123456</span>
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetPasswordDialog(false)}>取消</Button>
            <Button onClick={() => setShowResetPasswordDialog(false)}>确认重置</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
