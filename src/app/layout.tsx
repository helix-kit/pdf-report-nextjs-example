import './globals.css';

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'PDF report example — Next.js',
  description: 'Authoring and rendering PDF reports with @helix-hq/pdf-report.',
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body className="bg-background text-foreground antialiased">{children}</body>
  </html>
);

export default RootLayout;
