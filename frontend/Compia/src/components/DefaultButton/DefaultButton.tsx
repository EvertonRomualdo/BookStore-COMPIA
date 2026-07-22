import type { ButtonHTMLAttributes } from 'react';

type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function DefaultButton({
  children,
  className = '',
  ...props
}: DefaultButtonProps) {
  return (
    <button
      className={`p-3 bg-purple-600 text-white rounded-md cursor-pointer hover:bg-purple-700 transition-colors font-semibold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}