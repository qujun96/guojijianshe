"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Globe,
  FileText,
  Building2,
  ClipboardCheck,
  UserCheck,
  ChevronDown,
  ChevronRight,
  Plane,
  BookOpen,
  GraduationCap,
  Award,
  BarChart3,
  LayoutDashboard,
  Monitor,
  PieChart,
  ClipboardList,
  UserCog,
  MapPin,
  Home,
  RefreshCcw,
  FileArchive,
  Send,
  FolderOpen,
  Settings,
  FileSignature,
  Eye,
  LogIn,
  ArrowRightLeft,
  Archive,
  Shield,
  Users,
  KeyRound,
  Network,
  BookMarked,
  ScrollText,
  History,
  Cog,
  Bell,
} from "lucide-react"

interface MenuItemType {
  label: string
  href?: string
  icon: React.ReactNode
  children?: MenuItemType[]
  badge?: string
  badgeColor?: string
}

const menuItems: MenuItemType[] = [
  // 综合入口
  {
    label: "首页工作台",
    icon: <LayoutDashboard className="h-4 w-4" />,
    href: "/home",
  },
  {
    label: "全流程监控",
    icon: <Monitor className="h-4 w-4" />,
    href: "/dashboard/monitor",
  },
  {
    label: "数据统计分析",
    icon: <PieChart className="h-4 w-4" />,
    href: "/dashboard/analytics",
  },
  // 项目管理
  {
    label: "项目管理",
    icon: <FolderOpen className="h-4 w-4" />,
    children: [
      { label: "项目发布查询", href: "/admin/projects", icon: <FileText className="h-4 w-4" /> },
      { label: "项目立项申报", href: "/admin/project-application", icon: <FileSignature className="h-4 w-4" /> },
      { label: "立项申报审核", href: "/admin/project-application-review", icon: <ClipboardCheck className="h-4 w-4" /> },
      { label: "项目类型管理", href: "/admin/project-types", icon: <Settings className="h-4 w-4" /> },
      { label: "学校/组织管理", href: "/admin/organizations", icon: <Building2 className="h-4 w-4" /> },
      { label: "规则模板管理", href: "/admin/rule-templates", icon: <ClipboardList className="h-4 w-4" /> },
    ],
  },
  // 派出前阶段
  {
    label: "派出前",
    icon: <Send className="h-4 w-4" />,
    badge: "阶段1",
    badgeColor: "bg-blue-500",
    children: [
      { label: "项目申请", href: "/student/apply", icon: <FileSignature className="h-4 w-4" /> },
      { label: "我的申请查询", href: "/student/applications", icon: <ClipboardList className="h-4 w-4" /> },
      { label: "参与项目查询", href: "/student/my-projects", icon: <FolderOpen className="h-4 w-4" /> },
      { label: "申请审核", href: "/admin/review", icon: <ClipboardCheck className="h-4 w-4" /> },
      { label: "外派确认", href: "/admin/dispatch-confirm", icon: <UserCheck className="h-4 w-4" /> },
      { label: "离校任务清单", href: "/student/departure-tasks", icon: <ClipboardList className="h-4 w-4" /> },
      { label: "学籍异动办理", href: "/student/enrollment-change", icon: <UserCog className="h-4 w-4" /> },
      { label: "学籍异动审核", href: "/admin/enrollment-review", icon: <ClipboardCheck className="h-4 w-4" /> },
    ],
  },
  // 派出中阶段
  {
    label: "派出中",
    icon: <Plane className="h-4 w-4" />,
    badge: "阶段2",
    badgeColor: "bg-amber-500",
    children: [
      { label: "派出材料提交", href: "/student/dispatch-materials", icon: <FileText className="h-4 w-4" /> },
      { label: "在外情况填写", href: "/student/overseas-status", icon: <MapPin className="h-4 w-4" /> },
      { label: "学习报告提交", href: "/student/learning-reports", icon: <BookOpen className="h-4 w-4" /> },
      { label: "派出材料审核", href: "/admin/dispatch-review", icon: <ClipboardCheck className="h-4 w-4" /> },
      { label: "在外情况查看", href: "/admin/overseas-status", icon: <Globe className="h-4 w-4" /> },
      { label: "学习报告查看", href: "/admin/reports-view", icon: <Eye className="h-4 w-4" /> },
    ],
  },
  // 派出后阶段
  {
    label: "派出后",
    icon: <Home className="h-4 w-4" />,
    badge: "阶段3",
    badgeColor: "bg-green-500",
    children: [
      { label: "回国线上报到", href: "/student/return-register", icon: <LogIn className="h-4 w-4" /> },
      { label: "总结报告提交", href: "/student/summary-report", icon: <FileText className="h-4 w-4" /> },
      { label: "恢复学籍办理", href: "/student/enrollment-restore", icon: <RefreshCcw className="h-4 w-4" /> },
      { label: "成绩与学分兑换", href: "/student/grades-credit", icon: <Award className="h-4 w-4" /> },
      { label: "电子归档", href: "/student/archive", icon: <Archive className="h-4 w-4" /> },
      { label: "回国报到审核", href: "/admin/return-review", icon: <ClipboardCheck className="h-4 w-4" /> },
      { label: "学籍恢复审核", href: "/admin/restore-review", icon: <RefreshCcw className="h-4 w-4" /> },
      { label: "成绩与学分审核", href: "/admin/grades-credit-review", icon: <GraduationCap className="h-4 w-4" /> },
      { label: "归档材料管理", href: "/admin/archive-manage", icon: <FolderOpen className="h-4 w-4" /> },
    ],
  },
  // 系统管理
  {
    label: "系统管理",
    icon: <Shield className="h-4 w-4" />,
    children: [
      { label: "用户管理", href: "/system/users", icon: <Users className="h-4 w-4" /> },
      { label: "角色权限管理", href: "/system/roles", icon: <KeyRound className="h-4 w-4" /> },
      { label: "部门管理", href: "/system/departments", icon: <Network className="h-4 w-4" /> },
      { label: "数据字典", href: "/system/dictionary", icon: <BookMarked className="h-4 w-4" /> },
      { label: "登录日志", href: "/system/login-logs", icon: <LogIn className="h-4 w-4" /> },
      { label: "操作日志", href: "/system/operation-logs", icon: <History className="h-4 w-4" /> },
      { label: "系统配置", href: "/system/settings", icon: <Cog className="h-4 w-4" /> },
      { label: "通知公告", href: "/system/notices", icon: <Bell className="h-4 w-4" /> },
    ],
  },
]

