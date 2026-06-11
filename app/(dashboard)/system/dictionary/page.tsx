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
  BookMarked,
  List,
  ArrowLeft,
} from "lucide-react"

// 模拟字典类型数据
const mockDictTypes = [
  {
    id: "1",
    name: "项目类别",
    code: "project_type",
    status: "active",
    remark: "项目类别选项",
    createTime: "2024-01-01",
    itemCount: 4,
  },
  {
    id: "2",
    name: "项目状态",
    code: "project_status",
    status: "active",
    remark: "项目状态选项",
    createTime: "2024-01-01",
    itemCount: 5,
  },
  {
    id: "3",
    name: "审核状态",
    code: "review_status",
    status: "active",
    remark: "审核状态选项",
    createTime: "2024-01-01",
    itemCount: 4,
  },
  {
    id: "4",
    name: "用户状态",
    code: "user_status",
    status: "active",
    remark: "用户状态选项",
    createTime: "2024-01-01",
    itemCount: 2,
  },
  {
    id: "5",
    name: "学历类型",
    code: "education_type",
    status: "active",
    remark: "学历类型选项",
    createTime: "2024-01-15",
    itemCount: 3,
  },
  {
    id: "6",
    name: "项目时长",
    code: "project_duration",
    status: "active",
    remark: "项目时长选项",
    createTime: "2024-01-20",
    itemCount: 2,
  },
]

// 模拟字典项数据
const mockDictItems: Record<string, Array<{id: string; label: string; value: string; sort: number; status: string; remark: string}>> = {
  "1": [
    { id: "11", label: "交换生项目", value: "exchange", sort: 1, status: "active", remark: "" },
    { id: "12", label: "短期课程项目", value: "shortterm", sort: 2, status: "active", remark: "" },
    { id: "13", label: "国际竞赛", value: "competition", sort: 3, status: "active", remark: "" },
    { id: "14", label: "海外实习", value: "internship", sort: 4, status: "active", remark: "" },
  ],
  "2": [
    { id: "21", label: "草稿", value: "draft", sort: 1, status: "active", remark: "" },
    { id: "22", label: "报名中", value: "enrolling", sort: 2, status: "active", remark: "" },
    { id: "23", label: "进行中", value: "ongoing", sort: 3, status: "active", remark: "" },
    { id: "24", label: "已结束", value: "ended", sort: 4, status: "active", remark: "" },
    { id: "25", label: "已关闭", value: "closed", sort: 5, status: "active", remark: "" },
  ],
  "3": [
    { id: "31", label: "待审核", value: "pending", sort: 1, status: "active", remark: "" },
    { id: "32", label: "审核中", value: "reviewing", sort: 2, status: "active", remark: "" },
    { id: "33", label: "已通过", value: "approved", sort: 3, status: "active", remark: "" },
    { id: "34", label: "已驳回", value: "rejected", sort: 4, status: "active", remark: "" },
  ],
  "4": [
    { id: "41", label: "正常", value: "active", sort: 1, status: "active", remark: "" },
    { id: "42", label: "禁用", value: "inactive", sort: 2, status: "active", remark: "" },
  ],
  "5": [
    { id: "51", label: "本科生", value: "undergraduate", sort: 1, status: "active", remark: "" },
    { id: "52", label: "硕士研究生", value: "master", sort: 2, status: "active", remark: "" },
    { id: "53", label: "博士研究生", value: "doctor", sort: 3, status: "active", remark: "" },
  ],
  "6": [
    { id: "61", label: "小于三个月", value: "short", sort: 1, status: "active", remark: "" },
    { id: "62", label: "三个月及以上", value: "long", sort: 2, status: "active", remark: "" },
  ],
}

