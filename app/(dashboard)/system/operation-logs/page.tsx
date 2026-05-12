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
} from "@/components/ui/dialog"
import { 
  Search, 
  RotateCcw, 
  Download,
  Trash2,
  History,
  Eye,
  Plus,
  Edit,
  Trash,
  FileText,
  CheckCircle,
  Upload,
} from "lucide-react"

// 模拟操作日志数据
const mockOperationLogs = [
  {
    id: "1",
    module: "用户管理",
    type: "create",
    title: "新增用户",
    operator: "系统管理员",
    department: "信息中心",
    ipAddress: "192.168.1.100",
    status: "success",
    costTime: 125,
    operTime: "2024-03-20 14:30:25",
    requestMethod: "POST",
    requestUrl: "/api/system/users",
    requestParams: '{"username": "newuser", "realName": "新用户", "department": "测试部门"}',
    responseResult: '{"code": 200, "message": "操作成功", "data": {"id": "123"}}',
  },
  {
    id: "2",
    module: "项目管理",
    type: "update",
    title: "编辑项目",
    operator: "张伟",
    department: "电气工程学院",
    ipAddress: "192.168.1.101",
    status: "success",
    costTime: 89,
    operTime: "2024-03-20 14:25:10",
    requestMethod: "PUT",
    requestUrl: "/api/projects/123",
    requestParams: '{"projectName": "更新后的项目名称", "status": "enrolling"}',
    responseResult: '{"code": 200, "message": "操作成功"}',
  },
  {
    id: "3",
    module: "角色管理",
    type: "update",
    title: "修改角色权限",
    operator: "系统管理员",
    department: "信息中心",
    ipAddress: "192.168.1.100",
    status: "success",
    costTime: 156,
    operTime: "2024-03-20 14:20:05",
    requestMethod: "PUT",
    requestUrl: "/api/system/roles/2/permissions",
    requestParams: '{"permissions": ["project:list", "project:create"]}',
    responseResult: '{"code": 200, "message": "操作成功"}',
  },
  {
    id: "4",
    module: "项目管理",
    type: "delete",
    title: "删除项目",
    operator: "陈明",
    department: "信息工程学院",
    ipAddress: "192.168.1.102",
    status: "fail",
    costTime: 45,
    operTime: "2024-03-20 14:15:30",
    requestMethod: "DELETE",
    requestUrl: "/api/projects/456",
    requestParams: '{"id": "456"}',
    responseResult: '{"code": 500, "message": "该项目已有学生报名，无法删除"}',
  },
  {
    id: "5",
    module: "申请审核",
    type: "audit",
    title: "审核通过申请",
    operator: "刘芳",
    department: "管理学院",
    ipAddress: "192.168.1.103",
    status: "success",
    costTime: 78,
    operTime: "2024-03-20 14:10:15",
    requestMethod: "POST",
    requestUrl: "/api/applications/789/approve",
    requestParams: '{"applicationId": "789", "opinion": "同意"}',
    responseResult: '{"code": 200, "message": "操作成功"}',
  },
  {
    id: "6",
    module: "数据字典",
    type: "create",
    title: "新增字典项",
    operator: "系统管理员",
    department: "信息中心",
    ipAddress: "192.168.1.100",
    status: "success",
    costTime: 56,
    operTime: "2024-03-20 14:05:00",
    requestMethod: "POST",
    requestUrl: "/api/system/dict/items",
    requestParams: '{"dictType": "project_type", "label": "新项目类型", "value": "new_type"}',
    responseResult: '{"code": 200, "message": "操作成功"}',
  },
  {
    id: "7",
    module: "文件管理",
    type: "upload",
    title: "上传附件",
    operator: "王磊",
    department: "机械工程学院",
    ipAddress: "192.168.1.104",
    status: "success",
    costTime: 1250,
    operTime: "2024-03-20 10:00:00",
    requestMethod: "POST",
    requestUrl: "/api/files/upload",
    requestParams: '{"fileName": "项目申请书.pdf", "fileSize": "2.5MB"}',
    responseResult: '{"code": 200, "message": "上传成功", "data": {"fileId": "file_001"}}',
  },
  {
    id: "8",
    module: "系统配置",
    type: "update",
    title: "修改系统配置",
    operator: "系统管理员",
    department: "信息中心",
    ipAddress: "192.168.1.100",
    status: "success",
    costTime: 34,
    operTime: "2024-03-19 18:30:00",
    requestMethod: "PUT",
    requestUrl: "/api/system/config",
    requestParams: '{"maxFileSize": "10MB", "sessionTimeout": "30"}',
    responseResult: '{"code": 200, "message": "操作成功"}',
  },
]

