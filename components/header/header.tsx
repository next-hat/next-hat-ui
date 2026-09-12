"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@next-hat/ui/components/ui/button"
import { Sheet, SheetTrigger } from "@next-hat/ui/components/ui/sheet"
import { FiMenu } from "react-icons/fi"

import type { NavItem } from "."
import { NavMenuDesktop } from "./menu-desktop"
import { NavMenuMobile, type NavMenuMobileProps } from "./menu-mobile"

export function Header({
  title = "Next Hat",
  items,
  menuChildren,
  menuMobileChildren,
  variant = "default",
  homeHref = "/",
  desktopNavigationStart,
}: {
  title?: string
  items: NavItem[]
  menuChildren?: React.ReactNode
  menuMobileChildren?: (props: NavMenuMobileProps) => React.ReactNode
  variant?: "default" | "console"
  homeHref?: string
  desktopNavigationStart?: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const panelId = React.useId()
  const toggleMenu = React.useCallback(() => setIsMenuOpen((prev) => !prev), [])
  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <header className="fixed top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/70">
        <div className="flex h-15 items-center justify-between gap-2 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link href={homeHref} className="flex shrink-0 items-center gap-2">
              <Image
                src="/logo3.png"
                className="rounded-full shadow"
                priority
                alt="Next Hat Logo"
                width={32}
                height={32}
              />
              <b className="text-sm">{title}</b>
            </Link>
            <div
              className={
                variant === "console"
                  ? "hidden min-w-0 items-center gap-3 xl:flex"
                  : "hidden sm:flex"
              }
            >
              {desktopNavigationStart}
              <NavMenuDesktop items={items} />
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {menuChildren}
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="lg"
                className={
                  variant === "console"
                    ? "size-11 px-0 xl:hidden"
                    : "size-11 px-0 sm:hidden"
                }
                aria-label="Open navigation"
                aria-expanded={isMenuOpen}
                aria-controls={panelId}
              >
                <FiMenu aria-hidden="true" />
              </Button>
            </SheetTrigger>
          </div>
        </div>
      </header>
      <NavMenuMobile
        items={items}
        visible={isMenuOpen}
        toggleMenu={toggleMenu}
        menuChildren={menuMobileChildren}
        panelId={panelId}
      />
    </Sheet>
  )
}
