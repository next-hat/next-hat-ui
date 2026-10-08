"use client"

import * as React from "react"
import { THEME_COOKIE_NAME } from "@next-hat/ui/lib/theme"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

function ThemeCookieSync({ cookieName }: { cookieName: string }) {
  const { theme } = useTheme()

  React.useEffect(() => {
    if (!theme) return
    try {
      const secure = window.location.protocol === "https:" ? "; Secure" : ""
      document.cookie = `${encodeURIComponent(cookieName)}=${encodeURIComponent(theme)}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`
    } catch {
      // Theme switching still works when the browser blocks persistence.
    }
  }, [cookieName, theme])

  return null
}

export function ThemeProvider({
  children,
  enableSystem = true,
  defaultTheme = enableSystem ? "system" : "light",
  storageKey = THEME_COOKIE_NAME,
  nonce,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // next-themes reads localStorage before hydration. Seed it from the server's
  // cookie preference so an old local value cannot override the rendered theme.
  const key = JSON.stringify(storageKey)
  const initialize = `try{localStorage.setItem(${key},${JSON.stringify(defaultTheme)})}catch{try{localStorage.removeItem(${key})}catch{}}`

  return (
    <>
      <script
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: initialize.replace(/</g, "\\u003c"),
        }}
      />
      <NextThemesProvider
        attribute="class"
        enableSystem={enableSystem}
        disableTransitionOnChange
        {...props}
        defaultTheme={defaultTheme}
        storageKey={storageKey}
        nonce={nonce}
      >
        <ThemeCookieSync cookieName={storageKey} />
        {children}
      </NextThemesProvider>
    </>
  )
}