const typeOptions = [
  { value: "all", label: "全部类型" },
  { value: "create", label: "新增" },
  { value: "update", label: "修改" },
  { value: "delete", label: "删除" },
  { value: "audit", label: "审核" },
  { value: "upload", label: "上传" },
]

const moduleOptions = [
  { value: "all", label: "全部模块" },
  { value: "用户管理", label: "用户管理" },
  { value: "项目管理", label: "项目管理" },
  { value: "角色管理", label: "角色管理" },
  { value: "申请审核", label: "申请审核" },
  { value: "数据字典", label: "数据字典" },
  { value: "文件管理", label: "文件管理" },
  { value: "系统配置", label: "系统配置" },
]

const statusOptions = [
  { value: "all", label: "全部状态" },
  { value: "success", label: "成功" },
  { value: "fail", label: "失败" },
]

const typeIcons: Record<string, React.ReactNode> = {
  create: <Plus className="h-3.5 w-3.5" />,
  update: <Edit className="h-3.5 w-3.5" />,
  delete: <Trash className="h-3.5 w-3.5" />,
  audit: <CheckCircle className="h-3.5 w-3.5" />,
  upload: <Upload className="h-3.5 w-3.5" />,
}

const typeColors: Record<string, string> = {
  create: "bg-green-100 text-green-600",
  update: "bg-blue-100 text-blue-600",
  delete: "bg-red-100 text-red-600",
  audit: "bg-purple-100 text-purple-600",
  upload: "bg-orange-100 text-orange-600",
}

