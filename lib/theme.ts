export const THEME_COOKIE_NAME = "theme"

export type Theme = "light" | "dark" | "system"

/** Only accept supported preferences from the request cookie. */
export function parseTheme(value: string | undefined): Theme {
  return value === "light" || value === "dark" ? value : "system"
}
