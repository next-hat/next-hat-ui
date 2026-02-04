import Link from "next/link"

export type FooterLinkProps = {
  title: string
  href: string
  target?: React.HTMLAttributeAnchorTarget
}

export function FooterLink(props: FooterLinkProps) {
  return (
    <li>
      <Link
        className="text-muted-foreground hover:text-foreground transition-colors"
        href={props.href}
        target={props.target}
      >
        {props.title}
      </Link>
    </li>
  )
}