export default function OperationLogsPage() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [moduleFilter, setModuleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [selectedLog, setSelectedLog] = useState<typeof mockOperationLogs[0] | null>(null)

  const filteredLogs = mockOperationLogs.filter(log => {
    const matchSearch = !searchKeyword || 
      log.operator.includes(searchKeyword) || 
      log.title.includes(searchKeyword)
    const matchType = typeFilter === "all" || log.type === typeFilter
    const matchModule = moduleFilter === "all" || log.module === moduleFilter
    const matchStatus = statusFilter === "all" || log.status === statusFilter
    return matchSearch && matchType && matchModule && matchStatus
  })

  const handleReset = () => {
    setSearchKeyword("")
    setTypeFilter("all")
    setModuleFilter("all")
    setStatusFilter("all")
    setStartDate("")
    setEndDate("")
  }

  const handleViewDetail = (log: typeof mockOperationLogs[0]) => {
    setSelectedLog(log)
    setShowDetailDialog(true)
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 p-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">操作日志</h1>
        <p className="text-sm text-muted-foreground mt-1">查看系统用户的操作行为记录，便于安全审计和问题追踪</p>
      </div>

      {/* 搜索和筛选 */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-end gap-4">
            <div className="w-48">
              <Label className="text-xs text-muted-foreground mb-1.5 block">关键词搜索</Label>
              <Input
                placeholder="搜索操作人、操作标题"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="w-32">
              <Label className="text-xs text-muted-foreground mb-1.5 block">操作类型</Label>
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
              <Label className="text-xs text-muted-foreground mb-1.5 block">操作模块</Label>
              <Select value={moduleFilter} onValueChange={setModuleFilter}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {moduleOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-28">
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
            <div className="w-36">
              <Label className="text-xs text-muted-foreground mb-1.5 block">开始日期</Label>
              <Input 
                type="date" 
                className="h-9"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="w-36">
              <Label className="text-xs text-muted-foreground mb-1.5 block">结束日期</Label>
              <Input 
                type="date" 
                className="h-9"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
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
          <Button variant="outline">
            <Download className="h-4 w-4 mr-1" />
            导出日志
          </Button>
          <Button variant="outline" className="text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4 mr-1" />
            清空日志
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          共 {filteredLogs.length} 条记录
        </div>
      </div>

      {/* 日志列表 */}
      <Card className="flex-1">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">操作模块</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">操作类型</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">操作标题</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">操作人</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">IP地址</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">状态</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">耗时</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">操作时间</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b hover:bg-muted/20">
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{log.module}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${typeColors[log.type] || 'bg-gray-100 text-gray-600'}`}>
                      {typeIcons[log.type]}
                      {typeOptions.find(t => t.value === log.type)?.label || log.type}
                    </span>
                  </td>
                  <td className="p-3 text-sm font-medium">{log.title}</td>
                  <td className="p-3 text-sm">
                    <div>
                      <div>{log.operator}</div>
                      <div className="text-xs text-muted-foreground">{log.department}</div>
                    </div>
                  </td>
                  <td className="p-3 text-sm font-mono text-muted-foreground text-xs">{log.ipAddress}</td>
                  <td className="p-3 text-sm">
                    <Badge 
                      variant="outline"
                      className={log.status === "success" 
                        ? "text-green-600 border-green-300 bg-green-50" 
                        : "text-red-600 border-red-300 bg-red-50"
                      }
                    >
                      {log.status === "success" ? "成功" : "失败"}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">{log.costTime}ms</td>
                  <td className="p-3 text-sm text-muted-foreground">{log.operTime}</td>
                  <td className="p-3 text-sm">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8"
                      onClick={() => handleViewDetail(log)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      详情
                    </Button>
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
          共 {filteredLogs.length} 条记录，每页 10 条
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>上一页</Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm" disabled>下一页</Button>
        </div>
      </div>

      {/* 详情弹窗 */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              操作日志详情
            </DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">操作模块</Label>
                  <p className="mt-1">{selectedLog.module}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">操作类型</Label>
                  <p className="mt-1">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${typeColors[selectedLog.type]}`}>
                      {typeIcons[selectedLog.type]}
                      {typeOptions.find(t => t.value === selectedLog.type)?.label}
                    </span>
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">操作标题</Label>
                  <p className="mt-1 font-medium">{selectedLog.title}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">操作状态</Label>
                  <p className="mt-1">
                    <Badge 
                      variant="outline"
                      className={selectedLog.status === "success" 
                        ? "text-green-600 border-green-300 bg-green-50" 
                        : "text-red-600 border-red-300 bg-red-50"
                      }
                    >
                      {selectedLog.status === "success" ? "成功" : "失败"}
                    </Badge>
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">操作人</Label>
                  <p className="mt-1">{selectedLog.operator} ({selectedLog.department})</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">IP地址</Label>
                  <p className="mt-1 font-mono text-sm">{selectedLog.ipAddress}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">操作时间</Label>
                  <p className="mt-1">{selectedLog.operTime}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">耗时</Label>
                  <p className="mt-1">{selectedLog.costTime}ms</p>
                </div>
              </div>
              
              <div>
                <Label className="text-muted-foreground">请求方法</Label>
                <p className="mt-1">
                  <Badge variant="secondary">{selectedLog.requestMethod}</Badge>
                  <span className="ml-2 font-mono text-sm text-muted-foreground">{selectedLog.requestUrl}</span>
                </p>
              </div>
              
              <div>
                <Label className="text-muted-foreground">请求参数</Label>
                <pre className="mt-1 p-3 bg-muted rounded-lg text-xs overflow-x-auto">
                  {JSON.stringify(JSON.parse(selectedLog.requestParams), null, 2)}
                </pre>
              </div>
              
              <div>
                <Label className="text-muted-foreground">响应结果</Label>
                <pre className="mt-1 p-3 bg-muted rounded-lg text-xs overflow-x-auto">
                  {JSON.stringify(JSON.parse(selectedLog.responseResult), null, 2)}
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
