import { toast } from "@next-hat/ui/components/ui/use-toast"

export function toastApiError(err: any) {
  toast({
    title: `Error ${err?.response?.status}`,
    variant: "destructive",
    description: (
      <pre className="mt-2 w-85 overflow-hidden">
        <code className="text-white text-sm text-wrap">
          {err?.response?.data?.msg || err.message}
        </code>
      </pre>
    ),
  })
}
