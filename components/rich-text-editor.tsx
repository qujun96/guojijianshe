"use client"

import { useRef, useEffect, useCallback } from "react"
import { Bold, Italic, Underline, List, ListOrdered, Highlighter, Eraser } from "lucide-react"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
  minHeight?: number
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
  minHeight = 200,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  // 仅在外部值与编辑器内容不一致时同步，避免光标跳动
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const exec = useCallback(
    (command: string, arg?: string) => {
      editorRef.current?.focus()
      document.execCommand(command, false, arg)
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML)
      }
    },
    [onChange],
  )

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const tools = [
    { icon: Bold, label: "加粗", action: () => exec("bold") },
    { icon: Italic, label: "斜体", action: () => exec("italic") },
    { icon: Underline, label: "下划线", action: () => exec("underline") },
    { icon: Highlighter, label: "标红", action: () => exec("foreColor", "#dc2626") },
    { icon: List, label: "无序列表", action: () => exec("insertUnorderedList") },
    { icon: ListOrdered, label: "有序列表", action: () => exec("insertOrderedList") },
    { icon: Eraser, label: "清除格式", action: () => exec("removeFormat") },
  ]

  const isEmpty = !value || value === "<br>" || value === "<div><br></div>"

  return (
    <div className={cn("rounded-md border border-input bg-background", className)}>
      <div className="flex flex-wrap items-center gap-1 border-b border-input px-2 py-1.5">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <button
              key={tool.label}
              type="button"
              title={tool.label}
              onMouseDown={(e) => {
                e.preventDefault()
                tool.action()
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </button>
          )
        })}
        <span className="ml-1 text-xs text-muted-foreground">
          选中文字后点击「标红」可高亮学习课程模块
        </span>
      </div>
      <div className="relative">
        {isEmpty && placeholder && (
          <div className="pointer-events-none absolute left-3 top-3 text-sm text-muted-foreground whitespace-pre-wrap">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          style={{ minHeight }}
          className="prose-sm max-w-none px-3 py-3 text-sm leading-relaxed outline-none [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
        />
      </div>
    </div>
  )
}
