// app/layout.tsx
import type { Metadata } from 'next';
import { ThemeProvider } from '@/lib/ThemeProvider';
import GlobalStyles from '@/styles/GlobalStyles';

export const metadata: Metadata = {
  title: 'Coin Flipper 3D Animation',
  description:
    'Build a simple coin flipper with 3D animation using a sprite sheet | Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <GlobalStyles />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
