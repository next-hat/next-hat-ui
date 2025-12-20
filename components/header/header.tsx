"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"

import type { NavItem } from "."
import { NavMenuDesktop } from "./menu-desktop"
import { NavMenuMobile, type NavMenuMobileProps } from "./menu-mobile"

export function Header({
  items,
  menuChildren: headerMenuChildren,
  menuMobileChildren: headerMobileMenuChildren,
}: {
  items: NavItem[]
  menuChildren?: React.ReactNode
  menuMobileChildren?: (props: NavMenuMobileProps) => React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [setIsMenuOpen])

  return (
    <>
      <div className="relative flex z-20">
        <nav className="fixed z-50 w-full top-0 border-b border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/70">
          <div className="px-6">
            <div className="flex h-15 items-center justify-between">
              <div className="flex flex-row items-center">
                <Link href="/" className="flex items-center min-w-30">
                  <div className="mr-2 w-8">
                    <Image
                      src="/logo3.png"
                      className="rounded-full shadow"
                      priority
                      alt="Next Hat Logo"
                      width={32}
                      height={32}
                    />
                  </div>
                  <b className="flex-auto text-[14px]">Next Hat</b>
                </Link>
                <div className="flex-row sm:flex hidden">
                  <NavMenuDesktop items={items} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                {headerMenuChildren}
                <button
                  onClick={toggleMenu}
                  className="flex w-6 h-6 sm:hidden sm:w-0 sm:h-0"
                >
                  <Menu
                    color="black"
                    className="transition-transform"
                    style={{
                      transform: isMenuOpen ? "rotate(90deg)" : undefined,
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <NavMenuMobile
        items={items}
        visible={isMenuOpen}
        toggleMenu={toggleMenu}
        menuChildren={headerMobileMenuChildren}
      />
    </>
  )
}
