import { SealCheck } from "phosphor-strokes-icons";

import { Button } from "@/components/ui/button";
import { ArmenifyIcon, buttonSizeToArmenifyIconSize } from "@/components/ui/icon";
import { TokenPreview } from "@/components/foundations/token-preview";
import { Typography } from "@/components/ui/typography";

export function App() {
  const mdIcon = (
    <ArmenifyIcon icon={SealCheck} size={buttonSizeToArmenifyIconSize.md} strokeWeight="bold" />
  );

  return (
    <main className="min-h-dvh bg-semantic-bg-ntrl-primary text-semantic-text-ntrl-primary">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-8">
        <section className="grid gap-5">
          <div className="grid gap-1">
            <h1 className="text-3xl font-medium">Armenify UI Kit</h1>
            <Typography variant="sm" tone="muted" className="max-w-2xl">
              React primitives backed by Armenify tokens and Tailwind v4.
            </Typography>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button iconLeft={mdIcon} iconRight={mdIcon}>
              Primary
            </Button>
            <Button variant="secondary" iconLeft={mdIcon} iconRight={mdIcon}>
              Secondary
            </Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="outlined">Outlined</Button>
            <Button disabled iconLeft={mdIcon} iconRight={mdIcon}>
              Disabled
            </Button>
          </div>
        </section>

        <TokenPreview />
      </div>
    </main>
  );
}
