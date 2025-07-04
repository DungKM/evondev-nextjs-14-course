import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex outline-none h-12 rounded-md font-medium p-3 w-full text-sm border border-gray-200 focus:!border-primary transition-all dark:border-opacity-10 bg-white dark:bg-grayDarker min-h-20 reszize-none focus-primary",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
