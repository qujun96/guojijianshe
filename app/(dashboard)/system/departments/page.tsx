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
  Search, 
  RotateCcw, 
  Plus, 
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  Building2,
  Users,
  FolderTree,
} from "lucide-react"

// 模拟部门树形数据
const mockDepartments = [
  {
    id: "1",
    name: "学校",
    code: "school",
    parentId: null,
    leader: "王校长",
    phone: "010-12345678",
    email: "school@example.com",
    sort: 1,
    status: "active",
    userCount: 10,
    children: [
      {
        id: "2",
        name: "国际合作处",
        code: "international",
        parentId: "1",
        leader: "李主任",
        phone: "010-12345679",
        email: "international@example.com",
        sort: 1,
        status: "active",
        userCount: 15,
        children: [],
      },
      {
        id: "3",
        name: "教务处",
        code: "academic",
        parentId: "1",
        leader: "张主任",
        phone: "010-12345680",
        email: "academic@example.com",
        sort: 2,
        status: "active",
        userCount: 20,
        children: [],
      },
      {
        id: "4",
        name: "电气工程学院",
        code: "ee_college",
        parentId: "1",
        leader: "陈院长",
        phone: "010-12345681",
        email: "ee@example.com",
        sort: 3,
        status: "active",
        userCount: 80,
        children: [
          {
            id: "41",
            name: "电气工程系",
            code: "ee_dept",
            parentId: "4",
            leader: "刘主任",
            phone: "010-12345691",
            email: "ee_dept@example.com",
            sort: 1,
            status: "active",
            userCount: 30,
            children: [],
          },
          {
            id: "42",
            name: "自动化系",
            code: "auto_dept",
            parentId: "4",
            leader: "王主任",
            phone: "010-12345692",
            email: "auto_dept@example.com",
            sort: 2,
            status: "active",
            userCount: 25,
            children: [],
          },
        ],
      },
      {
        id: "5",
        name: "信息工程学院",
        code: "cs_college",
        parentId: "1",
        leader: "吴院长",
        phone: "010-12345682",
        email: "cs@example.com",
        sort: 4,
        status: "active",
        userCount: 100,
        children: [
          {
            id: "51",
            name: "计算机系",
            code: "cs_dept",
            parentId: "5",
            leader: "赵主任",
            phone: "010-12345693",
            email: "cs_dept@example.com",
            sort: 1,
            status: "active",
            userCount: 40,
            children: [],
          },
          {
            id: "52",
            name: "软件工程系",
            code: "se_dept",
            parentId: "5",
            leader: "孙主任",
            phone: "010-12345694",
            email: "se_dept@example.com",
            sort: 2,
            status: "active",
            userCount: 35,
            children: [],
          },
        ],
      },
      {
        id: "6",
        name: "管理学院",
        code: "mgmt_college",
        parentId: "1",
        leader: "周院长",
        phone: "010-12345683",
        email: "mgmt@example.com",
        sort: 5,
        status: "active",
        userCount: 60,
        children: [],
      },
      {
        id: "7",
        name: "机械工程学院",
        code: "me_college",
        parentId: "1",
        leader: "郑院长",
        phone: "010-12345684",
        email: "me@example.com",
        sort: 6,
        status: "active",
        userCount: 70,
        children: [],
      },
    ],
  },
]

type DepartmentType = typeof mockDepartments[0]

