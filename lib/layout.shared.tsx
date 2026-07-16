import { i18n } from '@/lib/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';

import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { includeCzech } from './shared';

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
      // Anglický wordmark Data Catch-all Repository jako jediný obsah záhlaví.
      // eslint-disable-next-line @next/next/no-img-element
      title: (<img src="https://datarepo.eosc.cz/static/images/logo_en.svg" alt="Data Catch-all Repository" width={158} height={63} />),
      url: '/',
    },
    themeSwitch: {
      enabled: false,
    },
  };
}
