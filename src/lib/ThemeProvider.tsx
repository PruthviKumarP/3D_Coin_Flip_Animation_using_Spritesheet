'use client';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ReactNode } from 'react';

const theme = {
  colors: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    background: 'var(--color-background)',
    text: 'var(--color-text)',
  },
  breakpoints: {
    sm: 'var(--breakpoint-sm)',
    md: 'var(--breakpoint-md)',
    lg: 'var(--breakpoint-lg)',
    xl: 'var(--breakpoint-xl)',
    xxl: 'var(--breakpoint-xxl)',
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <StyledThemeProvider theme={theme}>
      {children}
    </StyledThemeProvider>
  );
}