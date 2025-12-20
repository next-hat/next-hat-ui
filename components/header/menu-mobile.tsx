import React from "react"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@next-hat/ui/components/ui/accordion"

import type { NavItem } from "."

export type NavMenuMobileProps = {
  visible: boolean
  items: NavItem[]
  toggleMenu: () => void
  menuChildren?: (props: NavMenuMobileProps) => React.ReactNode
}

export function NavMenuMobile(props: NavMenuMobileProps) {
  if (!props.visible) {
    return null
  }
  return (
    <div className="sm:hidden fixed top-15 border-t border-border h-full right-0 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/70 w-full shadow-[0_1px_2px_0_rgba(0,0,0,0.1)] z-99">
      <div className="flex items-center p-4 flex-col">
        {props.menuChildren && props.menuChildren(props)}
        {props.items.map((item, i) => {
          const href = item.href || "/404"
          if (item.children) {
            return (
              <Accordion
                key={`${href}-${i}`}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value="item-1" className="border-0">
                  <AccordionTrigger className="w-full flex border-b p-2 text-sm hover:no-underline font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col">
                    {(item.children || []).map((child) => {
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={props.toggleMenu}
                          target={child.target}
                          className="w-full p-2 font-medium text-sm text-gray-500"
                        >
                          <span>{child.title}</span>
                        </Link>
                      )
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          }
          return (
            <Link
              key={i}
              href={href}
              onClick={props.toggleMenu}
              target={item.target}
              className="w-full border-b p-2 group inline-flex h-10 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50"
            >
              <span>{item.title}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
