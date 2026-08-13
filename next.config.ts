import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Both are server-only and build React contexts at module scope. Bundling them
  // under Next's `react-server` export condition strips `createContext`, which
  // the json-render registry needs, and the render throws. Externalising them
  // resolves them outside those conditions.
  serverExternalPackages: ['@react-pdf/renderer', '@json-render/react-pdf'],
  transpilePackages: ['@helix-hq/design-system', '@helix-hq/pdf-report'],
};

export default nextConfig;
