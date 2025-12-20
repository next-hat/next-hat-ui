export type NavItemChild = {
  title: string
  href: string
  target?: React.HTMLAttributeAnchorTarget
  description: string
}

export type NavItem = {
  title: string
  href?: string | null
  target?: React.HTMLAttributeAnchorTarget
  children?: NavItemChild[] | null
}

export { Header } from "./header"
