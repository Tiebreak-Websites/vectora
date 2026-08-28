/// <reference types="astro/client" />

interface Window {
  legalData?: Record<string, unknown>;
  legalDataReady?: Promise<Record<string, unknown>>;
  __resolveLegalData?: (data: Record<string, unknown>) => void;
}
