import { cn } from "@next-hat/ui/lib/utils"
import { FiLoader } from "react-icons/fi"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <FiLoader
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
