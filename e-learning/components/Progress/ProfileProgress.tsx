"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const CircleProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      `relative h-36 w-36 overflow-hidden rounded-full flex justify-center items-center`,
      className
    )}
    {...props}
    style={{ background: `radial-gradient(closest-side, white 75%, transparent 75% 100%), conic-gradient(#32de84 ${(value || 0)}%, rgb(192, 192, 192, 0.4) 0)` }}
  >
    <div className="font-semibold text-3xl">{`${(value || 0)}%`}</div>

  </ProgressPrimitive.Root>
))

export default CircleProgress