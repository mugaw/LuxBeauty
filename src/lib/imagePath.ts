/**
 * Returns the correct path for public folder images.
 * Next.js with `images.unoptimized: true` does NOT automatically prepend basePath to image src.
 * We use NEXT_PUBLIC_BASE_PATH env variable (set in .env.production) to prefix all image paths.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function imagePath(src: string): string {
  return `${BASE_PATH}${src}`;
}
