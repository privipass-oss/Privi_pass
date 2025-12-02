import { memo, forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold shadow-lg shadow-amber-500/20',
  secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/10',
  danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30',
  ghost: 'hover:bg-white/5 text-zinc-400 hover:text-white',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2.5',
};

export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  disabled,
  className = '',
  ...props
}, ref) => (
  <button
    ref={ref}
    className={`
      inline-flex items-center justify-center rounded-xl font-medium
      transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
      ${VARIANTS[variant]} ${SIZES[size]} ${className}
    `.trim()}
    disabled={disabled || loading}
    {...props}
  >
    {loading ? <Loader2 size={18} className="animate-spin" /> : icon}
    {children}
  </button>
)));

Button.displayName = 'Button';
