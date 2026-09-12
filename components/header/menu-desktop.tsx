import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@next-hat/ui/components/ui/navigation-menu"
import { cn } from "@next-hat/ui/lib/utils"

import type { NavItem } from "."

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, target, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          {...props}
          ref={ref}
          href={href || "/404"}
          target={target}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export type NavMenuDesktopProps = {
  items: NavItem[]
}

export function NavMenuDesktop({ items }: { items: NavItem[] }) {
  const pathname = usePathname()
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item, i) => {
          const href = item.href || "/404"
          if (item.children) {
            return (
              <NavigationMenuItem key={`${href}-${i}`}>
                <NavigationMenuTrigger className="bg-transparent">
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-100 lg:w-125 lg:grid-cols-[.75fr_1fr]">
                    {(item.children || []).map((child, i) => {
                      return (
                        <ListItem
                          key={i}
                          title={child.title}
                          href={child.href}
                          target={child.target}
                          aria-current={
                            pathname === child.href ||
                            pathname.startsWith(`${child.href}/`)
                              ? "page"
                              : undefined
                          }
                          className="aria-[current=page]:font-semibold aria-[current=page]:underline"
                        >
                          {child.description}
                        </ListItem>
                      )
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }
          return (
            <NavigationMenuItem className="bg-transparent" key={href}>
              <Link
                href={href}
                target={item.target}
                className={`${navigationMenuTriggerStyle()} bg-transparent aria-[current=page]:bg-accent aria-[current=page]:font-semibold aria-[current=page]:underline`}
                aria-current={
                  (item.active ??
                  (pathname === href || pathname.startsWith(`${href}/`)))
                    ? "page"
                    : undefined
                }
              >
                {item.title}
              </Link>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
