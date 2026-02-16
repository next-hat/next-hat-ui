"use client"

import { useTheme } from "next-themes"
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiLoader,
  FiXOctagon,
} from "react-icons/fi"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <FiCheckCircle className="h-4 w-4" />,
        info: <FiInfo className="h-4 w-4" />,
        warning: <FiAlertTriangle className="h-4 w-4" />,
        error: <FiXOctagon className="h-4 w-4" />,
        loading: <FiLoader className="h-4 w-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
