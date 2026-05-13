import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge treats unknown `text-*` aliases as one conflict group.
// Register our custom typography scale so semantic text colors don't get
// dropped when combined with classes like `text-font-size-lg`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "font-size-xxxs",
        "font-size-xxs",
        "font-size-xs",
        "font-size-sm",
        "font-size-base",
        "font-size-lg",
        "font-size-xl",
        "font-size-2xl",
        "font-size-3xl",
        "font-size-4xl",
        "font-size-5xl",
        "font-size-6xl",
        "font-size-7xl",
        "font-size-xxs-input",
        "font-size-xs-input",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
