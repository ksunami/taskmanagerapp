import React, {
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
};

type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children' | 'href'> & {
    asLinkHref?: undefined;
  };

type AsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href'> & {
    asLinkHref: string;
  };

export type ButtonProps = AsButton | AsLink;

const base =
  'inline-flex items-center justify-center rounded-xl font-medium transition ' +
  'focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
  'disabled:opacity-60 disabled:pointer-events-none';

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

const variants: Record<Variant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400',
  ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-600',
};

export default function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    className,
    fullWidth,
    children,    
  } = props as CommonProps;

  const cn = [
    'tm-btn',
    `tm-btn--${variant}`,
    base,
    sizes[size],
    variants[variant],
    fullWidth ? 'btn-block' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if ('asLinkHref' in props) {    
    const {
      asLinkHref,
      variant: _v,
      size: _s,
      isLoading: _il,
      leftIcon: _li,
      rightIcon: _ri,
      className: _cn,
      fullWidth: _fw,
      children: _ch,
      ...linkRest
    } = props as AsLink;

    return (
      <a
        href={asLinkHref}
        {...(linkRest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        className={cn}
        data-testid="styled-button"
      >
        {leftIcon ? <span className="mr-2">{leftIcon}</span> : null}
        <span>{children}</span>
        {rightIcon ? <span className="ml-2">{rightIcon}</span> : null}
      </a>
    );
  }

  
  const {
    variant: _v2,
    size: _s2,
    isLoading: _il2,
    leftIcon: _li2,
    rightIcon: _ri2,
    className: _cn2,
    fullWidth: _fw2,
    asLinkHref: _ahl,
    children: _ch2,
    ...buttonRest
  } = props as AsButton;

  return (
    <button
      {...(buttonRest as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={cn}
      aria-busy={isLoading}
      data-testid="styled-button"
    >
      {leftIcon ? <span className="mr-2">{leftIcon}</span> : null}
      <span>{children}</span>
      {rightIcon ? <span className="ml-2">{rightIcon}</span> : null}
    </button>
  );
}
