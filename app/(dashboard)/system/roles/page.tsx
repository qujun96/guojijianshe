"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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
  Shield,
  Users,
  Settings,
  ChevronRight,
  ChevronDown,
} from "lucide-react"

// 模拟角色数据
const mockRoles = [
  {
    id: "1",
    name: "超级管理员",
    code: "super_admin",
    description: "拥有系统所有权限，可管理所有功能模块",
    userCount: 1,
    status: "active",
    createTime: "2024-01-01",
  },
  {
    id: "2",
    name: "学院管理员",
    code: "college_admin",
    description: "管理本学院的项目申报、审核等功能",
    userCount: 5,
    status: "active",
    createTime: "2024-01-15",
  },
  {
    id: "3",
    name: "项目审核员",
    code: "reviewer",
    description: "负责项目申请的审核工作",
    userCount: 8,
    status: "active",
    createTime: "2024-02-01",
  },
  {
    id: "4",
    name: "普通用户",
    code: "user",
    description: "普通教师用户，可进行项目申报等操作",
    userCount: 120,
    status: "active",
    createTime: "2024-01-01",
  },
  {
    id: "5",
    name: "学生用户",
    code: "student",
    description: "学生用户，可查看和申请项目",
    userCount: 500,
    status: "active",
    createTime: "2024-01-01",
  },
]

// 权限树结构
const permissionTree = [
  {
    id: "dashboard",
    name: "工作台",
    children: [
      { id: "dashboard:view", name: "查看工作台" },
      { id: "dashboard:monitor", name: "全流程监控" },
      { id: "dashboard:analytics", name: "数据统计分析" },
    ],
  },
  {
    id: "project",
    name: "项目管理",
    children: [
      { id: "project:list", name: "项目列表查看" },
      { id: "project:create", name: "发布项目" },
      { id: "project:edit", name: "编辑项目" },
      { id: "project:delete", name: "删除项目" },
      { id: "project:application", name: "立项申报" },
      { id: "project:review", name: "申报审核" },
    ],
  },
  {
    id: "dispatch",
    name: "派出管理",
    children: [
      { id: "dispatch:apply", name: "项目申请" },
      { id: "dispatch:review", name: "申请审核" },
      { id: "dispatch:confirm", name: "外派确认" },
      { id: "dispatch:materials", name: "材料管理" },
    ],
  },
  {
    id: "system",
    name: "系统管理",
    children: [
      { id: "system:users", name: "用户管理" },
      { id: "system:roles", name: "角色管理" },
      { id: "system:department", name: "部门管理" },
      { id: "system:dict", name: "数据字典" },
      { id: "system:logs", name: "日志管理" },
      { id: "system:config", name: "系统配置" },
    ],
  },
]

export default function RolesManagementPage() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const [selectedRole, setSelectedRole] = useState<typeof mockRoles[0] | null>(null)
  const [expandedNodes, setExpandedNodes] = useState<string[]>(["dashboard", "project", "dispatch", "system"])
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  
  // 表单状态
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
  })

  const filteredRoles = mockRoles.filter(role => 
    !searchKeyword || 
    role.name.includes(searchKeyword) || 
    role.code.includes(searchKeyword)
  )

  const handleReset = () => {
    setSearchKeyword("")
  }

  const handleEditPermission = (role: typeof mockRoles[0]) => {
    setSelectedRole(role)
    // 模拟加载该角色的权限
    if (role.code === "super_admin") {
      setSelectedPermissions(permissionTree.flatMap(p => [p.id, ...p.children.map(c => c.id)]))
    } else if (role.code === "college_admin") {
      setSelectedPermissions(["dashboard", "dashboard:view", "project", "project:list", "project:application", "project:review"])
    } else {
      setSelectedPermissions(["dashboard", "dashboard:view"])
    }
    setShowPermissionDialog(true)
  }

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId) 
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    )
  }

  const togglePermission = (permissionId: string, parentId?: string) => {
    setSelectedPermissions(prev => {
      if (prev.includes(permissionId)) {
        // 取消选中
        const newPerms = prev.filter(id => id !== permissionId)
        // 如果是父节点，也取消所有子节点
        const parent = permissionTree.find(p => p.id === permissionId)
        if (parent) {
          return newPerms.filter(id => !parent.children.map(c => c.id).includes(id))
        }
        return newPerms
      } else {
        // 选中
        const newPerms = [...prev, permissionId]
        // 如果是父节点，也选中所有子节点
        const parent = permissionTree.find(p => p.id === permissionId)
        if (parent) {
          return [...new Set([...newPerms, ...parent.children.map(c => c.id)])]
        }
        // 如果选中了子节点，检查是否需要选中父节点
        if (parentId) {
          const parentNode = permissionTree.find(p => p.id === parentId)
          if (parentNode && parentNode.children.every(c => newPerms.includes(c.id))) {
            return [...new Set([...newPerms, parentId])]
          }
        }
        return newPerms
      }
    })
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 p-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">角色权限管理</h1>
        <p className="text-sm text-muted-foreground mt-1">管理系统角色和权限配置，控制不同角色的功能访问</p>
      </div>

      {/* 搜索和操作 */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Input
                placeholder="搜索角色名称或编码"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-64 h-9"
              />
              <Button className="h-9" onClick={() => {}}>
                <Search className="h-4 w-4 mr-1" />
                查询
              </Button>
              <Button variant="outline" className="h-9" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-1" />
                重置
              </Button>
            </div>
            <Button onClick={() => {
              setFormData({ name: "", code: "", description: "" })
              setShowAddDialog(true)
            }}>
              <Plus className="h-4 w-4 mr-1" />
              新增角色
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 角色列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRoles.map((role) => (
          <Card key={role.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{role.name}</CardTitle>
                    <p className="text-xs text-muted-foreground font-mono">{role.code}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-300">
                  启用
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {role.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{role.userCount} 个用户</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8"
                    onClick={() => handleEditPermission(role)}
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    权限配置
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  {role.code !== "super_admin" && (
                    <Button variant="ghost" size="sm" className="h-8 text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 新增角色弹窗 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>新增角色</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>角色名称 <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="请输入角色名称" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>角色编码 <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="请输入角色编码（英文）"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">角色编码用于系统内部标识，建议使用英文和下划线</p>
            </div>
            <div className="space-y-2">
              <Label>角色描述</Label>
              <Input 
                placeholder="请输入角色描述"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>取消</Button>
            <Button onClick={() => setShowAddDialog(false)}>确认添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 权限配置弹窗 */}
      <Dialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>权限配置 - {selectedRole?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="border rounded-lg p-4 max-h-[400px] overflow-y-auto">
              {permissionTree.map((parent) => (
                <div key={parent.id} className="mb-2">
                  <div 
                    className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded cursor-pointer"
                    onClick={() => toggleNode(parent.id)}
                  >
                    {expandedNodes.includes(parent.id) ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Checkbox 
                      checked={selectedPermissions.includes(parent.id)}
                      onCheckedChange={() => togglePermission(parent.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="font-medium">{parent.name}</span>
                  </div>
                  {expandedNodes.includes(parent.id) && (
                    <div className="ml-8 space-y-1">
                      {parent.children.map((child) => (
                        <div 
                          key={child.id} 
                          className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded"
                        >
                          <Checkbox 
                            checked={selectedPermissions.includes(child.id)}
                            onCheckedChange={() => togglePermission(child.id, parent.id)}
                          />
                          <span className="text-sm">{child.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              已选择 {selectedPermissions.length} 个权限
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPermissionDialog(false)}>取消</Button>
            <Button onClick={() => setShowPermissionDialog(false)}>保存配置</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
