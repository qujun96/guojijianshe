"use client"

// Organizations management page
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
import { Search, RotateCcw, Plus, Building2, Sparkles, Edit2, Trash2, Eye, Upload, Globe, MapPin, FileText } from "lucide-react"
import { Label } from "@/components/ui/label"

const organizations = [
  {
    id: 1,
    code: "US001",
    name: "A国J大学",
    nameEn: "Harvard University",
    country: "A国",
    region: "北美洲",
    type: "综合性大学",
    ranking: 3,
    isTop200: true,
    description: "世界顶尖私立研究型大学，位于A国某州某市。以其卓越的学术声誉、顶级的师资力量和丰富的研究资源闻名全球。",
    cooperationStart: "2018-09-01",
    projectCount: 5,
    studentCount: 45,
    enabled: true,
    certificates: ["合作协议书", "学分互认协议"],
  },
  {
    id: 2,
    code: "UK001",
    name: "G国H大学",
    nameEn: "University of Cambridge",
    country: "G国",
    region: "欧洲",
    type: "综合性大学",
    ranking: 2,
    isTop200: true,
    description: "G国历史最悠久的大学之一，世界著名的公立研究型大学，以其卓越的学术成就和严谨的学风著称。",
    cooperationStart: "2019-03-15",
    projectCount: 4,
    studentCount: 38,
    enabled: true,
    certificates: ["合作协议书", "学分互认协议", "教师交流协议"],
  },
  {
    id: 3,
    code: "JP001",
    name: "C国Y大学",
    nameEn: "The University of Tokyo",
    country: "C国",
    region: "亚洲",
    type: "综合性大学",
    ranking: 28,
    isTop200: true,
    description: "C国最高学术殿堂和帝国大学之首，在全球享有极高的声誉，是亚洲顶尖的研究型综合大学。",
    cooperationStart: "2020-01-10",
    projectCount: 6,
    studentCount: 52,
    enabled: true,
    certificates: ["合作协议书"],
  },
  {
    id: 4,
    code: "KR001",
    name: "首尔大学",
    nameEn: "Seoul National University",
    country: "A国",
    region: "亚洲",
    type: "综合性大学",
    ranking: 41,
    isTop200: true,
    description: "A国最具代表性的国立综合研究型大学，在A国享有最高学府的美誉。",
    cooperationStart: "2021-05-20",
    projectCount: 3,
    studentCount: 28,
    enabled: true,
    certificates: ["合作协议书", "短期交流协议"],
  },
  {
    id: 5,
    code: "DE001",
    name: "K国L大学",
    nameEn: "Technical University of Munich",
    country: "K国",
    region: "欧洲",
    type: "理工类大学",
    ranking: 37,
    isTop200: true,
    description: "K国最古老的工业大学之一，欧洲顶尖的理工科大学，以工程和自然科学见长。",
    cooperationStart: "2020-09-01",
    projectCount: 2,
    studentCount: 15,
    enabled: false,
    certificates: ["合作协议书"],
  },
]

