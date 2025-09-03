// next.config.ts
import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',               // genera /out
  images: { unoptimized: true },  // requerido para next/image en export estático
  trailingSlash: true,            // /tasks/ en vez de /tasks

  // Para GitHub Pages bajo /taskmanagerapp
  basePath: isProd ? '/taskmanagerapp' : undefined,
  assetPrefix: isProd ? '/taskmanagerapp/' : undefined,
};

export default nextConfig;
