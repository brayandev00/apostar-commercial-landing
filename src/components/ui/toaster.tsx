"use client"

import { useToast } from "@/hooks/use-toast"
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast"
import { CheckCircle } from "lucide-react"

export function Toaster() {
    const { toasts } = useToast()

    return (
        <ToastProvider>
            {toasts.map(function ({ id, title, description, action, variant, ...props }) {
                return (
                    <Toast key={id} variant={variant} duration={props.duration || 5000} {...props}>
                        <div className="grid gap-1">
                            {variant === "success" && (
                                <div className="flex items-center gap-2 mb-1">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    {title && <ToastTitle>{title}</ToastTitle>}
                                </div>
                            )}
                            {variant !== "success" && title && <ToastTitle>{title}</ToastTitle>}
                            {description && (
                                <ToastDescription>{description}</ToastDescription>
                            )}
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                )
            })}
            <ToastViewport />
        </ToastProvider>
    )
}