export default function OrganizationsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedOrg, setSelectedOrg] = useState<typeof organizations[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrgs = organizations.filter(org => 
    org.name.includes(searchTerm) || org.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) || org.code.includes(searchTerm)
  )

  const handleView = (org: typeof organizations[0]) => {
    setSelectedOrg(org)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">学校/组织查询</CardTitle>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    新增学校/组织
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>新增学校/组织</DialogTitle>
                    <DialogDescription>
                      添加新的海外合作院校或组织机构
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>学校编码 *</Label>
                        <Input placeholder="如 US002" />
                      </div>
                      <div className="space-y-2">
                        <Label>学校中文名称 *</Label>
                        <Input placeholder="请输入中文名称" />
                      </div>
                      <div className="space-y-2">
                        <Label>学校英文名称 *</Label>
                        <Input placeholder="请输入英文名称" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>所在国家 *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="请选择国家" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="a-country">A国</SelectItem>
                            <SelectItem value="g-country">G国</SelectItem>
                            <SelectItem value="c-country">C国</SelectItem>
                            <SelectItem value="a-country">A国</SelectItem>
                            <SelectItem value="k-country">K国</SelectItem>
                            <SelectItem value="f-country">F国</SelectItem>
                            <SelectItem value="r-country">R国</SelectItem>
                            <SelectItem value="v-country">V国</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>所属地区 *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="请选择地区" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="north-america">北美洲</SelectItem>
                            <SelectItem value="europe">欧洲</SelectItem>
                            <SelectItem value="asia">亚洲</SelectItem>
                            <SelectItem value="oceania">大洋洲</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>学校类型 *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="请选择类型" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="comprehensive">综合性大学</SelectItem>
                            <SelectItem value="engineering">理工类大学</SelectItem>
                            <SelectItem value="arts">艺术类院校</SelectItem>
                            <SelectItem value="business">商学院</SelectItem>
                            <SelectItem value="organization">非学历机构</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>QS世界排名</Label>
                        <Input type="number" placeholder="请输入排名" />
                      </div>
                      <div className="space-y-2">
                        <Label>是否200强院校 *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="请选择" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">是</SelectItem>
                            <SelectItem value="no">否</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>合作起始时间</Label>
                        <Input type="date" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>学校信息描述 *</Label>
                      <div className="flex items-start gap-2">
                        <Textarea placeholder="请输入学校的详细介绍，包括学校特色、优势学科、校园环境等信息" rows={4} className="flex-1" />
                        <Button variant="outline" size="sm" className="h-8 gap-1 shrink-0">
                          <Sparkles className="h-3 w-3" />
                          AI生成
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>相关证明材料 *</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">点击或拖拽文件上传</p>
                        <p className="text-xs text-muted-foreground mt-1">支持上传合作协议书、学分互认协议、资质证明等文件</p>
                        <p className="text-xs text-muted-foreground">支持PDF、JPG、PNG格式，单个文件不超过20MB</p>
                        <Button variant="outline" size="sm" className="mt-3">
                          选择文件
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="enabled" defaultChecked />
                      <Label htmlFor="enabled">启用该学校/组织</Label>
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
            <div className="grid grid-cols-6 gap-3">
              <Input 
                placeholder="学校编码/名称" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="请选择国家" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部国家</SelectItem>
                  <SelectItem value="a-country">A国</SelectItem>
                  <SelectItem value="g-country">G国</SelectItem>
                  <SelectItem value="c-country">C国</SelectItem>
                  <SelectItem value="a-country">A国</SelectItem>
                  <SelectItem value="k-country">K国</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="请选择地区" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部地区</SelectItem>
                  <SelectItem value="north-america">北美洲</SelectItem>
                  <SelectItem value="europe">欧洲</SelectItem>
                  <SelectItem value="asia">亚洲</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="是否200强" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="yes">是</SelectItem>
                  <SelectItem value="no">否</SelectItem>
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
              <Building2 className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">学校/组织列表</CardTitle>
              <Badge variant="secondary" className="ml-2">{filteredOrgs.length} 条</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">编码</TableHead>
                  <TableHead>学校名称</TableHead>
                  <TableHead>国家/地区</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead className="text-center">QS排名</TableHead>
                  <TableHead className="text-center">200强</TableHead>
                  <TableHead className="text-center">合作项目</TableHead>
                  <TableHead className="text-center">派出学生</TableHead>
                  <TableHead className="text-center">状态</TableHead>
                  <TableHead className="text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrgs.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell className="font-mono text-sm">{org.code}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{org.name}</p>
                        <p className="text-xs text-muted-foreground">{org.nameEn}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{org.country}</span>
                        <Badge variant="outline" className="ml-1 text-xs">{org.region}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/5">{org.type}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-medium">{org.ranking}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      {org.isTop200 ? (
                        <Badge className="bg-green-500">是</Badge>
                      ) : (
                        <Badge variant="secondary">否</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{org.projectCount}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{org.studentCount}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={org.enabled ? "default" : "secondary"} className={org.enabled ? "bg-green-500" : ""}>
                        {org.enabled ? "已启用" : "已禁用"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 gap-1 text-primary" onClick={() => handleView(org)}>
                          <Eye className="h-3 w-3" />
                          详情
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 gap-1 text-primary">
                          <Edit2 className="h-3 w-3" />
                          编辑
                        </Button>
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

        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                {selectedOrg?.name}
              </DialogTitle>
              <DialogDescription>{selectedOrg?.nameEn}</DialogDescription>
            </DialogHeader>
            {selectedOrg && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">学校编码</span>
                    <p className="font-medium mt-1">{selectedOrg.code}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">所在国家</span>
                    <p className="font-medium mt-1">{selectedOrg.country}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">所属地区</span>
                    <p className="font-medium mt-1">{selectedOrg.region}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">学校类型</span>
                    <p className="font-medium mt-1">{selectedOrg.type}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">QS世界排名</span>
                    <p className="font-medium mt-1">第 {selectedOrg.ranking} 名</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">是否200强</span>
                    <p className="font-medium mt-1">{selectedOrg.isTop200 ? "是" : "否"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">合作起始时间</span>
                    <p className="font-medium mt-1">{selectedOrg.cooperationStart}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">合作项目数</span>
                    <p className="font-medium mt-1">{selectedOrg.projectCount} 个</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">派出学生数</span>
                    <p className="font-medium mt-1">{selectedOrg.studentCount} 人</p>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">学校信息描述</span>
                  <p className="mt-1 text-sm leading-relaxed">{selectedOrg.description}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">相关证明材料</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedOrg.certificates.map((cert, index) => (
                      <Badge key={index} variant="outline" className="gap-1">
                        <FileText className="h-3 w-3" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>关闭</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      
    </div>
  )
}
