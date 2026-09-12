import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@next-hat/ui/components/ui/accordion"
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@next-hat/ui/components/ui/sheet"

import type { NavItem } from "."

export type NavMenuMobileProps = {
  visible: boolean
  items: NavItem[]
  toggleMenu: () => void
  panelId?: string
  menuChildren?: (props: NavMenuMobileProps) => React.ReactNode
}

export function NavMenuMobile(props: NavMenuMobileProps) {
  const pathname = usePathname()
  return (
    <SheetContent
      id={props.panelId}
      side="right"
      aria-describedby={undefined}
      className="flex h-dvh w-full max-w-sm flex-col gap-5 overflow-y-auto pb-8 [&>button]:size-11 [&>button]:flex [&>button]:items-center [&>button]:justify-center"
    >
      <SheetHeader>
        <SheetTitle>Navigation</SheetTitle>
      </SheetHeader>
      <nav aria-label="Main navigation" className="flex flex-col gap-1">
        {props.items.map((item) => {
          const href = item.href || "/404"
          if (item.children)
            return (
              <Accordion key={item.title} type="single" collapsible>
                <AccordionItem value={item.title} className="border-0">
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent className="flex flex-col">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        target={child.target}
                        onClick={props.toggleMenu}
                        aria-current={
                          pathname === child.href ||
                          pathname.startsWith(`${child.href}/`)
                            ? "page"
                            : undefined
                        }
                        className="flex min-h-11 items-center px-3 aria-[current=page]:font-semibold aria-[current=page]:underline"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          const active =
            item.active ??
            (pathname === href || pathname.startsWith(`${href}/`))
          return (
            <Link
              key={href}
              href={href}
              target={item.target}
              onClick={props.toggleMenu}
              aria-current={active ? "page" : undefined}
              className="flex min-h-11 items-center rounded-md px-3 text-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring aria-[current=page]:bg-accent aria-[current=page]:font-semibold aria-[current=page]:underline"
            >
              {item.title}
            </Link>
          )
        })}
      </nav>
      {props.menuChildren?.(props)}
    </SheetContent>
  )
}
