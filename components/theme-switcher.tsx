"use client"

import { Button } from "@next-hat/ui/components/ui/button"
import { useTheme } from "next-themes"
import { FiMoon, FiSun } from "react-icons/fi"

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      className="h-12 w-12"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <FiSun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <FiMoon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