export default function DepartmentsManagementPage() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [expandedNodes, setExpandedNodes] = useState<string[]>(["1", "4", "5"])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedDept, setSelectedDept] = useState<DepartmentType | null>(null)
  
  // 表单状态
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    parentId: "",
    leader: "",
    phone: "",
    email: "",
    sort: "1",
  })

  const handleReset = () => {
    setSearchKeyword("")
  }

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId) 
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    )
  }

  const handleEdit = (dept: DepartmentType) => {
    setSelectedDept(dept)
    setFormData({
      name: dept.name,
      code: dept.code,
      parentId: dept.parentId || "",
      leader: dept.leader,
      phone: dept.phone,
      email: dept.email,
      sort: String(dept.sort),
    })
    setShowEditDialog(true)
  }

  const handleAdd = (parentId?: string) => {
    setFormData({
      name: "",
      code: "",
      parentId: parentId || "",
      leader: "",
      phone: "",
      email: "",
      sort: "1",
    })
    setShowAddDialog(true)
  }

  // 递归渲染部门树
  const renderDepartmentTree = (departments: DepartmentType[], level = 0) => {
    return departments.map((dept) => {
      const hasChildren = dept.children && dept.children.length > 0
      const isExpanded = expandedNodes.includes(dept.id)
      
      // 搜索过滤
      if (searchKeyword && !dept.name.includes(searchKeyword) && !dept.code.includes(searchKeyword)) {
        if (!hasChildren) return null
        const filteredChildren = renderDepartmentTree(dept.children as DepartmentType[], level + 1)
        if (filteredChildren.every(c => c === null)) return null
      }

      return (
        <div key={dept.id}>
          <div 
            className={`flex items-center gap-2 p-3 hover:bg-muted/50 border-b ${level > 0 ? 'bg-muted/20' : ''}`}
            style={{ paddingLeft: `${level * 24 + 12}px` }}
          >
            <div className="w-6 flex justify-center">
              {hasChildren && (
                <button onClick={() => toggleNode(dept.id)} className="hover:bg-muted rounded p-0.5">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              )}
            </div>
            <Building2 className="h-4 w-4 text-primary" />
            <span className="font-medium flex-1">{dept.name}</span>
            <span className="text-xs text-muted-foreground font-mono w-24">{dept.code}</span>
            <span className="text-sm text-muted-foreground w-20">{dept.leader}</span>
            <span className="text-sm text-muted-foreground w-32">{dept.phone}</span>
            <div className="flex items-center gap-1 w-20">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{dept.userCount}</span>
            </div>
            <Badge 
              variant="outline"
              className="w-16 justify-center text-green-600 border-green-300 bg-green-50"
            >
              正常
            </Badge>
            <div className="flex items-center gap-1 w-24 justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0"
                onClick={() => handleAdd(dept.id)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0"
                onClick={() => handleEdit(dept)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {hasChildren && isExpanded && renderDepartmentTree(dept.children as DepartmentType[], level + 1)}
        </div>
      )
    })
  }

  // 计算统计数据
  const countDepartments = (depts: DepartmentType[]): number => {
    return depts.reduce((acc, dept) => {
      return acc + 1 + (dept.children ? countDepartments(dept.children as DepartmentType[]) : 0)
    }, 0)
  }

  const countUsers = (depts: DepartmentType[]): number => {
    return depts.reduce((acc, dept) => {
      return acc + dept.userCount + (dept.children ? countUsers(dept.children as DepartmentType[]) : 0)
    }, 0)
  }

  const totalDepartments = countDepartments(mockDepartments)
  const totalUsers = countUsers(mockDepartments)

  return (
    <div className="flex-1 flex flex-col min-h-0 p-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">部门管理</h1>
        <p className="text-sm text-muted-foreground mt-1">管理组织架构和部门层级关系</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">部门总数</p>
                <p className="text-2xl font-semibold mt-1">{totalDepartments}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FolderTree className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">用户总数</p>
                <p className="text-2xl font-semibold mt-1">{totalUsers}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和操作 */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Input
                placeholder="搜索部门名称或编码"
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
              <Button 
                variant="outline" 
                className="h-9" 
                onClick={() => setExpandedNodes(mockDepartments.flatMap(d => [d.id, ...d.children.map(c => c.id)]))}
              >
                全部展开
              </Button>
              <Button 
                variant="outline" 
                className="h-9" 
                onClick={() => setExpandedNodes([])}
              >
                全部折叠
              </Button>
            </div>
            <Button onClick={() => handleAdd()}>
              <Plus className="h-4 w-4 mr-1" />
              新增部门
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 部门树形列表 */}
      <Card className="flex-1">
        <CardContent className="p-0">
          {/* 表头 */}
          <div className="flex items-center gap-2 p-3 border-b bg-muted/30 text-sm font-medium text-muted-foreground">
            <div className="w-6" />
            <div className="w-4" />
            <span className="flex-1">部门名称</span>
            <span className="w-24">编码</span>
            <span className="w-20">负责人</span>
            <span className="w-32">联系电话</span>
            <span className="w-20">人数</span>
            <span className="w-16 text-center">状态</span>
            <span className="w-24 text-right">操作</span>
          </div>
          {/* 部门树 */}
          <div className="max-h-[500px] overflow-y-auto">
            {renderDepartmentTree(mockDepartments)}
          </div>
        </CardContent>
      </Card>

      {/* 新增部门弹窗 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>新增部门</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>上级部门</Label>
              <Select value={formData.parentId} onValueChange={(v) => setFormData({...formData, parentId: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="请选择上级部门（不选则为顶级）" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">无（顶级部门）</SelectItem>
                  <SelectItem value="1">学校</SelectItem>
                  <SelectItem value="2">├─ 国际合作处</SelectItem>
                  <SelectItem value="3">├─ 教务处</SelectItem>
                  <SelectItem value="4">├─ 电气工程学院</SelectItem>
                  <SelectItem value="5">├─ 信息工程学院</SelectItem>
                  <SelectItem value="6">├─ 管理学院</SelectItem>
                  <SelectItem value="7">├─ 机械工程学院</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>部门名称 <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="请输入部门名称" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>部门编码 <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="请输入部门编码"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>负责人</Label>
                <Input 
                  placeholder="请输入负责人姓名"
                  value={formData.leader}
                  onChange={(e) => setFormData({...formData, leader: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>联系电话</Label>
                <Input 
                  placeholder="请输入联系电话"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                <Label>显示顺序</Label>
                <Input 
                  type="number"
                  placeholder="请输入显示顺序"
                  value={formData.sort}
                  onChange={(e) => setFormData({...formData, sort: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>取消</Button>
            <Button onClick={() => setShowAddDialog(false)}>确认添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑部门弹窗 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>编辑部门</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>上级部门</Label>
              <Select value={formData.parentId} onValueChange={(v) => setFormData({...formData, parentId: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="请选择上级部门" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">无（顶级部门）</SelectItem>
                  <SelectItem value="1">学校</SelectItem>
                  <SelectItem value="2">├─ 国际合作处</SelectItem>
                  <SelectItem value="3">├─ 教务处</SelectItem>
                  <SelectItem value="4">├─ 电气工程学院</SelectItem>
                  <SelectItem value="5">├─ 信息工程学院</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>部门名称 <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="请输入部门名称" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>部门编码 <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="请输入部门编码"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>负责人</Label>
                <Input 
                  placeholder="请输入负责人姓名"
                  value={formData.leader}
                  onChange={(e) => setFormData({...formData, leader: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>联系电话</Label>
                <Input 
                  placeholder="请输入联系电话"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                <Label>显示顺序</Label>
                <Input 
                  type="number"
                  placeholder="请输入显示顺序"
                  value={formData.sort}
                  onChange={(e) => setFormData({...formData, sort: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>取消</Button>
            <Button onClick={() => setShowEditDialog(false)}>保存修改</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
