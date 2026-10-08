"use client"

import type { ComponentProps } from "react"
import { Button } from "@next-hat/ui/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@next-hat/ui/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeSwitcher({
  className,
  variant = "outline",
  size = "icon",
}: Pick<ComponentProps<typeof Button>, "className" | "variant" | "size">) {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          className={className}
          variant={variant}
          size={size}
          aria-label="Toggle theme"
        >
          <Sun aria-hidden="true" className="dark:hidden" />
          <Moon aria-hidden="true" className="hidden dark:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
