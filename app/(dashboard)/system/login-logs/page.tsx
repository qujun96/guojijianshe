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
  Search, 
  RotateCcw, 
  Download,
  Trash2,
  LogIn,
  CheckCircle,
  XCircle,
  Monitor,
  Smartphone,
  Globe,
} from "lucide-react"

// 模拟登录日志数据
const mockLoginLogs = [
  {
    id: "1",
    username: "admin",
    realName: "系统管理员",
    ipAddress: "192.168.1.100",
    location: "北京市",
    browser: "Chrome 120.0",
    os: "Windows 10",
    device: "desktop",
    status: "success",
    message: "登录成功",
    loginTime: "2024-03-20 14:30:25",
  },
  {
    id: "2",
    username: "zhangwei",
    realName: "张伟",
    ipAddress: "192.168.1.101",
    location: "上海市",
    browser: "Firefox 122.0",
    os: "macOS 14.2",
    device: "desktop",
    status: "success",
    message: "登录成功",
    loginTime: "2024-03-20 14:25:10",
  },
  {
    id: "3",
    username: "chenming",
    realName: "陈明",
    ipAddress: "192.168.1.102",
    location: "广州市",
    browser: "Safari 17.2",
    os: "iOS 17.2",
    device: "mobile",
    status: "success",
    message: "登录成功",
    loginTime: "2024-03-20 14:20:05",
  },
  {
    id: "4",
    username: "liufang",
    realName: "刘芳",
    ipAddress: "192.168.1.103",
    location: "深圳市",
    browser: "Chrome 120.0",
    os: "Android 14",
    device: "mobile",
    status: "fail",
    message: "密码错误",
    loginTime: "2024-03-20 14:15:30",
  },
  {
    id: "5",
    username: "wanglei",
    realName: "王磊",
    ipAddress: "192.168.1.104",
    location: "杭州市",
    browser: "Edge 121.0",
    os: "Windows 11",
    device: "desktop",
    status: "success",
    message: "登录成功",
    loginTime: "2024-03-20 14:10:15",
  },
  {
    id: "6",
    username: "liqiang",
    realName: "李强",
    ipAddress: "192.168.1.105",
    location: "南京市",
    browser: "Chrome 120.0",
    os: "macOS 14.1",
    device: "desktop",
    status: "fail",
    message: "账号已被禁用",
    loginTime: "2024-03-20 14:05:00",
  },
  {
    id: "7",
    username: "admin",
    realName: "系统管理员",
    ipAddress: "192.168.1.100",
    location: "北京市",
    browser: "Chrome 120.0",
    os: "Windows 10",
    device: "desktop",
    status: "success",
    message: "登录成功",
    loginTime: "2024-03-20 10:00:00",
  },
  {
    id: "8",
    username: "zhangwei",
    realName: "张伟",
    ipAddress: "10.0.0.50",
    location: "上海市",
    browser: "Chrome 119.0",
    os: "Windows 10",
    device: "desktop",
    status: "fail",
    message: "验证码错误",
    loginTime: "2024-03-19 18:30:00",
  },
]

const statusOptions = [
  { value: "all", label: "全部状态" },
  { value: "success", label: "成功" },
  { value: "fail", label: "失败" },
]

export default function LoginLogsPage() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredLogs = mockLoginLogs.filter(log => {
    const matchSearch = !searchKeyword || 
      log.username.includes(searchKeyword) || 
      log.realName.includes(searchKeyword) ||
      log.ipAddress.includes(searchKeyword)
    const matchStatus = statusFilter === "all" || log.status === statusFilter
    return matchSearch && matchStatus
  })

  const handleReset = () => {
    setSearchKeyword("")
    setStatusFilter("all")
    setStartDate("")
    setEndDate("")
  }

  // 统计数据
  const totalLogs = mockLoginLogs.length
  const successLogs = mockLoginLogs.filter(l => l.status === "success").length
  const failLogs = mockLoginLogs.filter(l => l.status === "fail").length

  return (
    <div className="flex-1 flex flex-col min-h-0 p-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">登录日志</h1>
        <p className="text-sm text-muted-foreground mt-1">查看系统用户的登录历史记录</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">登录总次数</p>
                <p className="text-2xl font-semibold mt-1">{totalLogs}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <LogIn className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">登录成功</p>
                <p className="text-2xl font-semibold mt-1 text-green-600">{successLogs}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">登录失败</p>
                <p className="text-2xl font-semibold mt-1 text-red-600">{failLogs}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-600" />
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
                placeholder="搜索用户名、姓名、IP地址"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="w-32">
              <Label className="text-xs text-muted-foreground mb-1.5 block">登录状态</Label>
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
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">用户信息</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">登录IP/地点</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">浏览器/系统</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">设备</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">状态</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">消息</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">登录时间</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b hover:bg-muted/20">
                  <td className="p-3 text-sm">
                    <div>
                      <span className="font-medium">{log.realName}</span>
                      <span className="text-muted-foreground ml-2">({log.username})</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-mono text-xs">{log.ipAddress}</div>
                        <div className="text-muted-foreground text-xs">{log.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-sm">
                    <div>
                      <div className="text-xs">{log.browser}</div>
                      <div className="text-muted-foreground text-xs">{log.os}</div>
                    </div>
                  </td>
                  <td className="p-3 text-sm">
                    {log.device === "desktop" ? (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Monitor className="h-4 w-4" />
                        <span className="text-xs">电脑</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Smartphone className="h-4 w-4" />
                        <span className="text-xs">手机</span>
                      </div>
                    )}
                  </td>
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
                  <td className="p-3 text-sm text-muted-foreground">{log.message}</td>
                  <td className="p-3 text-sm text-muted-foreground">{log.loginTime}</td>
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
    </div>
  )
}
