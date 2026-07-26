/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Surfaced to the client bundle so the <html lang> and content pick the
    // right locale. Set at build time: SITE_LOCALE=en (default) or SITE_LOCALE=cz
    SITE_LOCALE: process.env.SITE_LOCALE || 'en',
  },
};

export default nextConfig;
