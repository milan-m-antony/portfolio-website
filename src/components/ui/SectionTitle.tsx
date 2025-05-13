import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
  subtitle?: string;
}

export default function SectionTitle({ children, className, subtitle, ...props }: SectionTitleProps) {
  return (
    <div className="mb-10 text-center"> {/* Changed mb-12 to mb-10 */}
      <h2
        className={cn('text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-foreground', className)}
        {...props}
      >
        {children}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto"> {/* Changed mt-4 to mt-3 */}
          {subtitle}
        </p>
      )}
    </div>
  );
}
