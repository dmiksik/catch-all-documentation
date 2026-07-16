import { i18n } from '@/lib/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';

import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { includeCzech, logo } from './shared';

export const i18nUI = defineI18nUI(i18n, {
  en: {
    displayName: 'English',
  },
  ...(includeCzech && {
    cz: {
      displayName: 'Čeština',
    },
  }),
});

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // Široké logo (wordmark "Data Catch-all Repository") jako jediný obsah
      // záhlaví – shodně se samostatnou instancí nrp-catch-all-docs.
      // eslint-disable-next-line @next/next/no-img-element
      title: (<img src={logo} alt="Data Catch-all Repository" width={140} height={52} />),
      url: '/',
    },
    themeSwitch: {
      enabled: false,
    },
  };
}
