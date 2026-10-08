# next-hat-ui

## Theme switcher

`ThemeSwitcher` uses the shared shadcn Button and DropdownMenu with Light, Dark,
and System choices. Mount it inside `ThemeProvider`, which defaults to System.
The provider persists the preference in a one-year `theme` cookie (`Path=/`,
`SameSite=Lax`, and `Secure` on HTTPS). `storageKey` customizes both the cookie
name and the next-themes localStorage key.

In a Next.js server layout, pass the validated request cookie to the provider
and render the explicit preference on `<html>`:

```tsx
import { cookies } from "next/headers"
import { ThemeProvider } from "@next-hat/ui/components/theme-provider"
import { ThemeSwitcher } from "@next-hat/ui/components/theme-switcher"
import { parseTheme, THEME_COOKIE_NAME } from "@next-hat/ui/lib/theme"

export default async function RootLayout({ children }) {
  const theme = parseTheme((await cookies()).get(THEME_COOKIE_NAME)?.value)

  return (
    <html
      lang="en"
      className={theme === "system" ? undefined : theme}
      style={{ colorScheme: theme === "system" ? "light dark" : theme }}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider defaultTheme={theme}>
          <ThemeSwitcher />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

The cookie is authoritative on each full load; localStorage is seeded before
next-themes initializes. System remains a preference, not a saved light/dark
value, so it follows operating-system changes. Its resolved color is available
only in the browser; next-themes applies it before hydration. Pass `nonce` to
the provider when the application uses a nonce-based Content Security Policy.
