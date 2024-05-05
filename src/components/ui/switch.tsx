"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, checked, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(checked);

  const toggleChecked = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <SwitchPrimitives.Root
    
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50",
        isChecked ? "bg-slate-950" : "bg-slate-200",
        className
      )}
      onClick={toggleChecked}
      aria-checked={isChecked}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block rounded-full shadow-lg ring-0 transition-transform",
          "h-5 w-5",
          isChecked ? "translate-x-5" : "translate-x-0",
          isChecked ? "bg-white" : "bg-slate-950"
        )}
      />
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
