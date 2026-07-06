import { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'navy' | 'outline' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-coral text-white hover:bg-coral-d active:scale-[0.97]',
  navy: 'bg-navy text-white hover:brightness-125 active:scale-[0.97]',
  outline: 'bg-card border-2 border-navy text-navy hover:bg-surface active:scale-[0.97]',
  ghost: 'bg-surface text-coral hover:bg-coral-l active:scale-[0.97]',
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-6 py-3 text-body font-medium transition-all duration-150 min-h-[44px] min-w-[44px] disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