function MenuItemComponent({ 
  item, 
  depth = 0, 
  currentPath 
}: { 
  item: MenuItemType
  depth?: number
  currentPath: string 
}) {
  const [isOpen, setIsOpen] = useState(true)
  const hasChildren = item.children && item.children.length > 0
  const isActive = item.href === currentPath
  const isChildActive = item.children?.some(child => child.href === currentPath)

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-colors",
            "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
            isChildActive && "bg-sidebar-accent text-sidebar-foreground"
          )}
        >
          {item.icon}
          <span className="flex-1 text-left font-medium">{item.label}</span>
          {item.badge && (
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded text-white", item.badgeColor)}>
              {item.badge}
            </span>
          )}
          {isOpen ? <ChevronDown className="h-4 w-4 opacity-50" /> : <ChevronRight className="h-4 w-4 opacity-50" />}
        </button>
        {isOpen && (
          <div className="ml-3 mt-1 space-y-0.5 border-l border-sidebar-border pl-3">
            {item.children!.map((child, index) => (
              <MenuItemComponent key={index} item={child} depth={depth + 1} currentPath={currentPath} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.href || "#"}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
      )}
    >
      {item.icon}
      <span>{item.label}</span>
    </Link>
  )
}

export function AppSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <aside className="w-56 bg-sidebar text-sidebar-foreground flex flex-col h-screen fixed left-0 top-0 z-40">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-sm text-sidebar-foreground">国际化项目管理平台</h1>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="animate-pulse space-y-2">
            {[1,2,3,4,5,6,7].map(i => (
              <div key={i} className="h-10 bg-sidebar-accent/50 rounded-lg" />
            ))}
          </div>
        </nav>
      </aside>
    )
  }

  return (
    <aside className="w-56 bg-sidebar text-sidebar-foreground flex flex-col h-screen fixed left-0 top-0 z-40">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-sm text-sidebar-foreground">国际化项目管理平台</h1>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1 pb-24">
        {menuItems.map((item, index) => (
          <MenuItemComponent key={index} item={item} currentPath={pathname} />
        ))}
        
        {/* 流程阶段说明 - 放在菜单底部，跟随滚动 */}
        <div className="mt-4 pt-3 border-t border-sidebar-border">
          <div className="text-[10px] font-medium text-sidebar-foreground/60 mb-2 px-3">流程阶段说明</div>
          <div className="space-y-1 px-3">
            <div className="flex items-center gap-2 text-[10px] text-sidebar-foreground/50">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>阶段1 派出前</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-sidebar-foreground/50">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>阶段2 派出中</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-sidebar-foreground/50">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span>阶段3 派出后</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}
