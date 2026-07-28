import type { ButtonHTMLAttributes } from 'react';

type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export function DefaultButton({
  children,
  className = '',
  variant = 'primary',
  ...props
}: DefaultButtonProps) {
  const baseStyles = "p-3 rounded-md cursor-pointer transition-colors font-semibold flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}