import type { ComponentProps, ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import logo from "@next-hat/ui/images/logo3.png"
import { cn } from "@next-hat/ui/lib/utils"

import "@next-hat/ui/styles/public-header.css"

export function PublicHeader({
  brand,
  children,
  position = "sticky",
}: {
  brand?: ReactNode
  children: ReactNode
  position?: "sticky" | "fixed"
}) {
  return (
    <header
      className={cn(
        "next-hat-public-header inset-x-0 top-0 z-40 h-16 border-b border-border/70 bg-background/75 text-sm font-normal leading-5 tracking-normal text-foreground backdrop-blur-xl",
        position === "fixed" ? "fixed" : "sticky"
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        {brand ?? <PublicHeaderBrand />}
        <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-4">
          {children}
        </div>
      </div>
    </header>
  )
}

export function PublicHeaderBrand({
  homeHref = "/",
  section,
}: {
  homeHref?: string
  section?: string
}) {
  return (
    <Link
      href={homeHref}
      aria-label={section ? `Next Hat ${section}` : "Next Hat home"}
      className="flex shrink-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-ring"
    >
      <span className="flex items-center gap-2">
        <Image
          src={logo}
          alt=""
          width={32}
          height={32}
          priority
          className="size-8 rounded-full"
        />
        <span className="text-sm font-semibold leading-5 tracking-normal">
          Next Hat
        </span>
      </span>
      {section && (
        <span className="hidden items-center gap-3 text-sm font-normal leading-5 sm:flex">
          <span aria-hidden="true" className="text-muted-foreground/45">
            /
          </span>
          <span className="text-muted-foreground">{section}</span>
        </span>
      )}
    </Link>
  )
}

export function PublicHeaderNavigation({
  className,
  ...props
}: Omit<ComponentProps<"nav">, "key">) {
  return (
    <nav
      className={cn("hidden items-center gap-6 lg:flex", className)}
      {...props}
    />
  )
}

export function PublicHeaderLink({
  active,
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "key"> & { active?: boolean }) {
  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={cn(
        "whitespace-nowrap py-3 text-sm font-normal leading-5 tracking-normal text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring aria-[current=page]:text-foreground aria-[current=page]:underline aria-[current=page]:underline-offset-8",
        className
      )}
      {...props}
    />
  )
}
