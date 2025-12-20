import { FooterLink, type FooterLinkProps } from "./footer-link"

export type FooterElementProps = {
  title: string
  links: FooterLinkProps[]
}

export function FooterElement(props: FooterElementProps) {
  return (
    <div className="w-full mb-4">
      <h5 className="font-bold">{props.title}</h5>
      <ul>
        {props?.links?.map((link) => (
          <FooterLink
            key={link.href}
            title={link.title}
            href={link.href}
            target={link.target}
          />
        ))}
      </ul>
    </div>
  )
}
