import { FooterElement, type FooterElementProps } from "./footer-element"

export function Footer({
  footerElements,
}: {
  footerElements?: FooterElementProps[]
}) {
  return (
    <footer className="bg-background px-8 shadow">
      {footerElements && (
        <div className="flex flex-col border-t sm:flex-row sm:justify-center sm:items-start pt-8 gap-8 mb-8">
          {footerElements.map((element) => (
            <FooterElement
              key={element.title}
              title={element.title}
              links={element.links}
            />
          ))}
        </div>
      )}
      <p className="text-sm border-t py-8 text-center text-[#606770]">
        &copy; {new Date().getFullYear()} Next Hat. All rights reserved.
      </p>
    </footer>
  )
}
