"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Globe,
  GraduationCap,
  BookOpen,
  Shield,
  Eye,
  EyeOff,
  ChevronRight,
  User,
  Lock,
  Sparkles,
  ArrowRight,
} from "lucide-react"

interface SystemOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  bgColor: string
  href: string
}

const TEXTS = {
  portalTitle: "高校统一服务门户",
  portalSubtitle: "University Unified Service Portal",
  oneStopService: "一站式服务入口",
  portalDescription: "统一门户，便捷访问各业务系统，避免在不同系统间切换跳转，提升师生办事效率。",
  selectSystem: "选择要登录的系统",
  aiSupport: "AI智能助手全程支持",
  welcomeLogin: "欢迎登录",
  loginHint: "请使用校园统一身份认证账号登录",
  usernameLabel: "用户名 / 学号 / 工号",
  usernamePlaceholder: "请输入用户名",
  passwordLabel: "密码",
  passwordPlaceholder: "请输入密码",
  forgotPassword: "忘记密码?",
  rememberLogin: "记住登录状态",
  loginButton: "登录系统",
  loggingIn: "登录中...",
  help: "使用帮助",
  contactAdmin: "联系管理员",
  faq: "常见问题",
  copyright: "Copyright 2026 高校信息化建设中心",
  techSupport: "技术支持：信息化处",
  systemInternational: "国际化项目管理平台",
  systemInternationalDesc: "学生出国境项目申请、审批、学分兑换全流程管理",
  systemUndergraduate: "本科生院教务系统",
  systemUndergraduateDesc: "本科生学籍管理、课程选修、成绩查询",
  systemGraduate: "研究生院管理系统",
  systemGraduateDesc: "研究生培养、学位申请、论文管理",
  systemSSO: "统一身份认证系统",
  systemSSODesc: "单点登录、身份验证、权限管理",
}

export default function LoginPage() {
  const router = useRouter()
  const [selectedSystem, setSelectedSystem] = useState<string>("international")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const systems: SystemOption[] = [
    {
      id: "international",
      name: TEXTS.systemInternational,
      description: TEXTS.systemInternationalDesc,
      icon: <Globe className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100 border-blue-200",
      href: "/",
    },
    {
      id: "undergraduate",
      name: TEXTS.systemUndergraduate,
      description: TEXTS.systemUndergraduateDesc,
      icon: <BookOpen className="h-6 w-6" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
      href: "/external/undergraduate",
    },
    {
      id: "graduate",
      name: TEXTS.systemGraduate,
      description: TEXTS.systemGraduateDesc,
      icon: <GraduationCap className="h-6 w-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 hover:bg-purple-100 border-purple-200",
      href: "/external/graduate",
    },
    {
      id: "sso",
      name: TEXTS.systemSSO,
      description: TEXTS.systemSSODesc,
      icon: <Shield className="h-6 w-6" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50 hover:bg-amber-100 border-amber-200",
      href: "/external/sso",
    },
  ]

  const currentSystem = systems.find(s => s.id === selectedSystem)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (typeof window !== "undefined") {
      sessionStorage.setItem("isLoggedIn", "true")
      sessionStorage.setItem("selectedSystem", selectedSystem)
    }
    
    if (currentSystem) {
      if (selectedSystem === "international") {
        router.push("/home")
      } else {
        router.push(currentSystem.href)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
      {/* Left Panel - System Selection */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[560px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex-col p-8 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Globe className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{TEXTS.portalTitle}</h1>
              <p className="text-sm text-slate-400">{TEXTS.portalSubtitle}</p>
            </div>
          </div>

          {/* Title */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">
              {TEXTS.oneStopService}
            </h2>
            <p className="text-slate-400 leading-relaxed">
              {TEXTS.portalDescription}
            </p>
          </div>

          {/* System Selection */}
          <div className="space-y-3 flex-1">
            <p className="text-sm font-medium text-slate-400 mb-4">{TEXTS.selectSystem}</p>
            {systems.map((system) => (
              <button
                key={system.id}
                onClick={() => setSelectedSystem(system.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left group",
                  selectedSystem === system.id
                    ? "bg-white/10 border-white/30 shadow-lg"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                  selectedSystem === system.id
                    ? "bg-gradient-to-br from-blue-500 to-purple-600"
                    : "bg-white/10 group-hover:bg-white/20"
                )}>
                  <div className={selectedSystem === system.id ? "text-white" : "text-slate-300"}>
                    {system.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={cn(
                    "font-semibold text-sm transition-colors",
                    selectedSystem === system.id ? "text-white" : "text-slate-200"
                  )}>
                    {system.name}
                  </h3>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {system.description}
                  </p>
                </div>
                <ChevronRight className={cn(
                  "h-5 w-5 transition-all",
                  selectedSystem === system.id 
                    ? "text-white translate-x-0 opacity-100" 
                    : "text-slate-500 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                )} />
              </button>
            ))}
          </div>

          {/* AI Support Badge */}
          <div className="pt-8 border-t border-white/10 mt-8">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Sparkles className="h-4 w-4" />
              <span>{TEXTS.aiSupport}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile System Selection */}
          <div className="lg:hidden mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-slate-900">{TEXTS.portalTitle}</h1>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {systems.map((system) => (
                <button
                  key={system.id}
                  onClick={() => setSelectedSystem(system.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-lg border text-center transition-all",
                    selectedSystem === system.id
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-card border-border hover:border-primary/50"
                  )}
                >
                  <div className={selectedSystem === system.id ? system.color : "text-muted-foreground"}>
                    {system.icon}
                  </div>
                  <span className="text-xs font-medium line-clamp-1">{system.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-card rounded-2xl shadow-xl shadow-slate-200/50 border border-border p-8">
            {/* Current System Badge */}
            {currentSystem && (
              <div className={cn(
                "flex items-center gap-3 p-4 rounded-xl border mb-8",
                currentSystem.bgColor
              )}>
                <div className={currentSystem.color}>
                  {currentSystem.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-slate-900">{currentSystem.name}</h3>
                  <p className="text-xs text-slate-500">{currentSystem.description}</p>
                </div>
              </div>
            )}

            {/* Login Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{TEXTS.welcomeLogin}</h2>
              <p className="text-sm text-slate-500">
                {TEXTS.loginHint}
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  {TEXTS.usernameLabel}
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder={TEXTS.usernamePlaceholder}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    {TEXTS.passwordLabel}
                  </Label>
                  <button type="button" className="text-xs text-primary hover:underline">
                    {TEXTS.forgotPassword}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={TEXTS.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                  {TEXTS.rememberLogin}
                </Label>
              </div>

              <Button type="submit" className="w-full h-11 text-base gap-2" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    {TEXTS.loggingIn}
                  </>
                ) : (
                  <>
                    {TEXTS.loginButton}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Help Links */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-4 text-sm">
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  {TEXTS.help}
                </button>
                <span className="text-border">|</span>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  {TEXTS.contactAdmin}
                </button>
                <span className="text-border">|</span>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  {TEXTS.faq}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>{TEXTS.copyright}</p>
            <p className="mt-1">{TEXTS.techSupport}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
