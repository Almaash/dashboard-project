"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";


interface CheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  indeterminate?: boolean;
  checked?: boolean;
}

function Checkbox({ className, indeterminate, checked, ...props }: CheckboxProps) {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className="relative inline-flex items-center">
      <input
        ref={ref}
        type="checkbox"
        className="absolute opacity-0 w-0 h-0"
        checked={checked ?? false}
        readOnly
      />

      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(
          "peer border-input  data-[state=checked]:text-primary-foreground   focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20  aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-emerald-700 " : "bg-white ", // Add red color when checked
          className
        )}
        checked={indeterminate ? "indeterminate" : checked}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current transition-none"
        >
          {indeterminate ? <MinusIcon className="size-3.5" /> : <CheckIcon className="size-3.5" />}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    </div>
  );
}

export { Checkbox };
