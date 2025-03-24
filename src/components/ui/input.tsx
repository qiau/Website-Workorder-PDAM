import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "auth" | "dashboard" | "clear";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      variant = "dashboard",
      label,
      error,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-base font-medium text-primary-500 mb-1"
          >
            {label}
          </label>
        )}

        <input
          id={inputId}
          type={type}
          className={cn(
            "w-full",
            {
              "px-3 bg-transparent placeholder-grey-500 outline-none":
                variant === "auth",
              "h-10 px-2 border-2 border-grey-100 rounded-lg focus:ring-2 outline-none focus:ring-primary-400 focus":
                variant === "dashboard",
              "border-transparent bg-transparent focus:ring-0 focus:outline-none":
                variant === "clear",
              "border-red-500 focus:ring-red-500": error,
            },
            className
          )}
          ref={ref}
          {...props}
        />

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
