"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { 
  ArrowLeft,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Home,
  AlertTriangle,
  CheckCircle2,
  Calendar as CalendarIcon,
  Upload,
  Globe
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

export default function OverseasStatusPage() {
  const [arrivalDate, setArrivalDate] = useState<Date>()
  
  const projectInfo = {
    name: "2026年《中美人才培养计划》1+2+1双学位项目",
    targetSchool: "美国特洛伊大学",
    country: "美国",
    city: "特洛伊市",
    startDate: "2026-09-01",
    endDate: "2028-06-30"
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-6">
        {/* 返回和标题 */}
        <div className="flex items-center gap-4">
          <Link href="/student/departure-tasks">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              返回
            </Button>
          </Link>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground">在外情况填写</h1>
          <p className="text-muted-foreground mt-1">请填写您在境外的联系方式和住址信息</p>
        </div>

        {/* 项目信息 */}
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-blue-900">{projectInfo.name}</div>
                <div className="text-sm text-blue-700 mt-1">
                  {projectInfo.targetSchool} · {projectInfo.country} · {projectInfo.city}
                </div>
              </div>
              <Badge className="bg-blue-500">派出中</Badge>
            </div>
          </CardContent>
        </Card>

        {/* 抵达信息 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              抵达信息
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>抵达日期 <span className="text-destructive">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {arrivalDate ? format(arrivalDate, "PPP", { locale: zhCN }) : "选择日期"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={arrivalDate}
                      onSelect={setArrivalDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>抵达城市 <span className="text-destructive">*</span></Label>
                <Input placeholder="如：洛杉矶" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>入境机场/口岸</Label>
              <Input placeholder="如：洛杉矶国际机场 (LAX)" />
            </div>
          </CardContent>
        </Card>

        {/* 境外住址 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Home className="h-4 w-4" />
              境外住址
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>住宿类型 <span className="text-destructive">*</span></Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dorm">学校宿舍</SelectItem>
                    <SelectItem value="apartment">校外公寓</SelectItem>
                    <SelectItem value="homestay">寄宿家庭</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>邮政编码</Label>
                <Input placeholder="如：36082" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>详细地址（英文） <span className="text-destructive">*</span></Label>
              <Textarea placeholder="请填写完整的英文地址" />
            </div>
            <div className="space-y-2">
              <Label>详细地址（中文）</Label>
              <Textarea placeholder="请填写中文地址（选填）" />
            </div>
          </CardContent>
        </Card>

        {/* 境外联系方式 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Phone className="h-4 w-4" />
              境外联系方式
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>境外手机号 <span className="text-destructive">*</span></Label>
                <div className="flex gap-2">
                  <Select defaultValue="+1">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+1">+1</SelectItem>
                      <SelectItem value="+44">+44</SelectItem>
                      <SelectItem value="+81">+81</SelectItem>
                      <SelectItem value="+82">+82</SelectItem>
                      <SelectItem value="+49">+49</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="手机号码" className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>境外邮箱</Label>
                <Input type="email" placeholder="如：xxx@university.edu" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>即时通讯软件</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="line">LINE</SelectItem>
                    <SelectItem value="telegram">Telegram</SelectItem>
                    <SelectItem value="wechat">微信</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>账号/ID</Label>
                <Input placeholder="即时通讯账号" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 紧急联系人（境外） */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">境外紧急联系人</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>联系人姓名 <span className="text-destructive">*</span></Label>
                <Input placeholder="请输入" />
              </div>
              <div className="space-y-2">
                <Label>与本人关系 <span className="text-destructive">*</span></Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="advisor">学校导师</SelectItem>
                    <SelectItem value="friend">同学/朋友</SelectItem>
                    <SelectItem value="host">寄宿家庭</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>联系电话 <span className="text-destructive">*</span></Label>
                <Input placeholder="请输入" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 补充材料 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">补充材料</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>签证页照片</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">上传签证页照片</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>入境章照片</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">上传护照入境章照片</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 提交按钮 */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="min-w-[120px]">保存草稿</Button>
          <Button className="min-w-[120px]">提交信息</Button>
        </div>
      </div>

      {/* 右侧AI助手面板 */}
      <div className="w-72 shrink-0">
        <Card className="sticky top-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-white">AI安全助手</CardTitle>
                <p className="text-xs text-slate-400">保障您的海外安全</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 填写进度 */}
            <div className="p-3 bg-white/10 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">填写进度</span>
                <span className="text-sm font-medium text-white">30%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5">
                <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            {/* 安全提醒 */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400">安全提醒</div>
              <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <div className="text-xs text-amber-200">
                    请确保境外联系方式准确有效，以便紧急情况下联系您
                  </div>
                </div>
              </div>
            </div>

            {/* 当地信息 */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400">目的地信息</div>
              <div className="p-3 bg-white/10 rounded-lg space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">时差</span>
                  <span className="text-white">-13小时</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">当地时间</span>
                  <span className="text-white">08:30 AM</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">紧急电话</span>
                  <span className="text-white">911</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">使馆电话</span>
                  <span className="text-cyan-400">+1-202-xxxx</span>
                </div>
              </div>
            </div>

            {/* 流程状态 */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400">流程状态</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-slate-300">离校任务完成</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-slate-300">学籍异动已办结</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  </div>
                  <span className="text-xs text-white font-medium">填写在外情况</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-slate-500"></div>
                  <span className="text-xs text-slate-500">完成派出流程</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
