"use client"

import { useState } from "react"
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AIAssistantPanel } from "@/components/ai/ai-assistant-panel"
import { Search, RotateCcw, Globe, MapPin, Phone, Mail, Home, Eye, Download, CheckCircle2, Clock } from "lucide-react"

const overseasRecords = [
  {
    id: 1,
    studentName: "张五",
    studentId: "2022010001",
    department: "计算机学院",
    projectName: "2026年《中美人才培养计划》1+2+1双学位项目",
    targetCountry: "美国",
    targetCity: "特洛伊市",
    targetSchool: "美国特洛伊大学",
    arrivalDate: "2026-09-01",
    overseasPhone: "+1 334-123-4567",
    overseasEmail: "zhangwu@troy.edu",
    address: "Troy University, Troy, AL 36082, USA",
    emergencyContact: "Dr. Smith (导师)",
    emergencyPhone: "+1 334-888-8888",
    submitTime: "2026-09-02 10:30",
    status: "已确认",
  },
  {
    id: 2,
    studentName: "李明",
    studentId: "2022010002",
    department: "外国语学院",
    projectName: "剑桥大学2026寒假短期课程项目",
    targetCountry: "英国",
    targetCity: "剑桥",
    targetSchool: "剑桥大学",
    arrivalDate: "2026-07-16",
    overseasPhone: "+44 7123456789",
    overseasEmail: "liming@cam.ac.uk",
    address: "Churchill College, Cambridge CB3 0DS, UK",
    emergencyContact: "王芳 (同学)",
    emergencyPhone: "+44 7987654321",
    submitTime: "2026-07-17 09:15",
    status: "已确认",
  },
  {
    id: 3,
    studentName: "王芳",
    studentId: "2022010003",
    department: "管理学院",
    projectName: "布里斯托3+1本硕连读",
    targetCountry: "英国",
    targetCity: "布里斯托",
    targetSchool: "布里斯托大学",
    arrivalDate: null,
    overseasPhone: null,
    overseasEmail: null,
    address: null,
    emergencyContact: null,
    emergencyPhone: null,
    submitTime: null,
    status: "待填写",
  },
]

export default function OverseasStatusAdminPage() {
  const [selectedRecord, setSelectedRecord] = useState<typeof overseasRecords[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleViewDetail = (record: typeof overseasRecords[0]) => {
    setSelectedRecord(record)
    setIsDialogOpen(true)
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">在外情况查看</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-5 gap-3">
              <Input placeholder="学生姓名/学号" />
              <Input placeholder="项目名称" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="目的国家" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">美国</SelectItem>
                  <SelectItem value="uk">英国</SelectItem>
                  <SelectItem value="de">德国</SelectItem>
                  <SelectItem value="jp">日本</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="填写状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">已确认</SelectItem>
                  <SelectItem value="pending">待填写</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button className="gap-2 flex-1">
                  <Search className="h-4 w-4" />
                  搜索
                </Button>
                <Button variant="outline" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">学生在外情况列表</CardTitle>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                导出数据
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>学生姓名</TableHead>
                  <TableHead>学号</TableHead>
                  <TableHead>归属单位</TableHead>
                  <TableHead>项目名称</TableHead>
                  <TableHead>目的国家/城市</TableHead>
                  <TableHead>抵达日期</TableHead>
                  <TableHead>提交时间</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overseasRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.studentName}</TableCell>
                    <TableCell className="text-sm">{record.studentId}</TableCell>
                    <TableCell className="text-sm">{record.department}</TableCell>
                    <TableCell className="text-sm max-w-[180px] truncate text-primary">
                      {record.projectName}
                    </TableCell>
                    <TableCell className="text-sm">
                      {record.targetCountry} / {record.targetCity}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {record.arrivalDate || "-"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {record.submitTime || "-"}
                    </TableCell>
                    <TableCell>
                      {record.status === "已确认" ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          已确认
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-amber-600 border-amber-300">
                          <Clock className="h-3 w-3 mr-1" />
                          待填写
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {record.status === "已确认" ? (
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="h-auto p-0 text-primary"
                          onClick={() => handleViewDetail(record)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          查看详情
                        </Button>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel title="AI智能助手" subtitle="学生在外情况监控">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">填写统计</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm p-2 bg-muted rounded">
              <span className="text-muted-foreground">已确认</span>
              <Badge className="bg-green-500">2人</Badge>
            </div>
            <div className="flex items-center justify-between text-sm p-2 bg-muted rounded">
              <span className="text-muted-foreground">待填写</span>
              <Badge variant="outline" className="text-amber-600 border-amber-300">1人</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">目的地分布</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm p-2 bg-muted rounded">
              <span>美国</span>
              <span className="font-medium">1人</span>
            </div>
            <div className="flex items-center justify-between text-sm p-2 bg-muted rounded">
              <span>英国</span>
              <span className="font-medium">2人</span>
            </div>
          </div>
        </div>
      </AIAssistantPanel>

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              学生在外情况详情
            </DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">学生姓名</div>
                  <div className="font-medium">{selectedRecord.studentName}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">学号</div>
                  <div className="font-medium">{selectedRecord.studentId}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">归属单位</div>
                  <div className="font-medium">{selectedRecord.department}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">项目名称</div>
                  <div className="font-medium">{selectedRecord.projectName}</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  境外位置信息
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">目的国家/城市</div>
                    <div className="font-medium">{selectedRecord.targetCountry} / {selectedRecord.targetCity}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">目标学校</div>
                    <div className="font-medium">{selectedRecord.targetSchool}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">抵达日期</div>
                    <div className="font-medium">{selectedRecord.arrivalDate}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Home className="h-3 w-3" /> 详细地址
                  </div>
                  <div className="font-medium">{selectedRecord.address}</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  联系方式
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" /> 境外手机号
                    </div>
                    <div className="font-medium">{selectedRecord.overseasPhone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" /> 境外邮箱
                    </div>
                    <div className="font-medium">{selectedRecord.overseasEmail}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">境外紧急联系人</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">联系人</div>
                    <div className="font-medium">{selectedRecord.emergencyContact}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">联系电话</div>
                    <div className="font-medium">{selectedRecord.emergencyPhone}</div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground text-right">
                提交时间：{selectedRecord.submitTime}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