export default function DictionaryManagementPage() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [selectedType, setSelectedType] = useState<typeof mockDictTypes[0] | null>(null)
  const [showAddTypeDialog, setShowAddTypeDialog] = useState(false)
  const [showAddItemDialog, setShowAddItemDialog] = useState(false)
  
  // 表单状态
  const [typeForm, setTypeForm] = useState({ name: "", code: "", remark: "" })
  const [itemForm, setItemForm] = useState({ label: "", value: "", sort: "1", remark: "" })

  const filteredTypes = mockDictTypes.filter(type => 
    !searchKeyword || 
    type.name.includes(searchKeyword) || 
    type.code.includes(searchKeyword)
  )

  const handleReset = () => {
    setSearchKeyword("")
  }

  const handleViewItems = (type: typeof mockDictTypes[0]) => {
    setSelectedType(type)
  }

  const handleBack = () => {
    setSelectedType(null)
  }

  // 字典类型列表视图
  const renderTypeList = () => (
    <>
      {/* 搜索和操作 */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Input
                placeholder="搜索字典名称或编码"
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
              setTypeForm({ name: "", code: "", remark: "" })
              setShowAddTypeDialog(true)
            }}>
              <Plus className="h-4 w-4 mr-1" />
              新增字典类型
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 字典类型列表 */}
      <Card className="flex-1">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">字典名称</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">字典编码</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">字典项数</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">备注</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">状态</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">创建时间</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredTypes.map((type) => (
                <tr key={type.id} className="border-b hover:bg-muted/20">
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <BookMarked className="h-4 w-4 text-primary" />
                      <span className="font-medium">{type.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm font-mono text-muted-foreground">{type.code}</td>
                  <td className="p-3 text-sm">
                    <Badge variant="secondary">{type.itemCount} 项</Badge>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">{type.remark}</td>
                  <td className="p-3 text-sm">
                    <Badge 
                      variant="outline"
                      className="text-green-600 border-green-300 bg-green-50"
                    >
                      正常
                    </Badge>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">{type.createTime}</td>
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8"
                        onClick={() => handleViewItems(type)}
                      >
                        <List className="h-4 w-4 mr-1" />
                        字典项
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
    </>
  )

  // 字典项列表视图
  const renderItemList = () => {
    const items = selectedType ? mockDictItems[selectedType.id] || [] : []
    
    return (
      <>
        {/* 返回按钮和标题 */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            返回
          </Button>
          <div>
            <h2 className="text-lg font-medium">
              {selectedType?.name} <span className="text-muted-foreground font-normal text-sm">({selectedType?.code})</span>
            </h2>
            <p className="text-sm text-muted-foreground">{selectedType?.remark}</p>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">
            共 {items.length} 个字典项
          </div>
          <Button onClick={() => {
            setItemForm({ label: "", value: "", sort: "1", remark: "" })
            setShowAddItemDialog(true)
          }}>
            <Plus className="h-4 w-4 mr-1" />
            新增字典项
          </Button>
        </div>

        {/* 字典项列表 */}
        <Card className="flex-1">
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">显示标签</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">数据值</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">排序</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">备注</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">状态</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">操作</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-muted/20">
                    <td className="p-3 text-sm font-medium">{item.label}</td>
                    <td className="p-3 text-sm font-mono text-muted-foreground">{item.value}</td>
                    <td className="p-3 text-sm text-muted-foreground">{item.sort}</td>
                    <td className="p-3 text-sm text-muted-foreground">{item.remark || "-"}</td>
                    <td className="p-3 text-sm">
                      <Badge 
                        variant="outline"
                        className="text-green-600 border-green-300 bg-green-50"
                      >
                        正常
                      </Badge>
                    </td>
                    <td className="p-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
      </>
    )
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 p-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">数据字典</h1>
        <p className="text-sm text-muted-foreground mt-1">管理系统中的下拉选项、枚举值等基础数据配置</p>
      </div>

      {selectedType ? renderItemList() : renderTypeList()}

      {/* 新增字典类型弹窗 */}
      <Dialog open={showAddTypeDialog} onOpenChange={setShowAddTypeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>新增字典类型</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>字典名称 <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="请输入字典名称" 
                value={typeForm.name}
                onChange={(e) => setTypeForm({...typeForm, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>字典编码 <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="请输入字典编码（英文）"
                value={typeForm.code}
                onChange={(e) => setTypeForm({...typeForm, code: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">字典编码用于程序调用，建议使用英文和下划线</p>
            </div>
            <div className="space-y-2">
              <Label>备注</Label>
              <Input 
                placeholder="请输入备注"
                value={typeForm.remark}
                onChange={(e) => setTypeForm({...typeForm, remark: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddTypeDialog(false)}>取消</Button>
            <Button onClick={() => setShowAddTypeDialog(false)}>确认添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 新增字典项弹窗 */}
      <Dialog open={showAddItemDialog} onOpenChange={setShowAddItemDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>新增字典项</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>显示标签 <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="请输入显示标签" 
                value={itemForm.label}
                onChange={(e) => setItemForm({...itemForm, label: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>数据值 <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="请输入数据值（英文）"
                value={itemForm.value}
                onChange={(e) => setItemForm({...itemForm, value: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>排序</Label>
              <Input 
                type="number"
                placeholder="请输入排序"
                value={itemForm.sort}
                onChange={(e) => setItemForm({...itemForm, sort: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>备注</Label>
              <Input 
                placeholder="请输入备注"
                value={itemForm.remark}
                onChange={(e) => setItemForm({...itemForm, remark: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddItemDialog(false)}>取消</Button>
            <Button onClick={() => setShowAddItemDialog(false)}>确认添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
