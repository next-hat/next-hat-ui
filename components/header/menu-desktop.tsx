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
>(({ className, title, children, href, target }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
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
                          style={
                            pathname === child.href ? { color: "orange" } : {}
                          }
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
                className={`${navigationMenuTriggerStyle()} bg-transparent`}
                style={pathname === href ? { color: "orange" } : {}}
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
