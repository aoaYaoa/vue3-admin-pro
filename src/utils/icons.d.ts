import type { IconConfig } from './icons';

declare module '@/utils/icons' {
  export const menuIcons: Record<string, IconConfig>;
  export function getIconConfig(title: string): IconConfig;
} 