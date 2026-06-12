import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { controlInteractiveTransitionClassName } from '../control-transition';
import {
  controlFocusedBaseClassName,
  controlFocusedOutlinedClassName,
  controlFocusedPrimaryClassName,
  controlFocusedSecondaryClassName,
  controlFocusedTertiaryClassName,
} from '../control-focus';

const buttonVariants = cva(
  [
    'relative inline-flex shrink-0 cursor-pointer items-center justify-center font-medium tracking-normal antialiased',
    controlInteractiveTransitionClassName,
    'focus-visible:outline-none',
    '[&[data-button-unchecked]]:opacity-[0.45] [&[data-story-state=unchecked]]:opacity-[0.45]',
    '[&[data-disabled]]:pointer-events-none [&[data-disabled]]:cursor-default',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-0 bg-components-controls-bg-secondary-default bg-[image:var(--gradient-brand-primary)] text-components-controls-text-primary shadow-control-shadow-outer',
          controlFocusedBaseClassName,
          controlFocusedPrimaryClassName,
          'hover:shadow-control-shadow-hover active:shadow-control-shadow-active',
          '[&[data-disabled]]:border-2 [&[data-disabled]]:border-components-controls-border-disabled [&[data-disabled]]:bg-[image:none] [&[data-disabled]]:bg-components-controls-bg-disabled [&[data-disabled]]:text-components-controls-text-disabled [&[data-disabled]]:shadow-control-shadow-outer',
        ],
        secondary: [
          'border-0 bg-[image:none] bg-components-controls-bg-secondary-default text-components-controls-text-secondary shadow-control-shadow-outer',
          controlFocusedBaseClassName,
          controlFocusedSecondaryClassName,
          'hover:bg-components-controls-bg-secondary-hover hover:shadow-control-shadow-hover',
          'active:bg-components-controls-bg-secondary-active active:shadow-control-shadow-active',
          '[&[data-disabled]]:bg-components-controls-bg-disabled [&[data-disabled]]:text-components-controls-text-disabled [&[data-disabled]]:shadow-control-shadow-outer',
        ],

        tertiary: [
          'border-0 bg-[image:none] bg-components-controls-bg-tertiary text-components-controls-text-tertiary shadow-control-shadow-outer',
          controlFocusedBaseClassName,
          controlFocusedTertiaryClassName,
          'hover:shadow-control-shadow-hover active:shadow-control-shadow-active',
          '[&[data-disabled]]:bg-components-controls-bg-disabled [&[data-disabled]]:text-components-controls-text-disabled [&[data-disabled]]:shadow-control-shadow-outer',
        ],

        outlined: [
          'border-2 border-solid border-components-controls-text-tertiary bg-[image:none] bg-components-controls-bg-outlined text-components-controls-text-outlined shadow-control-shadow-outer',
          controlFocusedBaseClassName,
          controlFocusedOutlinedClassName,
          'hover:shadow-control-shadow-hover active:shadow-control-shadow-active',
          '[&[data-disabled]]:border-components-controls-border-disabled [&[data-disabled]]:bg-components-controls-bg-disabled [&[data-disabled]]:text-components-controls-text-disabled [&[data-disabled]]:shadow-none',
        ],
      },
      size: {
        xs: 'min-h-9 gap-1.5 rounded-border-md px-4.5 py-2.5 text-font-size-sm leading-[var(--font-font-height-sm)]',
        sm: 'min-h-10.5 gap-2 rounded-border-md px-6 py-2.5 text-font-size-base leading-[var(--font-font-height-base)]',
        md: 'min-h-[2.875rem] gap-3 rounded-border-lg px-10 py-3 text-font-size-lg leading-[var(--font-font-height-lg)]',
        lg: 'min-h-12 gap-2.5 rounded-border-md px-8 py-3 text-font-size-xl leading-[var(--font-font-height-xl)]',
        xl: 'min-h-[3.25rem] gap-3.5 rounded-border-x-lg px-12 py-3.5 text-font-size-xl leading-[var(--font-font-height-xl)]',
      },
      bainsley: {
        true: 'font-serif',
        false: 'font-sans',
      },
      zeroCorner: {
        true: '!rounded-none',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      bainsley: false,
      zeroCorner: false,
    },
  },
);

export type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>['variant']
>;
export type ButtonSize = NonNullable<
  VariantProps<typeof buttonVariants>['size']
>;

