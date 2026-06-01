import React from 'react';
import Link from 'next/link';
import { Mail, ExternalLink, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlgoLinkProps {
  url: string;
  label?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  iconClassName?: string;
  hideIcon?: boolean;
}

export const AlgoLink: React.FC<AlgoLinkProps> = ({
  url: initialUrl,
  label,
  className,
  children,
  iconClassName,
  hideIcon = false
}) => {
  // Map old /complexity routes to new guides route
  const url = initialUrl === '/complexity' ? '/guides/time-complexity' : initialUrl;

  const content = children || label || url || 'Link';

  // Guard against missing URL
  if (!url) {
    return <span className={className}>{content}</span>;
  }

  const safeUrl = url.trim();
  // Determine link type
  const isMail = safeUrl.startsWith('mailto:');
  const isHash = safeUrl.startsWith('#');
  const isExternal = safeUrl.startsWith('http') || safeUrl.startsWith('https') || safeUrl.startsWith('//') || safeUrl.startsWith('/problem');

  // Icon Size and Style
  const iconBaseClass = cn("inline-block ml-1.5 w-4 h-4", iconClassName);

  if (isMail) {
    return (
      <a
        href={url}
        className={cn("inline-flex items-center hover:underline text-primary", className)}
      >
        {content}
        {!hideIcon && <Mail className={iconBaseClass} />}
      </a>
    );
  }

  if (isExternal) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("inline-flex items-center hover:underline text-primary", className)}
      >
        {content}
        {!hideIcon && <ExternalLink className={iconBaseClass} />}
      </a>
    );
  }

  if (isHash) {
    return (
      <a
        href={url}
        className={cn("inline-flex items-center hover:underline text-primary", className)}
      >
        {content}
        {!hideIcon && <ArrowRight className={iconBaseClass} />}
      </a>
    );
  }

  // Internal Link
  const isComplexityLink = url === '/guides/time-complexity';
  const target = isComplexityLink ? "_blank" : undefined;

  return (
    <Link
      href={url}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={cn("inline-flex items-center hover:underline text-primary", className)}
    >
      {content}
      {!hideIcon && (target === "_blank" ? <ExternalLink className={iconBaseClass} /> : <ArrowRight className={iconBaseClass} />)}
    </Link>
  );
};
