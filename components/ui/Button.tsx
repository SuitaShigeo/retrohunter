import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "md", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none",
                    {
                        // Primary CTA - Japan Red with neon glow
                        "bg-primary text-primary-foreground hover:brightness-110 hover:shadow-[0_0_30px_rgba(255,0,51,0.5)]":
                            variant === "default",
                        // Secondary - for Details buttons, subtle style
                        "bg-white/10 text-foreground border border-white/20 hover:bg-white/20 hover:border-primary/50":
                            variant === "secondary",
                        // Outline - border only
                        "border border-white/10 bg-transparent text-foreground hover:bg-white/10 hover:border-white/30":
                            variant === "outline",
                        // Ghost - minimal, hover only
                        "text-gray-400 hover:text-foreground hover:bg-white/5":
                            variant === "ghost",
                        "h-8 px-4 text-xs": size === "sm",
                        "h-10 px-6 text-sm": size === "md",
                        "h-14 px-8 text-lg": size === "lg",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