const buttonPressedClassName: Record<ButtonVariant, string> = {
  primary: 'shadow-control-shadow-pressed',
  secondary:
    'bg-components-controls-bg-secondary-pressed shadow-control-shadow-pressed',
  tertiary: 'shadow-control-shadow-pressed',
  outlined: 'shadow-control-shadow-pressed',
};

type SharedButtonLayoutProps = VariantProps<typeof buttonVariants> & {
  /** Visual unchecked state, for example for toggle-like controls. */
  unchecked?: boolean;
  pressed?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export type ButtonAsButtonProps = SharedButtonLayoutProps &
  Omit<
    React.ComponentPropsWithoutRef<'button'>,
    keyof SharedButtonLayoutProps | 'href'
  > & {
    href?: undefined;
  };

export type ButtonAsAnchorProps = SharedButtonLayoutProps &
  Omit<
    React.ComponentPropsWithoutRef<'a'>,
    keyof SharedButtonLayoutProps | 'href'
  > & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

function isButtonLinkProps(props: ButtonProps): props is ButtonAsAnchorProps {
  return typeof props.href === 'string' && props.href.length > 0;
}

type ButtonContentProps = {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
};

function ButtonContent({ iconLeft, iconRight, children }: ButtonContentProps) {
  return (
    <>
      {iconLeft != null ? (
        <span className='inline-flex shrink-0 items-center justify-center'>
          {iconLeft}
        </span>
      ) : null}
      {children != null && children !== false ? (
        <span className='inline-flex shrink-0 whitespace-nowrap'>
          {children}
        </span>
      ) : null}
      {iconRight != null ? (
        <span className='inline-flex shrink-0 items-center justify-center'>
          {iconRight}
        </span>
      ) : null}
    </>
  );
}

function Button(props: ButtonProps) {
  if (isButtonLinkProps(props)) {
    const {
      href,
      onClick,
      className,
      variant,
      size,
      bainsley = false,
      zeroCorner = false,
      unchecked,
      pressed,
      disabled,
      iconLeft,
      iconRight,
      children,
      type: _omitType,
      ...anchorRest
    } = props;

    const dataVariant = variant ?? 'primary';
    const pressedClass =
      Boolean(pressed) && !disabled
        ? buttonPressedClassName[dataVariant]
        : undefined;
    const mergedClassName = cn(
      buttonVariants({ variant, size, bainsley, zeroCorner }),
      pressedClass,
      className,
    );
    const dataDisabled = disabled ? '' : undefined;

    const common = {
      'data-slot': 'button' as const,
      'data-button-variant': dataVariant,
      'data-button-unchecked': unchecked ? ('' as const) : undefined,
      'data-button-pressed':
        Boolean(pressed) && !disabled ? ('' as const) : undefined,
      'aria-pressed': pressed === undefined ? undefined : pressed,
      'data-disabled': dataDisabled,
      className: mergedClassName,
    };

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    return (
      <a
        {...common}
        {...anchorRest}
        href={href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={onClick != null || disabled ? handleClick : undefined}
      >
        <ButtonContent iconLeft={iconLeft} iconRight={iconRight}>
          {children}
        </ButtonContent>
      </a>
    );
  }

  const {
    className,
    variant,
    size,
    bainsley = false,
    zeroCorner = false,
    type = 'button',
    unchecked,
    pressed,
    disabled,
    iconLeft,
    iconRight,
    children,
    href: _omitHref,
    ...buttonRest
  } = props;

  const dataVariant = variant ?? 'primary';
  const pressedClass =
    Boolean(pressed) && !disabled
      ? buttonPressedClassName[dataVariant]
      : undefined;
  const mergedClassName = cn(
    buttonVariants({ variant, size, bainsley, zeroCorner }),
    pressedClass,
    className,
  );
  const dataDisabled = disabled ? '' : undefined;

  const common = {
    'data-slot': 'button' as const,
    'data-button-variant': dataVariant,
    'data-button-unchecked': unchecked ? ('' as const) : undefined,
    'data-button-pressed':
      Boolean(pressed) && !disabled ? ('' as const) : undefined,
    'aria-pressed': pressed === undefined ? undefined : pressed,
    'data-disabled': dataDisabled,
    className: mergedClassName,
  };

  return (
    <button {...common} {...buttonRest} type={type} disabled={disabled}>
      <ButtonContent iconLeft={iconLeft} iconRight={iconRight}>
        {children}
      </ButtonContent>
    </button>
  );
}

export { Button, buttonVariants };
