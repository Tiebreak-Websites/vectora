/// <reference types="astro/client" />

interface Window {
  legalData?: Record<string, unknown>;
  legalDataReady?: Promise<Record<string, unknown>>;
  __resolveLegalData?: (data: Record<string, unknown>) => void;
}

declare module "@tiebreak/api/utility/plexop.js" {
  export function getLegalData(
    brand?: string,
    lang?: string,
  ): Promise<Record<string, unknown>>;

  export function getLiveRates(symbols: string[]): Promise<unknown>;
}
