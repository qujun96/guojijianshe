"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Save,
  Settings,
  Mail,
  Shield,
  FileText,
  Bell,
  Globe,
  Database,
  Clock,
  Upload,
} from "lucide-react"

export default function SystemSettingsPage() {
  // 基础设置
  const [siteName, setSiteName] = useState("国际化项目管理平台")
  const [siteDescription, setSiteDescription] = useState("高校国际化交流项目全流程管理系统")
  const [copyright, setCopyright] = useState("© 2024 国际合作处 版权所有")
  const [icp, setIcp] = useState("京ICP备XXXXXXXX号")
  
  // 安全设置
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [maxLoginAttempts, setMaxLoginAttempts] = useState("5")
  const [passwordMinLength, setPasswordMinLength] = useState("8")
  const [passwordComplexity, setPasswordComplexity] = useState("medium")
  const [captchaEnabled, setCaptchaEnabled] = useState(true)
  const [ipWhitelistEnabled, setIpWhitelistEnabled] = useState(false)
  
  // 文件设置
  const [maxFileSize, setMaxFileSize] = useState("10")
  const [allowedFileTypes, setAllowedFileTypes] = useState(".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png")
  const [storageType, setStorageType] = useState("local")
  
  // 邮件设置
  const [smtpHost, setSmtpHost] = useState("smtp.example.com")
  const [smtpPort, setSmtpPort] = useState("465")
  const [smtpUser, setSmtpUser] = useState("noreply@example.com")
  const [smtpPassword, setSmtpPassword] = useState("")
  const [smtpSsl, setSmtpSsl] = useState(true)
  
  // 通知设置
  const [emailNotification, setEmailNotification] = useState(true)
  const [smsNotification, setSmsNotification] = useState(false)
  const [systemNotification, setSystemNotification] = useState(true)

  return (
    <div className="flex-1 flex flex-col min-h-0 p-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">系统配置</h1>
        <p className="text-sm text-muted-foreground mt-1">管理系统全局参数设置</p>
      </div>

      <Tabs defaultValue="basic" className="flex-1">
        <TabsList className="mb-4">
          <TabsTrigger value="basic" className="gap-2">
            <Globe className="h-4 w-4" />
            基础设置
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            安全设置
          </TabsTrigger>
          <TabsTrigger value="file" className="gap-2">
            <FileText className="h-4 w-4" />
            文件设置
          </TabsTrigger>
          <TabsTrigger value="email" className="gap-2">
            <Mail className="h-4 w-4" />
            邮件设置
          </TabsTrigger>
          <TabsTrigger value="notification" className="gap-2">
            <Bell className="h-4 w-4" />
            通知设置
          </TabsTrigger>
        </TabsList>

        {/* 基础设置 */}
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">基础信息</CardTitle>
              <CardDescription>配置系统的基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>系统名称</Label>
                  <Input 
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>系统Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      更换Logo
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>系统描述</Label>
                <Textarea 
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>版权信息</Label>
                  <Input 
                    value={copyright}
                    onChange={(e) => setCopyright(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>备案号</Label>
                  <Input 
                    value={icp}
                    onChange={(e) => setIcp(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-1" />
                  保存配置
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 安全设置 */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">安全配置</CardTitle>
              <CardDescription>配置系统安全相关参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>会话超时时间（分钟）</Label>
                  <Input 
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">用户无操作多久后自动退出登录</p>
                </div>
                <div className="space-y-2">
                  <Label>最大登录尝试次数</Label>
                  <Input 
                    type="number"
                    value={maxLoginAttempts}
                    onChange={(e) => setMaxLoginAttempts(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">超过次数后账号将被临时锁定</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>密码最小长度</Label>
                  <Input 
                    type="number"
                    value={passwordMinLength}
                    onChange={(e) => setPasswordMinLength(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>密码复杂度要求</Label>
                  <Select value={passwordComplexity} onValueChange={setPasswordComplexity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">低（仅字母或数字）</SelectItem>
                      <SelectItem value="medium">中（字母+数字）</SelectItem>
                      <SelectItem value="high">高（字母+数字+特殊字符）</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>启用验证码</Label>
                    <p className="text-xs text-muted-foreground">登录时需要输入图形验证码</p>
                  </div>
                  <Switch checked={captchaEnabled} onCheckedChange={setCaptchaEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>IP白名单</Label>
                    <p className="text-xs text-muted-foreground">只允许白名单内的IP访问系统</p>
                  </div>
                  <Switch checked={ipWhitelistEnabled} onCheckedChange={setIpWhitelistEnabled} />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-1" />
                  保存配置
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 文件设置 */}
        <TabsContent value="file">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">文件上传配置</CardTitle>
              <CardDescription>配置文件上传相关参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>最大文件大小（MB）</Label>
                  <Input 
                    type="number"
                    value={maxFileSize}
                    onChange={(e) => setMaxFileSize(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>存储方式</Label>
                  <Select value={storageType} onValueChange={setStorageType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">本地存储</SelectItem>
                      <SelectItem value="oss">阿里云OSS</SelectItem>
                      <SelectItem value="cos">腾讯云COS</SelectItem>
                      <SelectItem value="minio">MinIO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>允许的文件类型</Label>
                <Input 
                  value={allowedFileTypes}
                  onChange={(e) => setAllowedFileTypes(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">多个类型用逗号分隔，如：.pdf,.doc,.docx</p>
              </div>
              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-1" />
                  保存配置
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 邮件设置 */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">邮件服务配置</CardTitle>
              <CardDescription>配置系统邮件发送参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>SMTP服务器</Label>
                  <Input 
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>SMTP端口</Label>
                  <Input 
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>发件人邮箱</Label>
                  <Input 
                    type="email"
                    value={smtpUser}
                    onChange={(e) => setSmtpUser(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>邮箱密码/授权码</Label>
                  <Input 
                    type="password"
                    value={smtpPassword}
                    onChange={(e) => setSmtpPassword(e.target.value)}
                    placeholder="请输入密码或授权码"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>启用SSL</Label>
                  <p className="text-xs text-muted-foreground">使用SSL加密连接邮件服务器</p>
                </div>
                <Switch checked={smtpSsl} onCheckedChange={setSmtpSsl} />
              </div>
              <div className="flex justify-between">
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-1" />
                  发送测试邮件
                </Button>
                <Button>
                  <Save className="h-4 w-4 mr-1" />
                  保存配置
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 通知设置 */}
        <TabsContent value="notification">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">通知渠道配置</CardTitle>
              <CardDescription>配置系统消息通知方式</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <Label>邮件通知</Label>
                      <p className="text-xs text-muted-foreground">通过邮件发送系统通知</p>
                    </div>
                  </div>
                  <Switch checked={emailNotification} onCheckedChange={setEmailNotification} />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <Label>短信通知</Label>
                      <p className="text-xs text-muted-foreground">通过短信发送重要通知</p>
                    </div>
                  </div>
                  <Switch checked={smsNotification} onCheckedChange={setSmsNotification} />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Settings className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <Label>站内消息</Label>
                      <p className="text-xs text-muted-foreground">在系统内发送通知消息</p>
                    </div>
                  </div>
                  <Switch checked={systemNotification} onCheckedChange={setSystemNotification} />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-1" />
                  保存配置
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
